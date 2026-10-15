"""Render the executive Markdown as a concise Circularo-branded PDF."""
from pathlib import Path
import re
from html import escape
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, Flowable
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / 'work/competitive-analysis'
ASSETS = ROOT / '.agents/skills/circularo-slides/assets'
SOURCE = OUT / 'Circularo-Executive-Competitive-Summary.md'
DEST = OUT / 'Circularo-Executive-Competitive-Summary.pdf'
for name, file in [('Mulish','mulish-regular.ttf'),('MulishBold','mulish-bold.ttf'),('Spartan','spartan-bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(ASSETS/'fonts'/file)))
pdfmetrics.registerFontFamily('Mulish', normal='Mulish', bold='MulishBold', italic='Mulish', boldItalic='MulishBold')
PURPLE=colors.HexColor('#7000FF'); NAVY=colors.HexColor('#1D0090'); BODY=colors.HexColor('#3D3D3D')
MUTED=colors.HexColor('#667085'); LIGHT=colors.HexColor('#F5EDFF'); LINE=colors.HexColor('#E4E7EC')
PAGE_W,PAGE_H=595.276,841.89
MARGIN=40; WIDTH=PAGE_W-MARGIN*2

styles={
 'body':ParagraphStyle('body',fontName='Mulish',fontSize=10.2,leading=14.1,textColor=BODY,spaceAfter=8),
 'h':ParagraphStyle('h',fontName='Spartan',fontSize=12.2,leading=16,textColor=NAVY,spaceBefore=12,spaceAfter=6,keepWithNext=True),
 'title':ParagraphStyle('title',fontName='Spartan',fontSize=25.5,leading=32,textColor=NAVY,spaceAfter=13),
 'pageTitle':ParagraphStyle('pageTitle',fontName='Spartan',fontSize=22,leading=28,textColor=NAVY,spaceAfter=10),
 'kicker':ParagraphStyle('kicker',fontName='MulishBold',fontSize=9,leading=13,textColor=PURPLE,spaceAfter=11),
 'cell':ParagraphStyle('cell',fontName='Mulish',fontSize=9.15,leading=12.3,textColor=BODY),
 'cellhead':ParagraphStyle('cellhead',fontName='MulishBold',fontSize=9.2,leading=12,textColor=colors.white),
 'note':ParagraphStyle('note',fontName='Mulish',fontSize=8.1,leading=10.8,textColor=MUTED,spaceBefore=7,spaceAfter=7),
 'sources':ParagraphStyle('sources',fontName='Mulish',fontSize=7.7,leading=10.2,textColor=MUTED,spaceAfter=2),
 'sourcehead':ParagraphStyle('sourcehead',fontName='MulishBold',fontSize=8,leading=11,textColor=NAVY,spaceBefore=8,spaceAfter=5),
}
source_text=SOURCE.read_text()
source_rows=re.findall(r'^(\d+)\. \[([^\]]+)\]\((https?://[^)]+)\)\.',source_text,re.M)
source_map={n:url for n,_,url in source_rows}

def markup(text):
    text=escape(text.strip())
    text=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',text)
    def cites(match):
        numbers=re.findall(r'\d+',match[0])
        return '<super>'+', '.join(f'<link href="{source_map[n]}" color="#7000FF">{n}</link>' for n in numbers)+'</super>'
    text=re.sub(r'(?:\[\d+\])+',cites,text)
    if text.startswith('*') and text.endswith('*'): text=text[1:-1]
    return text

def para(text,style='body'): return Paragraph(markup(text),styles[style])

class ServiceModel(Flowable):
    def __init__(self):
        Flowable.__init__(self); self.width=WIDTH; self.height=54
    def draw(self):
        c=self.canv; gap=17; w=(WIDTH-3*gap)/4
        labels=[('ONE OPERATOR','Central service operation'),('SHARED PLATFORM','Common trust infrastructure'),('PARTICIPATING ENTITIES','Organization-specific controls'),('PROCESSES & EVIDENCE','Approval, signing and records')]
        for i,(title,caption) in enumerate(labels):
            x=i*(w+gap)
            c.setFillColor(LIGHT);c.roundRect(x,7,w,43,4,fill=1,stroke=0)
            c.setFont('MulishBold',7.8);c.setFillColor(NAVY);c.drawCentredString(x+w/2,34,title)
            p=Paragraph(escape(caption),ParagraphStyle('flow',fontName='Mulish',fontSize=7.8,leading=10,alignment=1,textColor=BODY))
            _,h=p.wrap(w-10,25);p.drawOn(c,x+5,28-h)
            if i<3:
                c.setStrokeColor(PURPLE);c.setLineWidth(1.1);c.line(x+w+4,29,x+w+gap-4,29)
                c.line(x+w+gap-7,32,x+w+gap-4,29);c.line(x+w+gap-7,26,x+w+gap-4,29)

def make_table(lines):
    rows=[[v.strip() for v in l.strip().strip('|').split('|')] for l in lines]
    rows=[r for r in rows if not all(re.fullmatch(r'[:\- ]+',v) for v in r)]
    comparison=len(rows[0])==4
    widths=[88,157,135,WIDTH-380] if comparison else [108,WIDTH-108]
    converted=[]
    for i,r in enumerate(rows):
        converted.append([para(cell,'cellhead' if i==0 else 'cell') for cell in r])
    table=Table(converted,colWidths=widths,hAlign='LEFT',repeatRows=1)
    cmds=[('BACKGROUND',(0,0),(-1,0),NAVY),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),9),('RIGHTPADDING',(0,0),(-1,-1),9),('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),9),('LINEBELOW',(0,0),(-1,0),0.5,NAVY)]
    for i in range(1,len(rows)):
        cmds.extend([('BACKGROUND',(0,i),(-1,i),colors.HexColor('#F8F9FC') if i%2 else colors.white),('LINEBELOW',(0,i),(-1,i),0.4,LINE)])
        if comparison:cmds.append(('BACKGROUND',(1,i),(1,i),LIGHT))
    table.setStyle(TableStyle(cmds));return table

def header(c,doc):
    c.saveState()
    logo=ImageReader(str(ASSETS/'logos/circularo-logo-logotype-blue.png'))
    iw,ih=logo.getSize(); lw=99;lh=lw*ih/iw
    c.drawImage(logo,MARGIN,PAGE_H-43-lh/2,width=lw,height=lh,mask='auto')
    c.setFillColor(MUTED);c.setFont('MulishBold',8)
    c.drawRightString(PAGE_W-MARGIN,PAGE_H-43,'PARTNER & INVESTOR PERSPECTIVE')
    c.setStrokeColor(LINE);c.setLineWidth(.5);c.line(MARGIN,PAGE_H-65,PAGE_W-MARGIN,PAGE_H-65)
    c.line(MARGIN,32,PAGE_W-MARGIN,32)
    c.setFont('Mulish',7.6);c.setFillColor(MUTED)
    c.drawString(MARGIN,20,'CIRCULARO  /  SEPTEMBER 2026')
    c.drawRightString(PAGE_W-MARGIN,20,f'{doc.page} / 3')
    c.restoreState()

story=[]; lines=source_text.split('### Selected sources')[0].splitlines();i=0
while i<len(lines):
    line=lines[i].strip()
    if not line or line=='# Circularo':i+=1;continue
    if line.startswith('## Unified'):
        story.append(Paragraph('Unified Sovereign Trust<br/>Platform vs. Alternatives',styles['title']));i+=1;continue
    if line.startswith('**Executive Competitive Summary'):
        story.append(para('EXECUTIVE COMPETITIVE SUMMARY','kicker'));i+=1;continue
    if line.startswith('### '):
        title=line[4:]
        if title in ('How Circularo compares','Why this matters to partners'):
            story.append(PageBreak())
            if title=='Why this matters to partners':
                story.append(para('Partner & investment perspective','pageTitle'))
                story.append(para(title,'h'))
            else:story.append(para(title,'pageTitle'))
        else: story.append(para(title,'h'))
        i+=1;continue
    if line.startswith('|'):
        group=[]
        while i<len(lines) and lines[i].strip().startswith('|'):group.append(lines[i]);i+=1
        story.extend([make_table(group),Spacer(1,8)]);continue
    group=[line];i+=1
    while i<len(lines) and lines[i].strip() and not lines[i].strip().startswith(('#','|')):
        group.append(lines[i].strip());i+=1
    text=' '.join(group)
    if text.startswith('**One operator'):story.append(ServiceModel())
    elif text.startswith('*Comparison basis:'):story.append(para(text,'note'))
    else:story.append(para(text))

story.append(para('SELECTED SOURCES  /  CLICK TO OPEN','sourcehead'))
sources=[]
for n,title,url in source_rows:
    short=title.replace('Circularo: ','Circularo / ').replace('Adobe Acrobat Sign: ','Adobe / ').replace('Namirial eSignAnyWhere: ','Namirial / ')
    sources.append(Paragraph(f'<b>{n}.</b> <link href="{url}" color="#1D0090">{escape(short)}</link>',styles['sources']))
mid=(len(sources)+1)//2
left=sources[:mid];right=sources[mid:]
st=Table([[left,right]],colWidths=[WIDTH/2,WIDTH/2],hAlign='LEFT')
st.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),12),('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),0)]))
story.append(st)
doc=SimpleDocTemplate(str(DEST),pagesize=(PAGE_W,PAGE_H),leftMargin=MARGIN,rightMargin=MARGIN,topMargin=83,bottomMargin=44,title='Circularo | Executive Competitive Summary',author='Circularo',subject='Unified Sovereign Trust Platform vs. Alternatives')
doc.build(story,onFirstPage=header,onLaterPages=header)
print(DEST)
