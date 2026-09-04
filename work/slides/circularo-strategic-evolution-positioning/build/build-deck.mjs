import fs from "node:fs/promises";
import path from "node:path";
import { Presentation, PresentationFile } from "@oai/artifact-tool";
import {
  CANVAS,
  COLORS,
  MARGIN,
  addChrome,
  addDivider,
  addEyebrow,
  addRect,
  addSlideTitle,
  addSources,
  addText,
} from "/Users/josefneumann/Projects/ai-workspace/sales-system/.agents/skills/circularo-slides/scripts/circularo-slide-system.mjs";

const ROOT = "/Users/josefneumann/Projects/ai-workspace/sales-system";
const TASK = path.join(ROOT, "work/slides/circularo-strategic-evolution-positioning");
const BUILD = path.join(TASK, "build/render");
const DRAFT = path.join(TASK, "build/candidate.pptx");
const SOURCE = "work/new-story/Circularo-Narrative-Trust-Orchestration-and-Agentic-Trusted-Execution.md";
const BRAND = ".agents/skills/circularo-slides/references/brand-system.md";

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

function addInternalMark(slide, dark) {
  addText(slide, {
    name: "internal-strategy-mark",
    text: "INTERNAL STRATEGY · WORKING NARRATIVE",
    left: 882,
    top: 34,
    width: 298,
    height: 20,
    role: "chrome",
    fontSize: 12,
    color: dark ? "#C9AEFF" : COLORS.neutral500,
    alignment: "right",
  });
}

async function baseSlide(presentation, pageNumber, { dark = false, eyebrow = "Circularo strategic evolution" } = {}) {
  const slide = presentation.slides.add();
  slide.background.fill = dark ? COLORS.darkBlue : COLORS.white;
  await addChrome(slide, pageNumber, { dark });
  addEyebrow(slide, eyebrow, { dark, width: 720 });
  addInternalMark(slide, dark);
  addSources(slide, [SOURCE, BRAND]);
  return slide;
}

function addTakeaway(slide, text, { dark = false, top = 610, width = 1100 } = {}) {
  addDivider(slide, {
    name: "takeaway-accent",
    left: MARGIN,
    top: top - 14,
    width: 194,
    height: 3,
    color: COLORS.purple,
  });
  addText(slide, {
    name: "takeaway",
    text,
    left: MARGIN,
    top,
    width,
    height: 44,
    role: "bodyBold",
    fontSize: 21.5,
    color: dark ? COLORS.white : COLORS.darkBlue,
  });
}

function addLabel(slide, name, text, left, top, width, { dark = false, align = "left" } = {}) {
  addText(slide, {
    name,
    text: text.toUpperCase(),
    left,
    top,
    width,
    height: 22,
    role: "chrome",
    fontSize: 13,
    color: dark ? "#C9AEFF" : COLORS.purple,
    alignment: align,
  });
}

function addNumberBadge(slide, name, value, left, top, { active = false, dark = false } = {}) {
  addRect(slide, {
    name: `${name}-frame`,
    left,
    top,
    width: 42,
    height: 42,
    fill: active ? COLORS.purple : dark ? COLORS.darkBlue : COLORS.white,
    lineFill: active ? COLORS.purple : dark ? "#8C6BFF" : COLORS.purple,
    lineWidth: 2,
    radius: 10,
  });
  addText(slide, {
    name: `${name}-text`,
    text: value,
    left,
    top: top + 10,
    width: 42,
    height: 22,
    role: "chrome",
    fontSize: 14,
    color: active || dark ? COLORS.white : COLORS.darkBlue,
    alignment: "center",
  });
}

async function addCover(slide) {
  addLabel(slide, "cover-kicker", "Circularo strategic narrative", 48, 124, 540, { dark: true });
  addText(slide, {
    name: "cover-title",
    text: "Circularo’s strategic\nevolution",
    left: 48,
    top: 174,
    width: 680,
    height: 160,
    role: "hero",
    fontSize: 61,
    color: COLORS.white,
  });
  addText(slide, {
    name: "cover-subtitle",
    text: "Trust orchestration and agentic trusted execution",
    left: 48,
    top: 366,
    width: 650,
    height: 72,
    role: "body",
    fontSize: 26,
    color: "#E6DEFF",
  });
  addText(slide, {
    name: "cover-audience",
    text: "Leadership · Product · Sales · Marketing",
    left: 48,
    top: 500,
    width: 620,
    height: 28,
    role: "bodyBold",
    fontSize: 17,
    color: "#C9AEFF",
  });

  const stages = [
    ["01", "DIGITAL\nSIGNATURES", 140],
    ["02", "DIGITAL\nTRUST", 250],
    ["03", "TRUSTED\nEXECUTION", 360],
    ["04", "AGENTIC TRUSTED\nEXECUTION", 470],
  ];
  addDivider(slide, { name: "cover-spine", left: 872, top: 164, width: 3, height: 388, color: "#6E51DA" });
  stages.forEach(([number, label, top], index) => {
    addNumberBadge(slide, `cover-stage-${index + 1}`, number, 852, top, { active: index === 3, dark: true });
    addText(slide, {
      name: `cover-stage-label-${index + 1}`,
      text: label,
      left: 922,
      top: top - 2,
      width: 250,
      height: 54,
      role: "bodyBold",
      fontSize: index === 3 ? 22 : 20,
      color: index === 3 ? COLORS.white : "#D8C9FF",
    });
  });
}

function addEvolution(slide) {
  addSlideTitle(slide, "One continuous expansion of the trust problem", { width: 1160 });
  const stages = [
    ["01", "Digital signatures", "Prove who signed and preserve document integrity"],
    ["02", "Digital trust", "Maintain identity and authority across the process"],
    ["03", "Trusted execution", "Complete a trusted action with controls and evidence"],
    ["04", "Agentic trusted execution", "Apply the same model when AI agents act"],
  ];
  addDivider(slide, { name: "evolution-line", left: 104, top: 348, width: 1068, height: 3, color: COLORS.neutral300 });
  stages.forEach(([number, title, body], index) => {
    const left = 48 + index * 296;
    addNumberBadge(slide, `evolution-${index + 1}`, number, left + 18, 328, { active: index === 3 });
    addText(slide, {
      name: `evolution-title-${index + 1}`,
      text: title,
      left,
      top: 398,
      width: 250,
      height: 62,
      role: "componentTitle",
      fontSize: 24,
      color: COLORS.darkBlue,
      alignment: "center",
    });
    addText(slide, {
      name: `evolution-body-${index + 1}`,
      text: body,
      left,
      top: 478,
      width: 250,
      height: 82,
      role: "body",
      fontSize: 18.5,
      color: COLORS.body,
      alignment: "center",
    });
  });
  addTakeaway(slide, "Signatures remain foundational as the scope expands around them.");
}

function addMarketShift(slide) {
  addSlideTitle(slide, "Differentiation is moving above trust infrastructure", { dark: true, width: 1160 });
  addLabel(slide, "market-thesis-label", "Strategic market thesis", 48, 228, 330, { dark: true });
  addText(slide, {
    name: "market-thesis",
    text: "Shared identity, signature, seal, timestamp, PKI, and sovereign cloud services strengthen the foundation.",
    left: 48,
    top: 260,
    width: 500,
    height: 154,
    role: "sectionTitle",
    fontSize: 28,
    color: COLORS.white,
  });
  addText(slide, {
    name: "market-implication",
    text: "Circularo differentiates by connecting that foundation to authority, workflow, policy, evidence, integrations, and operating control.",
    left: 48,
    top: 442,
    width: 510,
    height: 118,
    role: "body",
    fontSize: 21.5,
    color: "#D8C9FF",
  });

  addRect(slide, { name: "foundation-layer", left: 660, top: 428, width: 520, height: 124, fill: "#3516AA", lineFill: "#6E51DA", lineWidth: 1, radius: 12 });
  addLabel(slide, "foundation-label", "Trust infrastructure", 690, 454, 450, { dark: true, align: "center" });
  addText(slide, {
    name: "foundation-items",
    text: "Identity · PKI · Signatures · Seals · Timestamps · Sovereign cloud",
    left: 690,
    top: 488,
    width: 450,
    height: 48,
    role: "body",
    fontSize: 18,
    color: COLORS.white,
    alignment: "center",
  });
  addRect(slide, { name: "orchestration-layer", left: 620, top: 236, width: 600, height: 152, fill: COLORS.purple, radius: 12 });
  addLabel(slide, "orchestration-label", "Circularo trust orchestration", 660, 260, 520, { dark: true, align: "center" });
  addText(slide, {
    name: "orchestration-items",
    text: "Authority · Workflow · Policy · Approval\nEvidence · Compliance · Integration · Deployment control",
    left: 660,
    top: 302,
    width: 520,
    height: 70,
    role: "bodyBold",
    fontSize: 20,
    color: COLORS.white,
    alignment: "center",
  });
  addTakeaway(slide, "Circularo connects shared trust infrastructure with real business processes and outcomes.", { dark: true });
}

function addCoreDistinction(slide) {
  addSlideTitle(slide, "Trust orchestration and trusted execution serve different roles", { width: 1160 });
  addRect(slide, { name: "orchestration-panel", left: 48, top: 252, width: 520, height: 270, fill: COLORS.softPurple, lineFill: "#C9AEFF", lineWidth: 1, radius: 12 });
  addLabel(slide, "orchestration-number", "01 · Platform capability", 84, 284, 440);
  addText(slide, { name: "orchestration-name", text: "Trust Orchestration", left: 84, top: 326, width: 430, height: 54, role: "sectionTitle", color: COLORS.darkBlue });
  addText(slide, { name: "orchestration-definition", text: "Connects actors, content, authority, workflow, trust services, and evidence across the business process.", left: 84, top: 404, width: 430, height: 92, role: "body", fontSize: 21, color: COLORS.body });
  addRect(slide, { name: "execution-panel", left: 664, top: 252, width: 568, height: 270, fill: COLORS.darkBlue, radius: 12 });
  addLabel(slide, "execution-number", "02 · Business outcome", 700, 284, 480, { dark: true });
  addText(slide, { name: "execution-name", text: "Trusted Execution", left: 700, top: 326, width: 460, height: 54, role: "sectionTitle", color: COLORS.white });
  addText(slide, { name: "execution-definition", text: "Produces a trusted and verifiable action with the appropriate controls, assurance, and retained evidence.", left: 700, top: 404, width: 460, height: 92, role: "body", fontSize: 21, color: "#E6DEFF" });
  addTakeaway(slide, "Circularo orchestrates trust so the organization can complete a trusted action.");
}

function addTrustChain(slide) {
  addSlideTitle(slide, "The full trust chain begins before signing", { width: 1140 });
  const phases = [
    ["01", "Prepare", "Create\nCollaborate\nReview"],
    ["02", "Govern", "Identify\nAuthorize\nApprove"],
    ["03", "Assure", "Sign or seal\nTimestamp\nExecute"],
    ["04", "Preserve", "Evidence\nAudit\nArchive"],
  ];
  addDivider(slide, { name: "chain-spine", left: 98, top: 330, width: 1076, height: 4, color: COLORS.purple });
  phases.forEach(([number, title, items], index) => {
    const left = 48 + index * 296;
    addNumberBadge(slide, `chain-${index + 1}`, number, left + 104, 309, { active: index === 1 });
    addText(slide, { name: `chain-title-${index + 1}`, text: title, left, top: 382, width: 250, height: 42, role: "componentTitle", fontSize: 24, color: COLORS.darkBlue, alignment: "center" });
    addText(slide, { name: `chain-items-${index + 1}`, text: items, left, top: 444, width: 250, height: 100, role: "body", fontSize: 20, color: COLORS.body, alignment: "center" });
  });
  addTakeaway(slide, "Signing remains essential, but it represents one event inside a broader trust chain.");
}

function addPlatformScope(slide) {
  addSlideTitle(slide, "Circularo connects the full business process", { dark: true, width: 1120 });
  const rows = [
    ["Content and collaboration", "Create, review, prepare, and integrate important business content"],
    ["Authority and workflow", "Coordinate roles, permissions, policy, review, and approval"],
    ["Trust services", "Invoke identity, signatures, seals, timestamps, and external services"],
    ["Evidence and records", "Retain the authoritative version, decisions, events, and audit context"],
    ["Unified Trust API", "Extend the trust model into services, applications, portals, and AI agents"],
  ];
  rows.forEach(([title, body], index) => {
    const top = 230 + index * 72;
    addDivider(slide, { name: `scope-rule-${index + 1}`, left: 48, top: top + 58, width: 1132, height: 1, color: "#5B3BC9" });
    addText(slide, { name: `scope-number-${index + 1}`, text: String(index + 1).padStart(2, "0"), left: 48, top, width: 54, height: 32, role: "chrome", fontSize: 15, color: "#C9AEFF" });
    addText(slide, { name: `scope-title-${index + 1}`, text: title, left: 120, top: top - 4, width: 330, height: 38, role: "bodyBold", fontSize: 22, color: COLORS.white });
    addText(slide, { name: `scope-body-${index + 1}`, text: body, left: 470, top: top - 4, width: 710, height: 42, role: "body", fontSize: 19.5, color: "#E6DEFF" });
  });
  addTakeaway(slide, "The platform links trust events into one controlled and verifiable business outcome.", { dark: true });
}

function addDeploymentModels(slide) {
  addSlideTitle(slide, "One platform supports three delivery models", { width: 1110 });
  const models = [
    ["Circularo SaaS", "Managed Circularo cloud services for organizations that want to consume the platform as SaaS"],
    ["Circularo Sovereign", "Dedicated or customer-controlled infrastructure for sovereignty, isolation, residency, and deployment control"],
    ["Circularo Shared Services", "A governed common platform operated centrally for multiple organizations or institutions"],
  ];
  models.forEach(([title, body], index) => {
    const left = 48 + index * 400;
    addLabel(slide, `model-number-${index + 1}`, `0${index + 1}`, left, 252, 80);
    addText(slide, { name: `model-title-${index + 1}`, text: title, left, top: 294, width: 340, height: 68, role: "sectionTitle", fontSize: 27, color: COLORS.darkBlue });
    addText(slide, { name: `model-body-${index + 1}`, text: body, left, top: 386, width: 340, height: 126, role: "body", fontSize: 20, color: COLORS.body });
  });
  addRect(slide, { name: "common-platform", left: 48, top: 550, width: 1132, height: 54, fill: COLORS.purple, radius: 10 });
  addText(slide, { name: "common-platform-text", text: "ONE TRUST ORCHESTRATION PLATFORM · COMMON GOVERNANCE · COMMON EVIDENCE MODEL", left: 88, top: 568, width: 1052, height: 24, role: "chrome", fontSize: 15, color: COLORS.white, alignment: "center" });
}

function addAgenticShift(slide) {
  addSlideTitle(slide, "Agentic systems change who can initiate action", { dark: true, width: 1120 });
  const stages = [
    ["01", "Digital", "People move information online"],
    ["02", "Automated", "Systems execute repeatable rules"],
    ["03", "AI assisted", "Systems interpret and recommend"],
    ["04", "Agentic", "Software initiates trusted actions"],
  ];
  addDivider(slide, { name: "agentic-spine", left: 92, top: 370, width: 1080, height: 3, color: "#6E51DA" });
  stages.forEach(([number, title, body], index) => {
    const left = 48 + index * 296;
    addNumberBadge(slide, `agentic-${index + 1}`, number, left + 104, 349, { active: index === 3, dark: true });
    addText(slide, { name: `agentic-title-${index + 1}`, text: title, left, top: 420, width: 250, height: 42, role: "componentTitle", fontSize: 24, color: COLORS.white, alignment: "center" });
    addText(slide, { name: `agentic-body-${index + 1}`, text: body, left, top: 478, width: 250, height: 74, role: "body", fontSize: 18.5, color: "#D8C9FF", alignment: "center" });
  });
  addTakeaway(slide, "Greater autonomy requires stronger institutional control.", { dark: true });
}

function addAuthorityQuestions(slide) {
  addSlideTitle(slide, "Intelligence and authority answer different questions", { width: 1160 });
  addRect(slide, { name: "intelligence-area", left: 48, top: 238, width: 430, height: 310, fill: COLORS.darkBlue, radius: 12 });
  addLabel(slide, "intelligence-label", "Intelligence", 84, 274, 300, { dark: true });
  addText(slide, { name: "intelligence-statement", text: "An AI agent may determine what should happen.", left: 84, top: 326, width: 350, height: 100, role: "sectionTitle", fontSize: 30, color: COLORS.white });
  addText(slide, { name: "authority-statement", text: "Institutional authority determines whether it may execute.", left: 84, top: 448, width: 350, height: 76, role: "bodyBold", fontSize: 21, color: "#C9AEFF" });

  const questions = [
    ["Actor", "Who or what is acting?"],
    ["Authority", "On whose behalf does it act?"],
    ["Policy", "What may it do, and under which conditions?"],
    ["Approval", "When does a person or institution decide?"],
    ["Assurance", "Which trust services match the action?"],
    ["Evidence", "What executed, and what must remain provable?"],
  ];
  questions.forEach(([label, question], index) => {
    const top = 236 + index * 56;
    addText(slide, { name: `question-label-${index + 1}`, text: label.toUpperCase(), left: 556, top, width: 120, height: 24, role: "chrome", fontSize: 13, color: COLORS.purple });
    addText(slide, { name: `question-text-${index + 1}`, text: question, left: 690, top: top - 3, width: 490, height: 36, role: "bodyBold", fontSize: 19.5, color: COLORS.darkBlue });
    addDivider(slide, { name: `question-line-${index + 1}`, left: 556, top: top + 38, width: 624, height: 1, color: COLORS.neutral200 });
  });
  addTakeaway(slide, "Intelligence can recommend an action. Authority determines whether it may execute.");
}

function addExecutionBoundary(slide) {
  addSlideTitle(slide, "Circularo governs the execution boundary", { dark: true, width: 1100 });
  const actors = ["People", "Organizations", "Applications", "AI agents"];
  actors.forEach((actor, index) => {
    const left = 78 + index * 284;
    addRect(slide, { name: `boundary-actor-${index + 1}`, left, top: 224, width: 220, height: 62, fill: "#3516AA", lineFill: "#6E51DA", lineWidth: 1, radius: 10 });
    addText(slide, { name: `boundary-actor-label-${index + 1}`, text: actor, left, top: 244, width: 220, height: 26, role: "bodyBold", fontSize: 20, color: COLORS.white, alignment: "center" });
    addDivider(slide, { name: `boundary-drop-${index + 1}`, left: left + 109, top: 286, width: 2, height: 54, color: "#6E51DA" });
  });
  addRect(slide, { name: "execution-layer", left: 48, top: 340, width: 1132, height: 118, fill: COLORS.purple, radius: 12 });
  addText(slide, { name: "execution-layer-title", text: "CIRCULARO TRUSTED EXECUTION LAYER", left: 90, top: 365, width: 1050, height: 38, role: "sectionTitle", fontSize: 29, color: COLORS.white, alignment: "center" });
  addText(slide, { name: "execution-layer-controls", text: "IDENTITY · AUTHORITY · POLICY · APPROVAL · ASSURANCE · TRUST SERVICES · EVIDENCE · AUDIT", left: 90, top: 414, width: 1050, height: 24, role: "chrome", fontSize: 13, color: COLORS.white, alignment: "center" });
  addDivider(slide, { name: "boundary-output-drop", left: 613, top: 458, width: 2, height: 44, color: "#6E51DA" });
  addRect(slide, { name: "trusted-action", left: 252, top: 502, width: 330, height: 68, fill: COLORS.white, lineFill: "#C9AEFF", lineWidth: 1, radius: 10 });
  addText(slide, { name: "trusted-action-label", text: "TRUSTED BUSINESS ACTION", left: 278, top: 516, width: 278, height: 48, role: "bodyBold", fontSize: 18.5, color: COLORS.darkBlue, alignment: "center" });
  addRect(slide, { name: "trusted-record", left: 648, top: 502, width: 330, height: 68, fill: COLORS.softPurple, lineFill: "#C9AEFF", lineWidth: 1, radius: 10 });
  addText(slide, { name: "trusted-record-label", text: "TRUSTED RECORD AND EVIDENCE", left: 674, top: 516, width: 278, height: 48, role: "bodyBold", fontSize: 18.5, color: COLORS.darkBlue, alignment: "center" });
  addTakeaway(slide, "Circularo governs permitted action, what actually executes, and the evidence retained afterwards.", { dark: true, top: 618 });
}

function addAgentMandates(slide) {
  addSlideTitle(slide, "AI agents can act within explicit mandates", { width: 1100 });
  const levels = [
    ["01", "Prepare", "Draft, classify, recommend", "Inside policy"],
    ["02", "Initiate", "Start a workflow or request approval", "Delegated mandate"],
    ["03", "Execute", "Invoke a permitted service and commit an action", "Approval and evidence gate"],
  ];
  levels.forEach(([number, title, body, gate], index) => {
    const top = 242 + index * 112;
    addNumberBadge(slide, `mandate-${index + 1}`, number, 48, top + 12, { active: index === 2 });
    addText(slide, { name: `mandate-title-${index + 1}`, text: title, left: 118, top: top + 6, width: 170, height: 38, role: "componentTitle", fontSize: 23, color: COLORS.darkBlue });
    addText(slide, { name: `mandate-body-${index + 1}`, text: body, left: 314, top: top + 6, width: 486, height: 42, role: "body", fontSize: 20, color: COLORS.body });
    addRect(slide, { name: `mandate-gate-${index + 1}`, left: 874, top, width: 306, height: 68, fill: index === 2 ? COLORS.purple : COLORS.softPurple, lineFill: index === 2 ? COLORS.purple : "#C9AEFF", lineWidth: 1, radius: 10 });
    addText(slide, { name: `mandate-gate-label-${index + 1}`, text: gate, left: 894, top: top + 22, width: 266, height: 28, role: "bodyBold", fontSize: 18.5, color: index === 2 ? COLORS.white : COLORS.darkBlue, alignment: "center" });
    if (index < 2) addDivider(slide, { name: `mandate-divider-${index + 1}`, left: 48, top: top + 92, width: 1132, height: 1, color: COLORS.neutral200 });
  });
  addTakeaway(slide, "The mandate can limit value, jurisdiction, business unit, trust service, and approval path.");
}

function addEvidenceLoop(slide) {
  addSlideTitle(slide, "Trusted records create governed AI context", { width: 1110 });
  const nodes = [
    ["01", "Trusted execution", "A controlled action completes"],
    ["02", "Institutional evidence", "Events and decisions remain attributable"],
    ["03", "Trusted records", "Evidence becomes durable memory"],
    ["04", "Trusted AI context", "AI retrieves verified, permissioned context"],
    ["05", "Governed action", "AI prepares or initiates a permitted action"],
  ];
  addDivider(slide, { name: "evidence-loop-spine", left: 96, top: 344, width: 1088, height: 3, color: COLORS.neutral300 });
  nodes.forEach(([number, title, body], index) => {
    const left = 48 + index * 236;
    addNumberBadge(slide, `evidence-node-${index + 1}`, number, left + 74, 323, { active: index === 4 });
    addText(slide, { name: `evidence-title-${index + 1}`, text: title, left, top: 392, width: 190, height: 62, role: "bodyBold", fontSize: 20.5, color: COLORS.darkBlue, alignment: "center" });
    addText(slide, { name: `evidence-body-${index + 1}`, text: body, left, top: 472, width: 190, height: 72, role: "body", fontSize: 17.5, color: COLORS.body, alignment: "center" });
  });
  addTakeaway(slide, "Governed action returns to the execution boundary, creating a reinforcing trust cycle.");
}

function addStrategicArchitecture(slide) {
  addSlideTitle(slide, "Circularo connects business actors to trust infrastructure", { dark: true, width: 1180 });
  addRect(slide, { name: "business-layer", left: 48, top: 226, width: 1132, height: 96, fill: "#3516AA", lineFill: "#6E51DA", lineWidth: 1, radius: 10 });
  addLabel(slide, "business-layer-label", "Business and agentic layer", 78, 246, 260, { dark: true });
  addText(slide, { name: "business-layer-items", text: "People · Organizations · Government services · Enterprise applications · Portals · AI agents", left: 330, top: 254, width: 810, height: 30, role: "bodyBold", fontSize: 19, color: COLORS.white, alignment: "right" });
  addRect(slide, { name: "circularo-layer", left: 48, top: 350, width: 1132, height: 138, fill: COLORS.purple, radius: 10 });
  addLabel(slide, "circularo-layer-label", "Circularo trust orchestration and trusted execution", 78, 372, 500, { dark: true });
  addText(slide, { name: "circularo-layer-items", text: "Content · Collaboration · Identity · Authority · Policy · Workflow · Approval\nAssurance · Signing · Sealing · Evidence · Audit · Archive · Unified Trust API", left: 78, top: 414, width: 1062, height: 58, role: "bodyBold", fontSize: 18.5, color: COLORS.white, alignment: "center" });
  addRect(slide, { name: "infrastructure-layer", left: 48, top: 516, width: 1132, height: 82, fill: "#3516AA", lineFill: "#6E51DA", lineWidth: 1, radius: 10 });
  addLabel(slide, "infrastructure-layer-label", "Trust and infrastructure layer", 78, 538, 300, { dark: true });
  addText(slide, { name: "infrastructure-layer-items", text: "National identity · PKI · Signature and seal services · Timestamp authorities · Sovereign cloud · External providers", left: 360, top: 542, width: 780, height: 34, role: "body", fontSize: 17.5, color: COLORS.white, alignment: "right" });
  addTakeaway(slide, "Circularo provides a consistent control environment above customer-specific trust infrastructure.", { dark: true, top: 624 });
}

function addPositioningSystem(slide) {
  addSlideTitle(slide, "A single positioning system keeps the story coherent", { width: 1160 });
  const statements = [
    ["Company", "Circularo is a Digital Trust and Trusted Execution platform for enterprises, governments, and digital services."],
    ["Platform", "Circularo provides a Trust Orchestration Platform that connects content, authority, trust services, evidence, and records across business processes."],
    ["Outcome", "Circularo orchestrates the trust events required to deliver trusted, compliant, and verifiable business outcomes."],
    ["Agentic era", "Circularo provides the execution layer through which people, applications, and AI agents can perform trusted actions with verifiable authority and evidence."],
  ];
  statements.forEach(([label, body], index) => {
    const top = 228 + index * 90;
    addLabel(slide, `position-label-${index + 1}`, label, 48, top, 170);
    addText(slide, { name: `position-body-${index + 1}`, text: body, left: 236, top: top - 5, width: 944, height: 66, role: "bodyBold", fontSize: 20.5, color: COLORS.darkBlue });
    if (index < 3) addDivider(slide, { name: `position-line-${index + 1}`, left: 48, top: top + 70, width: 1132, height: 1, color: COLORS.neutral200 });
  });
  addTakeaway(slide, "Internal working language. External adaptation requires approved claims and current capability evidence.");
}

function addClosing(slide) {
  addLabel(slide, "closing-kicker", "The strategic position we carry forward", 48, 124, 640, { dark: true });
  addText(slide, { name: "closing-line-1", text: "Circularo orchestrates trust.", left: 48, top: 188, width: 1040, height: 70, role: "sectionTitle", fontSize: 36, color: COLORS.white });
  addText(slide, { name: "closing-line-2", text: "Trusted Execution is the outcome.", left: 48, top: 282, width: 1040, height: 70, role: "sectionTitle", fontSize: 36, color: COLORS.white });
  addText(slide, { name: "closing-line-3", text: "Agentic Trusted Execution extends the trust boundary to AI agents.", left: 48, top: 376, width: 1110, height: 90, role: "sectionTitle", fontSize: 36, color: "#C9AEFF" });
  addDivider(slide, { name: "closing-rule", left: 48, top: 504, width: 1132, height: 1, color: "#6E51DA" });
  addLabel(slide, "closing-guardrail-label", "Internal alignment rule", 48, 536, 260, { dark: true });
  addText(slide, {
    name: "closing-guardrail",
    text: "Separate current capability, work in development, and strategic direction before any external use.",
    left: 320,
    top: 530,
    width: 860,
    height: 58,
    role: "bodyBold",
    fontSize: 21,
    color: COLORS.white,
  });
}

async function main() {
  await fs.mkdir(BUILD, { recursive: true });
  const presentation = Presentation.create({ slideSize: CANVAS });
  const specs = [
    { dark: true, build: addCover },
    { build: addEvolution },
    { dark: true, build: addMarketShift },
    { build: addCoreDistinction },
    { build: addTrustChain },
    { dark: true, build: addPlatformScope },
    { build: addDeploymentModels },
    { dark: true, build: addAgenticShift },
    { build: addAuthorityQuestions },
    { dark: true, build: addExecutionBoundary },
    { build: addAgentMandates },
    { build: addEvidenceLoop },
    { dark: true, build: addStrategicArchitecture },
    { build: addPositioningSystem },
    { dark: true, build: addClosing },
  ];

  for (let index = 0; index < specs.length; index += 1) {
    const spec = specs[index];
    const slide = await baseSlide(presentation, index + 1, { dark: spec.dark });
    await spec.build(slide);
  }

  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    await writeBlob(path.join(BUILD, `${stem}.png`), await presentation.export({ slide, format: "png", scale: 1 }));
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(path.join(BUILD, `${stem}.layout.json`), await layout.text());
  }
  await writeBlob(path.join(BUILD, "circularo-strategic-evolution-positioning-montage.webp"), await presentation.export({ format: "webp", montage: true, scale: 1 }));
  const inspection = await presentation.inspect({ kind: "slide,textbox,shape,image,notes,layout", maxChars: 250000 });
  await fs.writeFile(path.join(BUILD, "circularo-strategic-evolution-positioning.inspect.ndjson"), inspection.ndjson);
  await (await PresentationFile.exportPptx(presentation)).save(DRAFT);
  console.log(JSON.stringify({ draftPath: DRAFT, slides: presentation.slides.items.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
