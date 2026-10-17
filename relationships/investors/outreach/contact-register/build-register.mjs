import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';

const here = path.dirname(new URL(import.meta.url).pathname);
const work = path.dirname(here);
const output = path.join(here, 'contact-register.xlsx');
if (await fs.stat(output).catch(() => null)) throw new Error('Workbook exists. Preserve manual edits before explicitly rebuilding.');
const read = async p => fs.readFile(path.join(work, p), 'utf8');
const json = async p => JSON.parse(await read(p));
function csv(text) {
  const rows=[]; let row=[],cell='',quoted=false;
  for(let i=0;i<text.length;i++) {const c=text[i];
    if(c==='"') {if(quoted&&text[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}
    else if(c===','&&!quoted){row.push(cell);cell='';}
    else if(c==='\n'&&!quoted){row.push(cell.replace(/\r$/,''));rows.push(row);row=[];cell='';}
    else cell+=c;
  }
  if(cell||row.length){row.push(cell);rows.push(row);}
  const headers=rows.shift();return rows.filter(r=>r.some(Boolean)).map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i]||''])));
}
const clean=s=>(s||'').replace(/\*\*/g,'').trim();
const linkedin=u=>u?u.replace(/^https?:\/\/[a-z]+\.linkedin\.com/i,'https://www.linkedin.com').split('?')[0].replace(/\/$/,'')+'/':'';
const aliases={'Greycroft company':'Greycroft','Lightspeed':'Lightspeed Venture Partners','e&':'e&','K1':'K1 Investment Management'};
const org=s=>aliases[clean(s)]||clean(s);
const uid=(prefix,key)=>prefix+'-'+crypto.createHash('sha256').update(key.toLowerCase()).digest('hex').slice(0,10);
const people=new Map(),firms=new Map();
function firm(f,batch,source) {
  const name=org(f.name),key=name.toLowerCase();
  const current=firms.get(key)||{id:uid('ORG',key),name,batches:[],sources:[],website:'',linkedin:'',region:'',type:'',notes:''};
  if(!current.batches.includes(batch)) current.batches.push(batch);
  if(!current.sources.includes(source)) current.sources.push(source);
  for(const k of ['website','linkedin','region','type','notes']) if(f[k])current[k]=f[k];
  firms.set(key,current);return current;
}
function person(p,batch,source) {
  const url=linkedin(p.linkedin),key=url||[clean(p.name),org(p.organisation)].join('|').toLowerCase();
  let current=people.get(key);
  if(!current)current={id:uid('CON',key),name:clean(p.name),organisation:org(p.organisation),title:'',linkedin:url,batches:[],sources:[],verification:[],notes:[],checked:'',role_sources:[],aliases:[]};
  if(!current.batches.includes(batch))current.batches.push(batch);
  if(!current.sources.includes(source))current.sources.push(source);
  if(p.name!==current.name&&!current.aliases.includes(p.name))current.aliases.push(p.name);
  if(p.title)current.title=p.title;
  if(p.checked&&p.checked>current.checked)current.checked=p.checked;
  if(p.verification&&!current.verification.includes(p.verification))current.verification.push(p.verification);
  if(p.notes&&!current.notes.includes(p.notes))current.notes.push(p.notes);
  if(p.role_source&&!current.role_sources.includes(p.role_source))current.role_sources.push(p.role_source);
  people.set(key,current);return current;
}
const b1=await json('outreach-batch-01/qualified-candidates.json');
for(const f of b1)firm({name:f.name,website:f.website,linkedin:f.linkedin_company,region:f.region,type:f.type},'01','outreach-batch-01/qualified-candidates.json');
for(const p of csv(await read('outreach-batch-01/contacts.csv')))person({name:p.Name,organisation:p.Organisation,title:p['Current title'],linkedin:p.LinkedIn,checked:p['Verified on'],verification:p['Verification status'],notes:p['Role note'],role_source:p['Role source']},'01','outreach-batch-01/contacts.csv');
const b2=await json('outreach-batch-02/candidates.json');
for(const f of b2.candidates)firm({name:f.name,website:f.website,linkedin:f.company_linkedin,region:f.region,type:f.category},'02','outreach-batch-02/candidates.json');
for(const p of csv(await read('outreach-batch-02/contacts.csv')))person({name:p.name,organisation:p.organisation,title:p.current_title,linkedin:p.linkedin,checked:p.accessed_at,verification:p.profile_verification,notes:p.role_note,role_source:p.role_source_url},'02','outreach-batch-02/contacts.csv');
const leadDir='outreach-batch-03/leads';
for(const file of (await fs.readdir(path.join(work,leadDir))).filter(f=>f.endsWith('.md')).sort()) {
  const source=leadDir+'/'+file,text=await read(source);
  let name=clean(text.match(/^# (.+)$/m)?.[1]||file).replace(/\s*[—–]\s*.*$/,'');
  if(file==='greycroft-dylan-pearce.md')name='Greycroft';
  const rows=text.split('\n').filter(l=>/^\|/.test(l));
  const companyRow=rows.find(l=>/linkedin\.com\/company\//.test(l)&&! /linkedin\.com\/in\//.test(l)&&!l.startsWith('| Geography'))||'';
  const companyLink=companyRow.match(/https:\/\/[^)\s]+linkedin\.com\/company\/[^)\s]+/)?.[0]||'';
  const website=companyRow.match(/\[Website\]\(([^)]+)\)/)?.[1]||'';
  firm({name,linkedin:companyLink,website},'03',source);
  for(const line of rows.filter(l=>/linkedin\.com\/in\//.test(l))) {
    const cells=line.split('|').slice(1,-1).map(clean);
    const url=line.match(/https:\/\/[^)\s]+linkedin\.com\/in\/[^)\s]+/)?.[0];
    const links=Array.from(line.matchAll(/\]\((https:[^)]+)\)/g),m=>m[1]);
    person({name:cells[0],organisation:name,title:cells.length>=4?cells[1]:'Partner (see source)',linkedin:url,checked:file==='singtel-innov8.md'&&cells[0]==='Alex Neo'?'2026-10-03':'2026-10-02',verification:cells.at(-1),notes:'Batch 03 suggested contact; transaction authority and interest unconfirmed.',role_source:links.find(l=>!l.includes('linkedin.com'))||source},'03',source);
  }
}
const b4=await json('outreach-batch-04/research.json');
const b4firms=Object.fromEntries(b4.firms.map(f=>[f.id,f]));
for(const f of b4.firms)firm({name:f.name,website:f.website,linkedin:f.linkedin,region:f.area,type:f.type},'04','outreach-batch-04/research.json');
for(const p of b4.contacts)person({name:p.name,organisation:b4firms[p.firm_id].name,title:p.title,linkedin:p.linkedin,checked:p.checked,verification:p.profile_verification,notes:p.reason,role_source:p.profile_source},'04','outreach-batch-04/research.json');
const tw=await json('outreach-batch-04/tech-week-events.json');
for(const p of tw.contacts) {
  const name=p.firm||'Unresolved: Waveline / Lead Edge';
  if(p.firm)firm({name:p.firm,notes:'Tech Week speaker/moderator route; participation is organiser-listed, not personally confirmed.'},'04','outreach-batch-04/tech-week-events.json');
  person({name:p.name,organisation:name,title:p.role||'Unresolved — confirm vehicle',linkedin:p.linkedin,checked:p.checked,verification:p.method,notes:p.caution,role_source:'outreach-batch-04/tech-week-events.json#'+p.event_id},'04','outreach-batch-04/tech-week-events.json');
}
const captures=(await json('contact-register/conversation-import.json')).conversations;
const activities=captures.map((c,i)=> {
  const matches=[...people.values()].filter(p=>p.name===c.name);
  if(matches.length!==1)throw new Error('Ambiguous/missing contact: '+c.name);
  return {entry:i+1,contact_id:matches[0].id,...c,owner:'Josef Neumann',channel:'LinkedIn',direction:'Outbound',follow_up:null,next_action:c.name==='Alex Neo'?'Review reply; arrange introductory call':'Review reply; arrange LA meeting',evidence:'Authenticated LinkedIn visible message; no response at capture'};
});
const sentIds=new Set(activities.map(a=>a.contact_id));
const contacts=[...people.values()].sort((a,b)=>Number(sentIds.has(b.id))-Number(sentIds.has(a.id))||a.name.localeCompare(b.name));
const organisations=[...firms.values()].sort((a,b)=>a.name.localeCompare(b.name));
if(new Set(contacts.map(c=>c.id)).size!==contacts.length)throw new Error('Contact IDs collide');
for(const a of activities)await fs.access(path.join(here,a.file));
const wb=Workbook.create();
const cs=wb.worksheets.add('Contacts'),as=wb.worksheets.add('Activity'),os=wb.worksheets.add('Organisations');
const date=s=>s?new Date(s+'T00:00:00Z'):null;
const col=n=>{let s='';while(n){n--;s=String.fromCharCode(65+n%26)+s;n=Math.floor(n/26);}return s;};
function sheet(s,title,subtitle,headers,rows,widths,tableName) {
  s.showGridLines=false;s.tabColor='#173B56';
  const end=col(headers.length),last=7+rows.length;
  s.getRange(`A1:${end}${last}`).format.font={name:'Arial',size:10,color:'#203549'};
  s.getRange(`A1:${end}1`).format.fill='#173B56';
  s.getRange('A1').values=[[title]];s.getRange('A1').format.font={name:'Arial',size:19,bold:true,color:'#FFFFFF'};
  s.getRange(`A1:${end}1`).format.rowHeight=34;
  s.getRange('A2').values=[[subtitle]];
  s.getRange('A3').values=[['Draft · confidential · local register · checked 2026-10-03']];
  s.getRange('A2:A3').format.font={name:'Arial',size:10,color:'#536779'};
  s.getRange(`A7:${end}7`).values=[headers];
  s.getRange(`A8:${end}${last}`).values=rows;
  const table=s.tables.add(`A7:${end}${last}`,true,tableName);table.style='TableStyleMedium2';table.showFilterButton=true;
  s.getRange(`A7:${end}7`).format={fill:'#173B56',font:{bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:32};
  s.getRange(`A8:${end}${last}`).format.rowHeight=34;
  s.getRange(`A8:${end}${last}`).format.verticalAlignment='center';
  s.getRange(`A8:${end}${last}`).format.wrapText=true;
  widths.forEach((w,i)=>s.getRange(`${col(i+1)}1:${col(i+1)}${last}`).format.columnWidth=w);
  s.freezePanes.freezeRows(7);s.freezePanes.freezeColumns(2);
  return table;
}
const ch=['Contact ID','Name','Organisation','Latest logged status','First recorded contact','Last activity date','Follow-up date','Next action','LinkedIn profile','Batches','Published role / relevance','Source files','Verification / role caution','Latest log entry','Last channel','Conversation file','Thread URL'];
const cr=contacts.map(p=>[p.id,p.name,p.organisation,null,null,null,null,null,p.linkedin,p.batches.map(b=>'Batch '+b).join('; '),p.title,p.sources.join('; '),[...p.verification,...p.notes,...(p.aliases.length?['Name aliases: '+p.aliases.join('; ')]:[])].join(' | '),null,null,null,null]);
sheet(cs,'Circularo investor contact register','One row per person across batches 01–04. Add interactions on Activity; status and dates update here.',ch,cr,[19,25,29,25,17,17,17,34,43,23,48,56,80,15,16,50,60],'ContactsTable');
const ah=['Entry','Contact ID','Date','Displayed time','Timezone','Channel','Direction','Status','Subject / interaction','Follow-up date','Next action','Thread URL','Conversation file','Owner','Evidence / source'];
const ar=activities.map(a=>[a.entry,a.contact_id,date(a.date),a.time,a.timezone,a.channel,a.direction,a.status,a.subject,null,a.next_action,a.url,a.file,a.owner,a.evidence]);
ar.push(Array(ah.length).fill(null));
const at=sheet(as,'Investor outreach activity log','Append one interaction per row. Use a new, increasing Entry number and the Contact ID from Contacts.',ah,ar,[10,19,17,17,36,15,15,26,65,17,38,60,48,22,65],'ActivityTable');
as.getRange('C8:C16').format.numberFormat='yyyy-mm-dd';as.getRange('J8:J16').format.numberFormat='yyyy-mm-dd';
as.getRange('H8:H16').dataValidation={rule:{type:'list',values:['Sent awaiting reply','Replied','Follow-up sent','Meeting proposed','Meeting confirmed','Met','Paused','Declined','Closed']}};
as.getRange('G8:G16').dataValidation={rule:{type:'list',values:['Outbound','Inbound','Meeting','Internal note']}};
as.getRange('A8:O16').format.font.color='#1F5FAD';
as.getRange('A4').values=[['Capacity: 1,000 activity rows. Keep Entry numbers unique and increasing; see README for extending the register.']];
const activityColumns=Object.fromEntries(ah.map((h,i)=>[h,col(i+1)]));
const activity=field=>`'Activity'!$${activityColumns[field]}$8:$${activityColumns[field]}$1007`;
cs.getRange('A5').values=[['Contacts']];cs.getRange('B5').formulas=[['=COUNTA(ContactsTable[Contact ID])']];
cs.getRange('C5').values=[['Awaiting reply']];cs.getRange('D5').formulas=[['=COUNTIFS(ContactsTable[Latest logged status],"Sent awaiting reply")']];
cs.getRange('E5').values=[['No activity recorded']];cs.getRange('F5').formulas=[['=COUNTIFS(ContactsTable[Latest logged status],"No outreach recorded")']];
for(let i=0;i<contacts.length;i++) {
  const r=i+8,id=`$A${r}`,entry=`$N${r}`;
  cs.getRange('N'+r).formulas=[[`=IF(COUNTIFS(${activity('Contact ID')},${id})=0,"",_xlfn.MAXIFS(${activity('Entry')},${activity('Contact ID')},${id}))`]];
  const lookup=field=>`_xlfn.XLOOKUP(${entry},${activity('Entry')},${activity(field)},"")`;
  cs.getRange('D'+r).formulas=[[`=IF(${entry}="","No outreach recorded",${lookup('Status')})`]];
  for(const [c,fn] of [['E','MINIFS'],['F','MAXIFS']])cs.getRange(c+r).formulas=[[`=IF(${entry}="","",_xlfn.${fn}(${activity('Date')},${activity('Contact ID')},${id}))`]];
  for(const [c,field] of [['G','Follow-up date'],['H','Next action'],['O','Channel'],['P','Conversation file'],['Q','Thread URL']])cs.getRange(c+r).formulas=[[`=IF(${entry}="","",IF(${lookup(field)}=0,"",${lookup(field)}))`]];
}
cs.getRange(`E8:G${7+contacts.length}`).format.numberFormat='yyyy-mm-dd';
cs.getRange(`D8:D${7+contacts.length}`).conditionalFormats.add('containsText',{text:'Sent awaiting reply',format:{fill:'#FFF0C4',font:{color:'#765700'}}});
cs.getRange(`D8:D${7+contacts.length}`).conditionalFormats.add('containsText',{text:'Replied',format:{fill:'#DCEDE3',font:{color:'#185735'}}});
const oh=['Organisation ID','Organisation','Batches','Named contacts','Website','Company LinkedIn','Region / location','Investor type','Source files','Qualification caution'];
const or=organisations.map(f=>[f.id,f.name,f.batches.map(b=>'Batch '+b).join('; '),contacts.filter(p=>p.organisation===f.name).length,f.website,f.linkedin,f.region,f.type,f.sources.join('; '),f.notes||'Research candidate; transaction fit and interest unconfirmed.']);
sheet(os,'Investor organisations','Research coverage, including firms without an identified person. Outreach history is recorded per person.',oh,or,[21,32,25,18,43,48,28,42,60,70],'OrganisationsTable');
wb.recalculate();
const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:100}});
await fs.writeFile(path.join(here,'formula-inspection.json'),errors.ndjson);
console.log('FORMULA_ERRORS',errors.ndjson);
console.log('SUMMARY',JSON.stringify(cs.getRange('A5:H16').values));
// Prove that an appended log entry drives a previously uncontacted person; then clear the test row.
const probe=contacts.find(p=>!sentIds.has(p.id)),row=ar.length+8;
at.rows.add(null,[[9,probe.id,date('2026-10-04'),null,'Unknown','LinkedIn','Inbound','Replied','TEST — removed before delivery',null,'TEST — removed',null,null,'Josef Neumann','Test only']]);
wb.recalculate();
const probeRow=contacts.findIndex(p=>p.id===probe.id)+8;
const testResult=cs.getRange(`B${probeRow}:H${probeRow}`).values;
console.log('APPEND_TEST',JSON.stringify(testResult));
if(!JSON.stringify(testResult).includes('Replied'))throw new Error('Activity expansion test failed');
as.getRange(`A${row}:O${row}`).clear({applyTo:'contents'});
as.getRange('H8').values=[['Replied']];wb.recalculate();
const sentProbe=contacts.findIndex(p=>p.id===activities[0].contact_id)+8;
const statusTest=cs.getRange(`D${sentProbe}:D${sentProbe}`).values;
if(!JSON.stringify(statusTest).includes('Replied'))throw new Error('Status update test failed');
as.getRange('H8').values=[['Sent awaiting reply']];wb.recalculate();
console.log('FINAL_SUMMARY',JSON.stringify(cs.getRange('A5:H16').values));
const allValues=[cs,as,os].flatMap(s=>s.getUsedRange().values.flat());
if(allValues.some(v=>typeof v==='string'&&/^#(REF!|DIV\/0!|VALUE!|NAME\?|N\/A|NUM!|NULL!|SPILL!|CALC!)/.test(v)))throw new Error('Formula error in workbook');
if(cs.getRange('B5').values[0][0]!==contacts.length||cs.getRange('D5').values[0][0]!==8)throw new Error('Final contact/activity reconciliation failed');
for(const [name,range] of [['Contacts','A1:H16'],['Activity','A1:I16'],['Organisations','A1:G16']]) {
  const preview=await wb.render({sheetName:name,range,scale:1,format:'png'});
  await fs.writeFile(path.join(here,name.toLowerCase()+'-preview.png'),new Uint8Array(await preview.arrayBuffer()));
}
const file=await SpreadsheetFile.exportXlsx(wb);await file.save(output);
await fs.writeFile(path.join(here,'import-snapshot.json'),JSON.stringify({status:'draft',classification:'confidential',canonical:false,as_of:'2026-10-03',contacts,organisations,activities,counts:{contacts:contacts.length,organisations:organisations.length,activities:activities.length}},null,2));
console.log('SAVED',JSON.stringify({path:output,contacts:contacts.length,organisations:organisations.length,activities:activities.length,by_batch:Object.fromEntries(['01','02','03','04'].map(b=>[b,contacts.filter(c=>c.batches.includes(b)).length]))}));
