import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SKILL_DIR = "/Users/josefneumann/.codex/plugins/cache/openai-primary-runtime/presentations/26.904.11930/skills/presentations";
const workspaceDir = "/Users/josefneumann/Projects/ai-workspace/sales-system/work/slides/circularo-saas-end-to-end-trusted-execution-internal";
const candidatePath = path.join(workspaceDir, "build/candidate.pptx");
const finalPath = path.join(workspaceDir, "output/circularo-saas-end-to-end-trusted-execution-internal.pptx");
const pythonExecutable = "/Users/josefneumann/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3";

const { finalizePresentation } = await import(pathToFileURL(path.join(SKILL_DIR, "container_tools/artifact_tool_utils.mjs")).href);
const stagingDir = path.join(workspaceDir, "build/finalizer");
await fs.mkdir(stagingDir, { recursive: true });
await fs.mkdir(path.dirname(finalPath), { recursive: true });

const result = await finalizePresentation({
  workspaceDir,
  candidatePath,
  finalPath,
  explicitTotalSlideCount: 19,
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [],
  pythonExecutable,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: ["--expected-slide-size-emu", "12192000,6858000", "--validate-bullet-geometry", "--validate-heading-fit"],
  fontPolicy: { basis: "design", families: ["Spartan", "Mulish"] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(stagingDir, "circularo-saas-end-to-end-trusted-execution-internal.pptx.validation.json"),
});

await fs.chmod(finalPath, 0o644);
console.log(JSON.stringify(result, null, 2));
