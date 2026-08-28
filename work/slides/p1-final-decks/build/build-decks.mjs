import fs from "node:fs/promises";
import path from "node:path";
import { Presentation, PresentationFile } from "@oai/artifact-tool";
import {
  CANVAS,
  CHROME,
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
const TASK = path.join(ROOT, "work/slides/p1-final-decks");
const BUILD = path.join(TASK, "build");
const OUTPUT = path.join(TASK, "output");
const CORE_SOURCE = "work/p1/narrative/circularo-core-narrative.md";
const BRAND_SOURCE = ".agents/skills/circularo-slides/references/brand-system.md";

async function writeBlob(filePath, blob) {
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

function addInternalMark(slide, dark) {
  addText(slide, {
    name: "internal-mark",
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

async function baseSlide(presentation, deck, pageNumber, spec) {
  const slide = presentation.slides.add();
  const dark = Boolean(spec.dark);
  slide.background.fill = dark ? COLORS.darkBlue : COLORS.white;
  await addChrome(slide, pageNumber, { dark });
  addEyebrow(slide, deck.eyebrow, { dark, width: 720 });
  addInternalMark(slide, dark);
  addSources(slide, [deck.source, CORE_SOURCE, BRAND_SOURCE]);
  return slide;
}

function addBottomMessage(slide, text, { dark = false, top = 604 } = {}) {
  addDivider(slide, {
    left: MARGIN,
    top: top - 16,
    width: 740,
    color: dark ? "#6E51DA" : "#D6C1FF",
  });
  addText(slide, {
    name: "bottom-message",
    text,
    left: MARGIN,
    top,
    width: 1050,
    height: 54,
    role: "bodyBold",
    color: dark ? COLORS.white : COLORS.darkBlue,
  });
}

function addCover(slide, spec) {
  addRect(slide, {
    name: "cover-purple-band",
    left: 926,
    top: 0,
    width: 210,
    height: CANVAS.height,
    fill: COLORS.purple,
  });
  addRect(slide, {
    name: "cover-dark-band",
    left: 1136,
    top: 0,
    width: 144,
    height: CANVAS.height,
    fill: "#14006A",
  });
  addText(slide, {
    name: "cover-title",
    text: spec.title,
    left: MARGIN,
    top: 160,
    width: 790,
    height: 176,
    role: "hero",
    color: COLORS.white,
  });
  addText(slide, {
    name: "cover-tagline",
    text: spec.tagline,
    left: MARGIN,
    top: 360,
    width: 760,
    height: 110,
    role: "componentTitle",
    fontSize: 26,
    bold: false,
    color: "#E6DEFF",
  });
  addText(slide, {
    name: "cover-route",
    text: spec.route,
    left: MARGIN,
    top: 544,
    width: 760,
    height: 32,
    role: "chrome",
    fontSize: 15,
    color: "#C9AEFF",
  });
}

function addStatement(slide, spec) {
  addSlideTitle(slide, spec.title, { dark: spec.dark, width: 1140 });
  addText(slide, {
    name: "statement-primary",
    text: spec.primary,
    left: MARGIN,
    top: 266,
    width: spec.primaryWidth ?? 1050,
    height: 150,
    role: "hero",
    fontSize: spec.primarySize ?? 54,
    color: spec.dark ? COLORS.white : COLORS.darkBlue,
  });
  if (spec.support) {
    addText(slide, {
      name: "statement-support",
      text: spec.support,
      left: MARGIN,
      top: 448,
      width: 980,
      height: 100,
      role: "body",
      color: spec.dark ? "#E6DEFF" : COLORS.body,
    });
  }
  if (spec.bottom) addBottomMessage(slide, spec.bottom, { dark: spec.dark });
}

function addEvolution(slide, spec) {
  addSlideTitle(slide, spec.title, { dark: spec.dark, width: 1140 });
  const stages = spec.stages;
  const gap = 16;
  const width = (1184 - gap * (stages.length - 1)) / stages.length;
  const lineY = 342;
  addDivider(slide, {
    name: "evolution-baseline",
    left: MARGIN + 12,
    top: lineY,
    width: 1160,
    height: 3,
    color: spec.dark ? "#6E51DA" : COLORS.neutral300,
  });
  stages.forEach((stage, index) => {
    const left = MARGIN + index * (width + gap);
    addRect(slide, {
      name: `evolution-node-${index + 1}`,
      left: left + width / 2 - 13,
      top: lineY - 12,
      width: 26,
      height: 26,
      fill: index === stages.length - 1 ? COLORS.purple : (spec.dark ? COLORS.white : COLORS.darkBlue),
      radius: 13,
    });
    addText(slide, {
      name: `evolution-stage-${index + 1}`,
      text: stage,
      left,
      top: 378,
      width,
      height: 58,
      role: "componentTitle",
      fontSize: 24,
      color: spec.dark ? COLORS.white : COLORS.darkBlue,
      alignment: "center",
    });
  });
  addText(slide, {
    name: "evolution-support",
    text: spec.support,
    left: MARGIN,
    top: 474,
    width: 1100,
    height: 66,
    role: "body",
    color: spec.dark ? "#E6DEFF" : COLORS.body,
  });
  addBottomMessage(slide, spec.bottom, { dark: spec.dark });
}

function addContrast(slide, spec) {
  addSlideTitle(slide, spec.title, { dark: false, width: 1140 });
  addRect(slide, {
    name: "contrast-left",
    left: MARGIN,
    top: 226,
    width: 430,
    height: 386,
    fill: COLORS.darkBlue,
  });
  addText(slide, {
    name: "contrast-kicker",
    text: spec.leftLabel.toUpperCase(),
    left: 78,
    top: 266,
    width: 350,
    height: 26,
    role: "chrome",
    color: "#C9AEFF",
  });
  addText(slide, {
    name: "contrast-claim",
    text: spec.left,
    left: 78,
    top: 316,
    width: 340,
    height: 176,
    role: "sectionTitle",
    fontSize: spec.leftSize ?? 34,
    color: COLORS.white,
  });
  if (spec.leftSupport) {
    addText(slide, {
      name: "contrast-left-support",
      text: spec.leftSupport,
      left: 78,
      top: 510,
      width: 340,
      height: 68,
      role: "small",
      fontSize: 17,
      color: "#E6DEFF",
    });
  }
  addText(slide, {
    name: "contrast-right-label",
    text: spec.rightLabel,
    left: 536,
    top: 230,
    width: 640,
    height: 42,
    role: "componentTitle",
    color: COLORS.darkBlue,
  });
  spec.items.forEach((item, index) => {
    const top = 296 + index * 59;
    addRect(slide, {
      name: `contrast-dot-${index + 1}`,
      left: 536,
      top: top + 9,
      width: 8,
      height: 8,
      fill: COLORS.purple,
      radius: 8,
    });
    addText(slide, {
      name: `contrast-item-${index + 1}`,
      text: item,
      left: 560,
      top,
      width: 620,
      height: 48,
      role: "body",
      fontSize: 21.5,
      color: COLORS.body,
    });
  });
}

function addProcess(slide, spec) {
  addSlideTitle(slide, spec.title, { dark: spec.dark, width: 1140 });
  if (spec.subtitle) {
    addText(slide, {
      name: "process-subtitle",
      text: spec.subtitle,
      left: MARGIN,
      top: 202,
      width: 1080,
      height: 60,
      role: "body",
      color: spec.dark ? "#E6DEFF" : COLORS.body,
    });
  }
  const stages = spec.stages;
  const gap = 18;
  const width = (1184 - gap * (stages.length - 1)) / stages.length;
  const top = 322;
  addDivider(slide, {
    name: "process-baseline",
    left: MARGIN + 18,
    top: top + 28,
    width: 1148,
    height: 3,
    color: spec.dark ? "#6E51DA" : COLORS.neutral300,
  });
  stages.forEach((stage, index) => {
    const left = MARGIN + index * (width + gap);
    addRect(slide, {
      name: `process-node-${index + 1}`,
      left: left + width / 2 - 28,
      top,
      width: 56,
      height: 56,
      fill: index === stages.length - 1 ? COLORS.purple : (spec.dark ? COLORS.white : COLORS.softPurple),
      lineFill: spec.dark ? COLORS.white : COLORS.purple,
      lineWidth: 2,
      radius: 12,
    });
    addText(slide, {
      name: `process-number-${index + 1}`,
      text: String(index + 1),
      left: left + width / 2 - 22,
      top: top + 12,
      width: 44,
      height: 28,
      role: "bodyBold",
      color: index === stages.length - 1 ? COLORS.white : COLORS.darkBlue,
      alignment: "center",
    });
    addText(slide, {
      name: `process-label-${index + 1}`,
      text: stage,
      left,
      top: top + 82,
      width,
      height: 56,
      role: "componentTitle",
      fontSize: stages.length > 5 ? 20 : 22,
      color: spec.dark ? COLORS.white : COLORS.darkBlue,
      alignment: "center",
    });
  });
  addBottomMessage(slide, spec.bottom, { dark: spec.dark, top: 570 });
}

function addTiles(slide, spec) {
  addSlideTitle(slide, spec.title, { dark: spec.dark, width: 1140 });
  if (spec.subtitle) {
    addText(slide, {
      name: "tiles-subtitle",
      text: spec.subtitle,
      left: MARGIN,
      top: 204,
      width: 1060,
      height: 60,
      role: "body",
      color: spec.dark ? "#E6DEFF" : COLORS.body,
    });
  }
  const items = spec.items;
  const cols = spec.columns ?? items.length;
  const rows = Math.ceil(items.length / cols);
  const gap = 20;
  const width = (1184 - gap * (cols - 1)) / cols;
  const totalHeight = rows === 1 ? 300 : 336;
  const height = (totalHeight - gap * (rows - 1)) / rows;
  items.forEach((item, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const left = MARGIN + col * (width + gap);
    const top = 286 + row * (height + gap);
    const fill = spec.dark ? (index === 0 ? COLORS.purple : "#2A129B") : (index === 0 && spec.highlightFirst ? COLORS.softPurple : COLORS.neutral50);
    addRect(slide, {
      name: `tile-${index + 1}`,
      left,
      top,
      width,
      height,
      fill,
      lineFill: spec.dark ? "#6E51DA" : COLORS.neutral200,
      lineWidth: 1,
      radius: 12,
    });
    addText(slide, {
      name: `tile-title-${index + 1}`,
      text: item.title,
      left: left + 22,
      top: top + 24,
      width: width - 44,
      height: 58,
      role: "componentTitle",
      fontSize: cols >= 4 ? 23 : 26,
      color: spec.dark ? COLORS.white : COLORS.darkBlue,
    });
    addText(slide, {
      name: `tile-body-${index + 1}`,
      text: item.body,
      left: left + 22,
      top: top + (rows === 1 ? 102 : 82),
      width: width - 44,
      height: height - (rows === 1 ? 126 : 100),
      role: "body",
      fontSize: cols >= 4 ? 19 : 21.5,
      color: spec.dark ? "#E6DEFF" : COLORS.body,
    });
  });
  if (spec.bottom) addBottomMessage(slide, spec.bottom, { dark: spec.dark, top: 626 });
}

function addLayer(slide, spec) {
  addSlideTitle(slide, spec.title, { dark: spec.dark, width: 1140 });
  const layers = spec.layers;
  const fills = spec.dark
    ? ["#3D22AF", COLORS.purple, "#14006A"]
    : [COLORS.softPurple, COLORS.purple, COLORS.darkBlue];
  layers.forEach((layer, index) => {
    const top = 236 + index * 118;
    addRect(slide, {
      name: `layer-${index + 1}`,
      left: MARGIN,
      top,
      width: 1184,
      height: 94,
      fill: fills[index],
      radius: index === 1 ? 12 : 0,
    });
    addText(slide, {
      name: `layer-label-${index + 1}`,
      text: layer.label.toUpperCase(),
      left: 72,
      top: top + 19,
      width: 260,
      height: 24,
      role: "chrome",
      color: index === 0 && !spec.dark ? COLORS.purple : COLORS.white,
    });
    addText(slide, {
      name: `layer-text-${index + 1}`,
      text: layer.text,
      left: 330,
      top: top + 19,
      width: 850,
      height: 54,
      role: "componentTitle",
      fontSize: 24,
      color: index === 0 && !spec.dark ? COLORS.darkBlue : COLORS.white,
      alignment: "right",
    });
  });
  addBottomMessage(slide, spec.bottom, { dark: spec.dark, top: 612 });
}

function addSplit(slide, spec) {
  addSlideTitle(slide, spec.title, { dark: spec.dark, width: 1140 });
  const leftFill = spec.dark ? "#2A129B" : COLORS.neutral50;
  const rightFill = spec.dark ? COLORS.purple : COLORS.softPurple;
  const panels = [
    { ...spec.left, left: MARGIN, fill: leftFill },
    { ...spec.right, left: 656, fill: rightFill },
  ];
  panels.forEach((panel, index) => {
    addRect(slide, {
      name: `split-panel-${index + 1}`,
      left: panel.left,
      top: 244,
      width: 576,
      height: 350,
      fill: panel.fill,
      lineFill: spec.dark ? "#6E51DA" : COLORS.neutral200,
      lineWidth: 1,
      radius: 12,
    });
    addText(slide, {
      name: `split-title-${index + 1}`,
      text: panel.title,
      left: panel.left + 28,
      top: 276,
      width: 520,
      height: 62,
      role: "sectionTitle",
      fontSize: 30,
      color: spec.dark ? COLORS.white : COLORS.darkBlue,
    });
    addText(slide, {
      name: `split-body-${index + 1}`,
      text: panel.body,
      left: panel.left + 28,
      top: 362,
      width: 520,
      height: 192,
      role: "body",
      fontSize: 21.5,
      color: spec.dark ? "#E6DEFF" : COLORS.body,
    });
  });
  if (spec.bottom) addBottomMessage(slide, spec.bottom, { dark: spec.dark, top: 622 });
}

function addBoundary(slide, spec) {
  addSlideTitle(slide, spec.title, { dark: spec.dark, width: 1140 });
  addText(slide, {
    name: "boundary-subtitle",
    text: spec.subtitle,
    left: MARGIN,
    top: 204,
    width: 1060,
    height: 58,
    role: "body",
    color: spec.dark ? "#E6DEFF" : COLORS.body,
  });
  const cols = 5;
  const gap = 16;
  const width = (1184 - gap * 4) / 5;
  spec.items.forEach((item, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const left = MARGIN + col * (width + gap);
    const top = 296 + row * 134;
    addRect(slide, {
      name: `boundary-item-${index + 1}`,
      left,
      top,
      width,
      height: 102,
      fill: row === 0 ? COLORS.softPurple : COLORS.neutral50,
      lineFill: row === 0 ? "#D6C1FF" : COLORS.neutral200,
      lineWidth: 1,
      radius: 12,
    });
    addText(slide, {
      name: `boundary-text-${index + 1}`,
      text: item,
      left: left + 12,
      top: top + 31,
      width: width - 24,
      height: 38,
      role: "componentTitle",
      fontSize: 21,
      color: COLORS.darkBlue,
      alignment: "center",
    });
  });
  addBottomMessage(slide, spec.bottom, { dark: spec.dark, top: 586 });
}

function addBands(slide, spec) {
  addSlideTitle(slide, spec.title, { dark: spec.dark, width: 1140 });
  spec.bands.forEach((band, index) => {
    const top = 246 + index * 116;
    const fill = spec.dark
      ? (index === 1 ? COLORS.purple : "#2A129B")
      : (index === 1 ? COLORS.softPurple : COLORS.neutral50);
    addRect(slide, {
      name: `band-${index + 1}`,
      left: MARGIN,
      top,
      width: 1184,
      height: 90,
      fill,
      lineFill: spec.dark ? "#6E51DA" : COLORS.neutral200,
      lineWidth: 1,
      radius: 12,
    });
    addText(slide, {
      name: `band-label-${index + 1}`,
      text: band.label.toUpperCase(),
      left: 72,
      top: top + 21,
      width: 230,
      height: 24,
      role: "chrome",
      color: spec.dark ? "#C9AEFF" : COLORS.purple,
    });
    addText(slide, {
      name: `band-text-${index + 1}`,
      text: band.text,
      left: 300,
      top: top + 20,
      width: 870,
      height: 52,
      role: "componentTitle",
      fontSize: 24,
      color: spec.dark ? COLORS.white : COLORS.darkBlue,
      alignment: "right",
    });
  });
  if (spec.bottom) addBottomMessage(slide, spec.bottom, { dark: spec.dark, top: 610 });
}

function addRoutes(slide, spec) {
  addSlideTitle(slide, spec.title, { dark: spec.dark, width: 1140 });
  const gap = 22;
  const width = (1184 - gap * 2) / 3;
  spec.routes.forEach((route, index) => {
    const left = MARGIN + index * (width + gap);
    addText(slide, {
      name: `route-number-${index + 1}`,
      text: `0${index + 1}`,
      left,
      top: 242,
      width,
      height: 42,
      role: "sectionTitle",
      color: COLORS.purple,
    });
    addText(slide, {
      name: `route-title-${index + 1}`,
      text: route.title,
      left,
      top: 300,
      width,
      height: 68,
      role: "sectionTitle",
      fontSize: 29,
      color: spec.dark ? COLORS.white : COLORS.darkBlue,
    });
    addText(slide, {
      name: `route-body-${index + 1}`,
      text: route.body,
      left,
      top: 390,
      width,
      height: 136,
      role: "body",
      fontSize: 21,
      color: spec.dark ? "#E6DEFF" : COLORS.body,
    });
  });
  addBottomMessage(slide, spec.bottom, { dark: spec.dark, top: 590 });
}

function addClose(slide, spec) {
  addText(slide, {
    name: "close-kicker",
    text: spec.kicker.toUpperCase(),
    left: MARGIN,
    top: 132,
    width: 700,
    height: 30,
    role: "chrome",
    color: "#C9AEFF",
  });
  addText(slide, {
    name: "close-title",
    text: spec.title,
    left: MARGIN,
    top: 196,
    width: 1060,
    height: 170,
    role: "hero",
    fontSize: 58,
    color: COLORS.white,
  });
  addText(slide, {
    name: "close-body",
    text: spec.body,
    left: MARGIN,
    top: 394,
    width: 980,
    height: 92,
    role: "body",
    fontSize: 24,
    color: "#E6DEFF",
  });
  addRect(slide, {
    name: "close-action",
    left: MARGIN,
    top: 536,
    width: 1120,
    height: 70,
    fill: COLORS.purple,
    radius: 12,
  });
  addText(slide, {
    name: "close-action-text",
    text: spec.action,
    left: 76,
    top: 555,
    width: 1060,
    height: 34,
    role: "componentTitle",
    fontSize: 23,
    color: COLORS.white,
    alignment: "center",
  });
}

async function renderSlide(presentation, deck, spec, pageNumber) {
  const slide = await baseSlide(presentation, deck, pageNumber, spec);
  switch (spec.kind) {
    case "cover": addCover(slide, spec); break;
    case "statement": addStatement(slide, spec); break;
    case "evolution": addEvolution(slide, spec); break;
    case "contrast": addContrast(slide, spec); break;
    case "process": addProcess(slide, spec); break;
    case "tiles": addTiles(slide, spec); break;
    case "layer": addLayer(slide, spec); break;
    case "split": addSplit(slide, spec); break;
    case "boundary": addBoundary(slide, spec); break;
    case "bands": addBands(slide, spec); break;
    case "routes": addRoutes(slide, spec); break;
    case "close": addClose(slide, spec); break;
    default: throw new Error(`Unknown slide kind: ${spec.kind}`);
  }
  return slide;
}

const company = {
  key: "circularo-company",
  eyebrow: "Circularo company narrative",
  source: "work/p1/decks/00-circularo-company.md",
  slides: [
    { kind: "cover", dark: true, title: "Circularo", tagline: "Trusted execution for the agentic era", route: "PEOPLE · ORGANIZATIONS · APPLICATIONS · AI AGENTS" },
    { kind: "evolution", title: "More autonomy creates a greater burden of trust", stages: ["Paper", "Digital", "Automated", "AI-Assisted", "Agentic"], support: "As software and AI take on more work, institutional control must become explicit at the point of action.", bottom: "Identity · Authority · Policy · Approval · Evidence · Audit" },
    { kind: "contrast", title: "Intelligence does not create authority", leftLabel: "AI capability", left: "Understand. Analyze. Recommend. Generate. Plan.", leftSupport: "Capability can propose an action. It does not authorize execution.", rightLabel: "Before a consequential action executes", items: ["Who or what is acting?", "Whom does the actor represent?", "What is the actor permitted to do?", "Which policy and approval apply?", "What evidence will remain?"] },
    { kind: "process", title: "Disconnected tools fragment accountability", subtitle: "Every handoff can separate the final record from the decisions that produced it.", stages: ["Create", "Review", "Approve", "Sign", "Preserve", "Analyze"], bottom: "The organization must reconstruct versions, permissions, decisions, and evidence after the fact." },
    { kind: "process", title: "Trust starts before the signature", subtitle: "The signature is one trust event within a larger governed lifecycle.", stages: ["Create", "Collaborate", "Approve", "Execute", "Evidence", "Preserve"], bottom: "The evidence chain begins when consequential content is created—and remains connected afterwards." },
    { kind: "layer", title: "Circularo provides the Trusted Execution Layer", layers: [
      { label: "Actors", text: "People · Organizations · Applications · AI Agents" },
      { label: "Circularo", text: "Trusted Execution Layer" },
      { label: "Controls + evidence", text: "Identity · Authority · Policy · Approval · Trust · Evidence · Records" },
    ], bottom: "Circularo connects institutional control with actual execution." },
    { kind: "tiles", title: "Identity establishes who. Authority determines what.", columns: 4, items: [
      { title: "Identity", body: "Who or what are you?" },
      { title: "Representation", body: "Whom do you represent?" },
      { title: "Authority", body: "What may you do?" },
      { title: "Policy", body: "What is required here?" },
    ], bottom: "Identity is foundational. Consequential action also requires authority, policy, and approval." },
    { kind: "split", title: "A trusted process creates more than a file", left: { title: "A stored file", body: "Where is it?\n\nCan I retrieve it?" }, right: { title: "A trusted record", body: "Who acted?\nWhat was approved?\nWhich version executed?\nWhat evidence remains?" }, bottom: "The record preserves the authoritative connection between action, decision, and evidence." },
    { kind: "process", title: "Trusted records become institutional memory", stages: ["Documents", "Trusted records", "Searchable evidence", "Institutional knowledge"], bottom: "The archive becomes a trusted account of what the organization knew, decided, approved, and executed." },
    { kind: "tiles", title: "Trusted context gives AI a safer path to action", columns: 3, items: [
      { title: "KNOW", body: "Extract · Summarize · Classify · Translate · Retrieve" },
      { title: "ADVISE", body: "Identify obligations · Surface risk · Detect anomalies · Recommend" },
      { title: "ACT", body: "Prepare actions · Initiate workflows · Request approvals · Invoke permitted services" },
    ], bottom: "Action remains bounded by authority, policy, approval, evidence, and audit." },
    { kind: "process", dark: true, title: "Agentic action must remain governed", subtitle: "An agent may prepare or initiate an action without having authority to approve or complete it.", stages: ["Identity", "Authority", "Policy", "Approval", "Execution", "Evidence + audit"], bottom: "Govern what an agent may execute—not how the model reasons internally." },
    { kind: "bands", title: "Trust becomes programmable", bands: [
      { label: "Channels", text: "People · Portals · Enterprise Systems · Applications · AI Agents" },
      { label: "Trust layer", text: "Governed APIs · Consistent policy · Continuous evidence" },
      { label: "Outcome", text: "The same institutional trust model across every digital channel" },
    ], bottom: "The API is how trusted execution extends across the digital environment." },
    { kind: "contrast", title: "The strategic outcome is a System of Authority", leftLabel: "Systems of record", left: "What information do we have?", rightLabel: "A System of Authority answers", items: ["Who or what acted—and for whom?", "Was the actor authorized?", "What was approved and executed?", "Which evidence exists?", "What may execute next?"] },
    { kind: "routes", dark: true, title: "One trust model. Three routes to value.", routes: [
      { title: "Circularo SaaS", body: "Managed trusted execution for a faster path to unified digital work." },
      { title: "Circularo Sovereign", body: "Customer-controlled trusted execution within a defined sovereignty boundary." },
      { title: "Shared Services", body: "Reusable sovereign trust infrastructure across many government entities." },
    ], bottom: "Choose the business action that most needs authority, control, and durable evidence." },
  ],
};

const saas = {
  key: "circularo-saas",
  eyebrow: "Circularo SaaS",
  source: "work/p1/decks/01-circularo-saas.md",
  slides: [
    { kind: "cover", dark: true, title: "Circularo SaaS", tagline: "One managed environment for trusted digital work", route: "CREATE · APPROVE · EXECUTE · EVIDENCE · PRESERVE" },
    { kind: "tiles", title: "Digital work has expanded beyond the signature", columns: 4, items: [
      { title: "Content", body: "Documents and records" }, { title: "Collaboration", body: "Review and decisions" },
      { title: "Approval", body: "Authority and policy" }, { title: "Identity", body: "Actors and assurance" },
      { title: "Signatures", body: "Personal and organizational" }, { title: "Automation", body: "Workflows and APIs" },
      { title: "Evidence", body: "Audit and verification" }, { title: "AI", body: "Knowledge and governed action" },
    ], bottom: "Most organizations still manage these stages across disconnected systems." },
    { kind: "process", title: "Fragmentation transfers the trust problem to you", subtitle: "Each system solves part of the process. Your organization must connect the context.", stages: ["Content", "Workflow", "Identity", "Signature", "Archive", "AI"], bottom: "Versions, decisions, permissions, integrations, and evidence become your responsibility to reconcile." },
    { kind: "contrast", title: "A signature answers only part of the business question", leftLabel: "Final event", left: "The document was signed.", leftSupport: "Important—but not sufficient for complete accountability.", rightLabel: "The wider execution must establish", items: ["Who acted and whether they were authorized", "Which version and decision were approved", "What process and assurance applied", "Whether the record changed", "Whether the complete execution can be verified"] },
    { kind: "process", title: "The ideal state is one trusted digital workspace", stages: ["Create", "Collaborate", "Approve", "Sign or seal", "Evidence", "Retrieve"], bottom: "Users work in one coherent experience while the organization retains one governed lifecycle." },
    { kind: "layer", title: "Circularo SaaS connects the complete trust chain", layers: [
      { label: "Experience", text: "People · External parties · Applications" },
      { label: "Circularo SaaS", text: "Managed Trusted Execution Layer" },
      { label: "Trust chain", text: "Identity · Authority · Policy · Approval · Sign & Seal · Evidence · Records" },
    ], bottom: "One managed platform connects the controls around the action with the evidence that remains." },
    { kind: "process", title: "The evidence chain starts before signing", subtitle: "Process context remains connected as content moves through its lifecycle.", stages: ["Draft", "Co-author", "Review", "Version", "Approve", "Execute"], bottom: "The authoritative version, participants, decisions, and trust events remain part of the record." },
    { kind: "split", title: "The outcome is a trusted record—not just storage", left: { title: "Traditional storage", body: "Where is the file?\n\nCan I retrieve it?" }, right: { title: "Trusted record", body: "Who acted?\nWhat was approved?\nWhich version executed?\nWhat evidence exists?" }, bottom: "Trusted records preserve the context behind agreements, decisions, approvals, and official actions." },
    { kind: "process", title: "Trusted records build institutional memory", stages: ["Documents", "Trusted records", "Searchable evidence", "Institutional knowledge"], bottom: "The organization retains the context behind its actions—not only the final documents." },
    { kind: "tiles", title: "Trusted context creates a safer path to AI-enabled work", columns: 3, items: [
      { title: "KNOW", body: "Extract · Summarize · Classify · Translate · Retrieve" },
      { title: "ADVISE", body: "Identify obligations · Surface risk · Detect anomalies · Recommend" },
      { title: "ACT", body: "Prepare actions · Initiate workflows · Request approvals · Invoke services" },
    ], bottom: "Actions remain bounded by authority, policy, approval, evidence, and audit." },
    { kind: "bands", title: "One trust layer can serve people, systems, and agents", bands: [
      { label: "People", text: "Web and mobile experiences" },
      { label: "Applications", text: "Integrations, portals, and governed APIs" },
      { label: "AI agents", text: "Permitted actions inside the same governance and evidence model" },
    ], bottom: "One trust layer · Multiple channels · Consistent policy · Continuous evidence" },
    { kind: "tiles", title: "Managed delivery reduces the infrastructure burden", columns: 4, items: [
      { title: "Adopt", body: "Launch trusted workflows without operating the platform infrastructure." },
      { title: "Configure", body: "Fit the process, authority, assurance, and evidence model." },
      { title: "Connect", body: "Integrate existing identities and enterprise systems." },
      { title: "Expand", body: "Reuse the platform pattern across additional workflows." },
    ], bottom: "Start with a specific use case and expand as adoption grows." },
    { kind: "split", title: "Design enterprise fit and pilot proof together", left: { title: "Enterprise boundaries", body: "Security · Data location · Identity · Integration · Migration · Operating responsibility" }, right: { title: "Pilot proof", body: "Business process · Actors · Approvals · Assurance · Integrations · Evidence · Measurable outcomes" }, bottom: "Make the requirements and success criteria explicit before rollout." },
    { kind: "close", dark: true, kicker: "Next step", title: "Identify your first trusted workflow", body: "Start where stronger accountability and a continuous evidence chain will create the clearest business value.", action: "Discovery → Use-case design → Solution design → Pilot → Rollout" },
  ],
};

const sovereign = {
  key: "circularo-sovereign",
  eyebrow: "Circularo Sovereign",
  source: "work/p1/decks/02-circularo-sovereign.md",
  slides: [
    { kind: "cover", dark: true, title: "Circularo Sovereign", tagline: "Trusted execution under your control", route: "INFRASTRUCTURE · DATA · IDENTITY · KEYS · POLICY · EVIDENCE" },
    { kind: "evolution", dark: true, title: "Digital trust is becoming critical infrastructure", stages: ["Paper", "Digital", "Automated", "AI-Assisted", "Agentic"], support: "Digital processes increasingly determine authority, approval, access, official records, and automated execution.", bottom: "Greater autonomy increases the need to control how actions are authorized, executed, and evidenced." },
    { kind: "boundary", title: "Sovereignty is more than data residency", subtitle: "The sovereignty boundary is the set of controls your organization cannot delegate.", items: ["Infrastructure", "Data", "Identity", "Keys", "Policy", "Integrations", "Evidence", "AI", "Operations", "Jurisdiction"], bottom: "True sovereignty begins by deciding who controls each dimension." },
    { kind: "split", title: "The traditional choice is no longer sufficient", left: { title: "Modern SaaS", body: "Fast access to innovation—but the delivery model may sit outside the required control boundary." }, right: { title: "Traditional on-premises", body: "Local control—but often with fragmented capabilities and operational complexity." }, bottom: "The target state is modern platform capability inside a customer-controlled environment." },
    { kind: "process", title: "Local systems can still fragment accountability", subtitle: "Running every component locally does not create a continuous trust chain by itself.", stages: ["Identity", "PKI", "Workflow", "eSignature", "Archive", "AI"], bottom: "Versions, decisions, permissions, trust events, and evidence must remain connected." },
    { kind: "layer", dark: true, title: "Circularo Sovereign puts trusted execution inside the boundary", layers: [
      { label: "Actors", text: "People · Organizations · Applications · AI Agents" },
      { label: "Circularo Sovereign", text: "Customer-controlled Trusted Execution Layer" },
      { label: "Controls + evidence", text: "Identity · Authority · Policy · Trust Services · Evidence · Audit · Records" },
    ], bottom: "The execution environment operates inside the agreed sovereignty boundary." },
    { kind: "split", title: "Control the boundary without isolating the platform", left: { title: "Inside the boundary", body: "Infrastructure · Data · Identity · Keys · Policy · Evidence · AI · Operations" }, right: { title: "Connected investments", body: "National Identity · IAM · PKI · CA · HSM · TSA · Trust-Service Providers · Enterprise Systems" }, bottom: "Orchestrate and evidence business execution around trusted infrastructure—not replace it unnecessarily." },
    { kind: "tiles", title: "Identity establishes who. Sovereign policy determines what.", columns: 4, items: [
      { title: "Identity", body: "Who or what are you?" },
      { title: "Representation", body: "Whom do you represent?" },
      { title: "Authority", body: "What may you do?" },
      { title: "Boundary", body: "What must remain under control?" },
    ], bottom: "Policy, approval, execution, evidence, and audit remain inside the defined boundary." },
    { kind: "process", title: "The evidence chain remains under organizational control", stages: ["Create", "Review", "Approve", "Execute", "Evidence", "Preserve"], bottom: "The authoritative version, participants, decisions, trust events, and audit history remain connected." },
    { kind: "process", title: "Sovereign records become sovereign institutional memory", stages: ["Trusted records", "Searchable evidence", "Connected decisions", "Institutional knowledge"], bottom: "Provenance, permissions, decisions, and evidence remain meaningful—and remain under control." },
    { kind: "tiles", dark: true, title: "Sovereign AI needs trusted context and bounded action", columns: 3, items: [
      { title: "KNOW", body: "Use permission-controlled institutional records." },
      { title: "ADVISE", body: "Operate inside the organization's data and policy boundary." },
      { title: "ACT", body: "Execute only through authority, approval, and evidence." },
    ], bottom: "The model may reason. The institution remains in control of what executes." },
    { kind: "bands", title: "Programmable trust stays inside the same control model", bands: [
      { label: "Channels", text: "People · Portals · Enterprise Systems · Applications · Approved AI Agents" },
      { label: "Governed APIs", text: "Consistent authority · Policy · Approval · Evidence · Audit" },
      { label: "Boundary", text: "The same sovereign controls apply across every channel" },
    ], bottom: "API access extends the trust layer without weakening the sovereignty model." },
    { kind: "tiles", title: "A credible sovereign model joins architecture, operations, and proof", columns: 3, items: [
      { title: "Architecture", body: "Deployment · Security · Identity · Keys · Integration · Continuity" },
      { title: "Operations", body: "Ownership · Upgrades · Support · Lifecycle · Disaster recovery" },
      { title: "Pilot proof", body: "A real workflow · Required controls · Evidence · Measurable success" },
    ], bottom: "Control is credible only when responsibilities and operating procedures are explicit." },
    { kind: "close", dark: true, kicker: "Next step", title: "Define your sovereignty boundary", body: "Decide what must remain under your control, where the platform must operate, and which trust infrastructure already exists.", action: "Sovereignty discovery → Architecture → Operating model → Pilot → Expansion" },
  ],
};

const shared = {
  key: "circularo-sovereign-trust-shared-services",
  eyebrow: "Sovereign Trust Shared Services",
  source: "work/p1/decks/03-sovereign-trust-shared-services.md",
  slides: [
    { kind: "cover", dark: true, title: "Sovereign Trust Shared Services", tagline: "Build trusted execution once. Make it reusable across government.", route: "MINISTRIES · AGENCIES · PUBLIC SERVICES · APPLICATIONS · AI AGENTS" },
    { kind: "statement", title: "Digital trust is becoming shared national infrastructure", primary: "Identity. Networks. Payments. Cloud. Cybersecurity. Trusted execution.", primarySize: 46, support: "As public services become more automated and agentic, trusted execution becomes another reusable infrastructure layer.", bottom: "The opportunity is to establish the trust layer once—then make it consumable across government." },
    { kind: "evolution", dark: true, title: "Government transactions are becoming machine-executable", stages: ["Paper", "Digital", "Automated", "AI-Assisted", "Agentic"], support: "Applications and AI agents will increasingly prepare, initiate, and execute public-sector processes.", bottom: "As autonomy increases, government must strengthen authority, policy, approval, evidence, and audit." },
    { kind: "tiles", title: "National identity answers who. Trusted execution answers what may happen.", columns: 4, items: [
      { title: "Identity", body: "Who are you?" },
      { title: "Representation", body: "Whom do you represent?" },
      { title: "Authority", body: "What may you do?" },
      { title: "Execution", body: "What was approved and executed?" },
    ], bottom: "Identity is foundational. It is not the complete execution model." },
    { kind: "process", title: "Separate trust stacks fragment government", subtitle: "Each entity separately procures and integrates part of the trust lifecycle.", stages: ["Workflow", "eSignature", "Identity", "Evidence", "Records", "AI"], bottom: "The result is duplicated integration, inconsistent governance, and incompatible evidence models." },
    { kind: "statement", dark: true, title: "The alternative is trust as a shared service", primary: "Build once. Govern centrally. Consume across government.", primarySize: 52, support: "Shared infrastructure establishes common trust capabilities while each entity retains its own services, roles, policies, and adoption path.", bottom: "One shared trust model. Many entity-owned services." },
    { kind: "layer", title: "A national Trusted Execution Layer connects identity to evidence", layers: [
      { label: "Actors", text: "Citizens · Employees · Organizations · Applications · AI Agents" },
      { label: "Shared layer", text: "Sovereign Trusted Execution Layer" },
      { label: "Trust chain", text: "Identity · Authority · Policy · Approval · Trust Services · Evidence · Records · Audit" },
    ], bottom: "The shared layer turns national trust infrastructure into reusable execution capabilities." },
    { kind: "bands", title: "This is enabling infrastructure—not another government application", bands: [
      { label: "Entities", text: "Ministries · Agencies · Municipalities · Authorities · Government-owned organizations" },
      { label: "Shared platform", text: "Common execution, trust, evidence, and API capabilities" },
      { label: "Entity services", text: "Each entity builds and operates services within the shared governance model" },
    ], bottom: "The platform is shared. Service ownership and policy remain explicit." },
    { kind: "tiles", title: "Reusable services reduce repeated integration", columns: 3, items: [
      { title: "Execute", body: "Workflow · Approval · eSigning · eSealing · Timestamps" },
      { title: "Evidence", body: "Identity integration · Evidence · Trusted records · Verification" },
      { title: "Extend", body: "Governed APIs · Automation · Approved AI execution" },
    ], bottom: "Each entity consumes the capabilities it needs within the shared trust model." },
    { kind: "split", title: "Preserve existing national investments", left: { title: "National infrastructure", body: "National eID · Government IAM · PKI and CA · HSM · TSA · Trust-Service Providers · Government Cloud" }, right: { title: "Circularo's role", body: "Connect trusted infrastructure to business workflows, institutional authority, execution, evidence, and records." }, bottom: "Integrate national investments—do not replace them unnecessarily." },
    { kind: "process", title: "One evidence model strengthens accountability across government", stages: ["Create", "Review", "Approve", "Execute", "Evidence", "Verify"], bottom: "Consistent evidence principles can coexist with clear entity ownership, permissions, and record boundaries." },
    { kind: "tiles", title: "Trusted records create institutional memory at every level", columns: 3, items: [
      { title: "Entity records", body: "Preserve the context of local decisions and services." },
      { title: "Shared standards", body: "Make execution more consistent and verifiable." },
      { title: "Governed knowledge", body: "Support learning where policy and classification allow it." },
    ], bottom: "Shared infrastructure does not require unrestricted cross-entity data access." },
    { kind: "bands", dark: true, title: "Agentic government requires governed, programmable execution", bands: [
      { label: "Actors + channels", text: "Portals · Mobile services · Ministry systems · Shared platforms · Approved AI agents" },
      { label: "Authority boundary", text: "Identity · Delegated authority · Policy · Approval" },
      { label: "Execution record", text: "Governed APIs · Execution · Evidence · Audit" },
    ], bottom: "AI may prepare or initiate an action. Public authority still determines what may execute." },
    { kind: "tiles", title: "Sovereignty and shared governance must be designed together", columns: 4, items: [
      { title: "Ownership", body: "Platform · Funding · Service management" },
      { title: "Control", body: "Infrastructure · Data · Identity · Keys" },
      { title: "Entities", body: "Tenancy · Policy · Evidence · Onboarding" },
      { title: "Operations", body: "Security · Support · Continuity · Lifecycle" },
    ], bottom: "The architecture can be national from the beginning without requiring every entity to migrate at once." },
    { kind: "close", dark: true, kicker: "Next step", title: "Define the shared trust architecture", body: "Begin with common capabilities that remove duplication, strengthen accountability, and can be proven across more than one entity.", action: "Discovery → Stakeholder alignment → Blueprint → Initial services → Multi-entity pilot" },
  ],
};

async function buildDeck(deck) {
  const deckBuild = path.join(BUILD, deck.key);
  await fs.mkdir(deckBuild, { recursive: true });
  const presentation = Presentation.create({ slideSize: CANVAS });
  for (let index = 0; index < deck.slides.length; index += 1) {
    await renderSlide(presentation, deck, deck.slides[index], index + 1);
  }

  for (const [index, slide] of presentation.slides.items.entries()) {
    const stem = `slide-${String(index + 1).padStart(2, "0")}`;
    const png = await presentation.export({ slide, format: "png", scale: 1 });
    await writeBlob(path.join(deckBuild, `${stem}.png`), png);
    const layout = await slide.export({ format: "layout" });
    await fs.writeFile(path.join(deckBuild, `${stem}.layout.json`), await layout.text());
  }

  const montage = await presentation.export({ format: "webp", montage: true, scale: 1 });
  await writeBlob(path.join(deckBuild, `${deck.key}-artifact-montage.webp`), montage);

  const pptx = await PresentationFile.exportPptx(presentation);
  const outputPath = path.join(OUTPUT, `${deck.key}.pptx`);
  await pptx.save(outputPath);
  return { key: deck.key, outputPath, slides: deck.slides.length };
}

async function main() {
  await fs.mkdir(OUTPUT, { recursive: true });
  const decks = [company, saas, sovereign, shared];
  const results = [];
  for (const deck of decks) results.push(await buildDeck(deck));
  await fs.writeFile(path.join(BUILD, "build-results.json"), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
