import './fonts.mjs';
import {finalizePresentation} from '/Users/josefneumann/.codex/plugins/cache/openai-primary-runtime/presentations/26.927.11222/skills/presentations/container_tools/artifact_tool_utils.mjs';
const dir='/Users/josefneumann/Projects/ai-workspace/sales-system/work/slides/nextgen-architecture';
const skill='/Users/josefneumann/.codex/plugins/cache/openai-primary-runtime/presentations/26.927.11222/skills/presentations';
const result=await finalizePresentation({
 workspaceDir:dir,
 candidatePath:dir+'/build/candidate.pptx',
 finalPath:dir+'/build/checked/validated-deck.pptx',
 pythonExecutable:'/Users/josefneumann/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',
 integrityValidatorPath:skill+'/container_tools/inspect_presentation_package_integrity.py',
 layoutValidatorPath:skill+'/container_tools/inspect_presentation_layout_geometry.py',
 layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit'],
 explicitTotalSlideCount:2,
 requiredNativeTableOwnerSlides:[],
 requiredNativeChartOwnerSlides:[],
 fontPolicy:{basis:'design',families:['Spartan','Mulish']},
 verifyArtifactToolImport:true,
 receiptPath:dir+'/build/repaired-validation.json'
});
console.log(JSON.stringify(result));
