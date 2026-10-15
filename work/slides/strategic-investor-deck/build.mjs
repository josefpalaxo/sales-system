import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {promisify} from 'node:util';
import {execFile} from 'node:child_process';
import {createHash} from 'node:crypto';
import {buildDeck, exportDeck, loadLayouts} from '../../../slides-projects/circularo-slide-generator/src/generator.mjs';
import {ROOT, readJson} from '../../../slides-projects/circularo-slide-generator/src/runtime.mjs';
import {boundedText, invariant} from '../../../slides-projects/circularo-slide-generator/src/contract.mjs';

const work=path.dirname(fileURLToPath(import.meta.url));
const skill='/Users/josefneumann/.codex/plugins/cache/openai-primary-runtime/presentations/26.909.12148/skills/presentations';
const python='/Users/josefneumann/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3';
const sourceRoot='/Users/josefneumann/Projects/ai-workspace/investors';
const exec=promisify(execFile);
const box=(left,top,width,height)=>({left,top,width,height});
const themeChrome={logoBox:box(122,70,224,50),pageNumber:false,footerBox:box(122,1010,1500,35),footerStyle:{fontSize:20}};
const normalTitle=box(122,185,1670,120);
const types={titleBox:normalTitle,titleRole:'title',chrome:themeChrome,themes:['light','dark','gradient'],validate(s){boundedText(s.title,'title',85);}};
const text=(a,sl,n,t,x,y,w,h,size=32,role='body',dark=false,extra={},target)=>a.text(sl,n,t,box(x,y,w,h),role,dark,{fontSize:size,...extra},target);

function review(a,sl,s,b,dark=false){
  if(!s.review)return;
  a.rect(sl,'review-panel',b,dark?'#3520A4':'#F5EDFF');
  a.rect(sl,'review-accent',box(b.left,b.top,4,b.height),dark?'#C9AEFF':'#7000FF');
  const labelSize=26, bodySize=26;
  text(a,sl,'review-label',s.review.label,b.left+20,b.top+10,b.width-40,38,labelSize,'label',dark,{color:dark?'#FFFFFF':'#7000FF'});
  text(a,sl,'review-reason',s.review.text,b.left+20,b.top+53,b.width-40,b.height-57,bodySize,'body',dark);
}

const registry=await loadLayouts();
// Task-local adaptations reuse existing definitions, fonts, assets and adapter.
// They do not change the registered design-system source or its specimens.
for(const [id,def] of registry)registry.set(id,{...def,chrome:{...def.chrome,...themeChrome}});
for(const id of ['process','architecture'])registry.set(id,{...registry.get(id),titleBox:normalTitle});
const cover=registry.get('cover');
registry.set('investor-cover',{...cover,id:'investor-cover',name:'Investor cover',chrome:themeChrome,
  titleBox:box(122,245,1590,360),bodyBox:box(122,655,1490,160),bodyRole:'section',
  async renderBackground(a,sl){await a.image(sl,'cover-signature','signature-curves',box(0,0,1920,1080));},
  async render(a,sl,s,dark){
    text(a,sl,'cover-descriptor',s.body,122,655,1490,160,42,'section',dark,{},sl.placeholders.getItem('body'));
    text(a,sl,'cover-intent','A strategic shareholder to expand adoption across its businesses and customer network.',122,855,1530,100,32,'body',dark);
  }
});
registry.set('investor-snapshot',{...types,id:'investor-snapshot',name:'Investor financial snapshot',theme:'light',
  render(a,sl,s){
    for(const [i,m] of s.metrics.entries()){
      const x=122+i*570;
      text(a,sl,'metric-label-'+i,m.label,x,370,530,54,30,'label');
      text(a,sl,'metric-value-'+i,m.value,x,440,540,145,100,'display',false,{color:a.t.colors.purple});
      text(a,sl,'metric-detail-'+i,m.detail,x,600,530,90,27);
    }
    text(a,sl,'delivery-label','Delivery',122,736,240,48,30,'label');
    text(a,sl,'delivery',s.delivery,390,736,1380,50,30);
    text(a,sl,'leadership-label','Leadership',122,803,240,48,30,'label');
    text(a,sl,'leadership',s.continuity,390,803,1380,50,30);
    review(a,sl,s,box(122,887,1670,108));
  }
});
const table=registry.get('table');
registry.set('investor-market-table',{...table,id:'investor-market-table',name:'Investor priority markets',chrome:themeChrome,titleBox:normalTitle,
  render(a,sl,s){
    a.table(sl,'priority-table',s.rows,box(122,365,1670,456));
    text(a,sl,'market-scope','Expansion priorities. Market selection follows identifiable demand and partner capability.',122,843,1670,42,28);
    review(a,sl,s,box(122,897,1670,100));
  }
});
registry.set('investor-product-proof',{...types,id:'investor-product-proof',name:'Investor live product scope',theme:'light',
  render(a,sl,s){
    s.items.forEach((v,i)=>{
      const x=122+i*570;
      a.rect(sl,'product-rule-'+i,box(x,350,505,3),a.t.colors.purple);
      text(a,sl,'product-name-'+i,v.heading,x,390,510,132,40,'section');
      text(a,sl,'product-scope-'+i,v.body,x,555,510,110,32);
    });
    text(a,sl,'product-opportunity','Partner opportunity: enterprise use cases, integrations and complementary technology resources.',122,680,1670,48,30);
    review(a,sl,s,box(122,748,1670,145));
    text(a,sl,'product-status','Live status reflects management confirmation. Adoption scale and product-specific ARR are not supplied.',122,920,1670,60,28);
  }
});
registry.set('investor-arr-ambition',{...types,id:'investor-arr-ambition',name:'Investor ARR ambition',theme:'gradient',
  async renderBackground(a,sl){await a.image(sl,'growth-signature','signature-curves',box(0,0,1920,1080));},
  render(a,sl,s){
    text(a,sl,'current-label','Current ARR',122,352,720,60,32,'label',true);
    text(a,sl,'ambition-label','Management ambition',1100,352,700,60,32,'label',true);
    text(a,sl,'current-value',s.current,122,430,700,190,126,'display',true);
    text(a,sl,'ambition-value',s.ambition,1100,430,700,190,126,'display',true);
    text(a,sl,'current-basis','Management approximation',122,631,770,55,30,'body',true);
    text(a,sl,'ambition-timing','Within 2–3 years',1100,631,700,55,30,'body',true);
    text(a,sl,'growth-gap',s.gap,122,741,1670,66,40,'section',true);
    text(a,sl,'growth-caveat','Management ambition, not a forecast. Partner contribution and timing remain to be validated.',122,821,1670,48,28,'body',true);
    review(a,sl,s,box(122,887,1670,108),true);
  }
});

const deck=JSON.parse(await fs.readFile(path.join(work,'content.json'),'utf8'));
const result=await buildDeck(deck,{registry});
const a=result.adapter;
for(const [i,slide] of result.presentation.slides.items.entries()){
  const s=deck.slides[i],dark=result.slideMeta[i].theme!=='light';
  a.slideId=s.id;
  text(a,slide,'slide-number',String(i+1).padStart(2,'0'),1730,1010,65,35,20,'caption',dark,{alignment:'right'});
  if(s.id==='today')text(a,slide,'financial-units','USD',1610,135,180,42,26,'label',false,{alignment:'right'});
  if(s.id==='position')review(a,slide,s,box(122,841,830,145));
  if(['references','transaction'].includes(s.id))review(a,slide,s,box(122,795,810,195));
  if(s.id==='references')text(a,slide,'program-group-label','Shared services and distribution',1098,72,716,48,30,'label');
  if(s.id==='transaction')text(a,slide,'transaction-subject','Preferred transaction (USD)',122,160,810,50,30,'label');
  if(s.id==='saas')review(a,slide,s,box(122,819,740,175));
  if(s.id==='process'){
    text(a,slide,'process-context','Illustrative workflow. Applications and AI agents can participate through programmable capabilities.',122,342,1670,47,28);
    text(a,slide,'evidence-continuity','A continuing record of decisions, execution and evidence',122,951,1670,45,28,'label',false,{color:a.t.colors.purple});
  }
  if(s.id==='shared-services'){
    text(a,slide,'service-references','References: TDRA GovSign, Digital Dubai DigiSign and Sharjah Sign',122,840,1670,50,30,'body',true);
    review(a,slide,s,box(122,901,1670,95),true);
  }
  if(s.id==='discussion'){
    text(a,slide,'future-options','Future options include IPO, private equity or a strategic investment. No fixed route or timing.',122,170,735,115,26);
  }
  const sources=[
    sourceRoot+'/output/circularo-strategic-partnership-investment-deck-outline.md',
    sourceRoot+'/output/circularo-strategic-investment-teaser-outline.md',
    sourceRoot+'/output/circularo-investment-materials-fact-check.md',
    sourceRoot+'/output/circularo-founder-clarifications.md'
  ];
  if(['today','ambition'].includes(s.id))sources.push(sourceRoot+'/inputs/financials-overview.md');
  if(['position','references','process','shared-services','product'].includes(s.id))sources.push(sourceRoot+'/inputs/about-circularo.md');
  const citations=sources.map(p=>'Source: '+p).join('\n');
  const assetIds=a.audit.filter(o=>o.slide===s.id&&o.kind==='image').map(o=>o.asset);
  slide.speakerNotes.textFrame.setText(s.notes+'\n\nClaim register IDs: '+s.claimIds.join(', ')+
    (s.review?'\n\nVisible review comment: '+s.review.label+'. '+s.review.text:'')+
    '\n\n'+citations+'\n\nDesign: Circularo local slide system, Figma u6EZyJ6uPmwiIkJEi5JSzj / 11426:3154. Assets: '+assetIds.join(', ')+'. Asset provenance: '+ROOT+'/assets/manifest.json');
}
a.checkBounds();
const build=await fs.mkdtemp(path.join(work,'.build-'));
await exportDeck(result,build,{render:false});
await fs.writeFile(path.join(build,'content.json'),JSON.stringify(deck,null,2)+'\n');
process.env.RUNTIME_NODE_MODULES=path.join(ROOT,'vendor/node_modules');
const {finalizePresentation}=await import(path.join(skill,'container_tools/artifact_tool_utils.mjs'));
const out=path.join(build,'validated');await fs.mkdir(out);
const pptx=path.join(out,'circularo-strategic-partnership-investment-deck.pptx');
await finalizePresentation({
  workspaceDir:work,candidatePath:path.join(build,'candidate.pptx'),finalPath:pptx,
  pythonExecutable:python,integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),
  layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),
  explicitTotalSlideCount:12,requiredNativeTableOwnerSlides:[8],requiredNativeChartOwnerSlides:[],
  layoutArgs:['--expected-slide-size-emu','18288000,10287000','--validate-heading-fit','--require-native-table-slide','8'],
  fontPolicy:{basis:'design',families:['Spartan','Mulish']},verifyArtifactToolImport:true,
  receiptPath:path.join(build,'finalization.json')
});
for(const scale of [1,2]){
  const dest=path.join(build,scale===1?'preview-1080p':'preview-4k');
  await exec(process.execPath,[path.join(ROOT,'scripts/render.mjs'),pptx,dest,'libreoffice',String(scale)],{timeout:180000,maxBuffer:2**20});
}
const sha=createHash('sha256').update(await fs.readFile(pptx)).digest('hex');
const receipt={pptx,build,sha256:sha,slides:12,sourceSystem:ROOT,layoutIds:deck.slides.map(s=>s.layout),visibleReviewSlides:deck.slides.flatMap((s,i)=>s.review?[i+1]:[]),nativeTableSlides:[8],visualReview:'pending'};
await fs.writeFile(path.join(work,'latest-build.json'),JSON.stringify(receipt,null,2)+'\n');
console.log(JSON.stringify(receipt,null,2));
