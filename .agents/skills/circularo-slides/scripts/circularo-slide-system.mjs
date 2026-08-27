import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
export const SYSTEM_ROOT = path.resolve(MODULE_DIR, "..");

export const CANVAS = Object.freeze({ width: 1280, height: 720 });
export const MARGIN = 48;
export const CONTENT = Object.freeze({ left: 48, top: 48, width: 1184, height: 624 });
export const CHROME = Object.freeze({
  logo: Object.freeze({ left: 48, top: 24, width: 40, height: 40 }),
  eyebrow: Object.freeze({ left: 104, top: 31, width: 760, height: 24 }),
  titleTop: 96,
});

export const COLORS = Object.freeze({
  purple: "#7000FF",
  darkBlue: "#1D0090",
  body: "#3D3D3D",
  white: "#FFFFFF",
  neutral50: "#F8F9FC",
  neutral100: "#F2F4F7",
  neutral200: "#E4E7EC",
  neutral300: "#D0D5DD",
  neutral500: "#667085",
  neutral700: "#344054",
  neutral900: "#101828",
  softPurple: "#F5EDFF",
});

export const FONTS = Object.freeze({
  headline: "Spartan",
  body: "Mulish",
});

export const TYPE = Object.freeze({
  display: { fontSize: 72, typeface: FONTS.headline, bold: true },
  hero: { fontSize: 64, typeface: FONTS.headline, bold: true },
  slideTitle: { fontSize: 48, typeface: FONTS.headline, bold: true },
  sectionTitle: { fontSize: 32, typeface: FONTS.headline, bold: true },
  componentTitle: { fontSize: 26, typeface: FONTS.body, bold: true },
  body: { fontSize: 22, typeface: FONTS.body, bold: false },
  bodyBold: { fontSize: 22, typeface: FONTS.body, bold: true },
  small: { fontSize: 16, typeface: FONTS.body, bold: false },
  chrome: { fontSize: 14, typeface: FONTS.body, bold: true },
});

export const SPACING = Object.freeze({ xs: 8, sm: 16, md: 24, lg: 32, xl: 48, xxl: 64, huge: 96 });

export function addRect(slide, { name, left, top, width, height, fill, lineFill = "none", lineWidth = 0, radius = 0 }) {
  return slide.shapes.add({
    geometry: radius > 0 ? "roundRect" : "rect",
    name,
    position: { left, top, width, height },
    fill,
    line: { style: "solid", fill: lineFill, width: lineWidth },
    ...(radius > 0 ? { borderRadius: radius <= 8 ? "rounded-lg" : "rounded-xl" } : {}),
  });
}

export function addText(slide, {
  name,
  text,
  left,
  top,
  width,
  height,
  role = "body",
  color = COLORS.body,
  alignment = "left",
  fontSize,
  bold,
  typeface,
}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    name,
    position: { left, top, width, height },
    fill: "none",
    line: { style: "solid", fill: "none", width: 0 },
  });
  shape.text = text;
  const base = TYPE[role] ?? TYPE.body;
  shape.text.style = {
    ...base,
    color,
    alignment,
    ...(fontSize !== undefined ? { fontSize } : {}),
    ...(bold !== undefined ? { bold } : {}),
    ...(typeface !== undefined ? { typeface } : {}),
  };
  return shape;
}

export function addEyebrow(slide, text, { dark = false, width = CHROME.eyebrow.width } = {}) {
  return addText(slide, {
    name: "slide-eyebrow",
    text: text.toUpperCase(),
    left: CHROME.eyebrow.left,
    top: CHROME.eyebrow.top,
    width,
    height: CHROME.eyebrow.height,
    role: "chrome",
    color: dark ? "#C9AEFF" : COLORS.purple,
  });
}

export function addSlideTitle(slide, title, { subtitle, dark = false, top = CHROME.titleTop, width = 1080 } = {}) {
  addText(slide, {
    name: "slide-title",
    text: title,
    left: MARGIN,
    top,
    width,
    height: 132,
    role: "slideTitle",
    color: dark ? COLORS.white : COLORS.darkBlue,
  });
  if (subtitle) {
    addText(slide, {
      name: "slide-subtitle",
      text: subtitle,
      left: MARGIN,
      top: top + 118,
      width: Math.min(width, 980),
      height: 68,
      role: "body",
      color: dark ? COLORS.white : COLORS.body,
    });
  }
}

export function addDivider(slide, { name = "divider", left, top, width, height = 1, color = COLORS.neutral200 }) {
  return addRect(slide, { name, left, top, width, height, fill: color });
}

export function addSignatureLine(slide, { dark = false } = {}) {
  addDivider(slide, {
    name: "signature-line",
    left: MARGIN,
    top: CANVAS.height - 58,
    width: 250,
    color: dark ? "#FFFFFF" : COLORS.purple,
  });
}

const CRC32_TABLE = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) value = (value >>> 1) ^ (value & 1 ? 0xedb88320 : 0);
  return value >>> 0;
});

function crc32(bytes) {
  let value = 0xffffffff;
  for (const byte of bytes) value = CRC32_TABLE[(value ^ byte) & 0xff] ^ (value >>> 8);
  return (value ^ 0xffffffff) >>> 0;
}

async function readPngForSlide(relativePath, pageNumber) {
  const source = await fs.readFile(path.join(SYSTEM_ROOT, relativePath));
  let offset = 8;
  while (offset + 12 <= source.length) {
    const length = source.readUInt32BE(offset);
    const type = source.subarray(offset + 4, offset + 8).toString("ascii");
    if (type === "IEND") {
      const chunkType = Buffer.from("tEXt", "ascii");
      const data = Buffer.from(`CircularoSlide\0${pageNumber}`, "latin1");
      const chunk = Buffer.alloc(12 + data.length);
      chunk.writeUInt32BE(data.length, 0);
      chunkType.copy(chunk, 4);
      data.copy(chunk, 8);
      chunk.writeUInt32BE(crc32(Buffer.concat([chunkType, data])), 8 + data.length);
      const result = Buffer.concat([source.subarray(0, offset), chunk, source.subarray(offset)]);
      return result.buffer.slice(result.byteOffset, result.byteOffset + result.byteLength);
    }
    offset += 12 + length;
  }
  throw new Error(`Invalid PNG without IEND chunk: ${relativePath}`);
}

export async function addChrome(slide, pageNumber, { dark = false, signature = true } = {}) {
  const relativeLogo = dark
    ? "assets/logos/circularo-logo-symbol-white-circle-slide.png"
    : "assets/logos/circularo-logo-symbol-blue-circle-slide.png";
  const logo = await readPngForSlide(relativeLogo, pageNumber);
  slide.images.add({
    blob: logo,
    contentType: "image/png",
    alt: "Circularo symbol",
    fit: "contain",
    position: CHROME.logo,
  });
  addText(slide, {
    name: "page-number",
    text: String(pageNumber).padStart(2, "0"),
    left: CANVAS.width - MARGIN - 48,
    top: CANVAS.height - MARGIN + 4,
    width: 48,
    height: 20,
    role: "chrome",
    color: dark ? COLORS.white : COLORS.darkBlue,
    alignment: "right",
  });
  if (signature) addSignatureLine(slide, { dark });
}

export function addBulletList(slide, { name, items, left, top, width, color = COLORS.body, fontSize = TYPE.body.fontSize, gap = 14 }) {
  let cursor = top;
  items.forEach((item, index) => {
    addRect(slide, {
      name: `${name}-bullet-${index + 1}`,
      left,
      top: cursor + 10,
      width: 8,
      height: 8,
      fill: COLORS.purple,
      radius: 8,
    });
    addText(slide, {
      name: `${name}-text-${index + 1}`,
      text: item,
      left: left + 24,
      top: cursor,
      width: width - 24,
      height: 60,
      role: "body",
      color,
      fontSize,
    });
    cursor += 60 + gap;
  });
}

export function addSources(slide, sources) {
  slide.speakerNotes.textFrame.setText(`[Sources]\n${sources.map((source) => `- ${source}`).join("\n")}`);
  slide.speakerNotes.setVisible(true);
}
