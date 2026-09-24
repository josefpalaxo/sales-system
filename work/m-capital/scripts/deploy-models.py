"""Preflight and create explicit project views. Never replaces an existing object."""
import hashlib
import json
import re
from datetime import datetime, timezone
from warehouse import ROOT, execute

RUN=ROOT/'evidence/m_capital_20260925_g176'
FILES=['01_customer_mapping.sql','06_orders.sql','07_invoice_links.sql','08_invoice_facts.sql','09_invoice_controls.sql','10_fx_context.sql','11_invoice_attribution.sql','12_invoice_analysis.sql','13_order_scope.sql']

def main():
    assert json.loads((RUN/'warehouse-manifest.json').read_text()).get('complete'), 'Source freeze incomplete'
    dest=RUN/'model-deployment.json'
    report=json.loads(dest.read_text()) if dest.exists() else {'objects':[]}
    prior={r['name']:r for r in report['objects']}
    for name in FILES:
        path=ROOT/'sql/20_models'/name
        sql=path.read_text()
        target=re.search(r'CREATE VIEW (sandbox\.m_capital__[a-z0-9_]+)',sql).group(1)
        digest=hashlib.sha256(path.read_bytes()).hexdigest()
        if target in prior:
            assert prior[target]['sql_sha256']==digest, 'Changed deployed SQL: use a reviewed new version'
            print(target,'already deployed; hash unchanged',flush=True)
            continue
        present=int(json.loads(execute(f"SELECT count() AS n FROM system.tables WHERE database='sandbox' AND name='{target.split('.')[1]}' LIMIT 1 FORMAT JSON"))['data'][0]['n'])
        assert not present, 'Existing object not owned by this manifest: '+target
        body=sql.split(' SQL SECURITY INVOKER AS\n',1)[1].strip().rstrip(';')
        preview=json.loads(execute(f'SELECT * FROM ({body}) LIMIT 2 FORMAT JSON'))
        assert all('.' not in m['name'] for m in preview['meta']), 'Explicit output aliases required'
        execute(sql,write=True)
        report['objects'].append({'name':target,'sql_file':str(path.relative_to(ROOT)),'sql_sha256':digest,
            'created_at_utc':datetime.now(timezone.utc).isoformat(),'preflight_rows':len(preview['data'])})
        dest.write_text(json.dumps(report,indent=2))
        print(target,'preflight and CREATE PASS',flush=True)

if __name__=='__main__': main()
