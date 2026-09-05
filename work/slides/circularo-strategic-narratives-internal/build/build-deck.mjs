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
const TASK = path.join(ROOT, "work/slides/circularo-strategic-narratives-internal");
const BUILD = path.join(TASK, "build/render");
const DRAFT = path.join(TASK, "build/candidate.pptx");
const SOURCE = "work/new-story/Circularo-Strategic-Narratives-Internal-Deck-Outline.md";
const BRAND = ".agents/skills/circularo-slides/references/brand-system.md";

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

function addInternalMark(slide, dark) {
  addText(slide, {
    name: "internal-mark",
    text: "INTERNAL TEAM DECK",
    left: 908,
    top: 34,
    width: 272,
    height: 20,
    role: "chrome",
    fontSize: 12,
    color: dark ? "#C9AEFF" : COLORS.neutral500,
    alignment: "right",
  });
}

async function baseSlide(presentation, pageNumber, { dark = false, eyebrow = "Circularo strategic narratives" } = {}) {
  const slide = presentation.slides.add();
  slide.background.fill = dark ? COLORS.darkBlue : COLORS.white;
  await addChrome(slide, pageNumber, { dark });
  addEyebrow(slide, eyebrow, { dark, width: 720 });
  addInternalMark(slide, dark);
  addSources(slide, [SOURCE, BRAND]);
  return slide;
}

function addLabel(slide, name, text, left, top, width, { dark = false, align = "left", size = 13 } = {}) {
  addText(slide, {
    name,
    text: text.toUpperCase(),
    left,
    top,
    width,
    height: 24,
    role: "chrome",
    fontSize: size,
    color: dark ? "#C9AEFF" : COLORS.purple,
    alignment: align,
  });
}

function addTakeaway(slide, text, { dark = false, top = 612, width = 1120, size = 20.5 } = {}) {
  addDivider(slide, { name: "takeaway-rule", left: MARGIN, top: top - 16, width: 190, height: 3, color: dark ? "#C9AEFF" : COLORS.purple });
  addText(slide, {
    name: "takeaway",
    text,
    left: MARGIN,
    top,
    width,
    height: 48,
    role: "bodyBold",
    fontSize: size,
    color: dark ? COLORS.white : COLORS.darkBlue,
  });
}

function addNumber(slide, name, value, left, top, { active = false, dark = false } = {}) {
  addRect(slide, {
    name: `${name}-shape`,
    left,
    top,
    width: 44,
    height: 44,
    fill: active ? COLORS.purple : dark ? "#3516AA" : COLORS.white,
    lineFill: active ? COLORS.purple : dark ? "#6E51DA" : COLORS.purple,
    lineWidth: 2,
    radius: 10,
  });
  addText(slide, {
    name: `${name}-text`,
    text: value,
    left,
    top: top + 11,
    width: 44,
    height: 22,
    role: "chrome",
    fontSize: 14,
    color: active || dark ? COLORS.white : COLORS.darkBlue,
    alignment: "center",
  });
}

function addBulletRows(slide, items, { left = 48, top = 250, width = 1132, rowHeight = 66, dark = false, size = 20 } = {}) {
  items.forEach((item, index) => {
    const y = top + index * rowHeight;
    addRect(slide, { name: `bullet-${index + 1}`, left, top: y + 10, width: 8, height: 8, fill: dark ? "#C9AEFF" : COLORS.purple, radius: 8 });
    addText(slide, {
      name: `bullet-text-${index + 1}`,
      text: item,
      left: left + 24,
      top: y,
      width: width - 24,
      height: rowHeight - 8,
      role: "body",
      fontSize: size,
      color: dark ? COLORS.white : COLORS.body,
    });
    if (index < items.length - 1) addDivider(slide, { name: `bullet-rule-${index + 1}`, left: left + 24, top: y + rowHeight - 10, width: width - 24, color: dark ? "#5B3BC9" : COLORS.neutral200 });
  });
}

function addCover(slide) {
  addLabel(slide, "cover-kicker", "Circularo: The Strategic Narrative", 48, 118, 620, { dark: true });
  addText(slide, {
    name: "cover-title",
    text: "From Digital Signatures\nto Trusted Execution",
    left: 48,
    top: 170,
    width: 700,
    height: 170,
    role: "hero",
    fontSize: 57,
    color: COLORS.white,
  });
  addText(slide, {
    name: "cover-subtitle",
    text: "A common narrative for where Circularo came from, what we are becoming, and why it matters.",
    left: 48,
    top: 374,
    width: 650,
    height: 98,
    role: "body",
    fontSize: 24,
    color: "#E6DEFF",
  });
  const stages = ["DIGITAL\nSIGNATURES", "DIGITAL\nTRUST", "TRUSTED\nEXECUTION", "AGENTIC TRUSTED\nEXECUTION"];
  addDivider(slide, { name: "cover-spine", left: 873, top: 150, width: 3, height: 400, color: "#6E51DA" });
  stages.forEach((label, index) => {
    const top = 142 + index * 112;
    addNumber(slide, `cover-stage-${index + 1}`, String(index + 1).padStart(2, "0"), 853, top, { active: index === 3, dark: true });
    addText(slide, {
      name: `cover-stage-label-${index + 1}`,
      text: label,
      left: 922,
      top: top - 2,
      width: 258,
      height: 58,
      role: "bodyBold",
      fontSize: index === 3 ? 20.5 : 19,
      color: index === 3 ? COLORS.white : "#D8C9FF",
    });
  });
  addText(slide, {
    name: "cover-speaker-focus",
    text: "This is an evolution of Circularo's existing strengths, not a reinvention of the company.",
    left: 48,
    top: 540,
    width: 700,
    height: 56,
    role: "bodyBold",
    fontSize: 18.5,
    color: "#C9AEFF",
  });
}

function addCommonNarrative(slide) {
  addSlideTitle(slide, "Why We Need a Common Narrative", { width: 1140 });
  addText(slide, {
    name: "core-message",
    text: "Circularo now spans much more than digital signatures, but our story needs to remain simple and coherent.",
    left: 48,
    top: 222,
    width: 500,
    height: 112,
    role: "sectionTitle",
    fontSize: 28,
    color: COLORS.darkBlue,
  });
  addDivider(slide, { name: "convergence-line", left: 610, top: 238, width: 3, height: 318, color: COLORS.purple });
  addBulletRows(slide, [
    "Our capabilities increasingly cover the complete trusted business process.",
    "Customers operate across more systems, trust services and jurisdictions.",
    "Governments and enterprises are building stronger digital trust foundations.",
    "AI introduces new actors capable of initiating and executing trusted actions.",
    "Product, sales and marketing need one consistent language for describing this evolution.",
  ], { left: 660, top: 220, width: 520, rowHeight: 72, size: 18.5 });
  addRect(slide, { name: "one-story", left: 48, top: 420, width: 500, height: 106, fill: COLORS.softPurple, lineFill: "#C9AEFF", lineWidth: 1, radius: 12 });
  addLabel(slide, "one-story-label", "One strategic story", 84, 445, 420, { align: "center" });
  addText(slide, { name: "one-story-text", text: "Simple and coherent", left: 84, top: 480, width: 420, height: 28, role: "bodyBold", fontSize: 20, color: COLORS.darkBlue, alignment: "center" });
}

function addThreeNarratives(slide) {
  addSlideTitle(slide, "Three Narratives. One Circularo Story.", { dark: true, width: 1160 });
  const items = [
    ["01", "Evolution", "WHERE WE ARE GOING", "Digital Signatures\nDigital Trust\nTrusted Execution\nAgentic Trusted Execution"],
    ["02", "Trust Orchestration", "WHAT THE PLATFORM DOES", "Connects business processes, identity, authority, approvals, trust services and evidence."],
    ["03", "Transaction Complexity", "WHY ORCHESTRATION BECOMES MORE VALUABLE", "More actors · systems · organizations\nautonomy · jurisdictions"],
  ];
  items.forEach(([number, title, label, body], index) => {
    const left = 48 + index * 400;
    addNumber(slide, `narrative-${index + 1}`, number, left, 232, { active: index === 1, dark: true });
    addText(slide, { name: `narrative-title-${index + 1}`, text: title, left, top: 298, width: 350, height: 68, role: "sectionTitle", fontSize: 28, color: COLORS.white });
    addLabel(slide, `narrative-label-${index + 1}`, label, left, 382, 350, { dark: true, size: 11.5 });
    addText(slide, { name: `narrative-body-${index + 1}`, text: body, left, top: 424, width: 350, height: 126, role: "body", fontSize: 19.5, color: "#E6DEFF" });
  });
  addTakeaway(slide, "Evolution explains the direction. Trust Orchestration explains the platform. Transaction Complexity explains the need.", { dark: true, top: 608, size: 19 });
}

function addExpandingTrust(slide) {
  addSlideTitle(slide, "The Scope of Trust Is Expanding", { width: 1140 });
  const items = [
    ["01", "Digital Signatures", "Who signed what, and can we prove it?"],
    ["02", "Digital Trust", "Can we trust the wider process around identity, authority, approval and evidence?"],
    ["03", "Trusted Execution", "Can a trusted action be executed with the appropriate controls and evidence?"],
    ["04", "Agentic Trusted Execution", "Can AI agents act without the organization losing authority, control, accountability or evidence?"],
  ];
  addDivider(slide, { name: "progression-spine", left: 100, top: 332, width: 1070, height: 3, color: COLORS.purple });
  items.forEach(([number, title, body], index) => {
    const left = 48 + index * 296;
    addNumber(slide, `trust-stage-${index + 1}`, number, left + 103, 311, { active: index === 3 });
    addText(slide, { name: `trust-title-${index + 1}`, text: title, left, top: 382, width: 250, height: 70, role: "bodyBold", fontSize: 22, color: COLORS.darkBlue, alignment: "center" });
    addText(slide, { name: `trust-body-${index + 1}`, text: body, left, top: 470, width: 250, height: 108, role: "body", fontSize: 18, color: COLORS.body, alignment: "center" });
  });
  addTakeaway(slide, "Signing remains important. The trusted outcome becomes broader.", { top: 618 });
}

function addTrustedOutcome(slide) {
  addSlideTitle(slide, "The Signature Is Important. It Is Not the Entire Trust Model.", { dark: true, width: 1180 });
  const steps = ["Create", "Collaborate", "Review", "Verify", "Approve", "Sign / Seal", "Timestamp", "Execute", "Evidence", "Archive"];
  steps.forEach((label, index) => {
    const col = index % 5;
    const row = Math.floor(index / 5);
    const left = 48 + col * 236;
    const top = 232 + row * 106;
    addNumber(slide, `outcome-step-${index + 1}`, String(index + 1).padStart(2, "0"), left, top, { active: index === 5, dark: true });
    addText(slide, { name: `outcome-label-${index + 1}`, text: label, left: left + 58, top: top + 9, width: 160, height: 30, role: "bodyBold", fontSize: 18.5, color: COLORS.white });
  });
  addText(slide, { name: "outcome-core", text: "Trust begins before signing and continues through execution, evidence and records.", left: 48, top: 454, width: 540, height: 64, role: "sectionTitle", fontSize: 27, color: COLORS.white });
  addRect(slide, { name: "definition-box", left: 646, top: 438, width: 534, height: 138, fill: COLORS.purple, radius: 12 });
  addLabel(slide, "definition-label", "Trusted Execution", 678, 464, 470, { dark: true });
  addText(slide, { name: "definition", text: "The controlled execution of trusted digital actions with verifiable identity, authority, policy, approval and evidence.", left: 678, top: 500, width: 470, height: 62, role: "bodyBold", fontSize: 20, color: COLORS.white });
}

function addOrchestrationPlatform(slide) {
  addSlideTitle(slide, "Circularo as the Trust Orchestration Platform", { width: 1160 });
  addText(slide, {
    name: "platform-core",
    text: "Digital identity, PKI, signatures, seals, timestamps, sovereign cloud and other trust capabilities increasingly form foundational infrastructure.\n\nCircularo operates above and across these foundations to turn individual trust services into complete business outcomes.",
    left: 48,
    top: 222,
    width: 500,
    height: 266,
    role: "body",
    fontSize: 21,
    color: COLORS.body,
  });
  const layers = [
    ["Business Process", COLORS.darkBlue, COLORS.white],
    ["Circularo Trust Orchestration", COLORS.purple, COLORS.white],
    ["Identity + Trust + Infrastructure Services", COLORS.softPurple, COLORS.darkBlue],
    ["Trusted, Compliant, Verifiable Outcome", COLORS.darkBlue, COLORS.white],
  ];
  layers.forEach(([label, fill, color], index) => {
    const top = 220 + index * 88;
    addRect(slide, { name: `platform-layer-${index + 1}`, left: 640, top, width: 540, height: 66, fill, lineFill: fill === COLORS.softPurple ? "#C9AEFF" : fill, lineWidth: 1, radius: 10 });
    addText(slide, { name: `platform-layer-label-${index + 1}`, text: label, left: 670, top: top + 20, width: 480, height: 28, role: "bodyBold", fontSize: 19.5, color, alignment: "center" });
  });
  addTakeaway(slide, "Trust Orchestration is the platform capability. Trusted Execution is the outcome.", { top: 612 });
}

function addOrchestrationScope(slide) {
  addSlideTitle(slide, "End-to-End Trust Orchestration", { dark: true, width: 1140 });
  const groups = [
    ["Content & Collaboration", "Create · Prepare · Collaborate · Review"],
    ["Identity & Authority", "Identify · Represent · Authorize"],
    ["Workflow & Approval", "Route · Review · Decide · Approve"],
    ["Trust Services", "Verify · Sign · Seal · Timestamp"],
    ["Evidence & Trusted Records", "Evidence · Audit · Archive · Retrieve"],
    ["Programmable Trust", "Unified Trust API · Integrations · Automation · Agentic Execution"],
  ];
  groups.forEach(([title, body], index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const left = 48 + col * 592;
    const top = 218 + row * 118;
    addLabel(slide, `scope-number-${index + 1}`, String(index + 1).padStart(2, "0"), left, top, 54, { dark: true });
    addText(slide, { name: `scope-title-${index + 1}`, text: title, left: left + 66, top: top - 4, width: 490, height: 34, role: "bodyBold", fontSize: 21, color: COLORS.white });
    addText(slide, { name: `scope-body-${index + 1}`, text: body, left: left + 66, top: top + 38, width: 490, height: 48, role: "body", fontSize: 17.5, color: "#D8C9FF" });
    addDivider(slide, { name: `scope-rule-${index + 1}`, left, top: top + 92, width: 540, color: "#5B3BC9" });
  });
  addTakeaway(slide, "Circularo does not need to own every trust service. The value is in governing and orchestrating the complete outcome.", { dark: true, top: 606, size: 19 });
}

function addEcosystems(slide) {
  addSlideTitle(slide, "Orchestrate, Don't Recreate", { width: 1120 });
  addText(slide, { name: "ecosystem-core", text: "Circularo can combine its native capabilities with national, sovereign, enterprise and third-party trust infrastructure.", left: 48, top: 218, width: 1132, height: 66, role: "sectionTitle", fontSize: 27, color: COLORS.darkBlue });
  addLabel(slide, "examples-label", "Examples of underlying infrastructure", 48, 326, 500);
  const items = ["National Identity", "Enterprise IAM", "PKI", "Signatures", "Seals", "Timestamps", "Qualified Trust Services", "Sovereign Cloud", "External Trust Providers"];
  items.forEach((item, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const left = 48 + col * 394;
    const top = 370 + row * 58;
    addDivider(slide, { name: `ecosystem-mark-${index + 1}`, left, top: top + 13, width: 18, height: 3, color: COLORS.purple });
    addText(slide, { name: `ecosystem-item-${index + 1}`, text: item, left: left + 30, top, width: 330, height: 32, role: "bodyBold", fontSize: 19, color: COLORS.darkBlue });
  });
  addTakeaway(slide, "The underlying trust services can vary. The orchestration and execution model remains consistent.", { top: 608 });
}

function addComplexity(slide) {
  addSlideTitle(slide, "As Transactions Become More Complex, Trust Must Be Orchestrated", { dark: true, width: 1180 });
  const dimensions = ["Actors", "Systems", "Organizations", "Trust Services", "Autonomy", "Jurisdictions"];
  dimensions.forEach((item, index) => {
    const left = 48 + index * 188;
    const top = 442 - index * 36;
    addRect(slide, { name: `complexity-step-${index + 1}`, left, top, width: 160, height: 78 + index * 36, fill: index === 5 ? COLORS.purple : "#3516AA", lineFill: "#6E51DA", lineWidth: 1, radius: 8 });
    addText(slide, { name: `complexity-label-${index + 1}`, text: item, left: left + 10, top: top + 20, width: 140, height: 30, role: "bodyBold", fontSize: 17.5, color: COLORS.white, alignment: "center" });
  });
  addText(slide, { name: "complexity-core", text: "At low complexity, isolated tools may be sufficient. As transactions span more participants and systems, fragmented trust becomes increasingly difficult to govern and prove.", left: 48, top: 544, width: 1132, height: 62, role: "bodyBold", fontSize: 20, color: COLORS.white });
}

function addComplexityProgression(slide) {
  addSlideTitle(slide, "From Document Transactions to Agentic Cross-Border Execution", { width: 1180 });
  const levels = [
    ["01", "Human / Document", "Who signed or approved, and can it be proven?"],
    ["02", "Multi-System Enterprise", "Who maintains the authoritative execution context across the transaction?"],
    ["03", "Cross-Enterprise + Agentic", "Who or what has authority? What was permitted? What happened?"],
    ["04", "Cross-Border / Multi-Jurisdiction", "Which identity, assurance and trust requirements apply?"],
    ["05", "Agentic + Cross-Border", "Can an autonomous actor execute under delegated institutional authority across systems and jurisdictions?"],
  ];
  levels.forEach(([number, title, body], index) => {
    const top = 214 + index * 78;
    const inset = index * 24;
    addNumber(slide, `level-${index + 1}`, number, 48 + inset, top, { active: index === 4 });
    addText(slide, { name: `level-title-${index + 1}`, text: title, left: 114 + inset, top: top + 2, width: 300, height: 32, role: "bodyBold", fontSize: 20, color: COLORS.darkBlue });
    addText(slide, { name: `level-body-${index + 1}`, text: body, left: 430 + inset, top: top - 2, width: 750 - inset, height: 50, role: "body", fontSize: 18.5, color: COLORS.body });
    if (index < 4) addDivider(slide, { name: `level-rule-${index + 1}`, left: 114 + inset, top: top + 58, width: 1066 - inset, color: COLORS.neutral200 });
  });
}

function addAiAuthority(slide) {
  addSlideTitle(slide, "Intelligence Does Not Create Institutional Authority", { dark: true, width: 1180 });
  addText(slide, { name: "ai-core", text: "AI agents can reason, recommend and increasingly act. But technical capability to call an API does not establish organizational authority.", left: 48, top: 222, width: 520, height: 142, role: "sectionTitle", fontSize: 27, color: COLORS.white });
  const steps = ["Identity", "Delegated Authority", "Policy", "Approval", "Trust Services", "Execution", "Evidence", "Audit"];
  steps.forEach((label, index) => {
    const col = index % 4;
    const row = Math.floor(index / 4);
    const left = 630 + col * 142;
    const top = 226 + row * 100;
    addRect(slide, { name: `authority-step-${index + 1}`, left, top, width: 126, height: 66, fill: index === 5 ? COLORS.purple : "#3516AA", lineFill: "#6E51DA", lineWidth: 1, radius: 8 });
    addText(slide, { name: `authority-step-label-${index + 1}`, text: label, left: left + 8, top: top + 19, width: 110, height: 34, role: "bodyBold", fontSize: 16.5, color: COLORS.white, alignment: "center" });
  });
  addLabel(slide, "model-label", "Governed execution model", 630, 438, 500, { dark: true });
  addTakeaway(slide, "Greater autonomy must be matched by stronger institutional control.", { dark: true, top: 520, width: 1000, size: 27 });
}

function addExecutionBoundary(slide) {
  addSlideTitle(slide, "Circularo Governs What Is Allowed to Execute", { width: 1170 });
  addText(slide, { name: "boundary-core", text: "Circularo does not need to govern how an AI model internally reasons.", left: 48, top: 214, width: 510, height: 78, role: "sectionTitle", fontSize: 27, color: COLORS.darkBlue });
  addLabel(slide, "boundary-label", "The relevant institutional boundary", 48, 326, 480);
  addBulletRows(slide, [
    "who or what is acting;",
    "on whose behalf;",
    "what authority has been delegated;",
    "which policies apply;",
    "whether approval or trust services are required;",
    "what actually executes;",
    "what evidence is retained.",
  ], { left: 48, top: 360, width: 510, rowHeight: 36, size: 17.5 });
  addRect(slide, { name: "agent-box", left: 660, top: 224, width: 470, height: 62, fill: COLORS.darkBlue, radius: 10 });
  addText(slide, { name: "agent-label", text: "AI AGENT", left: 690, top: 244, width: 410, height: 24, role: "chrome", fontSize: 15, color: COLORS.white, alignment: "center" });
  addDivider(slide, { name: "agent-drop", left: 894, top: 286, width: 3, height: 42, color: COLORS.purple });
  addRect(slide, { name: "governed-layer", left: 620, top: 328, width: 550, height: 126, fill: COLORS.purple, radius: 10 });
  addText(slide, { name: "governed-label", text: "CIRCULARO GOVERNED EXECUTION LAYER", left: 650, top: 354, width: 490, height: 28, role: "bodyBold", fontSize: 20, color: COLORS.white, alignment: "center" });
  addText(slide, { name: "governed-controls", text: "Identity · Authority · Policy · Approval\nTrust Services · Execution", left: 650, top: 396, width: 490, height: 48, role: "body", fontSize: 18, color: COLORS.white, alignment: "center" });
  addDivider(slide, { name: "layer-drop", left: 894, top: 454, width: 3, height: 42, color: COLORS.purple });
  addRect(slide, { name: "systems-box", left: 620, top: 496, width: 260, height: 72, fill: COLORS.softPurple, lineFill: "#C9AEFF", lineWidth: 1, radius: 10 });
  addText(slide, { name: "systems-label", text: "ENTERPRISE / TRUST SYSTEMS", left: 642, top: 516, width: 216, height: 34, role: "chrome", fontSize: 13, color: COLORS.darkBlue, alignment: "center" });
  addRect(slide, { name: "evidence-box", left: 910, top: 496, width: 260, height: 72, fill: COLORS.darkBlue, radius: 10 });
  addText(slide, { name: "evidence-label", text: "EVIDENCE", left: 932, top: 521, width: 216, height: 24, role: "chrome", fontSize: 14, color: COLORS.white, alignment: "center" });
}

function addFlywheel(slide) {
  addSlideTitle(slide, "Every Governed Action Strengthens the Next One", { dark: true, width: 1170 });
  const nodes = [
    ["01", "Trusted Collaboration"],
    ["02", "Trusted Execution"],
    ["03", "Institutional Evidence"],
    ["04", "Trusted Records"],
    ["05", "Trusted AI Context"],
    ["06", "Governed Agentic Action"],
    ["07", "New Trusted Execution + Evidence"],
  ];
  const positions = [
    [498, 220], [770, 252], [880, 384], [718, 464], [406, 464], [242, 384], [332, 252],
  ];
  positions.forEach(([left, top], index) => {
    const [number, label] = nodes[index];
    addNumber(slide, `flywheel-${index + 1}`, number, left, top, { active: index === 6, dark: true });
    addText(slide, { name: `flywheel-label-${index + 1}`, text: label, left: left - 54, top: top + 54, width: 154, height: 54, role: "bodyBold", fontSize: 16.5, color: COLORS.white, alignment: "center" });
  });
  addRect(slide, { name: "flywheel-core", left: 478, top: 360, width: 320, height: 96, fill: COLORS.purple, radius: 48 });
  addText(slide, { name: "flywheel-core-label", text: "TRUST\nFLYWHEEL", left: 520, top: 381, width: 236, height: 58, role: "sectionTitle", fontSize: 26, color: COLORS.white, alignment: "center" });
  addText(slide, { name: "flywheel-message", text: "Trusted execution does not only produce an outcome. It creates institutional evidence and records that improve the context for future human and agentic actions.", left: 48, top: 592, width: 1132, height: 58, role: "bodyBold", fontSize: 19, color: COLORS.white, alignment: "center" });
}

function addOperatingModels(slide) {
  addSlideTitle(slide, "The Trust Model Remains Consistent", { width: 1140 });
  const models = [
    ["01", "Circularo SaaS", "Managed Trust Orchestration and Trusted Execution."],
    ["02", "Circularo Sovereign", "Customer-controlled infrastructure for sovereignty, isolation, residency and deployment control."],
    ["03", "Sovereign Trust Shared Services", "Reusable trust orchestration infrastructure across ministries, agencies, public services or wider ecosystems."],
  ];
  models.forEach(([number, title, body], index) => {
    const left = 48 + index * 400;
    addNumber(slide, `model-${index + 1}`, number, left, 240, { active: index === 1 });
    addText(slide, { name: `model-title-${index + 1}`, text: title, left, top: 310, width: 348, height: 78, role: "sectionTitle", fontSize: 27, color: COLORS.darkBlue });
    addText(slide, { name: `model-body-${index + 1}`, text: body, left, top: 410, width: 348, height: 118, role: "body", fontSize: 20, color: COLORS.body });
  });
  addTakeaway(slide, "Deployment changes. The underlying trust and orchestration model does not.", { top: 596 });
}

function addCombinedThesis(slide) {
  addSlideTitle(slide, "One Strategic Thesis", { dark: true, width: 1120 });
  const items = [
    ["EVOLUTION", "Digital Signatures · Digital Trust · Trusted Execution · Agentic Trusted Execution"],
    ["PLATFORM", "Circularo orchestrates business processes, identity, authority, approvals, trust services and evidence."],
    ["MARKET NEED", "The more actors, systems, organizations, autonomy and jurisdictions involved, the greater the need for a common orchestration and trusted execution layer."],
  ];
  items.forEach(([label, body], index) => {
    const top = 214 + index * 100;
    addLabel(slide, `thesis-label-${index + 1}`, label, 48, top, 190, { dark: true });
    addText(slide, { name: `thesis-body-${index + 1}`, text: body, left: 238, top: top - 4, width: 942, height: 72, role: "bodyBold", fontSize: 19.5, color: COLORS.white });
    addDivider(slide, { name: `thesis-rule-${index + 1}`, left: 48, top: top + 76, width: 1132, color: "#5B3BC9" });
  });
  addRect(slide, { name: "proposition-box", left: 48, top: 514, width: 1132, height: 108, fill: COLORS.purple, radius: 12 });
  addLabel(slide, "proposition-label", "Core Proposition", 76, 536, 220, { dark: true });
  addText(slide, { name: "proposition", text: "Circularo provides the Trust Orchestration Platform for complex digital transactions, connecting people, organizations, applications and AI agents with the appropriate identity, authority, workflow, trust services and evidence across systems and jurisdictions.", left: 270, top: 530, width: 880, height: 76, role: "bodyBold", fontSize: 18, color: COLORS.white });
}

function addCommonLanguage(slide) {
  addSlideTitle(slide, "Common Language Going Forward", { width: 1140 });
  const items = [
    "Trust Orchestration = what the platform does.",
    "Trusted Execution = the governed business outcome.",
    "Agentic Trusted Execution = extension of the model to autonomous actors.",
    "Electronic signatures remain a core trust service within the wider platform.",
    "Circularo orchestrates external and native trust services rather than claiming to replace all underlying infrastructure.",
    "Complexity strengthens the need for orchestration.",
  ];
  addBulletRows(slide, items, { left: 48, top: 216, width: 1132, rowHeight: 58, size: 19 });
  addRect(slide, { name: "guardrail-box", left: 48, top: 566, width: 1132, height: 68, fill: COLORS.darkBlue, radius: 10 });
  addLabel(slide, "guardrail-label", "Internal guardrail", 74, 588, 180, { dark: true });
  addText(slide, { name: "guardrail", text: "Product, compliance, jurisdiction-specific and future agentic claims must remain grounded in approved canonical knowledge and evidence.", left: 264, top: 580, width: 890, height: 44, role: "bodyBold", fontSize: 18.5, color: COLORS.white });
}

function addArchitectureAppendix(slide) {
  addSlideTitle(slide, "Strategic Architecture", { dark: true, width: 1120 });
  const layers = [
    ["PEOPLE · ORGANIZATIONS · APPLICATIONS · AI AGENTS", "", "#3516AA", 72],
    ["CIRCULARO TRUST ORCHESTRATION / TRUSTED EXECUTION LAYER", "Content · Collaboration · Identity · Authority · Policy · Workflow · Approval · Assurance · Signing · Sealing · Trust Services · Evidence · Audit · Archive · Unified Trust API", COLORS.purple, 142],
    ["TRUST & INFRASTRUCTURE SERVICES", "National Identity · Enterprise IAM · PKI · Signatures · Seals · Timestamps · Qualified Trust Services · Sovereign Cloud · External Trust Providers · Circularo-Native Capabilities", "#3516AA", 132],
    ["TRUSTED · COMPLIANT · VERIFIABLE BUSINESS OUTCOMES", "", COLORS.purple, 72],
  ];
  let top = 210;
  layers.forEach(([title, body, fill, height], index) => {
    addRect(slide, { name: `architecture-layer-${index + 1}`, left: 48, top, width: 1132, height, fill, lineFill: "#6E51DA", lineWidth: 1, radius: 10 });
    addText(slide, { name: `architecture-title-${index + 1}`, text: title, left: 82, top: top + 20, width: 1064, height: 30, role: "bodyBold", fontSize: index === 1 ? 19 : 18, color: COLORS.white, alignment: "center" });
    if (body) addText(slide, { name: `architecture-body-${index + 1}`, text: body, left: 82, top: top + 58, width: 1064, height: height - 70, role: "body", fontSize: 16.5, color: "#E6DEFF", alignment: "center" });
    top += height + 18;
  });
}

function addCheatSheet(slide) {
  addSlideTitle(slide, "Narrative Relationship Cheat Sheet", { width: 1160 });
  const headers = ["NARRATIVE", "QUESTION IT ANSWERS", "CORE IDEA"];
  const x = [48, 344, 684];
  const widths = [260, 304, 496];
  headers.forEach((header, index) => {
    addRect(slide, { name: `cheat-header-bg-${index + 1}`, left: x[index], top: 218, width: widths[index], height: 54, fill: COLORS.darkBlue });
    addText(slide, { name: `cheat-header-${index + 1}`, text: header, left: x[index] + 18, top: 236, width: widths[index] - 36, height: 22, role: "chrome", fontSize: 13, color: COLORS.white });
  });
  const rows = [
    ["Evolution", "Where is Circularo going?", "Digital Signatures · Digital Trust · Trusted Execution · Agentic Trusted Execution"],
    ["Trust Orchestration", "What does Circularo do?", "Connects the controls and trust services required for a trusted outcome"],
    ["Transaction Complexity", "Why does this matter?", "More actors, systems, autonomy and jurisdictions create greater orchestration needs"],
  ];
  rows.forEach((row, rowIndex) => {
    const top = 288 + rowIndex * 112;
    row.forEach((value, colIndex) => {
      addRect(slide, { name: `cheat-cell-bg-${rowIndex + 1}-${colIndex + 1}`, left: x[colIndex], top, width: widths[colIndex], height: 96, fill: rowIndex % 2 === 0 ? COLORS.neutral50 : COLORS.white, lineFill: COLORS.neutral200, lineWidth: 1 });
      addText(slide, { name: `cheat-cell-${rowIndex + 1}-${colIndex + 1}`, text: value, left: x[colIndex] + 18, top: top + 18, width: widths[colIndex] - 36, height: 66, role: colIndex === 0 ? "bodyBold" : "body", fontSize: 17.5, color: colIndex === 0 ? COLORS.darkBlue : COLORS.body });
    });
  });
}

function addGuardrails(slide) {
  addSlideTitle(slide, "Internal Narrative Guardrails", { dark: true, width: 1140 });
  addBulletRows(slide, [
    "Do not position the evolution as abandoning digital signatures.",
    "Do not imply Circularo owns every underlying trust service.",
    "Do not equate AI intelligence with institutional authority.",
    "Do not turn future agentic concepts into current product claims without validation.",
    "Do not make jurisdiction-specific compliance claims without canonical evidence.",
    "Keep Trust Orchestration, Trusted Execution, and Agentic Trusted Execution distinct and consistently defined.",
  ], { left: 48, top: 224, width: 1132, rowHeight: 64, dark: true, size: 20 });
}

async function main() {
  await fs.mkdir(BUILD, { recursive: true });
  const presentation = Presentation.create({ slideSize: CANVAS });
  const specs = [
    { dark: true, build: addCover },
    { build: addCommonNarrative },
    { dark: true, build: addThreeNarratives },
    { build: addExpandingTrust },
    { dark: true, build: addTrustedOutcome },
    { build: addOrchestrationPlatform },
    { dark: true, build: addOrchestrationScope },
    { build: addEcosystems },
    { dark: true, build: addComplexity },
    { build: addComplexityProgression },
    { dark: true, build: addAiAuthority },
    { build: addExecutionBoundary },
    { dark: true, build: addFlywheel },
    { build: addOperatingModels },
    { dark: true, build: addCombinedThesis },
    { build: addCommonLanguage },
    { dark: true, eyebrow: "Appendix", build: addArchitectureAppendix },
    { eyebrow: "Appendix", build: addCheatSheet },
    { dark: true, eyebrow: "Appendix", build: addGuardrails },
  ];

  for (let index = 0; index < specs.length; index += 1) {
    const spec = specs[index];
    const slide = await baseSlide(presentation, index + 1, { dark: spec.dark, eyebrow: spec.eyebrow ?? "Circularo strategic narratives" });
    await spec.build(slide);
  }

  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    await writeBlob(path.join(BUILD, `${stem}.png`), await presentation.export({ slide, format: "png", scale: 1 }));
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(path.join(BUILD, `${stem}.layout.json`), await layout.text());
  }
  await writeBlob(path.join(BUILD, "circularo-strategic-narratives-internal-montage.webp"), await presentation.export({ format: "webp", montage: true, scale: 1 }));
  const inspection = await presentation.inspect({ kind: "slide,textbox,shape,image,notes,layout", maxChars: 300000 });
  await fs.writeFile(path.join(BUILD, "circularo-strategic-narratives-internal.inspect.ndjson"), inspection.ndjson);
  await (await PresentationFile.exportPptx(presentation)).save(DRAFT);
  console.log(JSON.stringify({ draftPath: DRAFT, slides: presentation.slides.items.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
