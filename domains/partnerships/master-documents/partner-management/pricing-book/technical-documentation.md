---
schema_version: 1
id: master:partner-management-pricing-book-technical-documentation
kind: master-document
domain: partnerships
title: "Circularo Internal Price Book — Technical Documentation"
status: draft
revision: 1
classification: restricted
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "partner-management/pricing-book/technical-documentation.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/partner-management/pricing-book/technical-documentation.md"
  source_sha256: 8744c1cd9b8afd845293f9adaa4e577a14e1af17e62ca93ab2120ecc22102e54
  legacy_status: draft
  legacy_classification: internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

# Circularo Internal Price Book — Technical Documentation

> Rebuild limitation in sales-system: the commands and catalog paths in this inherited document describe the source repository. The unified catalogue and generator path assumptions require reconciliation before a local rebuild. The generator and workbook were preserved without executing them. See the [migration report](../../../../../work/commercial-master-migration/README.md).

## 1. Purpose

`Circularo_Internal_Annual_Price_Book.xlsx` is Circularo's internal Commercial Pricing Engine workbook.

It provides:

- a version-controlled MSRP catalogue;
- one master commercial row per SKU;
- formula-generated partner buy prices;
- partner-tier and plan controls;
- customer-discount approval rules;
- Commercial Floor Price controls;
- Circularo Price Realization reporting;
- pricing history and review status.

The workbook is an internal planning and governance tool. It is not a customer quotation, partner-facing price list, accounting ledger, or replacement for an approved Order Form.

## 2. Package contents

| File | Purpose |
|---|---|
| [`plan.md`](<plan.md>) | Approved functional and commercial specification |
| [`build_price_book.py`](<build_price_book.py>) | Deterministic `openpyxl` generator and structural validator |
| [`Circularo_Internal_Annual_Price_Book.xlsx`](<Circularo_Internal_Annual_Price_Book.xlsx>) | Generated workbook |
| [`README.md`](<README.md>) | Package entry point and rebuild instructions |
| [`lessons-learned.md`](<lessons-learned.md>) | Decisions, implementation notes, QA outcome, and future improvements |
| [`user-manual.md`](<user-manual.md>) | End-user operating manual |

Canonical commercial sources:

- [`../Circularo Partner Pricing Strategy Architecture.md`](<../Circularo Partner Pricing Strategy Architecture.md>)
- [`../Circularo Partner Pricing & Special Pricing Guide.md`](<../Circularo Partner Pricing & Special Pricing Guide.md>)
- `../../../catalog/unified-catalog/unified-pricing-book.csv` (legacy reference: `../../../catalog/unified-catalog/unified-pricing-book.csv`; dependency not migrated)

## 3. Technical dependencies

### Required

- Python 3
- `openpyxl`
- Microsoft Excel, LibreOffice Calc, or another compatible `.xlsx` application

### Used for quality assurance

- LibreOffice/`soffice` for recalculation and PDF rendering
- Poppler `pdfinfo` and `pdftoppm` for page inspection

The generated workbook has no macros, external workbook links, database connections, or network dependencies.

## 3.1 Visual style dependencies

Workbook styling follows the repository's Circularo design-system guidance:

- Dark Blue `#1D0090` for primary title and header bars;
- Purple `#7000FF` for links, accents, and active commercial worksheets;
- Dark Grey `#3D3D3D` for body text and reference tabs;
- Spartan for workbook titles where available;
- Mulish for body, table, input, and formula text where available.

If Spartan or Mulish are not installed on the viewer's machine, Excel will substitute an available local font. The workbook remains usable; only the exact typography may vary.

## 4. Rebuild procedure

From the repository root:

```bash
uv run python canonical/partner-management/pricing-book/build_price_book.py
```

The generator:

1. imports active sellable SKU rows, Odoo costs, and maintained floor prices from the unified pricing book;
2. creates all worksheets;
3. writes inputs and formulas;
4. applies formatting, validation, tables, filters, and conditional formatting;
5. saves `Circularo_Internal_Annual_Price_Book.xlsx`;
6. reopens the workbook and runs structural assertions.

The build is deterministic. Manual changes made only in the generated workbook may be overwritten by the next rebuild. Permanent model changes must be made in `build_price_book.py` and documented in `plan.md`.

## 5. Workbook architecture

```text
Unified Pricing Book ──────────> MSRP Catalog ─┐
                           ├─> Price Book ──> Partner Buy Price Matrix
Partner Tiers ─────────────┘         │
                                     └─> Price Realization

Special Pricing Matrix ─────┐
Discount Approval Matrix ───┼─> Governance reference
Definitions ────────────────┤
Formulas ───────────────────┤
Price Book History ─────────┘
```

### Data flow

- `Workbook Guide` is the first sheet and explains workbook navigation, source, audience, and internal-only cautions.
- `MSRP Catalog` contains the unified pricing book's active sellable product-variant and list-price inputs.
- `Price Book` links to the catalogue and adds governance inputs and calculations.
- `Partner Tiers` supplies tier and plan margin ceilings.
- `Partner Buy Price Matrix` generates tier-specific prices.
- `Price Realization` calculates row-level and weighted internal KPIs.
- Governance sheets provide definitions, approval thresholds, and audit context.

## 6. Worksheet reference

### 6.1 Workbook Guide

The entry sheet explains the workbook purpose, audience, source catalog, and internal-only cautions. It includes a sheet directory with internal links to each worksheet.

### 6.2 Price Book

The master working sheet contains exactly one row per SKU.

Linked from `MSRP Catalog`:

- Price Book Version
- SKU
- Product
- Plan
- Product Family
- Unit
- Price Basis
- Pack Quantity
- MSRP
- Effective To
- Status
- Notes

Maintained inputs:

- Target Customer Discount
- Commercial Floor Price
- Max Customer Discount
- Target Realized Partner Margin
- Standard Approval
- Floor Approval
- Independent Partner Quote
- Special Pricing Applied
- Deal Registration ID

Calculated outputs:

- Target Customer Sell Price
- Standard Partner Buy Price
- Customer Sell Price Approval Threshold
- Standard Circularo Price Realization
- Floor Circularo Price Realization
- commercial control flags

`catalog/unified-catalog/unified-pricing-book.csv` is a hybrid managed file. `floor_price` is the only manually editable column. All other fields are regenerated. The builder preserves `floor_price` by `variant_sku`. The row currency applies to both list price and floor price. Unknown floors remain blank and are never populated with placeholders.

### 6.3 Definitions

Data dictionary for commercial fields, including meaning, example, and owner.

### 6.4 Formulas

Human-readable reference for the core commercial formulas. It documents the calculation engine but is not itself a calculation source.

### 6.5 Partner Tiers

Maintains standard margin and quotation permissions.

| Tier | Standard ceiling |
|---|---:|
| Authorized | 15% |
| Advanced | 20% |
| Strategic | 30% |

Plan ceilings override broader tier ceilings:

- Start: 10%
- Pro: 15%
- Business: tier ceiling
- Enterprise: tier ceiling
- Ultimate: not available for independent quotation

### 6.6 Special Pricing Matrix

Documents customer-discount approval bands and the Strategic Opportunity Exception.

The exception permits up to 40% realized first-year partner margin only when all documented conditions and CSO approval apply. It does not automatically change calculated standard prices.

### 6.7 MSRP Catalog

Source table for:

- product identity;
- Price Basis;
- Pack Quantity;
- MSRP;
- effective dates;
- product status.

`MSRP = 0` is a placeholder requiring review. It does not mean the product is free.

### 6.8 Partner Buy Price Matrix

Calculates Authorized, Advanced, and Strategic partner buy prices from MSRP, target customer discount, Partner Tier rules, and plan-specific ceilings.

Tier prices are generated here rather than duplicating SKU rows in the master Price Book.

### 6.9 Discount Approval Matrix

Reference matrix for customer-discount authority, deal-registration requirements, special pricing, and CSO approval.

### 6.10 Price Book History

Version lifecycle and approval register.

A version is not approved merely because it has a row. `Status`, `Approved By`, and `Approval Date` must be completed.

### 6.11 Price Realization

Finance KPI sheet containing:

- row-level Standard Circularo Price Realization;
- row-level Floor Circularo Price Realization;
- editable quantity/volume weights;
- MSRP value;
- partner buy price value;
- commercial floor value;
- weighted portfolio KPIs.

## 7. Formula definitions

### Target Customer Sell Price

```text
MSRP × (1 − Target Customer Discount)
```

### Standard Partner Buy Price

```text
Target Customer Sell Price × (1 − Target Realized Partner Margin)
```

### Customer Sell Price Approval Threshold

```text
MSRP × (1 − Max Customer Discount)
```

This is an internal approval threshold. It must not be presented as a prescribed or contractually enforced resale price.

### Realized Partner Gross Margin

```text
(Customer Sell Price − Partner Buy Price) ÷ Customer Sell Price
```

### Standard Circularo Price Realization

```text
Standard Partner Buy Price ÷ MSRP
```

### Floor Circularo Price Realization

```text
Commercial Floor Price ÷ MSRP
```

### Weighted Standard Circularo Price Realization

```text
Total Standard Partner Buy Price Value ÷ Total MSRP Value
```

Never calculate the portfolio KPI by averaging row percentages.

## 8. Price bases

| Price Basis | Meaning | Example |
|---|---|---|
| Annual | Annual subscription or entitlement | User/year, organization/year |
| Per Event | Each executed chargeable event | API signing transaction |
| Per Pack | Defined pack of events | 100 SMS messages |
| One-Time | Finite service or activation | Professional service |

Monthly pricing is derived by dividing MSRP by 12 only when Price Basis is `Annual`.

## 9. Control flags

| Flag | `OK` | `REVIEW` | `BLOCK` |
|---|---|---|---|
| Below Floor | Standard buy price is at/above floor | Floor is blank | Standard buy price is below floor |
| Above Discount Authority | Discount is within authority | Not normally used | Discount exceeds authority |
| Above Partner Margin Ceiling | Margin is within ceiling | Not normally used | Margin exceeds plan/tier ceiling |
| Low Price Realization | Standard realization is at/above floor realization | Floor is blank | Standard realization is below floor realization |
| Ultimate Independent Quote | Ultimate is not independently quoted | Not normally used | Ultimate is marked as an independent quote |
| Special Pricing Without Deal Registration | Registration requirement is satisfied | Not normally used | Special pricing has no Deal Registration ID |
| Expired Price Book Version | Effective date has not expired | Effective To is blank | Effective To is in the past |

`REVIEW` is intentional when a required maintained input is unknown. It is not a formula error.

## 10. Formatting conventions

| Visual treatment | Meaning |
|---|---|
| Blue text | Editable input |
| Yellow fill | Input requiring attention |
| Green text | Internal link to another worksheet |
| Black text | Formula/calculation |
| Green status fill | `OK` |
| Yellow status fill | `REVIEW` |
| Red status fill | `BLOCK` |

Currency, percentages, dates, and counts are stored as typed spreadsheet values with explicit formats.

## 11. Data validation

The workbook uses dropdown validation for:

- Price Basis;
- MSRP Catalogue status;
- Yes/No control inputs.

Invalid pasted values can break downstream controls.

## 12. Calculation and compatibility

- Calculation mode is automatic.
- Full recalculation is requested when the workbook opens.
- Formulas use standard Excel syntax without volatile functions.
- Worksheet references are internal only.
- Formula outputs are guarded against blank inputs and division by zero.

## 13. Structural validation

The generator verifies:

- all eleven worksheets exist in the approved order;
- representative calculated cells contain formulas;
- currency and percentage formats are applied;
- Commercial Floor Price inputs match the unified pricing controls and remain blank where unknown;
- one master row exists per unique SKU;
- all sheets have freeze panes and filters.

Current generated structure:

- 11 worksheets;
- the current active sellable variant SKU set from the unified pricing book;
- 11 Excel tables.

## 14. Safe extension procedure

### Add a product

1. Add or correct the approved SKU in Odoo, normalize the export, and rebuild the unified catalog.
2. Confirm variant SKU, category, list price, currency, tags, and variant values in the unified pricing book.
3. Edit only `floor_price` directly in `catalog/unified-catalog/unified-pricing-book.csv`, then run the downstream generators.
4. If needed, update the generator's display rules for Plan, Product Family, Unit, Price Basis, or Pack Quantity.
5. Rebuild the workbook.
6. Run validation.
7. Render and inspect affected worksheets.
8. Update Price Book History and supporting documentation.

### Change a formula

1. Update `plan.md`.
2. Update the generator.
3. Update Definitions and Formulas content.
4. Rebuild and verify representative formulas.
5. Recheck Price Realization and control flags.

## 15. Known limitations

- MSRP values originate in Odoo and are imported through the unified pricing book; they still require commercial governance before external use.
- Commercial Floor Prices remain blank unless explicitly maintained in the `floor_price` column of `unified-pricing-book.csv`.
- The workbook does not calculate case-by-case Registered Deal Buy Prices.
- Weighted realization uses manually entered quantity/volume until connected to actual deal data.
- It imports from the checked-in generated unified pricing CSV; it does not connect directly to live Odoo.
- It does not implement an electronic approval workflow.

## 16. Future integration

Recommended next steps:

- Odoo price-list export mapping;
- actual opportunity-volume input for realized KPI reporting;
- workflow identifiers for approval evidence;
- automated comparison between workbook versions and active Odoo prices;
- controlled promotion from Draft to Approved.
