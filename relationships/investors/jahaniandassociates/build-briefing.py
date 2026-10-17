"""Build the adviser briefing directly from its Markdown editing source.

Use the bundled python-docx runtime, then render with the documents skill renderer.
The Markdown owns wording; this file owns export layout and Markdown conversion.
"""

from pathlib import Path
import re

from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_TAB_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "strategic-shareholder-briefing.md"
OUTPUT = SOURCE.with_suffix(".docx")
markdown = SOURCE.read_text(encoding="utf-8")
match = re.match(r"^---\n(.*?)\n---\n", markdown, re.S)
if not match:
    raise ValueError("The Markdown briefing must begin with YAML frontmatter.")
metadata = match.group(1)
revision = re.search(r"^revision:\s*(\d+)\s*$", metadata, re.M).group(1)
body = markdown[match.end():].strip()
doc = Document()
section = doc.sections[0]
section.page_width = Inches(8.27)
section.page_height = Inches(11.69)
section.top_margin = Inches(0.55)
section.bottom_margin = Inches(0.55)
section.left_margin = Inches(0.72)
section.right_margin = Inches(0.72)
section.footer_distance = Inches(0.25)
width = 6.83

for name in ("Normal", "Title", "Subtitle", "Heading 1", "Heading 2"):
    style = doc.styles[name]
    style.font.name = "Arial"
    style.font.color.rgb = RGBColor(0, 0, 0)
    rpr = style.element.get_or_add_rPr()
    rpr.rFonts.set(qn("w:ascii"), "Arial")
    rpr.rFonts.set(qn("w:hAnsi"), "Arial")
normal = doc.styles["Normal"]
normal.font.size = Pt(10)
normal.paragraph_format.line_spacing = 1.04
normal.paragraph_format.space_after = Pt(4)
normal.paragraph_format.widow_control = True
for name, size, before, after in [
    ("Title", 21, 0, 6),
    ("Heading 1", 18, 0, 10),
    ("Heading 2", 11, 5, 5),
]:
    style = doc.styles[name]
    style.font.size = Pt(size)
    style.font.bold = True
    style.paragraph_format.space_before = Pt(before)
    style.paragraph_format.space_after = Pt(after)
    style.paragraph_format.keep_with_next = True
    ppr = style.element.find(qn("w:pPr"))
    if ppr is not None:
        borders = ppr.find(qn("w:pBdr"))
        if borders is not None:
            ppr.remove(borders)

doc.core_properties.title = "Circularo Strategic Shareholder Opportunity"
doc.core_properties.subject = "Confidential briefing for Joshua Jahani"
doc.core_properties.author = "Josef Neumann"
doc.core_properties.keywords = "Circularo, strategic shareholder, confidential, draft"
doc.core_properties.comments = f"Exported from Markdown revision {revision}."


def runs(paragraph, text, *, header=False, size=None):
    text = text.replace("<br>", "\n")
    for part in re.split(r"(\*\*.*?\*\*|\[COMPLETE[^\]]*\])", text, flags=re.S):
        if not part:
            continue
        strong = part.startswith("**") and part.endswith("**")
        if strong:
            part = part[2:-2]
        run = paragraph.add_run(part)
        if header or strong or part.startswith("[COMPLETE"):
            run.bold = True
        if size:
            run.font.size = Pt(size)
        if part.startswith("[COMPLETE"):
            run.font.color.rgb = RGBColor.from_string("8A4B08")


def add_paragraph(text, style=None):
    p = doc.add_paragraph(style=style)
    size = None
    if text.startswith("Prepared for Joshua") or text.startswith("Figures are management-reported"):
        size = 9
        p.paragraph_format.space_after = Pt(7)
    runs(p, text, size=size)
    return p


def add_table(lines):
    parsed = [
        [c.strip().replace(r"\|", "|") for c in line.strip().strip("|").split("|")]
        for line in lines
    ]
    if not all(re.fullmatch(r":?-+:?", cell) for cell in parsed[1]):
        raise ValueError("Invalid Markdown table separator.")
    records = [parsed[0], *parsed[2:]]
    columns = len(records[0])
    if not all(len(row) == columns for row in records):
        raise ValueError("Inconsistent Markdown table columns.")
    first = records[0][0]
    if first == "Metric":
        widths, numeric = [3.23, 1.8, 1.8], True
    elif first == "Platform":
        widths, numeric = [1.50, 2.65, 2.68], False
    else:
        widths, numeric = [1.68, 5.15], False
    if len(widths) != columns:
        widths, numeric = [width / columns] * columns, False
    table = doc.add_table(rows=len(records), cols=columns)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    for col, col_width in zip(table.columns, widths):
        col.width = Inches(col_width)
    tblpr = table._tbl.tblPr
    borders = OxmlElement("w:tblBorders")
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        item = OxmlElement("w:" + edge)
        for key, value in [("val", "single"), ("sz", "4"), ("color", "D9D9D9")]:
            item.set(qn("w:" + key), value)
        borders.append(item)
    tblpr.append(borders)
    margins = OxmlElement("w:tblCellMar")
    for edge, value in [("top", "80"), ("bottom", "80"), ("left", "105"), ("right", "105")]:
        item = OxmlElement("w:" + edge)
        item.set(qn("w:w"), value)
        item.set(qn("w:type"), "dxa")
        margins.append(item)
    tblpr.append(margins)
    repeat = OxmlElement("w:tblHeader")
    table.rows[0]._tr.get_or_add_trPr().append(repeat)
    for index, values in enumerate(records):
        row = table.rows[index]
        row._tr.get_or_add_trPr().append(OxmlElement("w:cantSplit"))
        for column, value in enumerate(values):
            cell = row.cells[column]
            cell.width = Inches(widths[column])
            cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
            p = cell.paragraphs[0]
            p.paragraph_format.line_spacing = 1.03
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(0)
            if numeric and column > 0:
                p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
            runs(p, value, header=index == 0, size=9.2)
            shade = OxmlElement("w:shd")
            shade.set(qn("w:fill"), "E8EDF2" if index == 0 else ("F6F7F8" if index % 2 == 0 else "FFFFFF"))
            cell._tc.get_or_add_tcPr().append(shade)
    spacer = doc.add_paragraph()
    spacer.paragraph_format.space_after = Pt(0)
    spacer.paragraph_format.line_spacing = Pt(7)
    spacer.paragraph_format.keep_with_next = True
    spacer.add_run().font.size = Pt(2)


footer = section.footer.paragraphs[0]
footer.paragraph_format.space_after = Pt(0)
footer.paragraph_format.tab_stops.add_tab_stop(Inches(width), WD_TAB_ALIGNMENT.RIGHT)
r = footer.add_run("CONFIDENTIAL | Discussion draft | 6 October 2026\t")
r.font.name = "Arial"
r.font.size = Pt(8)
r.font.color.rgb = RGBColor.from_string("555555")
for instruction, suffix in [("PAGE", " / "), ("NUMPAGES", "")]:
    field = OxmlElement("w:fldSimple")
    field.set(qn("w:instr"), instruction)
    footer._p.append(field)
    footer.add_run(suffix).font.size = Pt(8)

lines = body.splitlines()
index = 0
page_section = 0
pending_page_break = False
while index < len(lines):
    line = lines[index].strip()
    if not line:
        index += 1
        continue
    if re.fullmatch(r"<!-- Page \d+ -->", line):
        if page_section:
            pending_page_break = True
        page_section += 1
        index += 1
        continue
    if line.startswith("<!--"):
        raise ValueError(f"Unsupported comment: {line}")
    if line.startswith("|"):
        table_lines = []
        while index < len(lines) and lines[index].strip().startswith("|"):
            table_lines.append(lines[index])
            index += 1
        add_table(table_lines)
        continue
    heading = re.match(r"^(#{1,3}) (.*)$", line)
    if heading:
        level, text = heading.groups()
        style = {"#": "Title", "##": "Heading 1", "###": "Heading 2"}[level]
        p = add_paragraph(text, style)
        if pending_page_break:
            p.paragraph_format.page_break_before = True
            pending_page_break = False
        index += 1
        continue
    if re.match(r"^\d+\. ", line):
        add_paragraph(line)
        index += 1
        continue
    parts = []
    while index < len(lines) and lines[index].strip():
        current = lines[index].strip()
        if current.startswith(("#", "|", "<!--")) or re.match(r"^\d+\. ", current):
            break
        parts.append(lines[index].rstrip())
        index += 1
    add_paragraph("\n".join(parts))

doc.save(OUTPUT)
print(f"Created {OUTPUT} from Markdown revision {revision} ({page_section} planned page sections)")
