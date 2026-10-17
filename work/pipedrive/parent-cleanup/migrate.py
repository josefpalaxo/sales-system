#!/usr/bin/env python3
"""One-time Parent migration. Analyze first; apply only an explicitly approved plan."""
import argparse
from collections import Counter, defaultdict
import csv
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import time
import urllib.error
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parent
FIELD = 'b45e902759f6fb356e939c4b6d45245ecfedb637'
LOCAL = ROOT / 'local'


def load_token():
    token = os.environ.get('PIPEDRIVE_API_TOKEN')
    if not token:
        for line in (ROOT.parent / '.env-pipedrive').read_text().splitlines():
            if line.strip().startswith('PIPEDRIVE_API_TOKEN='):
                token = line.split('=', 1)[1].strip().strip('\"').strip("'")
    if not token:
        raise RuntimeError('PIPEDRIVE_API_TOKEN is missing')
    return token


class API:
    def __init__(self):
        self.token = load_token()

    def request(self, path, params=None, body=None):
        # Deliberately sequential. Never automatically retry an ambiguous POST.
        url = 'https://api.pipedrive.com/api/' + path
        if params:
            url += '?' + urllib.parse.urlencode(params)
        for attempt in range(5):
            time.sleep(0.25)
            req = urllib.request.Request(url, headers={
                'x-api-token': self.token, 'Content-Type': 'application/json'},
                data=json.dumps(body).encode() if body is not None else None)
            try:
                with urllib.request.urlopen(req, timeout=30) as response:
                    result = json.load(response)
                if not result.get('success'):
                    raise RuntimeError('Pipedrive returned success=false')
                return result
            except urllib.error.HTTPError as exc:
                if exc.code == 429 and body is None and attempt < 4:
                    time.sleep(min(60, max(1, float(exc.headers.get('Retry-After', 5)))))
                    continue
                if body is None and exc.code >= 500 and attempt < 4:
                    time.sleep(2 ** attempt)
                    continue
                raise RuntimeError(f'Pipedrive HTTP {exc.code}') from None
            except urllib.error.URLError:
                if body is None and attempt < 4:
                    time.sleep(2 ** attempt)
                    continue
                raise RuntimeError('Pipedrive network error; POST outcome may be unknown') from None

    def organizations(self):
        rows, cursor = {}, None
        while True:
            params = {'limit': 500, 'custom_fields': FIELD}
            if cursor:
                params['cursor'] = cursor
            result = self.request('v2/organizations', params)
            rows.update({int(r['id']): r for r in result['data'] or []})
            cursor = result.get('additional_data', {}).get('next_cursor')
            if not cursor:
                return rows

    def relationships(self, org):
        rows, start = [], 0
        while True:
            result = self.request('v1/organizationRelationships',
                                  {'org_id': org, 'start': start, 'limit': 100})
            rows.extend(result.get('data') or [])
            page = result.get('additional_data', {}).get('pagination', {})
            if not page.get('more_items_in_collection'):
                return rows
            next_start = page.get('next_start')
            if next_start is None or next_start <= start:
                raise RuntimeError('Relationship pagination did not advance')
            start = next_start


def org_id(value):
    return int(value.get('id', value.get('value')) if isinstance(value, dict) else value)


def parent_value(org):
    value = org.get('custom_fields', {}).get(FIELD)
    return str(org_id(value)) if value is not None else ''


def write_csv(path, rows, fields):
    with path.open('w', newline='') as stream:
        writer = csv.DictWriter(stream, fieldnames=fields, extrasaction='ignore')
        writer.writeheader()
        writer.writerows(rows)


def reaches(graph, start, target):
    pending, seen = [start], set()
    while pending:
        node = pending.pop()
        if node == target:
            return True
        if node not in seen:
            seen.add(node)
            pending.extend(graph.get(node, ()))
    return False


def analyze(api, source):
    orgs = api.organizations()
    native, checked = {}, set()
    pending = {int(r[k]) for r in source for k in ('child_id', 'parent_id') if r[k]}
    # Follow native ancestors beyond the source set so long cycles cannot be missed.
    while pending:
        org = pending.pop()
        if org in checked or org not in orgs:
            continue
        for relation in api.relationships(org):
            if not relation.get('id'):
                raise RuntimeError('Native relationship missing ID')
            native[int(relation['id'])] = relation
            if relation['type'] == 'parent':
                pending.add(org_id(relation['rel_owner_org_id']))
        checked.add(org)
        if len(checked) % 50 == 0:
            print(f'Checked native relationships for {len(checked)} organizations', flush=True)
    parents, graph = defaultdict(set), defaultdict(set)
    for r in native.values():
        if r['type'] == 'parent':
            p, c = org_id(r['rel_owner_org_id']), org_id(r['rel_linked_org_id'])
            parents[c].add(p)
            graph[p].add(c)
    plan = []
    for row in source:
        r = dict(row)
        c, p = int(r['child_id']), int(r['parent_id']) if r['parent_id'] else 0
        matching = [n for n in native.values() if n['type'] == 'parent'
                    and org_id(n['rel_owner_org_id']) == p
                    and org_id(n['rel_linked_org_id']) == c]
        if not p:
            status = 'invalid_parent'
        elif p == c:
            status = 'self_reference'
        elif c not in orgs or p not in orgs:
            status = 'organization_unavailable'
        elif parent_value(orgs[c]) != r['parent_raw']:
            status = 'source_changed'
        elif parents[c] - {p}:
            status = 'conflicting_parent'
        elif len(matching) > 1:
            status = 'duplicate_native_relationships'
        elif matching:
            status = 'existing'
        elif any(n['type'] == 'related' and
                 {org_id(n['rel_owner_org_id']), org_id(n['rel_linked_org_id'])} == {p, c}
                 for n in native.values()):
            status = 'conflicting_related_relationship'
        else:
            status = 'ready'
        r.update(status=status, relationship_id=matching[0]['id'] if matching else '')
        plan.append(r)
        if status in ('ready', 'existing'):
            graph[p].add(c)
    for r in plan:
        if r['status'] in ('ready', 'existing') and reaches(
                graph, int(r['child_id']), int(r['parent_id'])):
            r['status'] = 'cycle'
    return plan, list(native.values()), len(orgs), len(checked)


def digest(plan):
    return hashlib.sha256(json.dumps(plan, sort_keys=True).encode()).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--apply-plan', help='SHA256 of the human-approved local/plan.json')
    args = parser.parse_args()
    LOCAL.mkdir(exist_ok=True)
    with (LOCAL / 'source-mapping.csv').open(newline='') as stream:
        source = list(csv.DictReader(stream))
    if len({r['child_id'] for r in source}) != len(source):
        raise RuntimeError('Duplicate child IDs in source backup')
    api = API()
    identity = api.request('v1/users/me')['data']
    if identity.get('company_domain') != 'circularo' or not identity.get('active_flag'):
        raise RuntimeError('Expected an active Circularo account')
    approved = None
    if args.apply_plan:
        approved = json.loads((LOCAL / 'plan.json').read_text())
        if digest(approved) != args.apply_plan:
            raise RuntimeError('Approved plan hash does not match')
    plan, native, total, checked = analyze(api, source)
    if approved is not None:
        expected = {(r['child_id'], r['parent_id']) for r in approved if r['status'] == 'ready'}
        permitted = {(r['child_id'], r['parent_id']) for r in plan if r['status'] in ('ready', 'existing')}
        if not expected <= permitted:
            raise RuntimeError('Approved mappings changed or conflict; reanalyze and obtain approval')
        results = []
        # Flush each record so interruption retains the audit trail.
        path = LOCAL / ('execution-' + datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ') + '.csv')
        with path.open('x', newline='') as stream:
            writer = csv.DictWriter(stream, fieldnames=['child_id', 'parent_id', 'status', 'detail'])
            writer.writeheader()
            for r in plan:
                if (r['child_id'], r['parent_id']) not in expected:
                    continue
                c, p = int(r['child_id']), int(r['parent_id'])
                result = {'child_id': c, 'parent_id': p}
                try:
                    # Recheck complete ancestry and live source just before each write.
                    org = api.request(f'v2/organizations/{c}', {'custom_fields': FIELD})['data']
                    if parent_value(org) != r['parent_raw']:
                        raise RuntimeError('Source changed immediately before write')
                    current = api.relationships(c)
                    incoming = [n for n in current if n['type'] == 'parent'
                                and org_id(n['rel_linked_org_id']) == c]
                    if any(org_id(n['rel_owner_org_id']) != p for n in incoming):
                        raise RuntimeError('Conflicting native parent')
                    if len(incoming) > 1:
                        raise RuntimeError('Duplicate native parents')
                    if any(n['type'] == 'related' and
                           {org_id(n['rel_owner_org_id']), org_id(n['rel_linked_org_id'])} == {p,c}
                           for n in current):
                        raise RuntimeError('Conflicting lateral relationship')
                    pending, seen = [p], set()
                    while pending:
                        node = pending.pop()
                        if node == c:
                            raise RuntimeError('Native ancestry would create a cycle')
                        if node in seen:
                            raise RuntimeError('Existing native ancestor cycle')
                        seen.add(node)
                        pending.extend(org_id(n['rel_owner_org_id']) for n in api.relationships(node)
                                       if n['type'] == 'parent' and org_id(n['rel_linked_org_id']) == node)
                    if incoming:
                        result.update(status='existing', detail=str(incoming[0]['id']))
                    else:
                        response = api.request('v1/organizationRelationships', body={
                            'type': 'parent', 'rel_owner_org_id': p, 'rel_linked_org_id': c})
                        result.update(status='created', detail=str(response['data']['id']))
                except Exception as exc:
                    result.update(status='failed_or_unknown', detail=str(exc))
                writer.writerow(result)
                stream.flush()
                results.append(result)
        # Verify every valid approved mapping through fresh direct API reads.
        verified = []
        for r in approved:
            if r['status'] not in ('ready', 'existing'):
                continue
            c, p = int(r['child_id']), int(r['parent_id'])
            try:
                incoming = [n for n in api.relationships(c) if n['type'] == 'parent'
                            and org_id(n['rel_linked_org_id']) == c]
                valid = len(incoming) == 1 and org_id(incoming[0]['rel_owner_org_id']) == p
                status = 'verified' if valid else 'missing_or_conflicting'
            except Exception:
                status = 'verification_failed'
            verified.append({'child_id': c, 'parent_id': p, 'status': status})
        write_csv(LOCAL / 'verification.csv', verified, ['child_id','parent_id','status'])
        print(json.dumps({'execution': dict(Counter(r['status'] for r in results)),
                          'verification': dict(Counter(r['status'] for r in verified))}, indent=2))
        if any(r['status'] != 'verified' for r in verified):
            raise SystemExit(1)
        return
    (LOCAL / 'plan.json').write_text(json.dumps(plan, indent=2) + '\n')
    (LOCAL / 'native-before.json').write_text(json.dumps(native, indent=2) + '\n')
    write_csv(LOCAL / 'analysis.csv', plan, list(plan[0]))
    summary = {'generated_at_utc': datetime.now(timezone.utc).isoformat(),
               'live_organizations': total, 'source_mappings': len(source),
               'native_organizations_checked': checked, 'native_relationships_in_scope': len(native),
               'counts': dict(Counter(r['status'] for r in plan)), 'plan_sha256': digest(plan)}
    (LOCAL / 'summary.json').write_text(json.dumps(summary, indent=2) + '\n')
    print(json.dumps(summary, indent=2))


if __name__ == '__main__':
    main()
