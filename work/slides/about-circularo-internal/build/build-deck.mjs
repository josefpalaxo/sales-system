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
const TASK = path.join(ROOT, "work/slides/about-circularo-internal");
const BUILD = path.join(TASK, "build/render");
const DRAFT = path.join(TASK, "build/candidate.pptx");
const SOURCE = "work/new-story/about-circularo-updated.md";
const BRAND = ".agents/skills/circularo-slides/references/brand-system.md";

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

function addInternalMark(slide, dark) {
  addText(slide, {
    name: "internal-mark",
    text: "INTERNAL STRATEGY",
    left: 948,
    top: 34,
    width: 232,
    height: 20,
    role: "chrome",
    fontSize: 12,
    color: dark ? "#C9AEFF" : COLORS.neutral500,
    alignment: "right",
  });
}

async function baseSlide(presentation, pageNumber, { dark = false, eyebrow = "About Circularo" } = {}) {
  const slide = presentation.slides.add();
  slide.background.fill = dark ? COLORS.darkBlue : COLORS.white;
  await addChrome(slide, pageNumber, { dark });
  addEyebrow(slide, eyebrow, { dark, width: 790 });
  addInternalMark(slide, dark);
  addSources(slide, [SOURCE, BRAND]);
  return slide;
}

function addLabel(slide, name, text, left, top, width, { dark = false, alignment = "left" } = {}) {
  return addText(slide, {
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

function addRow(slide, name, label, body, top, { dark = false, labelWidth = 300, bodyLeft = 390, bodyWidth = 790, fontSize = 21.5 } = {}) {
  addText(slide, {
    name: `${name}-label`,
    text: label,
    left: 48,
    top,
    width: labelWidth,
    height: 42,
    role: "bodyBold",
    fontSize: 22,
    color: dark ? COLORS.white : COLORS.darkBlue,
  });
  addText(slide, {
    name: `${name}-body`,
    text: body,
    left: bodyLeft,
    top,
    width: bodyWidth,
    height: 54,
    role: "body",
    fontSize,
    color: dark ? "#E6DEFF" : COLORS.body,
  });
}

function addCapabilityChrome(slide, number, title, { dark = false } = {}) {
  addLabel(slide, "capability-series", `The Circularo Trust Orchestration Platform / ${number} of 6`, 48, 88, 660, { dark });
  addText(slide, {
    name: "capability-title",
    text: title,
    left: 48,
    top: 124,
    width: 1050,
    height: 92,
    role: "slideTitle",
    fontSize: 46,
    color: dark ? COLORS.white : COLORS.darkBlue,
  });
}

function addCover(slide) {
  addLabel(slide, "cover-kicker", "Circularo company and platform narrative", 48, 124, 600, { dark: true });
  addText(slide, {
    name: "cover-title",
    text: "About Circularo",
    left: 48,
    top: 184,
    width: 720,
    height: 92,
    role: "hero",
    fontSize: 66,
    color: COLORS.white,
  });
  addText(slide, {
    name: "cover-subtitle",
    text: "Trust orchestration and trusted execution for organizations, governments, and the agentic era",
    left: 48,
    top: 316,
    width: 690,
    height: 112,
    role: "body",
    fontSize: 26,
    color: "#E6DEFF",
  });
  addText(slide, {
    name: "cover-thesis",
    text: "Circularo orchestrates trust. Trusted Execution is the outcome.",
    left: 48,
    top: 502,
    width: 710,
    height: 54,
    role: "bodyBold",
    fontSize: 22,
    color: "#C9AEFF",
  });

  const layers = [
    ["PEOPLE AND SYSTEMS", "People / Organizations / Applications / AI agents", 186, "#3516AA"],
    ["CIRCULARO", "Trust Orchestration Platform", 310, COLORS.purple],
    ["OUTCOME", "Trusted actions / Evidence / Trusted records", 434, "#3516AA"],
  ];
  layers.forEach(([label, body, top, fill], index) => {
    addRect(slide, { name: `cover-layer-${index + 1}`, left: 820, top, width: 360, height: 92, fill, lineFill: "#6E51DA", lineWidth: fill === COLORS.purple ? 0 : 1, radius: 12 });
    addLabel(slide, `cover-layer-label-${index + 1}`, label, 850, top + 18, 300, { dark: true, alignment: "center" });
    addText(slide, { name: `cover-layer-body-${index + 1}`, text: body, left: 850, top: top + 50, width: 300, height: 32, role: "bodyBold", fontSize: 17.5, color: COLORS.white, alignment: "center" });
  });
  addDivider(slide, { name: "cover-link-1", left: 998, top: 278, width: 2, height: 32, color: "#6E51DA" });
  addDivider(slide, { name: "cover-link-2", left: 998, top: 402, width: 2, height: 32, color: "#6E51DA" });
}

function addCompanyView(slide) {
  addSlideTitle(slide, "Circularo in one view", { width: 1060 });
  addText(slide, {
    name: "company-definition",
    text: "Circularo is a digital trust technology company headquartered in Dubai, providing enterprise and government platforms for trusted digital processes.",
    left: 48,
    top: 228,
    width: 700,
    height: 138,
    role: "sectionTitle",
    fontSize: 30,
    color: COLORS.darkBlue,
  });
  const rows = [
    ["Problem", "Establish trust as business processes become more digital and autonomous"],
    ["Platform", "Connect content, actors, authority, workflow, trust services, and evidence"],
    ["Outcome", "Complete trusted actions and preserve verifiable institutional records"],
  ];
  rows.forEach(([label, body], index) => {
    const top = 418 + index * 60;
    addLabel(slide, `company-${index + 1}-label`, label, 48, top, 118);
    addText(slide, { name: `company-${index + 1}-body`, text: body, left: 176, top: top - 3, width: 574, height: 44, role: "body", fontSize: 21.5, color: COLORS.body });
  });
  addRect(slide, { name: "company-thesis-frame", left: 824, top: 228, width: 356, height: 344, fill: COLORS.darkBlue, radius: 12 });
  addLabel(slide, "company-thesis-label", "Company thesis", 860, 266, 284, { dark: true, alignment: "center" });
  addText(slide, { name: "company-thesis-main", text: "Trust must remain connected across the complete digital process.", left: 860, top: 326, width: 284, height: 126, role: "sectionTitle", fontSize: 28, color: COLORS.white, alignment: "center" });
  addText(slide, { name: "company-thesis-detail", text: "Before execution\nDuring execution\nAfter execution", left: 860, top: 482, width: 284, height: 74, role: "bodyBold", fontSize: 20, color: "#C9AEFF", alignment: "center" });
  addTakeaway(slide, "Circularo expands the trust model around signatures without moving away from them.");
}

function addEvolution(slide) {
  addSlideTitle(slide, "One continuous expansion of the trust problem", { dark: true, width: 1150 });
  const stages = [
    ["01", "Digital signatures", "Prove the signing action"],
    ["02", "Digital trust", "Maintain trust across the process"],
    ["03", "Trusted execution", "Deliver a controlled business outcome"],
    ["04", "Agentic trusted execution", "Apply the model when AI agents act"],
  ];
  addDivider(slide, { name: "evolution-spine", left: 90, top: 360, width: 1090, height: 3, color: "#6E51DA" });
  stages.forEach(([number, title, body], index) => {
    const left = 48 + index * 296;
    addNumber(slide, `evolution-${index + 1}`, number, left + 102, 338, { active: index === 3, dark: true });
    addText(slide, { name: `evolution-title-${index + 1}`, text: title, left, top: 414, width: 250, height: 62, role: "componentTitle", fontSize: 23, color: COLORS.white, alignment: "center" });
    addText(slide, { name: `evolution-body-${index + 1}`, text: body, left, top: 494, width: 250, height: 64, role: "body", fontSize: 19.5, color: "#D8C9FF", alignment: "center" });
  });
  addTakeaway(slide, "Each stage keeps the prior trust capability and expands the outcome Circularo can support.", { dark: true });
}

function addFocusAreas(slide) {
  addSlideTitle(slide, "Four strategic focus areas", { width: 1040 });
  const areas = [
    ["01", "Enterprise Digital Trust", "Simplify trusted digital work across organizations"],
    ["02", "Sovereign Digital Trust", "Operate modern trust infrastructure in customer-controlled environments"],
    ["03", "Government Shared Services", "Provide reusable trust capabilities across public institutions"],
    ["04", "Agentic AI Trust", "Govern identity, authority, execution, and evidence when agents act"],
  ];
  areas.forEach(([number, title, body], index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const left = 48 + column * 592;
    const top = 236 + row * 170;
    addNumber(slide, `focus-${index + 1}`, number, left, top, { active: index === 3 });
    addText(slide, { name: `focus-title-${index + 1}`, text: title, left: left + 72, top: top - 2, width: 430, height: 42, role: "componentTitle", fontSize: 25, color: COLORS.darkBlue });
    addText(slide, { name: `focus-body-${index + 1}`, text: body, left: left + 72, top: top + 54, width: 450, height: 74, role: "body", fontSize: 21.5, color: COLORS.body });
    if (row === 0) addDivider(slide, { name: `focus-divider-${index + 1}`, left, top: top + 142, width: 536, height: 1, color: COLORS.neutral200 });
  });
  addTakeaway(slide, "Four focus areas. Three delivery models. One Trusted Execution Platform.");
}

function addMarketPosition(slide) {
  addSlideTitle(slide, "Differentiation is moving above trust infrastructure", { dark: true, width: 1160 });
  addText(slide, { name: "market-thesis", text: "Identity, signatures, seals, timestamps, PKI, and sovereign cloud services increasingly form a shared foundation.", left: 48, top: 234, width: 490, height: 130, role: "sectionTitle", fontSize: 28, color: COLORS.white });
  addText(slide, { name: "market-implication", text: "Circularo connects that foundation to the authority, workflow, policy, evidence, integrations, and operating controls required by real business processes.", left: 48, top: 408, width: 500, height: 132, role: "body", fontSize: 21.5, color: "#D8C9FF" });
  addRect(slide, { name: "foundation", left: 688, top: 422, width: 492, height: 116, fill: "#3516AA", lineFill: "#6E51DA", lineWidth: 1, radius: 12 });
  addLabel(slide, "foundation-label", "Foundational trust infrastructure", 724, 448, 420, { dark: true, alignment: "center" });
  addText(slide, { name: "foundation-body", text: "Identity / PKI / signatures / seals / timestamps / sovereign cloud", left: 724, top: 486, width: 420, height: 34, role: "body", fontSize: 18.5, color: COLORS.white, alignment: "center" });
  addRect(slide, { name: "orchestration", left: 638, top: 238, width: 542, height: 144, fill: COLORS.purple, radius: 12 });
  addLabel(slide, "orchestration-label", "Circularo trust orchestration", 678, 264, 462, { dark: true, alignment: "center" });
  addText(slide, { name: "orchestration-body", text: "Content / authority / workflow / approval\nassurance / evidence / records / deployment control", left: 678, top: 308, width: 462, height: 64, role: "bodyBold", fontSize: 19.5, color: COLORS.white, alignment: "center" });
  addTakeaway(slide, "Circularo turns trust infrastructure into governed business outcomes.", { dark: true });
}

function addDistinction(slide) {
  addSlideTitle(slide, "Trust Orchestration and Trusted Execution serve different roles", { width: 1160 });
  addRect(slide, { name: "capability-frame", left: 48, top: 250, width: 524, height: 286, fill: COLORS.softPurple, lineFill: "#C9AEFF", lineWidth: 1, radius: 12 });
  addLabel(slide, "capability-label", "Platform capability", 88, 286, 420);
  addText(slide, { name: "capability-title", text: "Trust Orchestration", left: 88, top: 334, width: 420, height: 52, role: "sectionTitle", color: COLORS.darkBlue });
  addText(slide, { name: "capability-body", text: "Connects content, actors, identity, authority, workflow, trust services, evidence, and records across the business process.", left: 88, top: 414, width: 420, height: 100, role: "body", fontSize: 21.5, color: COLORS.body });
  addRect(slide, { name: "outcome-frame", left: 656, top: 250, width: 524, height: 286, fill: COLORS.darkBlue, radius: 12 });
  addLabel(slide, "outcome-label", "Business outcome", 696, 286, 420, { dark: true });
  addText(slide, { name: "outcome-title", text: "Trusted Execution", left: 696, top: 334, width: 420, height: 52, role: "sectionTitle", color: COLORS.white });
  addText(slide, { name: "outcome-body", text: "Produces a trusted and verifiable action with the appropriate controls, assurance, and retained evidence.", left: 696, top: 414, width: 420, height: 100, role: "body", fontSize: 21.5, color: "#E6DEFF" });
  addTakeaway(slide, "Circularo orchestrates trust. Trusted Execution is the outcome.");
}

function addPlatformChapter(slide) {
  addLabel(slide, "chapter-kicker", "Independent platform chapter", 48, 124, 540, { dark: true });
  addText(slide, { name: "chapter-title", text: "The Circularo Trust\nOrchestration Platform", left: 48, top: 180, width: 720, height: 148, role: "hero", fontSize: 54, color: COLORS.white });
  addText(slide, { name: "chapter-subtitle", text: "Six connected platform areas. One Trusted Execution environment.", left: 48, top: 370, width: 690, height: 72, role: "body", fontSize: 25, color: "#E6DEFF" });
  const names = ["Content", "Identity", "Workflow", "Trust services", "Evidence", "Programmable trust"];
  names.forEach((name, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const left = 820 + column * 182;
    const top = 170 + row * 126;
    addNumber(slide, `chapter-${index + 1}`, String(index + 1).padStart(2, "0"), left, top, { active: index === 5, dark: true });
    addText(slide, { name: `chapter-name-${index + 1}`, text: name, left: left + 60, top: top + 10, width: 144, height: 46, role: "bodyBold", fontSize: 17, color: index === 5 ? COLORS.white : "#D8C9FF" });
  });
  addText(slide, { name: "chapter-foot", text: "Content and actors become connected to authority, decisions, trust services, execution, and evidence.", left: 48, top: 522, width: 1090, height: 58, role: "bodyBold", fontSize: 21.5, color: "#C9AEFF" });
}

function addContentCollaboration(slide) {
  addCapabilityChrome(slide, "1", "Content & Collaboration");
  addText(slide, { name: "content-principle", text: "Trust begins with the content itself.", left: 48, top: 236, width: 560, height: 78, role: "sectionTitle", fontSize: 31, color: COLORS.darkBlue });
  addText(slide, { name: "content-description", text: "Circularo supports important business content from creation and preparation through collaboration and review, before formal execution begins.", left: 48, top: 338, width: 550, height: 120, role: "body", fontSize: 21.5, color: COLORS.body });
  const stages = ["Create", "Prepare", "Collaborate", "Review"];
  addDivider(slide, { name: "content-spine", left: 690, top: 360, width: 446, height: 3, color: COLORS.purple });
  stages.forEach((stage, index) => {
    const left = 638 + index * 144;
    addNumber(slide, `content-stage-${index + 1}`, String(index + 1).padStart(2, "0"), left + 45, 338, { active: index === 3 });
    addText(slide, { name: `content-stage-label-${index + 1}`, text: stage, left, top: 414, width: 136, height: 34, role: "bodyBold", fontSize: 18.5, color: COLORS.darkBlue, alignment: "center" });
  });
  addRect(slide, { name: "content-scope", left: 650, top: 482, width: 530, height: 74, fill: COLORS.softPurple, lineFill: "#C9AEFF", lineWidth: 1, radius: 10 });
  addText(slide, { name: "content-scope-text", text: "Document and PDF capabilities / Office and Collabora integration / planned eDoc direction", left: 682, top: 500, width: 466, height: 44, role: "body", fontSize: 18.5, color: COLORS.darkBlue, alignment: "center" });
  addTakeaway(slide, "Trust begins when important content is created, before a signature field is added.");
}

function addIdentityAuthority(slide) {
  addCapabilityChrome(slide, "2", "Identity & Authority", { dark: true });
  addRect(slide, { name: "identity-frame", left: 48, top: 240, width: 514, height: 278, fill: "#3516AA", lineFill: "#6E51DA", lineWidth: 1, radius: 12 });
  addLabel(slide, "identity-label", "Identity", 88, 278, 410, { dark: true });
  addText(slide, { name: "identity-title", text: "Who or what is acting?", left: 88, top: 332, width: 410, height: 66, role: "sectionTitle", fontSize: 31, color: COLORS.white });
  addText(slide, { name: "identity-body", text: "Establish the actor and the identity assurance appropriate to the process.", left: 88, top: 430, width: 410, height: 70, role: "body", fontSize: 21.5, color: "#D8C9FF" });
  addRect(slide, { name: "authority-frame", left: 666, top: 240, width: 514, height: 278, fill: COLORS.purple, radius: 12 });
  addLabel(slide, "authority-label", "Authority", 706, 278, 410, { dark: true });
  addText(slide, { name: "authority-title", text: "Whom does the actor represent, and what may they do?", left: 706, top: 332, width: 410, height: 94, role: "sectionTitle", fontSize: 29, color: COLORS.white });
  addText(slide, { name: "authority-body", text: "Define mandate, limits, organizational role, and delegated authority.", left: 706, top: 448, width: 410, height: 58, role: "body", fontSize: 21.5, color: COLORS.white });
  addTakeaway(slide, "Identity establishes the actor. Authority establishes the right to act.", { dark: true });
}

function addWorkflowApproval(slide) {
  addCapabilityChrome(slide, "3", "Workflow & Approval");
  addText(slide, { name: "workflow-description", text: "Circularo connects organizational authority to the execution path through participants, decisions, business rules, reviews, approvals, and escalation.", left: 48, top: 236, width: 520, height: 138, role: "sectionTitle", fontSize: 28, color: COLORS.darkBlue });
  const steps = [
    ["01", "Route", "Who participates"],
    ["02", "Review", "What requires review"],
    ["03", "Decide", "Who may decide"],
    ["04", "Approve", "Which approval is required"],
    ["05", "Control", "When escalation applies"],
  ];
  steps.forEach(([number, title, body], index) => {
    const top = 228 + index * 70;
    addNumber(slide, `workflow-${index + 1}`, number, 650, top, { active: index === 3, size: 40 });
    addText(slide, { name: `workflow-title-${index + 1}`, text: title, left: 718, top: top + 4, width: 150, height: 32, role: "bodyBold", fontSize: 21.5, color: COLORS.darkBlue });
    addText(slide, { name: `workflow-body-${index + 1}`, text: body, left: 880, top: top + 4, width: 300, height: 34, role: "body", fontSize: 20.5, color: COLORS.body });
    if (index < 4) addDivider(slide, { name: `workflow-line-${index + 1}`, left: 650, top: top + 54, width: 530, height: 1, color: COLORS.neutral200 });
  });
  addTakeaway(slide, "Approval records institutional authority and the decision that allowed execution.");
}

function addTrustServices(slide) {
  addCapabilityChrome(slide, "4", "Trust Services", { dark: true });
  addText(slide, { name: "trust-services-principle", text: "The process should invoke the trust mechanism that matches the actor, jurisdiction, and required assurance.", left: 48, top: 236, width: 570, height: 130, role: "sectionTitle", fontSize: 29, color: COLORS.white });
  addText(slide, { name: "trust-services-description", text: "Circularo can coordinate native capabilities with external, national, sovereign, and third-party trust infrastructure.", left: 48, top: 414, width: 550, height: 88, role: "body", fontSize: 21.5, color: "#D8C9FF" });
  const services = ["Identity verification", "Electronic and digital signatures", "Organizational seals", "Timestamps", "PKI-based services", "Other applicable trust services"];
  services.forEach((service, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const left = 688 + column * 250;
    const top = 238 + row * 104;
    addNumber(slide, `service-${index + 1}`, String(index + 1).padStart(2, "0"), left, top, { active: index === 1, dark: true, size: 38 });
    addText(slide, { name: `service-label-${index + 1}`, text: service, left: left + 52, top: top + 2, width: 190, height: 58, role: "bodyBold", fontSize: 18.5, color: COLORS.white });
  });
  addTakeaway(slide, "A trust service is one event in the process. Circularo orchestrates how it supports the outcome.", { dark: true });
}

function addEvidenceRecords(slide) {
  addCapabilityChrome(slide, "5", "Evidence & Trusted Records");
  addText(slide, { name: "evidence-principle", text: "Trusted Execution should produce more than a completed document.", left: 48, top: 236, width: 520, height: 104, role: "sectionTitle", fontSize: 30, color: COLORS.darkBlue });
  const evidence = ["Authoritative version", "Identities and roles", "Approvals and decisions", "Signatures and seals", "Timestamps and audit events", "Process and retention context"];
  evidence.forEach((item, index) => {
    const top = 360 + index * 36;
    addText(slide, { name: `evidence-item-${index + 1}`, text: item, left: 48, top, width: 500, height: 30, role: "body", fontSize: 20.5, color: COLORS.body });
    addDivider(slide, { name: `evidence-item-line-${index + 1}`, left: 550, top: top + 13, width: 80 + index * 28, height: 2, color: COLORS.neutral300 });
  });
  addRect(slide, { name: "trusted-record-frame", left: 760, top: 260, width: 372, height: 292, fill: COLORS.darkBlue, radius: 16 });
  addLabel(slide, "trusted-record-label", "Output", 810, 296, 272, { dark: true, alignment: "center" });
  addText(slide, { name: "trusted-record-title", text: "TRUSTED\nRECORD", left: 810, top: 344, width: 272, height: 94, role: "sectionTitle", fontSize: 34, color: COLORS.white, alignment: "center" });
  addText(slide, { name: "trusted-record-detail", text: "Verifiable institutional evidence and searchable memory", left: 810, top: 456, width: 272, height: 72, role: "bodyBold", fontSize: 18.5, color: "#C9AEFF", alignment: "center" });
  addTakeaway(slide, "Trusted Execution creates evidence. Trusted records preserve institutional memory.");
}

function addProgrammableTrust(slide) {
  addCapabilityChrome(slide, "6", "Programmable Trust & Agentic Execution", { dark: true });
  const actors = ["Enterprise applications", "Government services", "Portals and integrations", "Automation and AI agents"];
  actors.forEach((actor, index) => {
    const left = 48 + index * 284;
    addRect(slide, { name: `programmable-actor-${index + 1}`, left, top: 242, width: 246, height: 70, fill: "#3516AA", lineFill: "#6E51DA", lineWidth: 1, radius: 10 });
    addText(slide, { name: `programmable-actor-label-${index + 1}`, text: actor, left: left + 14, top: 260, width: 218, height: 42, role: "bodyBold", fontSize: 18.5, color: COLORS.white, alignment: "center" });
    addDivider(slide, { name: `programmable-actor-line-${index + 1}`, left: left + 122, top: 312, width: 2, height: 50, color: "#6E51DA" });
  });
  addRect(slide, { name: "api-boundary", left: 48, top: 362, width: 1132, height: 106, fill: COLORS.purple, radius: 12 });
  addText(slide, { name: "api-title", text: "UNIFIED TRUST API", left: 88, top: 388, width: 1052, height: 38, role: "sectionTitle", fontSize: 31, color: COLORS.white, alignment: "center" });
  addText(slide, { name: "api-controls", text: "Identity / delegated authority / policy / approval / trust services / execution / evidence", left: 88, top: 436, width: 1052, height: 24, role: "bodyBold", fontSize: 18.5, color: COLORS.white, alignment: "center" });
  addText(slide, { name: "api-boundary-description", text: "Circularo governs what an agent may do, what actually executes, and what evidence remains afterwards.", left: 180, top: 506, width: 868, height: 58, role: "bodyBold", fontSize: 21.5, color: "#D8C9FF", alignment: "center" });
  addTakeaway(slide, "API access enables participation. Institutional authority still determines permitted action.", { dark: true });
}

function addConnectedPlatform(slide) {
  addSlideTitle(slide, "One Connected Trust Orchestration Platform", { width: 1120 });
  const stages = [
    ["01", "Content &\nCollaboration"],
    ["02", "Identity &\nAuthority"],
    ["03", "Workflow &\nApproval"],
    ["04", "Trust\nServices"],
    ["05", "Evidence &\nTrusted Records"],
    ["06", "Programmable Trust &\nAgentic Execution"],
  ];
  addDivider(slide, { name: "platform-spine", left: 80, top: 342, width: 1096, height: 3, color: COLORS.neutral300 });
  stages.forEach(([number, title], index) => {
    const left = 48 + index * 196;
    addNumber(slide, `platform-${index + 1}`, number, left + 64, 320, { active: index === 5 });
    addText(slide, { name: `platform-title-${index + 1}`, text: title, left, top: 398, width: 174, height: 72, role: "bodyBold", fontSize: 18.5, color: COLORS.darkBlue, alignment: "center" });
  });
  addText(slide, { name: "platform-summary", text: "The underlying identity or trust infrastructure can vary by organization, deployment model, or jurisdiction. Circularo keeps the process and evidence chain consistent.", left: 180, top: 500, width: 870, height: 82, role: "body", fontSize: 21.5, color: COLORS.body, alignment: "center" });
  addTakeaway(slide, "Circularo orchestrates trust. Trusted Execution is the outcome.");
}

function addDeliveryChapter(slide) {
  addLabel(slide, "delivery-kicker", "Delivery models", 48, 124, 420, { dark: true });
  addText(slide, { name: "delivery-title", text: "One platform.\nThree delivery models.", left: 48, top: 184, width: 650, height: 150, role: "hero", fontSize: 54, color: COLORS.white });
  addText(slide, { name: "delivery-subtitle", text: "Different infrastructure requirements. One trust model.", left: 48, top: 378, width: 650, height: 60, role: "body", fontSize: 25, color: "#E6DEFF" });
  const models = [
    ["01", "Circularo SaaS", "Managed cloud"],
    ["02", "Circularo Sovereign", "Customer-controlled"],
    ["03", "Shared Services", "Common infrastructure"],
  ];
  models.forEach(([number, name, descriptor], index) => {
    const top = 186 + index * 126;
    addNumber(slide, `delivery-${index + 1}`, number, 814, top, { active: index === 1, dark: true });
    addText(slide, { name: `delivery-name-${index + 1}`, text: name, left: 884, top: top - 2, width: 280, height: 34, role: "bodyBold", fontSize: 22, color: COLORS.white });
    addText(slide, { name: `delivery-descriptor-${index + 1}`, text: descriptor, left: 884, top: top + 42, width: 280, height: 30, role: "body", fontSize: 19, color: "#C9AEFF" });
  });
  addText(slide, { name: "delivery-foot", text: "The operating model changes. The platform logic and evidence model remain connected.", left: 48, top: 536, width: 1080, height: 54, role: "bodyBold", fontSize: 21.5, color: "#C9AEFF" });
}

function addModelOverview(slide) {
  addSlideTitle(slide, "Three delivery models share one trust model", { width: 1120 });
  const models = [
    ["01", "Circularo SaaS", "Managed enterprise digital trust", "Organizations that want to consume the platform without operating its infrastructure"],
    ["02", "Circularo Sovereign", "Customer-controlled trusted execution", "Organizations that require stronger control over infrastructure, data, and governance"],
    ["03", "Sovereign Trust Shared Services", "Digital trust as shared infrastructure", "Governments and operators serving multiple institutions through one governed platform"],
  ];
  models.forEach(([number, name, role, audience], index) => {
    const left = 48 + index * 400;
    addNumber(slide, `model-overview-${index + 1}`, number, left, 246, { active: index === 1 });
    addText(slide, { name: `model-overview-name-${index + 1}`, text: name, left, top: 318, width: 340, height: 72, role: "componentTitle", fontSize: 25, color: COLORS.darkBlue });
    addText(slide, { name: `model-overview-role-${index + 1}`, text: role, left, top: 408, width: 340, height: 54, role: "bodyBold", fontSize: 20.5, color: COLORS.purple });
    addText(slide, { name: `model-overview-audience-${index + 1}`, text: audience, left, top: 480, width: 340, height: 92, role: "body", fontSize: 19.5, color: COLORS.body });
  });
  addTakeaway(slide, "Each model connects identity, authority, approval, trust services, evidence, archive, and intelligence.");
}

function addDeliveryModelSlide(slide, { name, descriptor, description, who, control, role, dark = false }) {
  addSlideTitle(slide, name, { dark, width: 1080 });
  addLabel(slide, "delivery-model-descriptor", descriptor, 48, 220, 600, { dark });
  addText(slide, { name: "delivery-model-description", text: description, left: 48, top: 262, width: 550, height: 154, role: "sectionTitle", fontSize: 29, color: dark ? COLORS.white : COLORS.darkBlue });
  const rows = [
    ["Best fit", who],
    ["Control profile", control],
    ["Strategic role", role],
  ];
  rows.forEach(([label, body], index) => {
    const top = 236 + index * 112;
    addLabel(slide, `delivery-detail-${index + 1}`, label, 700, top, 180, { dark });
    addText(slide, { name: `delivery-detail-body-${index + 1}`, text: body, left: 700, top: top + 36, width: 480, height: 68, role: "bodyBold", fontSize: 21.5, color: dark ? COLORS.white : COLORS.darkBlue });
    if (index < 2) addDivider(slide, { name: `delivery-detail-line-${index + 1}`, left: 700, top: top + 98, width: 480, height: 1, color: dark ? "#5B3BC9" : COLORS.neutral200 });
  });
  addTakeaway(slide, "The delivery model changes how the platform operates, not the underlying trust model.", { dark });
}

function addProofChapter(slide) {
  addLabel(slide, "proof-kicker", "Experience and trust ecosystem", 48, 124, 560, { dark: true });
  addText(slide, { name: "proof-title", text: "Proven where trust matters", left: 48, top: 188, width: 870, height: 82, role: "hero", fontSize: 56, color: COLORS.white });
  addText(slide, { name: "proof-subtitle", text: "More than a decade of experience across government, regulated industries, and large enterprises.", left: 48, top: 320, width: 740, height: 96, role: "sectionTitle", fontSize: 29, color: "#E6DEFF" });
  addRect(slide, { name: "proof-qualification", left: 820, top: 234, width: 360, height: 250, fill: "#3516AA", lineFill: "#6E51DA", lineWidth: 1, radius: 12 });
  addLabel(slide, "proof-qualification-label", "Internal use", 860, 274, 280, { dark: true, alignment: "center" });
  addText(slide, { name: "proof-qualification-body", text: "Confirm current approval, exact wording, and logo permissions before external reuse.", left: 860, top: 336, width: 280, height: 104, role: "bodyBold", fontSize: 21.5, color: COLORS.white, alignment: "center" });
  addText(slide, { name: "proof-foot", text: "The following references and frameworks come from the supplied internal narrative.", left: 48, top: 528, width: 1060, height: 44, role: "body", fontSize: 21.5, color: "#C9AEFF" });
}

function addGovernmentProof(slide) {
  addSlideTitle(slide, "Government and shared services experience", { width: 1120 });
  const references = [
    ["TDRA GovSign", "Federal government digital signature services"],
    ["Digital Dubai DigiSign", "Shared digital signature services across Dubai government entities"],
    ["Sharjah Sign", "Shared digital trust services across Sharjah government entities"],
    ["e& DigiSign", "Digital signature services supporting business customers"],
  ];
  references.forEach(([name, body], index) => {
    const top = 236 + index * 82;
    addNumber(slide, `government-${index + 1}`, String(index + 1).padStart(2, "0"), 48, top, { active: index === 1, size: 40 });
    addText(slide, { name: `government-name-${index + 1}`, text: name, left: 116, top: top + 2, width: 310, height: 38, role: "bodyBold", fontSize: 22, color: COLORS.darkBlue });
    addText(slide, { name: `government-body-${index + 1}`, text: body, left: 452, top: top + 2, width: 728, height: 42, role: "body", fontSize: 21.5, color: COLORS.body });
    if (index < 3) addDivider(slide, { name: `government-line-${index + 1}`, left: 116, top: top + 58, width: 1064, height: 1, color: COLORS.neutral200 });
  });
  addRect(slide, { name: "government-qualification", left: 48, top: 570, width: 1132, height: 40, fill: COLORS.softPurple, radius: 8 });
  addText(slide, { name: "government-qualification-text", text: "INTERNAL REFERENCE SET. VERIFY CURRENT APPROVAL AND EXTERNAL USAGE RIGHTS.", left: 80, top: 582, width: 1068, height: 20, role: "chrome", fontSize: 13, color: COLORS.darkBlue, alignment: "center" });
}

function addEnterpriseTrust(slide) {
  addSlideTitle(slide, "Enterprise, security, and trust ecosystem", { dark: true, width: 1120 });
  addRect(slide, { name: "enterprise-side", left: 48, top: 230, width: 520, height: 332, fill: "#3516AA", lineFill: "#6E51DA", lineWidth: 1, radius: 12 });
  addLabel(slide, "enterprise-label", "Enterprise references", 84, 266, 440, { dark: true });
  addText(slide, { name: "enterprise-names", text: "RTA\nEDGE\nICD\nEmaar\nAbu Dhabi Department of Energy", left: 84, top: 316, width: 440, height: 210, role: "sectionTitle", fontSize: 27, color: COLORS.white });
  addRect(slide, { name: "trust-side", left: 648, top: 230, width: 532, height: 332, fill: COLORS.purple, radius: 12 });
  addLabel(slide, "trust-label", "Security and trust framework cited in source", 684, 266, 460, { dark: true });
  addText(slide, { name: "trust-framework", text: "ISO 27001 and ISO 9001\nUAE digital trust and TDRA requirements\neIDAS-compatible trust services\nAdobe Approved Trust List ecosystem\nEnterprise security and audit controls", left: 684, top: 316, width: 460, height: 218, role: "bodyBold", fontSize: 21, color: COLORS.white });
  addTakeaway(slide, "Verify exact approved wording, current status, and customer-reference permissions before external use.", { dark: true });
}

function addAgenticShift(slide) {
  addSlideTitle(slide, "Agentic systems change who can initiate action", { width: 1120 });
  const stages = [
    ["01", "Digital", "People move information online"],
    ["02", "Automated", "Systems execute repeatable rules"],
    ["03", "AI assisted", "Systems interpret and recommend"],
    ["04", "Agentic", "Software initiates trusted actions"],
  ];
  addDivider(slide, { name: "agentic-spine", left: 90, top: 356, width: 1090, height: 3, color: COLORS.neutral300 });
  stages.forEach(([number, title, body], index) => {
    const left = 48 + index * 296;
    addNumber(slide, `agentic-${index + 1}`, number, left + 102, 334, { active: index === 3 });
    addText(slide, { name: `agentic-title-${index + 1}`, text: title, left, top: 410, width: 250, height: 42, role: "componentTitle", fontSize: 24, color: COLORS.darkBlue, alignment: "center" });
    addText(slide, { name: `agentic-body-${index + 1}`, text: body, left, top: 474, width: 250, height: 70, role: "body", fontSize: 19.5, color: COLORS.body, alignment: "center" });
  });
  addTakeaway(slide, "As autonomy increases, the burden of institutional control increases.");
}

function addAuthorityQuestions(slide) {
  addSlideTitle(slide, "Intelligence and authority answer different questions", { dark: true, width: 1160 });
  addRect(slide, { name: "intelligence-frame", left: 48, top: 238, width: 418, height: 318, fill: COLORS.purple, radius: 12 });
  addLabel(slide, "intelligence-label", "Intelligence", 88, 278, 338, { dark: true });
  addText(slide, { name: "intelligence-title", text: "An AI agent may determine what should happen.", left: 88, top: 338, width: 338, height: 108, role: "sectionTitle", fontSize: 30, color: COLORS.white });
  addText(slide, { name: "authority-thesis", text: "Institutional authority determines whether it may execute.", left: 88, top: 474, width: 338, height: 62, role: "bodyBold", fontSize: 21.5, color: COLORS.white });
  const questions = [
    ["Actor", "Who or what acted?"],
    ["Representation", "Whom did the actor represent?"],
    ["Authority", "Did the mandate permit the action?"],
    ["Approval", "What decision allowed execution?"],
    ["Execution", "What actually happened?"],
    ["Evidence", "What remains provable?"],
  ];
  questions.forEach(([label, body], index) => {
    const top = 236 + index * 55;
    addLabel(slide, `authority-question-${index + 1}`, label, 546, top, 140, { dark: true });
    addText(slide, { name: `authority-question-body-${index + 1}`, text: body, left: 706, top: top - 3, width: 474, height: 34, role: "bodyBold", fontSize: 20.5, color: COLORS.white });
    addDivider(slide, { name: `authority-question-line-${index + 1}`, left: 546, top: top + 38, width: 634, height: 1, color: "#5B3BC9" });
  });
  addTakeaway(slide, "Intelligence can recommend an action. Authority determines whether it may execute.", { dark: true });
}

function addExecutionBoundary(slide) {
  addSlideTitle(slide, "Circularo governs the execution boundary", { width: 1100 });
  const actors = ["People", "Organizations", "Applications", "AI agents"];
  actors.forEach((actor, index) => {
    const left = 78 + index * 284;
    addRect(slide, { name: `boundary-actor-${index + 1}`, left, top: 226, width: 220, height: 62, fill: COLORS.softPurple, lineFill: "#C9AEFF", lineWidth: 1, radius: 10 });
    addText(slide, { name: `boundary-actor-label-${index + 1}`, text: actor, left, top: 246, width: 220, height: 26, role: "bodyBold", fontSize: 20, color: COLORS.darkBlue, alignment: "center" });
    addDivider(slide, { name: `boundary-actor-drop-${index + 1}`, left: left + 109, top: 288, width: 2, height: 50, color: "#C9AEFF" });
  });
  addRect(slide, { name: "execution-layer", left: 48, top: 338, width: 1132, height: 118, fill: COLORS.purple, radius: 12 });
  addText(slide, { name: "execution-layer-title", text: "CIRCULARO TRUSTED EXECUTION LAYER", left: 88, top: 364, width: 1052, height: 38, role: "sectionTitle", fontSize: 30, color: COLORS.white, alignment: "center" });
  addText(slide, { name: "execution-layer-controls", text: "IDENTITY / AUTHORITY / POLICY / APPROVAL / TRUST SERVICES / EXECUTION / EVIDENCE / AUDIT", left: 88, top: 416, width: 1052, height: 24, role: "chrome", fontSize: 13, color: COLORS.white, alignment: "center" });
  addDivider(slide, { name: "boundary-output-drop", left: 613, top: 456, width: 2, height: 46, color: "#C9AEFF" });
  addRect(slide, { name: "boundary-action", left: 250, top: 502, width: 330, height: 68, fill: COLORS.darkBlue, radius: 10 });
  addText(slide, { name: "boundary-action-title", text: "TRUSTED BUSINESS ACTION", left: 278, top: 520, width: 274, height: 42, role: "bodyBold", fontSize: 18.5, color: COLORS.white, alignment: "center" });
  addRect(slide, { name: "boundary-record", left: 648, top: 502, width: 330, height: 68, fill: COLORS.softPurple, lineFill: "#C9AEFF", lineWidth: 1, radius: 10 });
  addText(slide, { name: "boundary-record-title", text: "TRUSTED RECORD AND EVIDENCE", left: 676, top: 520, width: 274, height: 42, role: "bodyBold", fontSize: 18.5, color: COLORS.darkBlue, alignment: "center" });
  addTakeaway(slide, "Circularo governs permitted action, execution, and the evidence retained afterwards.");
}

function addProposition(slide) {
  addSlideTitle(slide, "The Circularo proposition", { dark: true, width: 1040 });
  const rows = [
    ["Company", "A Digital Trust and Trusted Execution technology company for enterprises, governments, and digital services"],
    ["Platform", "A Trust Orchestration Platform connecting content, authority, trust services, evidence, and records across end-to-end processes"],
    ["Outcome", "Trusted, compliant, and verifiable business outcomes"],
    ["Agentic era", "A Trusted Execution Layer for people, applications, and AI agents with verifiable authority and evidence"],
  ];
  rows.forEach(([label, body], index) => {
    const top = 228 + index * 88;
    addLabel(slide, `proposition-${index + 1}-label`, label, 48, top, 180, { dark: true });
    addText(slide, { name: `proposition-${index + 1}-body`, text: body, left: 244, top: top - 5, width: 936, height: 66, role: "bodyBold", fontSize: 21, color: COLORS.white });
    if (index < 3) addDivider(slide, { name: `proposition-line-${index + 1}`, left: 48, top: top + 68, width: 1132, height: 1, color: "#5B3BC9" });
  });
  addTakeaway(slide, "Use this language internally. External adaptation requires approved claims and current product evidence.", { dark: true });
}

function addClosing(slide) {
  addLabel(slide, "closing-kicker", "The position we carry forward", 48, 124, 600, { dark: true });
  addText(slide, { name: "closing-1", text: "Circularo orchestrates trust.", left: 48, top: 196, width: 1080, height: 68, role: "sectionTitle", fontSize: 36, color: COLORS.white });
  addText(slide, { name: "closing-2", text: "Trusted Execution is the outcome.", left: 48, top: 290, width: 1080, height: 68, role: "sectionTitle", fontSize: 36, color: COLORS.white });
  addText(slide, { name: "closing-3", text: "Agentic Trusted Execution is the next frontier.", left: 48, top: 384, width: 1080, height: 68, role: "sectionTitle", fontSize: 36, color: "#C9AEFF" });
  addDivider(slide, { name: "closing-rule", left: 48, top: 500, width: 1132, height: 1, color: "#6E51DA" });
  addLabel(slide, "closing-guardrail-label", "Internal alignment rule", 48, 536, 250, { dark: true });
  addText(slide, { name: "closing-guardrail", text: "Separate current capability, work in development, and strategic direction before external use.", left: 324, top: 530, width: 856, height: 58, role: "bodyBold", fontSize: 21.5, color: COLORS.white });
}

async function main() {
  await fs.mkdir(BUILD, { recursive: true });
  const presentation = Presentation.create({ slideSize: CANVAS });
  const specs = [
    { dark: true, build: addCover },
    { build: addCompanyView },
    { dark: true, build: addEvolution },
    { build: addFocusAreas },
    { dark: true, build: addMarketPosition },
    { build: addDistinction },
    { dark: true, eyebrow: "The Circularo Trust Orchestration Platform", build: addPlatformChapter },
    { eyebrow: "The Circularo Trust Orchestration Platform", build: addContentCollaboration },
    { dark: true, eyebrow: "The Circularo Trust Orchestration Platform", build: addIdentityAuthority },
    { eyebrow: "The Circularo Trust Orchestration Platform", build: addWorkflowApproval },
    { dark: true, eyebrow: "The Circularo Trust Orchestration Platform", build: addTrustServices },
    { eyebrow: "The Circularo Trust Orchestration Platform", build: addEvidenceRecords },
    { dark: true, eyebrow: "The Circularo Trust Orchestration Platform", build: addProgrammableTrust },
    { eyebrow: "The Circularo Trust Orchestration Platform", build: addConnectedPlatform },
    { dark: true, eyebrow: "Circularo delivery models", build: addDeliveryChapter },
    { eyebrow: "Circularo delivery models", build: addModelOverview },
    { eyebrow: "Circularo delivery models", build: (slide) => addDeliveryModelSlide(slide, { name: "Circularo SaaS", descriptor: "Managed enterprise digital trust", description: "A managed cloud platform for organizations that want to simplify trusted digital work without operating the underlying infrastructure.", who: "Enterprises and institutions seeking a managed service", control: "Circularo operates the platform environment", role: "Fast adoption of the common Trust Orchestration Platform" }) },
    { dark: true, eyebrow: "Circularo delivery models", build: (slide) => addDeliveryModelSlide(slide, { name: "Circularo Sovereign", descriptor: "Customer-controlled trusted execution infrastructure", description: "A self-hosted platform for organizations requiring stronger control over infrastructure, data, governance, and trusted digital processes.", who: "Governments, regulated organizations, and large enterprises", control: "Customer-controlled or dedicated infrastructure", role: "Apply the common trust model under stronger sovereignty requirements", dark: true }) },
    { eyebrow: "Circularo delivery models", build: (slide) => addDeliveryModelSlide(slide, { name: "Sovereign Trust Shared Services", descriptor: "Digital trust as shared infrastructure", description: "A platform foundation for reusable trust capabilities across ministries, agencies, public services, or wider organizational ecosystems.", who: "Governments, national ecosystems, and shared-service operators", control: "A governed common platform operated centrally", role: "Extend consistent trust services across multiple institutions" }) },
    { dark: true, eyebrow: "Circularo experience", build: addProofChapter },
    { eyebrow: "Circularo experience", build: addGovernmentProof },
    { dark: true, eyebrow: "Circularo experience", build: addEnterpriseTrust },
    { eyebrow: "Agentic trusted execution", build: addAgenticShift },
    { dark: true, eyebrow: "Agentic trusted execution", build: addAuthorityQuestions },
    { eyebrow: "Agentic trusted execution", build: addExecutionBoundary },
    { dark: true, eyebrow: "Circularo positioning", build: addProposition },
    { dark: true, eyebrow: "Circularo positioning", build: addClosing },
  ];

  for (let index = 0; index < specs.length; index += 1) {
    const spec = specs[index];
    const slide = await baseSlide(presentation, index + 1, { dark: spec.dark, eyebrow: spec.eyebrow });
    await spec.build(slide);
  }

  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    await writeBlob(path.join(BUILD, `${stem}.png`), await presentation.export({ slide, format: "png", scale: 1 }));
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(path.join(BUILD, `${stem}.layout.json`), await layout.text());
  }
  await writeBlob(path.join(BUILD, "about-circularo-internal-montage.webp"), await presentation.export({ format: "webp", montage: true, scale: 1 }));
  const inspection = await presentation.inspect({ kind: "slide,textbox,shape,image,notes,layout", maxChars: 400000 });
  await fs.writeFile(path.join(BUILD, "about-circularo-internal.inspect.ndjson"), inspection.ndjson);
  await (await PresentationFile.exportPptx(presentation)).save(DRAFT);
  await fs.chmod(DRAFT, 0o644);
  console.log(JSON.stringify({ draftPath: DRAFT, slides: presentation.slides.items.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
