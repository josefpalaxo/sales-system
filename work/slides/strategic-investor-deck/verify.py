"""Independent checks of the saved investor PPTX and its rendered pages."""
import hashlib
import json
import re
import subprocess
import xml.etree.ElementTree as ET
from pathlib import Path
from zipfile import ZipFile
from PIL import Image

work=Path(__file__).resolve().parent
receipt=json.loads((work/'latest-build.json').read_text())
build=Path(receipt['build'])
pptx=Path(receipt['pptx'])
content=json.loads((work/'content.json').read_text())
audit=json.loads((build/'geometry.json').read_text())
ns={'p':'http://schemas.openxmlformats.org/presentationml/2006/main',
    'a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
normalize=lambda t:' '.join(t.split())
checks=[]
def check(test,label):
    assert test,label
    checks.append(label)

with ZipFile(pptx) as z:
    parts=[n for n in z.namelist() if re.fullmatch(r'ppt/slides/slide\d+\.xml',n)]
    check(len(parts)==12,'12 core slides')
    root=ET.fromstring(z.read('ppt/presentation.xml'))
    size=root.find('p:sldSz',ns)
    check((size.get('cx'),size.get('cy'))==('18288000','10287000'),'1920x1080 native canvas')
    slide_text=[]
    for i,s in enumerate(content['slides'],1):
        xml=ET.fromstring(z.read(f'ppt/slides/slide{i}.xml'))
        text=normalize(' '.join(t.text or '' for t in xml.findall('.//a:t',ns)))
        slide_text.append(text)
        check(normalize(s['title']) in text,f'Slide {i}: native title')
        objects=audit and [o for o in audit if o['slide']==s['id'] and o['kind']=='text']
        for o in objects:
            check(normalize(o['text']) in text,f'Slide {i}: live text {o["name"]}')
        check('Add supporting text' not in text and 'Slide title' not in text,f'Slide {i}: no accidental template prompt')
        for r in xml.findall('.//a:rPr',ns):
            latin=r.find('a:latin',ns)
            if latin is not None:check(latin.get('typeface') in ('Spartan','Mulish'),f'Slide {i}: native font')
        pics=xml.findall('.//p:pic',ns)
        check(len(pics)>=1,f'Slide {i}: embedded brand artwork')
        note=ET.fromstring(z.read(f'ppt/notesSlides/notesSlide{i}.xml'))
        notes=normalize(' '.join(t.text or '' for t in note.findall('.//a:t',ns)))
        check('circularo-investment-materials-fact-check.md' in notes,f'Slide {i}: source provenance')
        for claim in s['claimIds']:check(claim in notes,f'Slide {i}: claim {claim}')
        if s.get('review'):
            check(normalize(s['review']['label']) in text,f'Slide {i}: visible review placeholder')
            check(normalize(s['review']['text']) in text,f'Slide {i}: visible reason')
    check('2025 revenue' in slide_text[1] and '$2.794M' in slide_text[1],'Dated revenue $2.794M')
    check('2025 adjusted EBITDA' in slide_text[1] and '$0.859M' in slide_text[1],'Dated adjusted EBITDA $0.859M')
    check('[DATE TO CONFIRM]' in slide_text[1],'Missing ARR date stays visible')
    check('$10–15M' in slide_text[10] and 'Up to 25%' in slide_text[10],'Transaction range and up-to boundary')
    check('founder secondary' in slide_text[10] and 'selling founders' in slide_text[10],'Secondary transaction preserved')
    check('≈$3M' in slide_text[9] and '≈$9M' in slide_text[9] and '2–3 years' in slide_text[9],'ARR endpoints and horizon')
    check('not a forecast' in slide_text[9] and '$6M' in slide_text[9],'Ambition caveat and arithmetic gap')
    check('live' in slide_text[8].lower() and 'management confirmation' in slide_text[8].lower(),'Qualified live product status')
    check('investors@circularo.com' in slide_text[11],'Closing contact')
    all_text=' '.join(slide_text)
    for held in ['$10–25M','40% YoY','200+','130+','80%','5% churn','700M','Mubadala','Etisalat']:
        check(held not in all_text,f'Excluded held claim: {held}')
    table=ET.fromstring(z.read('ppt/slides/slide8.xml')).find('.//a:tbl',ns)
    check(table is not None,'Slide 8: native editable table')
    rows=[[normalize(' '.join(t.text or '' for t in cell.findall('.//a:t',ns))) for cell in row.findall('a:tc',ns)] for row in table.findall('a:tr',ns)]
    check(rows==content['slides'][7]['rows'],'All priority table cells match source content')
    for i,n in [(5,4),(7,2)]:
        xml=ET.fromstring(z.read(f'ppt/slides/slide{i}.xml'))
        check(len(xml.findall('.//p:cxnSp',ns))==n,f'Slide {i}: native attached process connectors')

runtime=Path('/Users/josefneumann/.cache/codex-runtimes/codex-primary-runtime/dependencies')
pdffonts=runtime/'native/poppler/poppler/bin/pdffonts'
if not pdffonts.exists():pdffonts=runtime/'bin/override/pdffonts'
for directory,dim in [('preview-1080p',(1920,1080)),('preview-4k',(3840,2160))]:
    pngs=sorted((build/directory).glob('slide-*.png'))
    check(len(pngs)==12,f'{directory}: complete render set')
    for i,p in enumerate(pngs,1):
        with Image.open(p) as im:check(im.size==dim,f'{directory}: slide {i} dimensions')
    pdf=build/directory/(pptx.stem+'.pdf')
    fontdata=subprocess.check_output([str(pdffonts),str(pdf)],text=True)
    fonts={re.sub(r'^[A-Z]{6}\+','',line.split()[0]) for line in fontdata.splitlines()[2:] if line.strip()}
    check(fonts=={'Spartan-Bold','Mulish-Regular','Mulish-Bold'},f'{directory}: rendered fonts only Spartan/Mulish')

report={'passed':True,'sha256':hashlib.sha256(pptx.read_bytes()).hexdigest(),'checks':len(checks),'details':checks,
        'visualReview':'Separate full-slide review performed by assistant; native PowerPoint editing not tested.'}
(build/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:v for k,v in report.items() if k!='details'},indent=2))
