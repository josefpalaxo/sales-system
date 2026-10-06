from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from copy import deepcopy
from lxml import etree as E
import hashlib,json

BASE=Path(__file__).parent
REF=Path('/Users/josefneumann/Downloads/[template] EN Proposal for Circularo Enterprise Plan Subscription.docx')
OUT=BASE/'DOE Circularo Enterprise Upgrade Proposal.docx'
assert hashlib.sha256(REF.read_bytes()).hexdigest()=='906fe2dbbc320ed3a4dac710dd56e14c6f60d0dae4c60ab9f7ad0d972fe86498'
W='http://schemas.openxmlformats.org/wordprocessingml/2006/main'
NS={'w':W}
def el(tag,**attrs):
    e=E.Element('{'+W+'}'+tag)
    for k,v in attrs.items():e.set('{'+W+'}'+k,str(v))
    return e
def xml(e):return E.tostring(e,xml_declaration=True,encoding='UTF-8',standalone=True)
with ZipFile(REF) as z:parts={n:z.read(n) for n in z.namelist()}
root=E.fromstring(parts['word/document.xml']);body=root.find('w:body',NS)
source=list(body);cover=[deepcopy(n) for n in source[:30]]
def replace(p,text):
    template=p.find('w:r/w:rPr',NS)
    for c in list(p):
        if c.tag!='{'+W+'}pPr':p.remove(c)
    r=el('r')
    if template is not None:
        rp=deepcopy(template)
        for h in rp.findall('w:highlight',NS):rp.remove(h)
        r.append(rp)
    for i,part in enumerate(text.split('\n')):
        if i:r.append(el('br'))
        t=el('t');t.text=part;t.set('{http://www.w3.org/XML/1998/namespace}space','preserve');r.append(t)
    p.append(r)
for i,s in {5:'Circularo Enterprise\nUpgrade Proposal',7:'Additional capabilities for DoE',8:'Approval oversight and connected document processes',15:'Confidential proposal for',17:'Department of Energy Abu Dhabi',21:'[Issue date]',23:'[Reference]',25:'[Name]'}.items():replace(cover[i],s)
# Shorten subtitle without changing the source visual hierarchy.
for i in [8]:
    rp=cover[i].find('w:r/w:rPr',NS)
    if rp is not None:
        for x in rp.findall('w:highlight',NS):rp.remove(x)
for n in list(body):body.remove(n)
for n in cover[:27]:body.append(n)

def para(text='',style=None,size=22,bold=False,color='222222',before=0,after=160,page=False):
    p=el('p');pp=el('pPr');p.append(pp)
    if style:pp.append(el('pStyle',val=style))
    pp.append(el('spacing',before=before,after=after,line=264,lineRule='auto'))
    pp.append(el('widowControl',val=1))
    if style in ['Heading1','Heading2']:pp.append(el('keepNext',val=1));pp.append(el('keepLines',val=1))
    if page:pp.append(el('pageBreakBefore',val=1))
    r=el('r');rp=el('rPr');r.append(rp)
    if not style:rp.append(el('rFonts',ascii='Mulish',hAnsi='Mulish',cs='Mulish'))
    rp.append(el('sz',val=size));rp.append(el('szCs',val=size));rp.append(el('color',val=color))
    if bold:rp.append(el('b'))
    for i,part in enumerate(text.split('\n')):
        if i:r.append(el('br'))
        t=el('t');t.text=part;r.append(t)
    p.append(r);return p
def p(text):body.append(para(text))
def h1(text):body.append(para(text,'Heading1',40,True,'000000',after=240,page=True))
def h2(text):body.append(para(text,'Heading2',28,True,'000000',before=180,after=140))
def label(text):body.append(para(text,size=22,bold=True,color='1D0090',before=160,after=120))
def bullet(text):
    n=para('•  '+text);pp=n.find('w:pPr',NS);pp.append(el('ind',left=180,hanging=180));body.append(n)
def table(headers,rows,widths):
    t=el('tbl');pr=el('tblPr');t.append(pr);pr.append(el('tblStyle',val='Table1'));pr.append(el('tblW',w=sum(widths),type='dxa'));pr.append(el('tblLayout',type='fixed'))
    borders=el('tblBorders')
    for edge in ['top','left','bottom','right','insideH','insideV']:borders.append(el(edge,val='single',sz=4,color='D9D9E6'))
    pr.append(borders);m=el('tblCellMar')
    for edge in ['top','bottom']:m.append(el(edge,w=100,type='dxa'))
    for edge in ['left','right']:m.append(el(edge,w=130,type='dxa'))
    pr.append(m);grid=el('tblGrid');t.append(grid)
    for width in widths:grid.append(el('gridCol',w=width))
    for i,row in enumerate([headers]+rows):
        tr=el('tr');tp=el('trPr');tp.append(el('cantSplit'));tr.append(tp)
        if i==0:tp.append(el('tblHeader'))
        for s,width in zip(row,widths):
            tc=el('tc');cp=el('tcPr');cp.append(el('tcW',w=width,type='dxa'));cp.append(el('vAlign',val='center'));cp.append(el('shd',fill='1D0090' if i==0 else ('F7F6FB' if i%2 else 'FFFFFF')));tc.append(cp)
            tc.append(para(s,size=20,bold=i==0,color='FFFFFF' if i==0 else '222222',after=0));tr.append(tc)
        t.append(tr)
    body.append(t);body.append(para('',size=6,after=40))

h1('Enterprise upgrade for DoE')
p('We propose upgrading the Department of Energy Abu Dhabi to Circularo Enterprise for 500 Regular Users. The upgrade would extend your existing Business subscription with capabilities to oversee pending approvals, reduce manual document preparation and connect document processes to your business systems.')
p('The proposed scope builds on the signing tools and customizations already included in your subscription. It focuses on additional operational value for administrators, process owners and staff using Circularo across DoE.')
h2('Your existing subscription')
table(['Current scope','Recorded subscription'],[
('Plan and licensed users','Circularo Business with 500 Regular Users'),
('Current subscription period','20 December 2025 to 19 December 2026'),
('Identity and access','UAE Pass Identity Verification and an SMS OTP 20,000 pack'),
('Existing customizations','Custom Domain, Custom Email Identity, Custom Homepage and Custom Role based UI'),
('Support','Essential Support Plan 5×8')],[3100,6683])
p('We propose carrying these existing inclusions into the Enterprise subscription, with the final quantities and commercial terms confirmed in the order schedule. Your existing Business capabilities remain the foundation of the solution.')
h2('Where the upgrade adds value')
bullet('Operational oversight: identify pending actions and give designated staff the tools to resolve delays.')
bullet('Connected preparation: reuse existing forms and bring data into documents from other systems.')
bullet('Additional control: support organizational SAML sign-in, contract renewals and more flexible signing scenarios.')
p('The following pages distinguish included Enterprise capabilities from optional paid add-ons available only with Enterprise. Activation will be planned against your current configuration and the processes DoE chooses to prioritize.')

h1('Greater control over approvals')
p('Enterprise brings together detailed reporting and a designated Controller role, giving DoE a practical way to review outstanding work and act on it.')
h2('See which documents need attention')
p('Advanced Reporting adds detailed views of all transactions and pending transactions for organization administrators. They can see document status, participants and outstanding actions, then use that evidence in operational reviews.')
p('For DoE, this can make it easier to identify which approvals need follow-up and understand where processing slows down. It adds transaction-level detail to the standard reports already available in Business.')
h2('Help stalled processes move forward')
p('The Transaction Controller role allows selected users to review pending transactions and their metadata, then transfer ownership to an appropriate person. This provides a defined route for resolving a transaction when its current owner cannot progress it.')
p('The metadata preview does not itself grant access to the document contents. Controller responsibilities and permissions can therefore be assigned deliberately as part of DoE’s operating model.')
h2('Keep contract dates in view')
p('Contract Deadlines & Renewals brings contract terms, renewal dates and reminders into one place. It supports follow-up before an agreement reaches an important date, including management of non-fixed-term agreements.')
p('Where DoE manages these dates in separate registers, the capability offers an opportunity to reduce parallel tracking and make review responsibilities clearer.')
h2('Connect access to your identity provider')
p('SAML 2.0 Single Sign-On enables authentication through DoE’s compatible organizational identity provider. Staff can use their existing organizational credentials when accessing Circularo.')
p('This adds SAML support to the OAuth 2.0 sign-in options available in Business. We would agree the identity-provider configuration and test the sign-in experience with your IT team before activation.')

h1('Less manual document preparation')
p('Enterprise includes REST API access, external-data pre-fill and PDF Form Field Recognition. Together, these capabilities provide a basis for reducing repeated entry and connecting document preparation to the systems where information already exists.')
h2('Reuse information from your systems')
p('External-data pre-fill can bring third-party data into document fields. Staff can prepare a document using existing information rather than typing the same details again, then review the populated document before sending it for approval or signature.')
p('A useful starting point could be a recurring supplier agreement or internal approval form. We would select the source system, required fields and validation rules together with DoE.')
h2('Connect Circularo to business applications')
p('REST API access enables custom integrations and document-process automation. An agreed integration could pass information between Circularo and a business application, reducing manual hand-offs and making document status available within the wider process.')
p('The upgrade includes API access. Integration design, development and testing are scoped separately. Automated signing and other API-initiated trust services require the applicable consumption add-ons; API access does not provide unlimited automated signing volume.')
h2('Turn existing PDF forms into templates')
p('PDF Form Field Recognition detects fields in uploaded fillable PDF forms, helping staff reuse them as Circularo templates with less manual setup. This is particularly useful where DoE already has a library of standard forms.')
p('We would validate recognition on representative DoE fillable PDF forms before agreeing the rollout scope, so that the selected templates are ready for staff to use.')
label('An example to validate together')
p('Select one recurring agreement. Reuse its fillable PDF, pre-fill agreed details from a source system and route it through the chosen approval process. Administrators can then review pending actions, with a Controller available to resolve an ownership blockage.')
p('This gives DoE a concrete way to evaluate the combination against preparation time, rework and completion time before extending it to other processes.')

h1('More flexibility for your teams')
p('The Enterprise scope also includes the following capabilities. Each can be activated where it supports a defined DoE requirement.')
h2('In person signing')
p('Staff can hand over a laptop, tablet or mobile device securely so another person can sign during a face-to-face meeting. This supports attended signing when completing a document together is more practical than sending a remote request.')
h2('Choose the signature provider')
p('Signature Provider Selection lets users choose an available provider during a signing session, such as Circularo or an enabled third-party provider. This is distinct from the UAE Pass Identity Verification already included in your subscription.')
p('UAE Pass signing and other third-party signing services require their applicable service activation and commercial arrangements. Provider selection alone does not include those services or their consumption.')
h2('Choose the signature mode')
p('Signature Mode Selection allows a choice between a composite signature that seals the completed document and individual signatures that apply a certificate to each signing event. DoE can select the approach suited to its document and review requirements.')
p('We would agree the required mode for each document process during configuration. Qualified signing services, where required, would be scoped separately.')
h2('Assist document review with AI')
p('AI Document Assistant can summarize documents, extract key insights and assist classification by category, sensitivity and personal information. It can help staff prepare for a review while keeping responsibility for decisions and verification with the reviewer.')
p('Activation requires DoE to provide and manage its chosen AI model credentials or API keys. AI provider consumption is charged separately by that provider. Model choice, permitted documents and data handling would be agreed with DoE’s IT and information governance teams before use.')

h1('Optional Enterprise-only add-ons')
p('Upgrading also gives DoE access to the paid options below, which are not available on Business. These extend the value of Enterprise for specific operational needs. They are purchased separately and are not included in the Enterprise subscription fee.')
h2('Automated User Provisioning (SCIM)')
p('Synchronize user creation, account updates and deactivation from your corporate identity provider. For a 500-user subscription, this can reduce manual account administration as staff join, change responsibilities or leave DoE, while keeping user information aligned with your directory.')
p('SAML provides single sign-on; SCIM adds automated account lifecycle management. We would agree directory mappings and test provisioning and deactivation with your IT team before activation.')
h2('Custom Application Name')
p('Present the service under a DoE-selected application name. Combined with your existing custom domain and email identity, this can make the service more recognizable to staff and reinforce its place among DoE’s internal applications.')
p('This option requires Custom Branding and Styling, which would be confirmed and priced in the final scope. The experience retains “powered by Circularo” attribution.')
h2('Custom Upload Form')
p('Capture structured information when staff upload documents, using fields tailored to each document type. For example, DoE could capture a department, document category and reference number at entry, helping staff classify documents consistently and reducing later clarification or re-entry.')
p('This adds document-specific metadata capture to your existing homepage and role-based interface customizations. We would agree the document types and fields with the relevant process owners.')
label('Further options for specific processes')
p('Custom Web Forms can collect data and documents through a public website and initiate approval or signing processes. Autodesk BIM 360 Integration can exchange documents with BIM 360 where DoE uses it. Both are optional paid additions available with Enterprise; requirements and configuration would be scoped separately.')

h1('A focused path to adoption')
p('We recommend starting with a small number of measurable improvements, then extending the capabilities to additional teams once the initial process has been validated.')
h2('Agree the first process')
p('Select a recurring document process with a named owner. Review its current preparation steps, approval route and follow-up practices. Confirm the existing Circularo configuration and identify which Enterprise capabilities will support the chosen outcome.')
h2('Configure and demonstrate')
p('Agree administrator and Controller responsibilities, test the selected forms and define any identity-provider or integration requirements. Use representative documents to demonstrate the proposed process to DoE’s process owner and IT team.')
h2('Measure before expanding')
p('Review the initial results against agreed measures: time spent preparing a document, time to completion, the number of transactions waiting beyond an agreed threshold and the frequency of manual corrections. We would agree the baseline and targets with DoE before measuring the results.')
h2('Confirm activation responsibilities')
p('The activation plan will identify customer inputs, configuration tasks, testing responsibilities and target dates. Professional services, custom integrations and any additional training will be described and priced separately where required.')
label('Select optional add-ons against a clear need')
p('Prioritize SCIM where account administration is a recurring burden, Custom Upload Form where document information is inconsistent, and Custom Application Name where a recognizable DoE service identity supports adoption. Each selected option, its prerequisites and any configuration services will be itemized separately.')
p('Additional services such as standalone Document Management & Archiving, expanded storage, qualified trust services, SMS consumption and higher support tiers are outside this proposed incremental scope unless expressly included in the final commercial schedule. Existing negotiated inclusions will be recorded separately so that they remain clear.')

h1('Commercial schedule')
p('The proposed upgrade covers 500 Regular Users. Pricing, the effective date and the final service scope will be set out below and confirmed in the order documentation.')
table(['Item','Proposed basis or commercial detail'],[
('Subscription','Circularo Enterprise Plan for 500 Regular Users'),
('Included Enterprise capabilities','Capabilities on pages 3–5, subject to agreed activation requirements; optional paid add-ons excluded'),
('Existing inclusions','Carry forward the existing inclusions listed on page 2, with final quantities confirmed in the order'),
('Optional Enterprise-only add-ons','[Insert selected add-ons, prerequisites and separate recurring fees, or not selected]'),
('Subscription term and effective date','[Insert subscription term and upgrade effective date]'),
('Annual subscription fee','AED [Insert amount], excluding VAT'),
('Upgrade adjustment or credit','AED [Insert amount or not applicable]'),
('Implementation and other services','[Insert agreed scope and one-time fees]'),
('Automated transaction consumption','[Insert required service packs and allowances or not applicable]'),
('Payment terms and proposal validity','[Insert payment terms and validity date]'),
('Additional commercial details','[Insert support, renewal and other agreed terms]')],[3100,6683])
h2('Next steps')
p('Confirm the Enterprise scope and the first process to prioritize. We can then agree the activation plan, complete the commercial schedule and arrange the upgrade for the agreed effective date.')
p('Any additional services, third-party charges and consumption allowances will be itemized in the final order. Activation timing will be confirmed once the required inputs and responsibilities have been agreed.')

sect=deepcopy(source[-1])
for c in list(sect):
    if E.QName(c).localname in ['type','cols']:sect.remove(c)
sect.find('w:pgMar',NS).set('{'+W+'}bottom','1440')
body.append(sect)
parts['word/document.xml']=xml(root)
header=E.fromstring(parts['word/header1.xml'])
for t in header.xpath('.//w:t',namespaces=NS):
    if 'Circularo Business Plan Subscription' in (t.text or ''):t.text=t.text.replace('Circularo Business Plan Subscription','DoE Enterprise Upgrade Proposal')
parts['word/header1.xml']=xml(header)
settings=E.fromstring(parts['word/settings.xml']);uf=settings.find('w:updateFields',NS)
if uf is None:uf=el('updateFields');settings.append(uf)
uf.set('{'+W+'}val','true');parts['word/settings.xml']=xml(settings)
if 'docProps/core.xml' in parts:
    core=E.fromstring(parts['docProps/core.xml'])
    for node in core:
        k=E.QName(node).localname
        if k=='title':node.text='Circularo Enterprise Upgrade Proposal for Department of Energy Abu Dhabi'
        if k in ['creator','lastModifiedBy']:node.text='Circularo'
        if k in ['description','subject','keywords']:node.text=''
    parts['docProps/core.xml']=xml(core)
with ZipFile(OUT,'w',ZIP_DEFLATED) as z:
    for n,b in parts.items():z.writestr(n,b)
allowed={'word/document.xml','word/header1.xml','word/settings.xml','docProps/core.xml'}
with ZipFile(REF) as a,ZipFile(OUT) as b:
    changed=[n for n in a.namelist() if a.read(n)!=b.read(n)]
    assert set(changed)<=allowed,changed
    assert set(a.namelist())==set(b.namelist())
report={'output':str(OUT),'changed_parts':changed,'sections':len(root.xpath('.//w:sectPr',namespaces=NS)),'body_words':len(' '.join(root.xpath('.//w:t/text()',namespaces=NS)).split())}
(BASE/'qa/build-checks.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report))
