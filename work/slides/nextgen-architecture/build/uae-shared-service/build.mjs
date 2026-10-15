import '../fonts.mjs';
import fs from 'node:fs/promises';
import sharp from 'sharp';
import {Presentation,PresentationFile} from '@oai/artifact-tool';
import {CANVAS,COLORS as C,addText,addRect,addChrome,addDivider,addSources,SYSTEM_ROOT} from '/Users/josefneumann/Projects/ai-workspace/sales-system/.agents/skills/circularo-slides/scripts/circularo-slide-system.mjs';

const ROOT='/Users/josefneumann/Projects/ai-workspace/sales-system/work/slides/nextgen-architecture';
const BUILD=ROOT+'/build/uae-shared-service';
const sources=JSON.parse(await fs.readFile(BUILD+'/sources.json','utf8'));
const p=Presentation.create({slideSize:CANVAS});
let uid=0;
function text(s,value,x,y,w,h,size=22,color=C.body,bold=false,face='Mulish',align='left'){
 const sh=addText(s,{name:`copy-${++uid}`,text:value,left:x,top:y,width:w,height:h,fontSize:size,color,bold,typeface:face,alignment:align});
 sh.text.style={insets:{left:0,right:0,top:0,bottom:0},autoFit:'none',verticalAlignment:'top',wrap:'none'};
 return sh;
}
const title=(s,v,x=48,y=96,w=1184,h=115,size=48,color=C.darkBlue)=>text(s,v,x,y,w,h,size,color,true,'Spartan');
const box=(s,name,x,y,w,h,fill,line='none',lw=0)=>addRect(s,{name,left:x,top:y,width:w,height:h,fill,lineFill:line,lineWidth:lw});
const rule=(s,x,y,w,col=C.neutral200,thick=1)=>addDivider(s,{left:x,top:y,width:w,height:thick,color:col});
function arrow(s,a,b,from='right',to='left',color=C.purple,kind='straight'){
 return s.shapes.connect(a,b,{kind,fromSide:from,toSide:to,line:{fill:color,width:2},tail:{type:'triangle',width:'sm',length:'sm'}});
}
async function chrome(s,n,dark=false,label='TRUSTED EXECUTION FOR THE AGENTIC ERA'){
 await addChrome(s,n,{dark,signature:false});
 const source=SYSTEM_ROOT+'/assets/logos/circularo-logo-symbol-'+(dark?'white':'blue')+'-circle-slide.png';
 const bytes=await sharp(source).resize(72*n,72*n,{kernel:'nearest'}).png().toBuffer();
 s.images.items[0].replace({blob:bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),contentType:'image/png',fit:'contain',alt:'Circularo symbol'});
 text(s,label,104,31,1060,28,18,dark?C.softPurple:C.purple,true);
}
function pageColor(s,color){ const pg=s.shapes.items.find(v=>v.name==='page-number');if(pg)pg.text.color=color; }
async function icon(s,file,x,y,w,h,color=C.purple,bg=C.white){
 let svg=await fs.readFile(SYSTEM_ROOT+'/assets/icons/'+file,'utf8');
 svg=svg.replaceAll('currentColor',color);
 if(file==='sovereign/sovereign-ai.svg')svg=svg.replace('viewBox="0 0 180 150"','viewBox="0 0 180 185"');
 const bytes=await sharp(Buffer.from(svg)).resize(Math.round(w*3),Math.round(h*3),{fit:'contain',background:bg}).flatten({background:bg}).png().toBuffer();
 s.images.add({blob:bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength),contentType:'image/png',fit:'contain',alt:file.split('/').pop().replace('.svg',''),position:{left:x,top:y,width:w,height:h}});
}
function notes(s,lines,official=[]){
 addSources(s,[...lines,
  'Internal presentation brief: '+sources.provided_brief+'. Working narrative supplied by the user; not a governed, approved product specification.',
  'Company confirmation from the user, 30 September 2026: the unified trust API and agent execution are available. Concrete example: an agent can digitally seal a document with organizational identity on behalf of an employee. The user did not specify production-versus-pilot maturity or the implementation of individual delegation, policy and approval controls.',
  ...official.map(i=>sources.official_sources[i].title+' — '+sources.official_sources[i].url)
 ]);
}

// 1. One-slide architecture, with functional labels and no internal component names.
const s1=p.slides.add();s1.background.fill=C.white;
await chrome(s1,1);
title(s1,'One trust layer for government',48,96,1184,68);
text(s1,'Reference architecture for expanding existing DDA and TDRA services',48,175,1184,35,25);
const actorX=[48,350,652,954];
['People & organisations','Government systems','AI agents','Ecosystem partners'].forEach((v,i)=>text(s1,v,actorX[i],237,278,32,23,C.darkBlue,true,'Mulish','center'));
const api=box(s1,'unified-trust-api',48,292,1184,52,C.purple);
text(s1,'UNIFIED TRUST API',64,305,1152,32,24,C.white,true,'Mulish','center');
const execution=box(s1,'trusted-execution-layer',48,376,1184,124,C.darkBlue);
text(s1,'TRUSTED EXECUTION LAYER',64,390,1152,30,24,C.white,true,'Mulish','center');
const ex=['Actor & authority','Policy & approval','Execution & evidence'];
ex.forEach((v,i)=>{
 if(i)addDivider(s1,{left:48+395*i,top:439,width:1,height:39,color:C.softPurple});
 text(s1,v,64+395*i,447,363,33,25,C.white,true,'Mulish','center');
});
arrow(s1,api,execution,'bottom','top',C.purple);
text(s1,'CONNECTED CORE SERVICES',48,532,1184,28,21.33,C.neutral500,true);
['Cloud','Identity','Collaboration','Sign & seal','Trusted vault','AI'].forEach((v,i)=>{
 const x=48+i*(1184/6);
 if(i)addDivider(s1,{left:x,top:575,width:1,height:32,color:C.neutral300});
 text(s1,v,x+8,574,181,32,23,C.darkBlue,true,'Mulish','center');
});
box(s1,'existing-government-foundation',48,631,1184,45,C.softPurple);
text(s1,'Built on UAE PASS, GovSign, Digital Dubai Digital Sign and existing government systems',64,642,1152,30,22,C.darkBlue);
notes(s1,[
 'This is a reference architecture for the proposed shared-government-service expansion. Its control categories describe the common institutional framework to agree across entities; they do not assert that every specific control mechanism is already deployed.',
 'The unified trust API and agent execution are company-confirmed available capabilities. The six connected capability families come from the supplied narrative: Cloud, Identity, Collaboration, Sign & Seal, DMS / Trusted Vault and AI.',
 'Existing government foundations should be reused. UAE PASS supplies national identity and digital signing capabilities. Digital Dubai publicly describes Digital Sign as powered by Circularo and integrated with UAE PASS. GovSign is an existing TDRA document approval and signing service.',
 'The public Digital Dubai service name is Digital Sign; the user also refers to it as DigiSign. No deployment counts or current government agent rollout are asserted.'
 ],[0,1,2]);

// 2. Requested evolution slide: distinguish current capabilities from expansion of adoption.
const s2=p.slides.add();s2.background.fill=C.white;
box(s2,'available-capability-band',0,588,1280,132,C.darkBlue);
await chrome(s2,2,false,'EXPANDING EXISTING GOVERNMENT SERVICES');pageColor(s2,C.white);
title(s2,'Towards Agentic AI\nTrusted Execution');
text(s2,'Extend established digital trust into agent-initiated government action',48,221,1184,35,25);
text(s2,'EXISTING TRUST FOUNDATION',48,284,680,29,21.33,C.neutral500,true);
const xs=[48,288,528,768,1008], ys=[374,348,322,296,270];
const stages=['Digital\nsignatures','Trusted\ncollaboration','Sovereign trust\ninfrastructure','Trusted\nexecution','Agentic trusted\nexecution'];
const stageBody=['Identity, signing\nand timestamps','Approvals and\nmulti-party\nworkflows','Shared services,\nidentity integration\nand evidence','Governed actions\nthrough connected\ntrust services','Agents invoke\ntrust services for\nan employee'];
xs.forEach((x,i)=>{
 const dark=i>2;
 box(s2,'trust-evolution-stage-'+i,x,ys[i],224,554-ys[i],i===4?C.darkBlue:i===3?C.purple:C.softPurple);
 text(s2,stages[i],x+14,ys[i]+16,202,62,24,dark?C.white:C.darkBlue,true);
 text(s2,stageBody[i],x+14,ys[i]+92,202,94,21.33,dark?C.white:C.body);
 if(dark)text(s2,'API ENABLED',x+14,520,202,28,21.33,C.white,true);
});
text(s2,'AVAILABLE TODAY',48,606,1184,29,21.33,C.white,true);
text(s2,'An agent can digitally seal a document with organisational identity\non behalf of an employee',48,643,1130,60,24,C.white);
notes(s2,[
 'The staircase is a conceptual evolution, not a quantitative maturity score, rollout schedule or claim that every government entity has deployed each stage.',
 'The final stage uses the specific company-confirmed API capability: organizational digital sealing on behalf of an employee. The proposed expansion concerns shared government adoption and consistent institutional controls.',
 'Context: Digital Dubai has publicly described integrated government service delivery and Agentic AI projects. Its AI Integration Matrix emphasizes coordinated and interoperable AI adoption. These sources support strategic alignment, not endorsement of this proposal.'
 ],[3,4]);

// 3. Control requirements for a government-wide service, not unverified product detail.
const s3=p.slides.add();s3.background.fill=C.white;
await chrome(s3,3,false,'SHARED-SERVICE CONTROL FRAMEWORK');
title(s3,'Agent actions within\ninstitutional control');
text(s3,'Controls to agree and apply consistently across government entities',48,223,1184,34,25);
const controls=[
 {x:48,n:'01',name:'Identity\n& context',question:'Which employee and\nagent are involved?',detail:'Connect the action to its\ninitiator and institutional role.'},
 {x:448,n:'02',name:'Authority\n& policy',question:'What is the agent\npermitted to do?',detail:'Make the delegated scope\nand applicable limits explicit.'},
 {x:848,n:'03',name:'Approval\n& oversight',question:'When must a person\nauthorise the action?',detail:'Define approval requirements\nfor consequential actions.'}
];
for(const [i,c] of controls.entries()){
 if(i)addDivider(s3,{left:c.x-24,top:293,width:1,height:249,color:C.neutral200});
 text(s3,c.n,c.x,286,368,35,23,C.purple,true);
 title(s3,c.name,c.x,332,368,75,28);
 text(s3,c.question,c.x,425,368,65,25,C.darkBlue,true);
 text(s3,c.detail,c.x,505,368,60,22);
}
box(s3,'evidence-through-execution',48,594,1184,81,C.darkBlue);
text(s3,'Accountability continues after execution',64,607,1152,31,25,C.white,true);
text(s3,'Retain what was requested, permitted and executed, with attributable evidence',64,644,1152,30,22,C.white);
notes(s3,[
 'These are proposed shared-service design requirements, taken from the supplied narrative on actor, authority, policy, approval, execution, evidence and audit. They are not claims about individual control implementations or current government deployment.',
 'The institutional boundary concerns what an agent may do and what executes. An agent may prepare an action without being authorized to approve it. The required authorization and human oversight depend on the action and the entity’s policy.',
 'The actual delegated-authority checks, approval triggers, identity bindings, evidence format and exception process should be agreed for the shared government service.'
 ]);

// 4. Executive service catalogue under a common API.
const s4=p.slides.add();s4.background.fill=C.darkBlue;
await chrome(s4,4,true,'UNIFIED TRUST API');
title(s4,'One interface for\nend-to-end trust services',48,96,1184,115,48,C.white);
text(s4,'Government channels, enterprise systems and agents connect through a common API',48,222,1184,34,24,C.white);
const catalogue=[
 {x:48,y:299,title:'Identity & authority',desc:'Actor context and the\nauthority required to act'},
 {x:448,y:299,title:'Collaboration & approval',desc:'Preparation, review and\nauthorisation workflows'},
 {x:848,y:299,title:'Signatures & seals',desc:'Personal signing and\norganisational sealing'},
 {x:48,y:469,title:'Time & verification',desc:'Timestamps and validation\nof trusted digital outputs'},
 {x:448,y:469,title:'Evidence & audit',desc:'Traceable actions, decisions\nand supporting evidence'},
 {x:848,y:469,title:'Records & retrieval',desc:'Preservation and permissioned\naccess to trusted records'}
];
for(const c of catalogue){
 rule(s4,c.x,c.y,368,C.softPurple,2);
 text(s4,c.title,c.x,c.y+21,368,35,25,C.white,true);
 text(s4,c.desc,c.x,c.y+77,368,63,23,C.white);
}
text(s4,'Shared-service aim: reusable integration, consistent controls and a continuous evidence chain',48,657,1140,33,22,C.white);
notes(s4,[
 'The unified trust API is company-confirmed available. This is the executive service catalogue proposed for shared government expansion, distilled from the supplied narrative. It is not an endpoint inventory or a promise of every listed control being enabled in an existing deployment.',
 'The service families connect core trust functions end to end. Specific identity assurance, delegated-authority enforcement, policy, approvals, trust service configuration and retention rules remain part of the agreed government service scope.',
 'This proposal builds on existing national identity and signing infrastructure and existing government systems. A shared interface should reduce duplicate integration effort while each entity retains its appropriate decision authority. This is the intended operating benefit, not a measured result.'
 ]);

// 5. Specific, company-confirmed ready-now capability.
const s5=p.slides.add();s5.background.fill=C.white;
await chrome(s5,5,false,'AVAILABLE TODAY  /  COMPANY-CONFIRMED CAPABILITY');
title(s5,'Agent-initiated\norganisational sealing');
text(s5,'An agent invokes Circularo’s API to seal a document on an employee’s behalf',48,222,1184,35,24);
const frames=[
 box(s5,'employee-context',48,286,352,211,'none'),
 box(s5,'agent-api-request',464,286,352,211,'none'),
 box(s5,'organisation-seal',880,286,352,211,'none')
];
await icon(s5,'circularo/person.svg',48,287,72,72);
await icon(s5,'sovereign/sovereign-ai.svg',464,279,88,91);
await icon(s5,'circularo/folder-check.svg',880,287,72,72);
const caseParts=[
 {x:48,heading:'Employee context',body:'A document and the employee\non whose behalf the action\nis performed'},
 {x:464,heading:'Agent API request',body:'The agent requests the\nsealing action through the\nunified trust API'},
 {x:880,heading:'Organisation’s seal',body:'Circularo applies the\norganisation’s digital identity\nto seal the document'}
];
for(const c of caseParts){
 text(s5,c.heading,c.x,389,352,37,26,C.darkBlue,true);
 text(s5,c.body,c.x,449,352,90,22);
}
arrow(s5,frames[0],frames[1]);arrow(s5,frames[1],frames[2]);
box(s5,'rollout-controls',48,589,1184,89,C.softPurple);
text(s5,'FOR SHARED GOVERNMENT ROLLOUT',64,602,1152,29,21.33,C.purple,true);
text(s5,'Agree delegation, approval triggers, evidence and retention requirements for each entity',64,642,1152,30,22,C.darkBlue);
notes(s5,[
 'Direct company confirmation from the user: "Digitally seal documents with organization identity on behalf of employee." This is the specific available-today example requested for the presentation.',
 'The diagram explains the actors and capability, not the exact production API call sequence. Employee context describes on whose behalf the action is performed. Organizational sealing uses the organization’s identity; it is not a claim that the agent reproduces the employee’s personal signature.',
 'Production or pilot maturity and the exact implemented controls were not specified. No deployment count, existing government agent deployment, autonomous approval capability or per-action human approval behavior is asserted.',
 'The lower band identifies shared-service design decisions to be agreed with the government stakeholders. It should not be read as a statement that those controls are currently absent or already fully deployed.',
 'Artwork: Circularo skill assets/icons/circularo/person.svg, folder-check.svg, and assets/icons/sovereign/sovereign-ai.svg. The original AI paths are preserved with an expanded viewport to avoid clipping.'
 ]);

// 6. A continuous evidence chain becomes institutional context for the next action.
const s6=p.slides.add();s6.background.fill=C.white;
await chrome(s6,6,false,'INSTITUTIONAL EVIDENCE AND TRUSTED AI CONTEXT');
title(s6,'Evidence becomes\ninstitutional memory');
text(s6,'Preserve provenance and permissions so AI can work with trusted context',48,222,1184,34,25);
const record=box(s6,'trusted-records',48,302,352,228,C.softPurple);
const context=box(s6,'trusted-context',464,302,352,228,C.softPurple);
const action=box(s6,'governed-action',880,302,352,228,C.darkBlue);
const memory=[
 {x:48,name:'Trusted\nrecords',desc:'Identity and provenance\nDecisions, signatures and seals\nTimestamps and evidence',color:C.darkBlue},
 {x:464,name:'Trusted\nAI context',desc:'Attributable information\nPermission-controlled access\nHistorical decision context',color:C.darkBlue},
 {x:880,name:'Governed\naction',desc:'Retrieve and understand\nAdvise with context\nInvoke permitted actions',color:C.white}
];
for(const c of memory){
 title(s6,c.name,c.x+16,321,320,77,28,c.color);
 text(s6,c.desc,c.x+16,430,320,88,21.33,c.color);
}
arrow(s6,record,context);arrow(s6,context,action);
text(s6,'Each governed action can add new evidence to the institutional record',48,579,1184,35,25,C.purple,true);
rule(s6,48,633,1184);
text(s6,'Trusted context informs AI. Policy and authority continue to govern execution.',48,655,1137,32,22,C.body);
notes(s6,[
 'The supplied narrative describes the progression from trusted records to searchable evidence, institutional knowledge, trusted AI context and governed action. This slide presents that intended operating model.',
 'The record can combine authoritative content, identities, roles, approvals, signatures, seals, timestamps, audit events, retention metadata and supporting evidence. Permissions and provenance must remain connected when records are used as AI context.',
 'Trusted context is not a guarantee that an AI model’s response will be correct. The institution’s controls still determine which consequential actions may execute. Each action can contribute new evidence to the record.'
 ]);

// 7. Close on expanding existing services, with an explicit government decision.
const s7=p.slides.add();s7.background.fill=C.darkBlue;
await chrome(s7,7,true,'PROPOSED SHARED GOVERNMENT SERVICE EXPANSION');
title(s7,'Expand toward a shared\ngovernment trust service',48,96,1184,116,48,C.white);
text(s7,'Build on Digital Dubai Digital Sign, TDRA GovSign and UAE PASS',48,224,1184,35,25,C.white);
const next=[
 {x:48,n:'01',heading:'Agree the\nservice model',body:'Service ownership and scope\nEntity authority and boundaries\nCommon controls and evidence'},
 {x:448,n:'02',heading:'Validate a\nshared journey',body:'Agent-initiated sealing\nCross-entity operating process\nOnboarding and support'},
 {x:848,n:'03',heading:'Expand the\nservice catalogue',body:'Additional trust services\nGovernment channels\nConnected agent platforms'}
];
for(const c of next){
 text(s7,c.n,c.x,309,368,37,24,C.softPurple,true);
 title(s7,c.heading,c.x,363,368,80,28,C.white);
 text(s7,c.body,c.x,468,368,97,22,C.white);
}
box(s7,'proposed-next-step',48,594,1184,82,C.white);
text(s7,'PROPOSED NEXT STEP',64,605,1152,28,21.33,C.purple,true);
text(s7,'Align DDA and TDRA on the shared service scope and select one cross-entity journey',64,642,1152,31,23,C.darkBlue,true);
notes(s7,[
 'Meeting objective supplied by the user: DDA and TDRA, expansion of existing services toward a shared government service. This is a proposed next step for discussion, not an agreed programme or delivery commitment.',
 'Digital Dubai’s public service catalogue identifies Digital Sign as powered by Circularo, with national identity integration and government document workflows. TDRA publicly describes GovSign for federal government approvals and signatures. The user permits naming both services without deployment counts.',
 'The proposal should respect Dubai and federal entity scopes. Shared service ownership, authority boundaries, hosting, onboarding, support and evidence requirements need agreement. No joint governance mandate or centralized ownership has been assumed.',
 'The first shared journey can reuse the available organizational-sealing API capability. The expansion work concerns government service design, consistent controls, integration and adoption rather than claiming a new product must first be built.',
 'Digital Dubai’s AI Integration Matrix provides contextual support for coordinated, interoperable adoption across government; it is not an endorsement of this specific proposal.'
 ],[0,1,4]);

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
console.log('Seven-slide government deck and previews created.');
