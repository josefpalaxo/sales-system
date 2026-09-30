import path from 'node:path';
import {GlobalFonts} from '@napi-rs/canvas';
const root=path.resolve(import.meta.dirname,'..');
const fontdir=path.resolve(root,'../../.agents/skills/circularo-slides/assets/fonts');
for(const[f,family]of [['spartan-bold.ttf','Spartan'],['mulish-regular.ttf','Mulish'],['mulish-bold.ttf','Mulish']])GlobalFonts.registerFromPath(path.join(fontdir,f),family);
process.argv=['node','render_presentation.mjs','--input',process.env.DDA_RENDER_INPUT||path.join(root,'outputs/dda-business-case-v2/DDA-executive-proposal.pptx'),'--output_dir',process.env.DDA_RENDER_OUTPUT||path.join(root,'build/dda-executive/rendered')];
await import('/Users/josefneumann/.codex/plugins/cache/openai-primary-runtime/presentations/26.909.61513/skills/presentations/container_tools/render_presentation.mjs');
