from pathlib import Path
from zipfile import ZipFile
from lxml import etree as E
from PIL import Image, ImageOps, ImageDraw
import hashlib,json

base=Path(__file__).parent
ref=Path('/Users/josefneumann/Downloads/[template] EN Proposal for Circularo Enterprise Plan Subscription.docx')
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
with ZipFile(ref) as z:
    parts={n:{'size':len(z.read(n)),'sha256':hashlib.sha256(z.read(n)).hexdigest()} for n in z.namelist()}
    (base/'qa/package-inventory.json').write_text(json.dumps(parts,indent=2))
    root=E.fromstring(z.read('word/document.xml'))
    print('SOURCE_SHA',hashlib.sha256(ref.read_bytes()).hexdigest())
    print('COUNTS', {k:len(root.xpath(v,namespaces=ns)) for k,v in {'sections':'.//w:sectPr','controls':'.//w:sdt','drawings':'.//w:drawing','fields':'.//w:instrText','footnotes':'.//w:footnoteReference'}.items()})
    print('FIELDS',root.xpath('.//w:instrText/text()',namespaces=ns))
for start in range(1,43,6):
    out=Image.new('RGB',(1200,1584),'#dddddd')
    for j,n in enumerate(range(start,min(start+6,43))):
        im=Image.open(base/f'qa/template/page-{n}.png').convert('RGB')
        im.thumbnail((390,750))
        x=(j%3)*400;y=(j//3)*792
        out.paste(im,(x,y+25));ImageDraw.Draw(out).text((x+10,y+5),f'Page {n}',fill='black')
    out.save(base/f'qa/template/contact-{start}.png')
