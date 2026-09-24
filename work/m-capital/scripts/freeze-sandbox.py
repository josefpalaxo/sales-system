"""Insert one bounded batch per immutable source table; resume only after exact comparison."""
import hashlib
import json
from datetime import datetime, timezone
from decimal import Decimal, getcontext
from pathlib import Path
from warehouse import ROOT, execute

getcontext().prec = 50
RUN = ROOT / 'evidence/m_capital_20260925_g176'
MANIFEST = json.loads((RUN / 'source-manifest.json').read_text())
CREATED = datetime.fromisoformat(MANIFEST['captured_at_utc']).astimezone(timezone.utc).strftime('%Y-%m-%d %H:%M:%S.%f')[:23]

def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()

def typed(rows, meta):
    def value(v, t):
        if v is None: return None
        if 'Decimal' in t: return format(Decimal(str(v)).normalize(), 'f')
        if 'Int' in t: return int(v)
        if 'Bool' in t: return bool(v)
        return v
    return [{m['name']:value(r[m['name']],m['type']) for m in meta} for r in rows]

def main():
    report={'analysis_run_id':MANIFEST['analysis_run_id'], 'checked_at_utc':datetime.now(timezone.utc).isoformat(), 'objects':[]}
    for source in MANIFEST['sources']:
        table=source['table'].split('.')[1]
        target='sandbox.m_capital__g176_20260925_'+table
        path=ROOT/source['file']
        assert sha(path)==source['sha256'], 'Frozen file hash mismatch: '+table
        payload=json.loads(path.read_text())
        rows,meta=payload['data'],payload['meta']
        assert len(rows)==source['rows']
        for m in meta:
            if m['name'] in (['order_line_id','invoice_line_id'] if table.endswith('_rel') else ['id']):
                assert all(r[m['name']] is not None and 0<=int(r[m['name']])<2**32 for r in rows)
        ddl=ROOT/'sql/10_sources/frozen'/f'{table}.sql'
        exists=json.loads(execute(f"SELECT count() AS n FROM system.tables WHERE database='sandbox' AND name='{target.split('.')[1]}' LIMIT 1 FORMAT JSON"))['data'][0]['n']
        if int(exists)==0:
            execute(ddl.read_text(),write=True)
        count=int(json.loads(execute(f'SELECT count() AS n FROM {target} LIMIT 1 FORMAT JSON'))['data'][0]['n'])
        if count==0:
            enriched=[{**r,'analysis_run_id':MANIFEST['analysis_run_id'],'source_cutoff':MANIFEST['source_date'],
                'reporting_cutoff':MANIFEST['reporting_cutoff'],'created_at':CREATED,'source_file_sha256':source['sha256']} for r in rows]
            execute(f'INSERT INTO {target} FORMAT JSONEachRow',data='\n'.join(json.dumps(r) for r in enriched)+'\n',write=True)
        elif count!=len(rows):
            raise RuntimeError(f'{target}: existing row count {count} differs; no automatic retry/overwrite')
        order='order_line_id, invoice_line_id' if table.endswith('_rel') else 'id'
        fields=', '.join('`'+m['name']+'`' for m in meta)
        query=f'SELECT {fields}, analysis_run_id, source_cutoff, reporting_cutoff, created_at, source_file_sha256 FROM {target} ORDER BY {order} LIMIT 100001 FORMAT JSON'
        actual=json.loads(execute(query))['data']
        assert typed(actual,meta)==typed(rows,meta), 'Field comparison failed: '+table
        assert all(r['analysis_run_id']==MANIFEST['analysis_run_id'] and r['source_cutoff']==MANIFEST['source_date'] and r['reporting_cutoff']==MANIFEST['reporting_cutoff'] and r['source_file_sha256']==source['sha256'] and r['created_at']==CREATED for r in actual), 'Run metadata mismatch'
        report['objects'].append({'name':target,'kind':'frozen table','rows':len(actual),'source_file':source['file'],
            'source_sha256':source['sha256'],'ddl_file':str(ddl.relative_to(ROOT)),'ddl_sha256':sha(ddl),'all_fields_equal':True})
        (RUN/'warehouse-manifest.json').write_text(json.dumps(report,indent=2))
        print(target, len(actual), 'rows: exact field/run-metadata comparison PASS',flush=True)
    report['complete']=True
    report['freezer_sha256']=sha(Path(__file__))
    report['transport_sha256']=sha(ROOT/'scripts/warehouse.py')
    (RUN/'warehouse-manifest.json').write_text(json.dumps(report,indent=2))

if __name__=='__main__': main()
