import fs from 'node:fs/promises';
import path from 'node:path';
import {FileBlob,SpreadsheetFile} from '@oai/artifact-tool';
const root=path.resolve(import.meta.dirname,'..');
const qa=path.join(root,'build/growth-50');
await fs.mkdir(qa,{recursive:true});
const source=path.join(root,'outputs/dda-business-case-v2/DDA-savings-model-v2.2xlsx.xlsx');
const wb=await SpreadsheetFile.importXlsx(await FileBlob.load(source));
const value=(s,a)=>wb.worksheets.getItem(s).getRange(a).values[0][0];
console.log(JSON.stringify({growth:value('Setup','E67'),annualGrowth:value('Setup','E68'),commitment:value('Summary','E4')}));
if(process.argv.includes('--preview')||process.argv.includes('--charts')){
 const charts=process.argv.includes('--charts');
 const image=await wb.render({sheetName:'Summary',range:charts?'C41:J57':'C28:J39',scale:1,format:'png'});
 await fs.writeFile(path.join(qa,charts?'charts.png':'before.png'),new Uint8Array(await image.arrayBuffer()));
}else{
 await fs.copyFile(source,path.join(qa,'before.xlsx'));
 wb.worksheets.getItem('Setup').getRange('E67').values=[[0.50]];
 wb.recalculate();
 const checks={'Potential!E23':655,'Potential!D28':1965,'Potential!E72':3114,'Summary!E32':.6886};
 for(const[k,v]of Object.entries(checks)){const[s,a]=k.split('!');if(Math.abs(value(s,a)-v)>.00001)throw Error(k+' differs');}
 const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:100},summary:'50% growth update'});
 await fs.writeFile(path.join(qa,'errors.ndjson'),errors.ndjson);
 console.log(errors.ndjson);
 await(await SpreadsheetFile.exportXlsx(wb)).save(path.join(qa,path.basename(source)));
 for(const[sheetName,range,name]of [['Summary','C2:J39','summary'],['Summary','C61:E66','adoption'],['Potential','C25:I41','forecast']]){
  const image=await wb.render({sheetName,range,scale:1,format:'png'});
  await fs.writeFile(path.join(qa,name+'.png'),new Uint8Array(await image.arrayBuffer()));
 }
 const results={};for(const c of 'DEFGHI')results[c]=Object.fromEntries([28,29,30,32,38,39,40].map(r=>[r,value('Potential',c+r)]));
 await fs.writeFile(path.join(qa,'calculated.json'),JSON.stringify(results,null,2));
 console.log(JSON.stringify(results));
}
