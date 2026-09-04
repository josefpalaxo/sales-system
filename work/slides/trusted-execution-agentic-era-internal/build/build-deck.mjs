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
const TASK = path.join(ROOT, "work/slides/trusted-execution-agentic-era-internal");
const BUILD = path.join(TASK, "build/render");
const DRAFT = path.join(TASK, "build/candidate.pptx");
const SOURCE = "work/new-story/Trusted-Execution-for-the-Agentic-Era-Final.md";
const BRAND = ".agents/skills/circularo-slides/references/brand-system.md";
const VISUAL_ROOT = path.join(ROOT, "work/slides/trusted-execution-agentic-era/assets");
const ASSETS = {
  cover: path.join(VISUAL_ROOT, "trust-boundary-cover.png"),
  fragmented: path.join(VISUAL_ROOT, "fragmented-accountability.png"),
  context: path.join(VISUAL_ROOT, "trusted-context-action.png"),
  flywheel: path.join(VISUAL_ROOT, "trusted-execution-flywheel.png"),
};

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

async function imageBytes(filePath) {
  const bytes = await fs.readFile(filePath);
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

async function addImage(slide, filePath, position, { fit = "cover", alt = "Circularo abstract visual" } = {}) {
  slide.images.add({
    blob: await imageBytes(filePath),
    contentType: "image/png",
    alt,
    fit,
    position,
  });
}

function addInternalMark(slide, dark) {
  addText(slide, {
    name: "internal-mark",
    text: "INTERNAL STRATEGY",
    left: 952,
    top: 34,
    width: 228,
    height: 20,
    role: "chrome",
    fontSize: 12,
    color: dark ? "#C9AEFF" : COLORS.neutral500,
    alignment: "right",
  });
}

async function baseSlide(presentation, pageNumber, spec = {}) {
  const slide = presentation.slides.add();
  const dark = Boolean(spec.dark);
  slide.background.fill = dark ? COLORS.darkBlue : COLORS.white;
  if (spec.backgroundImage) {
    await addImage(slide, spec.backgroundImage, { left: 0, top: 0, width: CANVAS.width, height: CANVAS.height }, {
      alt: spec.backgroundAlt,
    });
  }
  await addChrome(slide, pageNumber, { dark });
  addEyebrow(slide, spec.eyebrow ?? "Trusted Execution for the Agentic Era", { dark, width: 760 });
  addInternalMark(slide, dark);
  addSources(slide, [SOURCE, BRAND, ...(spec.assetSource ? [spec.assetSource] : [])]);
  return slide;
}

function addLabel(slide, name, text, left, top, width, { dark = false, alignment = "left" } = {}) {
  addText(slide, {
    name,
    text: text.toUpperCase(),
    left,
    top,
    width,
    height: 24,
    role: "chrome",
    fontSize: 13,
    color: dark ? "#C9AEFF" : COLORS.purple,
    alignment,
  });
}

function addTakeaway(slide, text, { dark = false, top = 610, width = 1110 } = {}) {
  addDivider(slide, { name: "takeaway-accent", left: MARGIN, top: top - 14, width: 194, height: 3, color: COLORS.purple });
  addText(slide, {
    name: "takeaway",
    text,
    left: MARGIN,
    top,
    width,
    height: 46,
    role: "bodyBold",
    fontSize: 21.5,
    color: dark ? COLORS.white : COLORS.darkBlue,
  });
}

function addNumber(slide, name, number, left, top, { active = false, dark = false, size = 46 } = {}) {
  addRect(slide, {
    name: `${name}-frame`,
    left,
    top,
    width: size,
    height: size,
    fill: active ? COLORS.purple : dark ? COLORS.darkBlue : COLORS.white,
    lineFill: active ? COLORS.purple : dark ? "#8C6BFF" : COLORS.purple,
    lineWidth: 2,
    radius: 10,
  });
  addText(slide, {
    name: `${name}-text`,
    text: number,
    left,
    top: top + Math.round((size - 22) / 2),
    width: size,
    height: 22,
    role: "chrome",
    fontSize: 14,
    color: active || dark ? COLORS.white : COLORS.darkBlue,
    alignment: "center",
  });
}

function addCover(slide) {
  addLabel(slide, "cover-kicker", "Circularo internal strategy", 48, 120, 520, { dark: true });
  addText(slide, {
    name: "cover-title",
    text: "Trusted Execution\nfor the Agentic Era",
    left: 48,
    top: 176,
    width: 650,
    height: 184,
    role: "hero",
    fontSize: 62,
    color: COLORS.white,
  });
  addText(slide, {
    name: "cover-subtitle",
    text: "The institutional execution boundary for people, applications, and AI agents",
    left: 48,
    top: 398,
    width: 610,
    height: 92,
    role: "body",
    fontSize: 25,
    color: "#E6DEFF",
  });
  addText(slide, {
    name: "cover-thesis",
    text: "Greater autonomy requires stronger institutional control.",
    left: 48,
    top: 548,
    width: 700,
    height: 42,
    role: "bodyBold",
    fontSize: 22,
    color: "#C9AEFF",
  });
}

function addEvolution(slide) {
  addSlideTitle(slide, "Digital work is entering the agentic stage", { width: 1120 });
  const stages = [
    ["01", "Digital", "People move content and records online"],
    ["02", "Automated", "Systems execute repeatable process rules"],
    ["03", "AI assisted", "Systems interpret information and recommend"],
    ["04", "Agentic", "Software initiates trusted actions"],
  ];
  addDivider(slide, { name: "evolution-line", left: 100, top: 352, width: 1080, height: 3, color: COLORS.neutral300 });
  stages.forEach(([number, title, body], index) => {
    const left = 48 + index * 296;
    addNumber(slide, `evolution-${index + 1}`, number, left + 102, 330, { active: index === 3 });
    addText(slide, { name: `evolution-title-${index + 1}`, text: title, left, top: 410, width: 250, height: 42, role: "componentTitle", fontSize: 25, color: COLORS.darkBlue, alignment: "center" });
    addText(slide, { name: `evolution-body-${index + 1}`, text: body, left, top: 470, width: 250, height: 72, role: "body", fontSize: 21.5, color: COLORS.body, alignment: "center" });
  });
  addTakeaway(slide, "As systems gain autonomy, institutions need a clearer boundary for permitted action.");
}

function addControlChain(slide) {
  addSlideTitle(slide, "Greater autonomy requires explicit institutional control", { dark: true, width: 1140 });
  addText(slide, { name: "control-intro", text: "An intelligent system can propose an action. The institution must establish the conditions under which that action may execute.", left: 48, top: 218, width: 1080, height: 72, role: "body", fontSize: 23, color: "#E6DEFF" });
  const controls = ["Actor", "Authority", "Policy", "Approval", "Execution", "Evidence"];
  addDivider(slide, { name: "control-spine", left: 100, top: 390, width: 1080, height: 3, color: "#6E51DA" });
  controls.forEach((control, index) => {
    const left = 54 + index * 196;
    addNumber(slide, `control-${index + 1}`, String(index + 1).padStart(2, "0"), left + 64, 368, { active: index === 4, dark: true });
    addText(slide, { name: `control-label-${index + 1}`, text: control, left, top: 444, width: 174, height: 34, role: "bodyBold", fontSize: 20.5, color: COLORS.white, alignment: "center" });
  });
  addText(slide, { name: "control-audit", text: "Audit preserves the complete chain afterwards.", left: 270, top: 512, width: 740, height: 42, role: "bodyBold", fontSize: 22, color: "#C9AEFF", alignment: "center" });
  addTakeaway(slide, "Institutional control must remain explicit before, during, and after execution.", { dark: true });
}

async function addFragmentation(slide) {
  addSlideTitle(slide, "Fragmented tools fragment accountability", { width: 1120 });
  addText(slide, {
    name: "fragmentation-copy",
    text: "Drafting, collaboration, approval, signing, records, and AI often operate in separate environments. Each handoff can detach the final record from the authority and decisions that produced it.",
    left: 48,
    top: 228,
    width: 430,
    height: 180,
    role: "body",
    fontSize: 22.5,
    color: COLORS.body,
  });
  addText(slide, { name: "fragmentation-result", text: "The result is a process that completed without a complete account of why it was allowed.", left: 48, top: 446, width: 430, height: 92, role: "bodyBold", fontSize: 23, color: COLORS.darkBlue });
  await addImage(slide, ASSETS.fragmented, { left: 520, top: 206, width: 712, height: 400 }, { alt: "Abstract disconnected systems around a central exchange" });
  addTakeaway(slide, "Every disconnected handoff increases the risk of losing context and accountability.");
}

function addAccountabilityQuestions(slide) {
  addSlideTitle(slide, "The accountability questions no single tool can answer", { dark: true, width: 1160 });
  const groups = [
    ["CONTENT", ["Which version was authoritative?", "What exactly received approval?", "Which trust services applied?"]],
    ["AUTHORITY", ["Who participated?", "Who was permitted to decide?", "Which identity assurance applied?"]],
    ["EXECUTION", ["What actually executed?", "What happened afterwards?", "Can the complete chain be proven?"]],
  ];
  groups.forEach(([label, questions], index) => {
    const left = 48 + index * 400;
    addLabel(slide, `question-group-${index + 1}`, label, left, 224, 330, { dark: true });
    addDivider(slide, { name: `question-rule-${index + 1}`, left, top: 266, width: 74, height: 4, color: COLORS.purple });
    questions.forEach((question, row) => {
      const top = 304 + row * 88;
      addText(slide, { name: `question-${index + 1}-${row + 1}`, text: question, left, top, width: 342, height: 62, role: "bodyBold", fontSize: 21.5, color: COLORS.white });
      if (row < 2) addDivider(slide, { name: `question-line-${index + 1}-${row + 1}`, left, top: top + 68, width: 342, height: 1, color: "#5B3BC9" });
    });
  });
  addTakeaway(slide, "The future requirement is a continuous trust and evidence chain.", { dark: true });
}

function addContinuousChain(slide) {
  addSlideTitle(slide, "The continuous trust and evidence chain", { width: 1100 });
  const stages = ["Create", "Collaborate", "Review", "Approve", "Sign or seal", "Evidence", "Archive", "Retrieve", "Analyse", "Act"];
  stages.forEach((stage, index) => {
    const row = Math.floor(index / 5);
    const col = index % 5;
    const left = 56 + col * 236;
    const top = 246 + row * 180;
    addNumber(slide, `chain-${index + 1}`, String(index + 1).padStart(2, "0"), left, top, { active: index === 4 || index === 9 });
    addText(slide, { name: `chain-label-${index + 1}`, text: stage, left: left + 62, top: top + 6, width: 156, height: 34, role: "bodyBold", fontSize: 20.5, color: COLORS.darkBlue });
    if (col < 4) addDivider(slide, { name: `chain-link-${index + 1}`, left: left + 198, top: top + 22, width: 38, height: 2, color: "#C9AEFF" });
  });
  addDivider(slide, { name: "chain-turn", left: 1164, top: 292, width: 2, height: 128, color: "#C9AEFF" });
  addText(slide, { name: "chain-explanation", text: "Identity, permissions, authority, versions, decisions, trust events, and evidence remain connected through the lifecycle.", left: 128, top: 548, width: 1024, height: 44, role: "body", fontSize: 22, color: COLORS.body, alignment: "center" });
  addTakeaway(slide, "Trust persists across the process instead of appearing only at the point of signing.", { top: 620 });
}

function addSignatureContext(slide) {
  addSlideTitle(slide, "Trust starts before the signature", { dark: true, width: 1120 });
  const zones = [
    ["BEFORE", "Content, identity, authority, versions, review, and approval"],
    ["TRUST EVENT", "Signature, seal, timestamp, or another required mechanism"],
    ["AFTER", "Evidence, trusted record, auditability, retrieval, and analysis"],
  ];
  zones.forEach(([label, body], index) => {
    const left = 48 + index * 400;
    const active = index === 1;
    addRect(slide, { name: `signature-zone-${index + 1}`, left, top: 246, width: 352, height: 260, fill: active ? COLORS.purple : "#3516AA", lineFill: active ? COLORS.purple : "#6E51DA", lineWidth: 1, radius: 12 });
    addLabel(slide, `signature-zone-label-${index + 1}`, label, left + 32, 282, 288, { dark: true, alignment: "center" });
    addText(slide, { name: `signature-zone-body-${index + 1}`, text: body, left: left + 32, top: 344, width: 288, height: 120, role: "bodyBold", fontSize: 22, color: COLORS.white, alignment: "center" });
  });
  addTakeaway(slide, "The signature is an important trust event within a broader trust model.", { dark: true });
}

function addOrchestrationExecution(slide) {
  addSlideTitle(slide, "Trust Orchestration and Trusted Execution", { width: 1120 });
  addRect(slide, { name: "orchestration-frame", left: 48, top: 242, width: 520, height: 292, fill: COLORS.softPurple, lineFill: "#C9AEFF", lineWidth: 1, radius: 12 });
  addLabel(slide, "orchestration-label", "Platform capability", 88, 280, 420);
  addText(slide, { name: "orchestration-title", text: "Trust Orchestration", left: 88, top: 330, width: 420, height: 52, role: "sectionTitle", fontSize: 31, color: COLORS.darkBlue });
  addText(slide, { name: "orchestration-body", text: "Coordinates identity, authority, workflow, policy, approvals, trust services, and evidence across the business process.", left: 88, top: 408, width: 420, height: 108, role: "body", fontSize: 21.5, color: COLORS.body });
  addRect(slide, { name: "execution-frame", left: 660, top: 242, width: 520, height: 292, fill: COLORS.darkBlue, radius: 12 });
  addLabel(slide, "execution-label", "Business outcome", 700, 280, 420, { dark: true });
  addText(slide, { name: "execution-title", text: "Trusted Execution", left: 700, top: 330, width: 420, height: 52, role: "sectionTitle", fontSize: 31, color: COLORS.white });
  addText(slide, { name: "execution-body", text: "Produces a governed and verifiable action with the required controls, assurance, and retained evidence.", left: 700, top: 408, width: 420, height: 108, role: "body", fontSize: 21.5, color: "#E6DEFF" });
  addTakeaway(slide, "Circularo orchestrates trust. Trusted Execution is the outcome.");
}

function addPlatformAreas(slide) {
  addSlideTitle(slide, "Six connected platform areas", { dark: true, width: 1080 });
  const items = [
    ["01", "Content & Collaboration", "Create, prepare, collaborate, review"],
    ["02", "Identity & Authority", "Identify the actor and establish the right to act"],
    ["03", "Workflow & Approval", "Route decisions through institutional control"],
    ["04", "Trust Services", "Apply the required identity and assurance mechanisms"],
    ["05", "Evidence & Trusted Records", "Preserve what happened and why"],
    ["06", "Programmable Trust", "Extend governed execution to applications and agents"],
  ];
  items.forEach(([number, title, body], index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const left = 48 + col * 592;
    const top = 222 + row * 118;
    addNumber(slide, `platform-${index + 1}`, number, left, top, { active: index === 5, dark: true, size: 42 });
    addText(slide, { name: `platform-title-${index + 1}`, text: title, left: left + 66, top: top - 2, width: 458, height: 34, role: "bodyBold", fontSize: 22, color: COLORS.white });
    addText(slide, { name: `platform-body-${index + 1}`, text: body, left: left + 66, top: top + 40, width: 470, height: 54, role: "body", fontSize: 21.5, color: "#D8C9FF" });
    if (row < 2) addDivider(slide, { name: `platform-rule-${index + 1}`, left, top: top + 102, width: 536, height: 1, color: "#5B3BC9" });
  });
  addTakeaway(slide, "Together, these areas form one Trust Orchestration and Trusted Execution environment.", { dark: true });
}

function addAssurance(slide) {
  addSlideTitle(slide, "Four dimensions of execution assurance", { width: 1120 });
  const items = [
    ["01", "Workflow", "Who approved the action, and did the process follow the required path?"],
    ["02", "Personal", "Who personally authorized or signed, and can the identity be verified?"],
    ["03", "Organizational", "Did the action officially originate from the organization?"],
    ["04", "Execution", "Did authority and policy permit the action, and can the result be verified?"],
  ];
  items.forEach(([number, title, body], index) => {
    const left = 48 + index * 296;
    addNumber(slide, `assurance-${index + 1}`, number, left, 244, { active: index === 3 });
    addText(slide, { name: `assurance-title-${index + 1}`, text: title, left, top: 324, width: 250, height: 46, role: "componentTitle", fontSize: 24, color: COLORS.darkBlue });
    addDivider(slide, { name: `assurance-rule-${index + 1}`, left, top: 386, width: 78, height: 3, color: COLORS.purple });
    addText(slide, { name: `assurance-body-${index + 1}`, text: body, left, top: 416, width: 250, height: 126, role: "body", fontSize: 21.5, color: COLORS.body });
  });
  addTakeaway(slide, "The required assurance depends on the significance and context of the trusted action.");
}

function addComplexity(slide) {
  addSlideTitle(slide, "Transaction complexity increases orchestration demand", { dark: true, width: 1160 });
  const stages = [
    ["01", "Human + document"],
    ["02", "Multiple enterprise systems"],
    ["03", "Multiple organizations"],
    ["04", "Applications + AI agents"],
    ["05", "Cross-border jurisdictions"],
  ];
  stages.forEach(([number, label], index) => {
    const left = 48 + index * 224;
    const top = 436 - index * 48;
    const height = 112 + index * 48;
    addRect(slide, { name: `complexity-step-${index + 1}`, left, top, width: 196, height, fill: index === 4 ? COLORS.purple : "#3516AA", lineFill: "#6E51DA", lineWidth: 1, radius: 10 });
    addLabel(slide, `complexity-number-${index + 1}`, number, left + 18, top + 16, 44, { dark: true });
    addText(slide, { name: `complexity-label-${index + 1}`, text: label, left: left + 18, top: top + 46, width: 160, height: 90, role: "bodyBold", fontSize: 20.5, color: COLORS.white });
  });
  addTakeaway(slide, "More actors, systems, organizations, and jurisdictions make context harder to preserve.", { dark: true });
}

function addInfrastructureVariation(slide) {
  addSlideTitle(slide, "One framework can accommodate different trust infrastructure", { width: 1180 });
  const providers = ["Enterprise IAM", "National identity", "PKI", "External trust providers", "Sovereign trust services"];
  providers.forEach((provider, index) => {
    const left = 48 + index * 236;
    addRect(slide, { name: `provider-${index + 1}`, left, top: 250, width: 204, height: 72, fill: COLORS.softPurple, lineFill: "#C9AEFF", lineWidth: 1, radius: 10 });
    addText(slide, { name: `provider-label-${index + 1}`, text: provider, left: left + 16, top: 270, width: 172, height: 36, role: "bodyBold", fontSize: 18.5, color: COLORS.darkBlue, alignment: "center" });
    addDivider(slide, { name: `provider-link-${index + 1}`, left: left + 102, top: 322, width: 2, height: 54, color: "#C9AEFF" });
  });
  addRect(slide, { name: "common-framework", left: 48, top: 376, width: 1132, height: 112, fill: COLORS.purple, radius: 12 });
  addText(slide, { name: "common-framework-title", text: "CIRCULARO TRUST ORCHESTRATION AND EVIDENCE FRAMEWORK", left: 90, top: 404, width: 1048, height: 36, role: "sectionTitle", fontSize: 27, color: COLORS.white, alignment: "center" });
  addText(slide, { name: "common-framework-body", text: "The underlying identity and trust services can vary by transaction and jurisdiction.", left: 90, top: 448, width: 1048, height: 28, role: "body", fontSize: 21.5, color: COLORS.white, alignment: "center" });
  addTakeaway(slide, "The infrastructure can vary while the trust objective remains consistent.");
}

function addEvidence(slide) {
  addSlideTitle(slide, "Every execution creates institutional evidence", { dark: true, width: 1140 });
  const leftItems = ["Authoritative version", "Identities and roles", "Approvals and decisions", "Signatures and seals", "Timestamps"];
  const rightItems = ["Audit events", "Process history", "Retention metadata", "Supporting evidence", "Jurisdictional context"];
  addRect(slide, { name: "record-core", left: 490, top: 242, width: 248, height: 302, fill: COLORS.purple, radius: 18 });
  addLabel(slide, "record-label", "Output", 530, 286, 168, { dark: true, alignment: "center" });
  addText(slide, { name: "record-title", text: "VERIFIABLE\nTRUSTED\nRECORD", left: 514, top: 352, width: 200, height: 126, role: "sectionTitle", fontSize: 26, color: COLORS.white, alignment: "center" });
  [leftItems, rightItems].forEach((items, side) => {
    items.forEach((item, index) => {
      const top = 248 + index * 62;
      const left = side === 0 ? 48 : 812;
      addText(slide, { name: `record-item-${side}-${index + 1}`, text: item, left, top, width: 324, height: 34, role: "bodyBold", fontSize: 21, color: COLORS.white, alignment: side === 0 ? "right" : "left" });
      addDivider(slide, { name: `record-link-${side}-${index + 1}`, left: side === 0 ? 390 : 738, top: top + 15, width: side === 0 ? 100 : 56, height: 2, color: "#6E51DA" });
    });
  });
  addTakeaway(slide, "A completed process should leave a durable and provable institutional record.", { dark: true });
}

function addMemory(slide) {
  addSlideTitle(slide, "Evidence becomes institutional memory", { width: 1120 });
  const stages = [
    ["Trusted records", "Preserve provenance, permissions, and context"],
    ["Searchable evidence", "Retrieve what happened and why"],
    ["Connected decisions", "Understand obligations and precedent"],
    ["Institutional knowledge", "Retain a trusted history of action"],
  ];
  stages.forEach(([title, body], index) => {
    const top = 228 + index * 88;
    const width = 860 + index * 76;
    addRect(slide, { name: `memory-layer-${index + 1}`, left: 48, top, width, height: 66, fill: index === 3 ? COLORS.purple : ["#F5EDFF", "#E8D7FF", "#D6B9FF"][index], lineFill: "#C9AEFF", lineWidth: 1, radius: 10 });
    addText(slide, { name: `memory-title-${index + 1}`, text: title, left: 76, top: top + 17, width: 286, height: 32, role: "bodyBold", fontSize: 22, color: index === 3 ? COLORS.white : COLORS.darkBlue });
    addText(slide, { name: `memory-body-${index + 1}`, text: body, left: 360, top: top + 17, width: width - 340, height: 32, role: "body", fontSize: 21.5, color: index === 3 ? COLORS.white : COLORS.body, alignment: "right" });
  });
  addTakeaway(slide, "The archive becomes a trusted knowledge foundation for the organization.");
}

async function addTrustedContext(slide) {
  addSlideTitle(slide, "Trusted records provide governed AI context", { width: 1120 });
  addText(slide, { name: "context-intro", text: "AI depends on the quality and authority of the context it receives. Circularo can provide records that retain provenance, permissions, attribution, history, and auditability.", left: 48, top: 226, width: 454, height: 176, role: "body", fontSize: 22.5, color: COLORS.body });
  addText(slide, { name: "context-chain", text: "TRUSTED RECORDS\nTRUSTED CONTEXT\nTRUSTED INTELLIGENCE\nGOVERNED ACTION", left: 48, top: 432, width: 430, height: 132, role: "bodyBold", fontSize: 22, color: COLORS.darkBlue });
  await addImage(slide, ASSETS.context, { left: 548, top: 206, width: 684, height: 398 }, { alt: "Abstract trusted data layers passing through a governed execution gate" });
  addTakeaway(slide, "AI becomes more useful when its context remains attributable and permission controlled.");
}

function addKnowAdviseAct(slide) {
  addSlideTitle(slide, "AI progresses from knowing to acting", { dark: true, width: 1100 });
  const stages = [
    ["KNOW", "Extract, classify, summarize, translate, and retrieve"],
    ["ADVISE", "Identify obligations, risks, anomalies, and recommendations"],
    ["ACT", "Initiate workflows, prepare responses, request approval, and invoke permitted actions"],
  ];
  stages.forEach(([title, body], index) => {
    const left = 48 + index * 400;
    addLabel(slide, `ai-label-${index + 1}`, `0${index + 1}`, left, 232, 72, { dark: true });
    addText(slide, { name: `ai-title-${index + 1}`, text: title, left, top: 280, width: 340, height: 52, role: "sectionTitle", fontSize: 31, color: index === 2 ? "#C9AEFF" : COLORS.white });
    addDivider(slide, { name: `ai-rule-${index + 1}`, left, top: 350, width: 84, height: 4, color: COLORS.purple });
    addText(slide, { name: `ai-body-${index + 1}`, text: body, left, top: 386, width: 340, height: 118, role: "body", fontSize: 21.5, color: "#E6DEFF" });
    if (index === 1) addDivider(slide, { name: "execution-threshold", left: 824, top: 222, width: 3, height: 330, color: COLORS.purple });
  });
  addLabel(slide, "execution-threshold-label", "Trusted Execution boundary", 836, 526, 300, { dark: true });
  addTakeaway(slide, "The move from advice to action introduces an institutional authority requirement.", { dark: true });
}

function addAgentBoundary(slide) {
  addSlideTitle(slide, "Governed agentic action crosses an execution boundary", { width: 1180 });
  const stages = ["Identity", "Delegated authority", "Policy", "Approval", "Execution", "Evidence", "Audit"];
  addDivider(slide, { name: "boundary-spine", left: 82, top: 366, width: 1096, height: 3, color: COLORS.neutral300 });
  stages.forEach((stage, index) => {
    const left = 48 + index * 168;
    addNumber(slide, `boundary-${index + 1}`, String(index + 1).padStart(2, "0"), left + 50, 344, { active: index === 4 });
    addText(slide, { name: `boundary-label-${index + 1}`, text: stage, left, top: 422, width: 146, height: 60, role: "bodyBold", fontSize: 19.5, color: COLORS.darkBlue, alignment: "center" });
  });
  addText(slide, { name: "boundary-description", text: "Circularo governs what the agent may do, what actually executes, and what evidence remains afterwards.", left: 176, top: 520, width: 876, height: 54, role: "bodyBold", fontSize: 22.5, color: COLORS.darkBlue, alignment: "center" });
  addTakeaway(slide, "Circularo governs permitted action and retained evidence. Model reasoning remains outside this scope.", { top: 610 });
}

function addSharedFramework(slide) {
  addSlideTitle(slide, "People, applications, and agents share one trust framework", { dark: true, width: 1180 });
  const actors = ["People", "External parties", "Organizations", "Applications", "AI agents"];
  actors.forEach((actor, index) => {
    const left = 56 + index * 232;
    addText(slide, { name: `actor-${index + 1}`, text: actor, left, top: 244, width: 200, height: 42, role: "bodyBold", fontSize: 21.5, color: COLORS.white, alignment: "center" });
    addDivider(slide, { name: `actor-link-${index + 1}`, left: left + 99, top: 306, width: 2, height: 64, color: "#6E51DA" });
  });
  addRect(slide, { name: "shared-framework", left: 72, top: 370, width: 1088, height: 114, fill: COLORS.purple, radius: 14 });
  addText(slide, { name: "shared-framework-title", text: "IDENTITY / AUTHORITY / POLICY / APPROVAL / EXECUTION / EVIDENCE", left: 110, top: 406, width: 1012, height: 36, role: "sectionTitle", fontSize: 27, color: COLORS.white, alignment: "center" });
  addText(slide, { name: "shared-framework-detail", text: "Actor type changes the mandate, autonomy, policy, and assurance required. The institutional trust model remains common.", left: 146, top: 520, width: 940, height: 56, role: "body", fontSize: 22, color: "#D8C9FF", alignment: "center" });
  addTakeaway(slide, "An AI agent becomes another governed actor in the trusted execution environment.", { dark: true, top: 620 });
}

function addStrategicPosition(slide) {
  addSlideTitle(slide, "Circularo's strategic position", { width: 1080 });
  const layers = [
    ["ACTORS", "People / Organizations / Applications / AI agents", COLORS.softPurple, COLORS.darkBlue],
    ["CIRCULARO", "Trust Orchestration and Trusted Execution Layer", COLORS.purple, COLORS.white],
    ["TRUST INFRASTRUCTURE", "Identity / IAM / PKI / Signatures / Seals / Timestamps / Trust providers", "#E8D7FF", COLORS.darkBlue],
    ["OUTCOME", "Trusted, governed, and verifiable business actions", COLORS.darkBlue, COLORS.white],
  ];
  layers.forEach(([label, body, fill, color], index) => {
    const top = 214 + index * 94;
    addRect(slide, { name: `position-layer-${index + 1}`, left: 120, top, width: 1040, height: 72, fill, lineFill: index === 1 ? COLORS.purple : "#C9AEFF", lineWidth: 1, radius: 10 });
    addLabel(slide, `position-label-${index + 1}`, label, 150, top + 24, 220, { dark: color === COLORS.white });
    addText(slide, { name: `position-body-${index + 1}`, text: body, left: 368, top: top + 19, width: 750, height: 38, role: "bodyBold", fontSize: 21.5, color });
  });
  addTakeaway(slide, "Circularo connects actors and trust infrastructure to governed business outcomes.");
}

function addDeliveryModels(slide) {
  addSlideTitle(slide, "Three delivery models preserve one trust objective", { dark: true, width: 1160 });
  const models = [
    ["01", "Circularo SaaS", "Managed cloud environment"],
    ["02", "Circularo Sovereign", "Customer-controlled infrastructure"],
    ["03", "Sovereign Trust Shared Services", "Common infrastructure for multiple institutions"],
  ];
  models.forEach(([number, title, body], index) => {
    const left = 48 + index * 400;
    addNumber(slide, `delivery-${index + 1}`, number, left, 238, { active: index === 1, dark: true });
    addText(slide, { name: `delivery-title-${index + 1}`, text: title, left, top: 326, width: 340, height: 72, role: "componentTitle", fontSize: 24, color: COLORS.white });
    addText(slide, { name: `delivery-body-${index + 1}`, text: body, left, top: 420, width: 340, height: 74, role: "body", fontSize: 21.5, color: "#D8C9FF" });
  });
  addDivider(slide, { name: "delivery-common-line", left: 48, top: 540, width: 1132, height: 3, color: COLORS.purple });
  addText(slide, { name: "delivery-common", text: "COMMON TRUST OBJECTIVE: CONTROLLED EXECUTION WITH VERIFIABLE EVIDENCE", left: 120, top: 562, width: 988, height: 32, role: "bodyBold", fontSize: 21.5, color: COLORS.white, alignment: "center" });
  addTakeaway(slide, "The operating model changes. The trust and evidence chain remains consistent.", { dark: true, top: 632 });
}

async function addFlywheel(slide) {
  addLabel(slide, "flywheel-kicker", "The Circularo flywheel", 48, 122, 420, { dark: true });
  addText(slide, { name: "flywheel-title", text: "Every governed action strengthens the next one", left: 48, top: 180, width: 520, height: 176, role: "hero", fontSize: 50, color: COLORS.white });
  addText(slide, { name: "flywheel-copy", text: "Trusted collaboration creates execution. Execution creates evidence. Evidence creates records. Records provide trusted AI context. Governed action creates the next trusted execution.", left: 48, top: 398, width: 492, height: 148, role: "body", fontSize: 22, color: "#E6DEFF" });
}

function addProposition(slide) {
  addSlideTitle(slide, "The Circularo proposition for the agentic era", { width: 1160 });
  const rows = [
    ["PLATFORM", "Trust Orchestration connects content, identity, authority, workflow, trust services, evidence, and trusted records."],
    ["OUTCOME", "Trusted Execution produces governed and verifiable business actions."],
    ["AGENTIC ROLE", "The execution boundary governs what agents may do and what evidence remains."],
    ["OPERATING MODEL", "One governance model and evidence chain can operate through SaaS, sovereign, or shared-services infrastructure."],
  ];
  rows.forEach(([label, body], index) => {
    const top = 220 + index * 92;
    addLabel(slide, `proposition-label-${index + 1}`, label, 48, top, 190);
    addText(slide, { name: `proposition-body-${index + 1}`, text: body, left: 248, top: top - 5, width: 932, height: 66, role: "bodyBold", fontSize: 21.5, color: COLORS.darkBlue });
    if (index < 3) addDivider(slide, { name: `proposition-line-${index + 1}`, left: 48, top: top + 70, width: 1132, height: 1, color: COLORS.neutral200 });
  });
  addTakeaway(slide, "Greater autonomy must be matched by stronger institutional control.");
}

function addClosing(slide) {
  addLabel(slide, "closing-kicker", "Internal strategic position", 48, 124, 520, { dark: true });
  addText(slide, { name: "closing-1", text: "Circularo orchestrates trust.", left: 48, top: 202, width: 1080, height: 66, role: "sectionTitle", fontSize: 36, color: COLORS.white });
  addText(slide, { name: "closing-2", text: "Trusted Execution is the outcome.", left: 48, top: 296, width: 1080, height: 66, role: "sectionTitle", fontSize: 36, color: COLORS.white });
  addText(slide, { name: "closing-3", text: "The execution boundary is the position for the agentic era.", left: 48, top: 390, width: 1100, height: 82, role: "sectionTitle", fontSize: 36, color: "#C9AEFF" });
  addDivider(slide, { name: "closing-rule", left: 48, top: 502, width: 1132, height: 1, color: "#6E51DA" });
  addLabel(slide, "closing-guardrail-label", "External-use guardrail", 48, 536, 250, { dark: true });
  addText(slide, { name: "closing-guardrail", text: "Confirm current capability, work in development, strategic direction, and approved claim wording before external reuse.", left: 324, top: 530, width: 856, height: 72, role: "bodyBold", fontSize: 21.5, color: COLORS.white });
}

async function main() {
  await fs.mkdir(BUILD, { recursive: true });
  const presentation = Presentation.create({ slideSize: CANVAS });
  const specs = [
    { dark: true, backgroundImage: ASSETS.cover, backgroundAlt: "Abstract Circularo execution boundary", assetSource: "work/slides/trusted-execution-agentic-era/assets/trust-boundary-cover.png", build: addCover },
    { build: addEvolution },
    { dark: true, build: addControlChain },
    { assetSource: "work/slides/trusted-execution-agentic-era/assets/fragmented-accountability.png", build: addFragmentation },
    { dark: true, build: addAccountabilityQuestions },
    { build: addContinuousChain },
    { dark: true, build: addSignatureContext },
    { build: addOrchestrationExecution },
    { dark: true, build: addPlatformAreas },
    { build: addAssurance },
    { dark: true, build: addComplexity },
    { build: addInfrastructureVariation },
    { dark: true, build: addEvidence },
    { build: addMemory },
    { assetSource: "work/slides/trusted-execution-agentic-era/assets/trusted-context-action.png", build: addTrustedContext },
    { dark: true, build: addKnowAdviseAct },
    { build: addAgentBoundary },
    { dark: true, build: addSharedFramework },
    { build: addStrategicPosition },
    { dark: true, build: addDeliveryModels },
    { dark: true, backgroundImage: ASSETS.flywheel, backgroundAlt: "Abstract Circularo trusted execution flywheel", assetSource: "work/slides/trusted-execution-agentic-era/assets/trusted-execution-flywheel.png", build: addFlywheel },
    { build: addProposition },
    { dark: true, eyebrow: "Trusted Execution for the Agentic Era", build: addClosing },
  ];

  for (let index = 0; index < specs.length; index += 1) {
    const spec = specs[index];
    const slide = await baseSlide(presentation, index + 1, spec);
    await spec.build(slide);
  }

  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    await writeBlob(path.join(BUILD, `${stem}.png`), await presentation.export({ slide, format: "png", scale: 1 }));
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(path.join(BUILD, `${stem}.layout.json`), await layout.text());
  }
  await writeBlob(path.join(BUILD, "trusted-execution-agentic-era-internal-montage.webp"), await presentation.export({ format: "webp", montage: true, scale: 1 }));
  const inspection = await presentation.inspect({ kind: "slide,textbox,shape,image,notes,layout", maxChars: 500000 });
  await fs.writeFile(path.join(BUILD, "trusted-execution-agentic-era-internal.inspect.ndjson"), inspection.ndjson);
  await (await PresentationFile.exportPptx(presentation)).save(DRAFT);
  await fs.chmod(DRAFT, 0o644);
  console.log(JSON.stringify({ draftPath: DRAFT, slides: presentation.slides.items.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
