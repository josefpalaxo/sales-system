import fs from 'node:fs/promises';
import path from 'node:path';
import { Workbook, SpreadsheetFile, FileBlob } from '@oai/artifact-tool';

const root=path.resolve(import.meta.dirname,'..');
const out=path.join(root,'outputs/dda-business-case-v2');
const qa=path.join(root,'build/v2');
await fs.mkdir(out,{recursive:true});await fs.mkdir(qa,{recursive:true});
if(process.argv.includes('--fix-summary-input')){await fixSummaryInput();process.exit(0);}
const src=JSON.parse(await fs.readFile(path.join(root,'build/source-data.json'),'utf8'));
const wb=Workbook.create();
const names=['Summary','Setup','Existing customers','Survey','Potential','Respondents','Entities'];
const sh=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
const C={navy:'#1D0090',purple:'#7000FF',ink:'#243247',gray:'#667085',pale:'#F4EFFF',blue:'#0000FF',green:'#008000',amber:'#FFF1CC',red:'#B42318'};
const N='#,##0;(#,##0);"–"',M='#,##0.00;(#,##0.00);"–"',P='0.0%;(0.0%);"–"';
function v(s,a,x){s.getRange(a).values=[[x]];if(typeof x==='number')s.getRange(a).format.font.color=C.blue;}
function f(s,a,x){s.getRange(a).formulas=[[x]];s.getRange(a).format.font.color=x.includes('!')?C.green:'#000000';}
function row(s,r,values,col=2){s.getRangeByIndexes(r-1,col,1,values.length).values=[values];}
function head(s,r,values,col=2){row(s,r,values,col);s.getRangeByIndexes(r-1,col,1,values.length).format={fill:C.navy,font:{bold:true,color:'#FFFFFF'},rowHeight:40,wrapText:true,horizontalAlignment:'center'};}
function band(s,r,label,end='H'){v(s,`C${r}`,label);s.getRange(`C${r}:${end}${r}`).format={fill:C.pale,font:{bold:true,color:C.navy},rowHeight:27};}
function note(s,r,t){v(s,`C${r}`,t);s.getRange(`C${r}`).format.font={size:10,color:C.gray};}
function input(s,a,format=N){s.getRange(a).format={fill:C.amber,font:{color:C.blue}};s.getRange(a).setNumberFormat(format);}
function total(s,r,end='H'){s.getRange(`C${r}:${end}${r}`).format={font:{bold:true},borders:{top:{style:'thin',color:'#B6A6D8'}}};}
function neg(s,a){s.getRange(a).conditionalFormats.add('cellIs',{operator:'lessThan',formula:0,format:{fill:'#FDE9E7',font:{color:C.red}}});}
function init(s,title,last=70,end='J'){
 s.showGridLines=false;s.getRange(`A1:${end}${last}`).format={font:{name:'Arial',size:11,color:C.ink},rowHeight:25,verticalAlignment:'center'};
 s.getRange(`A1:B${last}`).format.columnWidth=3;s.getRange(`C1:C${last}`).format.columnWidth=49;
 s.getRange(`D1:${end}${last}`).format.columnWidth=19;s.getRange(`D1:${end}${last}`).setNumberFormat(N);
 v(s,'C2',title);s.getRange('C2').format.font={size:16,bold:true,color:C.navy};s.getRange(`C3:H3`).format.borders={bottom:{style:'thin',color:C.purple}};
 if(s.name!=='Setup'){v(s,'C4','Annual commitment selected');f(s,'E4',"='Setup'!E5");s.getRange('E4').format.font={bold:true,color:C.green};}
}
init(sh.Summary,'DDA central procurement — savings and adoption',68,'J');
init(sh.Setup,'Commitment, pricing and assumptions',74,'K');
init(sh['Existing customers'],'Existing customers — subscription savings',38,'L');
init(sh.Survey,'Survey — demand, costs and new customers',75,'J');
init(sh.Potential,'Overall potential and commitment economics',102,'J');
init(sh.Respondents,'Survey respondents — comparable subscription inputs',56,'M');
init(sh.Entities,'Potential entities — supplied source list',106,'F');
sh.Summary.tabColor=C.navy;sh.Setup.tabColor=C.purple;

const a=sh.Setup;
configureCommitment(wb,10000);
v(a,'C6','Capacity check');f(a,'E6',`=IF(E5<ROUND('Existing customers'!D16*(1+E67),0),"Below existing users","Ready")`);
a.getRange('E6').conditionalFormats.add('containsText',{text:'Below',format:{fill:'#FDE9E7',font:{color:C.red}}});
const controls=[
 [8,'Regular Basic Price',2950,M,'V2-S03. Subscription benchmark, not actual spending.'],
 [9,'Comparison period — years',5,N,'Five years, billed annually. Paid users grow from Year 2.'],
 [10,'Employee population',76000,N,'V2-S05. User-supplied planning population.'],
 [11,'Potential adoption share',.20,P,'V2-S05. Assumption; includes existing users.'],
 [12,'Baseline annual price escalation',0,P,'Optional assumption. Central unit prices stay fixed.'],
 [13,'Additional seats used beyond Year 1 existing',1,P,'Usage of remaining capacity after existing-customer growth.'],
 ];
for(const[r,l,x,fmt,n]of controls){v(a,`C${r}`,l);v(a,`E${r}`,x);input(a,`E${r}`,fmt);v(a,`G${r}`,n);}
a.getRange('G8:G13').format.font.size=10;
// The workbook uses an explicitly five-year view, rather than an editable horizon that does not resize it.
a.getRange('E9').format.fill='#FFFFFF';a.dataValidations.add({range:'E9',rule:{type:'whole',operator:'equal',formula1:5}});
for(const addr of ['E11','E13'])a.dataValidations.add({range:addr,rule:{type:'decimal',operator:'between',formula1:0,formula2:1}});
const selected={15:['Selected tier','=MATCH(E5,D27:D33,1)',N],16:['Subscription discount','=INDEX(F27:F33,E15)',P],17:['Support rate','=INDEX(G27:G33,E15)',P],18:['Subscription AED/user/year','=INDEX(H27:H33,E15)',M],19:['Separate support AED/user/year','=INDEX(I27:I33,E15)',M]};
for(const[r,[l,x,fmt]]of Object.entries(selected)){v(a,`C${r}`,l);f(a,`E${r}`,x);a.getRange(`E${r}`).setNumberFormat(fmt);}
note(a,21,'Amber cells are editable assumptions. Blue numbers are inputs; green formulas link sheets.');
note(a,22,'Existing-customer savings exclude support. Central support is added separately to the budget.');
note(a,23,'Survey adoption is modeled explicitly. Savings against reported costs require matched respondents.');
head(a,26,['Tier','Minimum users','Maximum users','Discount','Support rate','Subscription AED/user','Separate support AED/user']);
const tiers=[[1,1,1000,.25,.25],[2,1001,1999,.30,.22],[3,2000,4999,.40,.20],[4,5000,7999,.50,.18],[5,8000,9999,.55,.16],[6,10000,12000,.60,.14],[7,12001,null,.65,.12]];
tiers.forEach((t,i)=>{const r=27+i;row(a,r,t);input(a,`D${r}:E${r}`);input(a,`F${r}:G${r}`,P);f(a,`H${r}`,`=$E$8*(1-F${r})`);f(a,`I${r}`,`=H${r}*G${r}`);});
a.getRange('H27:I33').setNumberFormat(M);
note(a,35,'Pricing source: V2-P04 accepted for this workbook by the user; endpoints from V2-S07.');
note(a,36,'Above 12,000 starts at 12,001. A tier rate applies to the full committed pool, not marginal bands.');
note(a,37,'Full-pool discounts create price drops at thresholds. Review the better commitment near each boundary.');
band(a,40,'Scope and source notes','I');
note(a,42,'All savings compare subscriptions only. Support is a separate charge; onboarding, tax and optional services are excluded.');
note(a,43,'No deployment-specific support override is applied in this simplified tier model.');
note(a,44,'Current support fees are not supplied. No all-in savings or complete project ROI is claimed.');
note(a,45,'Employee scale context: DDA, GITEX Europe announcement, May 2025; over 76,000 Smart Employee users.');
v(a,'C46','https://www.digitaldubai.ae/newsroom/news/dubai-to-make-presence-felt-at-gitex-europe-x-ai-everything-2025-with-a-joint-pavilion-featuring-12-government-and-private-entities');
a.getRange('C46').format.font={size:10,color:C.gray};
note(a,48,'Change one commitment input for 10K, 8K or 5K. Rates, customer savings, budget and charts update together.');
note(a,49,'Workforce percentage is a planning assumption. Entity names do not establish user allocations.');
band(a,52,'Adoption planning assumptions','I');
v(a,'C54','Total entities in scope');v(a,'E54',92);input(a,'E54');v(a,'G54','User-supplied scope count; raw list has repeated rows.');
v(a,'C55','Existing Circularo entities');v(a,'E55',6);v(a,'G55','Six distinct entities across seven supplied projects.');
v(a,'C56','Existing users deducted from survey — share');v(a,'E56',0);input(a,'E56',P);v(a,'G56','User instruction: use full survey counts, no deduction.');
a.dataValidations.add({range:'E56',rule:{type:'decimal',operator:'between',formula1:0,formula2:1}});
v(a,'C57','Survey estimate basis');v(a,'E57',1);input(a,'E57');v(a,'G57','1 = numerical minimum; 2 = midpoint illustration.');
a.dataValidations.add({range:'E57',rule:{type:'whole',operator:'between',formula1:1,formula2:2}});
v(a,'C58','Five-year baseline price factor');f(a,'E58','=IF(E12=0,E9,((1+E12)^E9-1)/E12)');a.getRange('E58').setNumberFormat('0.000');
note(a,60,'The default uses the survey numerical minimum. The illustration uses editable band averages on Survey, including the open band.');
note(a,61,'Per user instruction, no existing users are deducted from the survey. The additive treatment is a modeling assumption.');
note(a,62,'Current/expected survey users are an opportunity, not a purchase commitment. The 16 demand entities are not added as extra users.');
note(a,63,'Other departments receive the residual seat target. Their required average is a feasibility test, not a demand forecast.');
band(a,65,'User growth assumptions','I');
v(a,'C67','Existing customers — Year 1 growth');v(a,'E67',.20);input(a,'E67',P);v(a,'G67','V2-S13: user-reported Year 1 growth.');
v(a,'C68','All cohorts — annual growth, Years 2–5');v(a,'E68',.05);input(a,'E68',P);v(a,'G68','V2-S13: expected annual user growth.');
for(const addr of ['E67','E68'])a.dataValidations.add({range:addr,rule:{type:'decimal',operator:'between',formula1:0,formula2:1}});
note(a,70,'Paid volume rises with users above the initial annual minimum. The selected subscription and support rates remain fixed.');
note(a,71,'Forecast counts are rounded to whole users by cohort each year and assumed billable for the full year.');
note(a,72,'Existing growth uses the current weighted subscription price. Survey/other growth preserves each cohort’s Year 1 cost mix.');
note(a,73,'These growth and baseline-price assumptions are modeled expectations, not newly signed subscriptions.');

const cu=sh['Existing customers'];
cu.getRange('C1:C38').format.columnWidth=51;cu.getRange('D1:D38').format.columnWidth=12;
cu.getRange('E1:F38').format.columnWidth=18;cu.getRange('G1:J38').format.columnWidth=20;
cu.getRange('K1:K38').format.columnWidth=15;cu.getRange('L1:L38').format.columnWidth=22;
note(cu,6,'Source: user-supplied subscriptions (V2-S01) plus Rulers Court addition (V2-S12). Support is separate.');
head(cu,8,['Customer / project','Users','Current AED/user','Central AED/user','Current annual AED','Central annual AED','Annual saving AED','Five-year saving AED','Saving %','Central support AED']);
const customers=[['Digital Dubai Authority (VIP Project)',50,1850.94],['Digital Dubai Authority',100,2212.50],['Dubai Culture & Arts Authority',25,2212.48],['Dubai Electronic Security Center',60,2507.50],['Ports, Customs and Free Zone Corporation (PCFC)',25,2159.43],['Roads and Transport Authority (RTA)',1000,1245],['His Highness the Rulers Court',50,2212.50]];
customers.forEach((x,i)=>{const r=9+i;row(cu,r,x);cu.getRange(`C${r}`).format.wrapText=true;cu.getRange(`C${r}:L${r}`).format.rowHeight=42;input(cu,`D${r}`);input(cu,`E${r}`,M);f(cu,`F${r}`,"='Setup'!$E$18");f(cu,`G${r}`,`=D${r}*E${r}`);f(cu,`H${r}`,`=D${r}*F${r}`);f(cu,`I${r}`,`=G${r}-H${r}`);f(cu,`J${r}`,`=I${r}*'Setup'!$E$9`);f(cu,`K${r}`,`=IF(G${r}=0,"n.a.",I${r}/G${r})`);f(cu,`L${r}`,`=H${r}*'Setup'!$E$17`);});
v(cu,'C16','Existing customer total');for(const c of ['D','G','H','I','J','L'])f(cu,`${c}16`,`=SUM(${c}9:${c}15)`);f(cu,'K16','=I16/G16');total(cu,16,'L');
cu.getRange('E9:J16').setNumberFormat(M);cu.getRange('K9:K16').setNumberFormat(P);cu.getRange('L9:L16').setNumberFormat(M);neg(cu,'I9:K16');
note(cu,18,'Positive savings = lower subscription fees. Negative values show a subscription increase.');
note(cu,19,'Central support is shown separately. Current support is unknown and excluded from the savings comparison.');
note(cu,20,'These costs allocate the central rate to existing users; DDA still pays for the full annual commitment.');
note(cu,21,'Five-year savings hold current subscription prices and existing user counts flat.');
note(cu,22,'Entity #92 added by user: Rulers Court. Transaction limits not supplied; the original six projects are unlimited.');
band(cu,24,'Subscription comparison for charts','F');head(cu,25,['Measure','Current subscriptions','Central subscriptions'],2);
v(cu,'C26','Existing customers');f(cu,'D26','=G16');f(cu,'E26','=H16');
cu.freezePanes.freezeRows(8);

const re=sh.Respondents;
re.getRange('C1:C56').format.columnWidth=48;re.getRange('D1:D56').format.columnWidth=19;re.getRange('E1:E56').format.columnWidth=12;
re.getRange('F1:G56').format.columnWidth=22;re.getRange('H1:H56').format.columnWidth=17;re.getRange('I1:J56').format.columnWidth=21;re.getRange('K1:K56').format.columnWidth=24;re.getRange('L1:L56').format.columnWidth=40;
re.getRange('M1:M56').format.columnWidth=24;
note(re,6,'Enter each entity once. Only rows marked Ready and Existing Circularo? = No feed new-customer savings.');
head(re,8,['Entity','Existing Circularo?','Users','Reported system cost AED/year','Comparable subscription AED/year','Cost basis','Central subscription AED/year','Annual saving AED','Input status','Source / cost scope','Demand cohort']);
re.getRange('C9:H46').format.fill=C.amber;re.getRange('C9:H46').format.font.color=C.blue;re.getRange('L9:L46').format.fill=C.amber;
re.dataValidations.add({range:'D9:D46',rule:{type:'list',values:['Yes','No','Unknown']}});
re.dataValidations.add({range:'H9:H46',rule:{type:'list',values:['Current','Expected']}});
re.getRange('M9:M46').format.fill=C.amber;
re.dataValidations.add({range:'M9:M46',rule:{type:'list',values:['Survey respondents','Other departments']}});
re.dataValidations.add({range:'E9:E46',rule:{type:'whole',operator:'greaterThanOrEqual',formula1:1}});
for(let r=9;r<=46;r++){
 f(re,`K${r}`,`=IF(C${r}="","",IF(D${r}="Yes","Existing - excluded",IF(D${r}<>"No","Check overlap",IF(OR(NOT(ISNUMBER(E${r})),E${r}<=0),"Enter users",IF(NOT(ISNUMBER(G${r})),"Enter subscription",IF(G${r}<0,"Check cost",IF(AND(H${r}<>"Current",H${r}<>"Expected"),"Select cost basis",IF(AND(M${r}<>"Survey respondents",M${r}<>"Other departments"),"Select demand cohort",IF(COUNTIFS($C$9:$C$46,C${r})>1,"Duplicate entity","Ready")))))))))`);
 f(re,`I${r}`,`=IF(K${r}="Ready",E${r}*'Setup'!$E$18,"")`);f(re,`J${r}`,`=IF(K${r}="Ready",G${r}-I${r},"")`);
}
re.getRange('F9:G46').setNumberFormat(M);re.getRange('I9:J46').setNumberFormat(M);neg(re,'J9:J46');
re.getRange('K9:K46').conditionalFormats.add('containsText',{text:'Duplicate',format:{fill:'#FDE9E7',font:{color:C.red}}});
note(re,49,'Keep reported system costs in column F. Enter column G only when the comparable subscription component is known.');
note(re,50,'Do not treat support-inclusive costs as subscriptions. Unknown or incomplete rows remain outside savings totals.');
note(re,51,'Expected costs are forecasts, not actual spend. Both are identified in the Survey summary.');
note(re,52,'Respondent-level data is pending from the user. Blank cells are missing inputs, not zero-cost customers.');
note(re,53,'Demand cohort assigns each matched row once to the adoption plan. Cost basis separately identifies actual or expected costs.');
re.freezePanes.freezeRows(8);

const su=sh.Survey;
note(su,6,'Source: DDA internal survey, supplied by the user. Cost and user bands are unpaired current/expected responses.');
head(su,8,['Annual system cost band','Responses','Lower bound AED','Assumed average AED','Estimated total AED','Lower-bound total AED']);
const costs=[['Less than AED 50,000',7,0,25000],['AED 50,001–100,000',6,50001,75000.5],['AED 100,001–250,000',6,100001,175000.5],['AED 250,001–500,000',1,250001,375000.5],['More than AED 2,000,000',1,2000001,2500000],['Not available / unknown',1,null,null]];
costs.forEach((x,i)=>{const r=9+i;row(su,r,x);if(i<5){input(su,`F${r}`,M);f(su,`G${r}`,`=D${r}*F${r}`);f(su,`H${r}`,`=D${r}*E${r}`);}});
v(su,'C15','Total responses / quantified costs');for(const c of['D','G','H'])f(su,`${c}15`,`=SUM(${c}9:${c}14)`);total(su,15);
note(su,17,'Selected averages are assumptions. The open band has no reported ceiling; AED 2.5m is an editable illustration.');
note(su,18,'The unknown response is from the earlier full survey. Quantified costs cover 21 of 22 responses.');
head(su,21,['Digital signature user band','Responses','Minimum users','Assumed average users','Estimated users','Minimum total users']);
const users=[['1–50 users',6,1,25.5],['51–100 users',4,51,75.5],['101–500 users',7,101,300.5],['More than 1,000 users',4,1001,2000],['Other / unspecified',1,null,null]];
users.forEach((x,i)=>{const r=22+i;row(su,r,x);if(i<4){input(su,`F${r}`,'#,##0.0');f(su,`G${r}`,`=D${r}*F${r}`);f(su,`H${r}`,`=D${r}*E${r}`);}});
v(su,'C27','Total responses / quantified users');for(const c of['D','G','H'])f(su,`${c}27`,`=SUM(${c}22:${c}26)`);total(su,27);su.getRange('F22:G27').setNumberFormat('#,##0.0');
note(su,29,'Midpoints are estimates. The open user band uses 2,000 as an editable assumption; the unknown is excluded.');
note(su,30,'Summary adds full survey user counts as instructed. Unpaired reported cost totals are not used to claim subscription savings.');
band(su,32,'Identified new-customer comparison','H');
const sumifs=(col)=>`SUMIFS('Respondents'!${col}9:${col}46,'Respondents'!K9:K46,"Ready")`;
const sm={34:['Comparable new entities',`=COUNTIFS('Respondents'!K9:K46,"Ready")`],35:['Comparable new users',`=${sumifs('E')}`],36:['Current / expected subscriptions AED',`=IF(E34=0,"n.a.",${sumifs('G')})`],37:['Central subscriptions AED',`=IF(E34=0,"n.a.",${sumifs('I')})`],38:['Annual subscription saving AED',`=IF(E34=0,"n.a.",E36-E37)`],39:['Subscription saving %',`=IF(OR(E34=0,E36=0),"n.a.",E38/E36)`],40:['Five-year subscription saving AED',`=IF(E34=0,"n.a.",E38*'Setup'!E9)`],42:['Entities with current costs',`=COUNTIFS('Respondents'!K9:K46,"Ready",'Respondents'!H9:H46,"Current")`],43:['Entities with expected costs',`=COUNTIFS('Respondents'!K9:K46,"Ready",'Respondents'!H9:H46,"Expected")`],44:['Data status',`=IF(E34=0,"Awaiting respondent data","Matched rows only")`]};
for(const[r,[l,x]]of Object.entries(sm)){v(su,`C${r}`,l);f(su,`E${r}`,x);}su.getRange('E39').setNumberFormat(P);neg(su,'E38:E40');
note(su,47,'New-customer savings use matched subscription costs, explicit non-customer status and no duplicate entity names.');
note(su,48,'Survey estimates are neither confirmed new demand nor a funded allocation of the annual commitment.');
note(su,49,'Current/expected system costs may include support, transactions or other services. Scope must be matched first.');
su.freezePanes.freezeRows(8);
band(su,52,'Survey reach and demand signals','H');
const signals=[[54,'Entities surveyed',38],[55,'Already use digital signatures',21],[56,'Current requirement — additional entities',10],[57,'Future demand — additional entities',6],[59,'Expect growth — organizations',17],[60,'Growth-question responses',22],[62,'Growth driven by more users — responses',13],[63,'Respondents expecting growth',17]];
for(const[r,label,num]of signals){v(su,`C${r}`,label);v(su,`E${r}`,num);}
v(su,'C58','Total additional demand entities');f(su,'E58','=SUM(E56:E57)');
v(su,'C61','Share expecting growth');f(su,'E61','=E59/E60');su.getRange('E61').setNumberFormat(P);
v(su,'C64','Share citing more users');f(su,'E64','=E62/E63');su.getRange('E64').setNumberFormat(P);
v(su,'C66','Entities not surveyed');f(su,'E66',"='Setup'!E54-E54");
v(su,'C67','Survey coverage');f(su,'E67',"=E54/'Setup'!E54");su.getRange('E67').setNumberFormat(P);
note(su,70,'Source: original user-supplied DDA survey Q1, Q5, Q6 and Q7. Scope updated to 92 with the user-supplied Rulers Court addition (V2-S12).');
note(su,71,'17/22 and 13/17 are respondent shares, not user growth rates. Q6 allows multiple selections.');
note(su,72,'Of the 16 demand entities, 10 have a current requirement and six may need the service in the future.');

const po=sh.Potential;
note(po,6,'The employee-based potential includes existing and survey users. It is not an additional cohort to add to them.');
band(po,8,'Demand and capacity','I');
const pop={9:['Employee planning population',"='Setup'!E10"],10:['Assumed adoption share',"='Setup'!E11"],11:['Potential signature users','=ROUND(E9*E10,0)'],13:['Annual committed users',"='Setup'!E5"],14:['Existing customer users',"='Existing customers'!D16"],15:['Matched new-customer users',"='Survey'!E35"],16:['Known / expected users including growth','=SUM(E14:E15)+E23'],17:['Commitment still to allocate','=MAX(0,E13-E16)'],18:['Identified users above commitment','=MAX(0,E16-E13)'],19:['Commitment / estimated potential','=IF(E11=0,"n.a.",E13/E11)'],20:['Potential beyond commitment','=MAX(0,E11-E13)'],21:['Capacity beyond Year 1 existing','=MAX(0,E13-E14-E23)'],22:['Additional seats assumed in use',"=ROUND(E21*'Setup'!E13,0)"],23:['Existing growth — additional Year 1 users',"=ROUND(E14*'Setup'!E67,0)"]};
for(const[r,[l,x]]of Object.entries(pop)){v(po,`C${r}`,l);f(po,`E${r}`,x);}po.getRange('E10').setNumberFormat(P);po.getRange('E19').setNumberFormat(P);
po.getRange('E18').conditionalFormats.add('cellIs',{operator:'greaterThan',formula:0,format:{fill:'#FDE9E7',font:{color:C.red}}});
head(po,25,['Selected commitment — users and AED','Year 1','Year 2','Year 3','Year 4','Year 5','Five-year AED total']);
const pl={26:'Existing users — growth rate',27:'Survey / Other — growth rate',28:'Existing users including growth',29:'Survey users',30:'Other users',31:'Total users in use',32:'Paid subscription users',33:'Locked subscription AED/user/year',35:'Existing — subscription benchmark AED',36:'Survey — subscription benchmark AED',37:'Other — subscription benchmark AED',38:'Combined subscription benchmark AED',39:'Central subscription AED',40:'Subscription savings AED',41:'Separate support AED — not compared'};
for(const[r,label]of Object.entries(pl))v(po,'C'+r,label);
for(let i=0;i<5;i++){
 const c='DEFGH'[i],prev='CDEFG'[i],esc="*(1+'Setup'!$E$12)^"+i;
 f(po,c+'26',i===0?"='Setup'!E67":"='Setup'!E68");
 f(po,c+'27',i===0?'=0':"='Setup'!E68");
 f(po,c+'28',i===0?'=$E$14+$E$23':'=ROUND('+prev+'28*(1+'+c+'26),0)');
 f(po,c+'29',i===0?'=$E$71':'=ROUND('+prev+'29*(1+'+c+'27),0)');
 f(po,c+'30',i===0?'=$E$72':'=ROUND('+prev+'30*(1+'+c+'27),0)');
 f(po,c+'31','=SUM('+c+'28:'+c+'30)');
 f(po,c+'32','=MAX($E$13,'+c+'31)');
 f(po,c+'33',"='Setup'!$E$18");
 f(po,c+'35',"=IF($E$14=0,0,'Existing customers'!$G$16*"+c+'28/$E$14)'+esc);
 f(po,c+'36','=IF($E$79="Modeled adoption",IF($D$29=0,0,($E$83+($D$29-$E$80)*\'Setup\'!$E$8)*'+c+'29/$D$29)'+esc+',"n.a.")');
 f(po,c+'37','=IF($E$79="Modeled adoption",IF($D$30=0,0,(IF(\'Survey\'!$E$34=0,0,\'Survey\'!$E$36)-$E$83+($D$30-$E$82)*\'Setup\'!$E$8)*'+c+'30/$D$30)'+esc+',"n.a.")');
 f(po,c+'38','=IF(AND($I$17="Ready",COUNT('+c+'35:'+c+'37)=3),SUM('+c+'35:'+c+'37),"n.a.")');
 f(po,c+'39','='+c+'32*'+c+'33');
 f(po,c+'40','=IF(ISNUMBER('+c+'38),'+c+'38-'+c+'39,"n.a.")');
 f(po,c+'41','='+c+"39*'Setup'!$E$17");
}
for(const r of [35,36,37,38,39,40,41])f(po,'I'+r,'=IF(COUNT(D'+r+':H'+r+')=5,SUM(D'+r+':H'+r+'),"n.a.")');
po.getRange('D26:H27').setNumberFormat(P);po.getRange('D33:H33').setNumberFormat(M);
for(const r of[31,32,38,40])total(po,r,'I');neg(po,'D40:I40');
v(po,'G17','Capacity / usage check');f(po,'I17','=IF(E16>E13,"Over capacity",IF(E15>E22,"Review usage","Ready"))');
po.getRange('I17').conditionalFormats.add('notContainsText',{text:'Ready',format:{fill:'#FDE9E7',font:{color:C.red}}});
band(po,43,'At full estimated potential — separate scale illustration','I');
const all={45:['Potential users','=E11'],46:['Applicable subscription discount',"=IF(E45=0,0,INDEX('Setup'!F27:F33,MATCH(E45,'Setup'!D27:D33,1)))"],47:['Subscription AED/user/year',"='Setup'!E8*(1-E46)"],48:['Separate support rate',"=IF(E45=0,0,INDEX('Setup'!G27:G33,MATCH(E45,'Setup'!D27:D33,1)))"],49:['Annual subscription AED','=E45*E47'],50:['Separate annual support AED','=E49*E48'],52:['Subscription benchmark AED',"=IF(E45<E16,\"n.a.\",'Existing customers'!G16*(1+'Setup'!E67)+IF('Survey'!E34=0,0,'Survey'!E36)+MAX(0,E45-E16)*'Setup'!E8)"],53:['Annual subscription saving AED','=IF(ISNUMBER(E52),E52-E49,"n.a.")']};
for(const[r,[l,x]]of Object.entries(all)){v(po,`C${r}`,l);f(po,`E${r}`,x);}po.getRange('E46').setNumberFormat(P);po.getRange('E48').setNumberFormat(P);po.getRange('E47').setNumberFormat(M);
note(po,56,'Full potential assumes adoption across the planning population. It is not an additional purchase or a timing forecast.');
note(po,57,'The entity source contains aliases and repeat project rows. Do not treat raw row counts as unique eligible entities.');
po.freezePanes.freezeRows(4);
band(po,62,'Adoption plan for the selected commitment','I');
const matched=(column,cohort)=>`SUMIFS('Respondents'!${column}9:${column}46,'Respondents'!K9:K46,"Ready",'Respondents'!M9:M46,"${cohort}")`;
const plan={
 65:['Seats beyond Year 1 existing users','=MAX(0,E13-E14-E23)'],
 66:['Survey numerical minimum users',"='Survey'!H27"],67:['Survey illustrative users',"='Survey'!G27"],68:['Assumed existing-user overlap',"=ROUND(E14*'Setup'!E56,0)"],
 69:['Selected survey users before deduction',"=IF('Setup'!E57=1,E66,ROUND(E67,0))"],70:['Survey users after selected deduction','=MAX(0,E69-E68)'],
 71:['Survey seats in selected commitment','=MIN(E22,MAX(E70,E80))'],
 72:['Other departments — required used seats','=MAX(0,E22-E71)'],
 73:['Unused committed seats','=MAX(0,E65-E22)'],74:['Capacity beyond quantified survey','=MAX(0,E65-E71)'],
 75:['Unsurveyed entities — illustrative pool',"='Survey'!E66"],
 76:['Required users per unsurveyed entity','=IF(E75>0,E72/E75,"n.a.")'],
 77:['Survey share of additional seats','=IF(E65=0,"n.a.",E71/E65)'],
 78:['Potential beyond commitment','=MAX(0,E11-E13)'],
 79:['Adoption allocation status','=IF(OR(E14+E23>E13,E80>E71,E82>E72),"Review allocation","Modeled adoption")'],
 80:['Matched survey users',`=${matched('E','Survey respondents')}`],
 82:['Matched other-department users',`=${matched('E','Other departments')}`],
 83:['Matched survey subscriptions AED',`=${matched('G','Survey respondents')}`],
};
for(const[r,[label,x]]of Object.entries(plan)){v(po,`C${r}`,label);f(po,`E${r}`,x);}po.getRange('E76').setNumberFormat('0.0');po.getRange('E77').setNumberFormat(P);
po.getRange('E79').conditionalFormats.add('containsText',{text:'Review',format:{fill:'#FDE9E7',font:{color:C.red}}});
head(po,86,['Savings source','Year 1 users','Year 1 benchmark AED','Year 1 central AED','Year 1 saving AED','Five-year saving AED']);
row(po,87,['A1. Existing customers — current users']);f(po,'D87','=E14');f(po,'E87', "='Existing customers'!G16");f(po,'F87',"=D87*'Setup'!E18");
row(po,88,['A2. Existing customers — Year 1 growth']);f(po,'D88','=E23');f(po,'E88','=IF(E14=0,0,E87*D88/E14)');f(po,'F88',"=D88*'Setup'!E18");
row(po,89,['B. Survey-based opportunity']);f(po,'D89','=D29');f(po,'E89','=D36');f(po,'F89',"=D89*'Setup'!E18");
row(po,90,['C. Other departments — adoption target']);f(po,'D90','=E13-SUM(D87:D89)');f(po,'E90','=D37');f(po,'F90',"=D90*'Setup'!E18");
for(const r of[87,88,89,90])f(po,'G'+r,'=IF(ISNUMBER(E'+r+'),E'+r+'-F'+r+',"n.a.")');
f(po,'H87',"=IF($D$28=0,0,($I$35-SUM($D$28:$H$28)*'Setup'!E18)*D87/$D$28)");
f(po,'H88',"=IF($D$28=0,0,($I$35-SUM($D$28:$H$28)*'Setup'!E18)*D88/$D$28)");
f(po,'H89',"=IF(ISNUMBER(I36),I36-SUM(D29:H29)*'Setup'!E18,\"n.a.\")");
f(po,'H90',"=IF(ISNUMBER(I37),I37-(SUM(D32:H32)-SUM(D28:H29))*'Setup'!E18,\"n.a.\")");
v(po,'C91','Selected commitment total');for(const c of ['D','E','F','G','H'])f(po,c+'91','=IF(COUNT('+c+'87:'+c+'90)=4,SUM('+c+'87:'+c+'90),"n.a.")');total(po,91);neg(po,'G87:H91');
note(po,93,'A1 uses supplied subscriptions. A2 assumes the same weighted unit price for growth. B/C use list until matched costs arrive.');
note(po,94,'B uses current/expected user-band counts. Per user instruction, the default adds the full survey count without overlap deduction.');
note(po,95,'Other-department seats are a residual target, not surveyed demand. Existing Year 1 growth is shown separately; Years 2–5 grow all cohorts at the selected annual rate.');
note(po,96,'The 16 entities expressing interest support the demand case but add no quantified seats here; their user counts are unknown.');
note(po,97,'Forecast user counts are full-year billable estimates. Paid volume grows at the locked unit price; support is separate.');
note(po,98,'Unused committed seats stay in C subscription cost and produce no assumed baseline spending. Support remains separate.');
v(po,'C100','Reconciliation to selected annual model');f(po,'E100','=IF(AND(ISNUMBER(G91),ISNUMBER(D40)),G91-D40,"n.a.")');po.getRange('E100').setNumberFormat('0.00');

const en=sh.Entities;
en.getRange('C1:C106').format.columnWidth=13;en.getRange('D1:D106').format.columnWidth=72;en.getRange('E1:E106').format.columnWidth=38;
note(en,6,'Original source: dda departments, columns A:B only. Entity #92 added from user instruction, V2-S12.');
head(en,8,['Source #','Source entity name','Addition source']);src.entities.forEach((e,i)=>row(en,i+9,[e.number,e.name]));
row(en,101,[92,'His Highness the Rulers Court','User, 21 Sep 2026 (V2-S12)']);
en.getRange('D9:D101').format.wrapText=true;en.getRange('C9:D101').format.rowHeight=30;
v(en,'C103','Name rows');f(en,'D103','=COUNTA(D9:D101)');note(en,105,'Raw rows include duplicates/aliases. This list does not establish funded users or a unique eligible entity count.');
en.freezePanes.freezeRows(8);

const suM=sh.Summary;
v(suM,'C5','Seats beyond existing users + Year 1 growth');f(suM,'E5',"='Potential'!E65");v(suM,'G5','Survey share of this gap');f(suM,'I5',"='Potential'!E77");suM.getRange('I5').setNumberFormat(P);
note(suM,6,'A1 uses current subscriptions; A2 shows expected Year 1 user growth. B/C are modeled opportunities. Support is separate.');
head(suM,8,['Savings source','Year 1 users','Year 1 benchmark AED','Year 1 central AED','Year 1 saving AED','Five-year saving AED']);
for(let i=0;i<5;i++){const r=9+i,source=87+i;for(const col of ['C','D','E','F','G','H'])f(suM,`${col}${r}`,`='Potential'!${col}${source}`);}
suM.getRange('C9:C12').format.wrapText=true;suM.getRange('C9:H13').format.rowHeight=38;total(suM,13);
note(suM,14,'B uses the numerical survey minimum by default. B/C compare with list price until matched costs are supplied.');
note(suM,15,'Per user instruction, survey counts are added without an existing-user deduction. This is a modeling assumption.');
band(suM,17,'Survey user counts — current / expected usage','H');
head(suM,18,['Survey user band','Responses','Minimum users per entity','Minimum total users','Illustrative average','Illustrative total users']);
for(let i=0;i<4;i++){const r=19+i,sr=22+i;for(const[c,sc]of [['C','C'],['D','D'],['E','E'],['F','H'],['G','F'],['H','G']])f(suM,`${c}${r}`,`='Survey'!${sc}${sr}`);}
v(suM,'C23','21 quantified responses');f(suM,'D23','=SUM(D19:D22)');f(suM,'F23','=SUM(F19:F22)');f(suM,'H23','=SUM(H19:H22)');total(suM,23);suM.getRange('G19:H23').setNumberFormat('#,##0.0');
note(suM,25,'Illustration uses band midpoints and 2,000 users for each >1,000 response. It is not an observed user total.');
note(suM,26,'The 16 entities expressing demand add no extra quantified users here. Their user counts are not supplied.');
band(suM,28,'Path to the commitment and breadth of opportunity','I');
const pathRows=[[29,'Existing customer users today','E14'],[30,'Existing growth — Year 1','E23'],[31,'Survey users in the Year 1 plan','E71'],[33,'Other-department users required','E72'],[35,'Employee-based potential users','E11']];
for(const[r,label,ref]of pathRows){v(suM,`C${r}`,label);f(suM,`E${r}`,`='Potential'!${ref}`);}
f(suM,'C30',`="Existing growth — Year 1 ("&TEXT('Setup'!E67,"0%")&")"`);suM.getRange('C30').format.font.color=C.ink;
v(suM,'C32','Covered by existing + growth + survey');f(suM,'E32',"=SUM('Potential'!D87:D89)/'Setup'!E5");suM.getRange('E32').setNumberFormat(P);
v(suM,'C34','Users per unsurveyed entity (rounded up)');f(suM,'E34',"=ROUNDUP('Potential'!E76,0)");
const proof=[[29,'Total entities',"='Setup'!E54"],[30,'Entities surveyed',"='Survey'!E54"],[31,'Entities not surveyed',"='Survey'!E66"],[32,'Already use digital signatures',"='Survey'!E55"],[33,'Additional demand entities',"='Survey'!E58"],[34,'Expect usage growth',"='Survey'!E61"],[35,'Growth driven by more users',"='Survey'!E64"]];
for(const[r,label,x]of proof){v(suM,`G${r}`,label);f(suM,`I${r}`,x);}suM.getRange('I34:I35').setNumberFormat(P);
note(suM,37,'Demand: 10 current requirements + 6 future needs. Growth: 17/22 organizations; more users: 13/17 growth respondents.');
v(suM,'C38','Separate annual support fee — AED');f(suM,'E38',"='Potential'!D41");
f(suM,'C39',`="Years 2–5: "&TEXT('Setup'!E68,"0%")&" annual user growth, paid at the locked unit price. Full-year billing assumed; support remains separate."`);suM.getRange('C39').format.font={size:10,color:C.gray};
head(suM,58,['Chart data','Current subscription','Central subscription']);v(suM,'C59','Existing customers');f(suM,'D59',"='Existing customers'!G16");f(suM,'E59',"='Existing customers'!H16");
head(suM,61,['Adoption source','Users']);
for(const[i,[label,ref]]of [['Existing','E14'],['Existing growth (Year 1)','E23'],['Survey','E71'],['Other','E72'],['Unused','E73']].entries()){v(suM,`C${62+i}`,label);f(suM,`D${62+i}`,`='Potential'!${ref}`);}
function chart(s,ranges,title,start,end,format='0.0,,'){const data=ranges.length===1?s.getRange(ranges[0]):ranges.map(x=>s.getRange(x));const ch=s.charts.add('bar',data);ch.title=title;ch.setPosition(start,end);ch.titleTextStyle.typeface='Arial';ch.titleTextStyle.fontSize=14;ch.legend={position:'top',textStyle:{typeface:'Arial',fontSize:11}};ch.xAxis={axisType:'textAxis',textStyle:{typeface:'Arial',fontSize:11}};ch.yAxis={numberFormatCode:format,numberFormatSourceLinked:false,textStyle:{typeface:'Arial',fontSize:11}};ch.series.items.forEach((x,i)=>x.fill=[C.navy,C.purple][i]);return ch;}
chart(suM,['C58:E59'],'Existing subscriptions (AED m)','C41','F56');
chart(suM,['C61:D66'],'Path to the selected commitment (users)','F41','J56','#,##0').hasLegend=false;
for(const rng of ['E5','I5','C9:H13','C19:H23','E29:E38','I29:I35'])suM.getRange(rng).format.font.color=C.ink;
suM.getRange('E4').format.font.color=C.blue;su.getRange('E36:E40').format.horizontalAlignment='right';neg(suM,'G9:H13');

wb.recalculate();
const val=(s,c)=>sh[s].getRange(c).values[0][0];
const tests=[];
function eq(label,actual,expected){if(typeof expected==='number'?(typeof actual!=='number'||Math.abs(actual-expected)>0.011):actual!==expected)throw new Error(label+': '+actual+' != '+expected);tests.push({label,actual,expected});}
const currentUsers=customers.reduce((n,x)=>n+x[1],0),currentCost=customers.reduce((n,x)=>n+x[1]*x[2],0);
function expectedCase(n,rate,support,growth=.20,annual=.05,usage=1,escalation=0){
 let existing=currentUsers+Math.round(currentUsers*growth),survey=Math.min(Math.round(Math.max(0,n-existing)*usage),4921),other=Math.max(0,Math.round(Math.max(0,n-existing)*usage)-survey);
 return Array.from({length:5},(_,i)=>{
  if(i){existing=Math.round(existing*(1+annual));survey=Math.round(survey*(1+annual));other=Math.round(other*(1+annual));}
  const paid=Math.max(n,existing+survey+other),base=(currentCost*existing/currentUsers+(survey+other)*2950)*Math.pow(1+escalation,i),central=paid*rate;
  return {existing,survey,other,paid,base,central,saving:base-central,support:central*support};
 });
}
function checkCase(n,rate,support){
 const expected=expectedCase(n,rate,support);
 v(sh.Summary,'E4',n);wb.recalculate();
 for(let i=0;i<5;i++){
  const c='DEFGH'[i],e=expected[i];
  for(const[r,key]of [[28,'existing'],[29,'survey'],[30,'other'],[32,'paid'],[38,'base'],[39,'central'],[40,'saving'],[41,'support']])eq(n+' Year '+(i+1)+' '+key,val('Potential',c+r),e[key]);
  eq(n+' locked unit price year '+(i+1),val('Potential',c+'33'),rate);
 }
 eq(n+' annual reconciliation',val('Potential','E100'),0);
 eq(n+' five-year subscription',val('Potential','I39'),expected.reduce((n,x)=>n+x.central,0));
 eq(n+' five-year savings',val('Potential','I40'),expected.reduce((n,x)=>n+x.saving,0));
 eq(n+' summary annual savings',val('Summary','G13'),expected[0].saving);
 eq(n+' summary five-year savings',val('Summary','H13'),expected.reduce((n,x)=>n+x.saving,0));
 eq(n+' allocated Year 1 users',val('Summary','D13'),n);
 return expected;
}
eq('Current source users unchanged',val('Existing customers','D16'),1310);
eq('Current subscriptions unchanged',val('Existing customers','G16'),1929169.75);
eq('Current cohort savings unchanged',val('Existing customers','I16'),383369.75);
eq('Year 1 existing growth seats',val('Potential','E23'),262);
eq('Summary growth row',val('Summary','D10'),262);
eq('Adoption table growth row',val('Summary','D63'),262);
eq('Other target after growth',val('Potential','E72'),3507);
eq('Survey minimum unchanged',val('Survey','H27'),4921);
eq('Survey illustration unchanged',val('Survey','G27'),10558.5);
eq('Entity scope unchanged',val('Setup','E54'),92);
eq('Raw entity rows unchanged',val('Entities','D103'),93);
for(const[n,rate,support]of [[10000,1180,.14],[8000,1327.5,.16],[5000,1475,.18]]){
 checkCase(n,rate,support);
 if(n!==10000)await(await SpreadsheetFile.exportXlsx(wb)).save(path.join(qa,'engine-input-'+n+'.xlsx'));
}
v(sh.Summary,'E4',10000);v(a,'E57',2);wb.recalculate();
eq('Illustration caps after existing growth',val('Potential','E71'),8428);eq('Illustration residual',val('Potential','E72'),0);v(a,'E57',1);
v(a,'E67',0);v(a,'E68',0);wb.recalculate();
eq('Zero-growth restores original annual saving',val('Potential','D40'),15764669.75);eq('Zero-growth five-year price',val('Potential','I39'),59000000);
eq('Zero-growth restores other seats',val('Potential','E72'),3769);v(a,'E67',.20);v(a,'E68',.05);
v(a,'E13',0);wb.recalculate();
eq('No additional adoption retains existing growth',val('Potential','D28'),1572);
eq('No new adoption keeps commitment payable',val('Potential','D39'),11800000);
eq('Unused seats visible',val('Potential','E73'),8428);
eq('Unused capacity reconciliation',val('Potential','E100'),0);v(a,'E13',1);
v(a,'E12',.03);wb.recalculate();
eq('Year 5 baseline escalation',val('Potential','H38'),expectedCase(10000,1180,.14,.2,.05,1,.03)[4].base);
eq('Central unit price lock',val('Potential','H33'),1180);
eq('Five-year escalated savings reconcile',val('Potential','H91'),val('Potential','I40'));v(a,'E12',0);
row(re,9,['TEST ENTITY','No',100,200000,180000,'Current']);v(re,'M9','Survey respondents');wb.recalculate();
eq('Matched new respondent savings',val('Survey','E38'),62000);
eq('Matched cost replaces 100 list seats',val('Potential','D38'),expectedCase(10000,1180,.14)[0].base-115000);
eq('Matched ABC reconciliation',val('Potential','E100'),0);
v(re,'E9',10000);wb.recalculate();eq('Over-allocation exposed',val('Potential','I17'),'Over capacity');eq('Over-allocation invalidates savings',val('Potential','I40'),'n.a.');v(re,'E9',100);
v(re,'G9',null);wb.recalculate();eq('Missing comparable cost',val('Survey','E38'),'n.a.');v(re,'G9',0);wb.recalculate();eq('Zero comparable cost allowed',val('Survey','E38'),-118000);
v(re,'D9','Yes');wb.recalculate();eq('Existing respondent excluded',val('Survey','E34'),0);
v(re,'D9','No');row(re,10,['TEST ENTITY','No',50,100000,90000,'Expected']);v(re,'M10','Other departments');wb.recalculate();eq('Duplicate respondents excluded',val('Survey','E34'),0);
re.getRange('C9:H10').clear({applyTo:'contents'});re.getRange('M9:M10').clear({applyTo:'contents'});
checkCase(10000,1180,.14);wb.recalculate();
const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:100},summary:'Final formula error scan'});
await fs.writeFile(path.join(qa,'formula-errors.ndjson'),errors.ndjson);
console.log(errors.ndjson);
console.log((await wb.inspect({kind:'table',range:"'Existing customers'!G16:L16",include:'values,formulas',tableMaxRows:1,tableMaxCols:6})).ndjson);
await fs.writeFile(path.join(qa,'tests.json'),JSON.stringify(tests,null,2));
await(await SpreadsheetFile.exportXlsx(wb)).save(path.join(out,'DDA-savings-model-v2.1.xlsx'));
for(const[s,rng,file]of [['Summary','C2:J57','summary'],['Summary','C61:E66','adoption-sources'],['Existing customers','C2:L22','existing'],['Entities','C94:F105','entities-addition'],['Setup','C65:K73','setup-growth'],['Survey','C52:J72','survey-signals'],['Potential','C25:I41','potential-growth'],['Potential','C62:J100','potential-adoption'],['Respondents','C2:M15','respondents']]){const b=await wb.render({sheetName:s,range:rng,scale:1,format:'png'});await fs.writeFile(path.join(qa,`${file}.png`),new Uint8Array(await b.arrayBuffer()));}
console.log(JSON.stringify({output:path.join(out,'DDA-savings-model-v2.1.xlsx'),tests:tests.length,existingSaving:val('Existing customers','I16'),annualSubscription:val('Potential','D39'),separateSupport:val('Potential','D41'),year5Users:val('Potential','H31')}));

function configureCommitment(book,selected){
 const summary=book.worksheets.getItem('Summary'),setup=book.worksheets.getItem('Setup');
 summary.getRange('C4').values=[['Annual commitment — edit E4']];
 summary.getRange('E4').values=[[selected]];
 summary.getRange('E4').format={fill:'#FFF1CC',font:{bold:true,color:'#0000FF'}};
 summary.getRange('E4').setNumberFormat('#,##0');
 summary.dataValidations.add({range:'E4',rule:{type:'whole',operator:'greaterThanOrEqual',formula1:1}});
 summary.getRange('G4').values=[['Enter 5,000, 8,000 or 10,000 users.']];
 summary.getRange('G4').format.font={size:10,color:'#667085'};
 setup.getRange('C5').values=[['Annual commitment — from Summary']];
 setup.getRange('E5').formulas=[["='Summary'!E4"]];
 setup.getRange('E5').format={fill:'#FFFFFF',font:{color:'#008000'}};
 setup.getRange('G5').values=[['Edit Summary E4 to change the commitment.']];
 setup.getRange('C48').values=[['Change Summary E4 for 10K, 8K or 5K. Rates, customer savings, budget and charts update together.']];
}

async function fixSummaryInput(){
 const filename=path.join(out,'DDA-savings-model-v2.1.xlsx');
 const book=await SpreadsheetFile.importXlsx(await FileBlob.load(filename));
 const summary=book.worksheets.getItem('Summary'),setup=book.worksheets.getItem('Setup');
 const selected=summary.getRange('E4').values[0][0]??setup.getRange('E5').values[0][0];
 if(!Number.isInteger(selected)||selected<=0)throw Error('The selected commitment must be a positive whole number.');
 await fs.copyFile(filename,path.join(qa,'before-summary-control-v2.1.xlsx'));
 configureCommitment(book,selected);
 const results=[];
 for(const[n,unit,annual]of [[5000,1475,7375000],[8000,1327.5,10620000],[10000,1180,11800000]]){
  summary.getRange('E4').values=[[n]];book.recalculate();
  const values={input:n,setup:setup.getRange('E5').values[0][0],unit:setup.getRange('E18').values[0][0],summaryUsers:summary.getRange('D13').values[0][0],annual:summary.getRange('F13').values[0][0]};
  if(values.setup!==n||values.summaryUsers!==n||Math.abs(values.unit-unit)>.01||Math.abs(values.annual-annual)>.01)throw Error(JSON.stringify(values));
  results.push(values);
  if(n!==selected)await(await SpreadsheetFile.exportXlsx(book)).save(path.join(qa,'engine-input-'+n+'.xlsx'));
 }
 summary.getRange('E4').values=[[selected]];book.recalculate();
 const errors=await book.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:100},summary:'Summary input fix formula check'});
 await fs.writeFile(path.join(qa,'summary-control-errors.ndjson'),errors.ndjson);
 console.log(errors.ndjson);
 await(await SpreadsheetFile.exportXlsx(book)).save(filename);
 for(const[sheetName,range,file]of [['Summary','C2:J15','summary-control-after'],['Setup','C4:K6','setup-control-after']]){
  const blob=await book.render({sheetName,range,scale:1,format:'png'});await fs.writeFile(path.join(qa,file+'.png'),new Uint8Array(await blob.arrayBuffer()));
 }
 await fs.writeFile(path.join(qa,'summary-control-tests.json'),JSON.stringify(results,null,2));
 console.log(JSON.stringify({output:filename,restoredCommitment:selected,tests:results}));
}
