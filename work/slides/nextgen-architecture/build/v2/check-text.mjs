import '../fonts.mjs';
import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
const req=createRequire(import.meta.url);
const {Canvas}=req('/Users/josefneumann/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/node_modules/skia-canvas');
const ctx=new Canvas(1,1).getContext('2d');
const issues=[];
for(let i=1;i<=4;i++){
 const l=JSON.parse(await fs.readFile(new URL(`./slide-${i}.layout.json`,import.meta.url),'utf8'));
 for(const e of l.elements){
  if(!e.text||!e.style)continue;
  const s=e.style;
  ctx.font=`${s.bold?'bold ':''}${s.fontSize}px "${s.typeface}"`;
  for(const line of e.text.split('\n')){
   const width=ctx.measureText(line).width;
   if(width>e.position.width+1)issues.push({slide:i,name:e.name,text:line,width,available:e.position.width});
  }
 }
}
console.log(JSON.stringify(issues,null,2));
if(issues.length)process.exitCode=1;
