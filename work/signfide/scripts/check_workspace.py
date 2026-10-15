#!/usr/bin/env python3
"""Validate the project's intentionally small YAML schema and Markdown links.

Uses only Python's standard library. Frontmatter supports plain/double-quoted
scalars and a sources list; unsupported YAML constructs fail visibly.
"""
from __future__ import annotations

import datetime as dt
import json
from pathlib import Path
import re
import subprocess
import sys
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED = {'.work', 'node_modules', 'dist', '.cache', 'screenshots', 'qa'}
REQUIRED = {'id', 'title', 'kind', 'status', 'owner', 'updated', 'classification', 'sources'}


def excluded(path: Path) -> bool:
    parts = path.relative_to(ROOT).parts
    # Preserve the prototype's first-party QA report; only migration QA is ignored.
    return any(x in parts for x in EXCLUDED - {'qa'}) or parts[:2] == ('archive', 'qa')


def scalar(value: str) -> str:
    if value.startswith('"'):
        parsed = json.loads(value)
        if not isinstance(parsed, str):
            raise ValueError('expected quoted string')
        return parsed
    if not value or re.search(r'[\[\]{}#&*!>|\n]|:\s', value):
        raise ValueError('unsupported plain YAML scalar: use a quoted string')
    return value


def metadata(text: str) -> tuple[dict, str]:
    if not text.startswith('---\n') or '\n---\n' not in text[4:]:
        raise ValueError('missing YAML frontmatter')
    header, body = text[4:].split('\n---\n', 1)
    result: dict = {}
    for line in header.splitlines():
        if line.startswith('  - '):
            if not isinstance(result.get('sources'), list):
                raise ValueError('unexpected list item')
            result['sources'].append(scalar(line[4:].strip()))
            continue
        match = re.fullmatch(r'([a-z_]+):\s*(.*)', line)
        if not match:
            raise ValueError('unsupported YAML syntax')
        key, value = match.groups()
        if key in result:
            raise ValueError(f'duplicate key {key}')
        if key == 'sources':
            if value not in ('', '[]'):
                raise ValueError('sources must be a list')
            result[key] = []
        else:
            result[key] = scalar(value)
    return result, body


def anchors(text: str) -> set[str]:
    text = re.sub(r'```[\s\S]*?```', '', text)
    counts: dict[str, int] = {}
    result: set[str] = set()
    for title in re.findall(r'^#{1,6}\s+(.+?)\s*$', text, re.M):
        slug = re.sub(r'[^\w\- ]', '', title.lower()).replace(' ', '-')
        count = counts.get(slug, 0)
        counts[slug] = count + 1
        result.add(slug if count == 0 else f'{slug}-{count}')
    return result


def main() -> int:
    errors: list[str] = []
    ids: set[str] = set()
    docs = sorted(p for p in ROOT.rglob('*.md') if not excluded(p))
    for path in docs:
        rel = path.relative_to(ROOT)
        text = path.read_text()
        try:
            meta, body = metadata(text)
            missing = REQUIRED - meta.keys()
            if missing:
                raise ValueError(f'missing fields {sorted(missing)}')
            if not re.fullmatch(r'signfide:[a-z0-9-]+', meta['id']):
                raise ValueError('invalid document ID')
            if meta['id'] in ids:
                raise ValueError(f'duplicate ID {meta["id"]}')
            ids.add(meta['id'])
            if meta['status'] not in {'draft', 'reviewed', 'approved', 'deprecated'}:
                raise ValueError('invalid status')
            if meta['classification'] not in {'public', 'internal', 'confidential', 'restricted'}:
                raise ValueError('invalid classification')
            dt.date.fromisoformat(meta['updated'])
            if meta['status'] == 'approved' and not {'approved_by', 'approved_on'} <= meta.keys():
                raise ValueError('approved document needs approval evidence fields')
            for source in meta['sources']:
                if '.work' in Path(source).parts:
                    errors.append(f'{rel}: private source dependency')
                if not (path.parent / source).exists():
                    errors.append(f'{rel}: missing source {source}')
        except (ValueError, KeyError, TypeError) as exc:
            errors.append(f'{rel}: {exc}')
            continue
        if re.search(r'\.work[/\\]', text):
            errors.append(f'{rel}: direct private-note path reference')
        visible = re.sub(r'```[\s\S]*?```', '', body)
        for target in re.findall(r'!?\[[^\]]*\]\(([^)]+)\)', visible):
            target = target.strip().strip('<>')
            if re.match(r'(?:https?://|mailto:|data:)', target):
                continue
            pathname, _, fragment = unquote(target).partition('#')
            destination = (path.parent / pathname).resolve() if pathname else path
            if not destination.exists():
                errors.append(f'{rel}: broken link {target}')
            elif fragment and destination.suffix == '.md' and fragment not in anchors(destination.read_text()):
                errors.append(f'{rel}: missing anchor {target}')
    for filename, prefix, count in [('OPEN-QUESTIONS.md', 'SF-OQ', 40), ('TASKS.md', 'SF-T', 25), ('DECISIONS.md', 'SF-D', 8)]:
        text = (ROOT / filename).read_text()
        if filename == 'OPEN-QUESTIONS.md':
            text = text.split('## Question index', 1)[1].split('## SF-OQ-001', 1)[0]
        rows = re.findall(r'^\| (' + prefix + r'-\d{3}) \|', text, re.M)
        expected = {f'{prefix}-{i:03}' for i in range(1, count + 1)}
        if not expected <= set(rows) or len(rows) != len(set(rows)):
            errors.append(f'{filename}: missing or duplicate registry index rows')
    qtext = (ROOT / 'OPEN-QUESTIONS.md').read_text()
    for path in docs:
        if 'archive' in path.relative_to(ROOT).parts:
            continue
        for ref in set(re.findall(r'SF-OQ-\d{3}', path.read_text())):
            if ref not in qtext:
                errors.append(f'{path.relative_to(ROOT)}: unknown question {ref}')
    result = subprocess.run(['rtk', 'proxy', 'git', 'ls-files', '--', 'work/signfide/.work'], cwd=ROOT.parents[1], text=True, capture_output=True)
    if result.returncode or result.stdout.strip():
        errors.append('private notes must not be tracked')
    ignored = subprocess.run(['rtk', 'proxy', 'git', 'check-ignore', '-q', 'work/signfide/.work/task1.md'], cwd=ROOT.parents[1])
    if ignored.returncode:
        errors.append('private notes are not ignored')
    print(json.dumps({'documents': len(docs), 'unique_ids': len(ids), 'errors': errors}, indent=2))
    return bool(errors)


if __name__ == '__main__':
    sys.exit(main())
