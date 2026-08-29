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
const TASK = path.join(ROOT, "work/slides/digital-signatures-to-trusted-execution");
const BUILD = path.join(TASK, "build/render");
const OUTPUT = path.join(TASK, "output");
const ICONS = path.join(TASK, "assets/icons");
const SOURCE = "work/ideas/From Digital Signatures to Trusted Execution.md";
const BRAND = ".agents/skills/circularo-slides/references/brand-system.md";

const icon = (name) => path.join(ICONS, `${name}.png`);

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

async function readImage(filePath) {
  const bytes = await fs.readFile(filePath);
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

async function addIcon(slide, name, position, alt = name) {
  slide.images.add({
    blob: await readImage(icon(name)),
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
    left: 890,
    top: 34,
    width: 290,
    height: 20,
    role: "chrome",
    fontSize: 11.5,
    color: dark ? "#C9AEFF" : COLORS.neutral500,
    alignment: "right",
  });
}

async function baseSlide(presentation, pageNumber, spec) {
  const slide = presentation.slides.add();
  const dark = Boolean(spec.dark);
  slide.background.fill = dark ? COLORS.darkBlue : COLORS.white;
  await addChrome(slide, pageNumber, { dark });
  addEyebrow(slide, "From digital signatures to trusted execution", { dark, width: 700 });
  addPartnerMark(slide, dark);
  addSources(slide, [SOURCE, BRAND, ...(spec.sources ?? [])]);
  return slide;
}

function addTakeaway(slide, text, { dark = false, top = 610, width = 1090 } = {}) {
  addDivider(slide, { name: "takeaway-accent", left: MARGIN, top: top - 16, width: 194, height: 3, color: COLORS.purple });
  addText(slide, {
    name: "takeaway",
    text,
    left: MARGIN,
    top,
    width,
    height: 52,
    role: "bodyBold",
    color: dark ? COLORS.white : COLORS.darkBlue,
  });
}

async function addCover(slide) {
  addRect(slide, { name: "cover-path", left: 846, top: 0, width: 434, height: 720, fill: "#14006A" });
  addRect(slide, { name: "cover-path-accent", left: 846, top: 0, width: 18, height: 720, fill: COLORS.purple });
  addText(slide, {
    name: "cover-title",
    text: "From Digital Signatures\nto Trusted Execution",
    left: MARGIN,
    top: 172,
    width: 720,
    height: 190,
    role: "hero",
    fontSize: 62,
    color: COLORS.white,
  });
  addText(slide, {
    name: "cover-subtitle",
    text: "A shared narrative for Circularo teams and partners",
    left: MARGIN,
    top: 402,
    width: 650,
    height: 58,
    role: "componentTitle",
    fontSize: 25,
    bold: false,
    color: "#E6DEFF",
  });
  const coverIcons = [
    ["sovereign-sign", 886, 148, "Digital signature"],
    ["gear", 1048, 312, "Execution"],
    ["shield", 886, 476, "Trust"],
  ];
  addDivider(slide, { name: "cover-icon-path-1", left: 958, top: 244, width: 98, height: 78, color: "#6E51DA" });
  addDivider(slide, { name: "cover-icon-path-2", left: 958, top: 404, width: 98, height: 80, color: "#6E51DA" });
  for (const [name, left, top, alt] of coverIcons) {
    addRect(slide, { name: `cover-icon-frame-${name}`, left, top, width: 132, height: 132, fill: COLORS.white, radius: 22 });
    await addIcon(slide, name, { left: left + 25, top: top + 25, width: 82, height: 82 }, alt);
  }
  addText(slide, {
    name: "cover-footer",
    text: "IDENTITY · AUTHORITY · EXECUTION · EVIDENCE",
    left: MARGIN,
    top: 566,
    width: 680,
    height: 28,
    role: "chrome",
    fontSize: 14,
    color: "#C9AEFF",
  });
}

async function addOperatingModel(slide) {
  addSlideTitle(slide, "The operating model is changing again", { width: 1140 });
  const stages = [
    ["Documents", "Electronic", "document"],
    ["Approvals", "Workflow-driven", "folder-check"],
    ["Signatures", "Digital", "sovereign-sign"],
    ["Work", "Agent-assisted", "sovereign-ai"],
  ];
  addDivider(slide, { name: "operating-line", left: 112, top: 354, width: 1056, height: 3, color: COLORS.neutral300 });
  for (let index = 0; index < stages.length; index += 1) {
    const [title, detail, iconName] = stages[index];
    const left = 84 + index * 296;
    addRect(slide, {
      name: `stage-frame-${index + 1}`,
      left: left + 72,
      top: 272,
      width: 112,
      height: 112,
      fill: index === 3 ? COLORS.purple : COLORS.softPurple,
      lineFill: index === 3 ? COLORS.purple : "#D6C1FF",
      lineWidth: 2,
      radius: 18,
    });
    await addIcon(slide, iconName, { left: left + 94, top: 294, width: 68, height: 68 }, title);
    addText(slide, {
      name: `stage-title-${index + 1}`,
      text: title,
      left,
      top: 418,
      width: 256,
      height: 42,
      role: "componentTitle",
      fontSize: 25,
      color: COLORS.darkBlue,
      alignment: "center",
    });
    addText(slide, {
      name: `stage-detail-${index + 1}`,
      text: detail,
      left,
      top: 468,
      width: 256,
      height: 46,
      role: "body",
      fontSize: 21.5,
      color: COLORS.body,
      alignment: "center",
    });
  }
  addTakeaway(slide, "The question is no longer only who signed—it is who or what was authorized to act.");
}

function addValueShift(slide) {
  addSlideTitle(slide, "Value is moving from access to trusted execution", { dark: true, width: 1140 });
  addText(slide, {
    name: "access-label",
    text: "TRADITIONAL VALUE SIGNAL",
    left: MARGIN,
    top: 248,
    width: 380,
    height: 28,
    role: "chrome",
    color: "#C9AEFF",
  });
  addText(slide, {
    name: "access-title",
    text: "Access",
    left: MARGIN,
    top: 300,
    width: 380,
    height: 64,
    role: "sectionTitle",
    fontSize: 38,
    color: COLORS.white,
  });
  addText(slide, {
    name: "access-body",
    text: "Users · Accounts · Seats · Licenses",
    left: MARGIN,
    top: 382,
    width: 430,
    height: 90,
    role: "body",
    fontSize: 23,
    color: "#E6DEFF",
  });
  addDivider(slide, { name: "value-divider", left: 494, top: 238, width: 3, height: 314, color: "#6E51DA" });
  addText(slide, {
    name: "execution-label",
    text: "EMERGING VALUE SIGNAL",
    left: 558,
    top: 248,
    width: 500,
    height: 28,
    role: "chrome",
    color: "#C9AEFF",
  });
  addText(slide, {
    name: "execution-title",
    text: "Trusted execution",
    left: 558,
    top: 300,
    width: 610,
    height: 64,
    role: "sectionTitle",
    fontSize: 38,
    color: COLORS.white,
  });
  addText(slide, {
    name: "execution-body",
    text: "Identity · Authority · Approval · Integrity · Evidence · Compliance",
    left: 558,
    top: 382,
    width: 600,
    height: 106,
    role: "body",
    fontSize: 23,
    color: "#E6DEFF",
  });
  addTakeaway(slide, "Human participation may decrease while meaningful platform execution increases.", { dark: true });
}

async function addBusinessOutcome(slide) {
  addSlideTitle(slide, "A Trusted Execution is the customer’s business outcome", { width: 1140 });
  const examples = [
    ["Approve a decision", "folder-check"],
    ["Execute an agreement", "sovereign-sign"],
    ["Issue an official record", "document"],
    ["Validate an identity", "person"],
    ["Apply an organizational seal", "shield"],
    ["Authorize an agent action", "sovereign-ai"],
  ];
  for (let index = 0; index < examples.length; index += 1) {
    const [label, iconName] = examples[index];
    const col = index % 3;
    const row = Math.floor(index / 3);
    const left = 70 + col * 392;
    const top = 238 + row * 158;
    addRect(slide, { name: `outcome-icon-frame-${index + 1}`, left, top, width: 88, height: 88, fill: COLORS.softPurple, radius: 16 });
    await addIcon(slide, iconName, { left: left + 17, top: top + 17, width: 54, height: 54 }, label);
    addText(slide, {
      name: `outcome-label-${index + 1}`,
      text: label,
      left: left + 112,
      top: top + 21,
      width: 250,
      height: 62,
      role: "componentTitle",
      fontSize: 23,
      color: COLORS.darkBlue,
    });
  }
  addTakeaway(slide, "Customers buy the business action—not the cryptographic operations underneath it.");
}

function addTrustEvents(slide) {
  addSlideTitle(slide, "One Trusted Execution can orchestrate many Trust Events", { width: 1140 });
  addText(slide, {
    name: "employment-outcome",
    text: "EMPLOYMENT AGREEMENT EXECUTED",
    left: 332,
    top: 224,
    width: 616,
    height: 56,
    role: "componentTitle",
    fontSize: 27,
    color: COLORS.darkBlue,
    alignment: "center",
  });
  addDivider(slide, { name: "events-spine", left: 94, top: 378, width: 1092, height: 3, color: COLORS.neutral300 });
  const events = ["Identity", "Auth", "OTP", "Signature", "Seal", "Timestamp", "Evidence", "Archive"];
  const gap = 12;
  const width = (1184 - gap * 7) / 8;
  events.forEach((event, index) => {
    const left = MARGIN + index * (width + gap);
    addRect(slide, {
      name: `event-node-${index + 1}`,
      left: left + width / 2 - 19,
      top: 360,
      width: 38,
      height: 38,
      fill: index === 3 ? COLORS.purple : COLORS.darkBlue,
      radius: 19,
    });
    addText(slide, {
      name: `event-label-${index + 1}`,
      text: event,
      left: left - 3,
      top: index % 2 === 0 ? 306 : 426,
      width: width + 6,
      height: 44,
      role: "componentTitle",
      fontSize: 21.5,
      color: index === 3 ? COLORS.purple : COLORS.darkBlue,
      alignment: "center",
    });
  });
  addText(slide, {
    name: "execution-value-label",
    text: "Trusted Execution = customer value",
    left: 110,
    top: 520,
    width: 490,
    height: 42,
    role: "bodyBold",
    color: COLORS.darkBlue,
  });
  addText(slide, {
    name: "event-operations-label",
    text: "Trust Events = underlying operations",
    left: 680,
    top: 520,
    width: 490,
    height: 42,
    role: "bodyBold",
    color: COLORS.purple,
    alignment: "right",
  });
  addTakeaway(slide, "The exact event recipe depends on the required assurance, jurisdiction, and scenario.");
}

function addAssurance(slide) {
  addSlideTitle(slide, "Assurance is a business decision", { dark: true, width: 1140 });
  addText(slide, {
    name: "assurance-question",
    text: "What are you trying to execute—and how much assurance does it require?",
    left: MARGIN,
    top: 214,
    width: 1100,
    height: 58,
    role: "body",
    fontSize: 25,
    color: "#E6DEFF",
  });
  const levels = [
    ["Standard", "Authenticated access + audit"],
    ["Verified", "Stronger signer assurance"],
    ["Identity verified", "Verified identity evidence"],
    ["Qualified", "Jurisdiction-specific qualified services"],
  ];
  addDivider(slide, { name: "assurance-baseline", left: 104, top: 380, width: 1072, height: 4, color: "#6E51DA" });
  levels.forEach((level, index) => {
    const left = 64 + index * 302;
    addRect(slide, {
      name: `assurance-node-${index + 1}`,
      left: left + 90,
      top: 348,
      width: 68,
      height: 68,
      fill: index === 3 ? COLORS.purple : COLORS.white,
      radius: 34,
    });
    addText(slide, {
      name: `assurance-number-${index + 1}`,
      text: String(index + 1),
      left: left + 103,
      top: 368,
      width: 42,
      height: 25,
      role: "bodyBold",
      fontSize: 21.5,
      color: index === 3 ? COLORS.white : COLORS.darkBlue,
      alignment: "center",
    });
    addText(slide, {
      name: `assurance-title-${index + 1}`,
      text: level[0],
      left,
      top: 448,
      width: 248,
      height: 44,
      role: "componentTitle",
      fontSize: 23,
      color: COLORS.white,
      alignment: "center",
    });
    addText(slide, {
      name: `assurance-detail-${index + 1}`,
      text: level[1],
      left,
      top: 502,
      width: 248,
      height: 80,
      role: "body",
      fontSize: 21.5,
      color: "#E6DEFF",
      alignment: "center",
    });
  });
  addTakeaway(slide, "Illustrative model—validate the required assurance for each market and use case.", { dark: true });
}

function addExecutionProfiles(slide) {
  addSlideTitle(slide, "Execution Profiles adapt the trust recipe without changing the proposition", { width: 1140 });
  const layers = [
    ["BUSINESS ACTION", "What the customer needs to accomplish"],
    ["ASSURANCE LEVEL", "How much trust the action requires"],
    ["EXECUTION PROFILE", "The jurisdictional and provider-specific recipe"],
    ["TRUST EVENTS", "Identity · Signature · Seal · Time · Evidence · Archive"],
  ];
  layers.forEach((layer, index) => {
    const top = 224 + index * 92;
    const width = 1070 - index * 94;
    addRect(slide, {
      name: `profile-layer-${index + 1}`,
      left: MARGIN,
      top,
      width,
      height: 70,
      fill: index === 2 ? COLORS.purple : (index === 3 ? COLORS.darkBlue : COLORS.softPurple),
      lineFill: index < 2 ? "#D6C1FF" : "none",
      lineWidth: index < 2 ? 1 : 0,
      radius: 10,
    });
    addText(slide, {
      name: `profile-label-${index + 1}`,
      text: layer[0],
      left: 72,
      top: top + 20,
      width: index === 3 ? 150 : 250,
      height: 28,
      role: "chrome",
      fontSize: 15,
      color: index < 2 ? COLORS.purple : COLORS.white,
    });
    addText(slide, {
      name: `profile-detail-${index + 1}`,
      text: layer[1],
      left: index === 3 ? 230 : 324,
      top: top + 18,
      width: index === 3 ? width - 190 : width - 300,
      height: 34,
      role: "body",
      fontSize: 21.5,
      color: index < 2 ? COLORS.darkBlue : COLORS.white,
      alignment: "right",
    });
  });
  addTakeaway(slide, "The customer-facing outcome stays simple while the execution recipe adapts.");
}

function addTrustedLayer(slide) {
  addSlideTitle(slide, "Circularo connects the complete trust chain", { dark: true, width: 1140 });
  addDivider(slide, { name: "layer-line-1", left: 640, top: 262, width: 2, height: 60, color: "#6E51DA" });
  addDivider(slide, { name: "layer-line-2", left: 640, top: 426, width: 2, height: 60, color: "#6E51DA" });
  addText(slide, {
    name: "layer-actors",
    text: "PEOPLE · ORGANIZATIONS · APPLICATIONS · AI AGENTS",
    left: 160,
    top: 226,
    width: 960,
    height: 34,
    role: "chrome",
    fontSize: 16,
    color: "#C9AEFF",
    alignment: "center",
  });
  addRect(slide, { name: "trusted-layer", left: 164, top: 322, width: 952, height: 104, fill: COLORS.purple, radius: 18 });
  addText(slide, {
    name: "trusted-layer-label",
    text: "CIRCULARO TRUSTED EXECUTION LAYER",
    left: 220,
    top: 356,
    width: 840,
    height: 38,
    role: "sectionTitle",
    fontSize: 29,
    color: COLORS.white,
    alignment: "center",
  });
  addText(slide, {
    name: "trust-chain",
    text: "Identity · Authority · Workflow · Approval · Sign / Seal · Trust Services · Evidence · Audit · Trusted Records",
    left: 112,
    top: 488,
    width: 1056,
    height: 76,
    role: "bodyBold",
    fontSize: 21.5,
    color: COLORS.white,
    alignment: "center",
  });
  addTakeaway(slide, "Circularo establishes trust in the entire execution—not only the signature.", { dark: true });
}

async function addAgenticBurden(slide) {
  addSlideTitle(slide, "Agentic work raises the burden of proof", { width: 1140 });
  addRect(slide, { name: "agent-icon-frame", left: MARGIN, top: 236, width: 260, height: 340, fill: COLORS.softPurple, radius: 20 });
  await addIcon(slide, "sovereign-ai", { left: 115, top: 268, width: 150, height: 150 }, "Governed AI agent");
  addText(slide, {
    name: "agent-caption",
    text: "AI increases the importance of identity, authority, policy, and evidence.",
    left: 80,
    top: 444,
    width: 220,
    height: 124,
    role: "bodyBold",
    fontSize: 21.5,
    color: COLORS.darkBlue,
    alignment: "center",
  });
  const questions = [
    "Which agent acted—and on whose behalf?",
    "What authority and policies governed it?",
    "What information did it rely on?",
    "Which trust services were applied?",
    "What exactly happened?",
    "Can the execution be proven afterwards?",
  ];
  questions.forEach((question, index) => {
    const top = 236 + index * 58;
    addRect(slide, { name: `agent-question-dot-${index + 1}`, left: 364, top: top + 10, width: 10, height: 10, fill: COLORS.purple, radius: 10 });
    addText(slide, {
      name: `agent-question-${index + 1}`,
      text: question,
      left: 396,
      top,
      width: 800,
      height: 44,
      role: "body",
      fontSize: 22,
      color: COLORS.body,
    });
  });
  addTakeaway(slide, "More autonomous work makes trusted execution infrastructure more important—not less.");
}

function addGenerations(slide) {
  addSlideTitle(slide, "Digital trust platforms are entering a fourth generation", { width: 1140 });
  const generations = [
    ["01", "Electronic signature", "Digitize the signature"],
    ["02", "Digital workflow", "Digitize the process"],
    ["03", "Unified digital trust", "Connect identity, workflow, trust, and evidence"],
    ["04", "Trusted autonomous execution", "Govern people, systems, and AI agents"],
  ];
  generations.forEach((generation, index) => {
    const left = MARGIN + index * 296;
    const height = 190 + index * 56;
    const top = 594 - height;
    addRect(slide, {
      name: `generation-block-${index + 1}`,
      left,
      top,
      width: 262,
      height,
      fill: index === 3 ? COLORS.purple : (index === 2 ? COLORS.darkBlue : COLORS.softPurple),
      lineFill: index < 2 ? "#D6C1FF" : "none",
      lineWidth: index < 2 ? 1 : 0,
    });
    addText(slide, {
      name: `generation-number-${index + 1}`,
      text: generation[0],
      left: left + 20,
      top: top + 16,
      width: 54,
      height: 30,
      role: "sectionTitle",
      fontSize: 24,
      color: index < 2 ? COLORS.purple : COLORS.white,
    });
    addText(slide, {
      name: `generation-title-${index + 1}`,
      text: generation[1],
      left: left + 20,
      top: top + 54,
      width: 222,
      height: index === 3 ? 96 : 66,
      role: "componentTitle",
      fontSize: 22,
      color: index < 2 ? COLORS.darkBlue : COLORS.white,
    });
    addText(slide, {
      name: `generation-body-${index + 1}`,
      text: generation[2],
      left: left + 20,
      top: top + (index === 3 ? 150 : 116),
      width: 222,
      height: height - (index === 3 ? 164 : 130),
      role: "body",
      fontSize: 21.5,
      color: index < 2 ? COLORS.body : "#E6DEFF",
    });
  });
  addTakeaway(slide, "Circularo’s strategic direction spans unified digital trust and trusted autonomous execution.");
}

function addStrategicProposition(slide) {
  addSlideTitle(slide, "Access, execution, and trust form one strategic proposition", { dark: true, width: 1140 });
  const bands = [
    ["ACCESS", "Make participation easy", "People · Organizations · Applications · External participants"],
    ["EXECUTION", "Make digital work intelligent", "Workflows · Documents · APIs · Automation · AI"],
    ["TRUST", "Make the outcome verifiable", "Identity · Authority · Signatures · Seals · Evidence · Records"],
  ];
  bands.forEach((band, index) => {
    const top = 230 + index * 126;
    addRect(slide, {
      name: `proposition-band-${index + 1}`,
      left: MARGIN,
      top,
      width: 1184,
      height: 98,
      fill: index === 2 ? COLORS.purple : "#2A129B",
      lineFill: "#6E51DA",
      lineWidth: 1,
      radius: 12,
    });
    addText(slide, {
      name: `proposition-label-${index + 1}`,
      text: band[0],
      left: 76,
      top: top + 20,
      width: 174,
      height: 28,
      role: "chrome",
      fontSize: 16,
      color: "#C9AEFF",
    });
    addText(slide, {
      name: `proposition-title-${index + 1}`,
      text: band[1],
      left: 252,
      top: top + 18,
      width: 392,
      height: 34,
      role: "componentTitle",
      fontSize: 25,
      color: COLORS.white,
    });
    addText(slide, {
      name: `proposition-detail-${index + 1}`,
      text: band[2],
      left: 660,
      top: top + 20,
      width: 526,
      height: 54,
      role: "body",
      fontSize: 21.5,
      color: "#E6DEFF",
      alignment: "right",
    });
  });
  addTakeaway(slide, "Make access easy. Make execution intelligent. Make trust verifiable.", { dark: true });
}

function addDeliveryRoutes(slide) {
  addSlideTitle(slide, "One trusted execution model supports three delivery routes", { width: 1140 });
  const routes = [
    ["Circularo SaaS", "Managed trusted execution for enterprise adoption"],
    ["Sovereign deployments", "Customer-controlled execution within a defined boundary"],
    ["Government shared services", "Reusable trusted execution across public entities"],
  ];
  routes.forEach((route, index) => {
    const left = MARGIN + index * 406;
    addText(slide, {
      name: `route-number-${index + 1}`,
      text: `0${index + 1}`,
      left,
      top: 232,
      width: 90,
      height: 46,
      role: "sectionTitle",
      color: COLORS.purple,
    });
    addDivider(slide, { name: `route-rule-${index + 1}`, left, top: 292, width: 330, height: 4, color: index === 1 ? COLORS.purple : COLORS.darkBlue });
    addText(slide, {
      name: `route-title-${index + 1}`,
      text: route[0],
      left,
      top: 328,
      width: 350,
      height: 76,
      role: "sectionTitle",
      fontSize: 30,
      color: COLORS.darkBlue,
    });
    addText(slide, {
      name: `route-body-${index + 1}`,
      text: route[1],
      left,
      top: 424,
      width: 350,
      height: 112,
      role: "body",
      fontSize: 21.5,
      color: COLORS.body,
    });
  });
  addTakeaway(slide, "Delivery varies; authority, assurance, execution, and evidence remain consistent.");
}

function addPartnerEngagement(slide) {
  addSlideTitle(slide, "Partners can turn the model into a repeatable engagement", { dark: true, width: 1140 });
  const steps = [
    ["01", "Identify the business action", "What outcome must execute?"],
    ["02", "Define assurance", "How much trust does it require?"],
    ["03", "Map the profile", "Which jurisdiction, providers, and events apply?"],
    ["04", "Prove the execution", "What evidence and measurable outcome remain?"],
  ];
  addDivider(slide, { name: "partner-path", left: 112, top: 370, width: 1056, height: 4, color: "#6E51DA" });
  steps.forEach((step, index) => {
    const left = 60 + index * 302;
    addRect(slide, {
      name: `partner-node-${index + 1}`,
      left: left + 88,
      top: 334,
      width: 72,
      height: 72,
      fill: index === 3 ? COLORS.purple : COLORS.white,
      radius: 36,
    });
    addText(slide, {
      name: `partner-number-${index + 1}`,
      text: step[0],
      left: left + 102,
      top: 356,
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
      top: 438,
      width: 248,
      height: 74,
      role: "componentTitle",
      fontSize: 22,
      color: COLORS.white,
      alignment: "center",
    });
    addText(slide, {
      name: `partner-body-${index + 1}`,
      text: step[2],
      left,
      top: 512,
      width: 248,
      height: 62,
      role: "body",
      fontSize: 21.5,
      color: "#E6DEFF",
      alignment: "center",
    });
  });
  addTakeaway(slide, "Lead with the outcome. Use assurance and Trust Events to design the solution.", { dark: true });
}

function addClose(slide) {
  addText(slide, {
    name: "close-kicker",
    text: "CORE MESSAGE",
    left: MARGIN,
    top: 130,
    width: 380,
    height: 28,
    role: "chrome",
    fontSize: 16,
    color: "#C9AEFF",
  });
  addText(slide, {
    name: "close-title",
    text: "Trust the entire execution.",
    left: MARGIN,
    top: 208,
    width: 1060,
    height: 92,
    role: "hero",
    fontSize: 62,
    color: COLORS.white,
  });
  addText(slide, {
    name: "close-signature",
    text: "Digital signatures establish trust in a signature.",
    left: MARGIN,
    top: 356,
    width: 1040,
    height: 50,
    role: "componentTitle",
    fontSize: 26,
    color: "#C9AEFF",
  });
  addText(slide, {
    name: "close-execution",
    text: "Circularo establishes trust in the complete execution—who or what acted, under which authority, what happened, and what can be proven afterwards.",
    left: MARGIN,
    top: 430,
    width: 1090,
    height: 108,
    role: "bodyBold",
    fontSize: 25,
    color: COLORS.white,
  });
  addDivider(slide, { name: "close-path", left: MARGIN, top: 582, width: 1118, height: 4, color: COLORS.purple });
  addText(slide, {
    name: "close-footer",
    text: "AUTHORIZED · EXECUTED CORRECTLY · TRUSTED · PROVABLE",
    left: MARGIN,
    top: 612,
    width: 1080,
    height: 30,
    role: "chrome",
    fontSize: 15,
    color: "#E6DEFF",
  });
}

const slides = [
  { kind: "cover", dark: true, sources: ["work/slides/digital-signatures-to-trusted-execution/assets/icons/"] },
  { kind: "operating-model", sources: ["work/slides/digital-signatures-to-trusted-execution/assets/icons/"] },
  { kind: "value-shift", dark: true },
  { kind: "business-outcome", sources: ["work/slides/digital-signatures-to-trusted-execution/assets/icons/"] },
  { kind: "trust-events" },
  { kind: "assurance", dark: true },
  { kind: "execution-profiles" },
  { kind: "trusted-layer", dark: true },
  { kind: "agentic-burden", sources: ["work/slides/digital-signatures-to-trusted-execution/assets/icons/sovereign-ai.png"] },
  { kind: "generations" },
  { kind: "strategic-proposition", dark: true },
  { kind: "delivery-routes" },
  { kind: "partner-engagement", dark: true },
  { kind: "close", dark: true },
];

async function renderSlide(presentation, spec, pageNumber) {
  const slide = await baseSlide(presentation, pageNumber, spec);
  switch (spec.kind) {
    case "cover": await addCover(slide); break;
    case "operating-model": await addOperatingModel(slide); break;
    case "value-shift": addValueShift(slide); break;
    case "business-outcome": await addBusinessOutcome(slide); break;
    case "trust-events": addTrustEvents(slide); break;
    case "assurance": addAssurance(slide); break;
    case "execution-profiles": addExecutionProfiles(slide); break;
    case "trusted-layer": addTrustedLayer(slide); break;
    case "agentic-burden": await addAgenticBurden(slide); break;
    case "generations": addGenerations(slide); break;
    case "strategic-proposition": addStrategicProposition(slide); break;
    case "delivery-routes": addDeliveryRoutes(slide); break;
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
  await writeBlob(path.join(BUILD, "digital-signatures-to-trusted-execution-montage.webp"), await presentation.export({ format: "webp", montage: true, scale: 1 }));
  const inspection = await presentation.inspect({ kind: "slide,textbox,shape,image,notes", maxChars: 50000 });
  await fs.writeFile(path.join(BUILD, "digital-signatures-to-trusted-execution.inspect.ndjson"), inspection.ndjson);

  const finalPath = path.join(OUTPUT, "digital-signatures-to-trusted-execution.pptx");
  const pptx = await PresentationFile.exportPptx(presentation);
  await pptx.save(finalPath);
  console.log(JSON.stringify({ finalPath, slides: slides.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
