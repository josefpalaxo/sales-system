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
  addText,
} from "/Users/josefneumann/Projects/ai-workspace/sales-system/.agents/skills/circularo-slides/scripts/circularo-slide-system.mjs";

const ROOT = "/Users/josefneumann/Projects/ai-workspace/sales-system";
const TASK = path.join(ROOT, "work/slides/circularo-sovereign-trust-solutions");
const BUILD = path.join(TASK, "build");
const PREVIEW = path.join(BUILD, "render");
const ICONS = path.join(TASK, "assets/icons");
const OUTPUT = path.join(TASK, "output");
const OUTPUT_PPTX = path.join(OUTPUT, "circularo-sovereign-trust-solutions.pptx");

const SOURCES = [
  "work/ideas/DECK 2 — Circularo Sovereign Trust Solutions.md",
  "work/p1/decks/02-circularo-sovereign.md",
  ".agents/skills/circularo-slides/references/brand-system.md",
];
const QUALIFICATION = "Working external narrative. Deployment patterns, integrations, AI capabilities, proof, certifications, compliance, customer references, and quantified outcomes are not asserted; relevant items are framed for architecture or pilot validation.";
const PURPLE_20 = "#E8D7FF";
const PURPLE_30 = "#C9AEFF";
const WHITE_10 = "#F4F0FF";
const DARK_2 = "#2A129B";
const DARK_3 = "#14006A";
const GREEN = "#29C79F";
const AMBER = "#F4B860";

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

async function imageBytes(filePath) {
  const bytes = await fs.readFile(filePath);
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

async function addImage(slide, fileName, position, alt) {
  slide.images.add({
    blob: await imageBytes(path.join(ICONS, fileName)),
    contentType: "image/png",
    alt,
    fit: "contain",
    position,
  });
}

function addNotes(slide, { icons = false } = {}) {
  const sources = [...SOURCES];
  if (icons) sources.push(".agents/skills/circularo-slides/assets/icons/{circularo,sovereign}/*.svg");
  slide.speakerNotes.textFrame.setText(`[Sources]\n${sources.map((source) => `- ${source}`).join("\n")}\n\n[Qualification]\n${QUALIFICATION}`);
  slide.speakerNotes.setVisible(true);
}

function addDeckMark(slide, dark) {
  addText(slide, {
    name: "deck-mark",
    text: "SOVEREIGN TRUST SOLUTIONS",
    left: 902,
    top: 31,
    width: 278,
    height: 20,
    role: "chrome",
    fontSize: 12,
    color: dark ? PURPLE_30 : COLORS.neutral500,
    alignment: "right",
  });
}

async function baseSlide(presentation, pageNumber, { dark = false, icons = false } = {}) {
  const slide = presentation.slides.add();
  slide.background.fill = dark ? COLORS.darkBlue : COLORS.white;
  await addChrome(slide, pageNumber, { dark });
  addEyebrow(slide, "Circularo Sovereign", { dark, width: 610 });
  addDeckMark(slide, dark);
  addNotes(slide, { icons });
  return slide;
}

function bottomLine(slide, text, { dark = false, top = 620 } = {}) {
  addDivider(slide, { left: MARGIN, top: top - 16, width: 760, color: dark ? "#6E51DA" : PURPLE_20 });
  addText(slide, { name: "bottom-line", text, left: MARGIN, top, width: 1120, height: 42, role: "bodyBold", fontSize: 22, color: dark ? COLORS.white : COLORS.darkBlue });
}

function pill(slide, text, left, top, width, { dark = false, active = false, fontSize = 14 } = {}) {
  addRect(slide, { name: `pill-${text}`, left, top, width, height: 42, fill: active ? COLORS.purple : dark ? DARK_2 : COLORS.softPurple, lineFill: dark ? "#6E51DA" : PURPLE_20, lineWidth: 1, radius: 12 });
  addText(slide, { name: `pill-text-${text}`, text, left: left + 10, top: top + 10, width: width - 20, height: 22, role: "chrome", fontSize, color: active || dark ? COLORS.white : COLORS.darkBlue, alignment: "center" });
}

function arrow(slide, left, top, width, { dark = false, name = "arrow" } = {}) {
  addDivider(slide, { name: `${name}-line`, left, top: top + 7, width: width - 15, height: 3, color: dark ? PURPLE_30 : COLORS.purple });
  slide.shapes.add({
    geometry: "chevron",
    name: `${name}-head`,
    position: { left: left + width - 21, top, width: 21, height: 18 },
    fill: dark ? PURPLE_30 : COLORS.purple,
    line: { style: "solid", fill: "none", width: 0 },
  });
}

function numberCard(slide, num, title, body, left, top, width, { dark = false, active = false } = {}) {
  const fill = active ? COLORS.purple : dark ? DARK_2 : COLORS.neutral50;
  const lineFill = active ? PURPLE_30 : dark ? "#6E51DA" : COLORS.neutral200;
  addRect(slide, { name: `card-${num}`, left, top, width, height: 190, fill, lineFill, lineWidth: active ? 2 : 1, radius: 12 });
  addText(slide, { name: `card-num-${num}`, text: num, left: left + 22, top: top + 20, width: 54, height: 26, role: "chrome", fontSize: 15, color: active || dark ? PURPLE_30 : COLORS.purple });
  addText(slide, { name: `card-title-${num}`, text: title, left: left + 22, top: top + 61, width: width - 44, height: 48, role: "componentTitle", fontSize: 24, color: active || dark ? COLORS.white : COLORS.darkBlue });
  addText(slide, { name: `card-body-${num}`, text: body, left: left + 22, top: top + 120, width: width - 44, height: 50, role: "body", fontSize: 20, color: active || dark ? WHITE_10 : COLORS.body });
}

async function slide1(presentation) {
  const slide = await baseSlide(presentation, 1, { dark: true });
  addRect(slide, { name: "cover-band-1", left: 946, top: 0, width: 194, height: 720, fill: "#3100B4" });
  addRect(slide, { name: "cover-band-2", left: 1140, top: 0, width: 140, height: 720, fill: COLORS.purple });
  addText(slide, { name: "cover-kicker", text: "CIRCULARO SOVEREIGN", left: MARGIN, top: 132, width: 610, height: 26, role: "chrome", fontSize: 15, color: PURPLE_30 });
  addText(slide, { name: "cover-title", text: "Modern trusted execution\nunder your control", left: MARGIN, top: 188, width: 840, height: 184, role: "hero", fontSize: 57, color: COLORS.white });
  addText(slide, { name: "cover-body", text: "Self-hosted digital trust for organizations that cannot delegate the boundary.", left: MARGIN, top: 412, width: 810, height: 78, role: "body", fontSize: 26, color: WHITE_10 });
  addRect(slide, { name: "cover-rule", left: MARGIN, top: 542, width: 630, height: 3, fill: COLORS.purple });
  addText(slide, { name: "cover-route", text: "INFRASTRUCTURE · DATA · KEYS · OPERATIONS · EVIDENCE", left: MARGIN, top: 568, width: 820, height: 28, role: "chrome", fontSize: 15, color: PURPLE_30 });
}

async function slide2(presentation) {
  const slide = await baseSlide(presentation, 2, { icons: true });
  addSlideTitle(slide, "Digital trust is becoming critical infrastructure", { width: 1160 });
  addText(slide, { name: "s2-statement", text: "Consequential work now depends on identity, authority, approval, execution, and evidence moving together.", left: 72, top: 232, width: 760, height: 108, role: "sectionTitle", fontSize: 34, color: COLORS.darkBlue });
  await addImage(slide, "shield.png", { left: 944, top: 214, width: 224, height: 224 }, "Digital trust shield");
  const items = ["PUBLIC SERVICES", "REGULATED OPERATIONS", "CRITICAL INFRASTRUCTURE", "DIGITAL ECONOMY"];
  items.forEach((item, index) => pill(slide, item, 48 + index * 296, 492, 272, { active: index === 2 }));
  bottomLine(slide, "When the trust layer fails, the process does not merely slow down—it loses legitimacy.", { top: 610 });
}

async function slide3(presentation) {
  const slide = await baseSlide(presentation, 3, { dark: true, icons: true });
  addSlideTitle(slide, "AI expands the sovereignty requirement", { dark: true, width: 1160 });
  addText(slide, { name: "s3-sub", text: "More actors can now interpret, decide, and initiate work inside institutional systems.", left: MARGIN, top: 204, width: 1040, height: 48, role: "body", fontSize: 24, color: WHITE_10 });
  const actors = [
    ["PEOPLE", "Human intent"],
    ["APPLICATIONS", "System action"],
    ["AI AGENTS", "Delegated action"],
  ];
  for (let index = 0; index < actors.length; index += 1) {
    const [title, body] = actors[index];
    const left = 72 + index * 402;
    addRect(slide, { name: `s3-panel-${index}`, left, top: 286, width: 354, height: 196, fill: index === 2 ? COLORS.purple : DARK_2, lineFill: index === 2 ? PURPLE_30 : "#6E51DA", lineWidth: index === 2 ? 2 : 1, radius: 12 });
    if (index === 2) await addImage(slide, "sovereign-ai.png", { left: left + 132, top: 306, width: 90, height: 90 }, "AI agent");
    addText(slide, { name: `s3-title-${index}`, text: title, left: left + 22, top: index === 2 ? 408 : 340, width: 310, height: 28, role: "chrome", fontSize: 15, color: PURPLE_30, alignment: "center" });
    addText(slide, { name: `s3-body-${index}`, text: body, left: left + 22, top: index === 2 ? 444 : 390, width: 310, height: 36, role: "componentTitle", fontSize: 24, color: COLORS.white, alignment: "center" });
  }
  bottomLine(slide, "Sovereignty must govern every actor that can create a consequential outcome.", { dark: true, top: 592 });
}

async function slide4(presentation) {
  const slide = await baseSlide(presentation, 4);
  addSlideTitle(slide, "Sovereignty is a complete control boundary", { width: 1160 });
  addText(slide, { name: "s4-sub", text: "Data residency answers only one part of the question.", left: MARGIN, top: 202, width: 850, height: 44, role: "body", fontSize: 24, color: COLORS.body });
  const dimensions = [
    ["01", "Infrastructure", "Where the platform runs"],
    ["02", "Data", "Where information is held"],
    ["03", "Keys", "Who controls cryptographic authority"],
    ["04", "Operations", "Who can administer and change it"],
    ["05", "Evidence", "What can be independently verified"],
  ];
  dimensions.forEach(([num, title, body], index) => {
    const left = 48 + index * 238;
    addRect(slide, { name: `s4-card-${num}`, left, top: 286, width: 214, height: 248, fill: index === 4 ? COLORS.darkBlue : index % 2 ? COLORS.softPurple : COLORS.neutral50, lineFill: index === 4 ? COLORS.darkBlue : COLORS.neutral200, lineWidth: 1, radius: 12 });
    addText(slide, { name: `s4-num-${num}`, text: num, left: left + 18, top: 306, width: 44, height: 22, role: "chrome", fontSize: 14, color: index === 4 ? PURPLE_30 : COLORS.purple });
    addText(slide, { name: `s4-title-${num}`, text: title, left: left + 18, top: 360, width: 178, height: 54, role: "componentTitle", fontSize: 23, color: index === 4 ? COLORS.white : COLORS.darkBlue });
    addText(slide, { name: `s4-body-${num}`, text: body, left: left + 18, top: 440, width: 178, height: 62, role: "body", fontSize: 20, color: index === 4 ? WHITE_10 : COLORS.body });
  });
  bottomLine(slide, "The boundary is sovereign only when control is explicit across all five dimensions.", { top: 612 });
}

async function slide5(presentation) {
  const slide = await baseSlide(presentation, 5, { dark: true });
  addSlideTitle(slide, "The traditional trade-off is no longer enough", { dark: true, width: 1160 });
  const columns = [
    ["MODERN PUBLIC SAAS", "Fast innovation\nManaged operations\nElastic consumption", "Control may sit outside the required boundary"],
    ["TRADITIONAL ON-PREM", "Local custody\nDirect administration\nExisting infrastructure", "Capability and lifecycle can become legacy"],
  ];
  columns.forEach(([title, benefits, limit], index) => {
    const left = 72 + index * 590;
    addRect(slide, { name: `s5-column-${index}`, left, top: 242, width: 546, height: 312, fill: DARK_2, lineFill: "#6E51DA", lineWidth: 1, radius: 12 });
    addText(slide, { name: `s5-title-${index}`, text: title, left: left + 30, top: 270, width: 486, height: 28, role: "chrome", fontSize: 15, color: PURPLE_30 });
    addText(slide, { name: `s5-benefits-${index}`, text: benefits, left: left + 30, top: 328, width: 486, height: 108, role: "componentTitle", fontSize: 26, color: COLORS.white });
    addDivider(slide, { name: `s5-rule-${index}`, left: left + 30, top: 456, width: 200, color: COLORS.purple });
    addText(slide, { name: `s5-limit-${index}`, text: limit, left: left + 30, top: 478, width: 470, height: 50, role: "body", fontSize: 20, color: WHITE_10 });
  });
  bottomLine(slide, "The required outcome is modern capability with sovereign control.", { dark: true, top: 612 });
}

async function slide6(presentation) {
  const slide = await baseSlide(presentation, 6, { icons: true });
  addSlideTitle(slide, "Local systems can still fragment accountability", { width: 1160 });
  const nodes = [
    ["Identity", "sovereign-kyc.png"], ["Workflow", "sovereign-collab.png"], ["Signature", "sovereign-sign.png"], ["Archive", "sovereign-vault.png"],
  ];
  for (let index = 0; index < nodes.length; index += 1) {
    const [title, icon] = nodes[index];
    const left = 48 + index * 296;
    addRect(slide, { name: `s6-node-${index}`, left, top: 254, width: 272, height: 202, fill: COLORS.neutral50, lineFill: COLORS.neutral200, lineWidth: 1, radius: 12 });
    await addImage(slide, icon, { left: left + 88, top: 280, width: 96, height: 96 }, title);
    addText(slide, { name: `s6-title-${index}`, text: title, left: left + 20, top: 396, width: 232, height: 32, role: "componentTitle", fontSize: 24, color: COLORS.darkBlue, alignment: "center" });
  }
  addText(slide, { name: "s6-gaps", text: "Separate identity · Separate policy · Separate audit · Separate lifecycle", left: 120, top: 508, width: 1040, height: 48, role: "sectionTitle", fontSize: 28, color: COLORS.purple, alignment: "center" });
  bottomLine(slide, "Local custody is not the same as a coherent trust operating model.", { top: 620 });
}

async function slide7(presentation) {
  const slide = await baseSlide(presentation, 7, { dark: true, icons: true });
  addSlideTitle(slide, "The ideal state: modern capability inside the sovereign boundary", { dark: true, width: 1160 });
  addRect(slide, { name: "s7-boundary", left: 92, top: 234, width: 1096, height: 350, fill: DARK_3, lineFill: PURPLE_30, lineWidth: 3, radius: 12 });
  addText(slide, { name: "s7-boundary-label", text: "CUSTOMER-DEFINED SOVEREIGN BOUNDARY", left: 124, top: 254, width: 1032, height: 24, role: "chrome", fontSize: 15, color: PURPLE_30, alignment: "center" });
  const controls = [
    ["Infrastructure", "sovereign-cloud.png"], ["Trust services", "shield.png"], ["Trusted records", "database.png"],
  ];
  for (let index = 0; index < controls.length; index += 1) {
    const [title, icon] = controls[index];
    const left = 154 + index * 334;
    addRect(slide, { name: `s7-panel-${index}`, left, top: 314, width: 302, height: 204, fill: index === 1 ? COLORS.purple : DARK_2, lineFill: index === 1 ? PURPLE_30 : "#6E51DA", lineWidth: index === 1 ? 2 : 1, radius: 12 });
    await addImage(slide, icon, { left: left + 105, top: 334, width: 92, height: 92 }, title);
    addText(slide, { name: `s7-title-${index}`, text: title, left: left + 22, top: 452, width: 258, height: 34, role: "componentTitle", fontSize: 24, color: COLORS.white, alignment: "center" });
  }
  bottomLine(slide, "The organization retains the boundary without surrendering a modern platform model.", { dark: true, top: 622 });
}

async function slide8(presentation) {
  const slide = await baseSlide(presentation, 8, { icons: true });
  addSlideTitle(slide, "Circularo Sovereign provides a customer-controlled Trusted Execution Layer", { width: 1180 });
  const actors = ["PEOPLE", "ORGANIZATIONS", "APPLICATIONS", "AI AGENTS"];
  actors.forEach((actor, index) => pill(slide, actor, 84 + index * 288, 224, 248, { active: index === 3 }));
  addRect(slide, { name: "s8-layer", left: 92, top: 318, width: 1096, height: 148, fill: COLORS.purple, lineFill: PURPLE_20, lineWidth: 2, radius: 12 });
  addText(slide, { name: "s8-kicker", text: "CIRCULARO SOVEREIGN", left: 132, top: 347, width: 1016, height: 24, role: "chrome", fontSize: 15, color: WHITE_10, alignment: "center" });
  addText(slide, { name: "s8-title", text: "Trusted Execution Layer", left: 132, top: 389, width: 1016, height: 44, role: "sectionTitle", fontSize: 36, color: COLORS.white, alignment: "center" });
  const controls = ["IDENTITY", "AUTHORITY", "POLICY", "APPROVAL", "TRUST", "EVIDENCE"];
  controls.forEach((control, index) => pill(slide, control, 74 + index * 192, 510, 176));
  bottomLine(slide, "Institutional control stays attached to actual execution.", { top: 618 });
}

async function slide9(presentation) {
  const slide = await baseSlide(presentation, 9, { icons: true });
  addSlideTitle(slide, "One platform connects the full trust lifecycle", { width: 1160 });
  const columns = [
    ["WORKFLOW", "Create · Collaborate\nApprove · Automate", "sovereign-collab.png"],
    ["TRUST SERVICES", "Identity · Authority\nSign · Seal · Verify", "sovereign-sign.png"],
    ["EVIDENCE", "Audit · Preserve\nRetrieve · Prove", "sovereign-vault.png"],
    ["GOVERNED ACCESS", "Portals · Systems\nAPIs · AI agents", "sovereign-integrations.png"],
  ];
  for (let index = 0; index < columns.length; index += 1) {
    const [label, body, icon] = columns[index];
    const left = 48 + index * 296;
    addRect(slide, { name: `s9-card-${index}`, left, top: 240, width: 272, height: 326, fill: index === 1 ? COLORS.softPurple : COLORS.neutral50, lineFill: index === 1 ? PURPLE_20 : COLORS.neutral200, lineWidth: index === 1 ? 2 : 1, radius: 12 });
    await addImage(slide, icon, { left: left + 86, top: 270, width: 100, height: 100 }, label);
    addText(slide, { name: `s9-label-${index}`, text: label, left: left + 18, top: 402, width: 236, height: 24, role: "chrome", fontSize: 14, color: COLORS.purple, alignment: "center" });
    addText(slide, { name: `s9-body-${index}`, text: body, left: left + 22, top: 450, width: 228, height: 82, role: "bodyBold", fontSize: 21, color: COLORS.darkBlue, alignment: "center" });
  }
  bottomLine(slide, "One governance model. One continuous evidence chain.", { top: 620 });
}

async function slide10(presentation) {
  const slide = await baseSlide(presentation, 10, { dark: true, icons: true });
  addSlideTitle(slide, "Deploy to the boundary the organization defines", { dark: true, width: 1160 });
  const options = [
    ["01", "Customer data centre", "Direct infrastructure control"],
    ["02", "Government cloud", "Public-sector control plane"],
    ["03", "Sovereign or private cloud", "Dedicated jurisdictional boundary"],
    ["04", "Controlled cloud environment", "Governed hosting pattern"],
  ];
  options.forEach(([num, title, body], index) => numberCard(slide, num, title, body, 48 + index * 296, 260, 272, { dark: true, active: index === 2 }));
  addRect(slide, { name: "s10-validation", left: 164, top: 500, width: 952, height: 76, fill: DARK_3, lineFill: "#6E51DA", lineWidth: 1, radius: 12 });
  addText(slide, { name: "s10-validation-text", text: "ARCHITECTURE DECISION: validate platform fit, lifecycle, operations, recovery, and support for the selected pattern.", left: 194, top: 524, width: 892, height: 30, role: "bodyBold", fontSize: 20, color: COLORS.white, alignment: "center" });
  bottomLine(slide, "The deployment pattern follows the sovereignty requirement—not the reverse.", { dark: true, top: 622 });
}

async function slide11(presentation) {
  const slide = await baseSlide(presentation, 11, { icons: true });
  addSlideTitle(slide, "Connect the trust infrastructure already inside that boundary", { width: 1160 });
  addRect(slide, { name: "s11-core", left: 442, top: 286, width: 396, height: 206, fill: COLORS.purple, lineFill: PURPLE_20, lineWidth: 2, radius: 12 });
  await addImage(slide, "sovereign-integrations.png", { left: 584, top: 302, width: 112, height: 112 }, "Sovereign integrations");
  addText(slide, { name: "s11-core-title", text: "CIRCULARO SOVEREIGN", left: 472, top: 436, width: 336, height: 26, role: "chrome", fontSize: 15, color: COLORS.white, alignment: "center" });
  const integrations = [
    ["National identity", 58, 250], ["Enterprise IAM", 58, 462], ["PKI / CA", 1010, 250], ["HSM", 1010, 462], ["TSA", 302, 548], ["Trust service provider", 766, 548],
  ];
  integrations.forEach(([label, left, top], index) => {
    addRect(slide, { name: `s11-node-${index}`, left, top, width: index > 3 ? 212 : 212, height: 78, fill: COLORS.neutral50, lineFill: COLORS.neutral200, lineWidth: 1, radius: 12 });
    addText(slide, { name: `s11-label-${index}`, text: label, left: left + 16, top: top + 25, width: 180, height: 30, role: "componentTitle", fontSize: 20, color: COLORS.darkBlue, alignment: "center" });
  });
  arrow(slide, 282, 282, 140, { name: "s11-a0" });
  arrow(slide, 282, 494, 140, { name: "s11-a1" });
  arrow(slide, 858, 282, 132, { name: "s11-a2" });
  arrow(slide, 858, 494, 132, { name: "s11-a3" });
  addText(slide, { name: "s11-qual", text: "Integration endpoints are design inputs to validate during architecture discovery.", left: 304, top: 222, width: 672, height: 34, role: "bodyBold", fontSize: 20, color: COLORS.purple, alignment: "center" });
}

async function slide12(presentation) {
  const slide = await baseSlide(presentation, 12, { dark: true, icons: true });
  addSlideTitle(slide, "Sovereign AI keeps context and execution within governed limits", { dark: true, width: 1160 });
  const stages = [
    ["CONTEXT", "What the agent may see"],
    ["AUTHORITY", "What the agent may represent"],
    ["POLICY", "What the agent may do"],
    ["EXECUTION", "What actually happens"],
    ["EVIDENCE", "What remains provable"],
  ];
  stages.forEach(([title, body], index) => {
    const left = 48 + index * 238;
    addRect(slide, { name: `s12-stage-${index}`, left, top: 286, width: 214, height: 224, fill: index === 3 ? COLORS.purple : DARK_2, lineFill: index === 3 ? PURPLE_30 : "#6E51DA", lineWidth: index === 3 ? 2 : 1, radius: 12 });
    addText(slide, { name: `s12-num-${index}`, text: String(index + 1).padStart(2, "0"), left: left + 18, top: 308, width: 44, height: 22, role: "chrome", fontSize: 14, color: PURPLE_30 });
    addText(slide, { name: `s12-title-${index}`, text: title, left: left + 18, top: 360, width: 178, height: 26, role: "chrome", fontSize: 14, color: index === 3 ? COLORS.white : PURPLE_30 });
    addText(slide, { name: `s12-body-${index}`, text: body, left: left + 18, top: 420, width: 178, height: 62, role: "componentTitle", fontSize: 21, color: COLORS.white });
  });
  addText(slide, { name: "s12-direction", text: "ARCHITECTURE DIRECTION — current capability and integration scope must be validated for the selected use case.", left: 158, top: 558, width: 964, height: 40, role: "bodyBold", fontSize: 20, color: WHITE_10, alignment: "center" });
  bottomLine(slide, "The goal is not merely sovereign inference. It is sovereign execution.", { dark: true, top: 626 });
}

async function slide13(presentation) {
  const slide = await baseSlide(presentation, 13);
  addSlideTitle(slide, "Sovereignty requires a clear operating model", { width: 1160 });
  const rows = ["Infrastructure & data", "Keys & security", "Upgrades & lifecycle", "Operations & support", "Recovery & continuity"];
  const columns = ["CUSTOMER", "CIRCULARO / PARTNER", "JOINT GOVERNANCE"];
  addRect(slide, { name: "s13-table", left: 48, top: 244, width: 1184, height: 344, fill: COLORS.neutral50, lineFill: COLORS.neutral200, lineWidth: 1, radius: 12 });
  columns.forEach((column, index) => addText(slide, { name: `s13-col-${index}`, text: column, left: 390 + index * 266, top: 270, width: 236, height: 24, role: "chrome", fontSize: 14, color: COLORS.purple, alignment: "center" }));
  rows.forEach((row, rowIndex) => {
    const top = 320 + rowIndex * 50;
    addDivider(slide, { name: `s13-rule-${rowIndex}`, left: 72, top: top - 10, width: 1136, color: COLORS.neutral200 });
    addText(slide, { name: `s13-row-${rowIndex}`, text: row, left: 76, top, width: 274, height: 30, role: "bodyBold", fontSize: 20, color: COLORS.darkBlue });
    const ownership = [rowIndex < 2 ? "PRIMARY" : "DEFINED", rowIndex > 1 ? "PRIMARY" : "DEFINED", "AGREED"];
    ownership.forEach((value, colIndex) => pill(slide, value, 430 + colIndex * 266, top - 5, 156, { active: value === "PRIMARY", fontSize: 13 }));
  });
  bottomLine(slide, "Control without accountable operations is not a sustainable sovereignty model.", { top: 620 });
}

async function slide14(presentation) {
  const slide = await baseSlide(presentation, 14, { dark: true });
  addSlideTitle(slide, "Prove the model in one consequential sovereign workflow", { dark: true, width: 1160 });
  const steps = [
    ["01", "BOUNDARY", "Define actors, data, keys, operations"],
    ["02", "ARCHITECTURE", "Select pattern and integration points"],
    ["03", "PILOT", "Execute one real governed workflow"],
    ["04", "EVIDENCE", "Verify controls, records, and recovery"],
    ["05", "DECISION", "Approve expansion or close gaps"],
  ];
  steps.forEach(([num, title, body], index) => {
    const left = 48 + index * 238;
    addText(slide, { name: `s14-num-${index}`, text: num, left, top: 270, width: 64, height: 30, role: "sectionTitle", fontSize: 25, color: index === 2 ? COLORS.purple : PURPLE_30 });
    addText(slide, { name: `s14-title-${index}`, text: title, left, top: 330, width: 214, height: 24, role: "chrome", fontSize: 14, color: COLORS.white });
    addText(slide, { name: `s14-body-${index}`, text: body, left, top: 388, width: 204, height: 92, role: "componentTitle", fontSize: 22, color: WHITE_10 });
    if (index < 4) arrow(slide, left + 164, 298, 66, { dark: true, name: `s14-arrow-${index}` });
  });
  addRect(slide, { name: "s14-proof", left: 126, top: 526, width: 1028, height: 70, fill: COLORS.purple, radius: 12 });
  addText(slide, { name: "s14-proof-text", text: "PILOT OUTPUT: architecture fit · operating model · control evidence · recovery evidence · expansion decision", left: 150, top: 549, width: 980, height: 28, role: "bodyBold", fontSize: 20, color: COLORS.white, alignment: "center" });
}

async function slide15(presentation) {
  const slide = await baseSlide(presentation, 15, { dark: true });
  addText(slide, { name: "s15-kicker", text: "THE NEXT DECISION", left: MARGIN, top: 124, width: 650, height: 26, role: "chrome", fontSize: 15, color: PURPLE_30 });
  addText(slide, { name: "s15-title", text: "Define the boundary.\nProve the execution.", left: MARGIN, top: 184, width: 940, height: 150, role: "hero", fontSize: 56, color: COLORS.white });
  addText(slide, { name: "s15-body", text: "Start with one workflow where sovereignty, trust, and operational accountability materially change the outcome.", left: MARGIN, top: 382, width: 960, height: 76, role: "body", fontSize: 26, color: WHITE_10 });
  const route = ["DISCOVERY", "ARCHITECTURE", "OPERATING MODEL", "PILOT", "EXPANSION"];
  route.forEach((item, index) => pill(slide, item, 48 + index * 238, 526, 214, { dark: true, active: index === 3, fontSize: 13 }));
  addText(slide, { name: "s15-close", text: "CIRCULARO SOVEREIGN", left: MARGIN, top: 624, width: 500, height: 24, role: "chrome", fontSize: 15, color: PURPLE_30 });
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
    await writeBlob(path.join(PREVIEW, `${stem}.png`), await presentation.export({ slide, format: "png", scale: 1 }));
    const layout = await slide.export({ format: "layout" });
    const layoutText = await layout.text();
    await fs.writeFile(path.join(PREVIEW, `${stem}.layout.json`), layoutText);
    layouts.push({ slide: index + 1, layout: JSON.parse(layoutText) });
  }
  await fs.writeFile(path.join(BUILD, "layout-inspect.ndjson"), layouts.map((item) => JSON.stringify(item)).join("\n") + "\n");
  await writeBlob(path.join(BUILD, "circularo-sovereign-trust-solutions-artifact-montage.webp"), await presentation.export({ format: "webp", montage: true, scale: 1 }));
  const snapshot = await presentation.inspect({ kind: "slide,textbox,shape,image,notes", maxChars: 220000 });
  await fs.writeFile(path.join(BUILD, "circularo-sovereign-trust-solutions.inspect.ndjson"), snapshot.ndjson);
  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(OUTPUT_PPTX);
  console.log(JSON.stringify({ output: OUTPUT_PPTX, slides: builders.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
