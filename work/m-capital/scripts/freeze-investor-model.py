"""Freeze reviewed-model inputs in project-only tables; never replace or delete data."""
import hashlib,json,re
from datetime import datetime,timezone
from decimal import Decimal as D, ROUND_DOWN
from pathlib import Path
from warehouse import ROOT,execute

RUN=ROOT/'evidence/m_capital_20260925_g176'
DATA=RUN/'investor-model'
DDL=ROOT/'sql/30_analysis/frozen_review'

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def query(q):return json.loads(execute(q))['data']
def infer(key,values):
    non=[v for v in values if v is not None]
    optional=len(non)!=len(values)
    if not non:t='String'
    elif all(isinstance(v,bool) for v in non):t='Bool'
    elif all(isinstance(v,int) and not isinstance(v,bool) for v in non):
        t='UInt32' if min(non)>=0 and max(non)<2**32 else 'Int64'
    elif all(isinstance(v,str) and re.fullmatch(r'\d{4}-\d{2}-\d{2}',v) for v in non):t='Date32'
    elif all(isinstance(v,(str,float)) and re.fullmatch(r'-?\d+(\.\d+)?',str(v)) for v in non) and key not in ['customer_id','currency']:
        t='Decimal(38,12)'
    else:t='String'
    return ('Nullable('+t+')') if optional else ('LowCardinality(String)' if t=='String' else t)
def normalized(v,t):
    if v is None:return None
    if 'Decimal' in t:return str(D(str(v)).quantize(D('.000000000001'),rounding=ROUND_DOWN))
    if 'Int' in t:return int(v)
    if 'Bool' in t:return bool(v)
    if isinstance(v,(dict,list)):return json.dumps(v,sort_keys=True,separators=(',',':'))
    return str(v)

def main():
    DDL.mkdir(exist_ok=True,parents=True)
    dest=DATA/'warehouse-review-manifest.json'
    report=json.loads(dest.read_text()) if dest.exists() else {'run_id':'m_capital_20260925_g176','version':'investor-review-1','created_at':datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S'),'objects':[]}
    names=list(json.loads((DATA/'summary.json').read_text())['files'])+['summary']
    names += [n for n in ['forecast_results','release_manifest'] if (DATA/(n+'.json')).exists()]
    for name in names:
        path=DATA/(name+'.json');raw=json.loads(path.read_text());rows=raw if isinstance(raw,list) else [raw]
        assert rows,'Empty dataset needs explicit schema'
        table='sandbox.m_capital__r1_20260925_'+name
        fields=[k for k in rows[0] if k!='model_version'];types={k:infer(k,[r[k] for r in rows]) for k in fields}
        if name=='forecast_results':
            for k in fields:
                if k.endswith('_usd') or k=='retention_factor':
                    assert all(isinstance(r[k],(int,float)) for r in rows),'Released scenario contains an unavailable numeric output'
                    types[k]='Decimal(38,12)'
        digest=sha(path)
        body=',\n'.join('    `'+k+'` '+t for k,t in types.items())
        sql=f'''/*---
kind: frozen_table
project_id: m-capital
database: sandbox
name: {table}
status: internal review; limitations retained
purpose: Frozen {name} supporting reproducible investor review Excel
grain: source-model record; validated stable ordinal preserves exact extraction order
as_of_date: 2026-09-06
source: [generation-176 frozen project sources and approved decisions]
depends_on: [evidence/m_capital_20260925_g176/investor-model/{name}.json]
scope: {{company_ids: [2,3,5], intercompany_exclusions: [8,9,10,11,663]}}
source_cutoff: 2026-09-06
reporting_cutoff: 2026-08-31
owner: Finance / Revenue Operations
created_for: M-Capital investor analysis
materialization: immutable run-specific table; no TTL; one bounded batch
---*/
CREATE TABLE {table} (
    row_number UInt32,
{body},
    analysis_run_id LowCardinality(String),
    source_cutoff Date,
    reporting_cutoff Date,
    created_at DateTime('UTC'),
    source_extracted_at Date,
    model_version LowCardinality(String),
    file_sha256 String,
    source_json String
) ENGINE=MergeTree ORDER BY (analysis_run_id,row_number);
'''
        ddl=DDL/(name+'.sql')
        if ddl.exists():assert ddl.read_text()==sql,'DDL changed; use a new version'
        else:ddl.write_text(sql)
        exists=int(query(f"SELECT count() AS n FROM system.tables WHERE database='sandbox' AND name='{table.split('.')[1]}' LIMIT 1 FORMAT JSON")[0]['n'])
        if not exists:execute(sql,write=True)
        payload=[]
        for i,r in enumerate(rows):
            payload.append({'row_number':i+1,**{k:normalized(r[k],types[k]) for k in fields},
                'analysis_run_id':report['run_id'],'source_cutoff':'2026-09-06','reporting_cutoff':'2026-08-31',
                'created_at':report['created_at'],'source_extracted_at':'2026-09-06','model_version':report['version'],
                'file_sha256':digest,'source_json':json.dumps(r,sort_keys=True,separators=(',',':'))})
        count=int(query(f"SELECT count() AS n FROM {table} WHERE analysis_run_id='{report['run_id']}' LIMIT 1 FORMAT JSON")[0]['n'])
        if not count:execute(f'INSERT INTO {table} FORMAT JSONEachRow',data='\n'.join(json.dumps(r) for r in payload)+'\n',write=True)
        else:assert count==len(payload),'Existing partial/different dataset; no overwrite'
        cols=', '.join('`'+k+'`' for k in payload[0])
        actual=query(f"SELECT {cols} FROM {table} WHERE analysis_run_id='{report['run_id']}' ORDER BY row_number LIMIT 100001 FORMAT JSON")
        assert len(actual)==len(payload)<100001
        for expected,got in zip(payload,actual):
            for k,v in expected.items():
                if k in types:assert normalized(got[k],types[k])==normalized(v,types[k]),(name,k)
                else:assert got[k]==v,(name,k)
        report['objects']=[o for o in report['objects'] if o['name']!=table]+[{'name':table,'rows':len(rows),'file':str(path.relative_to(ROOT)),'sha256':digest,'ddl_file':str(ddl.relative_to(ROOT)),'ddl_sha256':sha(ddl),'all_fields_equal':True}]
        dest.write_text(json.dumps(report,indent=2))
        print(table,len(rows),'all fields and exact source JSON verified',flush=True)
    report['complete']=True;report['freezer_sha256']=sha(Path(__file__))
    dest.write_text(json.dumps(report,indent=2))

if __name__=='__main__':main()
