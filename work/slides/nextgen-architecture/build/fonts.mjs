import { GlobalFonts } from '@napi-rs/canvas';
import { createRequire } from 'node:module';
const root='/Users/josefneumann/Projects/ai-workspace/sales-system/.agents/skills/circularo-slides/assets/fonts/';
for (const [file,family] of [['spartan-bold.ttf','Spartan'],['mulish-regular.ttf','Mulish'],['mulish-bold.ttf','Mulish']]) GlobalFonts.registerFromPath(root+file,family);
try {
  const require=createRequire(import.meta.url);
  const {FontLibrary}=require('/Users/josefneumann/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/node_modules/skia-canvas');
  FontLibrary.use('Spartan',[root+'spartan-bold.ttf']);
  FontLibrary.use('Mulish',[root+'mulish-regular.ttf',root+'mulish-bold.ttf']);
  if(!FontLibrary.families.includes('Spartan')||!FontLibrary.families.includes('Mulish'))throw new Error('Brand fonts missing');
} catch(e) { throw new Error('Could not register brand fonts',{cause:e}); }
