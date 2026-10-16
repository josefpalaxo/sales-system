---
schema_version: 1
id: master:partner-management-pricing-book-readme
kind: master-document
domain: partnerships
title: "Circularo Internal Price Book"
status: draft
revision: 1
classification: restricted
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "partner-management/pricing-book/README.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/partner-management/pricing-book/README.md"
  source_sha256: 437968b17e5f92b11a1baeaa62dc90cf788c365c35deec20ed7b21b0f729dbfb
  legacy_status: draft
  legacy_classification: internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

# Circularo Internal Price Book

> Migration dependency: this package is preserved from sales-repo. The rebuild command below describes that former layout and must not be run as a sales-system command. The source unified pricing catalogue and its refresh pipeline have not yet been migrated. The copied workbook remains a draft reference, not an approved price list. See the [migration report](../../../../work/commercial-master-migration/README.md).

This folder contains the reproducible specification and generator for Circularo's internal Commercial Pricing Engine workbook.

## Files

- `plan.md` — approved workbook specification and commercial decisions
- `build_price_book.py` — deterministic `openpyxl` generator
- `Circularo_Internal_Annual_Price_Book.xlsx` — generated workbook
- `technical-documentation.md` — architecture, dependencies, formulas, controls, and maintenance
- `user-manual.md` — end-user operating instructions and commercial workflows
- `lessons-learned.md` — implementation notes and future improvements

## Rebuild

Use `uv` with an environment containing `openpyxl`:

```bash
uv run python canonical/partner-management/pricing-book/build_price_book.py
```

The script imports active sellable SKU rows, Odoo costs, and maintained floor prices from `catalog/unified-catalog/unified-pricing-book.csv`, recreates the workbook, and runs structural validation after saving.

## Operating rules

- `catalog/unified-catalog/unified-pricing-book.csv` is a hybrid managed file. `floor_price` is the only manually editable column. All other fields are regenerated. The builder preserves `floor_price` by `variant_sku`. The row currency applies to both list price and floor price.
- Edit `floor_price` directly in the unified pricing book before running this workbook generator.
- Do not invent Commercial Floor Prices. Blank floors must remain in `REVIEW`.
- Maintain one master row per SKU in `Price Book`.
- Tier-specific prices are generated in `Partner Buy Price Matrix`.
- Do not average row-level Price Realization percentages; use the weighted KPI.
- Registered deal pricing remains case-by-case and outside this standard workbook.
- Keep workbook styling aligned with the Circularo design system: dark blue headers, purple accents, Mulish body text, and Spartan titles where supported.
