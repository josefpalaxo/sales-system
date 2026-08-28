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
const TASK = path.join(ROOT, "work/slides/trusted-execution-agentic-era");
const BUILD = path.join(TASK, "build/render");
const OUTPUT = path.join(TASK, "output");
const SOURCE = "work/ideas/Trusted Execution for the Agentic Era.md";
const BRAND = ".agents/skills/circularo-slides/references/brand-system.md";
const ASSETS = {
  cover: path.join(TASK, "assets/trust-boundary-cover.png"),
  fragmented: path.join(TASK, "assets/fragmented-accountability.png"),
  context: path.join(TASK, "assets/trusted-context-action.png"),
  flywheel: path.join(TASK, "assets/trusted-execution-flywheel.png"),
};

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

async function imageBytes(filePath) {
  const bytes = await fs.readFile(filePath);
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

async function addImage(slide, filePath, position, { fit = "cover", alt = "Abstract Circularo visual" } = {}) {
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
    name: "internal-working-mark",
    text: "INTERNAL WORKING PRESENTATION",
    left: 930,
    top: 34,
    width: 250,
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
  if (spec.backgroundImage) {
    await addImage(slide, spec.backgroundImage, { left: 0, top: 0, width: CANVAS.width, height: CANVAS.height }, {
      alt: spec.backgroundAlt,
    });
  }
  await addChrome(slide, pageNumber, { dark });
  addEyebrow(slide, "Trusted execution for the agentic era", { dark, width: 720 });
  addInternalMark(slide, dark);
  addSources(slide, [SOURCE, BRAND, ...(spec.assetSource ? [spec.assetSource] : [])]);
  return slide;
}

function addBottomLine(slide, text, { dark = false, top = 608, width = 1080 } = {}) {
  addDivider(slide, {
    name: "bottom-accent-line",
    left: MARGIN,
    top: top - 16,
    width: 192,
    height: 3,
    color: COLORS.purple,
  });
  addText(slide, {
    name: "bottom-takeaway",
    text,
    left: MARGIN,
    top,
    width,
    height: 54,
    role: "bodyBold",
    color: dark ? COLORS.white : COLORS.darkBlue,
  });
}

function addCover(slide) {
  addText(slide, {
    name: "cover-kicker",
    text: "CIRCULARO",
    left: MARGIN,
    top: 118,
    width: 420,
    height: 28,
    role: "chrome",
    fontSize: 16,
    color: "#C9AEFF",
  });
  addText(slide, {
    name: "cover-title",
    text: "Trusted Execution\nfor the Agentic Era",
    left: MARGIN,
    top: 172,
    width: 650,
    height: 190,
    role: "hero",
    fontSize: 62,
    color: COLORS.white,
  });
  addText(slide, {
    name: "cover-subtitle",
    text: "Govern what agents are permitted to do, what actually executes, and what evidence remains.",
    left: MARGIN,
    top: 398,
    width: 590,
    height: 104,
    role: "body",
    fontSize: 24,
    color: "#E6DEFF",
  });
  addText(slide, {
    name: "cover-control-chain",
    text: "ACTOR · AUTHORITY · POLICY · APPROVAL · EVIDENCE",
    left: MARGIN,
    top: 574,
    width: 690,
    height: 26,
    role: "chrome",
    fontSize: 14,
    color: "#C9AEFF",
  });
}

function addEvolution(slide) {
  addSlideTitle(slide, "Autonomy is rising. Control must become explicit.", { width: 1140 });
  const stages = [
    ["Digital", "Content moves online"],
    ["Automated", "Repeatable work executes"],
    ["AI-assisted", "Systems understand and advise"],
    ["Agentic", "Software initiates action"],
  ];
  const left = 74;
  const top = 274;
  const gap = 26;
  const width = 270;
  addDivider(slide, { name: "evolution-line", left: 112, top: 334, width: 1048, height: 3, color: COLORS.neutral300 });
  stages.forEach((stage, index) => {
    const x = left + index * (width + gap);
    addRect(slide, {
      name: `evolution-node-${index + 1}`,
      left: x + 86,
      top: top + 34,
      width: 64,
      height: 64,
      fill: index === 3 ? COLORS.purple : COLORS.softPurple,
      lineFill: COLORS.purple,
      lineWidth: 2,
      radius: 32,
    });
    addText(slide, {
      name: `evolution-number-${index + 1}`,
      text: `0${index + 1}`,
      left: x + 96,
      top: top + 51,
      width: 44,
      height: 26,
      role: "bodyBold",
      color: index === 3 ? COLORS.white : COLORS.darkBlue,
      alignment: "center",
    });
    addText(slide, {
      name: `evolution-title-${index + 1}`,
      text: stage[0],
      left: x,
      top: 402,
      width,
      height: 42,
      role: "componentTitle",
      fontSize: 25,
      color: COLORS.darkBlue,
      alignment: "center",
    });
    addText(slide, {
      name: `evolution-detail-${index + 1}`,
      text: stage[1],
      left: x + 10,
      top: 456,
      width: width - 20,
      height: 62,
      role: "body",
      fontSize: 20,
      color: COLORS.body,
      alignment: "center",
    });
  });
  addBottomLine(slide, "Greater autonomy must be matched by stronger institutional control.");
}

function addAuthorityGap(slide) {
  addSlideTitle(slide, "Intelligence does not create institutional authority", { dark: true, width: 1140 });
  addText(slide, {
    name: "capability-label",
    text: "WHAT AI CAN DO",
    left: MARGIN,
    top: 240,
    width: 350,
    height: 26,
    role: "chrome",
    color: "#C9AEFF",
  });
  addText(slide, {
    name: "capability-list",
    text: "Understand\nAnalyse\nRecommend\nGenerate\nPlan",
    left: MARGIN,
    top: 290,
    width: 380,
    height: 260,
    role: "sectionTitle",
    fontSize: 31,
    color: COLORS.white,
  });
  addDivider(slide, { name: "authority-divider", left: 474, top: 238, width: 3, height: 330, color: "#6E51DA" });
  addText(slide, {
    name: "authority-label",
    text: "WHAT THE INSTITUTION MUST ESTABLISH",
    left: 536,
    top: 240,
    width: 600,
    height: 26,
    role: "chrome",
    color: "#C9AEFF",
  });
  const questions = [
    "Who or what is acting?",
    "Whom does the actor represent?",
    "What is the actor permitted to do?",
    "Which policy and approval apply?",
    "What evidence will remain?",
  ];
  questions.forEach((question, index) => {
    const y = 296 + index * 58;
    addRect(slide, { name: `question-dot-${index + 1}`, left: 536, top: y + 10, width: 10, height: 10, fill: COLORS.purple, radius: 10 });
    addText(slide, {
      name: `question-${index + 1}`,
      text: question,
      left: 568,
      top: y,
      width: 600,
      height: 44,
      role: "body",
      fontSize: 23,
      color: COLORS.white,
    });
  });
  addBottomLine(slide, "Capability can propose an action. Authority determines whether it may execute.", { dark: true });
}

async function addFragmentation(slide) {
  addSlideTitle(slide, "Fragmented tools fragment accountability", { width: 1140 });
  addText(slide, {
    name: "fragmentation-copy",
    text: "Drafting, review, approval, signing, records, and AI often live in separate environments. Each handoff can detach the final record from the decisions that produced it.",
    left: MARGIN,
    top: 234,
    width: 408,
    height: 166,
    role: "body",
    fontSize: 23,
    color: COLORS.body,
  });
  addText(slide, {
    name: "fragmentation-questions",
    text: "Which version was authoritative?\nWho was permitted to decide?\nWhat exactly was approved?\nCan the complete chain be proven?",
    left: MARGIN,
    top: 432,
    width: 420,
    height: 154,
    role: "bodyBold",
    fontSize: 21,
    color: COLORS.darkBlue,
  });
  await addImage(slide, ASSETS.fragmented, { left: 506, top: 214, width: 726, height: 402 }, {
    alt: "Abstract disconnected islands representing fragmented accountability",
  });
}

function addLifecycle(slide) {
  addSlideTitle(slide, "Trust starts before the signature", { width: 1140 });
  addText(slide, {
    name: "lifecycle-subtitle",
    text: "The evidence chain begins when consequential content is created and continues throughout its lifecycle.",
    left: MARGIN,
    top: 204,
    width: 1040,
    height: 58,
    role: "body",
    color: COLORS.body,
  });
  const stages = ["Create", "Collaborate", "Review", "Approve", "Sign / seal", "Evidence", "Preserve", "Analyse", "Act"];
  const gap = 12;
  const width = (1184 - gap * (stages.length - 1)) / stages.length;
  addDivider(slide, { name: "lifecycle-line", left: 64, top: 368, width: 1152, height: 3, color: COLORS.neutral300 });
  stages.forEach((stage, index) => {
    const x = MARGIN + index * (width + gap);
    addRect(slide, {
      name: `lifecycle-node-${index + 1}`,
      left: x + width / 2 - 14,
      top: 355,
      width: 28,
      height: 28,
      fill: index === 4 ? COLORS.purple : COLORS.darkBlue,
      radius: 14,
    });
    addText(slide, {
      name: `lifecycle-label-${index + 1}`,
      text: stage,
      left: x - 4,
      top: index % 2 === 0 ? 296 : 406,
      width: width + 8,
      height: 52,
      role: "componentTitle",
      fontSize: 18,
      color: index === 4 ? COLORS.purple : COLORS.darkBlue,
      alignment: "center",
    });
  });
  addBottomLine(slide, "The signature is an important trust event. It is not the entire trust model.");
}

function addCapabilities(slide) {
  addSlideTitle(slide, "Six connected capabilities create one execution environment", { dark: true, width: 1140 });
  const items = [
    ["Cloud", "Control where the trust environment operates"],
    ["Identity", "Establish who or what is acting"],
    ["Collaboration", "Create, review, and approve content"],
    ["Sign & Seal", "Apply personal or organizational authority"],
    ["DMS / Vault", "Preserve records, evidence, and history"],
    ["AI", "Apply intelligence and governed action"],
  ];
  const cols = 3;
  const gapX = 26;
  const gapY = 30;
  const width = (1184 - gapX * 2) / 3;
  const height = 156;
  items.forEach((item, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = MARGIN + col * (width + gapX);
    const y = 240 + row * (height + gapY);
    addDivider(slide, { name: `capability-rule-${index + 1}`, left: x, top: y, width: 76, height: 4, color: COLORS.purple });
    addText(slide, {
      name: `capability-title-${index + 1}`,
      text: item[0],
      left: x,
      top: y + 24,
      width,
      height: 46,
      role: "componentTitle",
      fontSize: 27,
      color: COLORS.white,
    });
    addText(slide, {
      name: `capability-body-${index + 1}`,
      text: item[1],
      left: x,
      top: y + 78,
      width: width - 18,
      height: 66,
      role: "body",
      fontSize: 20,
      color: "#E6DEFF",
    });
  });
  addBottomLine(slide, "One platform · One governance model · One evidence chain · One API", { dark: true, top: 622 });
}

function addAssurance(slide) {
  addSlideTitle(slide, "Trusted execution combines three forms of assurance", { width: 1140 });
  const assurances = [
    ["01", "Workflow assurance", "Was the correct process followed—and was the right approval obtained?"],
    ["02", "Personal assurance", "Who personally authorized or signed—and at what identity assurance level?"],
    ["03", "Organizational assurance", "Did this officially originate from the organization—and can integrity be verified?"],
  ];
  assurances.forEach((item, index) => {
    const y = 236 + index * 126;
    addText(slide, {
      name: `assurance-number-${index + 1}`,
      text: item[0],
      left: MARGIN,
      top: y,
      width: 78,
      height: 42,
      role: "sectionTitle",
      color: COLORS.purple,
    });
    addText(slide, {
      name: `assurance-title-${index + 1}`,
      text: item[1],
      left: 152,
      top: y,
      width: 390,
      height: 42,
      role: "componentTitle",
      fontSize: 26,
      color: COLORS.darkBlue,
    });
    addText(slide, {
      name: `assurance-body-${index + 1}`,
      text: item[2],
      left: 548,
      top: y,
      width: 640,
      height: 74,
      role: "body",
      fontSize: 21,
      color: COLORS.body,
    });
    if (index < assurances.length - 1) addDivider(slide, { name: `assurance-divider-${index + 1}`, left: 152, top: y + 94, width: 1036, color: COLORS.neutral200 });
  });
  addBottomLine(slide, "The right combination depends on the significance of the action.");
}

function addEvidence(slide) {
  addSlideTitle(slide, "Every execution should create verifiable institutional evidence", { width: 1140 });
  const items = [
    "Authoritative version", "Identities", "Roles", "Approvals", "Signatures & seals",
    "Timestamps", "Audit events", "Process history", "Retention metadata", "Supporting evidence",
  ];
  addRect(slide, { name: "evidence-spine", left: 596, top: 236, width: 88, height: 322, fill: COLORS.purple, radius: 44 });
  addText(slide, {
    name: "evidence-spine-label",
    text: "TRUSTED\nRECORD",
    left: 606,
    top: 342,
    width: 68,
    height: 82,
    role: "chrome",
    fontSize: 14,
    color: COLORS.white,
    alignment: "center",
  });
  items.forEach((item, index) => {
    const leftSide = index < 5;
    const row = index % 5;
    const y = 244 + row * 64;
    const x = leftSide ? 64 : 742;
    addDivider(slide, {
      name: `evidence-link-${index + 1}`,
      left: leftSide ? 440 : 684,
      top: y + 18,
      width: leftSide ? 156 : 58,
      height: 2,
      color: "#D6C1FF",
    });
    addText(slide, {
      name: `evidence-item-${index + 1}`,
      text: item,
      left: x,
      top: y,
      width: 360,
      height: 42,
      role: "bodyBold",
      fontSize: 21,
      color: COLORS.darkBlue,
      alignment: leftSide ? "right" : "left",
    });
  });
  addBottomLine(slide, "The result is not simply a completed transaction. It is durable institutional evidence.");
}

function addMemory(slide) {
  addSlideTitle(slide, "Evidence becomes institutional memory", { dark: true, width: 1140 });
  const stages = [
    ["Trusted records", "Preserve provenance, permissions, and context"],
    ["Searchable evidence", "Retrieve what happened and why"],
    ["Connected decisions", "Understand obligations and precedent"],
    ["Institutional knowledge", "Retain a trusted history of action"],
  ];
  stages.forEach((stage, index) => {
    const y = 234 + index * 90;
    const width = 820 + index * 88;
    addRect(slide, {
      name: `memory-layer-${index + 1}`,
      left: MARGIN,
      top: y,
      width,
      height: 68,
      fill: index === 3 ? COLORS.purple : `#${["2A129B", "3620A8", "4729BE"][index]}`,
      lineFill: "#6E51DA",
      lineWidth: 1,
      radius: 10,
    });
    addText(slide, {
      name: `memory-title-${index + 1}`,
      text: stage[0],
      left: 72,
      top: y + 18,
      width: 300,
      height: 30,
      role: "componentTitle",
      fontSize: 23,
      color: COLORS.white,
    });
    addText(slide, {
      name: `memory-detail-${index + 1}`,
      text: stage[1],
      left: 370,
      top: y + 18,
      width: width - 350,
      height: 30,
      role: "body",
      fontSize: 20,
      color: "#E6DEFF",
      alignment: "right",
    });
  });
  addBottomLine(slide, "The archive becomes a trusted knowledge foundation—not merely a destination after signing.", { dark: true });
}

async function addContext(slide) {
  addSlideTitle(slide, "Trusted context gives AI a governed path from knowing to acting", { width: 1140 });
  await addImage(slide, ASSETS.context, { left: 628, top: 212, width: 604, height: 388 }, {
    alt: "Abstract trusted records becoming governed AI action",
  });
  const stages = [
    ["KNOW", "Extract · Classify · Summarize · Retrieve"],
    ["ADVISE", "Identify obligations · Risks · Anomalies"],
    ["ACT", "Initiate workflows · Request approvals · Invoke permitted actions"],
  ];
  stages.forEach((stage, index) => {
    const y = 234 + index * 118;
    addText(slide, {
      name: `ai-stage-${index + 1}`,
      text: stage[0],
      left: MARGIN,
      top: y,
      width: 170,
      height: 42,
      role: "sectionTitle",
      fontSize: 28,
      color: index === 2 ? COLORS.purple : COLORS.darkBlue,
    });
    addText(slide, {
      name: `ai-detail-${index + 1}`,
      text: stage[1],
      left: 222,
      top: y,
      width: 360,
      height: 72,
      role: "body",
      fontSize: 20,
      color: COLORS.body,
    });
  });
  addBottomLine(slide, "Trusted records → Trusted context → Trusted intelligence → Governed action", { top: 618 });
}

function addAgentBoundary(slide) {
  addSlideTitle(slide, "Agentic action must cross an explicit authority boundary", { dark: true, width: 1140 });
  const stages = ["Identity", "Delegated authority", "Policy", "Approval", "Execution", "Evidence", "Audit"];
  const gap = 14;
  const width = (1184 - gap * 6) / 7;
  addDivider(slide, { name: "agent-boundary-line", left: 64, top: 360, width: 1152, height: 3, color: "#6E51DA" });
  stages.forEach((stage, index) => {
    const x = MARGIN + index * (width + gap);
    addRect(slide, {
      name: `boundary-node-${index + 1}`,
      left: x + width / 2 - 24,
      top: 336,
      width: 48,
      height: 48,
      fill: index === 4 ? COLORS.purple : COLORS.white,
      radius: 24,
    });
    addText(slide, {
      name: `boundary-number-${index + 1}`,
      text: String(index + 1),
      left: x + width / 2 - 18,
      top: 348,
      width: 36,
      height: 24,
      role: "bodyBold",
      fontSize: 18,
      color: index === 4 ? COLORS.white : COLORS.darkBlue,
      alignment: "center",
    });
    addText(slide, {
      name: `boundary-label-${index + 1}`,
      text: stage,
      left: x - 5,
      top: 418,
      width: width + 10,
      height: 64,
      role: "componentTitle",
      fontSize: 18,
      color: COLORS.white,
      alignment: "center",
    });
  });
  addText(slide, {
    name: "critical-boundary",
    text: "Circularo governs what the agent is permitted to do, what actually executes, and what evidence is retained afterwards.",
    left: 128,
    top: 518,
    width: 1024,
    height: 64,
    role: "bodyBold",
    fontSize: 23,
    color: "#E6DEFF",
    alignment: "center",
  });
}

function addActors(slide) {
  addSlideTitle(slide, "Humans, applications, and agents share the same trust framework", { width: 1140 });
  const actors = ["People", "External parties", "Organizations", "Applications", "AI agents"];
  const width = 196;
  const gap = 32;
  const start = 86;
  actors.forEach((actor, index) => {
    const x = start + index * (width + gap);
    addText(slide, {
      name: `actor-label-${index + 1}`,
      text: actor,
      left: x,
      top: 246,
      width,
      height: 52,
      role: "componentTitle",
      fontSize: 22,
      color: COLORS.darkBlue,
      alignment: "center",
    });
    addDivider(slide, { name: `actor-path-${index + 1}`, left: x + width / 2 - 1, top: 316, width: 2, height: 74, color: "#D6C1FF" });
  });
  addRect(slide, { name: "shared-boundary", left: 112, top: 390, width: 1056, height: 112, fill: COLORS.purple, radius: 18 });
  addText(slide, {
    name: "shared-boundary-title",
    text: "IDENTITY + AUTHORITY + POLICY + APPROVAL + EXECUTION + EVIDENCE",
    left: 152,
    top: 427,
    width: 976,
    height: 40,
    role: "componentTitle",
    fontSize: 23,
    color: COLORS.white,
    alignment: "center",
  });
  addBottomLine(slide, "AI becomes another governed actor inside the institution’s trusted execution environment.");
}

function addStrategicPosition(slide) {
  addSlideTitle(slide, "Circularo sits between actors and consequential business actions", { width: 1140 });
  addDivider(slide, { name: "strategic-line-1", left: 640, top: 262, width: 2, height: 66, color: COLORS.neutral300 });
  addDivider(slide, { name: "strategic-line-2", left: 640, top: 426, width: 2, height: 66, color: COLORS.neutral300 });
  addText(slide, {
    name: "actors-row",
    text: "PEOPLE · ORGANIZATIONS · APPLICATIONS · AI AGENTS",
    left: 152,
    top: 226,
    width: 976,
    height: 36,
    role: "chrome",
    fontSize: 16,
    color: COLORS.darkBlue,
    alignment: "center",
  });
  addRect(slide, { name: "trusted-execution-layer", left: 176, top: 328, width: 928, height: 98, fill: COLORS.purple, radius: 16 });
  addText(slide, {
    name: "trusted-execution-title",
    text: "CIRCULARO TRUSTED EXECUTION LAYER",
    left: 224,
    top: 359,
    width: 832,
    height: 42,
    role: "sectionTitle",
    fontSize: 28,
    color: COLORS.white,
    alignment: "center",
  });
  addText(slide, {
    name: "controls-row",
    text: "Identity · Authority · Policy · Collaboration · Approval · Sign & Seal · Evidence · Audit · Archive",
    left: 112,
    top: 492,
    width: 1056,
    height: 74,
    role: "bodyBold",
    fontSize: 21,
    color: COLORS.darkBlue,
    alignment: "center",
  });
  addBottomLine(slide, "The infrastructure may vary. The trust model remains consistent.");
}

async function addFlywheel(slide) {
  addText(slide, {
    name: "flywheel-kicker",
    text: "THE CIRCULARO FLYWHEEL",
    left: MARGIN,
    top: 128,
    width: 420,
    height: 28,
    role: "chrome",
    fontSize: 16,
    color: "#C9AEFF",
  });
  addText(slide, {
    name: "flywheel-title",
    text: "Every governed action strengthens the next one",
    left: MARGIN,
    top: 184,
    width: 510,
    height: 174,
    role: "hero",
    fontSize: 51,
    color: COLORS.white,
  });
  addText(slide, {
    name: "flywheel-copy",
    text: "Trusted collaboration creates execution. Execution creates evidence. Evidence creates records. Records create trusted AI context. Governed action creates the next trusted execution.",
    left: MARGIN,
    top: 392,
    width: 492,
    height: 146,
    role: "body",
    fontSize: 22,
    color: "#E6DEFF",
  });
}

function addClose(slide) {
  addText(slide, {
    name: "close-kicker",
    text: "THE CIRCULARO PROPOSITION",
    left: MARGIN,
    top: 126,
    width: 600,
    height: 30,
    role: "chrome",
    fontSize: 16,
    color: "#C9AEFF",
  });
  addText(slide, {
    name: "close-title",
    text: "Govern what executes.",
    left: MARGIN,
    top: 194,
    width: 980,
    height: 90,
    role: "hero",
    fontSize: 64,
    color: COLORS.white,
  });
  addText(slide, {
    name: "close-body",
    text: "Circularo connects people, organizations, applications, and AI agents with consequential business processes through one platform, one governance model, one continuous evidence chain, and one API.",
    left: MARGIN,
    top: 322,
    width: 1050,
    height: 120,
    role: "body",
    fontSize: 25,
    color: "#E6DEFF",
  });
  addDivider(slide, { name: "close-rule", left: MARGIN, top: 488, width: 1120, height: 3, color: COLORS.purple });
  addText(slide, {
    name: "close-movements",
    text: "Signing documents → Governing trusted execution\nStoring files → Building institutional memory\nAI assistance → Governed agentic action",
    left: MARGIN,
    top: 522,
    width: 1050,
    height: 112,
    role: "bodyBold",
    fontSize: 23,
    color: COLORS.white,
  });
}

const slides = [
  { kind: "cover", dark: true, backgroundImage: ASSETS.cover, backgroundAlt: "Abstract governed execution boundary", assetSource: "work/slides/trusted-execution-agentic-era/assets/trust-boundary-cover.png" },
  { kind: "evolution" },
  { kind: "authority", dark: true },
  { kind: "fragmentation", assetSource: "work/slides/trusted-execution-agentic-era/assets/fragmented-accountability.png" },
  { kind: "lifecycle" },
  { kind: "capabilities", dark: true },
  { kind: "assurance" },
  { kind: "evidence" },
  { kind: "memory", dark: true },
  { kind: "context", assetSource: "work/slides/trusted-execution-agentic-era/assets/trusted-context-action.png" },
  { kind: "agent-boundary", dark: true },
  { kind: "actors" },
  { kind: "strategic-position" },
  { kind: "flywheel", dark: true, backgroundImage: ASSETS.flywheel, backgroundAlt: "Abstract continuous trusted execution flywheel", assetSource: "work/slides/trusted-execution-agentic-era/assets/trusted-execution-flywheel.png" },
  { kind: "close", dark: true },
];

async function renderSlide(presentation, spec, pageNumber) {
  const slide = await baseSlide(presentation, pageNumber, spec);
  switch (spec.kind) {
    case "cover": addCover(slide); break;
    case "evolution": addEvolution(slide); break;
    case "authority": addAuthorityGap(slide); break;
    case "fragmentation": await addFragmentation(slide); break;
    case "lifecycle": addLifecycle(slide); break;
    case "capabilities": addCapabilities(slide); break;
    case "assurance": addAssurance(slide); break;
    case "evidence": addEvidence(slide); break;
    case "memory": addMemory(slide); break;
    case "context": await addContext(slide); break;
    case "agent-boundary": addAgentBoundary(slide); break;
    case "actors": addActors(slide); break;
    case "strategic-position": addStrategicPosition(slide); break;
    case "flywheel": await addFlywheel(slide); break;
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
  await writeBlob(path.join(BUILD, "trusted-execution-agentic-era-montage.webp"), await presentation.export({ format: "webp", montage: true, scale: 1 }));
  const inspection = await presentation.inspect({ kind: "slide,textbox,shape,image,notes", maxChars: 50000 });
  await fs.writeFile(path.join(BUILD, "trusted-execution-agentic-era.inspect.ndjson"), inspection.ndjson);

  const finalPath = path.join(OUTPUT, "trusted-execution-agentic-era.pptx");
  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(finalPath);
  console.log(JSON.stringify({ finalPath, slides: slides.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
