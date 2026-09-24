import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {Workbook,SpreadsheetFile} from '@oai/artifact-tool';
process.on('uncaughtException',e=>{console.error(e.stack);process.exit(1);});
process.on('unhandledRejection',e=>{console.error(e?.stack??e);process.exit(1);});

const root=path.resolve(import.meta.dirname,'..');
const dir=path.join(root,'evidence/m_capital_20260925_g176/investor-model');
const out=path.join(root,'outputs/investor-analysis');
const previews=path.join(root,'previews/investor-analysis');
await fs.mkdir(out,{recursive:true});await fs.mkdir(previews,{recursive:true});
const load=async n=>JSON.parse(await fs.readFile(path.join(dir,n+'.json'),'utf8'));
const freeze=await load('warehouse-review-manifest');assert(freeze.complete);
const presentationOnly=process.argv.includes('--presentation-only');
if(presentationOnly)assert(JSON.parse(await fs.readFile(path.join(out,'tested-formula-baseline.json'),'utf8')).formula_sha256,'A full tested formula baseline is required');
for(const o of freeze.objects)assert.equal(crypto.createHash('sha256').update(await fs.readFile(path.join(root,o.file))).digest('hex'),o.sha256);
const [summary,contracts,customers,inv,alloc,cm,growth,pipeline,events,price,fx]=await Promise.all(['summary','contracts','customers','invoice_lines','service_allocations','customer_months','growth','pipeline','forecast_inputs','price_reviews','fx'].map(load));
const wb=Workbook.create();
const names=['Overview','Assumptions','Revenue','Mix and Cohorts','Growth','Customers','Annual Forecast','Forecast Inputs','Contracts','Products','Invoice Lines','Service Allocations','Customer Months','Pipeline Register','Price Review','FX','Checks','ReadMe'];
const s=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
const navy='#243B53',ink='#243746',muted='#596B7A',blue='#1755C4',green='#18704A',amber='#FFF2CC';
const money='#,##0;(#,##0);"-"',cents='#,##0.00;(#,##0.00);"-"',pct='0.0%;(0.0%);"-"';
const num=v=>v===null||v===undefined?null:Number(v);
const date=v=>v?new Date(v.slice(0,10)+'T00:00:00Z'):null;
const col=n=>{let a='';for(n++;n;n=Math.floor((n-1)/26))a=String.fromCharCode(65+(n-1)%26)+a;return a;};
const refs={};
const put=(n,a,v)=>s[n].getRange(a).values=[[v]];
let batchForecast=false;const forecastFormulas=[];
const form=(n,a,f,output=false)=>{
 if(batchForecast&&n==='Annual Forecast') {const m=/^([A-Z]+)(\d+)$/.exec(a);let c=0;for(const x of m[1])c=c*26+x.charCodeAt(0)-64;const r=Number(m[2])-8;forecastFormulas[r]??=Array(13).fill('');forecastFormulas[r][c-4]=f;return;}
 s[n].getRange(a).formulas=[[f]];s[n].getRange(a).format.font.color=output?navy:(f.includes('!')?green:ink);
};
function init(n,title,note,last=40,width=16,cols=12,start='C'){
 if(n==='Contracts')cols=32;
 const z=s[n];z.showGridLines=false;
 z.getRange(`A1:${col(cols-1)}${last}`).format={font:{name:'Arial',size:10,color:ink},rowHeight:21,verticalAlignment:'center',columnWidth:width};
 if(start==='C')z.getRange(`A1:B${last}`).format.columnWidth=2.5;
 put(n,start+'2',title);z.getRange(start+'2').format.font={name:'Arial',size:14,bold:true,color:navy};
 z.getRange(`${start}3:${col(cols-1)}3`).format.borders={bottom:{style:'thin',color:navy}};
 put(n,start+'4',note);z.getRange(start+'4').format.font={name:'Arial',size:10,italic:true,color:muted};
}
function table(n,heads,rows,{at=7,start=0,name=n.replace(/\W/g,''),widths=[]}={}){
 if(n==='Contracts'){
  heads=[...heads,'Recurring Plan ID','Reseller partner ID','Distributor partner ID','Eligibility reason'];
  rows=rows.map((r,i)=>[...r,contracts[i].plan_id,contracts[i].reseller_id,contracts[i].distributor_id,contracts[i].eligibility]);
  widths=[...widths,18,19,21,38];
 }
 const z=s[n],last=at+rows.length;
 z.getRange(`${col(start)}${at}:${col(start+heads.length-1)}${at}`).values=[heads];
 if(rows.length)z.getRange(`${col(start)}${at+1}:${col(start+heads.length-1)}${last}`).values=rows;
 z.getRange(`${col(start)}${at}:${col(start+heads.length-1)}${at}`).format={fill:navy,font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:44,horizontalAlignment:'center',verticalAlignment:'center',borders:{insideVertical:{style:'thin',color:'#FFFFFF'}}};
 widths.forEach((w,i)=>z.getRange(`${col(start+i)}1:${col(start+i)}${last}`).format.columnWidth=w);
 if(rows.length){const t=z.tables.add(`${col(start)}${at}:${col(start+heads.length-1)}${last}`,true,'T'+name);t.showFilterButton=true;}
 z.freezePanes.freezeRows(at);z.freezePanes.freezeColumns(start+1);
 refs[n]={first:at+1,last,start,heads};
 return refs[n];
}
function format(n,cols,fmt=money){const r=refs[n];for(const c of cols)s[n].getRange(`${c}${r.first}:${c}${r.last}`).setNumberFormat(fmt);}
function formulas(n,c,fn){const r=refs[n];s[n].getRange(`${c}${r.first}:${c}${r.last}`).formulas=Array.from({length:r.last-r.first+1},(_,i)=>[fn(r.first+i,i)]);s[n].getRange(`${c}${r.first}:${c}${r.last}`).format.font.color=fn(r.first,0).includes('!')?green:ink;}
const range=(n,c)=>`'${n}'!$${c}$${refs[n].first}:$${c}$${refs[n].last}`;
const warning=(n,r)=>s[n].getRange(r).conditionalFormats.addCustom(`OR(ISNUMBER(SEARCH("review",${r.split(':')[0]})),ISNUMBER(SEARCH("Missing",${r.split(':')[0]})),ISNUMBER(SEARCH("Invalid",${r.split(':')[0]})))`,{fill:amber,font:{color:'#9C5700'}});
const source='Source: frozen sandbox run m_capital_20260925_g176, review model 1. Tax-exclusive. Customer IDs anonymized.';
console.log('Building frozen facts and contract calculations');

init('Contracts','Subscription contract detail','Current terms and source lifecycle. Historical rows are context, not past ARR snapshots.',contracts.length+8,16,28,'A');
table('Contracts',['Order ID','Customer ID','Issuer ID','Billed partner ID','Family ID','Lifecycle','Active at Sep 6','Scope','Recurring Plan','Raw Edition','Reporting Edition','Source channel','Start date','End date','First contract','Currency','Billing unit','Interval','Net recurring period','Channel discount lines','Annualizer','Snapshot FX to USD','Source ARR USD','Price evidence','Calculated ARR USD','Calculated MRR USD','End-customer ARR proxy','ARR vs source USD'],contracts.map(c=>[c.order_id,c.customer_id,c.issuer_id,c.billed_partner_id,c.family_id,c.lifecycle,c.current_portfolio?1:0,c.scope,c.recurring_plan,c.raw_edition,c.edition,c.channel,date(c.start_date),date(c.end_date),date(c.first_contract_date),c.currency,c.billing_unit,c.billing_interval,num(c.recurring_net_txn),num(c.channel_discount_txn),num(c.annualizer),num(c.snapshot_fx),num(c.source_arr_usd),c.price_status,null,null,null,null]),{widths:[12,15,10,16,12,20,16,22,34,16,18,16,15,15,15,12,13,10,20,20,14,18,20,55,22,22,23,22]});
put('Contracts','A5',source);format('Contracts',['M','N','O'],'dd-mmm-yy');format('Contracts',['S','T','W','Y','Z','AA','AB']);format('Contracts',['U','V'],'0.000000');
formulas('Contracts','Y',r=>`=IF(AND(ISNUMBER(U${r}),ISNUMBER(V${r})),S${r}*U${r}*V${r},"n.a.")`);
formulas('Contracts','Z',r=>`=IF(ISNUMBER(Y${r}),Y${r}/12,"n.a.")`);
formulas('Contracts','AA',r=>`=IF(ISNUMBER(Y${r}),(S${r}-T${r})*U${r}*V${r},"n.a.")`);
formulas('Contracts','AB',r=>`=IF(AND(ISNUMBER(Y${r}),ISNUMBER(W${r})),Y${r}-W${r},"n.a.")`);
const productLines=await load('contract_lines');
init('Products','Current recurring contract products','Recurring line amounts include channel discounts. Product quantities have source-specific meanings and are not customer counts.',productLines.length+8,20,9,'A');
table('Products',['Line ID','Order ID','Customer ID','Product ID','Product','Source quantity','Subtotal txn','Channel discount line','Recurring ARR USD'],productLines.map(p=>[p.line_id,p.order_id,p.customer_id,p.product_id,p.product,num(p.qty),num(p.subtotal_txn),p.channel_discount_line?1:0,num(p.recurring_arr_usd)]),{widths:[14,14,18,15,70,20,23,24,25]});put('Products','A5',source);format('Products',['F'],'0.00');format('Products',['G','I'],cents);

init('Invoice Lines','Invoice product-line facts','All scoped records retained. Reporting include = 1 selects posted external invoices/credits from 2019 through August 2026.',inv.length+8,17,26,'A');
table('Invoice Lines',['Line ID','Invoice ID','Invoice date','Issuer ID','Customer ID','Billed partner ID','Source channel','Recurring Plan','Attribution','Attribution method','Scope','Reporting status','Reporting include','Currency','Signed net txn','Invoice FX to USD','Signed net USD','Product ID','Recurrence','Service start','Service end','Valid dates','Document type','Posted state','Source FX row','USD FX row'],inv.map(f=>[f.invoice_line_id,f.invoice_id,date(f.invoice_date),f.issuer_id,f.customer_id,f.billed_partner_id,f.channel,f.recurring_plan,f.attribution,f.method,f.scope,f.reporting_status,f.in_reporting_total?1:0,f.currency,num(f.revenue_txn),num(f.invoice_fx),num(f.revenue_usd),f.product_id,f.recurrence,date(f.service_start),date(f.service_end),f.service_dates_valid?1:0,f.move_type,f.state,f.source_rate_id,f.usd_rate_id]),{widths:[12,12,15,10,17,17,19,34,22,40,22,24,16,12,20,18,20,12,17,15,15,12,18,16,16,16]});
put('Invoice Lines','A5',source);format('Invoice Lines',['C','T','U'],'dd-mmm-yy');format('Invoice Lines',['O','Q'],cents);format('Invoice Lines',['P'],'0.000000000');

init('Service Allocations','Invoice-line service allocations','Full service horizon. Monthly fractions normalize partial months; invoice-date FX stays fixed. Not accounting revenue.',alloc.length+8,18,10,'A');
table('Service Allocations',['Invoice line ID','Customer ID','Service month','Allocation weight','Allocated txn','Allocated USD','Invoice date','Invoice FX','Timing bucket','Attribution'],alloc.map(a=>[a.invoice_line_id,a.customer_id,date(a.service_month),num(a.weight),num(a.revenue_txn),num(a.revenue_usd),date(a.invoice_date),num(a.invoice_fx),a.period_bucket,a.attribution]),{widths:[16,18,17,19,20,20,17,18,22,22]});
put('Service Allocations','A5',source);format('Service Allocations',['C'],'mmm-yy');format('Service Allocations',['G'],'dd-mmm-yy');format('Service Allocations',['D','H'],'0.000000000');format('Service Allocations',['E','F'],cents);
init('Customer Months','Observed customer-month contributions','Missing months are not zeros. Incomplete attribution/service history prevents certified portfolio retention.',cm.length+8,22,5,'A');
table('Customer Months',['Customer ID','Service month','Observed MRR USD','Annualized equivalent USD','Coverage'],cm.map(a=>[a.customer_id,date(a.service_month),num(a.invoice_backed_mrr_usd),null,a.coverage]),{widths:[18,18,24,26,66]});
put('Customer Months','A5',source);format('Customer Months',['B'],'mmm-yy');format('Customer Months',['C','D'],cents);formulas('Customer Months','D',r=>`=C${r}*12`);

init('Customers','End-customer analysis','All observed scoped customers, including inactive accounts. Tenure is relationship age, not proof of uninterrupted service.',customers.length+8,18,19,'A');
table('Customers',['Customer ID','Current contracts','First contract','Tenure years','Country','Region','Active Recurring Plans','Reporting Editions','Source channels','Net ARR provisional USD','MRR provisional USD','End-customer ARR proxy','Observed billed USD','Mapped billing lines','Price-review contracts','2027–2029 scenario revenue','Lifetime CLV','Contract cohort','Current status'],customers.map(c=>[c.customer_id,c.current_contracts,date(c.first_contract_date),num(c.tenure_years),c.country,c.region,c.recurring_plans,c.editions,c.channels,null,null,null,c.billing_lines?num(c.observed_billing_usd):'n.a.',c.billing_lines,c.price_review_contracts,null,'n.a.',c.cohort,c.status]),{widths:[16,19,17,16,28,19,45,30,23,24,24,24,24,20,22,28,18,18,53]});
put('Customers','A5',source+' Observed billed value is partial history, not full lifetime value.');format('Customers',['C'],'dd-mmm-yy');format('Customers',['D'],'0.0');format('Customers',['J','K','L','M','P']);
formulas('Customers','J',r=>`=SUMIFS(${range('Contracts','Y')},${range('Contracts','B')},A${r},${range('Contracts','G')},1)`);
formulas('Customers','K',r=>`=J${r}/12`);formulas('Customers','L',r=>`=SUMIFS(${range('Contracts','AA')},${range('Contracts','B')},A${r},${range('Contracts','G')},1)`);

init('Assumptions','Annual forecast assumptions','Working horizon: calendar years 2027–2029. Scenario outputs are not an approved management forecast.',29,20,10);
put('Assumptions','C5','Case selector');put('Assumptions','D5',1);s.Assumptions.getRange('D5').format.font.color=blue;
s.Assumptions.getRange('D5').dataValidation={rule:{type:'whole',operator:'between',formula1:1,formula2:3}};
form('Assumptions','F5','=CHOOSE(D5,"Flat baseline","Management","Downside")');
put('Assumptions','C7','1 Flat baseline   2 Management   3 Downside');
s.Assumptions.getRange('F8:H8').values=[[2027,2028,2029]];
for(const [r,t] of [[10,'Active base retention'],[11,'Flat baseline'],[12,'Management'],[13,'Downside'],[16,'Active modeled expansion'],[17,'Flat baseline'],[18,'Management'],[19,'Downside']])put('Assumptions','C'+r,t);
for(const [i,y] of [2027,2028,2029].entries()){
 const c=col(5+i);put('Assumptions',c+'11',1);put('Assumptions',c+'17',0);
 form('Assumptions',c+'10',`=IF(CHOOSE($D$5,ISNUMBER(${c}11),ISNUMBER(${c}12),ISNUMBER(${c}13)),CHOOSE($D$5,${c}11,${c}12,${c}13),"n.a.")`);
 form('Assumptions',c+'16',`=IF(CHOOSE($D$5,ISNUMBER(${c}17),ISNUMBER(${c}18),ISNUMBER(${c}19)),CHOOSE($D$5,${c}17,${c}18,${c}19),"n.a.")`);
}
s.Assumptions.getRange('F10:H19').setNumberFormat(pct);
for(const r of [11,12,13,17,18,19]){s.Assumptions.getRange(`F${r}:H${r}`).format.font.color=blue;s.Assumptions.getRange(`F${r}:H${r}`).format.fill=amber;}
for(const r of [11,12,13])s.Assumptions.getRange(`F${r}:H${r}`).dataValidation={rule:{type:'decimal',operator:'between',formula1:0,formula2:1}};
for(const r of [17,18,19])s.Assumptions.getRange(`F${r}:H${r}`).dataValidation={rule:{type:'decimal',operator:'between',formula1:0,formula2:10}};
put('Assumptions','C22','Flat baseline explicitly assumes renewal and unchanged September 6 ARR through December 2026 and into 2027.');
put('Assumptions','C23','Annual retention applies on January 1. Modeled expansion begins January 1 and is disabled where included named events exist.');
put('Assumptions','C24','Quotes start excluded. Enter reviewed net USD terms, probability, dates, overlap key and one-time amount before inclusion.');
put('Assumptions','C25','Source probabilities are preserved, not calibrated. Signed evidence requires separate review; 100% is not proof of signature.');
put('Assumptions','C26','Blue cells are editable. Amber cells require review. Blank inputs differ from a valid zero. Forecast FX is fixed at September 6.');
put('Assumptions','C27','Management and Downside inputs are deliberately blank. No retention, headroom or growth assumptions are invented.');
put('Assumptions','C28','Source: user-approved scope; working horizon and flat assumptions documented in the frozen review model.');
s.Assumptions.getRange('C1:C29').format.columnWidth=30;

init('Forecast Inputs','Annual forecast event inputs','One event/year. Full replacement renewals replace retained base; expansion is incremental. No source quote is included automatically.',events.length+8,18,23,'A');
table('Forecast Inputs',['Event ID','Customer/prospect ID','Year','Component','Evidence layer','Net ARR USD input','Probability','Service start','Service end','One-time USD input','Include 0/1','Reviewed 0/1','Overlap key','Source order ID','Evidence / note','Input status','In-year fraction','Weighted ARR','Closing ARR change','In-year recurring change','Weighted one-time','Retained baseline','After-start fraction'],events.map(e=>[e.event_id,e.customer_id,e.year,e.component,e.layer,num(e.arr_usd),num(e.probability),date(e.service_start),date(e.service_end),num(e.one_time_usd),e.include,e.reviewed,e.overlap_key,e.source_order_id,e.evidence,null,null,null,null,null,null,null,null]),{widths:[25,23,12,20,20,22,16,17,17,22,15,17,26,19,60,29,18,22,23,25,22,23,22]});
put('Forecast Inputs','A5',source+' Pipeline and management inputs are editable working copies; save reviewed versions before warehouse refresh.');
format('Forecast Inputs',['H','I'],'dd-mmm-yy');format('Forecast Inputs',['F','J','R','S','T','U','V']);format('Forecast Inputs',['G','Q','W'],pct);
for(const c of ['A','B','C','D','E','F','G','H','I','J','K','L','M','O'])s['Forecast Inputs'].getRange(`${c}8:${c}${refs['Forecast Inputs'].last}`).format.font.color=blue;
for(const c of ['K','L'])s['Forecast Inputs'].getRange(`${c}8:${c}${refs['Forecast Inputs'].last}`).dataValidation={rule:{type:'whole',operator:'between',formula1:0,formula2:1}};
s['Forecast Inputs'].getRange(`D8:D${refs['Forecast Inputs'].last}`).dataValidation={rule:{type:'list',values:['replacement','expansion','new']}};
s['Forecast Inputs'].getRange(`E8:E${refs['Forecast Inputs'].last}`).dataValidation={rule:{type:'list',values:['open pipeline','signed','management']}};
s['Forecast Inputs'].getRange(`G8:G${refs['Forecast Inputs'].last}`).dataValidation={rule:{type:'decimal',operator:'between',formula1:0,formula2:1}};

const forecastIds=[...new Set([...customers.map(c=>c.customer_id),...events.map(e=>e.customer_id)])].sort();
console.log('Building annual forecast',forecastIds.length,'customers/prospects');
const fr=forecastIds.flatMap(id=>[2027,2028,2029].map(y=>[id+'-'+y,id,y,null,null,null,null,null,null,null,null,null,null,null,null,null]));
init('Annual Forecast','Annual customer revenue scenarios','Opening ARR uses a flat September-to-January bridge. Forecast revenue is service-timed, not invoicing or signed backlog.',fr.length+8,20,18,'A');
table('Annual Forecast',['Customer-year key','Customer ID','Year','Opening ARR','Retention factor','Retained ARR','Lost/contraction ARR','Modeled expansion ARR','Named event ARR change','Closing ARR','Retained base revenue','Modeled expansion revenue','Named event recurring change','One-time revenue','Total scenario revenue','Input status'],fr,{widths:[25,20,12,23,18,23,24,26,26,23,25,28,30,23,25,40]});
put('Annual Forecast','A5','Case selected:');form('Annual Forecast','C5',"='Assumptions'!F5");
const F=refs['Forecast Inputs'];const ER=c=>range('Forecast Inputs',c);const FR=c=>range('Annual Forecast',c);
formulas('Forecast Inputs','V',r=>`=IF(COUNTIFS(${FR('A')},B${r}&"-"&C${r})=1,INDEX(${FR('F')},MATCH(B${r}&"-"&C${r},${FR('A')},0)),"n.a.")`);
// Input status never consumes forecast outputs: this keeps the calculation graph acyclic.
formulas('Forecast Inputs','P',r=>{
 const tests=[
  [`K${r}=0`,'Excluded'],
  [`OR(K${r}<>1,L${r}<>1)`,'Review required'],
  [`OR(A${r}="",B${r}="",M${r}="",O${r}="",COUNTIFS(${FR('A')},B${r}&"-"&C${r})<>1)`,'Missing ID/year/evidence'],
  [`OR(C${r}<2027,C${r}>2029,NOT(ISNUMBER(F${r})),NOT(ISNUMBER(G${r})),NOT(ISNUMBER(H${r})),NOT(ISNUMBER(I${r})),NOT(ISNUMBER(J${r})))`,'Missing amount/date'],
  [`OR(F${r}<0,G${r}<0,G${r}>1,J${r}<0,I${r}<H${r},YEAR(H${r})<>C${r},I${r}<DATE(C${r},1,1))`,'Invalid value/date'],
  [`OR(COUNTIFS(${ER('A')},A${r},${ER('K')},1)>1,COUNTIFS(${ER('M')},M${r},${ER('K')},1)>1)`,'Duplicate event/overlap'],
  [`AND(D${r}="replacement",COUNTIFS(${ER('B')},B${r},${ER('C')},C${r},${ER('D')},"replacement",${ER('K')},1)>1)`,'Multiple replacements'],
  [`NOT(OR(E${r}="open pipeline",E${r}="signed",E${r}="management"))`,'Invalid evidence layer']
 ];
 return '='+tests.reduceRight((tail,[test,label])=>`IF(${test},"${label}",${tail})`,`IF(OR(D${r}="replacement",D${r}="expansion",D${r}="new"),"Ready","Invalid component")`);
});
put('Forecast Inputs','S7','Weighted year-end ARR');put('Forecast Inputs','T7','Weighted service revenue');put('Forecast Inputs','V7','Retained base (reference)');
formulas('Forecast Inputs','Q',r=>`=IF(P${r}="Ready",MAX(0,MIN(I${r},DATE(C${r},12,31))-MAX(H${r},DATE(C${r},1,1))+1)/(DATE(C${r}+1,1,1)-DATE(C${r},1,1)),0)`);
formulas('Forecast Inputs','W',r=>`=IF(P${r}="Ready",MAX(0,DATE(C${r},12,31)-MAX(H${r},DATE(C${r},1,1))+1)/(DATE(C${r}+1,1,1)-DATE(C${r},1,1)),0)`);
formulas('Forecast Inputs','R',r=>`=IF(P${r}="Ready",F${r}*G${r},0)`);
formulas('Forecast Inputs','S',r=>`=IF(P${r}="Ready",IF(I${r}>=DATE(C${r},12,31),R${r},0),0)`);
formulas('Forecast Inputs','T',r=>`=IF(P${r}="Ready",R${r}*Q${r},0)`);
formulas('Forecast Inputs','U',r=>`=IF(P${r}="Ready",J${r}*G${r},0)`);
batchForecast=true;
for(const [i,row] of fr.entries()){
 const r=i+8,id=row[1],y=row[2],ac=col(5+y-2027);
 form('Annual Forecast','D'+r,y===2027?`=SUMIFS(${range('Customers','J')},${range('Customers','A')},B${r})`:`=IF(AND(B${r-1}=B${r},C${r-1}=C${r}-1),J${r-1},"n.a.")`);
 form('Annual Forecast','E'+r,`='Assumptions'!${ac}10`);
 form('Annual Forecast','F'+r,`=IF(AND(ISNUMBER(D${r}),ISNUMBER(E${r})),D${r}*E${r},"n.a.")`);
 form('Annual Forecast','G'+r,`=IF(ISNUMBER(F${r}),D${r}-F${r},"n.a.")`);
 form('Annual Forecast','H'+r,`=IF(AND(ISNUMBER(F${r}),ISNUMBER('Assumptions'!${ac}16)),IF(COUNTIFS(${ER('B')},B${r},${ER('C')},C${r},${ER('K')},1)>0,0,F${r}*'Assumptions'!${ac}16),"n.a.")`);
 form('Annual Forecast','I'+r,`=IF(ISNUMBER(F${r}),SUMIFS(${ER('S')},${ER('B')},B${r},${ER('C')},C${r})-IF(COUNTIFS(${ER('B')},B${r},${ER('C')},C${r},${ER('D')},"replacement",${ER('K')},1)>0,F${r},0),"n.a.")`);
 form('Annual Forecast','P'+r,`=IF(OR(NOT(ISNUMBER(F${r})),NOT(ISNUMBER(H${r}))),"Missing scenario inputs",IF(COUNTIFS(${ER('B')},B${r},${ER('C')},C${r},${ER('K')},1,${ER('P')},"<>Ready")>0,"Review included events","Calculated scenario; not approved"))`);
 form('Annual Forecast','J'+r,`=IF(P${r}="Calculated scenario; not approved",F${r}+H${r}+I${r},"n.a.")`);
 form('Annual Forecast','K'+r,`=F${r}`);form('Annual Forecast','L'+r,`=H${r}`);
 form('Annual Forecast','M'+r,`=IF(ISNUMBER(F${r}),SUMIFS(${ER('T')},${ER('B')},B${r},${ER('C')},C${r})-F${r}*SUMIFS(${ER('W')},${ER('B')},B${r},${ER('C')},C${r},${ER('D')},"replacement"),"n.a.")`);
 form('Annual Forecast','N'+r,`=SUMIFS(${ER('U')},${ER('B')},B${r},${ER('C')},C${r})`);
 form('Annual Forecast','O'+r,`=IF(P${r}="Calculated scenario; not approved",SUM(K${r}:N${r}),"n.a.")`);
} 
batchForecast=false;
s['Annual Forecast'].getRange(`D8:P${refs['Annual Forecast'].last}`).formulas=forecastFormulas;
for(const c of ['D','E','H','I','M','N','P'])s['Annual Forecast'].getRange(`${c}8:${c}${refs['Annual Forecast'].last}`).format.font.color=green;
format('Annual Forecast',['D','F','G','H','I','J','K','L','M','N','O']);format('Annual Forecast',['E'],pct);
formulas('Customers','P',r=>`=IF(COUNTIFS(${FR('B')},A${r},${FR('P')},"<>Calculated scenario; not approved")>0,"n.a.",SUMIFS(${FR('O')},${FR('B')},A${r}))`);

init('Revenue','Net invoiced revenue','Calendar years. 2026 covers January–August only. USD at fixed invoice-date FX; all amounts exclude tax.',34,20,12);
table('Revenue',['Period','Net invoiced USD','Recurring USD','Non-recurring USD','Unclassified USD','Unmapped customer USD','Mapped absolute share','Product lines'],Array.from({length:8},(_,i)=>[2019+i,null,null,null,null,null,null,null]),{start:2,widths:[16,23,23,23,23,25,23,17]});
const IR=c=>range('Invoice Lines',c);
for(let r=8;r<=15;r++){
 const filt=`,${IR('M')},1,${IR('C')},">="&DATE(C${r},1,1),${IR('C')},"<"&DATE(C${r}+1,1,1)`;
 form('Revenue','D'+r,`=SUMIFS(${IR('Q')}${filt})`);
 for(const [c,kind] of [['E','recurring'],['F','non-recurring'],['G','unknown']])form('Revenue',c+r,`=SUMIFS(${IR('Q')}${filt},${IR('S')},"${kind}")`);
 form('Revenue','H'+r,`=SUMIFS(${IR('Q')}${filt},${IR('E')},"UNRESOLVED")`);
 const yr=r+2011,rows=inv.filter(f=>f.in_reporting_total&&f.invoice_date.startsWith(String(yr)));
 const abs=rows.reduce((a,f)=>a+Math.abs(num(f.revenue_usd)),0),unknown=rows.filter(f=>f.customer_id==='UNRESOLVED').reduce((a,f)=>a+Math.abs(num(f.revenue_usd)),0);
 put('Revenue','I'+r,abs?(abs-unknown)/abs:null);
 form('Revenue','J'+r,`=COUNTIFS(${IR('M')},1,${IR('C')},">="&DATE(C${r},1,1),${IR('C')},"<"&DATE(C${r}+1,1,1))`);
}
format('Revenue',['D','E','F','G','H']);format('Revenue',['I'],pct);
put('Revenue','C18','Matched January–August comparison');s.Revenue.getRange('C20:F20').values=[['Period','Net billed USD','Change USD','Change %']];
for(const [r,y] of [[21,2025],[22,2026]]){put('Revenue','C'+r,y);form('Revenue','D'+r,`=SUMIFS(${IR('Q')},${IR('M')},1,${IR('C')},">="&DATE(C${r},1,1),${IR('C')},"<"&DATE(C${r},9,1))`);}
form('Revenue','E22','=D22-D21');form('Revenue','F22','=IF(D21=0,"n.a.",D22/D21-1)');s.Revenue.getRange('D21:E22').setNumberFormat(money);s.Revenue.getRange('F22').setNumberFormat(pct);
put('Revenue','C25','Mapped share uses absolute line USD so credits cannot artificially improve coverage.');put('Revenue','C26','Recurring classification uses product-template flags at the source snapshot; historical classification changes are unknown.');
put('Revenue','C27','Unmapped amounts remain in total billed revenue. No billed reseller or delivery address is substituted as an end customer.');
s.Revenue.getRange('C29:G29').values=[['Issuer','2025 net billed USD','Jan–Aug 2025 USD','Jan–Aug 2026 USD','YTD change USD']];
for(const [i,id] of [2,3,5].entries()){const r=30+i;put('Revenue','C'+r,id);form('Revenue','D'+r,`=SUMIFS(${IR('Q')},${IR('D')},C${r},${IR('M')},1,${IR('C')},">="&DATE(2025,1,1),${IR('C')},"<"&DATE(2026,1,1))`);for(const [c,y] of [['E',2025],['F',2026]])form('Revenue',c+r,`=SUMIFS(${IR('Q')},${IR('D')},C${r},${IR('M')},1,${IR('C')},">="&DATE(${y},1,1),${IR('C')},"<"&DATE(${y},9,1))`);form('Revenue','G'+r,`=F${r}-E${r}`);}s.Revenue.getRange('D30:G32').setNumberFormat(money);s.Revenue.getRange('C29:G29').format={fill:navy,font:{color:'#FFFFFF',bold:true},wrapText:true,rowHeight:38};

init('Growth','Observed customer billing growth','2024 vs 2025 and matched January–August. Includes inactive accounts. Billing changes are not ARR expansion, churn or NRR.',growth.length+8,20,15,'A');
table('Growth',['Customer ID','Current customer','2024 billed USD','2025 billed USD','Change USD','Change %','2024/25 observation','Jan–Aug 2025 USD','Jan–Aug 2026 USD','YTD change USD','YTD change %','YTD observation','Current ARR provisional','Tenure years','Account headroom'],growth.map(g=>[g.customer_id,g.current_customer?1:0,g.lines_2024?num(g.billing_2024):null,g.lines_2025?num(g.billing_2025):null,null,null,null,g.lines_jan_aug_2025?num(g.billing_jan_aug_2025):null,g.lines_jan_aug_2026?num(g.billing_jan_aug_2026):null,null,null,null,num(g.net_arr_usd),num(g.tenure_years),g.headroom]),{widths:[18,20,23,23,23,18,47,25,25,25,20,47,26,18,48]});
put('Growth','A5',source+' No observed bill is missing coverage, not a certified zero or lost customer.');
formulas('Growth','E',r=>`=IF(AND(ISNUMBER(C${r}),ISNUMBER(D${r})),D${r}-C${r},"n.a.")`);
formulas('Growth','F',r=>`=IF(AND(ISNUMBER(E${r}),C${r}>0),E${r}/C${r},"n.a.")`);
formulas('Growth','G',r=>`=IF(NOT(ISNUMBER(E${r})),"Missing attributed billing in one/both periods",IF(E${r}>0.02,"Higher observed billing",IF(E${r}<-0.02,"Lower observed billing","Stable within rounding")))`);
formulas('Growth','J',r=>`=IF(AND(ISNUMBER(H${r}),ISNUMBER(I${r})),I${r}-H${r},"n.a.")`);
formulas('Growth','K',r=>`=IF(AND(ISNUMBER(J${r}),H${r}>0),J${r}/H${r},"n.a.")`);
formulas('Growth','L',r=>`=IF(NOT(ISNUMBER(J${r})),"Missing attributed billing in one/both periods",IF(J${r}>0.02,"Higher observed billing",IF(J${r}<-0.02,"Lower observed billing","Stable within rounding")))`);
format('Growth',['C','D','E','H','I','J','M']);format('Growth',['F','K'],pct);format('Growth',['N'],'0.0');

init('Mix and Cohorts','Portfolio mix, concentration and tenure','Current portfolio at September 6. All ARR figures use the provisional line-net basis. Tenure does not prove retention.',65,20,13);
let rr=7;
const mixed=[];
for(const [dimension,field] of [['Issuer','C'],['Edition','K'],['Channel','L']]){
 const sourceField={C:'issuer_id',K:'edition',L:'channel'}[field];
 for(const val of [...new Set(contracts.filter(c=>c.current_portfolio).map(c=>c[sourceField]))].sort())mixed.push([dimension,val,null,null]);
}
table('Mix and Cohorts',['Dimension','Category','Net ARR USD','Contract count'],mixed,{start:2,widths:[20,27,24,22]});
mixed.forEach((row,i)=>{const r=8+i,field={Issuer:'C',Edition:'K',Channel:'L'}[row[0]];form('Mix and Cohorts','E'+r,`=SUMIFS(${range('Contracts','Y')},${range('Contracts','G')},1,${range('Contracts',field)},D${r})`);form('Mix and Cohorts','F'+r,`=COUNTIFS(${range('Contracts','G')},1,${range('Contracts',field)},D${r})`);});format('Mix and Cohorts',['E']);
put('Mix and Cohorts','H7','Customer concentration');s['Mix and Cohorts'].getRange('H9:J9').values=[['Top customers','Provisional ARR USD','Share of ARR']];
for(const [i,n] of [1,3,5,10].entries()){const r=10+i;put('Mix and Cohorts','H'+r,n);form('Mix and Cohorts','I'+r,`=SUM('Customers'!J8:J${7+n})`);form('Mix and Cohorts','J'+r,`=I${r}/SUM(${range('Customers','J')})`);}
s['Mix and Cohorts'].getRange('I10:I13').setNumberFormat(money);s['Mix and Cohorts'].getRange('J10:J13').setNumberFormat(pct);
put('Mix and Cohorts','H16','Relationship age');s['Mix and Cohorts'].getRange('H18:J18').values=[['Years or more','Current customers','Provisional ARR USD']];
for(const [i,n] of [3,4,5].entries()){const r=19+i;put('Mix and Cohorts','H'+r,n);form('Mix and Cohorts','I'+r,`=COUNTIFS(${range('Customers','D')},">="&H${r},${range('Customers','B')},">0")`);form('Mix and Cohorts','J'+r,`=SUMIFS(${range('Customers','J')},${range('Customers','D')},">="&H${r},${range('Customers','B')},">0")`);}s['Mix and Cohorts'].getRange('J19:J21').setNumberFormat(money);
put('Mix and Cohorts','C30','Contract acquisition cohorts');s['Mix and Cohorts'].getRange('C32:F32').values=[['First contract year','Observed customers','Current customers','Current ARR USD']];
for(let y=2016;y<=2026;y++){const r=y-1983;put('Mix and Cohorts','C'+r,y);form('Mix and Cohorts','D'+r,`=COUNTIFS(${range('Customers','R')},C${r})`);form('Mix and Cohorts','E'+r,`=COUNTIFS(${range('Customers','R')},C${r},${range('Customers','B')},">0")`);form('Mix and Cohorts','F'+r,`=SUMIFS(${range('Customers','J')},${range('Customers','R')},C${r})`);}s['Mix and Cohorts'].getRange('F33:F43').setNumberFormat(money);
put('Mix and Cohorts','H30','Current customer geography');s['Mix and Cohorts'].getRange('H32:J32').values=[['Region','Current customers','Current ARR USD']];
for(const [i,g] of ['UAE','KSA','Other GCC','EU','Rest of World','Unknown'].entries()){const r=33+i;put('Mix and Cohorts','H'+r,g);form('Mix and Cohorts','I'+r,`=COUNTIFS(${range('Customers','F')},H${r},${range('Customers','B')},">0")`);form('Mix and Cohorts','J'+r,`=SUMIFS(${range('Customers','J')},${range('Customers','F')},H${r})`);}s['Mix and Cohorts'].getRange('J33:J38').setNumberFormat(money);
put('Mix and Cohorts','C46','Cohort counts are observed commercial relationships, not survival rates. Unmapped invoice customers are outside these counts.');
put('Mix and Cohorts','C47','Current attributes classify history. Corporate-group, deployment and industry rollups are unavailable without reviewed mappings.');

init('Pipeline Register','Odoo quotation review inventory','Open source quotations are not validated opportunities. All are excluded from forecast until reviewed.',pipeline.length+8,20,16,'A');
table('Pipeline Register',['Order ID','Customer ID','Issuer ID','Order state','Lifecycle','Recurring Plan','Currency','Recurring period txn','Candidate ARR USD','Source probability','Service start','Service end','Expected invoice date','Parent order','Opportunity ID','Review required'],pipeline.map(p=>[p.order_id,p.customer_id,p.issuer_id,p.state,p.lifecycle,p.recurring_plan,p.currency,num(p.recurring_period_txn),num(p.candidate_arr_usd),num(p.probability_source),date(p.service_start),date(p.service_end),date(p.expected_invoice_date),p.parent_order_id,p.opportunity_id,p.review_reason]),{widths:[15,18,13,17,22,35,13,24,25,22,18,18,24,18,18,73]});
put('Pipeline Register','A5',source);format('Pipeline Register',['H','I']);format('Pipeline Register',['J'],pct);format('Pipeline Register',['K','L','M'],'dd-mmm-yy');
init('Price Review','Channel price reconciliation','All nine custom-price cases. Matching recurring invoices corroborate four; five remain unresolved.',20,22,7,'A');
table('Price Review',['Order ID','Customer ID','Recurring net txn','Channel discount txn','Matching invoice IDs','Linked recurring invoice amounts','Conclusion'],price.map(p=>[p.order_id,p.customer_id,num(p.recurring_net_txn),num(p.channel_discount_txn),p.exact_recurring_invoice_ids,p.linked_recurring_invoice_amounts,p.status]),{widths:[15,18,23,26,29,75,65]});
put('Price Review','A5',source+' Original currency is on Contracts.');format('Price Review',['C','D'],cents);
init('FX','Fixed invoice and snapshot FX','Company-specific as-of rates. Missing conversions are not replaced by 1 except native USD identity.',fx.length+8,19,9,'A');
table('FX',['Issuer ID','Currency ID','FX date','Rate to USD','FX status','Source rate ID','USD rate ID','Source rate','USD rate'],fx.map(f=>[num(f.company_id),num(f.currency_id),date(f.fx_date),num(f.rate_to_usd),f.fx_status,num(f.source_rate_id),num(f.usd_rate_id),num(f.source_rate),num(f.usd_rate)]),{widths:[16,18,18,25,37,22,22,23,23]});put('FX','A5',source);format('FX',['C'],'dd-mmm-yy');format('FX',['D','H','I'],'0.000000000');

init('Overview','Circularo customer revenue analysis','Internal review. Billing through 31-Aug-2026. Contractual portfolio at 06-Sep-2026. USD, excluding tax.',44,18,15);
s.Overview.tabColor=navy;s.Assumptions.tabColor='#52738C';
s.Overview.getRange('C1:C44').format.columnWidth=46;s.Overview.getRange('D1:D44').format.columnWidth=23;
const metrics=[['Provisional net contractual ARR',`=SUM(${range('Customers','J')})`],['Provisional net contractual MRR',`=SUM(${range('Customers','K')})`],['End-customer ARR proxy',`=SUM(${range('Customers','L')})`],['Current end customers',`=COUNTIFS(${range('Customers','B')},">0")`],['Effective subscription contracts',`=SUM(${range('Customers','B')})`],['2025 net invoiced revenue',"='Revenue'!D14"],['Jan–Aug 2026 net invoiced revenue',"='Revenue'!D22"],['Jan–Aug invoiced growth',"='Revenue'!F22"]];
metrics.forEach(([label,f],i)=>{put('Overview','C'+(7+i),label);form('Overview','D'+(7+i),f,true);});s.Overview.getRange('D7:D9').setNumberFormat(money);s.Overview.getRange('D12:D13').setNumberFormat(money);s.Overview.getRange('D14').setNumberFormat(pct);
put('Overview','C17','Five contracts still require price review. ARR is provisional.');
put('Overview','C18','End-customer value adds back explicit channel discount lines only.');
put('Overview','C19','648 external billing lines lack validated end-customer attribution.');
put('Overview','C20','Portfolio NRR, GRR, logo churn and lifetime CLV: unavailable.');
put('Overview','C21','Observed growth includes both increases and declines; see Growth.');
put('Overview','C24','Annual forecast scenario');put('Overview','C25','Selected case');form('Overview','D25',"='Assumptions'!F5");
s.Overview.getRange('C27:F27').values=[['Year','Closing net ARR USD','In-year revenue USD','Included named events']];
for(const [i,y] of [2027,2028,2029].entries()){
 const r=28+i;put('Overview','C'+r,y);
 form('Overview','D'+r,`=IF(COUNTIFS(${FR('C')},C${r},${FR('P')},"<>Calculated scenario; not approved")>0,"n.a.",SUMIFS(${FR('J')},${FR('C')},C${r}))`,true);
 form('Overview','E'+r,`=IF(COUNTIFS(${FR('C')},C${r},${FR('P')},"<>Calculated scenario; not approved")>0,"n.a.",SUMIFS(${FR('O')},${FR('C')},C${r}))`,true);
 form('Overview','F'+r,`=COUNTIFS(${ER('C')},C${r},${ER('K')},1,${ER('P')},"Ready")`,true);
}s.Overview.getRange('D28:E30').setNumberFormat(money);s.Overview.getRange('C27:F27').format={fill:navy,font:{color:'#FFFFFF',bold:true},wrapText:true,rowHeight:38};
put('Overview','C33','Default = flat renewal scenario, not signed backlog or a growth forecast.');
put('Overview','C34','Management/Downside cases and named events need reviewed inputs.');
put('Overview','C35','Historical billed value and forward service value are shown separately.');
put('Overview','C36','Do not add them to claim lifetime CLV: advance billing may overlap.');
put('Overview','C38','Eight future-start contracts are outside current ARR. Review Contracts before adding them to the forecast.');
// Seven complete calendar years only; matched YTD is a separate comparison.
const chart=s.Overview.charts.add('line',[s.Revenue.getRange('C7:C14'),s.Revenue.getRange('D7:D14')]);
chart.title='Net invoiced revenue, full years (USD millions)';chart.titleTextStyle.typeface='Arial';chart.titleTextStyle.fontSize=13;
chart.hasLegend=false;chart.xAxis={axisType:'textAxis',textStyle:{typeface:'Arial',fontSize:10}};chart.yAxis={numberFormatCode:'$0.0,,"M"',numberFormatSourceLinked:false,textStyle:{typeface:'Arial',fontSize:10}};chart.series.items[0].line={fill:navy,style:'solid',width:2};chart.setPosition('H6','O21');

init('Checks','Independent controls and evidence gaps','Checks are terminal review outputs; they do not drive any financial calculation.',35,22,8);
const billed=inv.filter(f=>f.in_reporting_total).reduce((a,f)=>a+num(f.revenue_usd),0);
const checkrows=[['Net billed total vs independent model',null,billed,null],['Current ARR vs independent model',null,num(summary.candidate_net_arr),null],['End-customer proxy vs model',null,num(summary.candidate_end_customer_arr),null],['Full service allocations vs dated recurring lines',null,alloc.reduce((a,f)=>a+num(f.revenue_usd),0),null],['Current contracts',null,186,null],['Current customers',null,181,null]];
table('Checks',['Check','Workbook result','Independent control','Difference'],checkrows,{start:2,widths:[52,25,25,22]});
form('Checks','D8',`=SUMIFS(${IR('Q')},${IR('M')},1)`);form('Checks','D9',`=SUM(${range('Customers','J')})`);form('Checks','D10',`=SUM(${range('Customers','L')})`);form('Checks','D11',`=SUM(${range('Service Allocations','F')})`);form('Checks','D12',`=SUM(${range('Customers','B')})`);form('Checks','D13',`=COUNTIFS(${range('Customers','B')},">0")`);
for(let r=8;r<=13;r++)form('Checks','F'+r,`=D${r}-E${r}`);s.Checks.getRange('D8:F13').setNumberFormat('0.00');s.Checks.getRange('F8:F13').format.font.color=ink;
s.Checks.getRange('F8:F13').conditionalFormats.addCustom('ABS(F8)>0.02',{fill:'#FDE9E7',font:{bold:true,color:'#9C0006'}});
const checks=[['Source tables frozen and field-verified',13],['Posted header discrepancies > 0.02',0],['Active renewal-family overlaps',summary.active_family_overlap_ids.length],['Remaining price-review contracts',summary.price_review_contracts.length],['Missing/invalid service-date lines',summary.counts.missing_service_periods],['Negative customer-month contributions',summary.negative_customer_months],['Unmapped external invoice lines',648],['Recurring billing without valid service dates USD',num(summary.missing_period_usd)],['Future service from billed recurring invoices USD',num(summary.allocation_timing.future_service)],['Native Excel recalculation','Not exercised; artifact engine tested']];
checks.forEach(([l,v],i)=>{put('Checks','C'+(17+i),l);put('Checks','E'+(17+i),v);});s.Checks.getRange('E24:E25').setNumberFormat(money);

init('ReadMe','Definitions, limitations and refresh','Source snapshot September 6, 2026. Billing through August 31. Internal review only.',45,22,9);
s.ReadMe.tabColor='#9DAAB5';s.ReadMe.getRange('C1:C45').format.columnWidth=32;s.ReadMe.getRange('D1:D45').format.columnWidth=115;
const notes=[
 ['Scope','Issuers 2 International, 3 current Europe, 5 MENA. Intercompany commercial partners 8, 9, 10, 11, 663 excluded. Circularo Digital 231 external.'],
 ['Headline basis','Recurring order-line subtotals include negative channel-discount products. Annualize by plan interval at snapshot FX. Do not deduct custom discounts twice.'],
 ['Price evidence','Four custom-channel cases match recurring invoice amounts; five remain under review. All headline ARR, mix and forecast baseline values are provisional.'],
 ['End-customer value','Proxy: net recurring line sum plus explicit recurring reseller/distributor discount lines. Not verified final resale value; end-customer discounts remain deducted.'],
 ['Invoiced revenue','Posted invoice product lines less credit notes; tax excluded. Full header/line and ledger checks pass. Unmapped end customers remain in total revenue.'],
 ['Dates and currency','Invoice-date company-specific as-of FX for billing and service allocations. September 6 FX for contractual ARR and forward input candidates.'],
 ['Historical allocation','Each full month has weight 1; partial months use covered days divided by days in that month. Normalize weights over the complete service horizon.'],
 ['Service revenue','Invoice-backed analytical allocation, not accounting recognition. Negative customer-months and missing dates remain visible. Future allocations are not future actual billing.'],
 ['Retention feasibility','Portfolio NRR, GRR, churn, logo survival and historic ARR bridges are unavailable: attribution, service completeness and evidenced closing zeros are insufficient.'],
 ['Growth evidence','Compare 2024/2025 and matched January–August billing. Include inactive customers and declines. Missing attributed billing is not certified zero or churn.'],
 ['Customer value','Observed invoiced value is partial history since 2019. Forward value is 2027–2029 scenario service revenue. Do not add the two or call either full-lifetime CLV.'],
 ['Headroom','No verified addressable seats/entities or management account plans were supplied. Quantified account headroom remains unknown. Historical growth is not a forecast guarantee.'],
 ['Tenure and cohorts','Earliest qualifying first-contract/start date. Current customers are ongoing relationships. Cohort counts and tenure do not establish uninterrupted retention.'],
 ['Channel and Edition','Preserve order Direct Sales record-equality semantics. Ultimate reports as Enterprise; raw Edition and exact Recurring Plan remain in Contracts.'],
 ['Forecast baseline','2027 opening assumes September 6 ARR carried unchanged through year-end 2026. Flat scenario assumes renewal at the same net rate even beyond recorded term ends.'],
 ['Forecast mechanics','One customer-year model. January 1 retained base plus modeled expansion plus named event changes. Prior closing ARR feeds next opening. No monthly forecast entry.'],
 ['Replacements','A reviewed replacement removes the retained baseline from its effective date and adds the probability-weighted full renewal value. Expansion rows add only uplift.'],
 ['Named-event timing','Inclusive daily service fraction with actual leap-year length. Closing ARR tests year-end activity. One-time amounts affect revenue only, never ARR.'],
 ['Overlap controls','Included event and overlap keys are unique across all years; enter each uplift once, in its start year. Multiple customer-year replacements are rejected. Named events disable generic expansion for that customer-year.'],
 ['Forecast editing','Choose a case in Assumptions. Review blue Forecast Inputs, then set Reviewed and Include to 1. Keep calculated Annual Forecast rows in their generated customer/year order; a broken prior-year key returns n.a. Five PROSPECT slots are available.'],
 ['Missing values','n.a. is unavailable, not zero. Excluded quotes do not enter totals. A selected case with missing inputs produces unavailable forecast outputs.'],
 ['Forecast limitations','No validated forecast billing schedule or statistical probability calibration. No fitted lifetime tail or accuracy claim. Cases are reviewable scenarios, not approved projections.'],
 ['Sources and reproduction','Frozen sandbox prefix m_capital__r1_20260925_; source generation 176. Run manifests retain exact source JSON, native fields, hashes, model code and FX lineage.'],
 ['Refresh','Rerun against a new approved frozen snapshot/version. Preserve edited event IDs and assumptions by stable keys; do not overwrite reviewed inputs or prior issued evidence.'],
 ['Privacy and distribution','Customer IDs are retained without names. Investor publication and customer-name disclosure require business review. No source or production objects were modified.'],
 ['Validation','Original-currency headers, signs, scope, FX, source hashes, active families and full-horizon allocation conservation tested. Formula/input, export and visual QA recorded separately.'],
 ['Excluded data','No sales-order event-log data or downstream log-derived metrics used. Pre-2019 revenue, unexplained sample-export filters and unsupported classification mappings are not invented.']
];
notes.forEach(([a,b],i)=>{put('ReadMe','C'+(7+i),a);put('ReadMe','D'+(7+i),b);});s.ReadMe.getRange(`D7:D${6+notes.length}`).format.wrapText=true;s.ReadMe.getRange(`C7:D${6+notes.length}`).format.rowHeight=42;
for(const n of ['Forecast Inputs','Annual Forecast'])warning(n,`${n==='Forecast Inputs'?'P':'P'}8:P${refs[n].last}`);
for(const [n,cols] of [['Contracts',['I','X']],['Customers',['G','H','I','S']],['Invoice Lines',['H','J']],['Products',['E']],['Price Review',['F','G']]]){
 for(const c of cols)s[n].getRange(`${c}8:${c}${refs[n].last}`).format.wrapText=true;
 s[n].getRange(`A8:${col(refs[n].heads.length-1)}${refs[n].last}`).format.rowHeight=38;
}
// All sheets are populated before final calculation and behavioral tests.
console.log('Recalculating and testing formulas');
wb.recalculate();
const value=(n,a)=>s[n].getRange(a).values[0][0];
console.log('Initial forecast diagnostic',JSON.stringify({retention:value('Assumptions','F10'),expansion:value('Assumptions','F16'),firstYear:s['Annual Forecast'].getRange('D8:P8').values,overview:value('Overview','D28')}));
const close=(a,b,tag)=>assert(Math.abs(Number(a)-Number(b))<0.02,`${tag}: ${a} != ${b}`);
close(value('Overview','D7'),num(summary.candidate_net_arr),'ARR');close(value('Overview','D28'),num(summary.candidate_net_arr),'Flat close');
for(let r=8;r<=13;r++)close(value('Checks','F'+r),0,'Check '+r);
const actualBefore=value('Overview','D13');
// Case selection: missing selected assumptions must propagate, not be reported as zero.
if(!presentationOnly){
put('Assumptions','D5',2);wb.recalculate();console.log('Changed case diagnostic',JSON.stringify({case:value('Assumptions','F5'),retention:value('Assumptions','F10'),expansion:value('Assumptions','F16'),firstYear:s['Annual Forecast'].getRange('D8:P8').values,overview:value('Overview','D28')}));assert.equal(value('Overview','D28'),'n.a.');put('Assumptions','D5',1);
// Zero retention is valid and affects one year plus carry-forward.
put('Assumptions','G11',0);wb.recalculate();close(value('Overview','D29'),0,'Zero retention');close(value('Overview','D30'),0,'Carry forward');put('Assumptions','G11',1);
// One included editable event: delay, zero/missing probability, leap year, duplicate key and replacement.
const ei=events.findIndex(e=>e.event_id==='MANUAL-2028-1')+8;
const saved=s['Forecast Inputs'].getRange(`A${ei}:O${ei}`).values;
const setEvent=(changes)=>{for(const [c,v] of Object.entries(changes))put('Forecast Inputs',c+ei,v);wb.recalculate();};
setEvent({F:12000,G:1,H:date('2028-07-01'),I:date('2028-12-31'),J:1000,K:1,L:1});
assert.equal(value('Forecast Inputs','P'+ei),'Ready');close(value('Forecast Inputs','T'+ei),12000*184/366,'Leap timing');close(value('Forecast Inputs','S'+ei),12000,'New close');
setEvent({G:0});close(value('Forecast Inputs','T'+ei),0,'Zero probability');setEvent({G:null});assert.equal(value('Forecast Inputs','P'+ei),'Missing amount/date');
setEvent({G:1,H:date('2028-12-31')});close(value('Forecast Inputs','T'+ei),12000/366,'One day');
setEvent({H:date('2028-07-01'),D:'replacement',B:customers[0].customer_id,F:1000,J:0});
const replacementRow=fr.findIndex(r=>r[1]===customers[0].customer_id&&r[2]===2028)+8;
close(value('Annual Forecast','I'+replacementRow),1000-num(customers[0].net_arr_usd),'Replacement removes base');
const ei2=events.findIndex(e=>e.event_id==='MANUAL-2028-2')+8;const saved2=s['Forecast Inputs'].getRange(`A${ei2}:O${ei2}`).values;
s['Forecast Inputs'].getRange(`A${ei2}:O${ei2}`).values=s['Forecast Inputs'].getRange(`A${ei}:O${ei}`).values;wb.recalculate();assert.equal(value('Forecast Inputs','P'+ei),'Duplicate event/overlap');
s['Forecast Inputs'].getRange(`A${ei2}:O${ei2}`).values=saved2;s['Forecast Inputs'].getRange(`A${ei}:O${ei}`).values=saved;
wb.recalculate();
}
close(value('Overview','D13'),actualBefore,'Historical actuals unchanged');close(value('Overview','D28'),num(summary.candidate_net_arr),'Inputs restored');
const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:30},summary:'Final formula error scan'});
await fs.writeFile(path.join(out,'formula-scan.json'),errors.ndjson);
assert(!/#REF!|#DIV\/0!|#VALUE!|#NAME\?|#NUM!|#SPILL!|#CALC!/.test(errors.ndjson),'Unexpected formula error');
const inspect=await wb.inspect({kind:'table',range:'Overview!C7:F30',include:'values,formulas',tableMaxRows:24,tableMaxCols:4,maxChars:4500});
await fs.writeFile(path.join(out,'overview-inspection.json'),inspect.ndjson);
for(const n of names){
 const area=n==='Overview'?'C2:O39':n==='Assumptions'?'C2:H19':n==='ReadMe'?'C2:D15':n==='Mix and Cohorts'?'C2:J22':(refs[n]?.start===2?'C2:J17':'A2:H17');
 const png=await wb.render({sheetName:n,range:area,scale:1,format:'png'});
 await fs.writeFile(path.join(previews,n.replaceAll(' ','-')+'.png'),new Uint8Array(await png.arrayBuffer()));
 console.log('Rendered',n);
}
for(const [n,area,label] of [['Annual Forecast','I7:P17','Annual-Forecast-results'],['Forecast Inputs','P7:W17','Forecast-Inputs-controls'],['Customers','I7:S17','Customers-values'],['Contracts','S7:AF17','Contracts-values-and-IDs'],['Growth','H7:L17','Growth-YTD'],['ReadMe','C16:D33','ReadMe-continuation'],['Mix and Cohorts','C24:F46','Mix-geography-cohorts'],['Assumptions','C21:J29','Assumptions-notes'],['Revenue','C20:H33','Revenue-YTD-issuers']]){
 const png=await wb.render({sheetName:n,range:area,scale:1,format:'png'});
 await fs.writeFile(path.join(previews,label+'.png'),new Uint8Array(await png.arrayBuffer()));
 console.log('Rendered',label);
}
const target=path.join(out,'Circularo Investor Customer Revenue & Retention Analysis.xlsx');
await fs.writeFile(path.join(out,'forecast-result-snapshot.json'),JSON.stringify({scenario:value('Assumptions','F5'),modelVersion:'investor-review-1',headers:refs['Annual Forecast'].heads,rows:s['Annual Forecast'].getRange(`A8:P${refs['Annual Forecast'].last}`).values},null,2));
await (await SpreadsheetFile.exportXlsx(wb)).save(target);
await fs.writeFile(path.join(out,'validation.json'),JSON.stringify({status:'Internal review workbook generated; visual review pending',sourceFreezeVerified:true,fullScenarioSuite:!presentationOnly,scenarioEvidence:presentationOnly?'Prior full suite; native export must verify exact tested formula fingerprint':'Full suite executed in this build',tests:['Independent headline and source controls','Missing selected case','Zero retention and carry-forward','Leap-year daily timing','Probability zero vs blank','One-day timing','Replacement removes base','Duplicate event/overlap rejected','Actuals unchanged','Inputs restored','Formula error scan'],sheets:names,rows:{invoiceLines:inv.length,serviceAllocations:alloc.length,contracts:contracts.length,customers:customers.length,forecastEvents:events.length,forecastCustomerYears:fr.length},nativeExcelRecalculation:'not exercised',builderSha256:crypto.createHash('sha256').update(await fs.readFile(import.meta.filename)).digest('hex')},null,2));
console.log('EXPORTED',target);
