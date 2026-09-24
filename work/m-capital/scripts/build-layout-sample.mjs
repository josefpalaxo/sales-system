import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { Workbook, SpreadsheetFile, FileBlob } from '@oai/artifact-tool';

const root=path.resolve(import.meta.dirname,'..');
const data=JSON.parse(await fs.readFile(path.join(root,'sample-data/layout-sample-extract.json'),'utf8'));
const out=path.join(root,'outputs/layout-sample');
const previews=path.join(root,'previews/excel-sample');
const target=path.join(out,'Circularo Data and Forecast Layout Sample.xlsx');
const previous=await SpreadsheetFile.importXlsx(await FileBlob.load(target));
const unchangedNames=['Contracts','Invoice Lines','Service Detail','Customer Months'];
const preserved=Object.fromEntries(unchangedNames.map(n=>[n,{values:previous.worksheets.getItem(n).getUsedRange().values,formulas:previous.worksheets.getItem(n).getUsedRange().formulas}]));
const reviewNotes=new Map(previous.worksheets.getItem('Review').getRange('A8:D15').values.map(r=>[r[0],r.slice(2)]));
const guideNotes=new Map(previous.worksheets.getItem('Field Guide').getRange('A8:G33').values.map(r=>[r[0]+'|'+r[1],r.slice(5)]));
const rows=k=>data.queries[k].result.data;
const keyed=a=>new Map(a.map(x=>[x.id,x]));
const orders=keyed(data.orders), partners=keyed(rows('sample_partners')), plans=keyed(rows('sample_plans'));
const currencies=keyed(rows('currencies')), countries=keyed(rows('sample_countries'));
const products=keyed(rows('sample_products')), templates=keyed(rows('sample_templates'));
const sold=keyed(rows('sample_soldlines'));
const cutoff='2026-08-31';
const headers=keyed(rows('sample_headers').filter(x=>x.state==='posted'&&['out_invoice','out_refund'].includes(x.move_type)&&[2,3,5].includes(x.company_id)&&x.invoice_date>='2019-01-01'&&x.invoice_date<=cutoff));
const en=s=>{try{return JSON.parse(s).en_US??s;}catch{return s??'';}};
const date=s=>s?new Date(s.slice(0,10)+'T00:00:00Z'):null;
const day=86400000;
const monthStart=s=>s.slice(0,7)+'-01';
const monthEnd=s=>new Date(Date.UTC(Number(s.slice(0,4)),Number(s.slice(5,7)),0));
const iso=d=>d.toISOString().slice(0,10);
const uniq=a=>[...new Set(a)];
const channel=o=>o.x_studio_direct_sale?'Direct':'Indirect';
const links=new Map();
for(const l of rows('sample_links')){
 const oid=sold.get(l.order_line_id)?.order_id;
 if(oid){if(!links.has(l.invoice_line_id))links.set(l.invoice_line_id,new Set());links.get(l.invoice_line_id).add(oid);}
}
const invoices=rows('sample_all_invoice_lines').filter(l=>headers.has(l.move_id)).map(l=>{
 const h=headers.get(l.move_id);let oids=[...(links.get(l.id)??[])];let attribution='Sales-line bridge';
 if(!oids.length&&orders.has(l.subscription_id)){oids=[l.subscription_id];attribution='Invoice subscription ID';}
 const cids=uniq(oids.map(id=>orders.get(id)?.partner_id).filter(Boolean));
 const cid=cids.length===1?cids[0]:null;
 const product=templates.get(products.get(l.product_id)?.product_tmpl_id);
 const start=l.deferred_start_date,end=l.deferred_end_date;
 const days=start&&end?Math.round((date(end)-date(start))/day)+1:null;
 return {...l,header:h,customer_id:cid,order_ids:oids,attribution:cid?attribution:'Unresolved',recurring:product?.recurring_invoice===true,
 product_name:en(product?.name)||String(l.product_id),sign:h.move_type==='out_refund'?-1:1,
 signed:l.price_subtotal*(h.move_type==='out_refund'?-1:1),serviceDays:days,
 currency:currencies.get(l.currency_id)?.name??String(l.currency_id)};
});
assert.equal(uniq(invoices.map(x=>x.id)).length,invoices.length);
assert.equal(uniq(data.orders.map(x=>x.id)).length,data.orders.length);
assert(data.orders.some(x=>x.partner_invoice_id===231));
assert(data.orders.every(x=>[2,3,5].includes(x.company_id)));
for(const h of headers.values()){
 const sum=invoices.filter(x=>x.move_id===h.id).reduce((s,x)=>s+x.signed,0);
 assert(Math.abs(sum-h.amount_untaxed*(h.move_type==='out_refund'?-1:1))<0.011,`Invoice ${h.id} header reconciliation`);
}
const allocations=[];
invoices.forEach((l,i)=>{
 if(!l.customer_id||!l.recurring||!(l.serviceDays>0))return;
 let m=date(monthStart(l.deferred_start_date));
 while(m<=date(l.deferred_end_date)){
  const end=monthEnd(iso(m));
  const overlap=Math.round((Math.min(end,date(l.deferred_end_date))-Math.max(m,date(l.deferred_start_date)))/day)+1;
  allocations.push({line:l,invoiceRow:8+i,month:iso(m),days:overlap,value:l.signed*overlap/l.serviceDays});
  m=new Date(Date.UTC(m.getUTCFullYear(),m.getUTCMonth()+1,1));
 }
});
const customerMonthKeys=new Map();
for(const l of invoices)if(l.customer_id){const m=monthStart(l.header.invoice_date);customerMonthKeys.set(`${l.customer_id}|${l.currency}|${m}`,{cid:l.customer_id,currency:l.currency,month:m});}
for(const a of allocations)if(a.month<=cutoff)customerMonthKeys.set(`${a.line.customer_id}|${a.line.currency}|${a.month}`,{cid:a.line.customer_id,currency:a.line.currency,month:a.month});
const customerMonths=[...customerMonthKeys.values()].sort((a,b)=>a.cid-b.cid||a.month.localeCompare(b.month));
const wb=Workbook.create();
const names=['Review','Customers','Forecast Inputs','Annual Forecast','Customer Months','Contracts','Invoice Lines','Service Detail','Field Guide'];
const sheets=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
const navy='#243B53',ink='#243746',muted='#596B7A',blue='#1755C4',green='#18704A',amber='#FFF2CC',pale='#EEF2F6';
const money='#,##0;(#,##0);"-"';
const cents='#,##0.00;(#,##0.00);"-"';
const pct='0.0%;(0.0%);"-"';
const col=n=>{let s='';for(n++;n;n=Math.floor((n-1)/26))s=String.fromCharCode(65+(n-1)%26)+s;return s;};
const cell=(s,a,v)=>sheets[s].getRange(a).values=[[v]];
function setFormula(s,a,f){sheets[s].getRange(a).formulas=[[f]];sheets[s].getRange(a).format.font.color=f.includes('!')?green:ink;}
function init(n,title,subtitle,widths,lastRow=80){
 const s=sheets[n];s.showGridLines=false;
 const last=col(widths.length-1);s.getRange(`A1:${last}${lastRow}`).format.font={name:'Arial',size:10,color:ink};
 s.getRange(`A1:${last}${lastRow}`).format.rowHeight=22;
 s.getRange(`A1:${last}${lastRow}`).format.verticalAlignment='center';
 widths.forEach((w,i)=>s.getRange(`${col(i)}1:${col(i)}${lastRow}`).format.columnWidth=w);
 cell(n,'A2',title);s.getRange('A2').format.font={name:'Arial',size:16,bold:true,color:navy};
 s.getRange(`A3:${last}3`).format.borders={bottom:{style:'thin',color:navy}};
 cell(n,'A4',subtitle);s.getRange('A4').format.font={name:'Arial',size:10,italic:true,color:muted};
 if(!['Review','Customers'].includes(n)){s.freezePanes.freezeRows(7);s.freezePanes.freezeColumns(2);}
}
function table(n,row,heads,values,name){
 const s=sheets[n],last=col(heads.length-1),end=row+values.length;
 s.getRange(`A${row}:${last}${row}`).values=[heads];
 if(values.length)s.getRange(`A${row+1}:${last}${end}`).values=values;
 s.getRange(`A${row}:${last}${row}`).format={fill:navy,font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,horizontalAlignment:'center',verticalAlignment:'center',rowHeight:38};
 s.getRange(`A${row}:${last}${row}`).format.borders={insideVertical:{style:'thin',color:'#FFFFFF'}};
 for(let r=row+1;r<=end;r++)if((r-row)%2===0)s.getRange(`A${r}:${last}${r}`).format.fill='#F5F7FA';
 if(name){const t=s.tables.add(`A${row}:${last}${end}`,true,name);t.showBandedColumns=false;t.showFilterButton=true;}
 return end;
}
function numeric(n,range,fmt=money){sheets[n].getRange(range).setNumberFormat(fmt);sheets[n].getRange(range).format.horizontalAlignment='right';}
const liveSource='Source: ClickHouse raw_odoo sample, read 24-Sep-2026; canonical orders/invoices extracted 06-Sep-2026.';

init('Contracts','Selected Odoo contracts','Seven selected records, not the complete customer portfolio. Source ARR is not validated net contractual ARR.',[13,14,12,27,15,15,15,19,27,15,13,11,18,13,19,19,16],18);
const contractValues=data.orders.map(o=>{
 const p=plans.get(o.plan_id);return [o.id,o.partner_id,o.company_id,o.name,date(o.first_contract_date),date(o.start_date),date(o.end_date),o.subscription_state,en(p?.name),p?.x_studio_circularo_edition??'Unknown',channel(o),currencies.get(o.currency_id)?.name,o.recurring_total,(p?.billing_period_unit==='year'?12:p?.billing_period_unit==='month'?1:0)*(p?.billing_period_value??0),o.x_studio_arr_usd,'n.a.',o.partner_invoice_id];
});
table('Contracts',7,['Order ID','End customer ID','Issuer ID','Order reference','First contract date','Current start','Current end','Source contract state','Plan','Raw Edition','Source channel','Currency','Source recurring amount','Period months','Source ARR (USD)','Net ARR (USD)','Billed partner ID'],contractValues,'SampleContracts');
cell('Contracts','A5',liveSource);sheets.Contracts.getRange('E8:G14').setNumberFormat('dd-mmm-yy');numeric('Contracts','M8:M14',cents);numeric('Contracts','O8:P14',cents);
sheets.Contracts.getRange('D8:D14').format.wrapText=true;sheets.Contracts.getRange('A8:Q14').format.rowHeight=43;
cell('Contracts','A17','Net ARR remains unavailable until actual contractual channel pricing and source timing are reconciled.');

init('Invoice Lines','Sample invoice lines','All product lines from eight selected posted invoices. Amounts exclude tax; currencies must not be added together.',[14,22,15,14,11,11,43,18,13,15,15,24,18,22,18,10,21,23],40);
cell('Invoice Lines','A5',liveSource+' Related tables: account_move_line, account_move, sale_order_line_invoice_rel, products.');
const invEnd=table('Invoice Lines',7,['Line ID','Invoice reference','Invoice date','End customer ID','Issuer ID','Currency','Product','Net billed (local)','Recurring product','Service start','Service end','Attribution','Net billed (USD)','FX validation','Raw subtotal','Doc sign','Raw amount_currency','Linked order IDs'],invoices.map(l=>[l.id,l.header.name,date(l.header.invoice_date),l.customer_id??'Unresolved',l.company_id,l.currency,l.product_name,null,l.recurring?'Yes':'Unknown',date(l.deferred_start_date),date(l.deferred_end_date),l.attribution,'n.a.','Not tested in sample',l.price_subtotal,l.sign,l.amount_currency,l.order_ids.join(', ')]),'SampleInvoiceLines');
for(let i=0;i<invoices.length;i++)setFormula('Invoice Lines',`H${i+8}`,`=O${i+8}*P${i+8}`);
sheets['Invoice Lines'].getRange(`C8:C${invEnd}`).setNumberFormat('dd-mmm-yy');sheets['Invoice Lines'].getRange(`J8:K${invEnd}`).setNumberFormat('dd-mmm-yy');
for(const c of ['H','M','O','Q'])numeric('Invoice Lines',`${c}8:${c}${invEnd}`,cents);
sheets['Invoice Lines'].getRange(`J8:K${invEnd}`).conditionalFormats.add('containsBlanks',{format:{fill:amber}});

init('Service Detail','Invoice service allocations','Prototype convention: inclusive dates, daily proration, original currency. This is not the approved monthly MRR convention.',[14,14,15,11,15,16,16,20,20,35],allocations.length+10);
const allocEnd=table('Service Detail',7,['Invoice line ID','End customer ID','Service month','Currency','Covered days','Total service days','Allocation weight','Signed recurring bill','Service allocation','Period classification'],allocations.map(a=>[a.line.id,a.line.customer_id,date(a.month),a.line.currency,a.days,a.line.serviceDays,null,null,null,a.month<=cutoff?'Historical coverage':'Future service from posted invoice']),'SampleServiceAllocations');
for(let i=0;i<allocations.length;i++){const r=i+8,a=allocations[i];setFormula('Service Detail',`G${r}`,`=E${r}/F${r}`);setFormula('Service Detail',`H${r}`,`='Invoice Lines'!H${a.invoiceRow}`);setFormula('Service Detail',`I${r}`,`=G${r}*H${r}`);}
sheets['Service Detail'].getRange(`C8:C${allocEnd}`).setNumberFormat('mmm-yy');numeric('Service Detail',`G8:G${allocEnd}`,'0.0000%');numeric('Service Detail',`H8:I${allocEnd}`,cents);
cell('Service Detail','A5','Only recurring lines with known end customer and valid service dates are allocated. Missing dates are not inferred.');

init('Customer Months','Customer-month sample','One end customer × month × currency. Selected-invoice coverage only; absent invoices do not establish zero revenue or churn.',[14,36,15,11,21,24,21,25],customerMonths.length+10);
const cmEnd=table('Customer Months',7,['End customer ID','End customer','Month','Currency','Sample net billed (local)','Sample service allocation (local)','Historical MRR (USD)','Coverage'],customerMonths.map(x=>[x.cid,partners.get(x.cid)?.name,date(x.month),x.currency,null,null,'n.a.','Selected invoices only']),'SampleCustomerMonths');
for(let i=0;i<customerMonths.length;i++){const r=i+8;setFormula('Customer Months',`E${r}`,`=SUMIFS('Invoice Lines'!$H$8:$H$${invEnd},'Invoice Lines'!$D$8:$D$${invEnd},$A${r},'Invoice Lines'!$F$8:$F$${invEnd},$D${r},'Invoice Lines'!$C$8:$C$${invEnd},">="&$C${r},'Invoice Lines'!$C$8:$C$${invEnd},"<"&EDATE($C${r},1))`);setFormula('Customer Months',`F${r}`,`=SUMIFS('Service Detail'!$I$8:$I$${allocEnd},'Service Detail'!$B$8:$B$${allocEnd},$A${r},'Service Detail'!$D$8:$D$${allocEnd},$D${r},'Service Detail'!$C$8:$C$${allocEnd},$C${r})`);}
sheets['Customer Months'].getRange(`C8:C${cmEnd}`).setNumberFormat('mmm-yy');numeric('Customer Months',`E8:G${cmEnd}`,cents);
cell('Customer Months','A5','The final model will consolidate validated USD and complete history. Sample allocation is not a certified retention/CLV series.');

init('Customers','End-customer sample','Seven actual end customers. Source contract status is not a customer-level churn conclusion.',[14,37,23,13,42,16,17,19,19,11,23,19,28,28],22);
const custEnd=table('Customers',7,['End customer ID','End customer','Country','Channel','Billed party','First date (selected)','Raw Edition','Reporting Edition','Selected contract state','Currency','Attributed sample bill (local)','Net ARR (USD)','Coverage','Recurring Plan (selected contract)'],data.orders.map(o=>{const p=partners.get(o.partner_id),plan=plans.get(o.plan_id);const customerDocs=new Set(invoices.filter(l=>l.customer_id===o.partner_id).map(l=>l.move_id));const partial=invoices.some(l=>customerDocs.has(l.move_id)&&!l.customer_id);return[o.partner_id,p?.name,en(countries.get(p?.country_id)?.name),channel(o),partners.get(o.partner_invoice_id)?.name,date(o.first_contract_date),plan?.x_studio_circularo_edition,plan?.x_studio_circularo_edition==='Ultimate'?'Enterprise':plan?.x_studio_circularo_edition,o.subscription_state,currencies.get(o.currency_id)?.name,null,'n.a.',partial?'Partial: unassigned invoice line':'Selected contracts/invoices',en(plan?.name)];}),'SampleCustomers');
for(let i=0;i<data.orders.length;i++){const r=i+8;setFormula('Customers',`K${r}`,`=SUMIFS('Invoice Lines'!$H$8:$H$${invEnd},'Invoice Lines'!$D$8:$D$${invEnd},$A${r},'Invoice Lines'!$F$8:$F$${invEnd},$J${r})`);}
sheets.Customers.getRange(`F8:F${custEnd}`).setNumberFormat('dd-mmm-yy');numeric('Customers',`K8:L${custEnd}`,cents);sheets.Customers.getRange(`A8:M${custEnd}`).format.font.color=ink;
cell('Customers','A17','Circularo Digital is an external reseller. Its billing role is included; issuer company 8 remains outside scope.');
cell('Customers','A18','Ultimate is retained as raw Edition and mapped to Enterprise reporting Edition per the investor brief.');
cell('Customers','A19','Attributed amounts exclude unresolved lines. ITHRA has an unassigned line on its sampled invoice; its customer subtotal is incomplete.');
sheets.Customers.getRange('M8:N14').format.wrapText=true;sheets.Customers.getRange('A8:N14').format.rowHeight=32;
cell('Customers','A20','Recurring Plan is sourced from the selected contract, including churned examples. Final customer summaries retain all distinct active plans.');
sheets.Customers.tabColor=navy;

init('Forecast Inputs','Annual forecast inputs (illustrative)','Fictional 2027–2029 calendar years. Circularo net USD, excluding tax. One expected case, not management guidance.',[17,19,24,11,17,20,19,14,16,16,13,21,25,46,12,15],34);
const years=[2027,2028,2029];
const components=[
 ['D-01','DEMO-A','Demo Existing A','Existing','Baseline',120000,1,'2027-01-01','2029-12-31','Yes','Full contract','Illustrative baseline','Flat illustrative continuation through 2029',5,'Direct'],
 ['D-02','DEMO-A','Demo Existing A','Existing','Expansion',24000,.6,'2027-07-01','2029-12-31','Yes','Incremental uplift','Illustrative pipeline','Incremental expansion; retained at same value in later years',5,'Direct'],
 ['D-03','DEMO-B','Demo Existing B','Existing','Baseline',60000,1,'2027-01-01','2027-06-30','Yes','Full contract','Illustrative baseline','Ends before replacement D-04; no overlapping baseline',5,'Indirect'],
 ['D-04','DEMO-B','Demo Existing B','Existing','Renewal',72000,.8,'2027-07-01','2029-12-31','Yes','Full replacement','Illustrative pipeline','Replaces D-03; 12k unweighted uplift is inside 72k',5,'Indirect'],
 ['D-05','DEMO-C','Demo New C','New','New logo',36000,.4,'2027-10-01','2029-12-31','Yes','Incremental uplift','Illustrative pipeline','New relative to opening base; retained in 2028–2029',3,'Direct'],
 ['D-06','DEMO-A','Demo Existing A','Existing','History scenario',12000,.3,'2027-07-01','2029-12-31','No','Incremental uplift','Illustrative assumption','Excluded: overlaps expansion D-02',5,'Direct'],
];
const demo=years.flatMap(y=>components.map(x=>[`${x[0]}-${y}`,x[1],x[2],y,x[3],x[4],x[5],x[6],date(x[7]),date(x[8]),x[0]==='D-03'&&y>2027?'No':x[9],...x.slice(10)]));
cell('Forecast Inputs','A5','Annual rows carry a stable event-year key. Edit yellow amount, probability, service dates and inclusion cells.');
const fiEnd=table('Forecast Inputs',7,['Event-year ID','Customer / prospect ID','Demo customer','Year','Customer cohort','Component','Net annual amount (USD)','Probability','Service start','Service end','Include?','Amount basis','Evidence type','Rationale / overlap','Issuer ID','Channel'],demo,'DemoForecastInputs');
sheets['Forecast Inputs'].getRange(`G8:K${fiEnd}`).format.fill=amber;sheets['Forecast Inputs'].getRange(`G8:J${fiEnd}`).format.font.color=blue;
numeric('Forecast Inputs',`G8:G${fiEnd}`);numeric('Forecast Inputs',`H8:H${fiEnd}`,pct);sheets['Forecast Inputs'].getRange(`I8:J${fiEnd}`).setNumberFormat('dd-mmm-yy');
sheets['Forecast Inputs'].getRange(`K8:K${fiEnd}`).dataValidation={rule:{type:'list',values:['Yes','No']}};
sheets['Forecast Inputs'].dataValidations.add({range:`H8:H${fiEnd}`,rule:{type:'decimal',operator:'between',formula1:0,formula2:1}});
cell('Forecast Inputs','A28','One row per event component and year. Later-year retention is an explicit DEMO assumption, not a new sale.');
cell('Forecast Inputs','A29','Revenue uses actual covered days / days in the calendar year. Year-end ARR includes only components active on 31 December.');
cell('Forecast Inputs','A30','Renewals replace baseline value; expansion adds only uplift. Do not include overlapping D-02 and D-06 together.');
cell('Forecast Inputs','A31','Sample has 18 fixed event-year rows. New customers/events/years require extending keyed input and calculation ranges and checks.');
cell('Forecast Inputs','A32','Final cutoff, year convention, horizon and scenarios are not selected by these fictional examples. No monthly forecast entry is required.');
sheets['Forecast Inputs'].tabColor='#59758F';

const model='Annual Forecast',detailFirst=27,detailLast=detailFirst+demo.length-1;
init(model,'Annual customer forecast (illustrative)','Expected net USD, excluding tax. Annual revenue is timing-weighted; closing ARR is a rate, not revenue for the year.',[17,20,25,20,20,20,19,16,20,18,17,20,20,20,28],51);
const customerYears=years.flatMap(y=>['DEMO-A','DEMO-B','DEMO-C'].map(id=>[y,id,components.find(x=>x[1]===id)[2],null,null,null,null,null]));
table(model,7,['Year','Customer / prospect ID','Demo customer','Opening net ARR','In-year recurring revenue','Closing net ARR','Net ARR change','Input status'],customerYears,'DemoAnnualCustomers');
table(model,19,['Year','Scope','Case','Opening net ARR','In-year recurring revenue','Closing net ARR','Net ARR change','Input status'],years.map(y=>[y,'All DEMO customers','Expected',null,null,null,null,null]));
cell(model,'A24','Component calculations: annual amount × probability × covered days / year days. No monthly forecast grid.');
table(model,26,['Event-year ID','Customer / prospect ID','Year','Net annual amount','Probability','Service start','Service end','Include?','Weighted annual amount','Covered days','Days in year','In-year revenue','Closing ARR','Opening-date ARR','Input status'],demo.map(x=>[x[0],...Array(14).fill(null)]));
for(let i=0;i<demo.length;i++){
 const r=detailFirst+i;
 for(const [dest,src] of [['B','B'],['C','D'],['D','G'],['E','H'],['F','I'],['G','J'],['H','K']]){
  const ref=`INDEX('Forecast Inputs'!$${src}$8:$${src}$${fiEnd},MATCH($A${r},'Forecast Inputs'!$A$8:$A$${fiEnd},0))`;
  setFormula(model,`${dest}${r}`,`=IF(COUNTIFS('Forecast Inputs'!$A$8:$A$${fiEnd},$A${r})<>1,"n.a.",IF(ISBLANK(${ref}),"n.a.",${ref}))`);
 }
 setFormula(model,`O${r}`,`=IF(AND(COUNTIFS('Forecast Inputs'!$A$8:$A$${fiEnd},$A${r})=1,ISNUMBER(C${r}),C${r}=INT(C${r}),C${r}>=2027,C${r}<=2029,B${r}<>"n.a."),IF(H${r}="No","Excluded",IF(AND(H${r}="Yes",ISNUMBER(D${r}),D${r}>=0,ISNUMBER(E${r}),E${r}>=0,E${r}<=1,ISNUMBER(F${r}),ISNUMBER(G${r}),G${r}>=F${r}),"Ready","Check input")),"Check key/year")`);
 // Explicit overlap pairs for the known prototype components. Final model uses linked economic-event groups.
 const component=demo[i][0].slice(0,4),opposite={'D-02':'D-06','D-06':'D-02','D-03':'D-04','D-04':'D-03'}[component];
 if(opposite){
  const base=sheets[model].getRange(`O${r}`).formulas[0][0].slice(1);
  const other=`"${opposite}-"&C${r}`;
  const overlap=`COUNTIFS('Forecast Inputs'!$A$8:$A$${fiEnd},${other},'Forecast Inputs'!$K$8:$K$${fiEnd},"Yes",'Forecast Inputs'!$I$8:$I$${fiEnd},"<="&G${r},'Forecast Inputs'!$J$8:$J$${fiEnd},">="&F${r})`;
  setFormula(model,`O${r}`,`=IF(AND(H${r}="Yes",ISNUMBER(F${r}),ISNUMBER(G${r}),${overlap}>0),"Check overlap",${base})`);
 }
 setFormula(model,`I${r}`,`=IF(O${r}="Excluded",0,IF(O${r}="Ready",D${r}*E${r},"n.a."))`);
 setFormula(model,`K${r}`,`=IF(ISNUMBER(C${r}),DATE(C${r}+1,1,1)-DATE(C${r},1,1),"n.a.")`);
 setFormula(model,`J${r}`,`=IF(O${r}="Excluded",0,IF(O${r}="Ready",MAX(0,MIN(G${r},DATE(C${r},12,31))-MAX(F${r},DATE(C${r},1,1))+1),"n.a."))`);
 setFormula(model,`L${r}`,`=IF(AND(ISNUMBER(I${r}),ISNUMBER(J${r}),ISNUMBER(K${r})),I${r}*J${r}/K${r},"n.a.")`);
 for(const [dest,mm,dd] of [['M',12,31],['N',1,1]])setFormula(model,`${dest}${r}`,`=IF(O${r}="Excluded",0,IF(O${r}="Ready",IF(AND(F${r}<=DATE(C${r},${mm},${dd}),G${r}>=DATE(C${r},${mm},${dd})),I${r},0),"n.a."))`);
}
for(let i=0;i<customerYears.length;i++){
 const r=8+i,expectedRows=customerYears[i][1]==='DEMO-A'?3:customerYears[i][1]==='DEMO-B'?2:1;
 const criteria=`$B$${detailFirst}:$B$${detailLast},$B${r},$C$${detailFirst}:$C$${detailLast},$A${r}`;
 setFormula(model,`H${r}`,`=IF(AND(COUNTIFS(${criteria})=${expectedRows},COUNTIFS(${criteria},$O$${detailFirst}:$O$${detailLast},"Ready")+COUNTIFS(${criteria},$O$${detailFirst}:$O$${detailLast},"Excluded")=${expectedRows}),"Ready","Check inputs")`);
 for(const [dest,src] of [['E','L'],['F','M']])setFormula(model,`${dest}${r}`,`=IF(H${r}="Ready",SUMIFS($${src}$${detailFirst}:$${src}$${detailLast},${criteria}),"n.a.")`);
 setFormula(model,`D${r}`,i<3?`=IF(H${r}="Ready",SUMIFS($N$${detailFirst}:$N$${detailLast},${criteria}),"n.a.")`:`=F${r-3}`);
 setFormula(model,`G${r}`,`=IF(AND(ISNUMBER(D${r}),ISNUMBER(F${r})),F${r}-D${r},"n.a.")`);
}
for(let y=0;y<3;y++){
 const r=20+y,a=8+3*y,b=a+2;
 for(const c of ['D','E','F','G'])setFormula(model,`${c}${r}`,`=IF(COUNT(${c}${a}:${c}${b})=3,SUM(${c}${a}:${c}${b}),"n.a.")`);
 setFormula(model,`H${r}`,`=IF(AND(COUNTIFS(H${a}:H${b},"Ready")=3,COUNT(D${r}:G${r})=4),"Ready","Check inputs")`);
}
numeric(model,'D8:G22');numeric(model,`D${detailFirst}:D${detailLast}`);numeric(model,`E${detailFirst}:E${detailLast}`,pct);
sheets[model].getRange(`F${detailFirst}:G${detailLast}`).setNumberFormat('dd-mmm-yy');
numeric(model,`I${detailFirst}:I${detailLast}`);numeric(model,`L${detailFirst}:N${detailLast}`);
for(const range of ['H8:H22',`O${detailFirst}:O${detailLast}`])sheets[model].getRange(range).conditionalFormats.add('containsText',{text:'Check',format:{fill:'#FDE7E7',font:{color:'#A50000',bold:true}}});
cell(model,'A47','Opening ARR rolls from the prior year close; the first year uses components active on 1 January.');
cell(model,'A48','Net ARR change includes probability changes and replacement effects. It is not a certified expansion/churn decomposition.');
cell(model,'A49','Daily timing is an explicit prototype forecast convention, not an accounting-recognition or historical MRR policy.');
cell(model,'A50','Invoice-date billing and one-time fees are not forecast here. Historical actuals remain unchanged.');

init('Review','Circularo sample workbook','Layout review only. Real sampled Odoo records and separate illustrative forecasts. All amounts exclude tax.',[29,24,20,20,20,20,3,18,18,18,18,18],51);
sheets.Review.tabColor=navy;
cell('Review','A5','Actual sample: 7 end customers, 7 contracts, 8 posted invoices. Not a portfolio total or validated investor report.');
table('Review',7,['Review item','Proposed granularity','Decision','Your notes'],[
 ['Customer reporting','One end customer','Pending',''],
 ['Historical analysis','Customer × month','Pending',''],
 ['Contract detail','One contract record','Pending',''],
 ['Invoice evidence','One invoice line','Pending',''],
 ['Forecast entry','Event component × year','Pending',''],
 ['Forecast results','Customer × year','Pending',''],
 ['Customer revenue value','Observed / forward separate','Pending',''],
 ['Additional fields','See Field Guide','Pending',''],
]);
sheets.Review.getRange('C8:D15').format.fill=amber;sheets.Review.getRange('C8:C15').dataValidation={rule:{type:'list',values:['Pending','Keep','Change','Remove']}};
cell('Review','A17','Start with Customers and Forecast Inputs. Review the supporting detail only where you want to test the grain.');
cell('Review','A19','Illustrative forecast results (USD)');sheets.Review.getRange('A19').format.font.bold=true;
table('Review',20,['Calendar year','In-year recurring revenue','Year-end net ARR'],years.map(y=>[y,null,null]));
for(let i=0;i<3;i++){setFormula('Review',`B${21+i}`,`='Annual Forecast'!E${20+i}`);setFormula('Review',`C${21+i}`,`='Annual Forecast'!F${20+i}`);}
cell('Review','A24','2027–2029 revenue value');setFormula('Review','B24','=IF(COUNT(B21:B23)=3,SUM(B21:B23),"n.a.")');cell('Review','C24','ARR not summed');numeric('Review','B21:C24');sheets.Review.getRange('A24:C24').format.font.bold=true;sheets.Review.getRange('B21:C24').format.font.color=ink;
cell('Review','A26','Annual revenue reflects service timing. Year-end ARR is a rate; the three-year revenue value is not complete lifetime CLV.');
cell('Review','H28','Calendar year');cell('Review','I28','Demo annual revenue');
for(let j=0;j<3;j++){setFormula('Review',`H${29+j}`,`=TEXT(A${21+j},"0")`);setFormula('Review',`I${29+j}`,`=B${21+j}`);}
numeric('Review','I29:I31');sheets.Review.getRange('H28:I28').format={fill:navy,font:{bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:36};sheets.Review.getRange('H29:I31').format.font.color=ink;
const chart=sheets.Review.charts.add('line',sheets.Review.getRange('H28:I31'));chart.title='Illustrative annual revenue (USD)';chart.hasLegend=false;chart.titleTextStyle.typeface='Arial';chart.titleTextStyle.fontSize=13;
chart.xAxis={axisType:'textAxis',textStyle:{typeface:'Arial',fontSize:10}};chart.yAxis={numberFormatCode:'#,##0',numberFormatSourceLinked:false,textStyle:{typeface:'Arial',fontSize:10}};chart.series.items[0].line={fill:navy,style:'solid',width:2};chart.setPosition('A28','F43');
cell('Review','A45','No actual-customer forecast has been invented. The three DEMO customer IDs do not link to the real customer sample.');
cell('Review','A46','Maintain annual event inputs; Annual Forecast calculates customer-year revenue and ARR. Historical monthly detail remains separate.');
for(let r=8;r<=15;r++){const saved=reviewNotes.get(sheets.Review.getRange(`A${r}`).values[0][0]);if(saved)sheets.Review.getRange(`C${r}:D${r}`).values=[saved];}

init('Field Guide','Fields, grains and sample checks','Use the Decision and Notes columns to request additions or simplifications. Required IDs can stay in supporting detail.',[22,26,24,57,30,17,37],80);
const guide=[
 ['Customers','End customer ID','Required','Commercial customer identity, not the billed reseller','sale_order.partner_id + partner rollup','Pending',''],
 ['Customers','End customer name','Required','Readable customer name; IDs preserve joins after sorting','res_partner.name','Pending',''],
 ['Customers','Country / segment','Country shown; segment pending','End-customer geography; unknown segment is not guessed','Partner + reviewed mapping','Pending',''],
 ['Customers','Channel / billed party','Required','Direct or indirect, with reseller separately identified','Order IDs + user role mapping','Pending',''],
 ['Customers','First contract date','Required','Earliest supported relationship date; sample is not full history','sale_order.first_contract_date','Pending',''],
 ['Customers','Edition / Plan','Required','Recurring Plan shown for selected contract; final summary lists distinct active plans, separately from Edition','sale_order.plan_id -> sale_subscription_plan.name','Pending',''],
 ['Customers','Net contractual ARR','Required in final; sample unavailable','Circularo consideration after applicable discounts, excluding tax','Validated contract pricing','Pending',''],
 ['Customers','End-customer ARR','Separate field in final','Gross-to-channel customer value is not net Circularo ARR','Validated contract pricing','Pending',''],
 ['Customer Months','Customer × month','Required','Final historical service-month KPI grain; sample retains currency','Invoice service allocations','Pending',''],
 ['Customer Months','Billing / service / MRR','Separate measures','Invoice-date billing versus service allocation versus validated USD MRR','account_move_line','Pending',''],
 ['Contracts','One contract record','Supporting detail','Renewals/upsells do not automatically mean new customers','sale_order.id','Pending',''],
 ['Contracts','Dates / state / cadence','Required','Effective dates, lifecycle and period length are distinct','sale_order + plan','Pending',''],
 ['Invoice Lines','One invoice line','Required audit grain','Negative discount lines remain included; no repeated header summing','account_move_line.id','Pending',''],
 ['Invoice Lines','Currency / FX / sign','Required','Original signed tax-exclusive amount plus validated USD in final','Currency, posting, rate evidence','Pending',''],
 ['Service Detail','Line × customer × month','Supporting calculation','Daily inclusive allocation is a prototype choice, not final MRR policy','Service dates + line value','Pending',''],
 ['Forecast Inputs','One economic event','Annual entry grain','One event component × year, within a version/scenario; stable event-year ID','Reviewed opportunity or assumption','Pending',''],
 ['Forecast Inputs','Net annual amount','Required editable','Annualized net recurring amount; one-time services kept outside ARR','Validated pricing / forecast input','Pending',''],
 ['Forecast Inputs','Probability','Required for open pipeline','0 to 100%; not applied twice; signed and baseline evidence separate','Reviewed stage / probability','Pending',''],
 ['Forecast Inputs','Start / end dates','Required editable','Service dates determine covered days / year days; closing ARR tests 31 December','Expected service schedule','Pending',''],
 ['Forecast Inputs','Include / replacement','Required','Exclude overlaps; full replacement differs from incremental uplift','Linked economic event IDs','Pending',''],
 ['Forecast Inputs','Evidence / rationale','Required','Actual source, named pipeline, or assumption; demo is illustrative only','Opportunity / account-plan reference','Pending',''],
 ['Forecast Inputs','Owner / close date','Proposed final extension','Optional review columns kept out of the compact numerical build','Pipeline source','Pending',''],
 ['Forecast Inputs','Billing / one-time fees','Proposed separate schedule','Not calculated in this prototype; retain outside recurring run-rate','Billing cadence and one-time inputs','Pending',''],
 ['Customer value','Revenue CLV','Required, horizon-labelled','Observed and future net revenue separate; avoid prepayment overlap','Historical facts + forward schedule','Pending',''],
 ['Growth evidence','Expansion driver / risk','Required in final','Historical changes, peer cohort, documented headroom and downsides','Reconciled historical analysis','Pending',''],
 ['Annual Forecast','Three annual periods','Prototype scope','Customer × calendar year; 2027–2029 illustrative, not final horizon; opening ARR, annual revenue and closing ARR','One editable expected case','Pending',''],
];
const guideEnd=table('Field Guide',7,['Area','Field / concept','Role','Meaning / proposed treatment','Source / evidence','Decision','Your notes'],guide,'LayoutFieldReview');
for(let i=0;i<guide.length;i++){const saved=guideNotes.get(guide[i][0]+'|'+guide[i][1]);if(saved)sheets['Field Guide'].getRange(`F${8+i}:G${8+i}`).values=[saved];}
sheets['Field Guide'].getRange(`F8:G${guideEnd}`).format.fill=amber;sheets['Field Guide'].getRange(`F8:F${guideEnd}`).dataValidation={rule:{type:'list',values:['Pending','Keep','Change','Remove']}};
sheets['Field Guide'].getRange(`C8:E${guideEnd}`).format.wrapText=true;sheets['Field Guide'].getRange(`A8:G${guideEnd}`).format.rowHeight=40;
const checkStart=guideEnd+4;cell('Field Guide',`A${checkStart}`,'Sample reconciliation checks');
const checkRows=[];
for(const h of headers.values())checkRows.push([`Invoice ${h.name}`,`Line/header (${currencies.get(h.currency_id)?.name})`,h.amount_untaxed*(h.move_type==='out_refund'?-1:1),null,'Independent invoice header']);
table('Field Guide',checkStart+2,['Check','Measure','Source control','Difference','Interpretation'],checkRows);
for(const [i,h]of [...headers.values()].entries()){const r=checkStart+3+i;setFormula('Field Guide',`D${r}`,`=SUMIFS('Invoice Lines'!$H$8:$H$${invEnd},'Invoice Lines'!$B$8:$B$${invEnd},"${h.name}")-C${r}`);}
const checkFirst=checkStart+3,checkLast=checkFirst+checkRows.length-1;numeric('Field Guide',`C${checkFirst}:C${checkLast}`,'#,##0.00');numeric('Field Guide',`D${checkFirst}:D${checkLast}`,'0.00');
sheets['Field Guide'].getRange(`D${checkFirst}:D${checkLast}`).format.font.color=ink;sheets['Field Guide'].getRange(`D${checkFirst}:D${checkLast}`).conditionalFormats.add('cellIs',{operator:'notBetween',formula:[-.01,.01],format:{fill:'#FDE7E7',font:{color:'#A50000',bold:true}}});
const remaining=checkLast+3;
cell('Field Guide',`A${remaining}`,'Source coverage limitations');
cell('Field Guide',`A${remaining+1}`,`Unresolved customer attribution: ${invoices.filter(l=>!l.customer_id).length} invoice line. Retained in Invoice Lines and invoice-level checks.`);
cell('Field Guide',`A${remaining+2}`,`${invoices.filter(l=>l.recurring&&!(l.serviceDays>0)).length} recurring-product lines lack valid service dates; no service interval was invented.`);
cell('Field Guide',`A${remaining+3}`,'Source ARR remains contextual. Net contractual ARR, complete retention, FX and historical customer value are not certified by this sample.');
cell('Field Guide',`A${remaining+4}`,'Canonical September 6 source is used consistently for this layout test. The newer order-copy authority remains a full-analysis question.');
cell('Field Guide',`A${remaining+5}`,'Circularo Digital partner 231 is an external reseller (Josef-confirmed), not an intercompany exclusion.');
cell('Field Guide',`A${remaining+6}`,'Per agent-discovery-schema and agent-query-safety: source schemas checked; bounded read-only queries; no sale_order_log used.');
cell('Field Guide',`A${remaining+7}`,'Pipeline probabilities and amounts in this workbook are invented DEMO inputs, not extracted Odoo pipeline or management guidance.');
sheets['Field Guide'].tabColor='#8B99A6';

// Calculation checks and live input tests; restore the delivered base case after every test.
wb.recalculate();
const number=(s,c)=>sheets[s].getRange(c).values[0][0];
const expectedYears=years.map(y=>demo.filter(x=>x[3]===y&&x[10]==='Yes').reduce((s,x)=>s+x[6]*x[7]*Math.max(0,(Math.min(x[9],date(`${y}-12-31`))-Math.max(x[8],date(`${y}-01-01`)))/day+1)/((date(`${y+1}-01-01`)-date(`${y}-01-01`))/day),0));
const expected=expectedYears.reduce((a,b)=>a+b,0);
for(let i=0;i<3;i++){assert(Math.abs(number(model,`E${20+i}`)-expectedYears[i])<1e-6,'Independent annual revenue check');assert.equal(number(model,`F${20+i}`),206400);}
assert(Math.abs(number('Review','B24')-expected)<1e-6);
const baseActual=number('Customers','K8');
cell('Forecast Inputs','H9',0);wb.recalculate();assert(Math.abs(number(model,'E20')-(expectedYears[0]-14400*184/365))<1e-6);assert.equal(number('Customers','K8'),baseActual);
cell('Forecast Inputs','H9',null);wb.recalculate();assert.equal(number(model,'E20'),'n.a.');assert.equal(number('Review','B24'),'n.a.');
cell('Forecast Inputs','H9',.6);cell('Forecast Inputs','I12',date('2028-01-01'));wb.recalculate();assert(Math.abs(number(model,'E20')-(expectedYears[0]-14400*92/365))<1e-6);
cell('Forecast Inputs','I12',date('2027-10-01'));
cell('Forecast Inputs','H13',null);wb.recalculate();assert(Math.abs(number('Review','B24')-expected)<1e-6);cell('Forecast Inputs','H13',.3);
cell('Forecast Inputs','H15',0);wb.recalculate();assert.equal(number(model,'E21'),192000);assert.equal(number(model,'D22'),192000);cell('Forecast Inputs','H15',.6);
cell('Forecast Inputs','I15',date('2028-02-29'));cell('Forecast Inputs','J15',date('2028-02-29'));wb.recalculate();assert(Math.abs(number(model,'L34')-14400/366)<1e-6);cell('Forecast Inputs','I15',date('2027-07-01'));cell('Forecast Inputs','J15',date('2029-12-31'));
cell('Forecast Inputs','A9','D-01-2027');wb.recalculate();assert.equal(number(model,'E20'),'n.a.');cell('Forecast Inputs','A9','D-02-2027');
cell('Forecast Inputs','J9',date('2027-01-01'));wb.recalculate();assert.equal(number(model,'E20'),'n.a.');cell('Forecast Inputs','J9',date('2029-12-31'));
cell('Forecast Inputs','K13','Yes');wb.recalculate();assert.equal(number(model,'E20'),'n.a.');cell('Forecast Inputs','K13','No');
cell('Forecast Inputs','I11',date('2027-06-30'));wb.recalculate();assert.equal(number(model,'E20'),'n.a.');cell('Forecast Inputs','I11',date('2027-07-01'));
// Key-based lookups survive reordering all annual input rows.
const reversed=[...demo].reverse();sheets['Forecast Inputs'].getRange(`A8:P${fiEnd}`).values=reversed;wb.recalculate();assert(Math.abs(number('Review','B24')-expected)<1e-6);
sheets['Forecast Inputs'].getRange(`A8:P${fiEnd}`).values=demo;
wb.recalculate();
for(let r=8;r<=16;r++)assert(Math.abs(number(model,`D${r}`)+number(model,`G${r}`)-number(model,`F${r}`))<1e-6,'Annual ARR bridge');
function assertSameValues(actual,prior,label){
 assert.equal(actual.length,prior.length,label);
 actual.forEach((row,i)=>{assert.equal(row.length,prior[i].length,label);row.forEach((value,j)=>{
  const serial=v=>v instanceof Date?(v-Date.UTC(1899,11,30))/day:v;
  const a=serial(value),b=serial(prior[i][j]);
  if(typeof a==='number'&&typeof b==='number')assert(Math.abs(a-b)<1e-8,`${label} row ${i+1} column ${j+1}`);
  else assert.equal(a===''?null:a,b===''?null:b,`${label} row ${i+1} column ${j+1}`);
 });});
}
for(const n of unchangedNames){assertSameValues(sheets[n].getUsedRange().values,preserved[n].values,`${n}: original values unchanged`);assert.deepEqual(sheets[n].getUsedRange().formulas,preserved[n].formulas,`${n}: original formulas unchanged`);}
assertSameValues(sheets.Customers.getRange('A8:M14').values,previous.worksheets.getItem('Customers').getRange('A8:M14').values,'Original customer data unchanged');
for(let i=0;i<data.orders.length;i++)assert.equal(number('Customers',`N${i+8}`),en(plans.get(data.orders[i].plan_id)?.name),'Plan name maps to selected contract');
for(let r=checkFirst;r<=checkLast;r++)assert(Math.abs(number('Field Guide',`D${r}`))<.011);
const sourceAllocated=invoices.filter(l=>l.customer_id&&l.recurring&&l.serviceDays>0).reduce((s,l)=>s+l.signed,0);
assert(Math.abs(allocations.reduce((s,a)=>s+a.value,0)-sourceAllocated)<1e-6,'Full-horizon allocation conservation');
console.log((await wb.inspect({kind:'table',range:'Review!A19:C24',include:'values,formulas',tableMaxRows:6,tableMaxCols:3,maxChars:2500})).ndjson);
const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:50},summary:'Prototype formula error scan',maxChars:3000});
console.log(errors.ndjson);
const renders=[['Review','A1:I46'],['Customers','G7:N15'],['Forecast Inputs','A1:K17'],['Forecast Inputs','L7:P17'],[model,'A1:H22'],[model,'A24:H36'],[model,'I26:O44'],['Field Guide','A7:G15'],['Field Guide','A23:G33']];
for(let i=0;i<renders.length;i++){const [sheetName,range]=renders[i];const blob=await wb.render({sheetName,range,scale:1.2,format:'png'});await fs.writeFile(path.join(previews,`annual-${String(i+1).padStart(2,'0')}-${sheetName.replaceAll(' ','-')}.png`),new Uint8Array(await blob.arrayBuffer()));}
const file=await SpreadsheetFile.exportXlsx(wb);await file.save(target);
await fs.writeFile(path.join(out,'sample-validation.json'),JSON.stringify({sampleCustomers:data.orders.length,sampleContracts:data.orders.length,invoiceHeaders:headers.size,invoiceLines:invoices.length,serviceAllocationRows:allocations.length,customerMonthRows:customerMonths.length,forecastEventYears:demo.length,forecastCustomers:3,illustrativeCalendarYears:years,expectedAnnualDemoRevenue:expectedYears,expectedHorizonRevenue:expected,expectedClosingArr:206400,tests:['invoice line/header original-currency reconciliation','full-horizon allocation conservation','zero probability','missing included probability and summary propagation','delayed new-customer start','missing excluded probability','later-year driver and opening ARR rollforward','one-day leap-year revenue','duplicate/missing event keys','invalid service dates','input row reorder by stable event-year ID','annual ARR bridges','all source-detail values and formulas unchanged','original customer values unchanged','Recurring Plan source mapping'],formulaErrorScan:errors.ndjson,scope:'Annual layout prototype only. Calendar years/horizon illustrative. USD actuals and full-history KPI validation not performed. Native Excel recalculation not exercised.'},null,2));
console.log(JSON.stringify({file:target,invoices:invoices.length,allocations:allocations.length,customerMonths:customerMonths.length,rendered:renders.length}));
