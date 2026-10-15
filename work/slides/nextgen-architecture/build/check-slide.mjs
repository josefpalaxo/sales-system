import './fonts.mjs';
import fs from 'node:fs/promises';
import {FileBlob,PresentationFile} from '@oai/artifact-tool';
const dir='/Users/josefneumann/Projects/ai-workspace/sales-system/work/slides/nextgen-architecture';
const p=await PresentationFile.importPptx(await FileBlob.load(dir+'/output/circularo-nextgen-investor-architecture.pptx'));
const blob=await p.export({slide:p.slides.items[1],format:'png',scale:1.25});
await fs.writeFile(dir+'/build/slide-2-independent.png',new Uint8Array(await blob.arrayBuffer()));
