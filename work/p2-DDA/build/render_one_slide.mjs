import fs from 'node:fs/promises';
import path from 'node:path';
import {GlobalFonts} from '@napi-rs/canvas';
import {FileBlob,PresentationFile} from '@oai/artifact-tool';
const root=path.resolve(import.meta.dirname,'..'),i=Number(process.argv[2]||2);
for(const[f,family]of [['spartan-bold.ttf','Spartan'],['mulish-regular.ttf','Mulish'],['mulish-bold.ttf','Mulish']])GlobalFonts.registerFromPath(path.resolve(root,'../../.agents/skills/circularo-slides/assets/fonts',f),family);
const p=await PresentationFile.importPptx(await FileBlob.load(path.join(root,'outputs/dda-business-case/DDA-executive-slides.pptx')));
const b=await p.export({slide:p.slides.items[i-1],format:'png',scale:1});
await fs.writeFile(path.join(root,`build/slides-final/isolated-${i}.png`),new Uint8Array(await b.arrayBuffer()));
