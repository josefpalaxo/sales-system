import '../fonts.mjs';
import fs from 'node:fs/promises';
import sharp from 'sharp';
import {Presentation,PresentationFile} from '@oai/artifact-tool';
import {CANVAS,COLORS as C,CHROME,addText,addRect,addChrome,addDivider,addSources,SYSTEM_ROOT} from '/Users/josefneumann/Projects/ai-workspace/sales-system/.agents/skills/circularo-slides/scripts/circularo-slide-system.mjs';

const ROOT='/Users/josefneumann/Projects/ai-workspace/sales-system/work/slides/nextgen-architecture';
const BUILD=ROOT+'/build/v2';
const p=Presentation.create({slideSize:CANVAS});
let id=0;
function t(s,text,x,y,w,h,size=22,color=C.body,bold=false,face='Mulish',alignment='left'){
 const sh=addText(s,{name:`copy-${++id}`,text,left:x,top:y,width:w,height:h,fontSize:size,color,bold,typeface:face,alignment});
 sh.text.style={insets:{left:0,right:0,top:0,bottom:0},autoFit:'none',verticalAlignment:'top',wrap:'none'};
 return sh;
}
const h=(s,text,x,y,w,height=72,size=32,color=C.darkBlue)=>t(s,text,x,y,w,height,size,color,true,'Spartan');
const r=(s,name,x,y,w,height,fill,line='none',lw=0)=>addRect(s,{name,left:x,top:y,width:w,height,fill,lineFill:line,lineWidth:lw});
const rule=(s,x,y,w,color=C.neutral200,thickness=1)=>addDivider(s,{left:x,top:y,width:w,height:thickness,color});
function arrow(s,a,b,from='right',to='left',color=C.purple,kind='straight'){
 return s.shapes.connect(a,b,{kind,fromSide:from,toSide:to,line:{fill:color,width:2},tail:{type:'triangle',width:'sm',length:'sm'}});
}
async function chrome(s,n,dark=false,label='NEXT-GENERATION CIRCULARO'){
 await addChrome(s,n,{dark,signature:false});
 // Distinct raster dimensions avoid duplicate-image loss in the PPTX renderer.
 // The authentic artwork and the 40 px display frame remain unchanged.
 const logo=SYSTEM_ROOT+'/assets/logos/circularo-logo-symbol-'+(dark?'white':'blue')+'-circle-slide.png';
 const bytes=await sharp(logo).resize(72*n,72*n,{kernel:'nearest'}).png().toBuffer();
 s.images.items[0].replace({blob:bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),contentType:'image/png',fit:'contain',alt:'Circularo symbol'});
 t(s,label,104,31,1000,28,18,dark?C.softPurple:C.purple,true);
}
async function icon(s,file,x,y,w,height,color=C.purple,bg=C.white){
 let svg=await fs.readFile(SYSTEM_ROOT+'/assets/icons/'+file,'utf8');
 svg=svg.replaceAll('currentColor',color);
 // The supplied AI asset extends below its original viewport; preserve every
 // original path while expanding only the viewport so no artwork is clipped.
 if(file==='sovereign/sovereign-ai.svg')svg=svg.replace('viewBox="0 0 180 150"','viewBox="0 0 180 185"');
 const bytes=await sharp(Buffer.from(svg)).resize(Math.round(w*3),Math.round(height*3),{fit:'contain',background:bg}).flatten({background:bg}).png().toBuffer();
 s.images.add({blob:bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),contentType:'image/png',fit:'contain',alt:file.split('/').pop().replace('.svg',''),position:{left:x,top:y,width:w,height}});
}
function notes(s,paragraphs){
 addSources(s,[...paragraphs,
  'Source: user-provided investor architecture brief and two reference slide images in this conversation, 29 September 2026. The architectural concepts are proposed direction. Deployment references are management-reported, not independently verified governed records.',
  'Architecture image: /var/folders/nc/qchftdf551d24chvqb96fs0c0000gn/T/codex-clipboard-4fb763e5-996b-4adb-b7b7-43a908f9860c.png. Progression image: /var/folders/nc/qchftdf551d24chvqb96fs0c0000gn/T/codex-clipboard-c7858ebd-e6a9-4436-a91f-b6e7470133da.png.',
  'The foundational architecture Markdown document mentioned in the brief was not supplied. Definitions here stay within the brief and the supplied images. Internal working material, non-canonical.'
 ]);
}

// 1 — Investor architecture. The functional story leads; internal names follow.
const s1=p.slides.add();s1.background.fill=C.darkBlue;
await chrome(s1,1,true,'NEXT-GENERATION CIRCULARO  /  PROPOSED ARCHITECTURE');
h(s1,'From eSignatures to\nAgentic Trusted Execution',48,96,1184,116,48,C.white);
t(s1,'Trust infrastructure for humans, enterprise systems and AI agents',48,224,1184,33,25,C.white);
t(s1,'GOVERNED BY',48,309,278,30,21.33,C.softPurple,true);
const horos=r(s1,'organizational-context',350,284,278,76,C.darkBlue,C.softPurple,1);
const authos=r(s1,'authority-policy',652,284,278,76,C.darkBlue,C.softPurple,1);
t(s1,'Organizational context',366,296,256,32,23,C.white,true);
t(s1,'HOROS',366,330,248,28,21.33,C.softPurple);
t(s1,'Authority & policy',668,296,248,32,23,C.white,true);
t(s1,'AUTHOS',668,330,248,28,21.33,C.softPurple);
const positions=[48,350,652,954];
const titles=['Intelligent\norchestration','Trusted\nexecution','Canonical\ntrust object','Trusted records\n& evidence'];
const brands=['SANTOS','ACTUS','eDoc','Institutional memory'];
const nodes=positions.map((x,i)=>{
 const fill=i===1?C.purple:C.white;
 const node=r(s1,'architecture-stage-'+i,x,394,278,114,fill);
 h(s1,titles[i],x+16,408,247,59,24,i===1?C.white:C.darkBlue);
 t(s1,brands[i],x+16,478,247,28,21.33,i===1?C.white:C.neutral500);
 return node;
});
for(let i=0;i<3;i++)arrow(s1,nodes[i],nodes[i+1],'right','left',C.white);
arrow(s1,horos,nodes[1],'bottom','top',C.softPurple);
arrow(s1,authos,nodes[1],'bottom','top',C.softPurple,'elbow');
r(s1,'deployed-trust-foundation',48,544,1184,96,C.white);
t(s1,'EXISTING TRUST\nFOUNDATION',64,562,259,60,22,C.darkBlue,true);
t(s1,'Identity, signatures, seals, timestamps and evidence\nAuthority, audit, APIs and sovereign infrastructure',350,562,850,62,23,C.darkBlue);
t(s1,'Expansion beyond documents: payments, ERP changes, procurement and government services',48,660,1135,32,22,C.white);
notes(s1,[
 'Investor thesis: Circularo is extending an already-deployed digital trust infrastructure into the control and evidence layer required when humans, enterprise systems and autonomous agents execute consequential actions.',
 'The horizontal reading order is an investor simplification of the supplied vertical architecture. SANTOS orchestrates, ACTUS is the trusted execution layer, eDoc is the canonical trust object, and trusted records preserve institutional evidence. This is a conceptual relationship, not a prescribed API sequence.',
 'HOROS supplies organizational context and AUTHOS supplies authority and policy. The connectors emphasize these inputs to governed execution. They do not imply that the other architecture components ignore context or policy.',
 'Category expansion: the brief describes ACTUS as not document-specific, with potential uses in payments, ERP changes, access provisioning, procurement, government services and agent-to-agent actions. These are proposed opportunities, not a claim of current availability.'
]);

// 2 — A visible progression with a deployment foundation underneath it.
const s2=p.slides.add();s2.background.fill=C.white;
r(s2,'deployment-foundation-band',0,588,1280,132,C.darkBlue);
await chrome(s2,2,false,'THE FOUNDATION FOR CATEGORY EXPANSION');
// Page number sits on the dark band; keep the rest of the chrome on white.
const page2=s2.shapes.items.find(v=>v.name==='page-number');
if(page2)page2.text.color=C.white;
h(s2,'Why Circularo can\ncredibly build this',48,96,1184,116,48);
t(s2,'Reuse the trust foundation as the scope of consequential actions expands',48,221,1184,34,25);
t(s2,'ESTABLISHED FOUNDATION',48,284,660,29,21.33,C.neutral500,true);
const stageNames=['Digital\nsignatures','Trusted\ncollaboration','Sovereign trust\ninfrastructure','Trusted\nexecution','Agentic trusted\nexecution'];
const bodies=['Identity, signing\nand timestamps','Approvals and\nmulti-party\nworkflows','Shared services,\nidentity integration\nand evidence','Authority, policy,\nexecution and\ninstitutional records','Humans and AI\nagents acting under\ngoverned authority'];
const stairX=[48,288,528,768,1008], stairY=[374,348,322,296,270];
stairX.forEach((x,i)=>{
 const dark=i>2;
 const fill=i===4?C.darkBlue:i===3?C.purple:C.softPurple;
 r(s2,'evolution-step-'+i,x,stairY[i],224,554-stairY[i],fill);
 t(s2,stageNames[i],x+14,stairY[i]+16,202,61,24,dark?C.white:C.darkBlue,true);
 t(s2,bodies[i],x+14,stairY[i]+92,202,91,21.33,dark?C.white:C.body);
 if(dark)t(s2,'PROPOSED',x+14,520,202,27,21.33,C.white,true);
});
t(s2,'DEPLOYMENT FOUNDATIONS',48,603,650,30,21.33,C.white,true);
t(s2,'Management-reported',832,603,400,30,21.33,C.white,false,'Mulish','right');
['TDRA GovSign','Digital Dubai\nDigiSign','Sharjah Sign','e&','KSA / Nafath'].forEach((v,i)=>t(s2,v,stairX[i],648,224,58,22,C.white,true));
notes(s2,[
 'The first three stages represent the existing foundation reported by management. The last two stages are the proposed next-generation direction. The staircase communicates category progression, not quantitative scale, revenue, chronology or a dated delivery commitment.',
 'The five named foundations are supplied by the user: TDRA GovSign, Digital Dubai DigiSign, Sharjah Sign, e& and KSA/Nafath. Counts, certification claims, rollout details and licensing claims from the reference image are not asserted here.',
 'Economic thesis: the opportunity is to reuse existing trust capabilities and institutional relationships across a broader set of consequential actions. This is a strategic hypothesis, not quantified revenue, margin or valuation evidence.',
 'AI agents can add more actors capable of consequential actions. The investor argument is that governed authority, trusted execution and verifiable evidence become more important as that actor population expands.'
]);

// 3 — Appendix: three roles, three plain-language questions.
const s3=p.slides.add();s3.background.fill=C.white;
await chrome(s3,3,false,'APPENDIX  /  PROPOSED ARCHITECTURE');
h(s3,'Context, authority\nand orchestration',48,96,1184,116,48);
t(s3,'Three complementary roles behind a governed action',48,222,1184,32,25);
addDivider(s3,{left:432,top:288,width:1,height:343,color:C.neutral200});
addDivider(s3,{left:832,top:288,width:1,height:343,color:C.neutral200});
await icon(s3,'circularo/users.svg',48,280,80,80,C.purple);
await icon(s3,'circularo/policy.svg',448,280,80,80,C.purple);
await icon(s3,'sovereign/sovereign-ai.svg',848,274,92,95);
const concepts=[
 {x:48,name:'HOROS',role:'Organizational context',desc:'Maps people and agents to roles,\norganizational units and\nrelationships.',question:'Which team and role\ndoes this agent represent?'},
 {x:448,name:'AUTHOS',role:'Authority and policy',desc:'Defines who may act, delegated\nrights, approval requirements\nand limits.',question:'May this agent approve\na payment of this size?'},
 {x:848,name:'SANTOS',role:'Intelligent orchestration',desc:'Understands intent, plans steps\nand coordinates action across\nthe available services.',question:'What needs to happen,\nand which service should act?'}
];
for(const c of concepts){
 h(s3,c.name,c.x,381,368,43,32);
 t(s3,c.role,c.x,431,368,34,24,C.purple,true);
 t(s3,c.desc,c.x,480,368,90,22);
 t(s3,c.question,c.x,585,368,62,23,C.darkBlue,true);
}
notes(s3,[
 'HOROS, as described in the supplied diagram: organizational structure, roles and positions, organizational units, relationships, delegations, humans and agents. The key investor concept is organizational context.',
 'AUTHOS, as described in the supplied diagram: authority to act, delegated authority, approval rights, policies and constraints, authority limits, human and AI permissions, and context-dependent authorization.',
 'SANTOS, as described in the supplied diagram: intelligent orchestration, including understand, plan, coordinate, assist, invoke and explain. It is identified as sentient interaction and orchestration in the reference image.',
 'The three questions are illustrative explanations of the proposed roles. They are not a specification of implemented behavior. In this conceptual framing, organizational context, authorization and orchestration are distinct responsibilities.',
 'Icon artwork: Circularo skill assets/icons/circularo/users.svg, policy.svg, and assets/icons/sovereign/sovereign-ai.svg. The AI asset uses an expanded viewport to show its original paths without clipping.'
]);

// 4 — Appendix: execution, the canonical object and lasting evidence.
const s4=p.slides.add();s4.background.fill=C.white;
r(s4,'execution-panel',0,0,416,720,C.darkBlue);
await chrome(s4,4,true,'APPENDIX / PROPOSED');
// The page marker is on the white field on this split slide.
const page4=s4.shapes.items.find(v=>v.name==='page-number');
if(page4)page4.text.color=C.darkBlue;
await icon(s4,'circularo/gear.svg',48,112,88,88,C.white,C.darkBlue);
h(s4,'ACTUS',48,225,320,48,40,C.white);
t(s4,'Trusted execution',48,284,320,36,26,C.white,true);
t(s4,'Governs a consequential action,\nexecutes it under authority\nand captures evidence.',48,340,330,91,22,C.white);
const verbs=['Request','Govern','Execute','Evidence'];
const verbNodes=verbs.map((v,i)=>{
 const node=r(s4,'actus-step-'+i,48,456+i*49,320,35,'none');
 t(s4,String(i+1).padStart(2,'0'),48,456+i*49,45,33,22,C.softPurple);
 t(s4,v,112,452+i*49,245,38,26,C.white,true);
 return node;
});
h(s4,'From intent to\ninstitutional evidence',464,96,768,119,44);
await icon(s4,'circularo/document.svg',464,269,64,72,C.purple);
h(s4,'eDoc',552,269,640,44,32);
t(s4,'Canonical trust object',552,319,640,35,25,C.purple,true);
t(s4,'Represents the transaction and its evolving state',464,374,768,35,24);
const fieldXs=[464,592,720,848,976,1104];
r(s4,'edoc-structure',464,427,768,56,C.softPurple);
['Intent','Content','Parties','State','Signatures','Lifecycle'].forEach((v,i)=>{
 if(i) addDivider(s4,{left:fieldXs[i],top:439,width:1,height:32,color:C.neutral300});
 t(s4,v,fieldXs[i]+8,443,112,30,21.33,C.darkBlue,true,'Mulish','center');
});
await icon(s4,'circularo/database.svg',464,529,64,64,C.darkBlue);
h(s4,'Trusted records & evidence',552,526,680,42,28);
t(s4,'Designed to be immutable, verifiable\nand retained for the long term',552,577,680,67,23);
notes(s4,[
 'ACTUS is the trusted execution layer or protocol. The supplied reference gives its core flow as Request, Govern, Execute, Evidence. The user brief explicitly describes it as not document-specific.',
 'eDoc is the canonical transaction and evidence object. Its source fields are Intent, Content, Parties, State, Signatures and Lifecycle. It is the shared object that represents the transaction, not merely a document file.',
 'Trusted records and evidence are described in the supplied diagram as immutable, verifiable and long-term institutional evidence. These are intended properties of the proposed architecture, not independently validated implementation guarantees.',
 'Illustrative future scenario: an agent requests a supplier payment. HOROS provides its organizational context, AUTHOS determines permitted authority and policy constraints, SANTOS coordinates the steps, and ACTUS governs the action and captures evidence. eDoc represents the transaction and its state, while trusted records preserve the evidence. This example explains the proposed role boundaries, not an implemented product workflow.',
 'Icon artwork: Circularo skill assets/icons/circularo/gear.svg, document.svg and database.svg.'
]);

await fs.writeFile(BUILD+'/presentation.json',JSON.stringify(p.toProto()));
await (await PresentationFile.exportPptx(p)).save(BUILD+'/candidate.pptx');
for(const [i,slide] of p.slides.items.entries()){
 const png=await p.export({slide,format:'png',scale:1.5});
 await fs.writeFile(`${BUILD}/slide-${i+1}.png`,new Uint8Array(await png.arrayBuffer()));
 const layout=await slide.export({format:'layout'});
 await fs.writeFile(`${BUILD}/slide-${i+1}.layout.json`,await layout.text());
}
const montage=await p.export({format:'webp',montage:true,scale:1});
await fs.writeFile(BUILD+'/montage.webp',new Uint8Array(await montage.arrayBuffer()));
console.log('Four-slide v2 candidate, layouts and previews created.');
