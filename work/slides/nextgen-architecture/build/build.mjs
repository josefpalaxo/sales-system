import './fonts.mjs';
import fs from 'node:fs/promises';
import {Presentation,PresentationFile} from '@oai/artifact-tool';
import {CANVAS,COLORS as C,addText,addRect,addChrome,addDivider,addSources} from '../../../../.agents/skills/circularo-slides/scripts/circularo-slide-system.mjs';

const DIR='/Users/josefneumann/Projects/ai-workspace/sales-system/work/slides/nextgen-architecture';
const pres=Presentation.create({slideSize:CANVAS});
let seq=0;
function txt(s,text,x,y,w,h,size=22,color=C.body,bold=false,font='Mulish',align='left') {
  const sh=addText(s,{name:`text-${++seq}`,text,left:x,top:y,width:w,height:h,fontSize:size,color,bold,typeface:font,alignment:align});
  sh.text.style={insets:{left:0,right:0,top:0,bottom:0},autoFit:'none',verticalAlignment:'top',wrap:'none'};
  return sh;
}
const rect=(s,n,x,y,w,h,fill,line='none',lw=0)=>addRect(s,{name:n,left:x,top:y,width:w,height:h,fill,lineFill:line,lineWidth:lw});
const rule=(s,x,y,w,color=C.neutral200)=>addDivider(s,{left:x,top:y,width:w,height:1,color});
function connect(s,a,b,from='bottom',to='top',color=C.purple) {return s.shapes.connect(a,b,{kind:'straight',fromSide:from,toSide:to,line:{fill:color,width:1.5},tail:{type:'triangle',width:'sm',length:'sm'}});}

const s1=pres.slides.add(); s1.background.fill=C.white;
await addChrome(s1,1,{signature:false});
txt(s1,'NEXT-GENERATION CIRCULARO',104,31,700,26,18,C.purple,true);
txt(s1,'From eSignatures to\nAgentic Trusted Execution',48,96,1184,114,48,C.darkBlue,true,'Spartan');
txt(s1,'Trust infrastructure for humans, enterprise systems and AI agents',48,218,1184,32,25,C.body);

txt(s1,'PROPOSED ARCHITECTURE',48,273,770,28,21.33,C.neutral500,true);
const ys=[316,376,436,496];
const labs=['Intelligent orchestration','Trusted execution','Canonical trust object','Trusted records & evidence'];
const brands=['SANTOS','ACTUS','eDoc',''];
const nodes=[];
ys.forEach((y,i)=>{
  const sh=rect(s1,`layer-${i}`,235,y,385,48,i===1?C.purple:i===3?C.darkBlue:C.softPurple);
  nodes.push(sh);
  txt(s1,labs[i],251,y+11,352,31,24,i===1||i===3?C.white:C.darkBlue,true);
  if(brands[i]) txt(s1,brands[i],636,y+12,148,30,21.33,C.neutral500);
});
for(let i=0;i<3;i++)connect(s1,nodes[i],nodes[i+1]);
const context=rect(s1,'organizational-context',48,326,163,92,'none');
txt(s1,'Organizational\ncontext',48,326,180,57,23,C.darkBlue,true);
txt(s1,'HOROS',48,388,163,28,21.33,C.neutral500);
const auth=rect(s1,'authority-policy',48,450,163,90,'none');
txt(s1,'Authority\n& policy',48,450,163,57,23,C.darkBlue,true);
txt(s1,'AUTHOS',48,512,163,28,21.33,C.neutral500);
connect(s1,context,nodes[1],'right','left',C.neutral500);
connect(s1,auth,nodes[1],'right','left',C.neutral500);

rect(s1,'trust-foundation',48,570,744,92,C.neutral100);
txt(s1,'EXISTING TRUST FOUNDATION',64,582,715,28,21.33,C.darkBlue,true);
txt(s1,'Identity, signatures, seals, timestamps, evidence, authority,\naudit, APIs and sovereign infrastructure',64,614,715,54,21.33,C.body);
addDivider(s1,{left:826,top:273,width:1,height:389,color:C.neutral200});
txt(s1,'A larger role in\ndigital transactions',860,275,372,92,32,C.darkBlue,true,'Spartan');
txt(s1,'Extend deployed trust infrastructure\ninto the control and evidence layer\nfor consequential actions by\nhumans, systems and AI agents.',860,385,372,119,22,C.body);
txt(s1,'EXPANSION OPPORTUNITY',860,537,372,28,21.33,C.purple,true);
txt(s1,'Beyond documents: payments,\nERP changes, procurement\nand government services',860,579,372,83,22,C.body);
addSources(s1,[
 'User-provided investor architecture brief in this conversation, 29 September 2026. Architecture is a proposed next-generation direction, not a claim of generally available capability.',
 'User-provided reference image: codex-clipboard-4fb763e5-996b-4adb-b7b7-43a908f9860c.png. Used for terminology and architecture relationships. Rebuilt as editable shapes and text.',
 'The brief refers to Next-Generation Circularo — Foundational Architecture.md. That source file was not supplied or found in the working directory. Its ACTUS scope is therefore attributed to the user brief, not independently verified.',
 'Narrative: Circularo is extending an already-deployed digital trust infrastructure into the control and evidence layer required when humans, enterprise systems and autonomous agents execute consequential actions. Internal draft based on management-provided source material.',
 'ACTUS is described in the brief as not document-specific. Additional intended use cases include access provisioning and agent-to-agent actions. These are expansion opportunities, not assertions of shipped functionality.',
 'HOROS supplies organizational context. AUTHOS supplies authority and policy. Function names lead so investors do not need to decode internal brands. SANTOS orchestrates, ACTUS governs execution, eDoc represents the canonical trust object, and records preserve evidence.'
]);

const s2=pres.slides.add();s2.background.fill=C.white;
const logo2=await fs.readFile(DIR+'/build/logo-slide-2.png');
s2.images.add({blob:logo2.buffer.slice(logo2.byteOffset,logo2.byteOffset+logo2.byteLength),contentType:'image/png',alt:'Circularo symbol',fit:'contain',position:{left:48,top:24,width:40,height:40}});
txt(s2,'02',1184,676,48,20,14,C.darkBlue,true,'Mulish','right');
txt(s2,'CIRCULARO’S FOUNDATION FOR EXPANSION',104,31,950,26,18,C.purple,true);
txt(s2,'Why Circularo can\ncredibly build this',48,96,1184,114,48,C.darkBlue,true,'Spartan');
txt(s2,'The opportunity: reuse existing infrastructure across a broader set of governed actions',48,218,1184,31,24,C.body);
txt(s2,'ESTABLISHED FOUNDATION',48,274,650,28,21.33,C.neutral500,true);
txt(s2,'NEXT-GENERATION DIRECTION',768,274,464,28,21.33,C.purple,true);
const xs=[48,288,528,768,1008];
const names=['Digital\nSignatures','Trusted\nCollaboration','Sovereign Trust\nInfrastructure','Trusted\nExecution','Agentic Trusted\nExecution'];
const desc=['Identity, signing\nand timestamps','Approvals, workflows\nand multi-party\ntransactions','Government services\nand identity\nintegration, evidence','Authority, policy\nand execution,\ninstitutional records','Humans and AI agents\nacting under\ngoverned authority'];
const circles=xs.map((x,i)=>{
  const sh=s2.shapes.add({name:`stage-${i+1}`,geometry:'ellipse',position:{left:x,top:316,width:40,height:40},fill:i>2?C.purple:C.darkBlue,line:{fill:'none',width:0}});
  txt(s2,String(i+1),x,322,40,29,22,C.white,true,'Mulish','center');
  return sh;
});
for(let i=0;i<4;i++)connect(s2,circles[i],circles[i+1],'right','left',i<2?C.neutral300:C.purple);
xs.forEach((x,i)=>{
  txt(s2,names[i],x,376,224,69,24,i>2?C.purple:C.darkBlue,true);
  txt(s2,desc[i],x,453,224,86,21.33,C.body);
});
rule(s2,48,553,1184);
txt(s2,'Deployment foundations',48,570,580,32,26,C.darkBlue,true);
txt(s2,'Management-reported',812,573,420,30,21.33,C.neutral500,false,'Mulish','right');
['TDRA GovSign','Digital Dubai\nDigiSign','Sharjah Sign','e&','KSA / Nafath'].forEach((name,i)=>txt(s2,name,xs[i],615,224,59,22,C.darkBlue,true));
addSources(s2,[
 'User-provided narrative and reference image: codex-clipboard-c7858ebd-e6a9-4436-a91f-b6e7470133da.png, 29 September 2026.',
 'The named deployment foundations (TDRA GovSign, Digital Dubai DigiSign, Sharjah Sign, e& and KSA/Nafath) are reported by the user. They have not been independently validated or approved as governed repository claims. The visible attribution preserves that evidence state.',
 'The first three stages describe the foundation presented by management. Trusted Execution and Agentic Trusted Execution describe the proposed direction. This is a strategic progression, not a dated delivery roadmap.',
 'Investor narrative: We built the infrastructure to establish identity, authority, intent, execution and evidence for important digital transactions. AI agents increase the number of actors capable of consequential actions. Circularo’s proposed next generation extends existing trust infrastructure to govern those actions and preserve verifiable evidence.',
 'Economic thesis: reuse the existing trust foundation and institutional relationships across a broader set of actions. The potential leverage is a larger addressable problem space without rebuilding the trust foundation. This is a strategic hypothesis, not quantified revenue, margin, valuation or delivery evidence.',
 'Deployment counts, certification assertions, customer-logo permission and specific rollout scope from the screenshot are not asserted in this deck. Source status: internal, non-canonical working draft.'
]);

await fs.writeFile(DIR+'/build/presentation.json',JSON.stringify(pres.toProto()));
await (await PresentationFile.exportPptx(pres)).save(DIR+'/build/candidate.pptx');
for (const [i,slide] of [s1,s2].entries()) {
  const png=await pres.export({slide,format:'png',scale:1.5});
  await fs.writeFile(`${DIR}/build/slide-${i+1}.png`,new Uint8Array(await png.arrayBuffer()));
  const layout=await slide.export({format:'layout'});
  await fs.writeFile(`${DIR}/build/slide-${i+1}.layout.json`,await layout.text());
}
const montage=await pres.export({format:'webp',montage:true,scale:0.7});
await fs.writeFile(DIR+'/build/montage.webp',new Uint8Array(await montage.arrayBuffer()));
console.log('Created editable 2-slide candidate and previews.');
