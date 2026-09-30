import importlib.util,subprocess,json
from pathlib import Path
from openpyxl import load_workbook
root=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('doc_renderer','/Users/josefneumann/.codex/plugins/cache/openai-primary-runtime/documents/26.909.61513/skills/documents/render_docx.py')
mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
profile=root/'build/tmp/excel-profile';profile.mkdir(parents=True,exist_ok=True)
check=root/'build/recalculated';check.mkdir(exist_ok=True)
original=root/'outputs/dda-business-case/DDA-business-case-model.xlsx'
command=[mod._resolve_soffice(),f'-env:UserInstallation={profile.as_uri()}','--headless','--norestore','--convert-to','xlsx','--outdir',str(check),str(original)]
run=subprocess.run(command,env=mod._build_lo_env(str(profile)),capture_output=True,text=True,timeout=45)
print(run.stdout,run.stderr);assert run.returncode==0
book=load_workbook(check/original.name,data_only=True)
errors=[(s.title,c.coordinate,c.value)for s in book for row in s for c in row if c.data_type=='e'];assert not errors,errors
checks={'Cost model!K23':147511800,'Cost model!K32':74475900,'Cost model!K34':73035900,'Cost model!K54':65643400,'Customers!K18':2047235.66,'Demand!E11':4921}
for key,expected in checks.items():
    sheet,cell=key.split('!');assert abs(book[sheet][cell].value-expected)<.01,(key,book[sheet][cell].value)
(root/'build/excel-engine-check.json').write_text(json.dumps({'engine':'LibreOffice headless recalculation of a private copy','checks':checks,'formula_errors':errors},indent=2));print('Recalculated copy matches all control totals with no formula errors.')
