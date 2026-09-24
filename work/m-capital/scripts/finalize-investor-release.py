"""Create immutable release evidence after workbook validation and human-agent visual QA."""
import hashlib,json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'outputs/investor-analysis'
DATA=ROOT/'evidence/m_capital_20260925_g176/investor-model'

def read(p):return json.loads(p.read_text())
def record(p):return {'file':str(p.relative_to(ROOT)),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size}
def immutable(p,data):
    text=json.dumps(data,indent=2,sort_keys=True)+'\n'
    if p.exists():assert p.read_text()==text,'Issued evidence changed; use a new release version'
    else:p.write_text(text)

def main():
    export=read(OUT/'export-verification.json')
    visual=read(OUT/'visual-review.json')
    assert visual['status']=='passed' and len(visual['sheets'])==18
    book=OUT/'Circularo Investor Customer Revenue & Retention Analysis.xlsx'
    assert record(book)['sha256']==export['workbook_sha256']
    tested=read(OUT/'validation.json')
    assert tested['builderSha256']==record(ROOT/'scripts/build-investor-workbook.mjs')['sha256']
    result=read(OUT/'forecast-result-snapshot.json')
    keys=['customer_year_key','customer_id','year','opening_arr_usd','retention_factor','retained_arr_usd','lost_arr_usd','modeled_expansion_arr_usd','named_event_arr_change_usd','closing_arr_usd','retained_base_revenue_usd','modeled_expansion_revenue_usd','named_event_recurring_change_usd','one_time_revenue_usd','total_scenario_revenue_usd','input_status']
    rows=[dict(zip(keys,row),scenario=result['scenario'],scenario_version='investor-review-1') for row in result['rows']]
    assert len(rows)==1260 and len({r['customer_year_key'] for r in rows})==1260
    immutable(DATA/'forecast_results.json',rows)
    core=read(DATA/'warehouse-review-manifest.json')
    core_objects=[o for o in core['objects'] if not o['name'].endswith(('_forecast_results','_release_manifest'))]
    assert len(core_objects)==15 and all(o['all_fields_equal'] for o in core_objects)
    sources=read(DATA.parent/'warehouse-manifest.json')['objects']
    views=read(DATA.parent/'model-deployment.json')['objects']
    names=[o['name'] for o in reversed(views)]+[o['name'] for o in core_objects]+['sandbox.m_capital__r1_20260925_forecast_results','sandbox.m_capital__r1_20260925_release_manifest']+[o['name'] for o in sources]
    assert len(names)==len(set(names))==43
    cleanup='-- REVIEW ONLY. NO STATEMENT IS EXECUTABLE. No cleanup is authorized.\n-- Retain every dependency of the issued internal-review workbook.\n-- Approval must identify exact targets and retention/reproducibility treatment.\n-- Recheck the live dependency graph before approving any deletion.\n\n'+'\n'.join('-- DROP TABLE '+n+';' for n in names)+'\n'
    cleanup_path=ROOT/'sql/90_cleanup/review-only-cleanup.sql'
    if cleanup_path.exists():assert cleanup_path.read_text()==cleanup
    else:cleanup_path.write_text(cleanup)
    paths=[book,*[OUT/n for n in ['validation.json','export-verification.json','visual-review.json','tested-formula-baseline.json','formula-scan.json','forecast-result-snapshot.json','overview-inspection.json']],DATA/'forecast_results.json']
    paths += sorted((ROOT/'previews/investor-analysis').glob('*.png'))
    paths += [ROOT/'scripts'/n for n in ['prepare-investor-model.py','build-investor-workbook.mjs','verify-investor-export.py','verify-saved-workbook.mjs','freeze-investor-model.py','finalize-investor-release.py']]
    paths += [ROOT/n for n in ['TASK.md','analysis-decisions.md','execution-plan.md','evidence/investor-review-findings.md','sql/90_cleanup/object-inventory.md','sql/90_cleanup/review-only-cleanup.sql']]
    paths += [ROOT/n for n in ['AGENTS.md','codex-odoo-data-brief.md','data-semantics.md','evidence/source-readiness.md']]
    paths += [DATA.parent/n for n in ['source-manifest.json','warehouse-manifest.json','model-deployment.json','approved-decisions.json']]
    manifest={'release_id':'m_capital_20260925_g176_investor_review_1','status':'Completed internal-review deliverable; investor publication not approved',
        'source_snapshot':'2026-09-06','contractual_portfolio_date':'2026-09-06','billing_start':'2019-01-01','billing_cutoff':'2026-08-31',
        'forecast_years':[2027,2028,2029],'forecast_case':result['scenario'],'forecast_status':'Working scenario, not approved forecast',
        'source_review_objects':core_objects,'artifacts':[record(p) for p in paths],
        'limitations':['Five contract prices require review; net ARR is provisional','Historical attribution and service dates incomplete; portfolio retention and lifetime CLV unavailable','Native Excel recalculation not exercised','Names anonymized; external disclosure not approved']}
    immutable(DATA/'release_manifest.json',manifest)
    print('Release evidence prepared; run freeze-investor-model.py to verify and freeze final results and manifest in sandbox.')

if __name__=='__main__':main()
