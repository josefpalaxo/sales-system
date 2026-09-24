"""Capture narrow, bounded read-only Odoo extracts. Never prints dotenv or credentials."""
import hashlib
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / 'evidence/run-config.json').read_text())
DEST = ROOT / 'evidence' / CONFIG['analysis_run_id'] / 'source'
RUNNER = Path('/Users/josefneumann/Projects/ai-workspace/project-data/tools/clickhouse-runner/run_clickhouse_sql.py')
ENV = '/Users/josefneumann/Projects/ai-workspace/project-data/.env.codex'

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def main():
    DEST.mkdir(parents=True, exist_ok=True)
    manifest = {**CONFIG, 'captured_at_utc': datetime.now(timezone.utc).isoformat(), 'sources': []}
    for table in CONFIG['source_tables']:
        sql = ROOT / 'sql/10_sources' / (table + '.sql')
        target = DEST / (table + '.json')
        if target.exists():
            response = json.loads(target.read_text())
        else:
            process = subprocess.run([sys.executable, '-B', str(RUNNER), '--sql-file', str(sql), '--env-file', ENV,
                '--client-args=--readonly=2 --max_execution_time=30 --connect_timeout=10'], capture_output=True, text=True, timeout=60)
            if process.returncode:
                raise RuntimeError(f'{table}: {process.stderr}')
            response = json.loads(process.stdout)
        rows = response['data']
        assert len(rows) == response['rows'] and len(rows) < 100001, (table, 'truncated extract')
        keys = [(r['order_line_id'], r['invoice_line_id']) if table.endswith('_rel') else r['id'] for r in rows]
        assert len(keys) == len(set(keys)) and None not in keys, (table, 'duplicate/null grain')
        assert all(int(r['_airbyte_generation_id']) == 176 and r['_airbyte_extracted_at'].startswith('2026-09-06') for r in rows), (table, 'source generation drift')
        changes = sum(bool(json.loads(r['_airbyte_meta']).get('changes')) for r in rows)
        assert changes == 0, (table, 'Airbyte field conversion errors')
        if not target.exists():
            with target.open('x') as f:
                json.dump(response, f, separators=(',', ':'))
        manifest['sources'].append({'table': 'raw_odoo.' + table, 'rows': len(rows), 'file': str(target.relative_to(ROOT)),
            'sha256': digest(target), 'query_file': str(sql.relative_to(ROOT)), 'query_sha256': digest(sql),
            'extraction_min': min((r['_airbyte_extracted_at'] for r in rows), default=None),
            'extraction_max': max((r['_airbyte_extracted_at'] for r in rows), default=None), 'airbyte_changes': changes})
        print(table, len(rows), 'rows; keys/generation/metadata PASS', flush=True)
    manifest['extractor_sha256'] = digest(Path(__file__))
    output = DEST.parent / 'source-manifest.json'
    if output.exists():
        prior = json.loads(output.read_text())
        assert prior['sources'] == manifest['sources'], 'Immutable manifest differs: use a new run ID'
    else:
        with output.open('x') as f:
            json.dump(manifest, f, indent=2)
    print('Frozen source manifest:', output)

if __name__ == '__main__':
    main()
