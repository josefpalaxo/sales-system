"""Inspect native XLSX structure and cached financial results without modifying the file."""
import hashlib,json,zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'outputs/investor-analysis'
FILE=OUT/'Circularo Investor Customer Revenue & Retention Analysis.xlsx'
NS={'s':'http://schemas.openxmlformats.org/spreadsheetml/2006/main','c':'http://schemas.openxmlformats.org/drawingml/2006/chart'}

def main():
    with zipfile.ZipFile(FILE) as z:
        book=ET.fromstring(z.read('xl/workbook.xml'))
        sheets=[x.attrib['name'] for x in book.findall('s:sheets/s:sheet',NS)]
        assert len(sheets)==18 and sheets[0]=='Overview'
        errors=[];formula_count=0;validation_count=0;panes=0;formula_records=[]
        for name in z.namelist():
            if name.startswith('xl/worksheets/sheet') and name.endswith('.xml'):
                r=ET.fromstring(z.read(name))
                errors.extend((name,c.attrib.get('r'),c.findtext('s:v',namespaces=NS)) for c in r.findall('.//s:c',NS) if c.attrib.get('t')=='e')
                formula_count+=len(r.findall('.//s:f',NS));validation_count+=len(r.findall('.//s:dataValidation',NS));panes+=len(r.findall('.//s:pane',NS))
                formula_records += [(name,c.attrib['r'],c.findtext('s:f',namespaces=NS)) for c in r.findall('.//s:c',NS) if c.find('s:f',NS) is not None]
        assert not errors,errors[:10]
        charts=[n for n in z.namelist() if '/charts/chart' in n and n.endswith('.xml')]
        assert len(charts)==1
        chart=ET.fromstring(z.read(charts[0]))
        bindings=[n.text for n in chart.findall('.//c:f',NS)]
        assert any('Revenue' in x for x in bindings),bindings
        assert validation_count>=5 and panes>=10
        assert not any(n.startswith('xl/externalLinks/') for n in z.namelist())
        assert not any('vbaProject' in n for n in z.namelist())
        # Saved native values, not merely authoring formulas.
        overview=ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
        cells={c.attrib['r']:c for c in overview.findall('.//s:c',NS)}
        cached=lambda key:float(cells[key].findtext('s:v',namespaces=NS))
        summary=json.loads((ROOT/'evidence/m_capital_20260925_g176/investor-model/summary.json').read_text())
        assert abs(cached('D7')-float(summary['candidate_net_arr']))<.02
        assert abs(cached('D28')-float(summary['candidate_net_arr']))<.02
        if tests_path_exists := (OUT/'tested-formula-baseline.json').exists():
            detail=ET.fromstring(z.read('xl/worksheets/sheet9.xml'))
            detail_cells={c.attrib['r']:c for c in detail.findall('.//s:c',NS)}
            contracts=json.loads((ROOT/'evidence/m_capital_20260925_g176/investor-model/contracts.json').read_text())
            for row,contract in enumerate(contracts,8):
                for col,key in [('AC','plan_id'),('AD','reseller_id'),('AE','distributor_id')]:
                    cell=detail_cells.get(col+str(row));v=None if cell is None else cell.findtext('s:v',namespaces=NS)
                    assert (None if v is None else float(v))==contract[key],(row,col,key)
    formula_sha=hashlib.sha256(json.dumps(sorted(formula_records),separators=(',',':')).encode()).hexdigest()
    tests=json.loads((OUT/'validation.json').read_text())
    baseline=OUT/'tested-formula-baseline.json'
    if baseline.exists():assert json.loads(baseline.read_text())['formula_sha256']==formula_sha,'Financial formulas changed: rerun the full scenario suite'
    else:
        assert tests.get('fullScenarioSuite',True),'Initial formula baseline requires the full scenario suite'
        baseline.write_text(json.dumps({'formula_sha256':formula_sha,'tested_builder_sha256':tests['builderSha256'],'tests':tests['tests'],'status':'Full scenario suite passed before presentation-only changes'},indent=2))
    result={'status':'Native export checks passed; visual review recorded separately','sheets':sheets,'formula_count':formula_count,'formula_sha256':formula_sha,'tested_formula_baseline_verified':True,'contract_plan_and_channel_ids_verified':tests_path_exists,
        'data_validation_rules':validation_count,'frozen_panes':panes,'charts':len(charts),'chart_bindings':bindings,
        'cached_formula_errors':errors,'native_excel_recalculation':'Not exercised','workbook_sha256':hashlib.sha256(FILE.read_bytes()).hexdigest(),
        'workbook_bytes':FILE.stat().st_size,'validator_sha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest()}
    (OUT/'export-verification.json').write_text(json.dumps(result,indent=2))
    print(json.dumps(result,indent=2))

if __name__=='__main__':main()
