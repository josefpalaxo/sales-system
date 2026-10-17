#!/usr/bin/env python3
"""One-time user-authorized partner classification migration; local audit evidence."""
import argparse
from collections import Counter
import csv
from datetime import datetime, timezone
import json
from pathlib import Path
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parent
LOCAL = ROOT / 'local'
sys.path.insert(0, str(ROOT.parent / 'parent-cleanup'))
from migrate import load_token  # existing credential loader; no credentials copied

LEGACY = '5df6908fdaef780d7159613c33be664c8239c30e'
ORG_TYPE = '9f4d8f04d3e18a2c781b0bf3ab2cfcaa582f3c26'
COMMERCIAL = {344: 'Referral / Affiliate', 345: 'Reseller', 346: 'Distributor'}
ROLES = {347: 'Integration', 353: 'Technology', 348: 'On-Premise Solution', 349: 'Co-Branded'}
SCHEMA = {
    'primary': ('Partner type (primary)', 'enum', list(COMMERCIAL.values())),
    'roles': ('Partner roles', 'set', ['Integration', 'Technology', 'On-Premise Solution',
                                    'Co-Branded', 'Service Provider / Operator']),
    'tier': ('Partner tier', 'enum', ['Authorized', 'Advanced', 'Strategic']),
}


def save(name, value):
    (LOCAL / name).write_text(json.dumps(value, indent=2) + '\n')


class API:
    def __init__(self):
        self.token = load_token()

    def request(self, path, params=None, body=None, method='GET'):
        url = 'https://api.pipedrive.com/api/' + path
        if params:
            url += '?' + urllib.parse.urlencode(params)
        for attempt in range(5):
            time.sleep(0.2)
            req = urllib.request.Request(url, method=method, headers={
                'x-api-token': self.token, 'Content-Type': 'application/json'},
                data=json.dumps(body).encode() if body is not None else None)
            try:
                with urllib.request.urlopen(req, timeout=30) as response:
                    result = json.load(response)
                if not result.get('success'):
                    raise RuntimeError('API returned success=false')
                if method != 'GET':
                    with (LOCAL / 'api-writes.jsonl').open('a') as log:
                        log.write(json.dumps({'utc': datetime.now(timezone.utc).isoformat(),
                                              'method': method, 'path': path, 'body': body,
                                              'success': True}) + '\n')
                return result
            except urllib.error.HTTPError as exc:
                if method == 'GET' and (exc.code == 429 or exc.code >= 500) and attempt < 4:
                    time.sleep(min(60, max(1, float(exc.headers.get('Retry-After', 2 ** attempt)))))
                    continue
                raise RuntimeError(f'Pipedrive HTTP {exc.code}') from None
            except (urllib.error.URLError, TimeoutError):
                if method == 'GET' and attempt < 4:
                    time.sleep(2 ** attempt)
                    continue
                raise RuntimeError('Network timeout; write outcome may be unknown') from None

    def organizations(self):
        rows, cursor = [], None
        while True:
            result = self.request('v2/organizations', {'limit': 500, **({'cursor': cursor} if cursor else {})})
            rows.extend(result['data'] or [])
            cursor = (result.get('additional_data') or {}).get('next_cursor')
            if not cursor:
                return rows

    def fields(self):
        rows, cursor = [], None
        while True:
            result = self.request('v2/organizationFields', {'limit': 500, **({'cursor': cursor} if cursor else {})})
            rows.extend(result['data'] or [])
            cursor = (result.get('additional_data') or {}).get('next_cursor')
            if not cursor:
                return rows


def classify(org):
    values = sorted(set((org.get('custom_fields') or {}).get(LEGACY) or []))
    unknown = set(values) - set(COMMERCIAL) - set(ROLES)
    if unknown:
        raise RuntimeError(f'Unknown legacy option IDs for {org["id"]}')
    commercial = [COMMERCIAL[v] for v in values if v in COMMERCIAL]
    roles = [ROLES[v] for v in values if v in ROLES]
    return {'id': org['id'], 'name': org['name'], 'legacy_ids': values,
            'primary_label': commercial[0] if len(commercial) == 1 else None,
            'role_labels': roles,
            'review': 'multiple_commercial_models' if len(commercial) > 1 else
                      'capability_only' if values and not commercial else
                      'no_existing_classification' if not values else ''}


def build_plan():
    before = json.loads((LOCAL / 'organizations-before.json').read_text())
    if len({r['id'] for r in before}) != len(before):
        raise RuntimeError('Duplicate organization IDs in backup')
    plan = [classify(r) for r in before if (r.get('custom_fields') or {}).get(LEGACY)
            or 12 in ((r.get('custom_fields') or {}).get(ORG_TYPE) or [])]
    save('plan.json', plan)
    with (LOCAL / 'plan.csv').open('w', newline='') as stream:
        writer = csv.DictWriter(stream, fieldnames=list(plan[0]))
        writer.writeheader()
        writer.writerows(plan)
    return plan


def ensure_fields(api):
    path = LOCAL / 'field-map.json'
    mapping = json.loads(path.read_text()) if path.exists() else {}
    for dimension, (name, kind, options) in SCHEMA.items():
        fields = api.fields()
        existing = next((f for f in fields if f['field_code'] == mapping.get(dimension, {}).get('field_code')), None)
        if existing is None:
            if any(f['field_name'] == name for f in fields):
                raise RuntimeError(f'Untracked existing field named {name}; inspect before reuse')
            existing = api.request('v2/organizationFields', body={
                'field_name': name, 'field_type': kind,
                'options': [{'label': label} for label in options]}, method='POST')['data']
            mapping[dimension] = existing
            save('field-map.json', mapping)
            print(f'Created {name}', flush=True)
        if existing['field_type'] != kind or {o['label'] for o in existing['options']} != set(options):
            raise RuntimeError(f'Unexpected schema for {name}')
        mapping[dimension] = existing
    save('field-map.json', mapping)
    return mapping


def expected_values(row, fields):
    primary_options = {o['label']: o['id'] for o in fields['primary']['options']}
    role_options = {o['label']: o['id'] for o in fields['roles']['options']}
    return (primary_options[row['primary_label']] if row['primary_label'] else None,
            sorted(role_options[label] for label in row['role_labels']))


def verify(api, plan, fields):
    after = api.organizations()
    save('organizations-after.json', after)
    current = {r['id']: r for r in after}
    before = json.loads((LOCAL / 'organizations-before.json').read_text())
    primary_key, roles_key, tier_key = (fields[k]['field_code'] for k in ('primary', 'roles', 'tier'))
    checks = []
    for row in plan:
        org = current.get(row['id'])
        if org is None:
            checks.append({'id': row['id'], 'verified': False, 'reason': 'organization_unavailable'})
            continue
        cf = org.get('custom_fields') or {}
        primary, roles = expected_values(row, fields)
        checks.append({'id': row['id'], 'verified': cf.get(primary_key) == primary
                       and sorted(cf.get(roles_key) or []) == roles and cf.get(tier_key) is None
                       and sorted(cf.get(LEGACY) or []) == row['legacy_ids'],
                       'primary': cf.get(primary_key), 'roles': cf.get(roles_key),
                       'tier': cf.get(tier_key), 'review': row['review']})
    unrelated_changes = []
    for old in before:
        now = current.get(old['id'])
        if now is None:
            unrelated_changes.append({'id': old['id'], 'field': 'organization_unavailable'})
            continue
        for key, value in (old.get('custom_fields') or {}).items():
            if (now.get('custom_fields') or {}).get(key) != value:
                unrelated_changes.append({'id': old['id'], 'field': key})
        for key in ('name', 'owner_id', 'website', 'label_ids'):
            if old.get(key) != now.get(key):
                unrelated_changes.append({'id': old['id'], 'field': key})
    tiers_assigned = sum((r.get('custom_fields') or {}).get(tier_key) is not None for r in after)
    save('verification.json', checks)
    save('unrelated-value-changes.json', unrelated_changes)
    summary = {'candidate_organizations': len(plan), 'verified': sum(r['verified'] for r in checks),
               'primary_assigned': sum(r['primary_label'] is not None for r in plan),
               'roles_assigned': sum(bool(r['role_labels']) for r in plan),
               'tier_assignments': tiers_assigned, 'unrelated_value_changes': len(unrelated_changes),
               'review_counts': dict(Counter(r['review'] for r in plan if r['review'])),
               'live_organizations': len(after)}
    save('summary.json', summary)
    print(json.dumps(summary, indent=2), flush=True)
    return all(r['verified'] for r in checks) and not unrelated_changes and tiers_assigned == 0


def apply(api, plan):
    identity = api.request('v1/users/me')['data']
    if identity.get('company_domain') != 'circularo' or not identity.get('active_flag'):
        raise RuntimeError('Expected active Circularo account')
    fields = ensure_fields(api)
    primary_key, roles_key = (fields[k]['field_code'] for k in ('primary', 'roles'))
    with (LOCAL / 'execution.jsonl').open('a') as log:
        for i, row in enumerate(plan):
            primary, roles = expected_values(row, fields)
            if primary is None and not roles:
                continue
            result = {'id': row['id']}
            try:
                org = api.request(f'v2/organizations/{row["id"]}')['data']
                cf = org.get('custom_fields') or {}
                if sorted(cf.get(LEGACY) or []) != row['legacy_ids']:
                    raise RuntimeError('Legacy source changed; refusing write')
                if cf.get(primary_key) not in (None, primary):
                    raise RuntimeError('Primary classification changed; refusing overwrite')
                if not set(cf.get(roles_key) or []) <= set(roles):
                    raise RuntimeError('Partner roles changed; refusing overwrite')
                payload = {}
                if primary is not None and cf.get(primary_key) != primary:
                    payload[primary_key] = primary
                if roles and sorted(cf.get(roles_key) or []) != roles:
                    payload[roles_key] = roles
                # Never send legacy, Organization Type, existing Role, or tier values.
                if payload:
                    api.request(f'v2/organizations/{row["id"]}', body={'custom_fields': payload}, method='PATCH')
                result['status'] = 'updated' if payload else 'already_matching'
            except Exception as exc:
                result.update(status='failed_or_unknown', error=str(exc))
            log.write(json.dumps(result) + '\n')
            log.flush()
            if (i + 1) % 25 == 0:
                print(f'Processed {i+1}/{len(plan)} candidates', flush=True)
    if not verify(api, plan, fields):
        raise RuntimeError('Verification requires reconciliation before field cutover')
    # New data is fully verified before the old field is hidden/renamed.
    api.request(f'v2/organizationFields/{LEGACY}', body={
        'field_name': 'Partner type (legacy)'}, method='PATCH')
    api.request(f'v2/organizationFields/{primary_key}', body={'field_name': 'Partner type'}, method='PATCH')
    # UI flags are verified through readable v1 metadata. Some accounts reject v2 UI namespaces.
    ui_results = []
    for key, show in ((primary_key, True), (roles_key, True), (fields['tier']['field_code'], False), (LEGACY, False)):
        try:
            api.request(f'v2/organizationFields/{key}', body={'ui_visibility': {
                'add_visible_flag': show, 'details_visible_flag': key != LEGACY}}, method='PATCH')
            ui_results.append({'field_code': key, 'configured': True})
        except Exception as exc:
            ui_results.append({'field_code': key, 'configured': False, 'error': str(exc)})
    save('ui-configuration-results.json', ui_results)
    save('fields-after-v2.json', api.fields())
    save('fields-after-v1.json', api.request('v1/organizationFields', {'limit': 500})['data'])
    print('Data verified and field-name cutover complete', flush=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--apply', action='store_true')
    parser.add_argument('--verify', action='store_true')
    args = parser.parse_args()
    plan = build_plan()
    print(json.dumps({'candidates': len(plan), 'primary_assignments': sum(r['primary_label'] is not None for r in plan),
                      'role_assignments': sum(bool(r['role_labels']) for r in plan),
                      'review': [r for r in plan if r['review'] == 'multiple_commercial_models']}, indent=2), flush=True)
    if args.apply:
        apply(API(), plan)
    elif args.verify:
        if not verify(API(), plan, json.loads((LOCAL / 'field-map.json').read_text())):
            raise SystemExit(1)


if __name__ == '__main__':
    main()
