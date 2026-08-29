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
const TASK = path.join(ROOT, "work/slides/about-circularo");
const BUILD = path.join(TASK, "build");
const PREVIEW = path.join(BUILD, "render");
const ICONS = path.join(TASK, "assets/icons");
const OUTPUT = path.join(TASK, "output");
const OUTPUT_PPTX = path.join(OUTPUT, "about-circularo.pptx");

const SOURCES = [
  "work/ideas/About Circularo.md",
  "work/p1/decks/00-circularo-company.md",
  "shared/knowledge/company/circularo.md",
  ".agents/skills/circularo-slides/references/brand-system.md",
];
const QUALIFICATION = "Working external narrative. Corporate proof, certifications, locations, customer references, and quantified outcomes are not asserted.";
const PURPLE_20 = "#E8D7FF";
const PURPLE_30 = "#C9AEFF";
const WHITE_10 = "#F4F0FF";
const DARK_2 = "#2A129B";
const DARK_3 = "#14006A";

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
  const sourceLines = [...SOURCES];
  if (icons) sourceLines.push(".agents/skills/circularo-slides/assets/icons/{circularo,sovereign}/*.svg");
  slide.speakerNotes.textFrame.setText(`[Sources]\n${sourceLines.map((source) => `- ${source}`).join("\n")}\n\n[Qualification]\n${QUALIFICATION}`);
  slide.speakerNotes.setVisible(true);
}

function addDeckMark(slide, dark) {
  addText(slide, {
    name: "deck-mark",
    text: "COMPANY & PLATFORM OVERVIEW",
    left: 914,
    top: 31,
    width: 266,
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
  addEyebrow(slide, "About Circularo", { dark, width: 650 });
  addDeckMark(slide, dark);
  addNotes(slide, { icons });
  return slide;
}

function bottomLine(slide, text, { dark = false, top = 620 } = {}) {
  addDivider(slide, { left: MARGIN, top: top - 16, width: 760, color: dark ? "#6E51DA" : PURPLE_20 });
  addText(slide, { name: "bottom-line", text, left: MARGIN, top, width: 1080, height: 42, role: "bodyBold", fontSize: 22, color: dark ? COLORS.white : COLORS.darkBlue });
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

function labelPill(slide, text, left, top, width, { dark = false, active = false } = {}) {
  addRect(slide, { name: `pill-${text}`, left, top, width, height: 42, fill: active ? COLORS.purple : dark ? DARK_2 : COLORS.softPurple, lineFill: dark ? "#6E51DA" : PURPLE_20, lineWidth: 1, radius: 12 });
  addText(slide, { name: `pill-text-${text}`, text, left: left + 10, top: top + 10, width: width - 20, height: 22, role: "chrome", fontSize: 14, color: active || dark ? COLORS.white : COLORS.darkBlue, alignment: "center" });
}

async function slide1(presentation) {
  const slide = await baseSlide(presentation, 1, { dark: true });
  addRect(slide, { name: "cover-band-1", left: 936, top: 0, width: 204, height: 720, fill: "#3100B4" });
  addRect(slide, { name: "cover-band-2", left: 1140, top: 0, width: 140, height: 720, fill: COLORS.purple });
  addText(slide, { name: "cover-kicker", text: "ABOUT CIRCULARO", left: MARGIN, top: 138, width: 600, height: 26, role: "chrome", fontSize: 15, color: PURPLE_30 });
  addText(slide, { name: "cover-title", text: "Digital trust infrastructure\nfor the agentic era", left: MARGIN, top: 194, width: 820, height: 178, role: "hero", fontSize: 58, color: COLORS.white });
  addText(slide, { name: "cover-body", text: "Connecting business processes, trust services, and trusted records.", left: MARGIN, top: 410, width: 790, height: 70, role: "body", fontSize: 26, color: WHITE_10 });
  addText(slide, { name: "cover-route", text: "PEOPLE · ORGANIZATIONS · APPLICATIONS · AI AGENTS", left: MARGIN, top: 564, width: 820, height: 28, role: "chrome", fontSize: 15, color: PURPLE_30 });
}

async function slide2(presentation) {
  const slide = await baseSlide(presentation, 2, { icons: true });
  addSlideTitle(slide, "Circularo builds trust infrastructure for consequential digital work", { width: 1160 });
  addText(slide, { name: "s2-statement", text: "We connect the authority behind an action with the process that executes it and the evidence that remains.", left: 72, top: 258, width: 770, height: 128, role: "sectionTitle", fontSize: 34, color: COLORS.darkBlue });
  await addImage(slide, "shield.png", { left: 946, top: 238, width: 220, height: 220 }, "Circularo digital trust");
  const focuses = ["ENTERPRISE DIGITAL TRUST", "SOVEREIGN DIGITAL TRUST", "GOVERNMENT SHARED SERVICES", "AGENTIC AI TRUST"];
  focuses.forEach((focus, index) => labelPill(slide, focus, 48 + index * 296, 520, 272, { active: index === 3 }));
  bottomLine(slide, "From trusted documents to trusted execution.", { top: 620 });
}

async function slide3(presentation) {
  const slide = await baseSlide(presentation, 3, { dark: true });
  addSlideTitle(slide, "Digital work is becoming more autonomous", { dark: true, width: 1160 });
  addText(slide, { name: "s3-subtitle", text: "Applications and AI increasingly participate in work once performed only by people.", left: MARGIN, top: 205, width: 1040, height: 48, role: "body", color: WHITE_10 });
  const stages = ["DIGITAL", "AUTOMATED", "AI-ASSISTED", "AGENTIC"];
  addDivider(slide, { name: "s3-baseline", left: 126, top: 386, width: 1028, height: 4, color: "#6E51DA" });
  stages.forEach((stage, index) => {
    const left = 92 + index * 300;
    addRect(slide, { name: `s3-node-${index}`, left, top: 336, width: 204, height: 104, fill: index === 3 ? COLORS.purple : DARK_2, lineFill: index === 3 ? PURPLE_30 : "#6E51DA", lineWidth: index === 3 ? 2 : 1, radius: 12 });
    addText(slide, { name: `s3-label-${index}`, text: stage, left: left + 14, top: 374, width: 176, height: 26, role: "componentTitle", fontSize: 21.5, color: COLORS.white, alignment: "center" });
  });
  addText(slide, { name: "s3-implication", text: "As autonomy increases, identity, authority, policy, approval, evidence, and audit must become more explicit.", left: 150, top: 500, width: 980, height: 78, role: "componentTitle", fontSize: 26, color: COLORS.white, alignment: "center" });
}

async function slide4(presentation) {
  const slide = await baseSlide(presentation, 4);
  addSlideTitle(slide, "Intelligence does not create institutional authority", { width: 1160 });
  addRect(slide, { name: "s4-left", left: 48, top: 238, width: 430, height: 356, fill: COLORS.darkBlue, radius: 12 });
  addText(slide, { name: "s4-left-kicker", text: "AI CAPABILITY", left: 82, top: 276, width: 320, height: 24, role: "chrome", color: PURPLE_30 });
  addText(slide, { name: "s4-left-text", text: "Understand\nAnalyze\nRecommend\nGenerate\nPlan", left: 82, top: 326, width: 320, height: 188, role: "sectionTitle", fontSize: 31, color: COLORS.white });
  addText(slide, { name: "s4-right-kicker", text: "BEFORE A CONSEQUENTIAL ACTION EXECUTES", left: 548, top: 248, width: 640, height: 24, role: "chrome", color: COLORS.purple });
  const questions = ["Who or what is acting?", "Whom does the actor represent?", "What is the actor permitted to do?", "Which policy and approval apply?", "What evidence will remain?"];
  questions.forEach((question, index) => {
    const top = 306 + index * 54;
    addRect(slide, { name: `s4-dot-${index}`, left: 548, top: top + 9, width: 10, height: 10, fill: COLORS.purple, radius: 8 });
    addText(slide, { name: `s4-question-${index}`, text: question, left: 578, top, width: 610, height: 38, role: "body", fontSize: 22, color: COLORS.body });
  });
  bottomLine(slide, "Capability may propose an action. The institution determines what may execute.", { top: 618 });
}

async function slide5(presentation) {
  const slide = await baseSlide(presentation, 5, { dark: true });
  addSlideTitle(slide, "Circularo provides the Trusted Execution Layer", { dark: true, width: 1160 });
  const actors = ["PEOPLE", "ORGANIZATIONS", "APPLICATIONS", "AI AGENTS"];
  actors.forEach((actor, index) => labelPill(slide, actor, 84 + index * 288, 240, 248, { dark: true }));
  addRect(slide, { name: "s5-layer", left: 92, top: 332, width: 1096, height: 146, fill: COLORS.purple, lineFill: PURPLE_30, lineWidth: 2, radius: 12 });
  addText(slide, { name: "s5-layer-kicker", text: "CIRCULARO", left: 130, top: 362, width: 1020, height: 24, role: "chrome", color: WHITE_10, alignment: "center" });
  addText(slide, { name: "s5-layer-title", text: "Trusted Execution Layer", left: 130, top: 400, width: 1020, height: 48, role: "sectionTitle", fontSize: 36, color: COLORS.white, alignment: "center" });
  const controls = ["IDENTITY", "AUTHORITY", "POLICY", "APPROVAL", "TRUST", "EVIDENCE", "RECORDS"];
  controls.forEach((control, index) => labelPill(slide, control, 49 + index * 170, 528, 152, { dark: true }));
  bottomLine(slide, "Institutional control remains connected to actual execution.", { dark: true, top: 626 });
}

async function slide6(presentation) {
  const slide = await baseSlide(presentation, 6, { icons: true });
  addSlideTitle(slide, "One trust layer connects every kind of digital actor", { width: 1160 });
  const actors = [
    ["People", "Individuals acting in their own role", "person.png"],
    ["Organizations", "Entities represented through authority", "sovereign-kyc.png"],
    ["Applications", "Systems invoking governed services", "sovereign-integrations.png"],
    ["AI agents", "Software acting within permitted bounds", "sovereign-ai.png"],
  ];
  for (let index = 0; index < actors.length; index += 1) {
    const [title, body, icon] = actors[index];
    const left = 48 + index * 296;
    addRect(slide, { name: `s6-panel-${index}`, left, top: 250, width: 272, height: 310, fill: index === 3 ? COLORS.softPurple : COLORS.neutral50, lineFill: index === 3 ? PURPLE_20 : COLORS.neutral200, lineWidth: 1, radius: 12 });
    await addImage(slide, icon, { left: left + 83, top: 282, width: 106, height: 106 }, title);
    addText(slide, { name: `s6-title-${index}`, text: title, left: left + 24, top: 418, width: 224, height: 36, role: "componentTitle", fontSize: 25, color: COLORS.darkBlue, alignment: "center" });
    addText(slide, { name: `s6-body-${index}`, text: body, left: left + 24, top: 476, width: 224, height: 58, role: "body", fontSize: 21.5, color: COLORS.body, alignment: "center" });
  }
  bottomLine(slide, "The actor changes. The governance and evidence model remains consistent.", { top: 618 });
}

async function slide7(presentation) {
  const slide = await baseSlide(presentation, 7, { icons: true });
  addSlideTitle(slide, "Circularo unifies process, trust, and evidence", { width: 1160 });
  const columns = [
    ["BUSINESS PROCESSES", "Create · Collaborate\nWorkflow · Approval\nAutomation", "sovereign-collab.png", COLORS.neutral50],
    ["TRUST SERVICES", "Identity · Authority\nSignatures · Seals\nVerification", "sovereign-sign.png", COLORS.softPurple],
    ["TRUSTED RECORDS", "Evidence · Audit\nArchive · Retrieval\nInstitutional memory", "sovereign-vault.png", COLORS.neutral50],
  ];
  for (let index = 0; index < columns.length; index += 1) {
    const [label, body, icon, fill] = columns[index];
    const left = 48 + index * 402;
    addRect(slide, { name: `s7-column-${index}`, left, top: 246, width: 378, height: 340, fill, lineFill: index === 1 ? PURPLE_20 : COLORS.neutral200, lineWidth: index === 1 ? 2 : 1, radius: 12 });
    await addImage(slide, icon, { left: left + 138, top: 278, width: 102, height: 102 }, label);
    addText(slide, { name: `s7-label-${index}`, text: label, left: left + 24, top: 410, width: 330, height: 26, role: "chrome", fontSize: 15, color: COLORS.purple, alignment: "center" });
    addText(slide, { name: `s7-body-${index}`, text: body, left: left + 30, top: 458, width: 318, height: 98, role: "bodyBold", fontSize: 22, color: COLORS.darkBlue, alignment: "center" });
  }
  bottomLine(slide, "One platform · One governance model · One continuous evidence chain.", { top: 620 });
}

async function slide8(presentation) {
  const slide = await baseSlide(presentation, 8, { dark: true });
  addSlideTitle(slide, "Trust remains connected across the full lifecycle", { dark: true, width: 1160 });
  addText(slide, { name: "s8-subtitle", text: "The signature is one trust event within a broader governed execution.", left: MARGIN, top: 205, width: 1000, height: 46, role: "body", color: WHITE_10 });
  const stages = ["Create", "Collaborate", "Approve", "Execute", "Verify", "Preserve"];
  addDivider(slide, { name: "s8-baseline", left: 104, top: 388, width: 1068, height: 4, color: "#6E51DA" });
  stages.forEach((stage, index) => {
    const left = 58 + index * 204;
    addRect(slide, { name: `s8-node-${index}`, left, top: 336, width: 112, height: 112, fill: index === 3 ? COLORS.purple : DARK_2, lineFill: index === 3 ? PURPLE_30 : "#6E51DA", lineWidth: index === 3 ? 2 : 1, radius: 12 });
    addText(slide, { name: `s8-num-${index}`, text: String(index + 1).padStart(2, "0"), left: left + 30, top: 362, width: 52, height: 24, role: "chrome", fontSize: 15, color: PURPLE_30, alignment: "center" });
    addText(slide, { name: `s8-stage-${index}`, text: stage, left: left - 22, top: 472, width: 156, height: 36, role: "componentTitle", fontSize: 22, color: COLORS.white, alignment: "center" });
  });
  bottomLine(slide, "Every step contributes context to the trusted record.", { dark: true, top: 618 });
}

async function slide9(presentation) {
  const slide = await baseSlide(presentation, 9, { icons: true });
  addSlideTitle(slide, "Trust becomes programmable across digital channels", { width: 1160 });
  const bands = [
    ["CHANNELS", "People · Portals · Enterprise systems · Applications · AI agents", COLORS.neutral50],
    ["GOVERNED API", "Identity · Authority · Policy · Approval · Execution · Evidence", COLORS.softPurple],
    ["OUTCOME", "Consistent trust and evidence wherever digital work happens", COLORS.darkBlue],
  ];
  bands.forEach(([label, text, fill], index) => {
    const top = 242 + index * 118;
    addRect(slide, { name: `s9-band-${index}`, left: MARGIN, top, width: 1184, height: 92, fill, lineFill: index === 2 ? COLORS.darkBlue : COLORS.neutral200, lineWidth: 1, radius: 12 });
    addText(slide, { name: `s9-label-${index}`, text: label, left: 76, top: top + 23, width: 220, height: 24, role: "chrome", fontSize: 15, color: index === 2 ? PURPLE_30 : COLORS.purple });
    addText(slide, { name: `s9-text-${index}`, text, left: 300, top: top + 22, width: 870, height: 50, role: "componentTitle", fontSize: 24, color: index === 2 ? COLORS.white : COLORS.darkBlue, alignment: "right" });
  });
  bottomLine(slide, "The API extends the trust model; it does not bypass it.", { top: 618 });
}

async function slide10(presentation) {
  const slide = await baseSlide(presentation, 10, { dark: true });
  addSlideTitle(slide, "One platform supports three delivery models", { dark: true, width: 1160 });
  const models = [
    ["01", "Circularo SaaS", "Managed enterprise digital trust"],
    ["02", "Circularo Sovereign", "Customer-controlled trusted execution"],
    ["03", "Sovereign Trust Shared Services", "Reusable trust infrastructure across an ecosystem"],
  ];
  models.forEach(([num, title, body], index) => {
    const left = 48 + index * 402;
    addText(slide, { name: `s10-num-${index}`, text: num, left, top: 248, width: 80, height: 40, role: "sectionTitle", fontSize: 28, color: index === 0 ? PURPLE_30 : COLORS.purple });
    addText(slide, { name: `s10-title-${index}`, text: title, left, top: 314, width: 370, height: 78, role: "sectionTitle", fontSize: 30, color: COLORS.white });
    addText(slide, { name: `s10-body-${index}`, text: body, left, top: 418, width: 350, height: 94, role: "body", fontSize: 22, color: WHITE_10 });
  });
  bottomLine(slide, "The trust model stays consistent; the control boundary changes.", { dark: true, top: 596 });
}

async function slide11(presentation) {
  const slide = await baseSlide(presentation, 11, { icons: true });
  addSlideTitle(slide, "Circularo SaaS simplifies trusted digital work", { width: 1160 });
  await addImage(slide, "sovereign-cloud.png", { left: 72, top: 254, width: 310, height: 300 }, "Circularo SaaS managed cloud");
  addText(slide, { name: "s11-kicker", text: "MANAGED ENTERPRISE DIGITAL TRUST", left: 464, top: 252, width: 650, height: 24, role: "chrome", fontSize: 15, color: COLORS.purple });
  addText(slide, { name: "s11-body", text: "For organizations that want to unify trusted digital processes without operating the underlying platform infrastructure.", left: 464, top: 310, width: 700, height: 118, role: "sectionTitle", fontSize: 31, color: COLORS.darkBlue });
  const steps = ["ADOPT", "CONFIGURE", "CONNECT", "EXPAND"];
  steps.forEach((step, index) => labelPill(slide, step, 464 + index * 176, 494, 154, { active: index === 0 }));
  bottomLine(slide, "A managed path to trusted execution across enterprise workflows.", { top: 620 });
}

async function slide12(presentation) {
  const slide = await baseSlide(presentation, 12, { dark: true, icons: true });
  addSlideTitle(slide, "Circularo Sovereign keeps execution inside the control boundary", { dark: true, width: 1160 });
  addRect(slide, { name: "s12-boundary", left: 72, top: 238, width: 1136, height: 340, fill: DARK_3, lineFill: PURPLE_30, lineWidth: 3, radius: 12 });
  await addImage(slide, "shield.png", { left: 112, top: 288, width: 180, height: 180 }, "Sovereign control boundary");
  addText(slide, { name: "s12-boundary-label", text: "CUSTOMER-CONTROLLED ENVIRONMENT", left: 338, top: 280, width: 780, height: 26, role: "chrome", fontSize: 15, color: PURPLE_30 });
  addText(slide, { name: "s12-boundary-title", text: "Trusted execution under the organization's infrastructure, data, identity, policy, and operating requirements.", left: 338, top: 336, width: 780, height: 122, role: "sectionTitle", fontSize: 30, color: COLORS.white });
  const controls = ["INFRASTRUCTURE", "DATA", "IDENTITY", "KEYS", "POLICY", "EVIDENCE"];
  controls.forEach((control, index) => labelPill(slide, control, 338 + (index % 3) * 260, 480 + Math.floor(index / 3) * 46, 234, { dark: true }));
  bottomLine(slide, "Modern platform capability inside a defined sovereignty boundary.", { dark: true, top: 620 });
}

async function slide13(presentation) {
  const slide = await baseSlide(presentation, 13, { icons: true });
  addSlideTitle(slide, "Shared Services makes trust reusable across an ecosystem", { width: 1160 });
  const center = { left: 492, top: 286, width: 296, height: 258 };
  const nodes = [
    ["Ministries", 72, 250], ["Agencies", 72, 456], ["Public services", 1000, 250], ["Applications", 1000, 456],
  ];
  nodes.forEach(([, left, top], index) => arrow(slide, index < 2 ? left + 220 : center.left + center.width, top + 48, index < 2 ? center.left - (left + 220) : left - (center.left + center.width), { name: `s13-arrow-${index}` }));
  addRect(slide, { name: "s13-center", ...center, fill: COLORS.purple, lineFill: PURPLE_20, lineWidth: 2, radius: 12 });
  addText(slide, { name: "s13-center-kicker", text: "SHARED TRUST INFRASTRUCTURE", left: center.left + 20, top: center.top + 64, width: center.width - 40, height: 22, role: "chrome", fontSize: 14, color: WHITE_10, alignment: "center" });
  addText(slide, { name: "s13-center-title", text: "Build once.\nConsume many times.", left: center.left + 22, top: center.top + 116, width: center.width - 44, height: 72, role: "componentTitle", fontSize: 25, color: COLORS.white, alignment: "center" });
  nodes.forEach(([label, left, top], index) => {
    addRect(slide, { name: `s13-node-${index}`, left, top, width: 220, height: 98, fill: COLORS.neutral50, lineFill: COLORS.neutral200, lineWidth: 1, radius: 12 });
    addText(slide, { name: `s13-node-text-${index}`, text: label, left: left + 18, top: top + 33, width: 184, height: 32, role: "componentTitle", fontSize: 22, color: COLORS.darkBlue, alignment: "center" });
  });
  bottomLine(slide, "Common trust capabilities with explicit entity ownership and policy.", { top: 620 });
}

async function slide14(presentation) {
  const slide = await baseSlide(presentation, 14, { dark: true });
  addSlideTitle(slide, "Circularo is positioned for the next shift in digital work", { dark: true, width: 1160 });
  const shifts = [
    ["FROM", "Signing documents", "TO", "Governing trusted execution"],
    ["FROM", "Storing files", "TO", "Building institutional memory"],
    ["FROM", "Human-only workflows", "TO", "Trusted human and agentic execution"],
  ];
  shifts.forEach(([from, leftText, to, rightText], index) => {
    const top = 250 + index * 118;
    addText(slide, { name: `s14-from-${index}`, text: from, left: 72, top: top + 5, width: 80, height: 22, role: "chrome", fontSize: 14, color: PURPLE_30 });
    addText(slide, { name: `s14-left-${index}`, text: leftText, left: 150, top, width: 330, height: 42, role: "componentTitle", fontSize: 24, color: WHITE_10 });
    arrow(slide, 498, top + 10, 94, { dark: true, name: `s14-arrow-${index}` });
    addText(slide, { name: `s14-to-${index}`, text: to, left: 620, top: top + 5, width: 60, height: 22, role: "chrome", fontSize: 14, color: COLORS.purple });
    addText(slide, { name: `s14-right-${index}`, text: rightText, left: 690, top, width: 500, height: 52, role: "componentTitle", fontSize: 25, color: COLORS.white });
    addDivider(slide, { name: `s14-rule-${index}`, left: 72, top: top + 72, width: 1118, color: "#6E51DA" });
  });
  bottomLine(slide, "The opportunity expands as more consequential work becomes software- and agent-executed.", { dark: true, top: 620 });
}

async function slide15(presentation) {
  const slide = await baseSlide(presentation, 15, { dark: true });
  addText(slide, { name: "s15-kicker", text: "WHERE CIRCULARO CREATES VALUE", left: MARGIN, top: 122, width: 700, height: 26, role: "chrome", fontSize: 15, color: PURPLE_30 });
  addText(slide, { name: "s15-title", text: "Start with the action.\nDefine the trust boundary.", left: MARGIN, top: 182, width: 950, height: 150, role: "hero", fontSize: 54, color: COLORS.white });
  const audiences = [
    ["ENTERPRISES", "Unify trusted digital work"],
    ["GOVERNMENTS", "Establish sovereign or shared trust infrastructure"],
    ["PARTNERS", "Connect identity, trust services, systems, and delivery expertise"],
  ];
  audiences.forEach(([label, body], index) => {
    const left = 48 + index * 402;
    addText(slide, { name: `s15-label-${index}`, text: label, left, top: 404, width: 370, height: 24, role: "chrome", fontSize: 15, color: COLORS.purple });
    addText(slide, { name: `s15-body-${index}`, text: body, left, top: 450, width: 350, height: 76, role: "componentTitle", fontSize: 24, color: COLORS.white });
  });
  addRect(slide, { name: "s15-action", left: 120, top: 572, width: 1040, height: 60, fill: COLORS.purple, radius: 12 });
  addText(slide, { name: "s15-action-text", text: "CONSEQUENTIAL WORKFLOW → TRUST REQUIREMENTS → DELIVERY MODEL → FIRST USE CASE", left: 146, top: 590, width: 988, height: 24, role: "chrome", fontSize: 15, color: COLORS.white, alignment: "center" });
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
  await writeBlob(path.join(BUILD, "about-circularo-artifact-montage.webp"), await presentation.export({ format: "webp", montage: true, scale: 1 }));
  const snapshot = await presentation.inspect({ kind: "slide,textbox,shape,image,notes", maxChars: 200000 });
  await fs.writeFile(path.join(BUILD, "about-circularo.inspect.ndjson"), snapshot.ndjson);
  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(OUTPUT_PPTX);
  console.log(JSON.stringify({ output: OUTPUT_PPTX, slides: builders.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
