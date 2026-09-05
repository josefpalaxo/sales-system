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
const TASK = path.join(ROOT, "work/slides/circularo-saas-end-to-end-trusted-execution-internal");
const BUILD = path.join(TASK, "build/render");
const DRAFT = path.join(TASK, "build/candidate.pptx");
const SOURCE = "work/new-story/Circularo-SaaS-End-to-End-Trusted-Execution-Deck-Outline.md";
const BRAND = ".agents/skills/circularo-slides/references/brand-system.md";

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

function addInternalMark(slide, dark) {
  addText(slide, {
    name: "internal-mark",
    text: "INTERNAL WORKING NARRATIVE",
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

async function baseSlide(presentation, pageNumber, { dark = false, eyebrow = "Circularo SaaS · Trusted Execution" } = {}) {
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

function addTakeaway(slide, text, { dark = false, top = 610, width = 1120, size = 20.5 } = {}) {
  addDivider(slide, { name: "takeaway-rule", left: MARGIN, top: top - 16, width: 194, height: 3, color: dark ? "#C9AEFF" : COLORS.purple });
  addText(slide, { name: "takeaway", text, left: MARGIN, top, width, height: 48, role: "bodyBold", fontSize: size, color: dark ? COLORS.white : COLORS.darkBlue });
}

function addNumber(slide, name, value, left, top, { active = false, dark = false, size = 44 } = {}) {
  addRect(slide, {
    name: `${name}-shape`, left, top, width: size, height: size,
    fill: active ? COLORS.purple : dark ? "#3516AA" : COLORS.white,
    lineFill: active ? COLORS.purple : dark ? "#6E51DA" : COLORS.purple,
    lineWidth: 2, radius: 10,
  });
  addText(slide, { name: `${name}-text`, text: value, left, top: top + size * 0.25, width: size, height: 22, role: "chrome", fontSize: 14, color: active || dark ? COLORS.white : COLORS.darkBlue, alignment: "center" });
}

function addBulletRows(slide, items, { left = 48, top = 250, width = 1132, rowHeight = 58, dark = false, size = 20 } = {}) {
  items.forEach((item, index) => {
    const y = top + index * rowHeight;
    addRect(slide, { name: `bullet-${index + 1}`, left, top: y + 10, width: 8, height: 8, fill: dark ? "#C9AEFF" : COLORS.purple, radius: 8 });
    addText(slide, { name: `bullet-text-${index + 1}`, text: item, left: left + 24, top: y, width: width - 24, height: rowHeight - 6, role: "body", fontSize: size, color: dark ? COLORS.white : COLORS.body });
    if (index < items.length - 1) addDivider(slide, { name: `bullet-rule-${index + 1}`, left: left + 24, top: y + rowHeight - 8, width: width - 24, color: dark ? "#5B3BC9" : COLORS.neutral200 });
  });
}

function addFlow(slide, labels, { left = 48, top = 260, width = 1132, dark = false, active = -1, number = true, fontSize = 18 } = {}) {
  const gap = 16;
  const cell = (width - gap * (labels.length - 1)) / labels.length;
  labels.forEach((label, index) => {
    const x = left + index * (cell + gap);
    addRect(slide, { name: `flow-${index + 1}`, left: x, top, width: cell, height: 66, fill: index === active ? COLORS.purple : dark ? "#3516AA" : COLORS.softPurple, lineFill: index === active ? COLORS.purple : dark ? "#6E51DA" : "#C9AEFF", lineWidth: 1, radius: 9 });
    if (number) addText(slide, { name: `flow-number-${index + 1}`, text: String(index + 1).padStart(2, "0"), left: x + 8, top: top + 8, width: 34, height: 18, role: "chrome", fontSize: 11, color: index === active || dark ? "#C9AEFF" : COLORS.purple });
    addText(slide, { name: `flow-label-${index + 1}`, text: label, left: x + 8, top: top + (number ? 27 : 19), width: cell - 16, height: number ? 30 : 34, role: "bodyBold", fontSize, color: index === active || dark ? COLORS.white : COLORS.darkBlue, alignment: "center" });
  });
}

function addCover(slide) {
  addLabel(slide, "cover-kicker", "Circularo SaaS · End-to-End Trusted Execution", 48, 118, 720, { dark: true });
  addText(slide, { name: "cover-title", text: "From Digital Processes\nto Trusted Outcomes", left: 48, top: 170, width: 720, height: 164, role: "hero", fontSize: 57, color: COLORS.white });
  addText(slide, { name: "cover-subtitle", text: "One platform connecting content, collaboration, approvals, trust services, execution, evidence and trusted records.", left: 48, top: 370, width: 660, height: 104, role: "body", fontSize: 24, color: "#E6DEFF" });
  const steps = ["CREATE", "COLLABORATE", "APPROVE", "EXECUTE", "TRUST SERVICE", "EVIDENCE", "ARCHIVE"];
  addDivider(slide, { name: "cover-spine", left: 866, top: 132, width: 3, height: 444, color: "#6E51DA" });
  steps.forEach((label, index) => {
    const top = 128 + index * 66;
    addNumber(slide, `cover-step-${index + 1}`, String(index + 1).padStart(2, "0"), 846, top, { active: index === 3, dark: true, size: 40 });
    addText(slide, { name: `cover-step-label-${index + 1}`, text: label, left: 912, top: top + 9, width: 266, height: 28, role: "bodyBold", fontSize: 18.5, color: index === 3 ? COLORS.white : "#D8C9FF" });
  });
  addText(slide, { name: "cover-core", text: "Circularo SaaS is where trusted digital processes can remain connected, governed and evidenced from beginning to end.", left: 48, top: 540, width: 700, height: 58, role: "bodyBold", fontSize: 19.5, color: "#C9AEFF" });
}

function addFragmentation(slide) {
  addSlideTitle(slide, "The Problem: Fragmented Tools Fragment Accountability", { width: 1180 });
  addText(slide, { name: "fragment-intro", text: "Most organizations have digitized individual parts of their processes, but each stage may happen in a different application.", left: 48, top: 206, width: 1132, height: 52, role: "bodyBold", fontSize: 21.5, color: COLORS.darkBlue });
  addFlow(slide, ["Create", "Collaborate", "Workflow", "Approve", "Sign", "Store", "Search"], { top: 278, height: 66, fontSize: 17.5 });
  addLabel(slide, "lost-context-label", "Every disconnected handoff can lose context", 48, 378, 620);
  const questions = [
    "Which version was authoritative?", "Who participated?", "Who was permitted to decide?", "What exactly was approved?", "Which identity or assurance was used?",
    "Which trust services were applied?", "What actually happened?", "Where is the resulting evidence?", "Can the complete chain be reconstructed and proven?",
  ];
  questions.forEach((item, index) => {
    const col = index < 5 ? 0 : 1;
    const row = col === 0 ? index : index - 5;
    const left = col === 0 ? 48 : 636;
    const top = 416 + row * 38;
    addRect(slide, { name: `question-mark-${index + 1}`, left, top: top + 9, width: 7, height: 7, fill: COLORS.purple, radius: 7 });
    addText(slide, { name: `question-${index + 1}`, text: item, left: left + 22, top, width: 540, height: 32, role: "body", fontSize: 17.5, color: COLORS.body });
  });
  addTakeaway(slide, "The problem is not simply fragmented applications. It is fragmented accountability and evidence.", { top: 616, size: 19.5 });
}

function addBeyondSignatures(slide) {
  addSlideTitle(slide, "Digital Processes Need More Than Digital Signatures", { dark: true, width: 1170 });
  addRect(slide, { name: "signature-event", left: 48, top: 224, width: 430, height: 176, fill: "#3516AA", lineFill: "#6E51DA", lineWidth: 1, radius: 12 });
  addLabel(slide, "signature-label", "Traditional eSignature question", 84, 254, 360, { dark: true });
  addText(slide, { name: "signature-question", text: "Who signed this document?", left: 84, top: 312, width: 350, height: 58, role: "sectionTitle", fontSize: 29, color: COLORS.white });
  addLabel(slide, "broader-label", "Trusted business process", 566, 224, 560, { dark: true });
  const questions = ["Who created it?", "Which version was reviewed?", "Who approved it?", "Under what authority?", "What assurance was required?", "What was signed, sealed or timestamped?", "What evidence remains afterwards?"];
  questions.forEach((item, index) => {
    const col = index < 4 ? 0 : 1;
    const row = col === 0 ? index : index - 4;
    const left = col === 0 ? 566 : 882;
    const top = 270 + row * 52;
    addRect(slide, { name: `broader-mark-${index + 1}`, left, top: top + 10, width: 7, height: 7, fill: "#C9AEFF", radius: 7 });
    addText(slide, { name: `broader-question-${index + 1}`, text: item, left: left + 22, top, width: 276, height: 42, role: "body", fontSize: 17.5, color: COLORS.white });
  });
  addText(slide, { name: "signature-core", text: "The signature is an important trust event. It is not the entire trust model.", left: 48, top: 500, width: 1132, height: 52, role: "sectionTitle", fontSize: 28, color: COLORS.white, alignment: "center" });
  addTakeaway(slide, "Circularo's advantage is connecting eSignature to the complete trusted process around it.", { dark: true, top: 592, size: 20 });
}

function addTrustChain(slide) {
  addSlideTitle(slide, "One Continuous Trust & Evidence Chain", { width: 1140 });
  addFlow(slide, ["Create", "Collaborate", "Review", "Approve", "Sign / Seal", "Evidence", "Archive", "Retrieve"], { top: 220, active: 4, fontSize: 16.5 });
  addText(slide, { name: "chain-intro", text: "Throughout the lifecycle, Circularo can keep the important context connected:", left: 48, top: 320, width: 1132, height: 38, role: "bodyBold", fontSize: 21, color: COLORS.darkBlue });
  const items = ["content and versions", "participants and roles", "identity", "permissions and authority", "workflow and decisions", "signatures, seals and timestamps", "audit events", "resulting evidence and records"];
  items.forEach((item, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const left = 48 + col * 592;
    const top = 378 + row * 48;
    addNumber(slide, `context-${index + 1}`, String(index + 1).padStart(2, "0"), left, top, { active: index === 7, size: 42 });
    addText(slide, { name: `context-label-${index + 1}`, text: item, left: left + 52, top: top + 5, width: 486, height: 28, role: "body", fontSize: 19.5, color: COLORS.body });
  });
  addTakeaway(slide, "Trust starts before the signature and continues after execution.", { top: 602, size: 22 });
}

function addPlatform(slide) {
  addSlideTitle(slide, "Circularo SaaS: One Platform for the End-to-End Process", { dark: true, width: 1180 });
  addText(slide, { name: "platform-core", text: "Circularo brings the major components of a trusted digital process into one connected SaaS platform.", left: 48, top: 208, width: 1132, height: 50, role: "bodyBold", fontSize: 21.5, color: COLORS.white });
  const groups = [
    ["Content & Collaboration", "Create · Prepare · Collaborate · Review"], ["Identity & Authority", "Identify · Represent · Authorize"],
    ["Workflow & Approval", "Route · Decide · Approve · Control"], ["Trust Services", "Verify · Sign · Seal · Timestamp"],
    ["Evidence & Trusted Records", "Evidence · Audit · Archive · Retrieve"], ["Programmable Trust", "Unified Trust API · Integrations · Automation"],
  ];
  groups.forEach(([title, body], index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const left = 48 + col * 592;
    const top = 286 + row * 94;
    addText(slide, { name: `platform-number-${index + 1}`, text: String(index + 1).padStart(2, "0"), left, top, width: 48, height: 24, role: "chrome", fontSize: 13, color: "#C9AEFF" });
    addText(slide, { name: `platform-title-${index + 1}`, text: title, left: left + 62, top: top - 4, width: 486, height: 32, role: "bodyBold", fontSize: 20.5, color: COLORS.white });
    addText(slide, { name: `platform-body-${index + 1}`, text: body, left: left + 62, top: top + 34, width: 486, height: 34, role: "body", fontSize: 18.5, color: "#D8C9FF" });
    addDivider(slide, { name: `platform-rule-${index + 1}`, left, top: top + 72, width: 540, color: "#5B3BC9" });
  });
  addTakeaway(slide, "One platform. One connected process. One continuous evidence chain.", { dark: true, top: 604, size: 22 });
}

function addContent(slide) {
  addSlideTitle(slide, "Keep the Process Connected to What Was Actually Reviewed", { width: 1180 });
  addText(slide, { name: "content-intro", text: "Before approval or signing, trusted content is created, changed, discussed and reviewed.", left: 48, top: 212, width: 500, height: 86, role: "sectionTitle", fontSize: 27, color: COLORS.darkBlue });
  const items = ["document preparation", "collaboration", "version context", "participants", "review", "subsequent workflow and approval"];
  items.forEach((item, index) => {
    const top = 326 + index * 42;
    addDivider(slide, { name: `content-mark-${index + 1}`, left: 48, top: top + 13, width: 20, height: 3, color: COLORS.purple });
    addText(slide, { name: `content-item-${index + 1}`, text: item, left: 84, top, width: 440, height: 32, role: "bodyBold", fontSize: 20, color: COLORS.darkBlue });
  });
  addRect(slide, { name: "why-panel", left: 624, top: 224, width: 556, height: 306, fill: COLORS.softPurple, lineFill: "#C9AEFF", lineWidth: 1, radius: 12 });
  addLabel(slide, "why-label", "Why it matters", 666, 260, 470);
  addText(slide, { name: "why-text", text: "A signature on the final document is more valuable when the organization can also understand the process that produced the authoritative version.", left: 666, top: 318, width: 470, height: 150, role: "sectionTitle", fontSize: 27, color: COLORS.darkBlue });
  addTakeaway(slide, "The trusted process begins with the content itself.", { top: 598, size: 22 });
}

function addIdentityWorkflow(slide) {
  addSlideTitle(slide, "Know Who Participated, Who Decided and How the Decision Was Reached", { dark: true, width: 1180 });
  addText(slide, { name: "identity-intro", text: "Circularo connects people and organizational process around the content.", left: 48, top: 210, width: 1132, height: 44, role: "bodyBold", fontSize: 21.5, color: COLORS.white });
  addFlow(slide, ["Identify", "Route", "Review", "Decide", "Approve"], { top: 274, dark: true, active: 4, fontSize: 19 });
  const items = ["participants", "roles and permissions", "workflow", "approval sequence", "decisions", "business rules", "resulting execution"];
  items.forEach((item, index) => {
    const col = index < 4 ? 0 : 1;
    const row = col === 0 ? index : index - 4;
    const left = col === 0 ? 48 : 636;
    const top = 380 + row * 44;
    addText(slide, { name: `identity-number-${index + 1}`, text: String(index + 1).padStart(2, "0"), left, top, width: 42, height: 22, role: "chrome", fontSize: 12, color: "#C9AEFF" });
    addText(slide, { name: `identity-item-${index + 1}`, text: item, left: left + 54, top: top - 3, width: 500, height: 30, role: "body", fontSize: 19.5, color: COLORS.white });
  });
  addTakeaway(slide, "The organization needs to know whether the right participant made the right decision within the right process.", { dark: true, top: 590, size: 20 });
}

function addTrustServices(slide) {
  addSlideTitle(slide, "Different Transactions Require Different Forms of Trust", { width: 1180 });
  addText(slide, { name: "trust-intro", text: "A business process may require different combinations of:", left: 48, top: 210, width: 1132, height: 42, role: "bodyBold", fontSize: 21.5, color: COLORS.darkBlue });
  const items = ["identity verification", "digital signatures", "organizational seals", "timestamps", "external trust services", "national or enterprise identity services"];
  items.forEach((item, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const left = 48 + col * 592;
    const top = 286 + row * 68;
    addNumber(slide, `trust-service-${index + 1}`, String(index + 1).padStart(2, "0"), left, top, { active: index === 4, size: 40 });
    addText(slide, { name: `trust-service-label-${index + 1}`, text: item, left: left + 58, top: top + 8, width: 480, height: 32, role: "bodyBold", fontSize: 20.5, color: COLORS.darkBlue });
  });
  addText(slide, { name: "orchestration-message", text: "Circularo can orchestrate the appropriate trust mechanisms within the process.", left: 48, top: 510, width: 1132, height: 42, role: "sectionTitle", fontSize: 27, color: COLORS.darkBlue });
  addTakeaway(slide, "Trust services become part of the business process rather than isolated events outside it.", { top: 604, size: 20 });
}

function addOrchestrationOutcome(slide) {
  addSlideTitle(slide, "The Objective Is the Trusted Outcome", { dark: true, width: 1160 });
  const caps = ["Content", "Identity", "Authority", "Workflow", "Approval", "Trust Services", "Evidence"];
  addFlow(slide, caps, { top: 224, dark: true, active: 5, fontSize: 15.5 });
  addDivider(slide, { name: "converge-line", left: 612, top: 290, width: 3, height: 56, color: "#6E51DA" });
  addRect(slide, { name: "trusted-outcome", left: 398, top: 346, width: 430, height: 82, fill: COLORS.purple, radius: 12 });
  addText(slide, { name: "trusted-outcome-label", text: "TRUSTED BUSINESS OUTCOME", left: 438, top: 373, width: 350, height: 30, role: "bodyBold", fontSize: 22, color: COLORS.white, alignment: "center" });
  addText(slide, { name: "orchestration-definition", text: "Trust Orchestration is the platform capability.", left: 48, top: 472, width: 520, height: 46, role: "sectionTitle", fontSize: 27, color: COLORS.white });
  addText(slide, { name: "execution-definition", text: "Trusted Execution is the outcome.", left: 660, top: 472, width: 520, height: 46, role: "sectionTitle", fontSize: 27, color: "#C9AEFF" });
  addText(slide, { name: "trusted-execution-definition", text: "Trusted Execution is the controlled execution of a trusted digital action with the appropriate identity, authority, process, assurance and retained evidence.", left: 48, top: 548, width: 1132, height: 66, role: "bodyBold", fontSize: 20, color: COLORS.white, alignment: "center" });
}

function addAssurance(slide) {
  addSlideTitle(slide, "Trusted Execution Is More Than Signing", { width: 1140 });
  addText(slide, { name: "assurance-intro", text: "Different actions require different forms of assurance.", left: 48, top: 210, width: 1132, height: 42, role: "bodyBold", fontSize: 21.5, color: COLORS.darkBlue });
  const items = [
    ["Workflow Assurance", "Who approved? Was the correct process followed?"],
    ["Personal Assurance", "Who personally authorized or signed? Can their identity be established?"],
    ["Organizational Assurance", "Did this officially originate from the organization? Can authenticity and integrity be verified?"],
    ["Evidence Assurance", "Can the organization subsequently prove the content, participants, decisions, trust events and process history?"],
  ];
  items.forEach(([title, body], index) => {
    const left = 48 + index * 296;
    addNumber(slide, `assurance-${index + 1}`, String(index + 1).padStart(2, "0"), left, 282, { active: index === 3 });
    addText(slide, { name: `assurance-title-${index + 1}`, text: title, left, top: 348, width: 250, height: 62, role: "bodyBold", fontSize: 21, color: COLORS.darkBlue });
    addText(slide, { name: `assurance-body-${index + 1}`, text: body, left, top: 430, width: 250, height: 124, role: "body", fontSize: 18.5, color: COLORS.body });
  });
  addTakeaway(slide, "Circularo combines the assurance required by the process rather than treating every transaction as simply “send document for signature.”", { top: 604, size: 18.5 });
}

function addInstitutionalEvidence(slide) {
  addSlideTitle(slide, "The Output Should Not Simply Be a PDF", { dark: true, width: 1140 });
  addText(slide, { name: "evidence-intro", text: "A trusted process can produce a verifiable record combining:", left: 48, top: 210, width: 1132, height: 42, role: "bodyBold", fontSize: 21.5, color: COLORS.white });
  addRect(slide, { name: "document-core", left: 472, top: 292, width: 336, height: 150, fill: COLORS.purple, radius: 12 });
  addText(slide, { name: "document-core-label", text: "VERIFIABLE\nRECORD", left: 520, top: 331, width: 240, height: 82, role: "sectionTitle", fontSize: 30, color: COLORS.white, alignment: "center" });
  const leftItems = ["authoritative document version", "identities", "organizational roles", "approvals and decisions", "signatures and seals"];
  const rightItems = ["timestamps", "audit events", "process history", "retention metadata", "supporting evidence"];
  [leftItems, rightItems].forEach((items, col) => items.forEach((item, row) => {
    const left = col === 0 ? 48 : 842;
    const top = 270 + row * 54;
    addDivider(slide, { name: `evidence-mark-${col}-${row}`, left, top: top + 13, width: 18, height: 3, color: "#C9AEFF" });
    addText(slide, { name: `evidence-item-${col}-${row}`, text: item, left: left + 30, top, width: 360, height: 34, role: "bodyBold", fontSize: 18.5, color: COLORS.white });
  }));
  addTakeaway(slide, "The result is not simply a completed transaction. It becomes durable institutional evidence.", { dark: true, top: 596, size: 20.5 });
}

function addTrustedRecord(slide) {
  addSlideTitle(slide, "A Completed File Is Not the Same as a Trusted Record", { width: 1170 });
  addRect(slide, { name: "completed-panel", left: 48, top: 232, width: 440, height: 210, fill: COLORS.neutral50, lineFill: COLORS.neutral200, lineWidth: 1, radius: 12 });
  addLabel(slide, "completed-label", "Completed Document", 84, 266, 360);
  addText(slide, { name: "completed-text", text: "The final content.", left: 84, top: 324, width: 360, height: 60, role: "sectionTitle", fontSize: 30, color: COLORS.darkBlue });
  addRect(slide, { name: "record-panel", left: 584, top: 232, width: 596, height: 210, fill: COLORS.darkBlue, radius: 12 });
  addLabel(slide, "record-label", "Trusted Record", 620, 266, 500, { dark: true });
  addText(slide, { name: "record-text", text: "The final content plus the context and evidence required to understand and verify what happened.", left: 620, top: 316, width: 520, height: 100, role: "sectionTitle", fontSize: 27, color: COLORS.white });
  addLabel(slide, "formula-label", "Trusted Record", 48, 490, 180);
  addText(slide, { name: "formula", text: "Document + Identity + Roles + Decisions + Approvals + Trust Events + Audit History + Evidence", left: 48, top: 526, width: 1132, height: 50, role: "bodyBold", fontSize: 22, color: COLORS.darkBlue, alignment: "center" });
  addTakeaway(slide, "Circularo preserves more than the output. It preserves the chain behind the outcome.", { top: 618, size: 20 });
}

function addEnduringEvidence(slide) {
  addSlideTitle(slide, "The Process Ends. The Value of the Record Does Not.", { dark: true, width: 1180 });
  addFlow(slide, ["Evidence", "Audit", "Archive", "Search", "Retrieve"], { top: 218, dark: true, active: 2, fontSize: 19 });
  const states = ["searchable", "attributable", "permission-controlled", "auditable", "retrievable", "connected to original process context"];
  addLabel(slide, "records-label", "Trusted records can remain", 48, 328, 460, { dark: true });
  states.forEach((item, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const left = 48 + col * 450;
    const top = 370 + row * 50;
    addText(slide, { name: `record-state-${index + 1}`, text: item, left, top, width: 410, height: 34, role: "bodyBold", fontSize: 20, color: COLORS.white });
  });
  addRect(slide, { name: "archive-role", left: 930, top: 328, width: 250, height: 166, fill: COLORS.purple, radius: 12 });
  addLabel(slide, "archive-role-label", "The role of the archive", 958, 358, 194, { dark: true, align: "center", size: 11.5 });
  addText(slide, { name: "archive-role-text", text: "The organization's trusted record of what happened.", left: 958, top: 406, width: 194, height: 72, role: "bodyBold", fontSize: 19, color: COLORS.white, alignment: "center" });
  addText(slide, { name: "future-bridge", text: "Well-governed trusted records also create a stronger foundation for analytics, automation and AI because the underlying context has provenance and evidence.", left: 48, top: 548, width: 1132, height: 62, role: "bodyBold", fontSize: 19.5, color: "#D8C9FF" });
}

function addProgrammableTrust(slide) {
  addSlideTitle(slide, "Unified Trust API · Integrations · Automation", { width: 1160 });
  addText(slide, { name: "programmable-intro", text: "Circularo's trust capabilities should not be confined to users working directly inside Circularo. Enterprise applications and digital services can participate through programmable interfaces.", left: 48, top: 206, width: 520, height: 128, role: "body", fontSize: 20.5, color: COLORS.body });
  const items = [
    ["Unified Trust API", "Expose governed Circularo capabilities through a common integration layer."],
    ["Enterprise Integrations", "Connect business applications, identity systems, trust providers, repositories and enterprise workflows."],
    ["Automation", "Initiate and execute repeatable trusted processes without requiring every step to be performed manually."],
  ];
  items.forEach(([title, body], index) => {
    const top = 334 + index * 90;
    addLabel(slide, `programmable-label-${index + 1}`, title, 48, top, 220);
    addText(slide, { name: `programmable-body-${index + 1}`, text: body, left: 48, top: top + 28, width: 520, height: 58, role: "body", fontSize: 18.5, color: COLORS.body });
  });
  const layers = ["CRM / ERP / DMS / Business Application", "Circularo Unified Trust API", "Workflow · Approval · Identity · Signing · Sealing · Trust Services · Evidence", "Trusted Outcome + Evidence"];
  layers.forEach((label, index) => {
    const top = 212 + index * 102;
    addRect(slide, { name: `api-layer-${index + 1}`, left: 650, top, width: 530, height: index === 2 ? 82 : 70, fill: index === 1 ? COLORS.purple : index % 2 === 0 ? COLORS.darkBlue : COLORS.softPurple, lineFill: index === 3 ? "#C9AEFF" : "none", lineWidth: 1, radius: 10 });
    addText(slide, { name: `api-layer-label-${index + 1}`, text: label, left: 680, top: top + (index === 2 ? 19 : 22), width: 470, height: index === 2 ? 54 : 30, role: "bodyBold", fontSize: index === 2 ? 17.5 : 19, color: index === 1 || index % 2 === 0 ? COLORS.white : COLORS.darkBlue, alignment: "center" });
  });
  addTakeaway(slide, "Circularo makes trust programmable without disconnecting execution from governance and evidence.", { top: 624, size: 19 });
}

function addAiReady(slide) {
  addSlideTitle(slide, "Built for People Today — Ready for Applications, Automation and AI", { dark: true, width: 1180 });
  addFlow(slide, ["Human-operated", "Integrated", "Automated", "AI-assisted"], { top: 238, dark: true, active: 3, fontSize: 19 });
  addText(slide, { name: "ai-architecture", text: "The same trust capabilities can be exposed to applications, integrations and automation through the Unified Trust API.", left: 48, top: 324, width: 1132, height: 48, role: "bodyBold", fontSize: 21, color: COLORS.white });
  addLabel(slide, "ai-can-label", "A foundation for future AI-driven operations", 48, 398, 520, { dark: true });
  const items = ["prepare content", "extract or analyse information", "initiate permitted workflows", "request human approval", "invoke permitted services through integrations", "operate within processes that retain evidence and auditability"];
  items.forEach((item, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const left = 48 + col * 592;
    const top = 438 + row * 48;
    addDivider(slide, { name: `ai-mark-${index + 1}`, left, top: top + 13, width: 18, height: 3, color: "#C9AEFF" });
    addText(slide, { name: `ai-item-${index + 1}`, text: item, left: left + 30, top, width: 520, height: 36, role: "body", fontSize: 18.5, color: COLORS.white });
  });
  addRect(slide, { name: "ai-distinction", left: 48, top: 564, width: 1132, height: 72, fill: COLORS.purple, radius: 10 });
  addText(slide, { name: "ai-distinction-text", text: "AI readiness is an extension of the platform architecture, not the primary SaaS story. Customer-facing claims must reflect approved current capabilities.", left: 82, top: 583, width: 1064, height: 42, role: "bodyBold", fontSize: 18.5, color: COLORS.white, alignment: "center" });
}

function addAdvantage(slide) {
  addSlideTitle(slide, "From Point Solutions to an End-to-End Trust Platform", { width: 1180 });
  addLabel(slide, "fragmented-label", "Fragmented Approach", 48, 214, 470);
  addLabel(slide, "circularo-label", "Circularo SaaS", 648, 214, 532);
  const fragmented = ["Content", "Collaboration tool", "Workflow / approval tool", "eSignature platform", "Storage", "Separate audit fragments"];
  fragmented.forEach((item, index) => {
    const top = 258 + index * 46;
    addText(slide, { name: `fragmented-${index + 1}`, text: item, left: 48 + index * 18, top, width: 460, height: 30, role: "bodyBold", fontSize: 19, color: COLORS.darkBlue });
    if (index < fragmented.length - 1) addDivider(slide, { name: `fragmented-drop-${index + 1}`, left: 64 + index * 18, top: top + 32, width: 3, height: 14, color: COLORS.neutral300 });
  });
  addText(slide, { name: "fragmented-result", text: "Result: fragmented context, fragmented accountability, fragmented evidence.", left: 48, top: 546, width: 500, height: 58, role: "bodyBold", fontSize: 19, color: COLORS.body });
  addFlow(slide, ["Create", "Collaborate", "Review", "Approve"], { left: 648, top: 258, width: 532, number: false, fontSize: 15 });
  addFlow(slide, ["Trust", "Execute", "Evidence", "Record"], { left: 648, top: 338, width: 532, active: 1, number: false, fontSize: 15 });
  addLabel(slide, "connected-label", "Connected through", 648, 428, 532);
  addText(slide, { name: "connected-items", text: "Content + Identity + Authority + Workflow + Trust Services + Evidence + Unified Trust API", left: 648, top: 462, width: 532, height: 74, role: "sectionTitle", fontSize: 24, color: COLORS.darkBlue });
  addText(slide, { name: "connected-result", text: "Result: a continuous, governed and verifiable process.", left: 648, top: 546, width: 532, height: 58, role: "bodyBold", fontSize: 19, color: COLORS.darkBlue });
}

function addClose(slide) {
  addLabel(slide, "close-kicker", "One Platform. One Continuous Evidence Chain.", 48, 118, 720, { dark: true });
  addText(slide, { name: "close-title", text: "Circularo SaaS", left: 48, top: 174, width: 640, height: 80, role: "hero", fontSize: 61, color: COLORS.white });
  addText(slide, { name: "close-proposition", text: "Circularo SaaS connects content, collaboration, identity, workflow, approval, digital signatures, trust services, evidence and trusted records within one end-to-end platform.", left: 48, top: 288, width: 680, height: 120, role: "sectionTitle", fontSize: 28, color: COLORS.white });
  addText(slide, { name: "close-context", text: "From the moment trusted content is created to the moment the resulting record is archived and retrieved, Circularo helps maintain the context required to understand and verify what happened.", left: 48, top: 438, width: 680, height: 100, role: "body", fontSize: 20, color: "#D8C9FF" });
  const steps = ["CREATE", "COLLABORATE", "APPROVE", "TRUST", "EXECUTE", "EVIDENCE", "RECORD"];
  steps.forEach((label, index) => {
    const top = 150 + index * 66;
    addNumber(slide, `close-step-${index + 1}`, String(index + 1).padStart(2, "0"), 836, top, { active: index === 4, dark: true, size: 40 });
    addText(slide, { name: `close-label-${index + 1}`, text: label, left: 902, top: top + 9, width: 276, height: 28, role: "bodyBold", fontSize: 18.5, color: index === 4 ? COLORS.white : "#D8C9FF" });
  });
  addTakeaway(slide, "One platform · One connected process · One continuous evidence chain · One Unified Trust API", { dark: true, top: 608, size: 18.5 });
}

function addSummary(slide) {
  addSlideTitle(slide, "Internal Narrative Summary", { width: 1120 });
  const items = [
    "Fragmented tools fragment accountability and evidence.",
    "Trust starts before the signature.",
    "Circularo connects the end-to-end process.",
    "Trust Orchestration coordinates the required controls and trust mechanisms.",
    "Trusted Execution is the resulting governed and verifiable outcome.",
    "Every execution creates institutional evidence.",
    "Evidence becomes a trusted record rather than merely a stored file.",
    "The Unified Trust API extends the same model into enterprise applications, integrations and automation.",
    "The architecture creates a natural foundation for increasingly AI-driven operations without making Agentic AI the primary SaaS proposition.",
  ];
  items.forEach((item, index) => {
    const col = index < 5 ? 0 : 1;
    const row = col === 0 ? index : index - 5;
    const left = col === 0 ? 48 : 640;
    const top = 214 + row * 78;
    addNumber(slide, `summary-${index + 1}`, String(index + 1).padStart(2, "0"), left, top, { active: index === 4, size: 38 });
    addText(slide, { name: `summary-text-${index + 1}`, text: item, left: left + 56, top: top - 1, width: 524, height: 60, role: "bodyBold", fontSize: 18.5, color: COLORS.darkBlue });
    if (index !== 4 && index !== 8) addDivider(slide, { name: `summary-rule-${index + 1}`, left: left + 56, top: top + 64, width: 524, color: COLORS.neutral200 });
  });
}

function addGuardrails(slide) {
  addSlideTitle(slide, "Internal Positioning Guardrails", { dark: true, width: 1140 });
  addBulletRows(slide, [
    "Electronic signatures remain a core Circularo capability; the narrative expands the context around them.",
    "Do not position Circularo as replacing every enterprise application, identity provider or trust service.",
    "The platform advantage is connection, orchestration, execution and evidence.",
    "Use Trust Orchestration for the platform capability and Trusted Execution for the outcome.",
    "Treat Unified Trust API, integrations and automation as a core part of the SaaS platform story.",
    "Treat Agentic AI readiness as an architectural extension and future-facing advantage, not the main SaaS narrative.",
    "Current product, integration, compliance and AI claims must be validated against canonical approved knowledge before external use.",
  ], { left: 48, top: 214, width: 1132, rowHeight: 58, dark: true, size: 19.5 });
}

async function main() {
  await fs.mkdir(BUILD, { recursive: true });
  const presentation = Presentation.create({ slideSize: CANVAS });
  const specs = [
    { dark: true, build: addCover }, { build: addFragmentation }, { dark: true, build: addBeyondSignatures },
    { build: addTrustChain }, { dark: true, build: addPlatform }, { build: addContent },
    { dark: true, build: addIdentityWorkflow }, { build: addTrustServices }, { dark: true, build: addOrchestrationOutcome },
    { build: addAssurance }, { dark: true, build: addInstitutionalEvidence }, { build: addTrustedRecord },
    { dark: true, build: addEnduringEvidence }, { build: addProgrammableTrust }, { dark: true, build: addAiReady },
    { build: addAdvantage }, { dark: true, build: addClose },
    { eyebrow: "Appendix", build: addSummary }, { dark: true, eyebrow: "Appendix", build: addGuardrails },
  ];

  for (let index = 0; index < specs.length; index += 1) {
    const spec = specs[index];
    const slide = await baseSlide(presentation, index + 1, { dark: spec.dark, eyebrow: spec.eyebrow ?? "Circularo SaaS · Trusted Execution" });
    await spec.build(slide);
  }

  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    await writeBlob(path.join(BUILD, `${stem}.png`), await presentation.export({ slide, format: "png", scale: 1 }));
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(path.join(BUILD, `${stem}.layout.json`), await layout.text());
  }
  await writeBlob(path.join(BUILD, "circularo-saas-end-to-end-trusted-execution-internal-montage.webp"), await presentation.export({ format: "webp", montage: true, scale: 1 }));
  const inspection = await presentation.inspect({ kind: "slide,textbox,shape,image,notes,layout", maxChars: 320000 });
  await fs.writeFile(path.join(BUILD, "circularo-saas-end-to-end-trusted-execution-internal.inspect.ndjson"), inspection.ndjson);
  await (await PresentationFile.exportPptx(presentation)).save(DRAFT);
  console.log(JSON.stringify({ draftPath: DRAFT, slides: presentation.slides.items.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
