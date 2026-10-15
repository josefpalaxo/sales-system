import fs from 'node:fs/promises';
import path from 'node:path';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';
const root=path.resolve(import.meta.dirname,'..'), out=path.join(root,'outputs/dda-business-case');
const src=JSON.parse(await fs.readFile(path.join(root,'build/source-data.json'),'utf8'));
const wb=Workbook.create();
const names=['Executive','Assumptions','Cost model','Customers','Demand','Entity scope','Research','Checks'];
const sheets=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
const C={navy:'#1D0090',purple:'#7000FF',ink:'#243247',muted:'#667085',pale:'#F5EDFF',blue:'#0000FF',green:'#008000',amber:'#FFF1CC'};
const N='#,##0;(#,##0);"–"',M='#,##0.00;(#,##0.00);"–"',P='0.0%;(0.0%);"–"';
function val(s,a,v){s.getRange(a).values=[[v]];if(typeof v==='number')s.getRange(a).format.font.color=C.blue;}
function f(s,a,v){s.getRange(a).formulas=[[v]];s.getRange(a).format.font.color=v.includes('!')?C.green:'#000000';}
function row(s,r,v,c=2){s.getRangeByIndexes(r-1,c,1,v.length).values=[v];}
function header(s,r,v,c=2){row(s,r,v,c);s.getRangeByIndexes(r-1,c,1,v.length).format={fill:C.navy,font:{color:'#FFFFFF',bold:true},rowHeight:30,wrapText:true,horizontalAlignment:'center'};}
function band(s,r,t,end='K'){val(s,`C${r}`,t);s.getRange(`C${r}:${end}${r}`).format={fill:C.pale,font:{bold:true,color:C.navy},rowHeight:25};}
function note(s,r,text){val(s,`C${r}`,text);s.getRange(`C${r}`).format.font={size:10,color:C.muted};}
function init(s,title,lastRow=80,lastCol='N'){
 s.showGridLines=false;s.getRange(`A1:${lastCol}${lastRow}`).format={font:{name:'Arial',size:11,color:C.ink},rowHeight:24,verticalAlignment:'center'};
 s.getRange(`A1:B${lastRow}`).format.columnWidth=3;s.getRange(`C1:C${lastRow}`).format.columnWidth=46;
 s.getRange(`D1:D${lastRow}`).format.columnWidth=13;s.getRange(`E1:K${lastRow}`).format.columnWidth=18;
 s.getRange(`L1:L${lastRow}`).format.columnWidth=3;s.getRange(`M1:M${lastRow}`).format.columnWidth=100;
 s.getRange(`E1:K${lastRow}`).setNumberFormat(N);
 val(s,'C2',title);s.getRange('C2').format.font={size:16,bold:true,color:C.navy};s.getRange(`C3:K3`).format.borders={bottom:{style:'thin',color:C.purple}};
 val(s,'C4','Case selected');if(s.name!=='Assumptions')f(s,'E4',"='Assumptions'!E5");
 s.getRange('E4:F4').format.font={bold:true,color:C.green};
 if(s.name!=='Executive')s.freezePanes.freezeRows(7);
}
for(const n of names)init(sheets[n],{'Executive':'DDA central procurement business case','Assumptions':'Commercial terms and planning assumptions','Cost model':'Five year costs and comparative returns','Customers':'Existing customers and proposed subscription','Demand':'Demand evidence and adoption analysis','Entity scope':'Potential entity intake and scope review','Research':'External research and evidence limits','Checks':'Model checks and unresolved inputs'}[n],n==='Entity scope'?110:n==='Demand'?110:n==='Assumptions'?90:90);
sheets.Executive.tabColor=C.navy;sheets.Assumptions.tabColor=C.purple;
const a=sheets.Assumptions;
val(a,'E4',1);a.getRange('E4').format.fill=C.amber;
a.dataValidations.add({range:'E4',rule:{type:'whole',operator:'between',formula1:1,formula2:3}});
f(a,'E5','=CHOOSE(E4,"Base","Slower adoption","Earlier growth")');
val(a,'G4','1 Base   2 Slower adoption   3 Earlier growth');
note(a,6,'Blue numbers are editable. Amber cells are planning assumptions. Green formulas link sheets. Amounts are AED before tax.');
header(a,7,['Commercial input','Unit','Value']);
const terms=[
 [8,'Regular Basic Price','AED/user/year',2950,'S01. Reference only.'],
 [9,'DDA Shared Service baseline','AED/user/year',2360,'S06. Main comparison baseline, not actual current spending.'],
 [10,'Central subscription','AED/user/year',1180,'S08. Offer for initial 10,000 annual commitment.'],
 [11,'Hosted standard support','% of subscription',.10,'S08/S09. Same percentage in both comparisons. 8×5 support.'],
 [12,'On-premise support','% of subscription',.20,'S10. Replaces 10% and old support charges.'],
 [13,'Onboarding per new entity','AED once',18000,'S08. New entities only. Existing customer migration excluded.'],
 [14,'Initial annual commitment','Users',10000,'S07. Includes existing customers and RTA.'],
 [15,'Contract duration','Years',5,'S07. Annual billing with five-year commitment.'],
 [16,'Central annual indexation','%',0,'S07. No indexation for five years.'],
 [17,'Baseline annual escalation','%',0,'Planning assumption. No contractual increase supplied. Headline uses zero.'],
 [18,'Illustrative escalation sensitivity','%',.03,'Hypothetical 3% alternative. Extra avoided escalation shown separately.'],
 [19,'Existing on-premise users','Users',null,'S03. Sum of four project user counts. Assumed retained on-premise from Year 1.'],
 [20,'Existing users included','Users',null,'S03/S07. Project users, not verified unique active people.'],
 [21,'Unit reference denominator','Employees',76000,'R01. Lower reference point for reported over 76,000 Smart Employee users in May 2025.'],
 [22,'Growth-seat price assumption','AED/user/year',1180,'Planning assumption. Extension of price lock to added seats needs confirmation.'],
 [23,'Baseline onboarding allowance','AED/new entity',0,'Comparison convention only. Unpriced baseline implementation is excluded.'],
];
for(const[r,l,u,v,n]of terms){row(a,r,[l,u,v]);if(v!==null)a.getRange(`E${r}`).format.font.color=C.blue;val(a,`M${r}`,n);}
f(a,'E19',"=SUMIF('Customers'!$E$8:$E$16,\"On-Premise\",'Customers'!$F$8:$F$16)");f(a,'E20',"=SUM('Customers'!F8:F16)");
for(const r of[11,12,16,17,18])a.getRange(`E${r}`).setNumberFormat(P);
a.getRange('E17:E18').format.fill=C.amber;a.getRange('E22:E23').format.fill=C.amber;
header(a,25,['Planning driver','Unit','Year 1','Year 2','Year 3','Year 4','Year 5']);
const groups=[
 {r:26,l:'Cumulative purchased-seat growth',u:'%',cases:[[0,.0625,.125,.1875,.25],[0,.0625,.125,.1875,.25],[0,.125,.25,.25,.25]],note:'25% cumulative agreed. Linear timing to Year 5 is a planning assumption; earlier growth reaches Year 3.'},
 {r:32,l:'Deployed share of paid capacity',u:'%',cases:[[1,1,1,1,1],[.6,.75,.85,.95,1],[1,1,1,1,1]],note:'Illustrative adoption only. Base tests matched capacity, not a verified deployment forecast. Slow case tests underuse.'},
 {r:38,l:'New entities onboarded in year',u:'Entities',cases:[[10,6,8,8,8],[6,6,8,10,10],[16,12,6,3,3]],note:'Illustrative schedule, 40 new entities in total. Survey 10 current / 6 future interest does not establish this schedule.'},
 {r:44,l:'Legacy overlap charged in year',u:'Fraction',cases:[[0,0,0,0,0],[.25,0,0,0,0],[0,0,0,0,0]],note:'Zero assumes migration at Year 1 start. Slow case includes one quarter of known reported annual charges. No refund assumed.'},
 {r:50,l:'Additional scenario costs included',u:'AED',cases:[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],note:'Zero means no extra allowance included, not that unknown services are free. Enter agreed migration, integration or operating costs.'}
];
for(const g of groups){row(a,g.r,[g.l,g.u]);val(a,`M${g.r}`,g.note);a.getRange(`C${g.r}:I${g.r}`).format.fill=C.pale;
 g.cases.forEach((vs,j)=>{row(a,g.r+j+1,[['Base','Slower adoption','Earlier growth'][j],g.u,...vs]);a.getRange(`E${g.r+j+1}:I${g.r+j+1}`).format={fill:C.amber,font:{color:C.blue}};});
 for(const c of ['E','F','G','H','I'])f(a,`${c}${g.r}`,`=IF(ISNUMBER(CHOOSE($E$4,${c}${g.r+1},${c}${g.r+2},${c}${g.r+3})),CHOOSE($E$4,${c}${g.r+1},${c}${g.r+2},${c}${g.r+3}),NA())`);
 if(g.u==='%'||g.u==='Fraction')a.getRange(`E${g.r}:I${g.r+3}`).setNumberFormat(P);
}
band(a,56,'Offer scope and unpriced items');
const scope=[['Included','Digital Sovereign Sign, unlimited manual transactions, unlimited external recipients, hosting and branding.'],['Separately purchased','Automated/API transactions, Sovereign Collaboration, AI services, Evidence based Archiving for Standalone Documents and files.'],['Unpriced and excluded','Tax, additional migration/integration/training and internal operation costs unless entered in the additional allowance.'],['Terms to confirm','Growth-seat price protection, migration dates, prepaid credits, baseline scope equivalence and tax treatment.'],['ROI convention','Five-year net comparative benefit ÷ central modeled program cost. This is a procurement return, not project IRR or productivity ROI.'],['Savings definition','Like-for-like baseline cost less central subscription, support, new-entity onboarding, modeled overlap and included allowances.']];
scope.forEach(([l,t],j)=>{val(a,`C${57+j}`,l);val(a,`E${57+j}`,t);});
band(a,65,'Supplied tier schedule for reference');header(a,66,['Supplied pricing band','Unit','AED per user/year']);
[['100–499',2213],['500–999',2065],['1,000–1,999',1770],['2,000–2,999',1475],['3,000+',1180]].forEach(([l,v],i)=>row(a,67+i,[l,'AED/user/year',v]));
val(a,'M66','S01. General tier eligibility for independent purchasing remains open. Central model uses the explicit 10,000-user offer.');

const customers=[
 [8,'Digital Dubai Authority','On-Premise',50,'Unlimited',163201.60,63397,'Subscription'],
 [8,'Digital Dubai Authority','Shared Service',100,'Unlimited',293444.33,75000,'Subscription'],
 [17,'Dubai Corporation for Ambulances Services','SaaS',275,10000,147268.13,null,'Subscription'],
 [19,'Dubai Culture & Arts Authority','SaaS',25,'Unlimited',110988.75,null,'Subscription'],
 [24,'Dubai Electronic Security Center','On-Premise',60,'Unlimited',234635.43,null,'Subscription'],
 [57,'Investment Corporation of Dubai','On-Premise',150,'Unlimited',177108,null,'Subscription'],
 [70,'Ports, Customs and Free Zone Corporation (PCFC)','SaaS',20,'Unlimited',116564.92,null,'Subscription'],
 [74,'Roads and Transport Authority (RTA)','On-Premise',1000,'Unlimited',null,608000,'CAPEX'],
 [91,'Dubai Healthcare City Authority','SaaS',150,5000,57627.50,null,'Subscription']
];
const cu=sheets.Customers;cu.getRange('C1:C40').format.columnWidth=8;cu.getRange('D1:D40').format.columnWidth=51;
cu.getRange('L1:L40').format.columnWidth=14;
cu.getRange('E1:E40').format.columnWidth=19;cu.getRange('M1:M40').format.columnWidth=20;cu.getRange('N1:O40').format.columnWidth=22;
note(cu,6,'S03 user-supplied customer records. Blanks remain unspecified. Reported amounts assumed AED and additive for this comparison.');
header(cu,7,['Source #','Customer','Deployment','Users','Transactions','Annual subscription','Annual support','Current licence','Known charges','Support rate','Central annual cost','Difference vs known']);
customers.forEach((v,i)=>{const r=i+8;row(cu,r,v);f(cu,`K${r}`,`=SUM(H${r}:I${r})`);f(cu,`L${r}`,`=IF(E${r}="On-Premise",'Assumptions'!$E$12,'Assumptions'!$E$11)`);f(cu,`M${r}`,`=F${r}*'Assumptions'!$E$10*(1+L${r})`);f(cu,`N${r}`,`=M${r}-K${r}`);});
val(cu,'D18','Total reported project users / charges');for(const c of['F','H','I','K','M','N'])f(cu,`${c}18`,`=SUM(${c}8:${c}16)`);
cu.getRange('H8:K18').setNumberFormat(M);cu.getRange('M8:N18').setNumberFormat(M);cu.getRange('L8:L16').setNumberFormat(P);cu.getRange('C8:J16').format.font.color=C.blue;
cu.getRange('D8:D16').format.wrapText=true;cu.getRange('C8:N16').format.rowHeight=43;cu.getRange('C18:N18').format.fill=C.pale;
note(cu,21,'Positive difference means a higher central charge than the reported known amount. Missing support limits the comparison.');
note(cu,23,'RTA converts from CAPEX to subscription: AED 1,416,000 annual central cost versus AED 608,000 reported support.');
note(cu,24,'The conditional AED 808,000 increase is included here. Historic CAPEX is not a recurring saving.');
note(cu,26,'All four SaaS customers qualify for charge cessation upon migration. DDA Shared Service charges also cease.');
note(cu,27,'On-premise support becomes 20% of allocated subscription and replaces old support. Deployment still benefits from the lower user price.');
note(cu,29,'Nine projects represent eight customer entities. Current charges are not the DDA benchmark for an expanded 10,000-user service.');

const m=sheets['Cost model'];header(m,7,['Cost or driver','Unit','Year 1','Year 2','Year 3','Year 4','Year 5',null,'Five years']);
const labels={8:['Paid central capacity','Users'],9:['On-premise users','Users'],10:['Hosted paid capacity','Users'],11:['Deployed users assumed','Users'],12:['Unused paid seats','Users'],13:['New entities onboarded','Entities'],15:['Baseline subscription unit rate','AED/user'],16:['Initial central unit rate','AED/user'],17:['Added-seat unit rate','AED/user'],19:['Baseline subscription','AED'],20:['Baseline hosted support','AED'],21:['Baseline on-premise support','AED'],22:['Baseline onboarding allowance','AED'],23:['Matched baseline total','AED'],25:['Central subscription','AED'],26:['Central hosted support','AED'],27:['Central on-premise support','AED'],28:['Central recurring cost','AED'],29:['New-entity onboarding','AED'],30:['Legacy overlap allowance','AED'],31:['Other included scenario costs','AED'],32:['Central modeled program cost','AED'],34:['Net comparative benefit','AED'],35:['Cumulative comparative benefit','AED'],36:['Net saving as % of baseline','%'],37:['Procurement ROI on central cost','%'],39:['Baseline for deployed users only','AED'],40:['Benefit vs deployed-user baseline','AED'],41:['Unused subscription and support','AED'],42:['Break-even deployed users','Users'],44:['Flat baseline recurring cost','AED'],45:['Illustrative escalated baseline','AED'],46:['Extra avoided escalation','AED'],47:['Benefit with illustrative escalation','AED'],49:['Initial unallocated seats','Users'],50:['Discount vs DDA baseline','%'],51:['Discount vs Regular Basic Price','%'],52:['Onboarding cost cumulative','AED']};
for(const[r,[l,u]]of Object.entries(labels))row(m,+r,[l,u]);
for(const[r,l]of[[14,'Unit rates'],[18,'Matched independent purchase baseline'],[24,'Central program'],[33,'Five-year value'],[38,'Adoption exposure'],[43,'Separate price-lock sensitivity'],[48,'Allocation and reference discounts']])band(m,r,l);
for(const[c,i]of ['E','F','G','H','I'].map((c,i)=>[c,i])){
 const prev=String.fromCharCode(c.charCodeAt(0)-1);
 const formulas={
 8:`ROUND('Assumptions'!$E$14*(1+'Assumptions'!${c}26),0)`,9:"'Assumptions'!$E$19",10:`${c}8-${c}9`,11:`ROUND(${c}8*'Assumptions'!${c}32,0)`,12:`${c}8-${c}11`,13:`'Assumptions'!${c}38`,
 15:`'Assumptions'!$E$9*(1+'Assumptions'!$E$17)^${i}`,16:`'Assumptions'!$E$10*(1+'Assumptions'!$E$16)^${i}`,17:"'Assumptions'!$E$22",
 19:`${c}8*${c}15`,20:`${c}10*${c}15*'Assumptions'!$E$11`,21:`${c}9*${c}15*'Assumptions'!$E$12`,22:`${c}13*'Assumptions'!$E$23`,23:`SUM(${c}19:${c}22)`,
 25:`'Assumptions'!$E$14*${c}16+(${c}8-'Assumptions'!$E$14)*${c}17`,26:`(('Assumptions'!$E$14-${c}9)*${c}16+(${c}8-'Assumptions'!$E$14)*${c}17)*'Assumptions'!$E$11`,27:`${c}9*${c}16*'Assumptions'!$E$12`,28:`SUM(${c}25:${c}27)`,29:`${c}13*'Assumptions'!$E$13`,30:`'Customers'!$K$18*'Assumptions'!${c}44`,31:`'Assumptions'!${c}50`,32:`SUM(${c}28:${c}31)`,
 34:`${c}23-${c}32`,35:i?`${prev}35+${c}34`:`${c}34`,36:`${c}34/${c}23`,37:`${c}34/${c}32`,
 39:`${c}9*${c}15*(1+'Assumptions'!$E$12)+(${c}11-${c}9)*${c}15*(1+'Assumptions'!$E$11)+${c}22`,40:`${c}39-${c}32`,41:`${c}12*${c}16*(1+'Assumptions'!$E$11)`,42:`ROUNDUP((${c}32-${c}22-${c}9*${c}15*('Assumptions'!$E$12-'Assumptions'!$E$11))/(${c}15*(1+'Assumptions'!$E$11)),0)`,
 44:`${c}8*'Assumptions'!$E$9+${c}10*'Assumptions'!$E$9*'Assumptions'!$E$11+${c}9*'Assumptions'!$E$9*'Assumptions'!$E$12`,45:`${c}44*(1+'Assumptions'!$E$18)^${i}`,46:`${c}45-${c}44`,47:`${c}45+${c}22-${c}32`,49:"'Assumptions'!$E$14-'Assumptions'!$E$20",50:"1-'Assumptions'!$E$10/'Assumptions'!$E$9",51:"1-'Assumptions'!$E$10/'Assumptions'!$E$8",52:i?`${prev}52+${c}29`:`${c}29`};
 for(const[r,x]of Object.entries(formulas))f(m,`${c}${r}`,`=${x}`);
}
for(const r of[8,9,10,11,12,13,19,20,21,22,23,25,26,27,28,29,30,31,32,34,39,40,41,44,45,46,47])f(m,`K${r}`,`=SUM(E${r}:I${r})`);
for(const r of[35,52])f(m,`K${r}`,`=I${r}`);
f(m,'K36','=K34/K23');f(m,'K37','=K34/K32');
for(const r of[36,37,50,51])m.getRange(`E${r}:K${r}`).setNumberFormat(P);
for(const r of[23,28,32,34,35])m.getRange(`C${r}:K${r}`).format={font:{bold:true},borders:{top:{style:'thin',color:C.muted}}};
val(m,'M8','Five-year quantities are user-years, not distinct people. Added seats assumed hosted.');
val(m,'M11','Assumed full-year deployment. Existing on-premise allocation remains in all cases.');
val(m,'M23','Comparable capacity at the agreed baseline. Does not represent current actual government spending.');
val(m,'M32','Modeled costs only. Unpriced services and tax excluded. Legacy allowance uses incomplete historical charges.');
val(m,'M37','Net comparative benefit / central modeled program cost, undiscounted. Definition proposed for review.');
val(m,'M39','Demand-adjusted benchmark still uses AED 2,360. It is not a reconstruction of actual customer contracts.');
val(m,'M41','Unused seats valued at the initial central hosted rate. Added-seat rate differences are excluded from this exposure measure.');
val(m,'M42','Minimum deployed users including retained on-premise users, at matched baseline rates and modeled costs.');
val(m,'M46','Hypothetical avoided baseline escalation. Already included in row 47. Never add twice.');
row(m,54,['Initial pool recurring commitment','AED']);row(m,55,['Growth recurring budget','AED']);
for(const c of ['E','F','G','H','I']){
 f(m,`${c}54`,`='Assumptions'!$E$14*${c}16+('Assumptions'!$E$14-${c}9)*${c}16*'Assumptions'!$E$11+${c}9*${c}16*'Assumptions'!$E$12`);
 f(m,`${c}55`,`=${c}28-${c}54`);
}
f(m,'K54','=SUM(E54:I54)');f(m,'K55','=SUM(E55:I55)');
val(m,'M54','Initial 10,000-seat subscription and support at the retained deployment mix. Excludes growth, onboarding and unpriced services.');
note(m,57,'Annual cash timing within each year and tax are not modeled. No discounted NPV, IRR or productivity savings are claimed.');

const d=sheets.Demand;
header(d,7,['Demand evidence','Unit','Value']);
const dm=[['Existing reported project users','Users',"='Assumptions'!E20"],['Initial central commitment','Users',"='Assumptions'!E14"],['Initial seats awaiting allocation','Users','=E9-E8'],['Numerical survey minimum','Users','=6*1+4*51+7*101+4*1001'],['Q3 numerical responses','Responses',21],['Q3 other response','Responses',1],['Growth expected','Share','=17/22'],['Interest with current requirement','Entities',10],['Interest with future requirement','Entities',6],['Initial pool / workforce reference','Share',"=E9/'Assumptions'!E21"],['Source population rows','Rows',src.entities.length]];
dm.forEach(([l,u,v],i)=>{row(d,8+i,[l,u]);typeof v==='string'?f(d,`E${i+8}`,v):val(d,`E${i+8}`,v);});
d.getRange('E14').setNumberFormat(P);d.getRange('E17').setNumberFormat(P);
val(d,'M11','Q3 minimum is current/expected demand across 21 numerical answers. Unknown overlap prevents adding existing users.');
val(d,'M14','17 of 22 expect moderate or significant growth. Survey does not establish 25% growth or its timing.');
val(d,'M17','R01 reports over 76,000 Smart Employee users. Workforce scale is not paid-signature demand.');
val(d,'M18','92 source-name rows, 91 numbered. Duplicates and aliases prevent asserting 92 unique eligible entities.');
band(d,21,'Survey user-band sensitivity');header(d,22,['Q3 band','Responses','Lower endpoint','Midpoint / assumption','Minimum users','Scenario users']);
const bands=[['1–50',6,1,25.5],['51–100',4,51,75.5],['101–500',7,101,300.5],['More than 1,000',4,1001,2000],['Other',1,null,null]];
bands.forEach((v,i)=>{const r=23+i;row(d,r,v);if(i<4){f(d,`G${r}`,`=D${r}*E${r}`);f(d,`H${r}`,`=D${r}*F${r}`);}});
val(d,'C28','Numerical responses total');f(d,'G28','=SUM(G23:G26)');f(d,'H28','=SUM(H23:H26)');d.getRange('F23:F26').format.fill=C.amber;d.getRange('F23:F26').format.font.color=C.blue;
val(d,'M22','S04 Q3. Midpoints and 2,000 users for the open band are sensitivity assumptions, not observed averages.');
note(d,30,'The 10,558.5-user midpoint illustration excludes the unknown answer. Do not round it into confirmed demand.');
band(d,33,'DDA internal survey supplied responses');
header(d,34,['Question','Response','Responses','Supplied percentage']);
d.getRange('C34:C85').format.columnWidth=46;d.getRange('D34:D85').format.columnWidth=47;d.getRange('F35:F85').setNumberFormat(P);
src.survey.forEach((v,i)=>row(d,35+i,[v.question,v.response,v.count,v.percent]));
d.getRange('F35:F81').setNumberFormat('0.00%');
d.getRange('F23:F26').setNumberFormat('#,##0.0');d.getRange('H23:H28').setNumberFormat('#,##0.0');
const surveyRow=(question,response)=>35+src.survey.findIndex(v=>v.question.startsWith(question+'.')&&v.response===response);
for(const [i,response] of ['1–50 users','51–100 users','101–500 users','More than 1,000 users','Other'].entries())f(d,`D${23+i}`,`=E${surveyRow('Q3',response)}`);
f(d,'E11','=G28');f(d,'E12','=SUM(D23:D26)');f(d,'E13','=D27');
f(d,'E14',`=(E${surveyRow('Q5','Yes – moderate increase expected')}+E${surveyRow('Q5','Yes – significant increase expected')})/E${surveyRow('Q5','Total')}`);
f(d,'E15',`=E${surveyRow('Q7','Yes – we have a current requirement')}`);f(d,'E16',`=E${surveyRow('Q7','Yes – may need it in the future')}`);
d.getRange('C35:D81').format.wrapText=true;d.getRange('C35:F81').format.rowHeight=55;
val(d,'M34','S04: user-supplied DDA internal survey. Date, invitation count and respondent mapping not supplied.');
val(d,'M35','Q1/Q8 N=38; Q2–Q5 N=22; Q7 N=16. Preserve separate populations.');
val(d,'M36','Q6 inferred denominator 17, multiple selections. 42 selections are not 42 entities.');
val(d,'M37','Q2a breaks down the nine Other responses. No extra respondents.');
val(d,'M38','Missing user/cost bands are not zero. Annual cost bands mix current and expected spending.');

const en=sheets['Entity scope'];en.getRange('C1:D105').format.columnWidth=10;en.getRange('E1:E105').format.columnWidth=58;en.getRange('F1:F105').format.columnWidth=47;en.getRange('G1:H105').format.columnWidth=18;en.getRange('I1:I105').format.columnWidth=74;
note(en,6,'S02: dda departments columns A:B only. Other workbook tabs and columns supply no facts to this model.');
header(en,7,['Excel row','Source #','Source company name','Workforce evidence','Existing users','Proposed new seats','Scope / research note']);
src.entities.forEach((v,i)=>row(en,i+8,[v.row,v.number,v.name,v.workforce,v.existing,null,v.note]));
en.getRange('C8:I99').format.rowHeight=50;en.getRange('E8:F99').format.wrapText=true;en.getRange('I8:I99').format.wrapText=true;en.getRange('H8:H99').format.fill=C.amber;en.getRange('H8:H99').format.font.color=C.blue;
en.dataValidations.add({range:'H8:H99',rule:{type:'whole',operator:'greaterThanOrEqual',formula1:0}});
note(en,102,'New allocations are blank pending entity mapping. Enter each distinct demand group once, after resolving aliases and eligibility.');
note(en,103,'This intake does not drive purchased capacity. Procurement commitment and evidence-backed allocation remain separate.');
const re=sheets.Research;re.getRange('C1:C40').format.columnWidth=9;re.getRange('D1:D40').format.columnWidth=58;re.getRange('E1:E40').format.columnWidth=65;re.getRange('F1:F40').format.columnWidth=80;
note(re,6,'External research as recorded on 20 September 2026. Scope and evidence limits remain attached to each source.');
header(re,7,['Source','Finding','Evidence limits','Primary URL']);
src.research.forEach((v,i)=>row(re,i+8,[v.id,v.finding,v.limits,v.url]));re.getRange('D8:F25').format.wrapText=true;re.getRange('C8:F25').format.rowHeight=96;
note(re,28,'Workforce references are context only. No workforce percentage from 91 Entities Model enters the central demand forecast.');

const e=sheets.Executive;e.getRange('C1:C70').format.columnWidth=44;e.getRange('D1:D70').format.columnWidth=3;e.getRange('E1:G70').format.columnWidth=21;e.getRange('H1:H70').format.columnWidth=3;e.getRange('I1:Q70').format.columnWidth=12;
note(e,6,'Five-year comparison at matched capacity. Base growth and rollout are planning assumptions. AED, before tax and unpriced services.');
header(e,8,['Decision metric',null,'Value']);
const kpis=[['Initial annual commitment',"='Cost model'!E8",N],['Year 5 paid capacity',"='Cost model'!I8",N],['Reduction vs DDA baseline',"='Cost model'!E50",P],['Reference discount vs list',"='Cost model'!E51",P],['Year 1 central modeled cost',"='Cost model'!E32",N],['Five-year central modeled cost',"='Cost model'!K32",N],['Five-year net comparative benefit',"='Cost model'!K34",N],['Five-year procurement ROI',"='Cost model'!K37",P],['Initial seats awaiting allocation',"='Demand'!E10",N]];
kpis.forEach(([l,x,n],i)=>{val(e,`C${i+9}`,l);f(e,`E${i+9}`,x);e.getRange(`E${i+9}`).setNumberFormat(n);});
val(e,'C18','Initial pool five-year recurring cost');f(e,'E18',"='Cost model'!K54");
header(e,20,['Annual costs and benefit',null,'Baseline','Central','Net benefit']);
for(let i=0;i<5;i++){val(e,`C${21+i}`,`Year ${i+1}`);const c='EFGHI'[i];f(e,`E${21+i}`,`='Cost model'!${c}23`);f(e,`F${21+i}`,`='Cost model'!${c}32`);f(e,`G${21+i}`,`='Cost model'!${c}34`);}
val(e,'C26','Five years');for(const[c,r]of[['E',23],['F',32],['G',34]])f(e,`${c}26`,`='Cost model'!K${r}`);
e.getRange('C26:G26').format={fill:C.pale,font:{bold:true}};
header(e,29,['Adoption and price protection',null,'Value']);
const extras=[['Year 1 break-even deployed users',"='Cost model'!E42",N],['Year 1 deployed users assumed',"='Cost model'!E11",N],['Five-year demand-adjusted benefit',"='Cost model'!K40",N],['Five-year extra escalation avoided',"='Cost model'!K46",N],['Escalation sensitivity assumption',"='Assumptions'!E18",P]];
extras.forEach(([l,x,n],i)=>{val(e,`C${30+i}`,l);f(e,`E${30+i}`,x);e.getRange(`E${30+i}`).setNumberFormat(n);});
note(e,37,'The 50% saving compares identical capacity and support treatment. It does not claim that entities currently spend the baseline total.');
note(e,39,'Base assumption: 10,000 to 12,500 paid users by Year 5, 1,260 on-premise users retained, 40 new entities onboarded over five years.');
note(e,41,'Existing customers cover 1,830 project users. Survey demand overlaps are unknown. New entity allocations require validation.');
note(e,43,'No indexation protects unit prices. Growth increases the annual bill. The 3% escalation illustration is excluded from headline savings.');
note(e,45,'Procurement ROI = five-year net comparative benefit / central modeled program cost. Unpriced services can reduce this return.');
note(e,47,'Use Assumptions E4 to select Base, Slower adoption or Earlier growth. Review the amber assumptions before budget approval.');
// Formula-backed chart ranges in a clearly labelled supporting area.
header(e,51,['Chart data','Baseline AED','Central AED','Cumulative benefit AED','Paid users','Deployed users']);
for(let i=0;i<5;i++){const r=52+i,c='EFGHI'[i];row(e,r,[`Year ${i+1}`]);[['D',23],['E',32],['F',35],['G',8],['H',11]].forEach(([dest,sr])=>f(e,`${dest}${r}`,`='Cost model'!${c}${sr}`));}
function chart(type,ranges,title,start,end,format){const ch=e.charts.add(type,ranges.map(r=>e.getRange(r)));ch.title=title;ch.setPosition(start,end);ch.titleTextStyle.fontSize=14;ch.titleTextStyle.typeface='Arial';ch.legend={position:'top',textStyle:{typeface:'Arial',fontSize:12}};ch.xAxis={axisType:'textAxis',textStyle:{typeface:'Arial',fontSize:12}};ch.yAxis={numberFormatCode:format,numberFormatSourceLinked:false,textStyle:{typeface:'Arial',fontSize:12}};ch.series.items.forEach((s,i)=>s.fill=[C.navy,C.purple][i%2]);return ch;}
chart('bar',['C51:C56','D51:D56','E51:E56'],'Annual cost comparison (AED m)','I8','Q22','0.0,,');
chart('line',['C51:C56','F51:F56'],'Cumulative comparative benefit (AED m)','I23','Q36','0.0,,').hasLegend=false;

const ck=sheets.Checks;header(ck,7,['Check','Unit','Result']);
const checks=[['Source-name rows','Rows',"=COUNTA('Entity scope'!E8:E99)"],['Existing users total','Users',"=SUM('Customers'!F8:F16)"],['Existing on-premise users','Users',"='Assumptions'!E19"],['Source rows missing new allocations','Rows',"=COUNTBLANK('Entity scope'!H8:H99)"],['Initial allocation gap after proposals','Users',"='Assumptions'!E14-SUM('Entity scope'!G8:H99)"],['Missing reported support amounts','Rows',"=COUNTBLANK('Customers'!I8:I16)"],['Central recurring cost reconciliation','AED',"='Cost model'!K28-SUM('Cost model'!E25:I27)"],['Benefit reconciliation','AED',"='Cost model'!K34-('Cost model'!K23-'Cost model'!K32)"],['Deployed users exceed paid capacity','Periods',"=COUNTIF('Cost model'!E12:I12,\"<0\")"],['New onboarding entities total','Entities',"=SUM('Cost model'!E13:I13)"],['Selected driver input errors','Cells',"=SUMPRODUCT(--ISERROR('Assumptions'!E26:I26))+SUMPRODUCT(--ISERROR('Assumptions'!E32:I32))+SUMPRODUCT(--ISERROR('Assumptions'!E38:I38))"]];
checks.forEach(([l,u,x],i)=>{row(ck,i+8,[l,u]);f(ck,`E${i+8}`,x);});
val(ck,'M8','Expected raw count 92, not unique eligible entities.');val(ck,'M9','Expected 1,830.');val(ck,'M10','Expected 1,260.');val(ck,'M12','Positive gap means more named allocation is needed. Duplicate proposals require review.');val(ck,'M13','Missing means unknown, not free or zero.');
ck.getRange('E14:E16').conditionalFormats.add('cellIs',{operator:'notEqual',formula:0,format:{fill:'#FDE9E7',font:{color:'#B42318',bold:true}}});
band(ck,23,'Review before external use');
['Map survey respondents to entities and remove overlap with current customers.','Confirm distinct eligible entities and funded user allocations for the 10,000 commitment.','Confirm added-seat price lock, migration dates, contract cessations and any credits.','Price additional services and establish tax, current-charge scope and missing support amounts.','Confirm the ROI definition, onboarding schedule and adoption assumptions with DDA.'].forEach((v,i)=>note(ck,25+i*2,v));

// Keep finite input notes readable without inflating the analytical tables.
for(const s of Object.values(sheets))s.getRange('M1:M90').format.wrapText=false;
for(const range of ['E9:E18','E21:G26','E30:E34','D52:H56'])e.getRange(range).format.font.color=C.ink;
wb.recalculate();
const tests=[];
function number(s,a){return sheets[s].getRange(a).values[0][0];}
function near(name,actual,expected){if(Math.abs(actual-expected)>.011)throw new Error(`${name}: ${actual} != ${expected}`);tests.push({name,actual,expected});}
near('Base recurring five years',number('Cost model','K28'),73755900);
near('Base onboarding',number('Cost model','K29'),720000);
near('Initial-pool commitment',number('Cost model','K54'),65643400);
near('Base net benefit',number('Cost model','K34'),73035900);
near('Customer source users',number('Customers','F18'),1830);
near('Known source charges',number('Customers','K18'),2047235.66);
near('Survey numerical lower bound',number('Demand','E11'),4921);
near('RTA conversion difference',number('Customers','N15'),808000);
const base=number('Cost model','K34');val(a,'E4',2);wb.recalculate();
near('Slow adoption Year 1 users',number('Cost model','E11'),6000);
near('Slow migration overlap',number('Cost model','E30'),511808.915);
if(number('Cost model','K40')>=number('Cost model','K34'))throw new Error('Underuse sensitivity did not change benchmark');
val(a,'I40',9);wb.recalculate();near('Later-year selected driver change',number('Cost model','I29'),162000);val(a,'I40',10);
val(a,'E4',1);val(a,'I40',null);wb.recalculate();near('Blank unselected case is isolated',number('Cost model','K34'),base);
val(a,'E4',2);wb.recalculate();if(!String(number('Assumptions','I38')).includes('#N/A'))throw new Error('Missing selected input not exposed');
val(a,'I40',10);val(a,'E4',3);wb.recalculate();near('Earlier growth Year 3 seats',number('Cost model','G8'),12500);
val(a,'E4',1);wb.recalculate();near('Restored base',number('Cost model','K34'),base);
const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:50},summary:'Final formula errors'});
await fs.writeFile(path.join(root,'build/formula-scan.ndjson'),errors.ndjson);
console.log(errors.ndjson);
console.log((await wb.inspect({kind:'table',range:"'Cost model'!E32:K37",include:'values,formulas',tableMaxRows:6,tableMaxCols:7})).ndjson);
const metrics={case:'Base',years:['Year 1','Year 2','Year 3','Year 4','Year 5'],annual:{},totals:{},tests};
for(const[r,[label,unit]]of Object.entries(labels)){metrics.annual[r]=m.getRange(`E${r}:I${r}`).values[0];metrics.totals[r]=number('Cost model',`K${r}`);}
metrics.currentKnown=number('Customers','K18');metrics.currentCentral=number('Customers','M18');metrics.roi=number('Cost model','K37');metrics.breakEven=number('Cost model','E42');
metrics.initialPoolCost=number('Cost model','K54');metrics.growthBudget=number('Cost model','K55');
await fs.writeFile(path.join(root,'build/model-results.json'),JSON.stringify(metrics,null,2));
await fs.writeFile(path.join(root,'build/model-tests.json'),JSON.stringify(tests,null,2));
await(await SpreadsheetFile.exportXlsx(wb)).save(path.join(out,'DDA-business-case-model.xlsx'));
for(const[s,range]of[['Executive','C2:Q47'],['Assumptions','C2:I53'],['Cost model','C2:K57'],['Customers','C7:N29'],['Demand','C7:H30'],['Demand','C34:F45'],['Entity scope','C7:I18'],['Research','C7:F13'],['Checks','C7:E31']]){
 const png=await wb.render({sheetName:s,range,scale:1,format:'png'});await fs.writeFile(path.join(root,`build/${s.replaceAll(' ','-')}-${range.split(':')[0]}.png`),new Uint8Array(await png.arrayBuffer()));
}
console.log(JSON.stringify({output:path.join(out,'DDA-business-case-model.xlsx'),baseNet:metrics.totals[34],baseCost:metrics.totals[32],roi:metrics.roi,breakEven:metrics.breakEven}));
