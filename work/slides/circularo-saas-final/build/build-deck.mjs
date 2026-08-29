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
const TASK = path.join(ROOT, "work/slides/circularo-saas-final");
const BUILD = path.join(TASK, "build");
const PREVIEW = path.join(BUILD, "render");
const ICONS = path.join(TASK, "assets/icons");
const OUTPUT = path.join(ROOT, "work/slides/p1-final-decks/output");
const OUTPUT_PPTX = path.join(OUTPUT, "circularo-saas.pptx");
const SOURCES = [
  "work/ideas/DECK 1 — Circularo SaaS.md",
  "work/p1/decks/01-circularo-saas.md",
  ".agents/skills/circularo-slides/references/brand-system.md",
];

const WHITE_10 = "#F4F0FF";
const PURPLE_20 = "#E8D7FF";
const PURPLE_30 = "#C9AEFF";
const BLUE_BLACK = "#12005D";
const GREEN = "#12B76A";
const AMBER = "#F79009";

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

async function imageBytes(filePath) {
  const source = await fs.readFile(filePath);
  return source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength);
}

async function addImage(slide, filePath, position, alt) {
  slide.images.add({
    blob: await imageBytes(filePath),
    contentType: "image/png",
    alt,
    fit: "contain",
    position,
  });
}

function addArrow(slide, left, top, width, { dark = false, name = "arrow" } = {}) {
  addDivider(slide, { name: `${name}-line`, left, top: top + 7, width: width - 14, height: 3, color: dark ? PURPLE_30 : COLORS.purple });
  const head = slide.shapes.add({
    geometry: "chevron",
    name: `${name}-head`,
    position: { left: left + width - 20, top, width: 20, height: 18 },
    fill: dark ? PURPLE_30 : COLORS.purple,
    line: { style: "solid", fill: "none", width: 0 },
  });
  return head;
}

function addTopMark(slide, dark) {
  addText(slide, {
    name: "deck-mark",
    text: "ENTERPRISE SALES NARRATIVE",
    left: 936,
    top: 31,
    width: 244,
    height: 22,
    role: "chrome",
    fontSize: 12,
    color: dark ? PURPLE_30 : COLORS.neutral500,
    alignment: "right",
  });
}

async function baseSlide(presentation, pageNumber, { dark = false, iconSources = false } = {}) {
  const slide = presentation.slides.add();
  slide.background.fill = dark ? COLORS.darkBlue : COLORS.white;
  await addChrome(slide, pageNumber, { dark });
  addEyebrow(slide, "Circularo SaaS", { dark, width: 700 });
  addTopMark(slide, dark);
  addSources(slide, iconSources ? [...SOURCES, ".agents/skills/circularo-slides/assets/icons/sovereign/*.svg"] : SOURCES);
  return slide;
}

function bottomMessage(slide, text, { dark = false, top = 620 } = {}) {
  addDivider(slide, { left: MARGIN, top: top - 15, width: 760, color: dark ? "#6E51DA" : PURPLE_20 });
  addText(slide, {
    name: "bottom-message",
    text,
    left: MARGIN,
    top,
    width: 1080,
    height: 42,
    role: "bodyBold",
    fontSize: 20,
    color: dark ? COLORS.white : COLORS.darkBlue,
  });
}

function smallPill(slide, text, left, top, width, { dark = false, fill } = {}) {
  addRect(slide, {
    name: `pill-${text}`,
    left,
    top,
    width,
    height: 38,
    fill: fill ?? (dark ? "#3215A7" : COLORS.softPurple),
    lineFill: dark ? "#6E51DA" : PURPLE_20,
    lineWidth: 1,
    radius: 12,
  });
  addText(slide, {
    name: `pill-text-${text}`,
    text,
    left: left + 10,
    top: top + 8,
    width: width - 20,
    height: 22,
    role: "chrome",
    fontSize: 14,
    color: dark ? COLORS.white : COLORS.darkBlue,
    alignment: "center",
  });
}

function compactTitle(slide, text, { dark = false, fontSize = 42, height = 88 } = {}) {
  addText(slide, {
    name: "slide-title",
    text,
    left: MARGIN,
    top: 96,
    width: 1160,
    height,
    role: "slideTitle",
    fontSize,
    color: dark ? COLORS.white : COLORS.darkBlue,
  });
}

async function slide1(presentation) {
  const slide = await baseSlide(presentation, 1, { dark: true });
  addRect(slide, { name: "cover-glow", left: 930, top: 0, width: 350, height: 720, fill: "#2600A7" });
  addRect(slide, { name: "cover-accent", left: 1156, top: 0, width: 124, height: 720, fill: COLORS.purple });
  addText(slide, { name: "cover-title", text: "Circularo SaaS", left: MARGIN, top: 144, width: 820, height: 98, role: "hero", fontSize: 64, color: COLORS.white });
  addText(slide, { name: "cover-subtitle", text: "Enterprise digital trust for modern organizations", left: MARGIN, top: 266, width: 820, height: 74, role: "sectionTitle", fontSize: 31, color: PURPLE_30 });
  addText(slide, { name: "cover-message", text: "One managed environment for trusted digital work", left: MARGIN, top: 374, width: 800, height: 92, role: "componentTitle", fontSize: 28, bold: false, color: WHITE_10 });
  const labels = ["WORK", "AUTHORITY", "EVIDENCE", "AI-READY ACTION"];
  labels.forEach((label, index) => smallPill(slide, label, 48 + index * 190, 540, index === 3 ? 178 : 160, { dark: true }));
}

async function slide2(presentation) {
  const slide = await baseSlide(presentation, 2, { iconSources: true });
  addSlideTitle(slide, "Digital work now combines more than signing", { width: 1160 });
  addText(slide, { name: "s2-subtitle", text: "The trusted process spans content, people, systems, evidence, and increasingly AI.", left: MARGIN, top: 205, width: 1040, height: 48, role: "body", color: COLORS.body });
  const items = [
    ["Content", "Documents and records", "sovereign-cloud.png"],
    ["Collaboration", "Review and decisions", "sovereign-collab.png"],
    ["Approval", "Authority and policy", "sovereign-kyc.png"],
    ["Identity", "Actors and assurance", "sovereign-kyc.png"],
    ["Signatures", "Personal and organizational", "sovereign-sign.png"],
    ["Automation", "Workflows and APIs", "sovereign-integrations.png"],
    ["Evidence", "Audit and verification", "sovereign-vault.png"],
    ["AI", "Knowledge and governed action", "sovereign-ai.png"],
  ];
  const gap = 16;
  const cardW = (1184 - gap * 3) / 4;
  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    const col = index % 4;
    const row = Math.floor(index / 4);
    const left = MARGIN + col * (cardW + gap);
    const top = 276 + row * 150;
    addRect(slide, { name: `s2-card-${index}`, left, top, width: cardW, height: 128, fill: index === 7 ? COLORS.softPurple : COLORS.neutral50, lineFill: index === 7 ? PURPLE_20 : COLORS.neutral200, lineWidth: 1, radius: 12 });
    await addImage(slide, path.join(ICONS, item[2]), { left: left + 16, top: top + 20, width: 54, height: 54 }, item[0]);
    addText(slide, { name: `s2-title-${index}`, text: item[0], left: left + 82, top: top + 22, width: cardW - 98, height: 32, role: "componentTitle", fontSize: 22, color: COLORS.darkBlue });
    addText(slide, { name: `s2-body-${index}`, text: item[1], left: left + 82, top: top + 62, width: cardW - 98, height: 50, role: "small", fontSize: 16, color: COLORS.body });
  }
  bottomMessage(slide, "The business problem is the full execution lifecycle—not the final signature alone.", { top: 612 });
}

async function slide3(presentation) {
  const slide = await baseSlide(presentation, 3);
  compactTitle(slide, "Trust must extend beyond the signature", { fontSize: 43 });
  addText(slide, { name: "s3-subtitle", text: "A signature records one event. Enterprise accountability must answer the surrounding questions.", left: MARGIN, top: 190, width: 1050, height: 46, role: "body" });
  addRect(slide, { name: "s3-core", left: 492, top: 304, width: 296, height: 104, fill: COLORS.darkBlue, radius: 12 });
  addText(slide, { name: "s3-core-text", text: "THE DOCUMENT\nWAS SIGNED", left: 516, top: 327, width: 248, height: 58, role: "componentTitle", fontSize: 23, color: COLORS.white, alignment: "center" });
  const qs = [
    ["WHO", "Who or what acted?", 48, 258], ["AUTHORITY", "Were they authorized?", 48, 408],
    ["VERSION", "Which version executed?", 870, 258], ["APPROVAL", "What was approved?", 870, 408],
    ["ASSURANCE", "Which controls applied?", 286, 528], ["EVIDENCE", "Can the execution be verified?", 660, 528],
  ];
  qs.forEach(([label, body, left, top], index) => {
    addRect(slide, { name: `s3-q-${index}`, left, top, width: index >= 4 ? 334 : 362, height: 96, fill: COLORS.neutral50, lineFill: COLORS.neutral200, lineWidth: 1, radius: 12 });
    addText(slide, { name: `s3-label-${index}`, text: label, left: left + 20, top: top + 16, width: 150, height: 20, role: "chrome", color: COLORS.purple });
    addText(slide, { name: `s3-body-${index}`, text: body, left: left + 20, top: top + 48, width: index >= 4 ? 294 : 322, height: 34, role: "componentTitle", fontSize: 20, color: COLORS.darkBlue });
  });
}

async function slide4(presentation) {
  const slide = await baseSlide(presentation, 4, { dark: true, iconSources: true });
  addSlideTitle(slide, "AI adds machine actions to the trust boundary", { dark: true, width: 1160 });
  addText(slide, { name: "s4-subtitle", text: "Capability can propose an action. The organization still determines what may execute.", left: MARGIN, top: 205, width: 1060, height: 48, role: "body", color: WHITE_10 });
  const stages = [
    ["UNDERSTAND", "Read context", "sovereign-ai.png"],
    ["PREPARE", "Draft or recommend", "sovereign-collab.png"],
    ["TRUST GATE", "Authority · Policy · Approval", "sovereign-kyc.png"],
    ["EXECUTE", "Invoke a permitted action", "sovereign-sign.png"],
    ["EVIDENCE", "Preserve what happened", "sovereign-vault.png"],
  ];
  const cardW = 210;
  for (let index = 0; index < stages.length; index += 1) {
    const item = stages[index];
    const left = 48 + index * 238;
    const trust = index === 2;
    addRect(slide, { name: `s4-card-${index}`, left, top: 306, width: cardW, height: 218, fill: trust ? COLORS.purple : "#2A129B", lineFill: trust ? PURPLE_30 : "#6E51DA", lineWidth: trust ? 2 : 1, radius: 12 });
    await addImage(slide, path.join(ICONS, item[2]), { left: left + 72, top: 330, width: 66, height: 66 }, item[0]);
    addText(slide, { name: `s4-label-${index}`, text: item[0], left: left + 16, top: 414, width: cardW - 32, height: 24, role: "chrome", color: trust ? COLORS.white : PURPLE_30, alignment: "center" });
    addText(slide, { name: `s4-body-${index}`, text: item[1], left: left + 18, top: 454, width: cardW - 36, height: 52, role: "bodyBold", fontSize: 19, color: COLORS.white, alignment: "center" });
    if (index < stages.length - 1) addArrow(slide, left + cardW + 4, 405, 26, { dark: true, name: `s4-arrow-${index}` });
  }
  bottomMessage(slide, "Govern execution through authority, policy, approval, evidence, and audit.", { dark: true, top: 604 });
}

async function slide5(presentation) {
  const slide = await baseSlide(presentation, 5);
  compactTitle(slide, "Today's enterprise trust stack is assembled, not unified", { fontSize: 38, height: 88 });
  addText(slide, { name: "s5-subtitle", text: "Each tool solves a part. The organization must connect the lifecycle and reconstruct accountability.", left: MARGIN, top: 208, width: 1080, height: 44, role: "body" });
  const tools = ["DMS", "Workflow", "eSignature", "Identity", "Email + collaboration", "Archive", "Integrations", "AI tools"];
  tools.forEach((tool, index) => {
    const col = index % 4;
    const row = Math.floor(index / 4);
    const left = 48 + col * 240;
    const top = 286 + row * 142;
    addRect(slide, { name: `s5-tool-${index}`, left, top, width: 216, height: 106, fill: index % 2 === 0 ? COLORS.neutral50 : COLORS.softPurple, lineFill: index % 2 === 0 ? COLORS.neutral200 : PURPLE_20, lineWidth: 1, radius: 12 });
    addText(slide, { name: `s5-tool-text-${index}`, text: tool, left: left + 14, top: top + 36, width: 188, height: 34, role: "componentTitle", fontSize: 20, color: COLORS.darkBlue, alignment: "center" });
  });
  addRect(slide, { name: "s5-bracket", left: 1032, top: 286, width: 200, height: 248, fill: COLORS.darkBlue, radius: 12 });
  addText(slide, { name: "s5-bracket-label", text: "YOUR\nINTEGRATION\nBURDEN", left: 1046, top: 334, width: 172, height: 104, role: "sectionTitle", fontSize: 22, color: COLORS.white, alignment: "center" });
  addText(slide, { name: "s5-bracket-body", text: "Context · Controls · Evidence", left: 1050, top: 464, width: 164, height: 48, role: "small", fontSize: 15, color: PURPLE_30, alignment: "center" });
  bottomMessage(slide, "Fragmented systems shift lifecycle ownership back to the enterprise.", { top: 612 });
}

async function slide6(presentation) {
  const slide = await baseSlide(presentation, 6);
  addSlideTitle(slide, "Fragmentation transfers cost and risk to the organization", { width: 1160 });
  addRect(slide, { name: "s6-core", left: 452, top: 280, width: 376, height: 136, fill: COLORS.purple, radius: 12 });
  addText(slide, { name: "s6-core-text", text: "DISCONNECTED\nTRUST STACK", left: 478, top: 316, width: 324, height: 72, role: "sectionTitle", fontSize: 30, color: COLORS.white, alignment: "center" });
  const items = [
    ["Inconsistent experience", 48, 264], ["Integration burden", 48, 424],
    ["Duplicated data", 904, 264], ["Fragmented evidence", 904, 424],
    ["Governance gaps", 282, 504], ["Difficult automation", 676, 504],
  ];
  items.forEach(([text, left, top], index) => {
    addRect(slide, { name: `s6-item-${index}`, left, top, width: 328, height: 94, fill: COLORS.neutral50, lineFill: COLORS.neutral200, lineWidth: 1, radius: 12 });
    addRect(slide, { name: `s6-dot-${index}`, left: left + 18, top: top + 40, width: 10, height: 10, fill: index < 2 ? AMBER : COLORS.purple, radius: 8 });
    addText(slide, { name: `s6-text-${index}`, text, left: left + 44, top: top + 29, width: 264, height: 38, role: "componentTitle", fontSize: 21, color: COLORS.darkBlue });
  });
  bottomMessage(slide, "These are structural consequences of fragmentation; the size of the impact must be measured in each workflow.", { top: 624 });
}

async function slide7(presentation) {
  const slide = await baseSlide(presentation, 7, { iconSources: true });
  compactTitle(slide, "The ideal state is one trusted digital workspace", { fontSize: 39 });
  addText(slide, { name: "s7-subtitle", text: "One coherent experience. One governed lifecycle. One continuous evidence chain.", left: MARGIN, top: 190, width: 1040, height: 44, role: "body" });
  const stages = ["Create", "Collaborate", "Approve", "Sign or seal", "Verify", "Archive", "Retrieve"];
  const icons = ["sovereign-cloud.png", "sovereign-collab.png", "sovereign-kyc.png", "sovereign-sign.png", "sovereign-vault.png", "sovereign-vault.png", "sovereign-integrations.png"];
  addDivider(slide, { name: "s7-line", left: 92, top: 372, width: 1094, height: 4, color: PURPLE_20 });
  for (let index = 0; index < stages.length; index += 1) {
    const stage = stages[index];
    const left = 54 + index * 169;
    addRect(slide, { name: `s7-node-${index}`, left, top: 314, width: 116, height: 116, fill: index === 6 ? COLORS.purple : COLORS.softPurple, lineFill: index === 6 ? COLORS.purple : PURPLE_20, lineWidth: 2, radius: 12 });
    await addImage(slide, path.join(ICONS, icons[index]), { left: left + 28, top: 338, width: 60, height: 60 }, stage);
    addText(slide, { name: `s7-stage-${index}`, text: stage, left: left - 14, top: 458, width: 144, height: 42, role: "componentTitle", fontSize: 19, color: COLORS.darkBlue, alignment: "center" });
  }
  addRect(slide, { name: "s7-band", left: 142, top: 548, width: 996, height: 54, fill: COLORS.darkBlue, radius: 12 });
  addText(slide, { name: "s7-band-text", text: "IDENTITY · AUTHORITY · POLICY · APPROVAL · EVIDENCE · AUDIT", left: 170, top: 565, width: 940, height: 24, role: "chrome", fontSize: 15, color: COLORS.white, alignment: "center" });
}

async function slide8(presentation) {
  const slide = await baseSlide(presentation, 8, { dark: true });
  addSlideTitle(slide, "Circularo SaaS provides the managed Trusted Execution Layer", { dark: true, width: 1160 });
  const actors = ["PEOPLE", "EXTERNAL PARTIES", "APPLICATIONS", "AI AGENTS"];
  actors.forEach((actor, index) => smallPill(slide, actor, 84 + index * 288, 226, 248, { dark: true }));
  addRect(slide, { name: "s8-layer", left: 96, top: 316, width: 1088, height: 146, fill: COLORS.purple, lineFill: PURPLE_30, lineWidth: 2, radius: 12 });
  addText(slide, { name: "s8-layer-kicker", text: "CIRCULARO SAAS", left: 136, top: 344, width: 1008, height: 24, role: "chrome", color: WHITE_10, alignment: "center" });
  addText(slide, { name: "s8-layer-text", text: "Managed Trusted Execution Layer", left: 136, top: 382, width: 1008, height: 48, role: "sectionTitle", fontSize: 34, color: COLORS.white, alignment: "center" });
  const controls = ["IDENTITY", "AUTHORITY", "POLICY", "APPROVAL", "TRUST SERVICES", "EVIDENCE", "RECORDS"];
  controls.forEach((control, index) => smallPill(slide, control, 49 + index * 170, 512, 152, { dark: true, fill: "#14006A" }));
  bottomMessage(slide, "The platform connects controls around the action with the evidence that remains.", { dark: true, top: 614 });
}

async function slide9(presentation) {
  const slide = await baseSlide(presentation, 9, { iconSources: true });
  addSlideTitle(slide, "Circularo brings the platform capabilities together", { width: 1160 });
  addText(slide, { name: "s9-subtitle", text: "Connected capability groups support the full lifecycle without forcing a fragmented trust model.", left: MARGIN, top: 205, width: 1080, height: 48, role: "body" });
  const items = [
    ["Workflow + collaboration", "Create, route, review, and coordinate work.", "sovereign-collab.png"],
    ["Approvals", "Connect decisions to authority and policy.", "sovereign-kyc.png"],
    ["eSignatures + trust services", "Execute personal and organizational trust events.", "sovereign-sign.png"],
    ["Identity", "Establish actors and the required assurance context.", "sovereign-kyc.png"],
    ["Evidence + archive", "Preserve a verifiable record of the execution.", "sovereign-vault.png"],
    ["Integrations, APIs + AI", "Extend governed execution across digital channels.", "sovereign-integrations.png"],
  ];
  const gap = 18;
  const width = (1184 - gap * 2) / 3;
  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    const col = index % 3;
    const row = Math.floor(index / 3);
    const left = 48 + col * (width + gap);
    const top = 278 + row * 166;
    addRect(slide, { name: `s9-card-${index}`, left, top, width, height: 146, fill: index === 5 ? COLORS.softPurple : COLORS.neutral50, lineFill: index === 5 ? PURPLE_20 : COLORS.neutral200, lineWidth: 1, radius: 12 });
    await addImage(slide, path.join(ICONS, item[2]), { left: left + 18, top: top + 24, width: 58, height: 58 }, item[0]);
    addText(slide, { name: `s9-title-${index}`, text: item[0], left: left + 90, top: top + 20, width: width - 108, height: 52, role: "componentTitle", fontSize: 21, color: COLORS.darkBlue });
    addText(slide, { name: `s9-body-${index}`, text: item[1], left: left + 90, top: top + 78, width: width - 108, height: 54, role: "small", fontSize: 16, color: COLORS.body });
  }
  bottomMessage(slide, "Confirm the exact capability and assurance fit during solution design.", { top: 620 });
}

async function slide10(presentation) {
  const slide = await baseSlide(presentation, 10, { dark: true, iconSources: true });
  addSlideTitle(slide, "One trust layer serves people, applications, and AI agents", { dark: true, width: 1160 });
  const lanes = [
    ["PEOPLE", "Web and mobile experiences", "sovereign-collab.png"],
    ["APPLICATIONS", "Integrations, portals, and governed APIs", "sovereign-integrations.png"],
    ["AI AGENTS", "Permitted actions inside the same control model", "sovereign-ai.png"],
  ];
  for (let index = 0; index < lanes.length; index += 1) {
    const lane = lanes[index];
    const left = 48 + index * 402;
    addRect(slide, { name: `s10-lane-${index}`, left, top: 248, width: 378, height: 238, fill: index === 2 ? COLORS.purple : "#2A129B", lineFill: "#6E51DA", lineWidth: 1, radius: 12 });
    await addImage(slide, path.join(ICONS, lane[2]), { left: left + 142, top: 274, width: 94, height: 94 }, lane[0]);
    addText(slide, { name: `s10-title-${index}`, text: lane[0], left: left + 24, top: 386, width: 330, height: 26, role: "chrome", color: PURPLE_30, alignment: "center" });
    addText(slide, { name: `s10-body-${index}`, text: lane[1], left: left + 26, top: 422, width: 326, height: 56, role: "bodyBold", fontSize: 18, color: COLORS.white, alignment: "center" });
  }
  addRect(slide, { name: "s10-band", left: 110, top: 536, width: 1060, height: 62, fill: "#14006A", lineFill: "#6E51DA", lineWidth: 1, radius: 12 });
  addText(slide, { name: "s10-band-text", text: "ONE TRUST MODEL · CONSISTENT POLICY · CONTINUOUS EVIDENCE", left: 140, top: 555, width: 1000, height: 24, role: "chrome", fontSize: 16, color: COLORS.white, alignment: "center" });
}

async function slide11(presentation) {
  const slide = await baseSlide(presentation, 11);
  addSlideTitle(slide, "Circularo extends beyond transaction-level eSignatures", { width: 1160 });
  const panels = [
    { left: 48, label: "ESIGNATURE PLATFORM", title: "Complete the signature transaction", fill: COLORS.neutral50, line: COLORS.neutral200, items: ["Prepare and send", "Authenticate signer", "Capture signature", "Complete transaction"] },
    { left: 656, label: "CIRCULARO TRUSTED DIGITAL WORK", title: "Govern the complete execution lifecycle", fill: COLORS.softPurple, line: PURPLE_20, items: ["Create and collaborate", "Connect authority and approval", "Execute signature or seal", "Preserve evidence and records", "Extend through APIs and AI"] },
  ];
  panels.forEach((panel, pIndex) => {
    addRect(slide, { name: `s11-panel-${pIndex}`, left: panel.left, top: 236, width: 576, height: 366, fill: panel.fill, lineFill: panel.line, lineWidth: pIndex === 1 ? 2 : 1, radius: 12 });
    addText(slide, { name: `s11-label-${pIndex}`, text: panel.label, left: panel.left + 28, top: 264, width: 520, height: 22, role: "chrome", color: pIndex === 1 ? COLORS.purple : COLORS.neutral500 });
    addText(slide, { name: `s11-title-${pIndex}`, text: panel.title, left: panel.left + 28, top: 306, width: 510, height: 62, role: "sectionTitle", fontSize: 28, color: COLORS.darkBlue });
    panel.items.forEach((item, index) => {
      const top = 390 + index * 42;
      addRect(slide, { name: `s11-check-${pIndex}-${index}`, left: panel.left + 30, top: top + 7, width: 12, height: 12, fill: pIndex === 1 ? COLORS.purple : COLORS.neutral300, radius: 8 });
      addText(slide, { name: `s11-item-${pIndex}-${index}`, text: item, left: panel.left + 56, top, width: 474, height: 28, role: "body", fontSize: 19, color: COLORS.body });
    });
  });
  bottomMessage(slide, "The comparison is about scope: transaction completion versus lifecycle accountability.", { top: 622 });
}

async function slide12(presentation) {
  const slide = await baseSlide(presentation, 12, { iconSources: true });
  compactTitle(slide, "Managed SaaS reduces platform burden", { fontSize: 42 });
  addText(slide, { name: "s12-subtitle", text: "Adopt the trust model in phases while Circularo provides the managed platform environment.", left: MARGIN, top: 190, width: 1080, height: 44, role: "body" });
  await addImage(slide, path.join(ICONS, "sovereign-cloud.png"), { left: 80, top: 286, width: 250, height: 226 }, "Managed SaaS cloud");
  addRect(slide, { name: "s12-cloud-pill", left: 92, top: 526, width: 226, height: 48, fill: COLORS.softPurple, lineFill: PURPLE_20, lineWidth: 1, radius: 12 });
  addText(slide, { name: "s12-cloud-label", text: "MANAGED SAAS", left: 108, top: 540, width: 194, height: 22, role: "chrome", fontSize: 15, color: COLORS.purple, alignment: "center" });
  const steps = [
    ["01", "Adopt", "Launch a defined trusted workflow."],
    ["02", "Configure", "Fit process, authority, assurance, and evidence."],
    ["03", "Connect", "Integrate identities and enterprise systems."],
    ["04", "Expand", "Reuse the pattern across more workflows."],
  ];
  steps.forEach(([num, title, body], index) => {
    const top = 266 + index * 84;
    addRect(slide, { name: `s12-num-${index}`, left: 396, top, width: 54, height: 54, fill: index === 0 ? COLORS.purple : COLORS.softPurple, lineFill: PURPLE_20, lineWidth: 1, radius: 12 });
    addText(slide, { name: `s12-num-text-${index}`, text: num, left: 402, top: top + 16, width: 42, height: 22, role: "chrome", color: index === 0 ? COLORS.white : COLORS.purple, alignment: "center" });
    addText(slide, { name: `s12-title-${index}`, text: title, left: 478, top: top + 2, width: 176, height: 34, role: "componentTitle", fontSize: 23, color: COLORS.darkBlue });
    addText(slide, { name: `s12-body-${index}`, text: body, left: 654, top: top + 3, width: 516, height: 42, role: "body", fontSize: 19, color: COLORS.body });
  });
  bottomMessage(slide, "Confirm service, hosting, security, and operating boundaries for each opportunity.", { top: 622 });
}

async function slide13(presentation) {
  const slide = await baseSlide(presentation, 13);
  compactTitle(slide, "Prove value in one consequential workflow", { fontSize: 41 });
  addText(slide, { name: "s13-subtitle", text: "Define the operating problem and the proof model together—before making enterprise-scale claims.", left: MARGIN, top: 190, width: 1080, height: 44, role: "body" });
  const items = [
    ["PROCESS", "Which business action matters?"], ["ACTORS", "Who participates and represents whom?"],
    ["AUTHORITY", "What may each actor do?"], ["ASSURANCE", "Which approvals and controls apply?"],
    ["CONNECTIONS", "Which identities and systems connect?"], ["EVIDENCE", "What must remain verifiable?"],
  ];
  const width = 366;
  items.forEach(([label, body], index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const left = 48 + col * 409;
    const top = 274 + row * 154;
    addText(slide, { name: `s13-num-${index}`, text: String(index + 1).padStart(2, "0"), left, top: top + 2, width: 62, height: 28, role: "sectionTitle", fontSize: 20, color: COLORS.purple });
    addText(slide, { name: `s13-label-${index}`, text: label, left: left + 84, top, width: 254, height: 22, role: "chrome", color: COLORS.purple });
    addText(slide, { name: `s13-body-${index}`, text: body, left: left + 84, top: top + 40, width: 272, height: 58, role: "componentTitle", fontSize: 21, color: COLORS.darkBlue });
    addDivider(slide, { name: `s13-line-${index}`, left, top: top + 122, width, color: COLORS.neutral200 });
  });
  addRect(slide, { name: "s13-measure", left: 168, top: 568, width: 944, height: 56, fill: COLORS.darkBlue, radius: 12 });
  addText(slide, { name: "s13-measure-text", text: "MEASURE: CYCLE TIME · HANDOFFS · REWORK · COMPLETION · EVIDENCE QUALITY", left: 194, top: 585, width: 892, height: 24, role: "chrome", fontSize: 15, color: COLORS.white, alignment: "center" });
}

async function slide14(presentation) {
  const slide = await baseSlide(presentation, 14);
  compactTitle(slide, "Make enterprise adoption boundaries explicit", { fontSize: 39 });
  addText(slide, { name: "s14-subtitle", text: "Treat these as solution-design and validation questions—not implied assurances.", left: MARGIN, top: 190, width: 1050, height: 44, role: "body" });
  const items = [
    ["Security", "Required controls and assurance"], ["Data location", "Permitted storage and processing"],
    ["Identity", "Sources, assurance, and federation"], ["Integration", "Systems, APIs, and ownership"],
    ["Migration", "Records, history, and transition"], ["Operations", "Service responsibility and continuity"],
  ];
  const width = 373;
  items.forEach(([title, body], index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const left = 48 + col * 406;
    const top = 284 + row * 150;
    addRect(slide, { name: `s14-card-${index}`, left, top, width, height: 126, fill: COLORS.neutral50, lineFill: COLORS.neutral200, lineWidth: 1, radius: 12 });
    addRect(slide, { name: `s14-bar-${index}`, left, top, width: 8, height: 126, fill: index < 3 ? COLORS.purple : COLORS.darkBlue, radius: 8 });
    addText(slide, { name: `s14-title-${index}`, text: title, left: left + 28, top: top + 24, width: width - 50, height: 34, role: "componentTitle", fontSize: 23, color: COLORS.darkBlue });
    addText(slide, { name: `s14-body-${index}`, text: body, left: left + 28, top: top + 70, width: width - 50, height: 38, role: "body", fontSize: 18, color: COLORS.body });
  });
  addRect(slide, { name: "s14-gate", left: 298, top: 598, width: 684, height: 48, fill: COLORS.softPurple, lineFill: PURPLE_20, lineWidth: 1, radius: 12 });
  addText(slide, { name: "s14-gate-text", text: "CONFIRM BEFORE PILOT → PROVE BEFORE ROLLOUT", left: 326, top: 612, width: 628, height: 22, role: "chrome", fontSize: 15, color: COLORS.purple, alignment: "center" });
}

async function slide15(presentation) {
  const slide = await baseSlide(presentation, 15, { dark: true });
  addText(slide, { name: "s15-kicker", text: "NEXT STEP", left: MARGIN, top: 126, width: 600, height: 26, role: "chrome", color: PURPLE_30 });
  addText(slide, { name: "s15-title", text: "Identify your first\ntrusted workflow", left: MARGIN, top: 182, width: 920, height: 150, role: "hero", fontSize: 58, color: COLORS.white });
  addText(slide, { name: "s15-body", text: "Start where stronger accountability and a continuous evidence chain can create the clearest operational value.", left: MARGIN, top: 372, width: 980, height: 74, role: "body", fontSize: 24, color: WHITE_10 });
  const steps = ["Discovery", "Use case", "Solution design", "Pilot", "Rollout"];
  steps.forEach((step, index) => {
    const left = 48 + index * 233;
    addRect(slide, { name: `s15-step-${index}`, left, top: 528, width: 204, height: 70, fill: index === 0 ? COLORS.purple : "#2A129B", lineFill: "#6E51DA", lineWidth: 1, radius: 12 });
    addText(slide, { name: `s15-step-text-${index}`, text: step, left: left + 16, top: 550, width: 172, height: 28, role: "componentTitle", fontSize: 20, color: COLORS.white, alignment: "center" });
    if (index < steps.length - 1) addArrow(slide, left + 207, 553, 22, { dark: true, name: `s15-arrow-${index}` });
  });
}

async function main() {
  await fs.mkdir(PREVIEW, { recursive: true });
  await fs.mkdir(OUTPUT, { recursive: true });
  const presentation = Presentation.create({ slideSize: CANVAS });
  const builders = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8, slide9, slide10, slide11, slide12, slide13, slide14, slide15];
  for (const builder of builders) await builder(presentation);

  const layouts = [];
  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    const png = await presentation.export({ slide, format: "png", scale: 1 });
    await writeBlob(path.join(PREVIEW, `${stem}.png`), png);
    const layout = await slide.export({ format: "layout" });
    const layoutText = await layout.text();
    await fs.writeFile(path.join(PREVIEW, `${stem}.layout.json`), layoutText);
    layouts.push({ slide: index + 1, layout: JSON.parse(layoutText) });
  }
  await fs.writeFile(path.join(BUILD, "layout-inspect.ndjson"), layouts.map((item) => JSON.stringify(item)).join("\n") + "\n");

  const montage = await presentation.export({ format: "webp", montage: true, scale: 1 });
  await writeBlob(path.join(BUILD, "circularo-saas-final-artifact-montage.webp"), montage);
  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(OUTPUT_PPTX);
  console.log(JSON.stringify({ output: OUTPUT_PPTX, slides: builders.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
