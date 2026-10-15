import fs from 'node:fs/promises';
import path from 'node:path';
import { GlobalFonts } from '@napi-rs/canvas';
import { Presentation, PresentationFile } from '@oai/artifact-tool';
import { addChrome, addText, addSources, COLORS } from '../../../.agents/skills/circularo-slides/scripts/circularo-slide-system.mjs';
const root=path.resolve(import.meta.dirname,'..');
const repo=path.resolve(root,'../..');
const skill='/Users/josefneumann/.codex/plugins/cache/openai-primary-runtime/presentations/26.909.61513/skills/presentations';
const {finalizePresentation,applyPresentationChartFont}=await import(path.join(skill,'container_tools/artifact_tool_utils.mjs'));
const fontdir=path.join(repo,'.agents/skills/circularo-slides/assets/fonts');
for(const[f,family]of [['spartan-bold.ttf','Spartan'],['mulish-regular.ttf','Mulish'],['mulish-bold.ttf','Mulish']]){
 GlobalFonts.registerFromPath(path.join(fontdir,f),family);
}
const data=JSON.parse(await fs.readFile(path.join(root,'build/model-results.json'),'utf8'));
const million=n=>(n/1e6).toFixed(2);
const pres=Presentation.create({slideSize:{width:1280,height:720}});
function text(s,name,t,x,y,w,h,size=24,role='body',color=COLORS.body){return addText(s,{name,text:t,left:x,top:y,width:w,height:h,fontSize:size,role,color});}
async function slide(n,title,dark=false){const s=pres.slides.add();s.background.fill=dark?COLORS.darkBlue:'#FFFFFF';await addChrome(s,n,{dark,signature:false});
 text(s,'eyebrow','DIGITAL DUBAI AUTHORITY',104,29,800,32,22,'bodyBold',dark?'#FFFFFF':COLORS.purple);
 text(s,'title',title,48,98,1170,126,46,'slideTitle',dark?'#FFFFFF':COLORS.darkBlue);return s;}
const s1=await slide(1,`AED ${million(data.totals[34])}m in modeled\nfive-year savings`);
text(s1,'discount','50%',48,256,460,96,72,'hero',COLORS.purple);
text(s1,'discount-explanation','lower subscription price\nagainst the DDA baseline',48,352,470,76,27);
text(s1,'price','AED 1,180 vs AED 2,360\nper user per year',48,451,475,70,26,'bodyBold',COLORS.darkBlue);
text(s1,'roi',`${(data.roi*100).toFixed(1)}% procurement ROI`,48,532,490,42,25,'bodyBold',COLORS.darkBlue);
const chart=s1.charts.add('bar',{
 position:{left:570,top:230,width:660,height:320},categories:['DDA baseline','Central program'],
 series:[{name:'Five-year cost (AED m)',values:[data.totals[23]/1e6,data.totals[32]/1e6],valuesFormatCode:'0.00',fill:COLORS.darkBlue,points:[{idx:1,fill:COLORS.purple}]}],
 barOptions:{direction:'bar',grouping:'clustered',gapWidth:70},hasLegend:false,
 xAxis:{visible:true,min:0,numberFormatCode:'0',textStyle:{fontSize:22,typeface:'Mulish'},majorGridlines:null},
 yAxis:{textStyle:{fontSize:22,typeface:'Mulish'},majorGridlines:null},
 dataLabels:{showValue:true,position:'outEnd',textStyle:{fontSize:24,bold:true,typeface:'Mulish'}},
 title:'Five-year cost (AED m)',titleTextStyle:{fontSize:24,typeface:'Mulish',bold:true}
});applyPresentationChartFont(chart,{fontFamily:'Mulish'});
text(s1,'scope','Base assumption: 10,000 to 12,500 users, 1,260 on-premise and 40 new entities.\nIncludes onboarding. Excludes tax and unpriced services. No baseline price increases.\nROI = five-year comparative benefit divided by central modeled program cost.',48,579,1180,87,22);
addSources(s1,[
 'User-supplied terms S01, S06–S10 in fact-register.md. DDA baseline AED 2,360; central AED 1,180. 10% hosted / 20% on-premise support. Regular Basic Price AED 2,950 is reference only, giving 60% discount.',
 'DDA-business-case-model.xlsx, Base case, Cost model K23=147,511,800; K32=74,475,900; K34=73,035,900. Five-year new-entity onboarding 720,000 included. Recurring central cost 73,755,900.',
 'Growth-seat price protection, allocation and rollout timing need confirmation. Base quantity path 10,000 / 10,625 / 11,250 / 11,875 / 12,500. Existing on-premise users retained at 1,260. Forty new entities is a planning assumption.',
 'Five-year procurement ROI 98.1% = 73,035,900 / 74,475,900. Net savings / matched baseline is 49.5%. This is an expanded-service benchmark, not actual current government spending.'
]);

const s2=await slide(2,'Evidence for the 10,000-user\nstarting pool');
text(s2,'existing','1,830 existing project users',48,250,650,47,30,'bodyBold',COLORS.darkBlue);
text(s2,'existing-detail','Eight customer entities and nine projects,\nincluding RTA’s 1,000 CAPEX users.',48,311,630,70,25);
const allocation=s2.charts.add('bar',{
 position:{left:45,top:401,width:650,height:127},categories:['Initial pool'],
 series:[{name:'Existing users',values:[1830],fill:COLORS.purple},{name:'Awaiting allocation',values:[8170],fill:'#D0D5DD'}],
 barOptions:{direction:'bar',grouping:'stacked',gapWidth:40},hasLegend:false,
 xAxis:{visible:false,min:0,max:10000,majorGridlines:null},yAxis:{visible:false,majorGridlines:null},
 dataLabels:{showValue:true,position:'center',textStyle:{fontSize:24,typeface:'Mulish',fill:COLORS.darkBlue,bold:true}}
});applyPresentationChartFont(allocation,{fontFamily:'Mulish'});
text(s2,'gap','8,170 seats still need named allocations.',48,531,630,48,25,'bodyBold',COLORS.darkBlue);
text(s2,'survey-min','4,921 users',749,250,480,57,42,'sectionTitle',COLORS.purple);
text(s2,'survey-min-detail','Minimum across 21 numerical\ncurrent or expected user responses',749,316,475,71,23);
text(s2,'interest','10 current requirements\n6 possible future requirements',749,407,475,76,26,'bodyBold',COLORS.darkBlue);
text(s2,'growth','17 of 22 respondents expect growth.',749,507,475,57,23);
text(s2,'demand-caveat','Survey overlap with existing customers is unknown. The wider list has 92 source rows with aliases.\nDDA’s 76,000+ Smart Employee users indicate scale, not paid-signature demand.',48,606,1180,65,22);
addSources(s2,[
 'S03 existing customer project users sum to 1,830 including RTA. Eight entities and nine projects. User counts are not verified unique active users.',
 'S04 DDA internal survey. Q3: six 1–50, four 51–100, seven 101–500, four >1,000, one Other. Numerical minimum 6*1+4*51+7*101+4*1001=4,921. Q7 N=16, ten current/six future requirements. Q5 17 of 22 expect growth.',
 'Do not add survey minimum to the existing customer total without respondent mapping. No exact total for all surveyed entities is established.',
 'S02 DDA deparments shared service.xlsx, dda departments A2:B93 only. 92 name rows, 91 numbered, duplicate/alias and eligibility review pending.',
 'R01 Digital Dubai May 2025 Smart Employee scale: https://www.digitaldubai.ae/newsroom/news/dubai-to-make-presence-felt-at-gitex-europe-x-ai-everything-2025-with-a-joint-pavilion-featuring-12-government-and-private-entities',
 'Current contracts require reconciliation: central cost for the existing 1,830 users is 2,524,020 versus known reported charges of 2,047,235.66, conditional on AED/additive support. RTA rises from 608,000 support to 1,416,000 subscription plus support. Missing old support and tax details limit conclusions.'
]);

const s3=await slide(3,'Five-year pricing with annual budgets',true);
text(s3,'budget',`AED ${million(data.annual[32][0])}m`,48,238,620,84,60,'hero','#FFFFFF');
text(s3,'budget-label','modeled Year 1 budget',48,329,620,48,29,'bodyBold','#FFFFFF');
text(s3,'budget-detail','AED 13.13m subscription and support\nAED 0.18m for 10 new entities',48,396,660,75,25,'body','#FFFFFF');
text(s3,'lock','No indexation for five years',48,511,630,45,30,'bodyBold','#FFFFFF');
text(s3,'lock-detail','Growth changes the annual bill.\nConfirm price protection for added seats.',48,565,650,67,23,'body','#FFFFFF');
text(s3,'decision-label','Proposed decision',760,245,465,55,30,'sectionTitle','#FFFFFF');
text(s3,'decision','Sponsor central procurement\nfor an initial 10,000 users.',760,317,465,78,27,'bodyBold','#FFFFFF');
text(s3,'condition','Finalize funded allocations,\nmigration dates and unpriced\nservices before commitment.',760,416,465,115,25,'body','#FFFFFF');
text(s3,'funding','DDA funds annual payments.\nEntity contributions can support\nthe central budget.',760,553,465,94,23,'body','#FFFFFF');
addSources(s3,[
 'S07 initial 10,000 users, annual billing, five-year commitment, zero indexation, 25% cumulative growth. DDA central funding with tentative entity budget contributions. Internal transfers are not government-wide savings.',
 'Base model Year 1: subscription 11,800,000, hosted support 1,031,320, on-premise support 297,360, total recurring 13,128,680. Ten new entities at 18,000 = 180,000. Total 13,308,680.',
 'S08–S10 include Digital Sovereign Sign, unlimited manual transactions and external recipients, hosting and branding. Standard 8×5 support 10%, on-premise support 20% replaces 10% and old support.',
 'Automated/API add-ons, Sovereign Collaboration, AI services, Evidence based Archiving for Standalone Documents and files are separately purchased. Tax and unpriced implementation/operation costs excluded.',
 'A hypothetical 3% annual baseline escalation adds 9,629,287.0899516 of avoided cost over five years, excluded from headline benefit. No subscription escalation rate has been supplied for the baseline.',
 'Base Year 1 cost threshold is 5,013 deployed users at the DDA benchmark, including 1,260 on-premise. This is not current cash payback. Migration overlap and unused capacity remain risks.',
 'This is an internal review proposal. Growth-seat pricing and rollout schedules are assumptions, not finalized terms.'
]);

const staging=path.join(root,'build/slides');await fs.mkdir(staging,{recursive:true});
for(let i=0;i<3;i++){const s=pres.slides.items[i];const png=await pres.export({slide:s,format:'png',scale:1});await fs.writeFile(path.join(staging,`slide-${i+1}.png`),new Uint8Array(await png.arrayBuffer()));const layout=await s.export({format:'layout'});await fs.writeFile(path.join(staging,`slide-${i+1}.layout.json`),await layout.text());}
const candidate=path.join(staging,'candidate.pptx');await(await PresentationFile.exportPptx(pres)).save(candidate);
const finalPath=path.join(root,'build/checked-slides-roi/DDA-executive-slides.pptx');
await fs.mkdir(path.dirname(finalPath),{recursive:true});
await finalizePresentation({workspaceDir:root,candidatePath:candidate,finalPath,
 pythonExecutable:'/Users/josefneumann/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',
 integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),
 layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),
 layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit'],
 explicitTotalSlideCount:3,requiredNativeChartOwnerSlides:[1,2],materializeLiteralChartWorkbooks:true,
 fontPolicy:{basis:'design',families:['Spartan','Mulish']},verifyArtifactToolImport:true,
 receiptPath:path.join(staging,'validation-roi.json')});
await fs.copyFile(finalPath,path.join(root,'outputs/dda-business-case/DDA-executive-slides.pptx'));
const bundled=path.join(root,'outputs/dda-business-case/Circularo-fonts');await fs.mkdir(bundled,{recursive:true});
for(const f of ['spartan-bold.ttf','mulish-regular.ttf','mulish-bold.ttf'])await fs.copyFile(path.join(fontdir,f),path.join(bundled,f));
console.log(finalPath);
