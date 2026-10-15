#!/usr/bin/env python3
"""Build the Circularo Internal Pricing Workbook from the approved plan."""

from __future__ import annotations

import csv
import re
from copy import copy
from datetime import date
from pathlib import Path

from openpyxl import Workbook, load_workbook
from openpyxl.comments import Comment
from openpyxl.formatting.rule import CellIsRule, FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.worksheet.table import Table, TableStyleInfo


BASE_DIR = Path(__file__).resolve().parent
REPO_ROOT = BASE_DIR.parents[2]
UNIFIED_PRICE_BOOK_PATH = REPO_ROOT / "catalog" / "unified-catalog" / "unified-pricing-book.csv"
OUTPUT_PATH = BASE_DIR / "Circularo_Internal_Annual_Price_Book.xlsx"

VERSION = "FY2027-Q1"
OWNER = "Commercial Operations"
CURRENCY = "USD"

# Circularo brand palette. Functional status colours are kept only for OK/REVIEW/BLOCK controls.
DARK_BLUE = "1D0090"
PURPLE = "7000FF"
BODY_GREY = "3D3D3D"
PALE_PURPLE = "F5F0FF"
LIGHT_PURPLE = "E9DFFF"
NAVY = DARK_BLUE
BLUE = PURPLE
LIGHT_BLUE = LIGHT_PURPLE
PALE_BLUE = PALE_PURPLE
GREEN = "008000"
LIGHT_GREEN = "E2F0D9"
YELLOW = "FFF2CC"
AMBER = "F4B183"
RED = "C00000"
LIGHT_RED = "F4CCCC"
GREY = "D9E1F2"
LIGHT_GREY = "F2F2F2"
WHITE = "FFFFFF"
BLACK = "000000"
HEADLINE_FONT = "Spartan"
BODY_FONT = "Mulish"
FALLBACK_FONT = "Aptos"

HEADER_FILL = PatternFill("solid", fgColor=NAVY)
SUBHEADER_FILL = PatternFill("solid", fgColor=LIGHT_BLUE)
INPUT_FILL = PatternFill("solid", fgColor=YELLOW)
OK_FILL = PatternFill("solid", fgColor=LIGHT_GREEN)
REVIEW_FILL = PatternFill("solid", fgColor=YELLOW)
BLOCK_FILL = PatternFill("solid", fgColor=LIGHT_RED)
THIN_GREY = Side(style="thin", color="D9D2EA")
MEDIUM_NAVY = Side(style="medium", color=NAVY)

CURRENCY_FMT = '$#,##0.00;[Red]($#,##0.00);-'
PERCENT_FMT = '0.0%;[Red](0.0%);-'
INTEGER_FMT = '#,##0;[Red](#,##0);-'
DATE_FMT = "yyyy-mm-dd"


def clean_text(value: str | None) -> str:
    return " ".join((value or "").split())


def parse_price(value: str | None) -> float:
    cleaned = (value or "").replace(",", "").strip()
    return float(cleaned) if cleaned else 0.0


def infer_plan(sku: str, variant_values: str, tags: str, name: str) -> str:
    match = re.search(r"Plan:\s*([^;]+)", variant_values or "")
    if match:
        return clean_text(match.group(1))
    name_upper = name.upper()
    if "START" in name_upper:
        return "Start"
    if "PRO" in name_upper:
        return "Pro"
    if "BUSINESS" in name_upper:
        return "Business"
    if "ENTERPRISE" in name_upper:
        return "Enterprise"
    if "ULTIMATE" in name_upper:
        return "Ultimate"
    prefix_map = {"CS": "Start", "CP": "Pro", "CB": "Business", "CE": "Enterprise", "CU": "Ultimate"}
    if len(sku) >= 2 and sku[:2] in prefix_map:
        return prefix_map[sku[:2]]
    tag_plans = [tag.strip() for tag in (tags or "").split(";") if tag.strip() in {"Start", "Pro", "Business", "Enterprise", "Ultimate"}]
    return "; ".join(tag_plans) if tag_plans else "N/A"


def normalize_family(category: str, name: str) -> str:
    category = clean_text(category)
    if category == "User Based":
        return "User-Based Subscription"
    if category == "Transaction Based":
        return "Transaction-Based Subscription"
    if category == "Server Based":
        return "Server-Based Subscription"
    if category:
        return category
    return "Uncategorized"


def infer_unit(category: str, name: str, basis: str, pack: int | None) -> str:
    name_lower = name.lower()
    if category == "User Based":
        return "User / year"
    if category == "Transaction Based":
        return "Transaction"
    if category == "Server Based":
        return "Server / year"
    if category == "Support":
        return "Support entitlement / year"
    if "md" in name_lower or "man-day" in name_lower:
        return "Man-day"
    if basis == "Annual" and "storage" in name_lower:
        return "100 GB / year"
    if pack:
        if "sms" in name_lower:
            return f"{pack} SMS"
        if "bankid" in name_lower or "verification" in name_lower:
            return f"{pack} verification requests"
        if "timestamp" in name_lower:
            return f"{pack} timestamps"
        return f"{pack} events"
    if "transaction" in name_lower or "verification" in name_lower or "request" in name_lower:
        return "Event"
    if basis == "Annual":
        return "Organization / year"
    return "Unit"


def infer_price_basis(category: str, name: str, sales_description: str) -> tuple[str, int | None]:
    text = f"{name} {sales_description}".lower()
    name_lower = name.lower()
    if category in {"Transaction Based", "User Based", "Server Based", "Support", "Bundle"}:
        return "Annual", None
    if any(token in name_lower for token in ["sms credits (100)", "verification (100)", "verification request (100)", "timestamp"]):
        return "Per Pack", 100
    if any(token in name_lower for token in ["api transaction", "identomat id verification", "identomat liveness verification"]):
        return "Per Event", None
    if category == "Add-On" and any(token in text for token in ["configuration", "integration assistance", "professional services", "onboarding", "md", "man-day"]):
        return "One-Time", None
    return "Annual", None


def default_commercial_controls(plan: str, family: str) -> tuple[float, float, float]:
    target_discount = 0.10
    if plan == "Start":
        return target_discount, 0.20, 0.10
    if plan == "Pro":
        return target_discount, 0.20, 0.15
    if plan in {"Business", "Enterprise"}:
        return target_discount, 0.35, 0.20
    if plan == "Ultimate":
        return target_discount, 0.35, 0.30
    if family == "Support":
        return target_discount, 0.20, 0.15
    return target_discount, 0.35, 0.20


def parse_optional_price(value: str | None) -> float | None:
    cleaned = (value or "").replace(",", "").strip()
    return float(cleaned) if cleaned else None


def display_price_basis(value: str) -> str:
    return {
        "annual": "Annual",
        "per_event": "Per Event",
        "per_pack": "Per Pack",
        "one_time": "One-Time",
    }.get(clean_text(value).lower(), clean_text(value) or "Annual")


def load_odoo_products(path: Path = UNIFIED_PRICE_BOOK_PATH) -> list[tuple]:
    with path.open(encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        products = []
        for raw in reader:
            sku = clean_text(raw.get("variant_sku"))
            name = clean_text(raw.get("variant_name")) or clean_text(raw.get("product_template_name"))
            if not sku or not name:
                continue
            if clean_text(raw.get("active")).lower() not in {"true", "1", "yes"}:
                continue
            if clean_text(raw.get("sales")).lower() not in {"true", "1", "yes"}:
                continue
            category = clean_text(raw.get("odoo_category"))
            family = normalize_family(category, name)
            plan = clean_text(raw.get("variant_plan")) or clean_text(raw.get("plan_applicability")) or "N/A"
            basis = display_price_basis(raw.get("billing_cadence", ""))
            pack_text = clean_text(raw.get("pack_quantity"))
            pack = int(float(pack_text)) if pack_text else None
            unit = infer_unit(category, name, basis, pack)
            target_discount, max_discount, target_margin = default_commercial_controls(plan, family)
            msrp = parse_price(raw.get("customer_list_price"))
            floor_price = parse_optional_price(raw.get("floor_price"))
            currency = clean_text(raw.get("currency")) or CURRENCY
            notes = "Imported from catalog/unified-catalog/unified-pricing-book.csv."
            price_status = clean_text(raw.get("price_status"))
            if price_status and price_status != "priced":
                notes += f" Price status: {price_status}."
            cost = parse_optional_price(raw.get("odoo_cost"))
            if cost is not None:
                notes += f" Odoo cost: {cost:.2f} {currency}."
            if currency != CURRENCY:
                notes += f" Currency in the unified price book is {currency}."
            products.append((sku, name, plan, family, unit, basis, pack, msrp, target_discount, max_discount, target_margin, currency, notes, floor_price))
    return sorted(products, key=lambda item: (item[3], item[2], item[1], item[0]))


PRODUCTS = load_odoo_products()


def formula_div(numerator: str, denominator: str) -> str:
    return f'=IFERROR({numerator}/{denominator},"")'


def set_tab_style(ws, color: str) -> None:
    ws.sheet_properties.tabColor = color
    ws.sheet_view.showGridLines = False
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    ws.page_setup.fitToWidth = 1
    ws.page_setup.fitToHeight = 1
    ws.page_margins.left = 0.2
    ws.page_margins.right = 0.2
    ws.page_margins.top = 0.35
    ws.page_margins.bottom = 0.35


def add_header(ws, row: int, headers: list[str]) -> None:
    for col, label in enumerate(headers, 1):
        cell = ws.cell(row=row, column=col, value=label)
        cell.font = Font(name=BODY_FONT, size=10, bold=True, color=WHITE)
        cell.fill = HEADER_FILL
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        cell.border = Border(bottom=MEDIUM_NAVY)
    ws.row_dimensions[row].height = 34


def add_title(ws, title: str, subtitle: str, last_col: int) -> None:
    ws.merge_cells(start_row=1, start_column=1, end_row=1, end_column=last_col)
    ws["A1"] = title
    ws["A1"].font = Font(name=HEADLINE_FONT, size=18, bold=True, color=WHITE)
    ws["A1"].fill = HEADER_FILL
    ws["A1"].alignment = Alignment(horizontal="left", vertical="center")
    ws.row_dimensions[1].height = 34
    ws.merge_cells(start_row=2, start_column=1, end_row=2, end_column=last_col)
    ws["A2"] = subtitle
    ws["A2"].font = Font(name=BODY_FONT, size=10, italic=True, color=BODY_GREY)
    ws["A2"].fill = PatternFill("solid", fgColor=PALE_BLUE)
    ws["A2"].alignment = Alignment(wrap_text=True)
    ws.row_dimensions[2].height = 32


def add_table(ws, name: str, ref: str) -> None:
    table = Table(displayName=name, ref=ref)
    table.tableStyleInfo = TableStyleInfo(
        name="TableStyleMedium2",
        showFirstColumn=False,
        showLastColumn=False,
        showRowStripes=True,
        showColumnStripes=False,
    )
    ws.add_table(table)


def apply_standard_body(ws, min_row: int, max_row: int, max_col: int) -> None:
    for row in ws.iter_rows(min_row=min_row, max_row=max_row, min_col=1, max_col=max_col):
        for cell in row:
            font = copy(cell.font)
            font.name = BODY_FONT
            font.sz = 10
            if not font.color or font.color.type == "theme":
                font.color = BODY_GREY
            cell.font = font
            cell.alignment = Alignment(vertical="top", wrap_text=True)
            cell.border = Border(bottom=THIN_GREY)


def autosize(ws, max_width: int = 34) -> None:
    for column in range(1, ws.max_column + 1):
        letter = get_column_letter(column)
        width = 10
        for cell in ws[letter]:
            if cell.value is not None:
                width = max(width, min(len(str(cell.value)) + 2, max_width))
        ws.column_dimensions[letter].width = width


def style_input(cell, attention: bool = False) -> None:
    cell.font = Font(name=BODY_FONT, size=10, color=BLUE)
    if attention:
        cell.fill = INPUT_FILL


def style_formula(cell, linked: bool = False) -> None:
    cell.font = Font(name=BODY_FONT, size=10, color=BLUE if linked else BODY_GREY)


def add_status_conditional_formatting(ws, cell_range: str) -> None:
    ws.conditional_formatting.add(
        cell_range,
        FormulaRule(formula=[f'EXACT({cell_range.split(":")[0]},"OK")'], fill=OK_FILL),
    )
    ws.conditional_formatting.add(
        cell_range,
        FormulaRule(formula=[f'EXACT({cell_range.split(":")[0]},"REVIEW")'], fill=REVIEW_FILL),
    )
    ws.conditional_formatting.add(
        cell_range,
        FormulaRule(formula=[f'EXACT({cell_range.split(":")[0]},"BLOCK")'], fill=BLOCK_FILL),
    )


def add_internal_link(cell, sheet_name: str, label: str | None = None) -> None:
    cell.value = label or sheet_name
    cell.hyperlink = f"#'{sheet_name}'!A1"
    cell.style = "Hyperlink"
    cell.font = Font(name=BODY_FONT, size=10, color=BLUE, underline="single", bold=True)


def build_workbook_guide(wb: Workbook) -> None:
    ws = wb.create_sheet("Workbook Guide", 0)
    set_tab_style(ws, NAVY)
    headers = ["Sheet", "Purpose", "Use this when", "Open"]
    add_title(
        ws,
        "Circularo Internal Price Book — Workbook Guide",
        "Start here. This workbook is an internal pricing governance tool generated from the unified variant-level pricing book.",
        len(headers),
    )
    intro = [
        ("Audience", "Commercial Operations, Finance, Sales leadership, and approved AI agents using the internal partner pricing model."),
        ("Primary source", "SKU-level rows, Odoo costs, and maintained floor prices are imported from catalog/unified-catalog/unified-pricing-book.csv."),
        ("Important caution", "Partner buy prices, commercial floors, approval thresholds, and price-realization KPIs are internal only. Do not send this workbook to customers or partners unless an approved external version is created."),
        ("How to navigate", "Use the linked sheet directory below. Start with MSRP Catalog for imported list prices, Price Book for governance controls, Partner Buy Price Matrix for tier prices, and Price Realization for Finance KPIs."),
    ]
    for row, (label, value) in enumerate(intro, 4):
        ws.cell(row, 1, label)
        ws.cell(row, 1).font = Font(name=BODY_FONT, bold=True, color=WHITE)
        ws.cell(row, 1).fill = HEADER_FILL
        ws.cell(row, 2, value)
        ws.cell(row, 2).font = Font(name=BODY_FONT, color=BODY_GREY)
        ws.cell(row, 2).fill = PatternFill("solid", fgColor=PALE_BLUE)
        ws.cell(row, 2).alignment = Alignment(wrap_text=True, vertical="top")
        ws.merge_cells(start_row=row, start_column=2, end_row=row, end_column=4)
        ws.row_dimensions[row].height = 38
    add_header(ws, 10, headers)
    rows = [
        ("Price Book", "Master SKU-level pricing and governance controls.", "Review standard partner buy price, floor controls, approvals, status, and notes."),
        ("Definitions", "Data dictionary for workbook fields.", "Understand what each term means and who owns it."),
        ("Formulas", "Formula reference for calculations.", "Audit pricing and price-realization logic."),
        ("Partner Tiers", "Partner tier settings and plan permissions.", "Confirm Authorized, Advanced, and Strategic partner margin ceilings."),
        ("Special Pricing Matrix", "Special-pricing treatment by customer discount band.", "Check when special pricing or escalation is required."),
        ("MSRP Catalog", "Imported Odoo SKU catalog and MSRP source inputs.", "Validate list prices, currency, status, effective dates, and imported notes."),
        ("Partner Buy Price Matrix", "Tier-specific partner buy prices generated from the master Price Book.", "Quote internal buy prices by partner tier."),
        ("Discount Approval Matrix", "Customer discount approval governance.", "Check approval level and deal-registration requirements."),
        ("Price Book History", "Version, approval, and change-history log.", "Track workbook releases and approvals."),
        ("Price Realization", "Circularo Price Realization KPI view.", "Review row-level and weighted Partner Buy Price ÷ MSRP metrics."),
    ]
    for row, values in enumerate(rows, 11):
        for col, value in enumerate(values, 1):
            ws.cell(row, col, value)
        add_internal_link(ws.cell(row, 4), values[0], "Open sheet")
    apply_standard_body(ws, 4, 8, 4)
    apply_standard_body(ws, 11, 10 + len(rows), len(headers))
    add_table(ws, "WorkbookGuideTable", f"A10:D{10 + len(rows)}")
    ws.freeze_panes = "A11"
    ws.auto_filter.ref = f"A10:D{10 + len(rows)}"
    ws.print_area = f"A1:D{10 + len(rows)}"
    autosize(ws, 60)
    ws.column_dimensions["A"].width = 28
    ws.column_dimensions["B"].width = 58
    ws.column_dimensions["C"].width = 68
    ws.column_dimensions["D"].width = 18


def build_msrp_catalog(wb: Workbook) -> None:
    ws = wb.create_sheet("MSRP Catalog")
    set_tab_style(ws, PURPLE)
    headers = [
        "Price Book Version", "SKU", "Product", "Plan", "Product Family", "Unit",
        "Price Basis", "Pack Quantity", "MSRP", "Currency", "Status",
        "Effective From", "Effective To", "Notes",
    ]
    add_title(
        ws,
        "MSRP Catalog",
        "Source catalogue for published list prices. Yellow cells are editable inputs; zero MSRP means price confirmation is required.",
        len(headers),
    )
    add_header(ws, 4, headers)
    for idx, product in enumerate(PRODUCTS, 5):
        sku, name, plan, family, unit, basis, pack, msrp, _, _, _, currency, notes, _ = product
        values = [
            VERSION, sku, name, plan, family, unit, basis, pack, msrp, currency,
            "Draft", date(2027, 1, 1), date(2027, 3, 31),
            f"{notes} MSRP requires confirmation." if msrp == 0 else notes,
        ]
        for col, value in enumerate(values, 1):
            cell = ws.cell(idx, col, value)
            style_input(cell, attention=(col in {9, 11, 12, 13} or msrp == 0))
        ws.cell(idx, 8).number_format = INTEGER_FMT
        ws.cell(idx, 9).number_format = CURRENCY_FMT
        ws.cell(idx, 12).number_format = DATE_FMT
        ws.cell(idx, 13).number_format = DATE_FMT
    apply_standard_body(ws, 5, 4 + len(PRODUCTS), len(headers))
    for row in range(5, 5 + len(PRODUCTS)):
        for col in range(1, len(headers) + 1):
            cell = ws.cell(row, col)
            if col in {9, 11, 12, 13} or ws.cell(row, 9).value == 0:
                style_input(cell, attention=True)
            else:
                style_input(cell)
    status_dv = DataValidation(type="list", formula1='"Draft,Active,Retired"', allow_blank=False)
    basis_dv = DataValidation(type="list", formula1='"Annual,Per Event,Per Pack,One-Time"', allow_blank=False)
    ws.add_data_validation(status_dv)
    ws.add_data_validation(basis_dv)
    status_dv.add(f"K5:K{4 + len(PRODUCTS)}")
    basis_dv.add(f"G5:G{4 + len(PRODUCTS)}")
    add_table(ws, "MSRPCatalogTable", f"A4:N{4 + len(PRODUCTS)}")
    ws.freeze_panes = "A5"
    ws.auto_filter.ref = f"A4:N{4 + len(PRODUCTS)}"
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    ws.page_setup.orientation = "landscape"
    ws.page_setup.fitToWidth = 1
    ws.print_area = f"A1:N{4 + len(PRODUCTS)}"
    autosize(ws)
    ws.column_dimensions["C"].width = 34
    ws.column_dimensions["N"].width = 42


def build_partner_tiers(wb: Workbook) -> None:
    ws = wb.create_sheet("Partner Tiers")
    set_tab_style(ws, PURPLE)
    headers = [
        "Partner Tier", "Target Role", "Standard Realized Margin Ceiling",
        "Start Margin Ceiling", "Pro Margin Ceiling", "Business Margin Ceiling",
        "Enterprise Margin Ceiling", "Can Quote Start", "Can Quote Pro",
        "Can Quote Business", "Can Quote Enterprise", "Can Quote Ultimate",
        "Max User-Based Quote", "Max Transaction-Based Quote",
        "Requires Deal Registration", "Notes",
    ]
    add_title(ws, "Partner Tiers", "Standard tier and plan permissions. Ultimate is always a joint Circularo engagement.", len(headers))
    add_header(ws, 4, headers)
    rows = [
        ["Authorized", "Entry reseller", 0.15, 0.10, 0.15, 0.15, 0.15, "Yes", "Yes", "Yes", "Yes", "No", "TBC", "TBC", "Yes", "Standard entry-level reseller permissions."],
        ["Advanced", "Developed reseller", 0.20, 0.10, 0.15, 0.20, 0.20, "Yes", "Yes", "Yes", "Yes", "No", "TBC", "TBC", "Yes", "Expanded commercial capability."],
        ["Strategic", "Strategic growth partner", 0.30, 0.10, 0.15, 0.30, 0.30, "Yes", "Yes", "Yes", "Yes", "No", "TBC", "TBC", "Yes", "Up to 40% first-year margin only under the approved strategic exception."],
    ]
    for r, values in enumerate(rows, 5):
        for c, value in enumerate(values, 1):
            cell = ws.cell(r, c, value)
            style_input(cell)
            if c in {3, 4, 5, 6, 7}:
                cell.number_format = PERCENT_FMT
    apply_standard_body(ws, 5, 7, len(headers))
    add_table(ws, "PartnerTiersTable", "A4:P7")
    ws.freeze_panes = "A5"
    ws.auto_filter.ref = "A4:P7"
    ws.page_setup.orientation = "landscape"
    ws.page_setup.fitToWidth = 1
    ws.print_area = "A1:P7"
    autosize(ws)
    ws.column_dimensions["B"].width = 24
    ws.column_dimensions["P"].width = 48


def build_price_book(wb: Workbook) -> None:
    ws = wb.create_sheet("Price Book")
    set_tab_style(ws, NAVY)
    headers = [
        "Price Book Version", "SKU", "Product", "Plan", "Product Family", "Unit",
        "Price Basis", "Pack Quantity", "MSRP", "Target Customer Discount",
        "Target Customer Sell Price", "Standard Partner Buy Price",
        "Commercial Floor Price", "Customer Sell Price Approval Threshold",
        "Max Customer Discount", "Target Realized Partner Margin",
        "Standard Circularo Price Realization", "Floor Circularo Price Realization",
        "Standard Approval", "Floor Approval", "Below Floor",
        "Above Discount Authority", "Above Partner Margin Ceiling",
        "Low Price Realization", "Independent Partner Quote",
        "Ultimate Independent Quote", "Special Pricing Applied",
        "Deal Registration ID", "Special Pricing Without Deal Registration",
        "Effective To", "Expired Price Book Version", "Status", "Notes",
    ]
    add_title(
        ws,
        "Circularo Internal Price Book",
        "One master row per SKU. Green formulas link to another worksheet; blue/yellow cells are editable inputs; black cells are calculations.",
        len(headers),
    )
    add_header(ws, 4, headers)
    last_row = 4 + len(PRODUCTS)
    for row, product in enumerate(PRODUCTS, 5):
        _, _, plan, _, _, _, _, _, target_discount, max_discount, target_margin, _, _, floor_price = product
        catalog_row = row
        links = {
            1: f"='MSRP Catalog'!A{catalog_row}", 2: f"='MSRP Catalog'!B{catalog_row}",
            3: f"='MSRP Catalog'!C{catalog_row}", 4: f"='MSRP Catalog'!D{catalog_row}",
            5: f"='MSRP Catalog'!E{catalog_row}", 6: f"='MSRP Catalog'!F{catalog_row}",
            7: f"='MSRP Catalog'!G{catalog_row}", 8: f"='MSRP Catalog'!H{catalog_row}",
            9: f"='MSRP Catalog'!I{catalog_row}", 30: f"='MSRP Catalog'!M{catalog_row}",
            32: f"='MSRP Catalog'!K{catalog_row}", 33: f"='MSRP Catalog'!N{catalog_row}",
        }
        for col, formula in links.items():
            ws.cell(row, col, formula)
            style_formula(ws.cell(row, col), linked=True)
        ws.cell(row, 10, target_discount)
        ws.cell(row, 13, floor_price)
        ws.cell(row, 15, max_discount)
        ws.cell(row, 16, target_margin)
        ws.cell(row, 19, "Automatic")
        ws.cell(row, 20, "CSO")
        ws.cell(row, 25, "No")
        ws.cell(row, 27, "No")
        ws.cell(row, 28, None)
        for col in {10, 13, 15, 16, 19, 20, 25, 27, 28}:
            style_input(ws.cell(row, col), attention=(col == 13))
        ws.cell(row, 11, f"=IFERROR(I{row}*(1-J{row}),\"\")")
        ws.cell(row, 12, f"=IFERROR(K{row}*(1-P{row}),\"\")")
        ws.cell(row, 14, f"=IFERROR(I{row}*(1-O{row}),\"\")")
        ws.cell(row, 17, formula_div(f"L{row}", f"I{row}"))
        ws.cell(row, 18, f'=IF(OR(M{row}="",I{row}=0),"",M{row}/I{row})')
        ws.cell(row, 21, f'=IF(M{row}="","REVIEW",IF(L{row}<M{row},"BLOCK","OK"))')
        ws.cell(row, 22, f'=IF(J{row}>O{row},"BLOCK","OK")')
        ceiling_formula = (
            f'IF(D{row}="Start",10%,IF(D{row}="Pro",15%,'
            f'IF(OR(D{row}="Business",D{row}="Enterprise"),20%,30%)))'
        )
        ws.cell(row, 23, f'=IF(P{row}>{ceiling_formula},"BLOCK","OK")')
        ws.cell(row, 24, f'=IF(OR(M{row}="",R{row}=""),"REVIEW",IF(Q{row}<R{row},"BLOCK","OK"))')
        ws.cell(row, 26, f'=IF(AND(D{row}="Ultimate",Y{row}="Yes"),"BLOCK","OK")')
        ws.cell(row, 29, f'=IF(AND(AA{row}="Yes",AB{row}=""),"BLOCK","OK")')
        ws.cell(row, 31, f'=IF(AD{row}="","REVIEW",IF(AD{row}<TODAY(),"BLOCK","OK"))')
        for col in {11, 12, 14, 17, 18, 21, 22, 23, 24, 26, 29, 31}:
            style_formula(ws.cell(row, col))
        for col in {9, 11, 12, 13, 14}:
            ws.cell(row, col).number_format = CURRENCY_FMT
        for col in {10, 15, 16, 17, 18}:
            ws.cell(row, col).number_format = PERCENT_FMT
        ws.cell(row, 8).number_format = INTEGER_FMT
        ws.cell(row, 30).number_format = DATE_FMT
    apply_standard_body(ws, 5, last_row, len(headers))
    yes_no = DataValidation(type="list", formula1='"Yes,No"', allow_blank=False)
    ws.add_data_validation(yes_no)
    yes_no.add(f"Y5:Y{last_row}")
    yes_no.add(f"AA5:AA{last_row}")
    for col in ["U", "V", "W", "X", "Z", "AC", "AE"]:
        add_status_conditional_formatting(ws, f"{col}5:{col}{last_row}")
    ws.conditional_formatting.add(
        f"M5:M{last_row}",
        FormulaRule(formula=['ISBLANK(M5)'], fill=REVIEW_FILL),
    )
    add_table(ws, "PriceBookTable", f"A4:AG{last_row}")
    ws.freeze_panes = "B5"
    ws.auto_filter.ref = f"A4:AG{last_row}"
    ws.page_setup.orientation = "landscape"
    ws.page_setup.paperSize = ws.PAPERSIZE_A3
    ws.page_setup.fitToWidth = 2
    ws.print_area = f"A1:AG{last_row}"
    autosize(ws, 24)
    ws.column_dimensions["C"].width = 31
    ws.column_dimensions["AG"].width = 42


def build_definitions(wb: Workbook) -> None:
    ws = wb.create_sheet("Definitions")
    set_tab_style(ws, BODY_GREY)
    headers = ["Field", "Definition", "Example", "Owner"]
    add_title(ws, "Definitions", "Data dictionary and commercial conventions for the internal price book.", len(headers))
    add_header(ws, 4, headers)
    definitions = [
        ("Price Book Version", "Version identifier controlling effective pricing.", VERSION, "Commercial Operations"),
        ("SKU", "Unique commercial product identifier.", "CB-BUS-USER", "Product Operations"),
        ("Product", "Approved commercial product name.", "Business Regular User", "Product"),
        ("Plan", "Applicable Circularo plan.", "Business", "Product"),
        ("Product Family", "Commercial grouping used for reporting.", "Subscription", "Product"),
        ("Unit", "Commercial quantity to which MSRP applies.", "User / year", "Product"),
        ("Price Basis", "Annual, Per Event, Per Pack, or One-Time.", "Annual", "Commercial Operations"),
        ("Pack Quantity", "Number of events included when Price Basis is Per Pack.", "100", "Product"),
        ("MSRP", "Published list price before discount. Annual for subscription entitlements; otherwise applies to the stated event or pack.", "$600.00", "Commercial Operations"),
        ("Target Customer Discount", "Expected standard customer discount, normally 10%.", "10%", "Sales"),
        ("Target Customer Sell Price", "Expected market selling price after target discount.", "$540.00", "Calculated"),
        ("Standard Partner Buy Price", "Default buy price charged by Circularo to the partner.", "$432.00", "Calculated"),
        ("Commercial Floor Price", "Lowest partner buy price normally approved; manually maintained and not product cost.", "$400.00", "CSO / Finance"),
        ("Customer Sell Price Approval Threshold", "Internal benchmark below which additional approval is required; not a prescribed resale price.", "$390.00", "Sales"),
        ("Max Customer Discount", "Maximum customer discount under the standard approval framework.", "35%", "Sales"),
        ("Target Realized Partner Margin", "Expected partner gross margin at target customer sell price.", "20%", "Sales"),
        ("Standard Circularo Price Realization", "Proportion of MSRP retained at Standard Partner Buy Price.", "72%", "Calculated"),
        ("Floor Circularo Price Realization", "Proportion of MSRP retained at Commercial Floor Price.", "67%", "Calculated"),
        ("Standard Approval", "Authority or treatment for standard partner pricing.", "Automatic", "Sales"),
        ("Floor Approval", "Authority required to approve pricing at the commercial floor.", "CSO", "Sales"),
        ("Below Floor", "Control showing whether standard buy price breaches or lacks a maintained floor.", "OK / REVIEW / BLOCK", "Calculated"),
        ("Independent Partner Quote", "Whether the partner is attempting to quote independently.", "No", "Sales"),
        ("Special Pricing Applied", "Whether non-standard special pricing is proposed.", "No", "Sales"),
        ("Deal Registration ID", "Registered opportunity reference required for special pricing where applicable.", "DR-2027-001", "Sales"),
        ("Effective To", "Date after which the price-book record expires.", "2027-03-31", "Commercial Operations"),
        ("Circularo Price Realization", "Partner Buy Price divided by MSRP. Portfolio results must be value-weighted.", "72%", "Finance"),
    ]
    for r, values in enumerate(definitions, 5):
        for c, value in enumerate(values, 1):
            ws.cell(r, c, value)
    apply_standard_body(ws, 5, 4 + len(definitions), len(headers))
    add_table(ws, "DefinitionsTable", f"A4:D{4 + len(definitions)}")
    ws.freeze_panes = "A5"
    ws.auto_filter.ref = f"A4:D{4 + len(definitions)}"
    ws.page_setup.orientation = "landscape"
    ws.page_setup.fitToWidth = 1
    ws.print_area = f"A1:D{4 + len(definitions)}"
    autosize(ws, 70)
    ws.column_dimensions["A"].width = 37
    ws.column_dimensions["B"].width = 85
    ws.column_dimensions["C"].width = 24
    ws.column_dimensions["D"].width = 24


def build_formulas(wb: Workbook) -> None:
    ws = wb.create_sheet("Formulas")
    set_tab_style(ws, BODY_GREY)
    headers = ["Formula Name", "Formula", "Description"]
    add_title(ws, "Formula Reference", "Auditable formula definitions. All workbook calculations should follow these patterns.", len(headers))
    add_header(ws, 4, headers)
    rows = [
        ("Target Customer Sell Price", "MSRP × (1 − Target Customer Discount)", "Expected customer price after target discount."),
        ("Standard Partner Buy Price", "Target Customer Sell Price × (1 − Target Realized Partner Margin)", "Default Circularo sell-in price."),
        ("Customer Discount", "(MSRP − Customer Sell Price) ÷ MSRP", "Actual discount to list price."),
        ("Realized Partner Gross Margin", "(Customer Sell Price − Partner Buy Price) ÷ Customer Sell Price", "Partner gross margin at actual customer price."),
        ("Customer Sell Price Approval Threshold", "MSRP × (1 − Max Customer Discount)", "Internal approval benchmark, not a prescribed resale price."),
        ("Standard Circularo Price Realization", "Standard Partner Buy Price ÷ MSRP", "MSRP retained by Circularo at standard price."),
        ("Floor Circularo Price Realization", "Commercial Floor Price ÷ MSRP", "MSRP retained at the manually maintained floor."),
        ("Weighted Portfolio Price Realization", "Total Partner Buy Price Value ÷ Total MSRP Value", "Value-weighted portfolio KPI; never average row percentages."),
    ]
    for r, values in enumerate(rows, 5):
        for c, value in enumerate(values, 1):
            ws.cell(r, c, value)
    apply_standard_body(ws, 5, 4 + len(rows), len(headers))
    add_table(ws, "FormulaReferenceTable", f"A4:C{4 + len(rows)}")
    ws.freeze_panes = "A5"
    ws.auto_filter.ref = f"A4:C{4 + len(rows)}"
    ws.print_area = f"A1:C{4 + len(rows)}"
    autosize(ws, 80)
    ws.column_dimensions["A"].width = 42
    ws.column_dimensions["B"].width = 60
    ws.column_dimensions["C"].width = 70


def build_special_pricing(wb: Workbook) -> None:
    ws = wb.create_sheet("Special Pricing Matrix")
    set_tab_style(ws, PURPLE)
    headers = [
        "Customer Discount Band", "Treatment", "Required Approval",
        "Deal Registration Required", "Special Pricing Required", "Notes",
    ]
    add_title(ws, "Special Pricing Matrix", "Approval thresholds. Customer discount approval does not automatically increase partner margin.", len(headers))
    add_header(ws, 4, headers)
    rows = [
        ("0–10%", "Partner discretion", "Automatic", "No", "No", "Standard authority."),
        (">10–20%", "Normal commercial band", "Reported and tracked", "Recommended", "No", "Track realized economics."),
        (">20–35%", "Special pricing", "Sales leadership", "Yes", "Yes", "Opportunity-specific approval."),
        (">35–50%", "Exceptional strategic approval", "CSO", "Yes", "Yes", "Exceptional only."),
        (">50%", "Outside standard program", "CEO or prohibited", "Yes", "Exceptional only", "Not part of the standard partner program."),
        ("Strategic exception", "Up to 40% first-year realized partner margin", "CSO", "Yes", "Yes", "Strategic Partner; new registered customer; Business or Enterprise; renewal returns to standard unless separately approved."),
    ]
    for r, values in enumerate(rows, 5):
        for c, value in enumerate(values, 1):
            ws.cell(r, c, value)
    apply_standard_body(ws, 5, 10, len(headers))
    add_table(ws, "SpecialPricingTable", "A4:F10")
    ws.freeze_panes = "A5"
    ws.auto_filter.ref = "A4:F10"
    ws.page_setup.orientation = "landscape"
    ws.page_setup.fitToWidth = 1
    ws.print_area = "A1:F10"
    autosize(ws, 55)
    ws.column_dimensions["F"].width = 80


def build_discount_matrix(wb: Workbook) -> None:
    ws = wb.create_sheet("Discount Approval Matrix")
    set_tab_style(ws, PURPLE)
    headers = [
        "Discount Range", "Approval Required", "Applies To", "Partner Discretion",
        "Deal Registration Required", "Special Pricing Required",
        "CSO Approval Required", "Notes",
    ]
    add_title(ws, "Discount Approval Matrix", "Customer discount governance aligned to the Special Pricing Matrix.", len(headers))
    add_header(ws, 4, headers)
    rows = [
        ("0–10%", "Automatic", "All standard partner deals", "Yes", "No", "No", "No", "Standard authority."),
        (">10–20%", "Reported and tracked", "All plans", "Yes", "Recommended", "No", "No", "Monitor realization."),
        (">20–35%", "Sales leadership", "Standard program", "No", "Yes", "Yes", "No", "Special pricing required."),
        (">35–50%", "CSO", "Strategic exceptions", "No", "Yes", "Yes", "Yes", "Exceptional only."),
        (">50%", "CEO or prohibited", "Outside standard program", "No", "Yes", "Exceptional only", "Yes", "Escalate before commitment."),
    ]
    for r, values in enumerate(rows, 5):
        for c, value in enumerate(values, 1):
            ws.cell(r, c, value)
    apply_standard_body(ws, 5, 9, len(headers))
    add_table(ws, "DiscountApprovalTable", "A4:H9")
    ws.freeze_panes = "A5"
    ws.auto_filter.ref = "A4:H9"
    ws.page_setup.orientation = "landscape"
    ws.page_setup.fitToWidth = 1
    ws.print_area = "A1:H9"
    autosize(ws, 45)
    ws.column_dimensions["H"].width = 45


def tier_margin_formula(plan_cell: str, tier_row: int) -> str:
    return (
        f'=IF({plan_cell}="Start",\'Partner Tiers\'!$D${tier_row},'
        f'IF({plan_cell}="Pro",\'Partner Tiers\'!$E${tier_row},'
        f'IF({plan_cell}="Business",\'Partner Tiers\'!$F${tier_row},'
        f'IF({plan_cell}="Enterprise",\'Partner Tiers\'!$G${tier_row},""))))'
    )


def build_partner_buy_matrix(wb: Workbook) -> None:
    ws = wb.create_sheet("Partner Buy Price Matrix")
    set_tab_style(ws, PURPLE)
    headers = [
        "Price Book Version", "SKU", "Product", "Plan", "Price Basis", "MSRP",
        "Target Customer Discount", "Target Customer Sell Price",
        "Authorized Buy Price", "Advanced Buy Price", "Strategic Buy Price",
        "Authorized Margin", "Advanced Margin", "Strategic Margin",
        "Commercial Floor Price", "Customer Sell Price Approval Threshold",
        "Max Customer Discount", "Authorized Circularo Price Realization",
        "Advanced Circularo Price Realization", "Strategic Circularo Price Realization",
        "Floor Circularo Price Realization", "Notes",
    ]
    add_title(ws, "Partner Buy Price Matrix", "Tier-specific prices generated from the single-SKU master Price Book.", len(headers))
    add_header(ws, 4, headers)
    last_row = 4 + len(PRODUCTS)
    for row in range(5, last_row + 1):
        price_row = row
        links = {
            1: f"='Price Book'!A{price_row}", 2: f"='Price Book'!B{price_row}",
            3: f"='Price Book'!C{price_row}", 4: f"='Price Book'!D{price_row}",
            5: f"='Price Book'!G{price_row}", 6: f"='Price Book'!I{price_row}",
            7: f"='Price Book'!J{price_row}", 8: f"='Price Book'!K{price_row}",
            15: f"='Price Book'!M{price_row}", 16: f"='Price Book'!N{price_row}",
            17: f"='Price Book'!O{price_row}", 21: f"='Price Book'!R{price_row}",
            22: f"='Price Book'!AG{price_row}",
        }
        for col, formula in links.items():
            ws.cell(row, col, formula)
            style_formula(ws.cell(row, col), linked=True)
        ws.cell(row, 12, tier_margin_formula(f"D{row}", 5))
        ws.cell(row, 13, tier_margin_formula(f"D{row}", 6))
        ws.cell(row, 14, tier_margin_formula(f"D{row}", 7))
        ws.cell(row, 9, f'=IFERROR(H{row}*(1-L{row}),"")')
        ws.cell(row, 10, f'=IFERROR(H{row}*(1-M{row}),"")')
        ws.cell(row, 11, f'=IFERROR(H{row}*(1-N{row}),"")')
        ws.cell(row, 18, formula_div(f"I{row}", f"F{row}"))
        ws.cell(row, 19, formula_div(f"J{row}", f"F{row}"))
        ws.cell(row, 20, formula_div(f"K{row}", f"F{row}"))
        for col in {9, 10, 11, 12, 13, 14, 18, 19, 20}:
            style_formula(ws.cell(row, col))
        for col in {6, 8, 9, 10, 11, 15, 16}:
            ws.cell(row, col).number_format = CURRENCY_FMT
        for col in {7, 12, 13, 14, 17, 18, 19, 20, 21}:
            ws.cell(row, col).number_format = PERCENT_FMT
    apply_standard_body(ws, 5, last_row, len(headers))
    add_table(ws, "PartnerBuyMatrixTable", f"A4:V{last_row}")
    ws.freeze_panes = "B5"
    ws.auto_filter.ref = f"A4:V{last_row}"
    ws.page_setup.orientation = "landscape"
    ws.page_setup.paperSize = ws.PAPERSIZE_A3
    ws.page_setup.fitToWidth = 2
    ws.print_area = f"A1:V{last_row}"
    autosize(ws, 24)
    ws.column_dimensions["C"].width = 31
    ws.column_dimensions["V"].width = 42


def build_history(wb: Workbook) -> None:
    ws = wb.create_sheet("Price Book History")
    set_tab_style(ws, BODY_GREY)
    headers = [
        "Version", "Status", "Effective From", "Effective To", "Created By",
        "Approved By", "Approval Date", "Summary of Changes", "Notes",
    ]
    add_title(ws, "Price Book History", "Version control and approval history.", len(headers))
    add_header(ws, 4, headers)
    rows = [
        [VERSION, "Draft", date(2027, 1, 1), date(2027, 3, 31), OWNER, "", "", "Initial Commercial Pricing Engine workbook.", "Pending commercial approval."],
        ["FY2027-Q2", "Planned", date(2027, 4, 1), date(2027, 6, 30), OWNER, "", "", "Planned quarterly refresh.", "Not started."],
    ]
    for r, values in enumerate(rows, 5):
        for c, value in enumerate(values, 1):
            ws.cell(r, c, value)
            if c not in {1}:
                style_input(ws.cell(r, c), attention=(c in {2, 6, 7}))
        for c in {3, 4, 7}:
            ws.cell(r, c).number_format = DATE_FMT
    apply_standard_body(ws, 5, 6, len(headers))
    add_table(ws, "PriceBookHistoryTable", "A4:I6")
    ws.freeze_panes = "A5"
    ws.auto_filter.ref = "A4:I6"
    ws.page_setup.orientation = "landscape"
    ws.page_setup.fitToWidth = 1
    ws.print_area = "A1:I6"
    autosize(ws, 50)
    ws.column_dimensions["H"].width = 45
    ws.column_dimensions["I"].width = 40


def build_price_realization(wb: Workbook) -> None:
    ws = wb.create_sheet("Price Realization")
    set_tab_style(ws, PURPLE)
    headers = [
        "Price Book Version", "SKU", "Product", "Plan", "Price Basis", "MSRP",
        "Standard Partner Buy Price", "Commercial Floor Price",
        "Standard Circularo Price Realization", "Floor Circularo Price Realization",
        "Quantity / Volume", "MSRP Value", "Partner Buy Price Value",
        "Commercial Floor Value", "Notes",
    ]
    add_title(ws, "Circularo Price Realization", "Finance KPI: Partner Buy Price ÷ MSRP. Portfolio KPIs are value-weighted, never simple averages.", len(headers))
    # KPI panel
    last_row = 11 + len(PRODUCTS)
    kpis = [
        ("Total MSRP Value", f'=SUM(L12:L{last_row})', CURRENCY_FMT),
        ("Total Standard Partner Buy Price Value", f'=SUM(M12:M{last_row})', CURRENCY_FMT),
        ("Weighted Standard Circularo Price Realization", '=IFERROR(B6/B5,"")', PERCENT_FMT),
        ("Total Commercial Floor Value", f'=IF(COUNT(N12:N{last_row})=0,"",SUM(N12:N{last_row}))', CURRENCY_FMT),
        ("Weighted Floor Circularo Price Realization", '=IFERROR(B8/B5,"")', PERCENT_FMT),
    ]
    for row, (label, formula, fmt) in enumerate(kpis, 5):
        ws.cell(row, 1, label)
        ws.cell(row, 1).font = Font(name=BODY_FONT, bold=True, color=WHITE)
        ws.cell(row, 1).fill = HEADER_FILL
        ws.cell(row, 2, formula)
        ws.cell(row, 2).font = Font(name=BODY_FONT, bold=True, color=BODY_GREY)
        ws.cell(row, 2).fill = SUBHEADER_FILL
        ws.cell(row, 2).number_format = fmt
    add_header(ws, 11, headers)
    for row in range(12, last_row + 1):
        price_row = row - 7
        links = {
            1: f"='Price Book'!A{price_row}", 2: f"='Price Book'!B{price_row}",
            3: f"='Price Book'!C{price_row}", 4: f"='Price Book'!D{price_row}",
            5: f"='Price Book'!G{price_row}", 6: f"='Price Book'!I{price_row}",
            7: f"='Price Book'!L{price_row}", 8: f"='Price Book'!M{price_row}",
            9: f"='Price Book'!Q{price_row}", 10: f"='Price Book'!R{price_row}",
            15: f"='Price Book'!AG{price_row}",
        }
        for col, formula in links.items():
            ws.cell(row, col, formula)
            style_formula(ws.cell(row, col), linked=True)
        ws.cell(row, 11, 1)
        style_input(ws.cell(row, 11))
        ws.cell(row, 12, f'=IFERROR(F{row}*K{row},"")')
        ws.cell(row, 13, f'=IFERROR(G{row}*K{row},"")')
        ws.cell(row, 14, f'=IF(H{row}="","",H{row}*K{row})')
        for col in {12, 13, 14}:
            style_formula(ws.cell(row, col))
        for col in {6, 7, 8, 12, 13, 14}:
            ws.cell(row, col).number_format = CURRENCY_FMT
        for col in {9, 10}:
            ws.cell(row, col).number_format = PERCENT_FMT
        ws.cell(row, 11).number_format = INTEGER_FMT
    apply_standard_body(ws, 12, last_row, len(headers))
    add_table(ws, "PriceRealizationTable", f"A11:O{last_row}")
    ws.freeze_panes = "A12"
    ws.auto_filter.ref = f"A11:O{last_row}"
    ws.page_setup.orientation = "landscape"
    ws.page_setup.paperSize = ws.PAPERSIZE_A3
    ws.page_setup.fitToWidth = 1
    ws.print_area = f"A1:O{last_row}"
    autosize(ws, 28)
    ws.column_dimensions["A"].width = 38
    ws.column_dimensions["C"].width = 31
    ws.column_dimensions["O"].width = 42


def add_workbook_metadata(wb: Workbook) -> None:
    wb.calculation.fullCalcOnLoad = True
    wb.calculation.forceFullCalc = True
    wb.calculation.calcMode = "auto"
    wb.properties.title = "Circularo Internal Annual Price Book"
    wb.properties.subject = "Commercial Pricing Engine"
    wb.properties.creator = OWNER
    wb.properties.description = "Internal pricing governance workbook generated from canonical/partner-management/pricing-book/plan.md."


def build_workbook(output_path: Path = OUTPUT_PATH) -> Path:
    wb = Workbook()
    wb.remove(wb.active)
    build_workbook_guide(wb)
    build_price_book(wb)
    build_definitions(wb)
    build_formulas(wb)
    build_partner_tiers(wb)
    build_special_pricing(wb)
    build_msrp_catalog(wb)
    build_partner_buy_matrix(wb)
    build_discount_matrix(wb)
    build_history(wb)
    build_price_realization(wb)
    add_workbook_metadata(wb)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    wb.save(output_path)
    return output_path


def validate_workbook(path: Path) -> None:
    wb = load_workbook(path, data_only=False)
    expected = [
        "Workbook Guide", "Price Book", "Definitions", "Formulas", "Partner Tiers",
        "Special Pricing Matrix", "MSRP Catalog", "Partner Buy Price Matrix",
        "Discount Approval Matrix", "Price Book History", "Price Realization",
    ]
    assert wb.sheetnames == expected, (wb.sheetnames, expected)
    assert wb["Price Book"]["K5"].data_type == "f"
    assert wb["Price Book"]["L5"].data_type == "f"
    assert wb["Price Book"]["Q5"].data_type == "f"
    assert wb["Partner Buy Price Matrix"]["I5"].data_type == "f"
    assert wb["Price Realization"]["B7"].data_type == "f"
    assert wb["Price Realization"]["L12"].data_type == "f"
    assert wb["Price Book"]["I5"].number_format == CURRENCY_FMT
    assert wb["Price Book"]["J5"].number_format == PERCENT_FMT
    assert wb["Price Book"]["M5"].value == PRODUCTS[0][13]
    assert len({row[0] for row in PRODUCTS}) == len(PRODUCTS)
    for ws in wb.worksheets:
        assert ws.freeze_panes is not None
        assert ws.auto_filter.ref is not None


if __name__ == "__main__":
    built = build_workbook()
    validate_workbook(built)
    print(f"Built and validated: {built}")
