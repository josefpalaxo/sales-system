import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const TASK = "/Users/josefneumann/Projects/ai-workspace/sales-system/work/slides/trusted-execution-agentic-era-internal";
const SKILL_DIR = process.env.SKILL_DIR;
const RUNTIME_PYTHON = process.env.RUNTIME_PYTHON;
if (!SKILL_DIR || !RUNTIME_PYTHON) throw new Error("SKILL_DIR and RUNTIME_PYTHON are required");

const candidatePath = path.join(TASK, "build/candidate.pptx");
const finalPath = path.join(TASK, "output/trusted-execution-agentic-era-internal.pptx");
const stagingDir = path.join(TASK, "build/finalizer");
await fs.mkdir(stagingDir, { recursive: true });
await fs.mkdir(path.dirname(finalPath), { recursive: true });

const { finalizePresentation } = await import(pathToFileURL(path.join(SKILL_DIR, "container_tools/artifact_tool_utils.mjs")).href);
const result = await finalizePresentation({
  workspaceDir: TASK,
  candidatePath,
  finalPath,
  explicitTotalSlideCount: 23,
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [],
  pythonExecutable: RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: [
    "--expected-slide-size-emu", "12192000,6858000",
    "--validate-bullet-geometry",
    "--validate-heading-fit",
  ],
  fontPolicy: { basis: "design", families: ["Spartan", "Mulish"] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(stagingDir, "trusted-execution-agentic-era-internal.pptx.validation.json"),
});
await fs.chmod(finalPath, 0o644);
console.log(JSON.stringify(result, null, 2));
