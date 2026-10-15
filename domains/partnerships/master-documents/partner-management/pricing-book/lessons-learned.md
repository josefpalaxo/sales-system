---
schema_version: 1
id: master:partner-management-pricing-book-lessons-learned
kind: master-document
domain: partnerships
title: "Pricing Workbook Implementation Notes"
status: draft
revision: 1
classification: restricted
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "partner-management/pricing-book/lessons-learned.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/partner-management/pricing-book/lessons-learned.md"
  source_sha256: a12e92b4d3f3a36397e7b8ee54e56395034c1b9a7f7c9a7821e8e2af88e0b140
  legacy_status: draft
  legacy_classification: internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

# Pricing Workbook Implementation Notes

## Decisions implemented

- Partner tier margin ceilings are 15% Authorized, 20% Advanced, and 30% Strategic.
- Start and Pro plan ceilings override broader tier ceilings at 10% and 15%.
- The master Price Book contains one row per SKU.
- Active sellable variants from `catalog/unified-catalog/unified-pricing-book.csv` are the SKU/MSRP source; the same view carries Odoo cost and maintained floor-price controls.
- Commercial Floor Price is a manually maintained input.
- An unknown floor remains blank and produces a `REVIEW` control status.
- `Customer Sell Price Approval Threshold` is an internal governance benchmark, not a prescribed resale price.
- Subscription entitlements use an Annual price basis; consumption uses Per Event or Per Pack.
- Registered deal buy prices are managed outside the standard workbook.
- Circularo Price Realization is Partner Buy Price divided by MSRP.
- Portfolio realization is value-weighted and must never be calculated as a simple average.

## Model conventions

- Blue text identifies editable inputs.
- Yellow fill identifies inputs needing attention.
- Green text identifies links to another worksheet.
- Black text identifies formulas and calculations.
- Control outputs use `OK`, `REVIEW`, and `BLOCK`.
- Formula calculations are guarded against blanks and division by zero.

## Future improvements

- Populate Commercial Floor Prices after Finance and CSO approval.
- Add a controlled import/export mapping for Odoo pricelists.
- Add actual deal-volume imports to make weighted Price Realization operational.
- Add approval workflow identifiers if deal-pricing governance moves into the workbook.

## Quality assurance completed

- Structural validation confirms all eleven required worksheets and representative formulas.
- The workbook now starts with a `Workbook Guide` sheet containing explanations and internal navigation links.
- All worksheets were rendered through LibreOffice and visually inspected.
- Wide Price Book and Partner Buy Price Matrix sheets use two-page landscape print layouts for legibility.
- Formula results recalculated successfully during the visual export.
- Blank Commercial Floor Prices correctly produce `REVIEW` rather than invented values.
- The weighted Standard Circularo Price Realization summary calculates from value totals rather than averaged row percentages.
