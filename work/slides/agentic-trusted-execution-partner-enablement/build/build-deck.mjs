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
const TASK = path.join(ROOT, "work/slides/agentic-trusted-execution-partner-enablement");
const BUILD = path.join(TASK, "build/render");
const OUTPUT = path.join(TASK, "output");
const ICONS = path.join(TASK, "assets/icons");
const SOURCE = "work/ideas/Trusted Execution for the Agentic Era.md";
const BRAND = ".agents/skills/circularo-slides/references/brand-system.md";
const ICON_SOURCE = ".agents/skills/circularo-slides/assets/icons/sovereign/";

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

async function imageBytes(filePath) {
  const bytes = await fs.readFile(filePath);
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

async function addIcon(slide, name, position, alt) {
  slide.images.add({
    blob: await imageBytes(path.join(ICONS, `${name}.png`)),
    contentType: "image/png",
    alt,
    fit: "contain",
    position,
  });
}

function addPartnerMark(slide, dark) {
  addText(slide, {
    name: "partner-enablement-mark",
    text: "INTERNAL & PARTNER ENABLEMENT",
    left: 900,
    top: 34,
    width: 280,
    height: 20,
    role: "chrome",
    fontSize: 12,
    color: dark ? "#C9AEFF" : COLORS.neutral500,
    alignment: "right",
  });
}

async function baseSlide(presentation, pageNumber, spec) {
  const slide = presentation.slides.add();
  const dark = Boolean(spec.dark);
  slide.background.fill = dark ? COLORS.darkBlue : COLORS.white;
  await addChrome(slide, pageNumber, { dark });
  addEyebrow(slide, "Agentic trusted execution · partner enablement", { dark, width: 720 });
  addPartnerMark(slide, dark);
  addSources(slide, [SOURCE, BRAND, ...(spec.icons ? [ICON_SOURCE] : [])]);
  return slide;
}

function addTakeaway(slide, text, { dark = false, top = 610, width = 1100 } = {}) {
  addDivider(slide, {
    name: "takeaway-accent",
    left: MARGIN,
    top: top - 16,
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
    height: 48,
    role: "bodyBold",
    fontSize: 22,
    color: dark ? COLORS.white : COLORS.darkBlue,
  });
}

async function addCover(slide) {
  addText(slide, {
    name: "cover-kicker",
    text: "CIRCULARO PARTNER NARRATIVE",
    left: MARGIN,
    top: 122,
    width: 470,
    height: 28,
    role: "chrome",
    fontSize: 16,
    color: "#C9AEFF",
  });
  addText(slide, {
    name: "cover-title",
    text: "Connecting identity, authority,\nexecution, and evidence across\npeople, applications, and AI agents.",
    left: MARGIN,
    top: 176,
    width: 680,
    height: 220,
    role: "hero",
    fontSize: 43,
    color: COLORS.white,
  });
  addText(slide, {
    name: "cover-subtitle",
    text: "Connecting identity, authority, execution, and evidence across people, applications, and AI agents.",
    left: MARGIN,
    top: 424,
    width: 610,
    height: 76,
    role: "body",
    fontSize: 23,
    color: "#E6DEFF",
  });
  addText(slide, {
    name: "cover-control-chain",
    text: "ACTOR · AUTHORITY · POLICY · APPROVAL · EVIDENCE",
    left: MARGIN,
    top: 574,
    width: 670,
    height: 26,
    role: "chrome",
    fontSize: 14,
    color: "#C9AEFF",
  });

  addText(slide, {
    name: "cover-actors-label",
    text: "AUTHORIZED ACTORS",
    left: 770,
    top: 126,
    width: 390,
    height: 24,
    role: "chrome",
    fontSize: 14,
    color: "#C9AEFF",
    alignment: "center",
  });
  const actorXs = [778, 920, 1062];
  const actors = [
    ["sovereign-kyc", "People"],
    ["sovereign-cloud", "Apps"],
    ["sovereign-ai", "AI agents"],
  ];
  actorXs.forEach((x) => {
    addDivider(slide, { name: `cover-actor-line-${x}`, left: x + 54, top: 262, width: 2, height: 70, color: "#6E51DA" });
  });
  addDivider(slide, { name: "cover-boundary-line", left: 974, top: 410, width: 2, height: 72, color: "#6E51DA" });
  for (let index = 0; index < actors.length; index += 1) {
    const [iconName, label] = actors[index];
    const x = actorXs[index];
    addRect(slide, {
      name: `cover-actor-frame-${index + 1}`,
      left: x,
      top: 170,
      width: 108,
      height: 96,
      fill: COLORS.white,
      radius: 12,
    });
    await addIcon(slide, iconName, { left: x + 30, top: 182, width: 48, height: 48 }, label);
    addText(slide, {
      name: `cover-actor-label-${index + 1}`,
      text: label,
      left: x - 12,
      top: 232,
      width: 132,
      height: 26,
      role: "bodyBold",
      fontSize: 21.5,
      color: COLORS.darkBlue,
      alignment: "center",
    });
  }
  addRect(slide, {
    name: "cover-execution-boundary",
    left: 760,
    top: 330,
    width: 430,
    height: 82,
    fill: COLORS.purple,
    radius: 12,
  });
  addText(slide, {
    name: "cover-boundary-title",
    text: "CIRCULARO TRUSTED EXECUTION LAYER",
    left: 790,
    top: 355,
    width: 370,
    height: 32,
    role: "componentTitle",
    fontSize: 23,
    color: COLORS.white,
    alignment: "center",
  });
  addRect(slide, {
    name: "cover-evidence",
    left: 840,
    top: 482,
    width: 270,
    height: 78,
    fill: COLORS.softPurple,
    lineFill: "#C9AEFF",
    lineWidth: 1,
    radius: 12,
  });
  addText(slide, {
    name: "cover-evidence-title",
    text: "TRUSTED RECORD",
    left: 860,
    top: 507,
    width: 230,
    height: 30,
    role: "bodyBold",
    fontSize: 21.5,
    color: COLORS.darkBlue,
    alignment: "center",
  });
}

function addEvolution(slide) {
  addSlideTitle(slide, "AI is moving from insight to action", { width: 1140 });
  const stages = [
    ["01", "Digital", "Content moves online"],
    ["02", "Automated", "Repeatable work executes"],
    ["03", "AI-assisted", "Systems understand and advise"],
    ["04", "Agentic", "Software initiates action"],
  ];
  addDivider(slide, { name: "evolution-spine", left: 112, top: 344, width: 1056, height: 3, color: COLORS.neutral300 });
  stages.forEach((stage, index) => {
    const left = 58 + index * 302;
    addRect(slide, {
      name: `evolution-node-${index + 1}`,
      left: left + 98,
      top: 310,
      width: 68,
      height: 68,
      fill: index === 3 ? COLORS.purple : COLORS.white,
      lineFill: COLORS.purple,
      lineWidth: 2,
      radius: 34,
    });
    addText(slide, {
      name: `evolution-number-${index + 1}`,
      text: String(index + 1),
      left: left + 112,
      top: 332,
      width: 40,
      height: 26,
      role: "bodyBold",
      fontSize: 21.5,
      color: index === 3 ? COLORS.white : COLORS.darkBlue,
      alignment: "center",
    });
    addText(slide, {
      name: `evolution-title-${index + 1}`,
      text: stage[1],
      left,
      top: 406,
      width: 264,
      height: 36,
      role: "componentTitle",
      fontSize: 25,
      color: index === 3 ? COLORS.purple : COLORS.darkBlue,
      alignment: "center",
    });
    addText(slide, {
      name: `evolution-detail-${index + 1}`,
      text: stage[2],
      left: left + 8,
      top: 456,
      width: 248,
      height: 58,
      role: "body",
      fontSize: 21.5,
      color: COLORS.body,
      alignment: "center",
    });
  });
  addTakeaway(slide, "Once software can initiate trusted work, the control question changes.");
}

function addAuthority(slide) {
  addSlideTitle(slide, "Capability is not authority", { dark: true, width: 1140 });
  addDivider(slide, { name: "authority-divider", left: 630, top: 238, width: 2, height: 318, color: "#6E51DA" });
  addText(slide, {
    name: "authority-capability-label",
    text: "WHAT AI CAN DO",
    left: 72,
    top: 238,
    width: 430,
    height: 26,
    role: "chrome",
    fontSize: 15,
    color: "#C9AEFF",
  });
  addText(slide, {
    name: "authority-capability-list",
    text: "Understand\nAnalyse\nRecommend\nGenerate\nPlan",
    left: 72,
    top: 282,
    width: 430,
    height: 246,
    role: "sectionTitle",
    fontSize: 31,
    color: COLORS.white,
  });
  addText(slide, {
    name: "authority-institution-label",
    text: "WHAT THE INSTITUTION MUST ESTABLISH",
    left: 688,
    top: 238,
    width: 500,
    height: 26,
    role: "chrome",
    fontSize: 15,
    color: "#C9AEFF",
  });
  const questions = [
    "Who or what is acting?",
    "Whose authority does it represent?",
    "What is it permitted to do?",
    "Which approval is required?",
    "What evidence must remain?",
  ];
  questions.forEach((question, index) => {
    const top = 284 + index * 52;
    addRect(slide, { name: `authority-dot-${index + 1}`, left: 690, top: top + 9, width: 10, height: 10, fill: COLORS.purple, radius: 5 });
    addText(slide, {
      name: `authority-question-${index + 1}`,
      text: question,
      left: 720,
      top,
      width: 460,
      height: 38,
      role: "body",
      fontSize: 22,
      color: COLORS.white,
    });
  });
  addTakeaway(slide, "AI may propose an action. Institutional authority determines whether it may execute.", { dark: true });
}

function addFragmentation(slide) {
  addSlideTitle(slide, "Disconnected handoffs create accountability gaps", { width: 1140 });
  const stages = ["Create", "Review", "Approve", "Sign", "Store", "Analyse"];
  addDivider(slide, { name: "fragmented-spine", left: 84, top: 328, width: 1112, height: 3, color: COLORS.neutral300 });
  stages.forEach((stage, index) => {
    const left = 68 + index * 194;
    addRect(slide, {
      name: `fragment-stage-${index + 1}`,
      left,
      top: 288,
      width: 136,
      height: 78,
      fill: index % 2 === 0 ? COLORS.softPurple : COLORS.white,
      lineFill: index % 2 === 0 ? "#D6C1FF" : COLORS.neutral300,
      lineWidth: 1,
      radius: 12,
    });
    addText(slide, {
      name: `fragment-label-${index + 1}`,
      text: stage,
      left,
      top: 314,
      width: 136,
      height: 30,
      role: "componentTitle",
      fontSize: 23,
      color: COLORS.darkBlue,
      alignment: "center",
    });
    if (index < stages.length - 1) {
      addText(slide, {
        name: `fragment-gap-${index + 1}`,
        text: "//",
        left: left + 146,
        top: 310,
        width: 38,
        height: 34,
        role: "sectionTitle",
        fontSize: 24,
        color: COLORS.purple,
        alignment: "center",
      });
    }
  });
  const questions = [
    "Which version was authoritative?",
    "Who had permission to decide?",
    "Can the complete chain be proven?",
  ];
  questions.forEach((question, index) => {
    const left = 72 + index * 392;
    addText(slide, {
      name: `fragment-question-${index + 1}`,
      text: question,
      left,
      top: 438,
      width: 350,
      height: 66,
      role: "bodyBold",
      fontSize: 21.5,
      color: index === 1 ? COLORS.purple : COLORS.darkBlue,
      alignment: "center",
    });
  });
  addTakeaway(slide, "The future requirement is a continuous trust and evidence chain—not another isolated tool.");
}

function addFiveQuestions(slide) {
  addSlideTitle(slide, "Every trusted action must answer five questions", { width: 1140 });
  const rows = [
    ["ACTOR", "Who or what is acting?"],
    ["AUTHORITY", "On whose authority does the action proceed?"],
    ["POLICY", "What is permitted—and under which conditions?"],
    ["APPROVAL", "Which decision or human gate is required?"],
    ["EVIDENCE", "What must remain provable afterwards?"],
  ];
  addDivider(slide, { name: "questions-rail", left: 92, top: 242, width: 4, height: 304, color: COLORS.purple });
  rows.forEach((row, index) => {
    const top = 226 + index * 70;
    addRect(slide, {
      name: `question-node-${index + 1}`,
      left: 66,
      top,
      width: 56,
      height: 56,
      fill: index === 4 ? COLORS.purple : COLORS.white,
      lineFill: COLORS.purple,
      lineWidth: 2,
      radius: 28,
    });
    addText(slide, {
      name: `question-number-${index + 1}`,
      text: String(index + 1),
      left: 80,
      top: top + 15,
      width: 28,
      height: 28,
      role: "bodyBold",
      fontSize: 21.5,
      color: index === 4 ? COLORS.white : COLORS.darkBlue,
      alignment: "center",
    });
    addText(slide, {
      name: `question-label-${index + 1}`,
      text: row[0],
      left: 154,
      top: top + 12,
      width: 210,
      height: 30,
      role: "chrome",
      fontSize: 16,
      color: COLORS.purple,
    });
    addText(slide, {
      name: `question-copy-${index + 1}`,
      text: row[1],
      left: 360,
      top: top + 7,
      width: 780,
      height: 42,
      role: "componentTitle",
      fontSize: 24,
      color: COLORS.darkBlue,
    });
  });
  addTakeaway(slide, "Control becomes explicit when these answers travel with the action.");
}

function addLifecycle(slide) {
  addSlideTitle(slide, "Trust begins before the signature", { width: 1140 });
  const phases = [
    ["CREATE", "Create + collaborate"],
    ["DECIDE", "Review + approve"],
    ["AUTHORIZE", "Sign + seal"],
    ["PRESERVE", "Evidence + archive"],
    ["REUSE", "Retrieve + analyse + act"],
  ];
  addDivider(slide, { name: "lifecycle-spine", left: 88, top: 350, width: 1104, height: 4, color: COLORS.neutral300 });
  phases.forEach((phase, index) => {
    const left = 54 + index * 240;
    addRect(slide, {
      name: `lifecycle-node-${index + 1}`,
      left: left + 78,
      top: 316,
      width: 68,
      height: 68,
      fill: index === 2 ? COLORS.purple : COLORS.darkBlue,
      radius: 34,
    });
    addText(slide, {
      name: `lifecycle-phase-${index + 1}`,
      text: phase[0],
      left,
      top: 252,
      width: 224,
      height: 28,
      role: "chrome",
      fontSize: 16,
      color: index === 2 ? COLORS.purple : COLORS.darkBlue,
      alignment: "center",
    });
    addText(slide, {
      name: `lifecycle-index-${index + 1}`,
      text: String(index + 1),
      left: left + 96,
      top: 337,
      width: 32,
      height: 28,
      role: "bodyBold",
      fontSize: 21.5,
      color: COLORS.white,
      alignment: "center",
    });
    addText(slide, {
      name: `lifecycle-detail-${index + 1}`,
      text: phase[1],
      left,
      top: 418,
      width: 224,
      height: 70,
      role: "bodyBold",
      fontSize: 21.5,
      color: COLORS.darkBlue,
      alignment: "center",
    });
  });
  addTakeaway(slide, "The signature is an important trust event. It is not the entire trust model.");
}

function addExecutionBoundary(slide) {
  addSlideTitle(slide, "Circularo creates the institutional execution boundary", { dark: true, width: 1140 });
  const actors = ["People", "External parties", "Organizations", "Applications", "AI agents"];
  actors.forEach((actor, index) => {
    const left = 50 + index * 238;
    addText(slide, {
      name: `boundary-actor-${index + 1}`,
      text: actor,
      left,
      top: 232,
      width: 220,
      height: 34,
      role: "bodyBold",
      fontSize: 21.5,
      color: "#E6DEFF",
      alignment: "center",
    });
    addDivider(slide, { name: `boundary-actor-line-${index + 1}`, left: left + 109, top: 274, width: 2, height: 58, color: "#6E51DA" });
  });
  addRect(slide, {
    name: "boundary-layer",
    left: 112,
    top: 332,
    width: 1056,
    height: 92,
    fill: COLORS.purple,
    radius: 12,
  });
  addText(slide, {
    name: "boundary-layer-title",
    text: "CIRCULARO TRUSTED EXECUTION LAYER",
    left: 250,
    top: 354,
    width: 780,
    height: 38,
    role: "sectionTitle",
    fontSize: 29,
    color: COLORS.white,
    alignment: "center",
  });
  addText(slide, {
    name: "boundary-controls",
    text: "IDENTITY · AUTHORITY · POLICY · APPROVAL · EXECUTION · EVIDENCE",
    left: 180,
    top: 398,
    width: 920,
    height: 24,
    role: "chrome",
    fontSize: 14,
    color: COLORS.white,
    alignment: "center",
  });
  addDivider(slide, { name: "boundary-result-line-left", left: 376, top: 424, width: 2, height: 66, color: "#6E51DA" });
  addDivider(slide, { name: "boundary-result-line-right", left: 904, top: 424, width: 2, height: 66, color: "#6E51DA" });
  addText(slide, {
    name: "boundary-action",
    text: "TRUSTED BUSINESS ACTION",
    left: 112,
    top: 500,
    width: 528,
    height: 42,
    role: "componentTitle",
    fontSize: 23,
    color: COLORS.white,
    alignment: "center",
  });
  addText(slide, {
    name: "boundary-record",
    text: "TRUSTED RECORD + INSTITUTIONAL EVIDENCE",
    left: 640,
    top: 500,
    width: 528,
    height: 42,
    role: "componentTitle",
    fontSize: 23,
    color: COLORS.white,
    alignment: "center",
  });
  addTakeaway(slide, "The institution governs what may execute and what must remain provable.", { dark: true });
}

async function addCapabilities(slide) {
  addSlideTitle(slide, "Six capabilities operate as one governed environment", { width: 1140 });
  const leftCapabilities = [
    ["sovereign-cloud", "Cloud", "Control where the environment operates"],
    ["sovereign-kyc", "Identity", "Establish who or what is acting"],
    ["sovereign-collab", "Collaboration", "Create, review, and approve content"],
  ];
  const rightCapabilities = [
    ["sovereign-sign", "Sign & Seal", "Apply personal or organizational authority"],
    ["sovereign-vault", "DMS / Vault", "Preserve records, evidence, and history"],
    ["sovereign-ai", "AI", "Apply intelligence and governed action"],
  ];
  [250, 372, 494].forEach((top, index) => {
    addDivider(slide, { name: `capability-line-left-${index + 1}`, left: 374, top: top + 42, width: 126, height: 2, color: COLORS.neutral300 });
    addDivider(slide, { name: `capability-line-right-${index + 1}`, left: 780, top: top + 42, width: 126, height: 2, color: COLORS.neutral300 });
  });
  addRect(slide, {
    name: "capability-core",
    left: 500,
    top: 304,
    width: 280,
    height: 218,
    fill: COLORS.purple,
    radius: 18,
  });
  addText(slide, {
    name: "capability-core-title",
    text: "ONE GOVERNED\nENVIRONMENT",
    left: 515,
    top: 330,
    width: 250,
    height: 74,
    role: "sectionTitle",
    fontSize: 24,
    color: COLORS.white,
    alignment: "center",
  });
  addText(slide, {
    name: "capability-core-detail",
    text: "One platform\nOne governance model\nOne evidence chain\nOne API",
    left: 530,
    top: 410,
    width: 220,
    height: 104,
    role: "body",
    fontSize: 21.5,
    color: COLORS.white,
    alignment: "center",
  });
  for (let index = 0; index < 3; index += 1) {
    const top = 236 + index * 122;
    const leftSpec = leftCapabilities[index];
    const rightSpec = rightCapabilities[index];
    await addIcon(slide, leftSpec[0], { left: 62, top, width: 62, height: 62 }, leftSpec[1]);
    addText(slide, {
      name: `capability-left-title-${index + 1}`,
      text: leftSpec[1],
      left: 144,
      top: top + 2,
      width: 220,
      height: 30,
      role: "componentTitle",
      fontSize: 24,
      color: COLORS.darkBlue,
    });
    addText(slide, {
      name: `capability-left-detail-${index + 1}`,
      text: leftSpec[2],
      left: 144,
      top: top + 36,
      width: 240,
      height: 54,
      role: "body",
      fontSize: 21.5,
      color: COLORS.body,
    });
    await addIcon(slide, rightSpec[0], { left: 914, top, width: 62, height: 62 }, rightSpec[1]);
    addText(slide, {
      name: `capability-right-title-${index + 1}`,
      text: rightSpec[1],
      left: 996,
      top: top + 2,
      width: 220,
      height: 30,
      role: "componentTitle",
      fontSize: 24,
      color: COLORS.darkBlue,
    });
    addText(slide, {
      name: `capability-right-detail-${index + 1}`,
      text: rightSpec[2],
      left: 996,
      top: top + 36,
      width: 230,
      height: 54,
      role: "body",
      fontSize: 21.5,
      color: COLORS.body,
    });
  }
  addTakeaway(slide, "The capabilities stay connected through one governance and evidence model.", { top: 626 });
}

function addAssurance(slide) {
  addSlideTitle(slide, "Assurance should match the significance of the action", { width: 1140 });
  const pillars = [
    ["01", "Workflow assurance", "Was the correct process followed—and was the right approval obtained?", "Approval + process history"],
    ["02", "Personal assurance", "Who personally authorized or signed—and at what identity assurance?", "Identity + signature"],
    ["03", "Organizational assurance", "Did this officially originate from the organization?", "Seal + integrity evidence"],
  ];
  pillars.forEach((pillar, index) => {
    const left = 60 + index * 398;
    addText(slide, {
      name: `assurance-number-${index + 1}`,
      text: pillar[0],
      left,
      top: 230,
      width: 70,
      height: 40,
      role: "sectionTitle",
      fontSize: 28,
      color: COLORS.purple,
    });
    addDivider(slide, { name: `assurance-rule-${index + 1}`, left, top: 284, width: 340, height: 4, color: index === 1 ? COLORS.purple : COLORS.darkBlue });
    addText(slide, {
      name: `assurance-title-${index + 1}`,
      text: pillar[1],
      left,
      top: 316,
      width: 340,
      height: 70,
      role: "sectionTitle",
      fontSize: 27,
      color: COLORS.darkBlue,
    });
    addText(slide, {
      name: `assurance-question-${index + 1}`,
      text: pillar[2],
      left,
      top: 402,
      width: 340,
      height: 98,
      role: "body",
      fontSize: 21.5,
      color: COLORS.body,
    });
    addText(slide, {
      name: `assurance-evidence-${index + 1}`,
      text: pillar[3],
      left,
      top: 520,
      width: 340,
      height: 34,
      role: "bodyBold",
      fontSize: 21.5,
      color: COLORS.purple,
    });
  });
  addTakeaway(slide, "The right combination depends on the action, market, and required level of assurance.");
}

function addEvidenceRecord(slide) {
  addSlideTitle(slide, "The output is a verifiable record—not just a PDF", { width: 1140 });
  const leftItems = ["Authoritative version", "Identities", "Roles", "Approvals"];
  const rightItems = ["Signatures + seals", "Timestamps", "Audit events", "Retention metadata"];
  leftItems.forEach((item, index) => {
    const top = 264 + index * 66;
    addDivider(slide, { name: `record-line-left-${index + 1}`, left: 384, top: top + 14, width: 130, height: 2, color: COLORS.neutral300 });
    addText(slide, {
      name: `record-item-left-${index + 1}`,
      text: item,
      left: 74,
      top,
      width: 290,
      height: 34,
      role: "bodyBold",
      fontSize: 21.5,
      color: COLORS.darkBlue,
      alignment: "right",
    });
  });
  rightItems.forEach((item, index) => {
    const top = 264 + index * 66;
    addDivider(slide, { name: `record-line-right-${index + 1}`, left: 766, top: top + 14, width: 130, height: 2, color: COLORS.neutral300 });
    addText(slide, {
      name: `record-item-right-${index + 1}`,
      text: item,
      left: 916,
      top,
      width: 290,
      height: 34,
      role: "bodyBold",
      fontSize: 21.5,
      color: COLORS.darkBlue,
    });
  });
  addRect(slide, {
    name: "record-core",
    left: 514,
    top: 238,
    width: 252,
    height: 300,
    fill: COLORS.purple,
    radius: 16,
  });
  addText(slide, {
    name: "record-core-title",
    text: "TRUSTED\nRECORD",
    left: 546,
    top: 326,
    width: 188,
    height: 82,
    role: "sectionTitle",
    fontSize: 32,
    color: COLORS.white,
    alignment: "center",
  });
  addText(slide, {
    name: "record-core-detail",
    text: "Verifiable institutional evidence",
    left: 540,
    top: 438,
    width: 200,
    height: 72,
    role: "bodyBold",
    fontSize: 21.5,
    color: COLORS.white,
    alignment: "center",
  });
  addTakeaway(slide, "A completed transaction becomes durable institutional evidence.");
}

function addTrustedContext(slide) {
  addSlideTitle(slide, "Institutional evidence becomes governed AI context", { width: 1140 });
  addRect(slide, {
    name: "context-records",
    left: 58,
    top: 292,
    width: 242,
    height: 156,
    fill: COLORS.softPurple,
    lineFill: "#D6C1FF",
    lineWidth: 1,
    radius: 14,
  });
  addText(slide, {
    name: "context-records-title",
    text: "TRUSTED\nRECORDS",
    left: 88,
    top: 330,
    width: 182,
    height: 70,
    role: "sectionTitle",
    fontSize: 28,
    color: COLORS.darkBlue,
    alignment: "center",
  });
  addText(slide, {
    name: "context-arrow-one",
    text: "→",
    left: 320,
    top: 338,
    width: 72,
    height: 54,
    role: "sectionTitle",
    fontSize: 38,
    color: COLORS.purple,
    alignment: "center",
  });
  addRect(slide, {
    name: "context-trusted-context",
    left: 410,
    top: 292,
    width: 242,
    height: 156,
    fill: COLORS.darkBlue,
    radius: 14,
  });
  addText(slide, {
    name: "context-trusted-context-title",
    text: "TRUSTED\nAI CONTEXT",
    left: 440,
    top: 330,
    width: 182,
    height: 70,
    role: "sectionTitle",
    fontSize: 28,
    color: COLORS.white,
    alignment: "center",
  });
  addRect(slide, {
    name: "context-governance",
    left: 690,
    top: 292,
    width: 210,
    height: 156,
    fill: COLORS.purple,
    radius: 14,
  });
  addText(slide, {
    name: "context-governance-title",
    text: "POLICY · PERMISSIONS\nPROVENANCE · AUDIT",
    left: 710,
    top: 334,
    width: 170,
    height: 78,
    role: "bodyBold",
    fontSize: 21.5,
    color: COLORS.white,
    alignment: "center",
  });
  addText(slide, {
    name: "context-arrow-two",
    text: "→",
    left: 918,
    top: 338,
    width: 62,
    height: 54,
    role: "sectionTitle",
    fontSize: 38,
    color: COLORS.purple,
    alignment: "center",
  });
  const outcomes = [
    ["KNOW", "Extract · classify · retrieve"],
    ["ADVISE", "Obligations · risks · recommendations"],
    ["ACT", "Workflows · approvals · permitted actions"],
  ];
  outcomes.forEach((outcome, index) => {
    const top = 232 + index * 104;
    addText(slide, {
      name: `context-outcome-label-${index + 1}`,
      text: outcome[0],
      left: 990,
      top,
      width: 210,
      height: 32,
      role: "componentTitle",
      fontSize: 24,
      color: index === 2 ? COLORS.purple : COLORS.darkBlue,
    });
    addText(slide, {
      name: `context-outcome-detail-${index + 1}`,
      text: outcome[1],
      left: 990,
      top: top + 38,
      width: 220,
      height: 58,
      role: "body",
      fontSize: 21.5,
      color: COLORS.body,
    });
  });
  addTakeaway(slide, "Trusted records give AI verified, permission-controlled, attributable context.");
}

function addAgentBoundary(slide) {
  addSlideTitle(slide, "Agents can prepare, initiate, or execute—but authority decides how far", { dark: true, width: 1140 });
  const lanes = [
    ["PREPARE", "Draft · classify · recommend", "Inside policy"],
    ["INITIATE", "Start workflow · request approval", "Delegated mandate"],
    ["EXECUTE", "Invoke trust service · commit action", "Approval + evidence gate"],
  ];
  lanes.forEach((lane, index) => {
    const top = 250 + index * 112;
    addRect(slide, {
      name: `agent-lane-${index + 1}`,
      left: MARGIN,
      top,
      width: 1184,
      height: 86,
      fill: index === 2 ? COLORS.purple : "#2A129B",
      lineFill: "#6E51DA",
      lineWidth: 1,
      radius: 12,
    });
    addText(slide, {
      name: `agent-lane-title-${index + 1}`,
      text: lane[0],
      left: 82,
      top: top + 24,
      width: 180,
      height: 32,
      role: "componentTitle",
      fontSize: 24,
      color: "#C9AEFF",
    });
    addText(slide, {
      name: `agent-lane-actions-${index + 1}`,
      text: lane[1],
      left: 300,
      top: top + 24,
      width: 510,
      height: 34,
      role: "bodyBold",
      fontSize: 22,
      color: COLORS.white,
    });
    addText(slide, {
      name: `agent-lane-gate-${index + 1}`,
      text: lane[2],
      left: 846,
      top: top + 24,
      width: 330,
      height: 34,
      role: "body",
      fontSize: 21.5,
      color: COLORS.white,
      alignment: "right",
    });
  });
  addTakeaway(slide, "Circularo governs what the agent may do, what executes, and what evidence remains.", { dark: true });
}

function addPartnerEngagement(slide) {
  addSlideTitle(slide, "Partners can make trusted execution repeatable", { width: 1140 });
  const steps = [
    ["01", "Select the action", "Which outcome matters?", "Outcome + actor"],
    ["02", "Define authority", "Who may decide?", "Mandate + approval"],
    ["03", "Design the trust path", "Which controls apply?", "Services + workflow"],
    ["04", "Prove the outcome", "What must remain?", "Evidence + record"],
  ];
  addDivider(slide, { name: "partner-spine", left: 112, top: 326, width: 1056, height: 4, color: COLORS.neutral300 });
  steps.forEach((step, index) => {
    const left = 60 + index * 302;
    addRect(slide, {
      name: `partner-node-${index + 1}`,
      left: left + 88,
      top: 290,
      width: 72,
      height: 72,
      fill: index === 3 ? COLORS.purple : COLORS.white,
      lineFill: COLORS.purple,
      lineWidth: 2,
      radius: 36,
    });
    addText(slide, {
      name: `partner-number-${index + 1}`,
      text: step[0],
      left: left + 102,
      top: 312,
      width: 44,
      height: 28,
      role: "bodyBold",
      fontSize: 21.5,
      color: index === 3 ? COLORS.white : COLORS.darkBlue,
      alignment: "center",
    });
    addText(slide, {
      name: `partner-title-${index + 1}`,
      text: step[1],
      left,
      top: 394,
      width: 248,
      height: 66,
      role: "componentTitle",
      fontSize: 24,
      color: COLORS.darkBlue,
      alignment: "center",
    });
    addText(slide, {
      name: `partner-question-${index + 1}`,
      text: step[2],
      left,
      top: 470,
      width: 248,
      height: 48,
      role: "body",
      fontSize: 21.5,
      color: COLORS.body,
      alignment: "center",
    });
    addText(slide, {
      name: `partner-output-${index + 1}`,
      text: step[3],
      left,
      top: 532,
      width: 248,
      height: 34,
      role: "bodyBold",
      fontSize: 21.5,
      color: COLORS.purple,
      alignment: "center",
    });
  });
  addTakeaway(slide, "Lead with one trusted action, then design authority, controls, and evidence around it.");
}

function addClose(slide) {
  addText(slide, {
    name: "close-kicker",
    text: "THE CIRCULARO PROPOSITION",
    left: MARGIN,
    top: 130,
    width: 430,
    height: 28,
    role: "chrome",
    fontSize: 16,
    color: "#C9AEFF",
  });
  addText(slide, {
    name: "close-title",
    text: "Govern what executes.",
    left: MARGIN,
    top: 210,
    width: 1080,
    height: 90,
    role: "hero",
    fontSize: 64,
    color: COLORS.white,
  });
  addText(slide, {
    name: "close-subtitle",
    text: "Connect people, organizations, applications, and AI agents to trusted business actions through one governed execution environment.",
    left: MARGIN,
    top: 342,
    width: 1110,
    height: 92,
    role: "bodyBold",
    fontSize: 24,
    color: COLORS.white,
  });
  const commitments = ["ONE PLATFORM", "ONE GOVERNANCE MODEL", "ONE EVIDENCE CHAIN", "ONE API"];
  commitments.forEach((commitment, index) => {
    const left = 48 + index * 296;
    addDivider(slide, { name: `close-rule-${index + 1}`, left, top: 500, width: 248, height: 3, color: index === 3 ? COLORS.purple : "#6E51DA" });
    addText(slide, {
      name: `close-commitment-${index + 1}`,
      text: commitment,
      left,
      top: 522,
      width: 248,
      height: 56,
      role: "bodyBold",
      fontSize: 21.5,
      color: index === 3 ? "#C9AEFF" : COLORS.white,
    });
  });
  addText(slide, {
    name: "close-action",
    text: "Start with one trusted action.",
    left: MARGIN,
    top: 620,
    width: 900,
    height: 42,
    role: "componentTitle",
    fontSize: 24,
    color: "#C9AEFF",
  });
}

const slides = [
  { kind: "cover", dark: true, icons: true },
  { kind: "evolution" },
  { kind: "authority", dark: true },
  { kind: "fragmentation" },
  { kind: "five-questions" },
  { kind: "lifecycle" },
  { kind: "execution-boundary", dark: true },
  { kind: "capabilities", icons: true },
  { kind: "assurance" },
  { kind: "evidence-record" },
  { kind: "trusted-context" },
  { kind: "agent-boundary", dark: true },
  { kind: "partner-engagement" },
  { kind: "close", dark: true },
];

async function renderSlide(presentation, spec, pageNumber) {
  const slide = await baseSlide(presentation, pageNumber, spec);
  switch (spec.kind) {
    case "cover": await addCover(slide); break;
    case "evolution": addEvolution(slide); break;
    case "authority": addAuthority(slide); break;
    case "fragmentation": addFragmentation(slide); break;
    case "five-questions": addFiveQuestions(slide); break;
    case "lifecycle": addLifecycle(slide); break;
    case "execution-boundary": addExecutionBoundary(slide); break;
    case "capabilities": await addCapabilities(slide); break;
    case "assurance": addAssurance(slide); break;
    case "evidence-record": addEvidenceRecord(slide); break;
    case "trusted-context": addTrustedContext(slide); break;
    case "agent-boundary": addAgentBoundary(slide); break;
    case "partner-engagement": addPartnerEngagement(slide); break;
    case "close": addClose(slide); break;
    default: throw new Error(`Unknown slide kind: ${spec.kind}`);
  }
}

async function main() {
  await fs.mkdir(BUILD, { recursive: true });
  await fs.mkdir(OUTPUT, { recursive: true });
  const presentation = Presentation.create({ slideSize: CANVAS });
  for (let index = 0; index < slides.length; index += 1) {
    await renderSlide(presentation, slides[index], index + 1);
  }
  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    await writeBlob(path.join(BUILD, `${stem}.png`), await presentation.export({ slide, format: "png", scale: 1 }));
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(path.join(BUILD, `${stem}.layout.json`), await layout.text());
  }
  await writeBlob(path.join(BUILD, "agentic-trusted-execution-partner-enablement-montage.webp"), await presentation.export({ format: "webp", montage: true, scale: 1 }));
  const inspection = await presentation.inspect({ kind: "slide,textbox,shape,image,notes", maxChars: 50000 });
  await fs.writeFile(path.join(BUILD, "agentic-trusted-execution-partner-enablement.inspect.ndjson"), inspection.ndjson);
  const finalPath = path.join(OUTPUT, "agentic-trusted-execution-partner-enablement.pptx");
  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(finalPath);
  console.log(JSON.stringify({ finalPath, slides: slides.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
