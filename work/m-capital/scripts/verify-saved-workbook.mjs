// Read-only workbook QA: render selected saved-file ranges, never rewrite the XLSX.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {FileBlob,SpreadsheetFile} from '@oai/artifact-tool';
process.on('uncaughtException',e=>{console.error(e.stack);process.exit(1);});
const root=path.resolve(import.meta.dirname,'..');
const input=path.join(root,'outputs/investor-analysis/Circularo Investor Customer Revenue & Retention Analysis.xlsx');
const before=crypto.createHash('sha256').update(await fs.readFile(input)).digest('hex');
const wb=await SpreadsheetFile.importXlsx(await FileBlob.load(input));
for(const [sheetName,range,label] of [['Mix and Cohorts','H30:J39','Saved-geography'],['Checks','C17:F28','Saved-evidence-checks'],['Contracts','AC7:AF17','Saved-contract-IDs']]){
 const png=await wb.render({sheetName,range,scale:1,format:'png'});
 await fs.writeFile(path.join(root,'previews/investor-analysis',label+'.png'),new Uint8Array(await png.arrayBuffer()));
 console.log('Rendered saved-file QA',label);
}
if(crypto.createHash('sha256').update(await fs.readFile(input)).digest('hex')!==before)throw new Error('Workbook changed during read-only QA');
console.log('Saved-file renders complete; workbook hash unchanged',before);
