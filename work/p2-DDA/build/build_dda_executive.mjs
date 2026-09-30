import fs from 'node:fs/promises';
import path from 'node:path';
import {GlobalFonts} from '@napi-rs/canvas';
import {Presentation,PresentationFile} from '@oai/artifact-tool';
import {addChrome,addText,addDivider,addSources,COLORS} from '../../../.agents/skills/circularo-slides/scripts/circularo-slide-system.mjs';

const root=path.resolve(import.meta.dirname,'..');
const staging=path.join(root,'build/dda-executive');
const output=process.env.DDA_DECK_STAGING_OUTPUT||path.join(root,'outputs/dda-business-case-v2/DDA-executive-proposal.pptx');
const skill='/Users/josefneumann/.codex/plugins/cache/openai-primary-runtime/presentations/26.909.61513/skills/presentations';
const fonts=path.resolve(root,'../../.agents/skills/circularo-slides/assets/fonts');
for(const[file,family]of [['spartan-bold.ttf','Spartan'],['mulish-regular.ttf','Mulish'],['mulish-bold.ttf','Mulish']])GlobalFonts.registerFromPath(path.join(fonts,file),family);
const {finalizePresentation,applyPresentationChartFont}=await import(path.join(skill,'container_tools/artifact_tool_utils.mjs'));
const source=JSON.parse(await fs.readFile(path.join(staging,'model-data.json'),'utf8'));
const cell=(s,c)=>source.cells[s][c];
if(cell('Summary','E4')!==10000)throw Error('Source is not the requested 10K scenario.');
const n=(x,d=0)=>Number(x).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
const m=x=>(x/1e6).toFixed(2);
const current=cell('Existing customers','G16'),users=cell('Existing customers','D16'),unit=cell('Setup','E18'),avg=current/users;
const discount=(1-unit/avg)*100;
const simpleAverage=source.customers.reduce((sum,row)=>sum+row[2],0)/source.customers.length;
const executiveDiscount=(1-unit/simpleAverage)*100;
const growth=cell('Setup','E67'),additional=cell('Potential','E23'),other=cell('Potential','E72');
const existingYearOne=cell('Potential','D28');
const existingYearOneSavings=current*(existingYearOne/users)-unit*existingYearOne;
const otherPerEntity=Math.ceil(other/54);
const pres=Presentation.create({slideSize:{width:1280,height:720}});
function text(s,name,t,x,y,w,h=60,size=24,role='body',color=COLORS.body){return addText(s,{name,text:t,left:x,top:y,width:w,height:h,fontSize:size,role,color});}
async function slide(title,appendix='',dark=false){
 const s=pres.slides.add(),number=pres.slides.items.length;s.background.fill=dark?COLORS.darkBlue:'#FFFFFF';
 await addChrome(s,number,{dark,signature:false});
 text(s,'eyebrow',appendix?'DDA MANAGEMENT DISCUSSION / '+appendix:'DIGITAL DUBAI AUTHORITY',104,28,1060,33,22,'bodyBold',dark?'#FFFFFF':COLORS.purple);
 text(s,'title',title,48,96,1184,126,46,'slideTitle',dark?'#FFFFFF':COLORS.darkBlue);return s;
}
function foot(s,t,dark=false){text(s,'qualification',t,48,622,1184,64,22,'body',dark?'#FFFFFF':COLORS.neutral700);}
function notes(s,refs,talk){addSources(s,[...refs,'Workbook source: '+source.source+'; SHA-256 '+source.sha256,'Commercial scope: user instructions and outputs/dda-business-case-v2/goal.md. Proposed terms, not executed contracts.','Presenter notes: '+talk]);}
function table(s,values,{x=48,y=230,width=1184,height=340,widths,size=22,total=false}={}){
 const t=s.tables.add({rows:values.length,columns:values[0].length,left:x,top:y,width,height,values,columnWidths:widths});
 t.styleOptions={headerRow:true,bandedRows:false};t.borders.assign({fill:'#FFFFFF',width:0});
 t.cells.block({row:0,column:0,rowCount:values.length,columnCount:values[0].length}).assign({textStyle:{typeface:'Mulish',fontSize:size,color:COLORS.body},margins:{left:10,right:10,top:8,bottom:8}});
 for(let r=0;r<values.length;r++)for(let c=0;c<values[r].length;c++){
  const a=t.getCell(r,c);a.fill=r===0?COLORS.darkBlue:r%2===0?'#F5EDFF':'#FFFFFF';
  a.text.style={typeface:'Mulish',fontSize:size,bold:r===0||(total&&r===values.length-1),color:r===0?'#FFFFFF':COLORS.body,alignment:c===0?'left':'right'};
 }return t;
}

// 1. Executive proposition, with two price comparisons clearly separated.
const s1=await slide('One Dubai Government Platform.\nOne Central Commitment.','',true);
text(s1,'descriptor','Proposed Circularo Enterprise framework for participating entities',48,229,1160,48,26,'body','#FFFFFF');
text(s1,'users','10,000',48,329,355,95,72,'hero','#FFFFFF');
text(s1,'users-label','initial Enterprise users',48,428,355,60,25,'body','#FFFFFF');
text(s1,'rate','AED '+n(unit),470,329,415,95,64,'hero','#FFFFFF');
text(s1,'rate-label','per user per year',470,428,415,60,25,'body','#FFFFFF');
text(s1,'term','5 years',918,329,314,95,54,'hero','#FFFFFF');
text(s1,'term-label','locked unit price\nannual billing',918,428,314,80,25,'body','#FFFFFF');
text(s1,'benefit',n(executiveDiscount,2)+'% below the average existing project unit price',48,545,1160,50,31,'bodyBold','#FFFFFF');
foot(s1,'Simple average of 7 project prices: AED '+n(simpleAverage,2)+'. Subscription only; support separate.\nList-price reference: 60% below AED 2,950.',true);
notes(s1,['Summary!E4; Setup!E8/E18; Existing customers!E9:E15/D16/G16.'], 'Open with the proposed framework and decision. One framework describes centralized procurement, not a mandatory single deployment or replacement of all on-premise arrangements. Executive pricing benchmark: equal weight to each of the seven project unit prices across six entities, including both DDA projects. Simple average is AED '+simpleAverage+'/user/year; reduction to AED 1,180 is '+n(executiveDiscount,2)+'%. This is a unit-price comparison, not the average paid per user or a cash-saving percentage. Existing customer cash savings continue to sum each actual customer price multiplied by users. The simple-average and list-price discounts are alternative comparisons, not additive discounts.');

// 2. Editable adoption bridge; current users, assumptions and target are distinct.
const s2=await slide('A Credible Path to 10,000 Users');
text(s2,'lead','Year 1 allocation combines existing adoption with survey opportunity',48,224,1160,48,26);
const parts=[[n(users),'Existing users','Supplied customer base'],['+'+n(additional),'Existing growth',n(growth*100)+'% Year 1 growth'],['+4,921','Survey minimum','Current / expected users'],['+'+n(other),'Other entities','Additional adoption target'],['10,000','Commitment','Modeled allocation']];
for(let i=0;i<parts.length;i++){const x=48+i*240;const col=i===3?COLORS.neutral500:COLORS.purple;text(s2,'bridge-number-'+i,parts[i][0],x,319,224,66,43,'sectionTitle',col);text(s2,'bridge-label-'+i,parts[i][1],x,399,224,38,25,'bodyBold',COLORS.darkBlue);text(s2,'bridge-detail-'+i,parts[i][2],x,447,215,70,22);}
text(s2,'coverage',n(cell('Summary','E32')*100,2)+'% in the modeled existing / growth / survey allocation',48,542,1184,43,28,'bodyBold',COLORS.darkBlue);
foot(s2,'Survey counts are added without overlap deduction; this is not unique committed demand.\nThe Other target equates to about '+otherPerEntity+' users across each of 54 unsurveyed entities.');
notes(s2,['Potential!E14/E23/E71/E72; Summary!E32/E34; Survey!H27/E66.'], 'Year 1 existing growth is '+n(growth*100)+'%, or '+n(additional)+' users, as corrected by the user. It is user-reported, not independently verified contracted users. 4,921 is the numerical minimum implied by 21 answered bands, not a confirmed new-customer pipeline. The user instructed full additive survey counts, with zero overlap deduction. The '+otherPerEntity+' users per unsurveyed entity is a feasibility illustration, not a measured forecast. 38 entities were surveyed out of planning scope 92.');

// 3. Flat comparison composition, with additional value kept outside modeled savings.
const s3=await slide('More Value for Every Dirham');
const xs=[48,455,862];
for(const[i,h]of ['Lower unit price','Enterprise access','Five-year certainty'].entries())text(s3,'pillar-'+i,h,xs[i],232,362,76,29,'sectionTitle',COLORS.darkBlue);
text(s3,'price-reduction',n(executiveDiscount,2)+'%',48,342,350,78,60,'hero',COLORS.purple);
text(s3,'cost-copy','AED '+n(simpleAverage,2)+' to AED 1,180\nSimple average of 7 projects',48,432,370,80,24);
text(s3,'current-saving','Actual annual saving\nAED '+n(current-users*unit)+'\nfor today’s 1,310 users',48,527,385,84,23,'bodyBold',COLORS.darkBlue);
text(s3,'enterprise','Enterprise',455,346,360,66,40,'sectionTitle',COLORS.purple);
text(s3,'enterprise-copy','Common capabilities for\nparticipating entities.\nMost agreed feature add-ons\nincluded.',455,432,365,145,25);
text(s3,'lock','No indexation',862,346,370,66,36,'sectionTitle',COLORS.purple);
text(s3,'lock-copy','Annual billing with a locked\nsubscription unit price.\nPaid-user growth changes\nthe annual budget.',862,432,370,145,25);
foot(s3,'Included add-ons offer indicative additional value of ~AED 20,000 per entity/year.\nThis value is outside subscription savings and depends on entity requirements.');
notes(s3,['Existing customers!E9:E15/D16/G16/I16; Setup!E18; goal.md additional commercial terms.'], 'The '+n(executiveDiscount,2)+'% executive pricing comparison uses a simple average of seven project unit prices, not a user-weighted average. Actual existing-user annual savings are AED 383,369.75 before support, calculated as SUM(users times actual unit price) minus 1,310 times AED 1,180. Do not apply the simple average to the 1,310 users or apply 42.64% to their current spend. With '+n(growth*100)+'% Year 1 growth, the existing cohort saves AED '+n(existingYearOneSavings,2)+', assuming the same current price mix. Enterprise is a proposed entitlement for participating entities; do not claim every existing entity is on Business or that every optional module is included.');

// 4. Decision, recurring budget and execution priorities.
const s4=await slide('Establish Circularo Enterprise\nas a Dubai Government Shared Service');
text(s4,'decision','Approve the five-year central framework, starting with 10,000 users',48,230,1170,82,32,'bodyBold',COLORS.darkBlue);
text(s4,'budget','AED '+m(cell('Potential','D39'))+'m',48,345,650,87,65,'hero',COLORS.purple);
text(s4,'budget-label','Year 1 subscription',48,435,640,45,28);
text(s4,'budget-details','Plus AED '+(cell('Potential','D41')/1e6).toFixed(3)+'m support under the model\nRecurring budget: AED '+( (cell('Potential','D39')+cell('Potential','D41'))/1e6).toFixed(3)+'m before other charges',48,499,670,91,24);
text(s4,'terms','AED 1,180 per user/year\nAnnual billing\nNo unit-price indexation for five years',782,343,450,131,26,'bodyBold',COLORS.darkBlue);
text(s4,'next','DDA sponsors procurement and\nconfirms entity allocations, funding\nand onboarding sequence.',782,500,450,111,25);
foot(s4,'New-entity onboarding: AED 20,000 once per new entity. Optional modules are extra.\nAt exactly 10K, the model uses 14% support. The 12.5% proposal applies above 10K.');
notes(s4,['Potential!D39/D41; Setup!E17; goal.md support and onboarding terms.'], 'The approval sought covers a central five-year procurement framework with annual budgets. Model support of 14% at exactly 10,000 users gives AED 1,652,000, making the initial recurring subscription-plus-support budget AED 13,452,000. Support is not included in savings. New entity count and implementation timing remain to be agreed; do not imply onboarding or optional modules are included in this recurring total. Proposed execution steps are recommendations, not completed actions.');

// 5. Existing-customer evidence.
const s5=await slide('Savings against current customer prices','OPTIONAL DETAIL 1');
text(s5,'basis','Today’s 1,310 users, allocated the central AED 1,180 rate',48,180,1180,40,26);
const labels=['DDA VIP project','Digital Dubai Authority','Dubai Culture & Arts','Dubai Electronic Security Center','PCFC','Roads and Transport Authority','His Highness the Rulers Court'];
const rows=[['Customer / project','Users','Current AED/user','Saving AED/year'],...source.customers.slice(0,7).map((a,i)=>[labels[i],n(a[1]),n(a[2],2),n(a[6],2)]),['Total',n(users),n(avg,2)+' weighted',n(current-users*unit,2)]];
table(s5,rows,{y:230,height:315,widths:[475,105,245,359],size:22,total:true});
foot(s5,'Actual baseline: AED '+n(current,2)+'. Current-user saving: AED '+n(current-users*unit,2)+' ('+n(discount,2)+'%).\nWith 50% Year 1 growth: AED '+n(existingYearOneSavings,2)+' saving. Support separate.');
notes(s5,['Existing customers!C9:I16; Potential!D87:G88.'], 'Customer table shows current source users only. Each saving is users multiplied by current price less AED 1,180. Weighted average = AED 1,929,169.75 divided by 1,310 = AED '+avg+'. RTA represents 1,000 of 1,310 users (76.34%) and has the lowest unit price, AED 1,245, so it dominates this average. The separate executive pricing benchmark gives equal weight to seven project prices (six entities, with two DDA projects), yielding AED '+simpleAverage+' and a '+n(executiveDiscount,2)+'% unit-price reduction. Only the customer-by-customer calculation supports actual current-user savings. Year 1 growth assumes the same weighted current subscription price. The full 10K commitment remains payable. Existing source rates are not independently audited.');

// 6. Survey evidence with explicit denominators.
const s6=await slide('Survey evidence and its limits','OPTIONAL DETAIL 2');
text(s6,'survey-intro','21 quantified current / expected user responses',48,214,785,46,26,'bodyBold',COLORS.darkBlue);
table(s6,[['Users per entity','Responses','Minimum users'],['1–50','6','6'],['51–100','4','204'],['101–500','7','707'],['More than 1,000','4','4,004'],['Total','21','4,921']],{y:282,width:754,height:276,widths:[330,180,244],total:true});
text(s6,'respondents','38 entities surveyed',862,215,370,48,29,'sectionTitle',COLORS.purple);
text(s6,'signals','21 already use e-signatures\n16 express current/future interest',862,285,365,89,25);
text(s6,'growth','77.27%',862,401,365,61,44,'sectionTitle',COLORS.purple);
text(s6,'growth-label','17 of 22 expect growth\n13 of 17 cite more users (76.47%)',862,480,368,93,23);
foot(s6,'One further user response is unspecified. Survey overlap with existing customers is unresolved.\nThe 16 interested entities add no extra quantified users to this model.');
notes(s6,['Survey!C21:H27 and C52:E72; user-supplied DDA internal survey.'], 'Q1 denominator 38: yes 21, no 10, planning 6, implementing 1. Interest question has 16 responses: 10 current requirement and six future. Growth denominator is 22 and more-users denominator is 17. Cost and user bands cannot be matched. Do not interpret organization shares as a user growth percentage.');

// 7. Five-year user and paid subscription profile.
const s7=await slide('Five-year adoption and subscription profile','OPTIONAL DETAIL 3');
text(s7,'growth-assumption',n(growth*100)+'% existing-user growth in Year 1; 5% annual growth for all cohorts thereafter',48,215,1184,50,25);
const forecast=[['','Year 1','Year 2','Year 3','Year 4','Year 5'],...[[28,'Existing incl. growth'],[29,'Survey'],[30,'Other'],[32,'Paid users'],[33,'AED/user/year'],[39,'Subscription AED m']].map(([r,l])=>[l,...'DEFGH'.split('').map(c=>r===39?m(cell('Potential',c+r)):n(cell('Potential',c+r)))])];
table(s7,forecast,{y:283,height:293,widths:[324,172,172,172,172,172],total:false});
foot(s7,'Five-year subscription: AED '+m(cell('Potential','I39'))+'m. Support, onboarding and optional modules are separate.\nThe AED 1,180 rate remains locked even when forecast users exceed 12,000.');
notes(s7,['Potential!D26:I41; Setup!E67/E68.'], 'Forecast users are rounded separately by cohort each year; total users are 10,000, 10,500, 11,025, 11,576 and 12,155. Each is assumed billable for the full year. Paid users never fall below the initial commitment. This is an illustration, not a funded rollout schedule or an observed user total.');

// 8. Editable native chart, monetary opportunity distinguished from observed spending.
const s8=await slide('Five-year subscription economics','OPTIONAL DETAIL 4');
const totalPaidUserYears='DEFGH'.split('').reduce((sum,c)=>sum+cell('Potential',c+'32'),0);
const averagePriceBenchmark=totalPaidUserYears*avg;
const averagePriceSaving=averagePriceBenchmark-cell('Potential','I39');
const chart=s8.charts.add('bar',{position:{left:48,top:244,width:716,height:328},categories:['Mixed benchmark','Weighted average','Central'],series:[{name:'AED million',values:[Number(m(cell('Potential','I38'))),Number(m(averagePriceBenchmark)),Number(m(cell('Potential','I39')))],valuesFormatCode:'0.00',fill:COLORS.darkBlue,points:[{idx:1,fill:COLORS.neutral500},{idx:2,fill:COLORS.purple}]}],barOptions:{direction:'bar',grouping:'clustered',gapWidth:65},hasLegend:false,xAxis:{min:0,visible:true,numberFormatCode:'0',textStyle:{fontSize:22,typeface:'Mulish'},majorGridlines:null},yAxis:{textStyle:{fontSize:22,typeface:'Mulish'},majorGridlines:null},dataLabels:{showValue:true,position:'outEnd',textStyle:{fontSize:25,typeface:'Mulish',bold:true}},title:'Five-year subscription cost (AED m)',titleTextStyle:{fontSize:24,typeface:'Mulish',bold:true}});applyPresentationChartFont(chart,{fontFamily:'Mulish'});
text(s8,'modeled-benefit','AED '+m(cell('Potential','I40'))+'m',816,244,416,72,48,'hero',COLORS.purple);
text(s8,'modeled-label','saving vs. mixed benchmark',816,329,416,62,25,'bodyBold',COLORS.darkBlue);
text(s8,'average-benefit','AED '+m(averagePriceSaving)+'m',816,425,416,72,48,'hero',COLORS.purple);
text(s8,'average-label','saving vs. weighted average\n'+n(discount,2)+'% reduction',816,510,416,72,25,'bodyBold',COLORS.darkBlue);
text(s8,'qualification','Mixed: existing at current prices; Survey / Other at AED 2,950 list price.\nWeighted average: AED '+n(avg,2)+' applied to all forecast paid users.\nBoth are modeled subscription comparisons. Support and other charges are separate.',48,599,1184,86,22,'body',COLORS.neutral700);
notes(s8,['Potential!D32:H32/I35:I41; Summary!H13; Existing customers!D16/G16.'], 'Mixed benchmark AED '+n(cell('Potential','I38'),2)+' less central subscription AED '+n(cell('Potential','I39'),2)+' gives modeled subscription benefit AED '+n(cell('Potential','I40'),2)+'. Mixed benchmark uses supplied current prices for existing-customer users and AED 2,950 list price for Survey/Other users. The additional benchmark applies the unrounded current weighted price ('+avg+' AED/user/year = AED 1,929,169.75 divided by 1,310 users) to the same '+n(totalPaidUserYears)+' paid user-years across Years 1–5. That benchmark totals AED '+n(averagePriceBenchmark,2)+' and produces AED '+n(averagePriceSaving,2)+' in modeled subscription savings ('+n(discount,2)+'%). This extrapolates the existing customer price mix to all forecast users and is not observed government spending. Both scenarios have no benchmark price escalation. These are alternative comparisons, not additive savings or complete project ROI. Support, onboarding and optional-module costs are excluded. Chart values are editable snapshots rounded to AED millions, not live external links.');

// 9. Commercial detail, the support threshold remains explicit.
const s9=await slide('Additional commercial value and charges','OPTIONAL DETAIL 5');
table(s9,[['Item','Commercial proposition','Treatment'],['Enterprise package','Most agreed feature add-ons included','~AED 20K/entity/year indicative value'],['Support above 10K','12.5% versus 25% standard rate','50% lower rate on the same fee base'],['New-entity onboarding','AED 20,000 once per new entity','Existing entities exempt'],['Specialist modules','KYC, DESC eSeal Certificates,\nCollaboration & DMS, AI Services','Purchased separately']],{y:248,height:324,widths:[265,474,445],size:23});
foot(s9,'These additional benefits are outside the subscription-savings total.\n12.5% support applies strictly above 10K; the exact 10K model uses 14%.');
notes(s9,['goal.md, additional commercial benefits and user-confirmed terms; Setup!E17.'], 'The indicative AED 20,000/entity/year add-on value depends on requirements and included-feature scope. Do not multiply it across 92 entities as guaranteed realized savings. The support proposition is 12.5% above 10K versus standard 25%; this halves the rate on the same fee base, not a separately modeled government-wide saving. Latest commercial support wording differs from higher-volume rates in the unchanged workbook; do not extend either assumption silently.');

// 10. Scale context, not an additional cohort or automatic growth discount.
const s10=await slide('Scale beyond the initial 10K commitment','OPTIONAL DETAIL 6',true);
text(s10,'population','76,000',48,268,430,90,64,'hero','#FFFFFF');
text(s10,'population-label','employees in the planning population',48,370,470,86,26,'body','#FFFFFF');
text(s10,'share','20%',568,268,330,90,64,'hero','#FFFFFF');
text(s10,'share-label','assumed potential adoption',568,370,330,86,26,'body','#FFFFFF');
text(s10,'potential',n(cell('Potential','E45')),953,268,279,90,52,'hero','#FFFFFF');
text(s10,'potential-label','potential users',953,370,279,86,26,'body','#FFFFFF');
text(s10,'scale-price','Separate full-scale illustration: AED '+n(cell('Potential','E47'),2)+'/user/year',48,517,1184,54,30,'bodyBold','#FFFFFF');
foot(s10,'Estimated planning potential, not committed demand or an additional cohort.\nAt 15,200 users: AED 15.694m annual subscription. Support is separate.',true);
notes(s10,['Setup!E10/E11; Potential!E45:E53.'], 'Population and 20% adoption are user-supplied planning assumptions. The potential includes existing and survey users, rather than adding to them. AED 1,032.50 is the separately selected Tier 7 full-potential illustration. It does not automatically replace the locked AED 1,180 price in the five-year 10K scenario. Do not attach a support cost to this full-scale illustration without reconciling the new commercial support proposition.');

for(let i=0;i<pres.slides.items.length;i++){
 const s=pres.slides.items[i];const png=await pres.export({slide:s,format:'png',scale:1});await fs.writeFile(path.join(staging,'slide-'+(i+1)+'.png'),new Uint8Array(await png.arrayBuffer()));
 const layout=await s.export({format:'layout'});await fs.writeFile(path.join(staging,'slide-'+(i+1)+'.layout.json'),await layout.text());
}
const candidate=path.join(staging,'candidate.pptx');await(await PresentationFile.exportPptx(pres)).save(candidate);
await finalizePresentation({workspaceDir:root,candidatePath:candidate,finalPath:output,
 pythonExecutable:'/Users/josefneumann/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',
 integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),
 layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),
 layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit',...[5,6,7,9].flatMap(n=>['--require-native-table-slide',String(n)])],
 explicitTotalSlideCount:10,requiredNativeTableOwnerSlides:[5,6,7,9],requiredNativeChartOwnerSlides:[8],materializeLiteralChartWorkbooks:true,
 fontPolicy:{basis:'design',families:['Spartan','Mulish']},verifyArtifactToolImport:true,receiptPath:process.env.DDA_DECK_RECEIPT||path.join(staging,'validation.json')});
console.log(output);
