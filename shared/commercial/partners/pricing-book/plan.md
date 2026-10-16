---
schema_version: 1
id: master:partner-management-pricing-book-plan
kind: master-document
domain: partnerships
title: "Task: Build Circularo Internal Annual Pricing Workbook"
status: draft
revision: 1
classification: restricted
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "partner-management/pricing-book/plan.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/partner-management/pricing-book/plan.md"
  source_sha256: c0031ec0a59efd50ceffcbccf031ea4d77165b40585ea3e5595364eea85e7e12
  legacy_status: draft
  legacy_classification: internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

# Task: Build Circularo Internal Annual Pricing Workbook

We are building Commercial Pricing Engine.

Create a complete Excel workbook named:

`Circularo_Internal_Annual_Price_Book.xlsx`

The workbook must be created using Python and `openpyxl`.

Store the Python generator, lessons learned, decisions, documentation, and future improvements in `canonical/partner-management/pricing-book`.
So any agentic AI can recreate or upgrade the workbook in the future.

Subscription entitlements are annual by default. Consumption products are priced per event or per pack, and services may be priced one-time where explicitly stated.

## Scope and Governance Decisions

- Standard partner tier margin ceilings are Authorized 15%, Advanced 20%, and Strategic 30%.
- The Price Book contains one master row per SKU. Tier-specific prices are generated only in the Partner Buy Price Matrix.
- Registered Deal Buy Price is managed case by case outside this standard price-book workbook.
- Commercial Floor Price is manually maintained by the authorized commercial owner.
- Unknown Commercial Floor Prices remain blank and trigger `REVIEW`; placeholder floor values must not be invented.
- Customer Sell Price Approval Threshold is an internal approval and escalation benchmark. It is not a prescribed or contractually enforced resale price.
- Circularo Price Realization is an internal Finance KPI calculated as Partner Buy Price ÷ MSRP.
- Portfolio Price Realization must be value-weighted: Total Partner Buy Price Value ÷ Total MSRP Value. Individual row percentages must not be averaged.

## Workbook Sheets

Create the following worksheets:

1. `Workbook Guide`
2. `Price Book`
3. `Definitions`
4. `Formulas`
5. `Partner Tiers`
6. `Special Pricing Matrix`
7. `MSRP Catalog`
8. `Partner Buy Price Matrix`
9. `Discount Approval Matrix`
10. `Price Book History`
11. `Price Realization`

---

# 1. Price Book

This is the master internal working sheet.

Columns:

- Price Book Version
- SKU
- Product
- Plan
- Product Family
- Unit
- Price Basis
- Pack Quantity
- MSRP
- Target Customer Discount
- Target Customer Sell Price
- Standard Partner Buy Price
- Commercial Floor Price
- Customer Sell Price Approval Threshold
- Max Customer Discount
- Target Realized Partner Margin
- Standard Circularo Price Realization
- Floor Circularo Price Realization
- Standard Approval
- Floor Approval
- Below Floor
- Above Discount Authority
- Above Partner Margin Ceiling
- Low Price Realization
- Independent Partner Quote
- Ultimate Independent Quote
- Special Pricing Applied
- Deal Registration ID
- Special Pricing Without Deal Registration
- Effective To
- Expired Price Book Version
- Status
- Notes

Rules:

- `Target Customer Sell Price = MSRP × (1 − Target Customer Discount)`
- `Standard Partner Buy Price = Target Customer Sell Price × (1 − Target Realized Partner Margin)`
- `Customer Sell Price Approval Threshold = MSRP × (1 − Max Customer Discount)`
- `Standard Circularo Price Realization = Standard Partner Buy Price ÷ MSRP`
- `Floor Circularo Price Realization = Commercial Floor Price ÷ MSRP`
- Commercial Floor Price is manually maintained, not formula-derived.
- If Commercial Floor Price is blank, Floor Circularo Price Realization remains blank and the relevant floor-control fields return `REVIEW`.
- Maintain one Price Book row per SKU. Do not duplicate master rows by Partner Tier.
- Use formulas, not static values.
- Format currency columns as USD.
- Format percentage columns as percentages.
- Freeze the header row.
- Apply filters.
- Make headers bold.
- Apply Circularo-compatible styling: Dark Blue `#1D0090` titles and headers, Purple `#7000FF` links and accents, Dark Grey `#3D3D3D` body text, Spartan titles, and Mulish body text where supported.

Populate rows from active sellable product variants in `catalog/unified-catalog/unified-pricing-book.csv`. Each `variant_sku` becomes one SKU-level row. The file is a hybrid managed pricing book: `floor_price` is the only manually editable column, all other fields are regenerated, and the unified builder preserves `floor_price` by `variant_sku`. The row currency applies to both list price and floor price.
- CB-ESEAL-API
- CB-SAML-SSO
- CB-SCIM
- CB-DMS-USER
- CB-STORAGE-100GB
- CB-SMS-OTP
- CB-SMS-REMINDER
- CB-PREMIUM-SUPPORT

Use placeholder MSRP values where actual prices are unknown.

Do not use placeholder Commercial Floor Prices. Leave unknown floor inputs blank and flag them for review.

---

# 2. Definitions

Create a clear data dictionary.

Columns:

- Field
- Definition
- Example
- Owner

Include definitions for every column in the Price Book.

Important definitions:

## MSRP

Published List Price / Manufacturer's Suggested Retail Price before discount. For subscription entitlements, MSRP is annual. For consumption products, MSRP applies per event or per pack according to Price Basis.

## Target Customer Discount

Expected standard customer discount, normally 10%.

## Target Customer Sell Price

Expected market selling price after the Target Customer Discount.

## Standard Partner Buy Price

Default buy price charged by Circularo to the partner.

## Commercial Floor Price

Lowest partner buy price normally approved. This protects Circularo economics.

The Commercial Floor Price is manually maintained by the authorized commercial owner. It is not derived from product cost or another workbook formula.

## Customer Sell Price Approval Threshold

Internal customer-price benchmark below which additional commercial approval is required. It protects market and channel consistency but does not prescribe or restrict the partner's independently determined resale price.

## Max Customer Discount

Maximum customer discount permitted under the standard program.

## Target Realized Partner Margin

Expected partner gross margin at the Target Customer Sell Price.

## Standard Circularo Price Realization

The proportion of MSRP retained by Circularo at the Standard Partner Buy Price.

`Standard Partner Buy Price ÷ MSRP`

## Floor Circularo Price Realization

The proportion of MSRP retained by Circularo at the manually maintained Commercial Floor Price.

`Commercial Floor Price ÷ MSRP`

## Price Basis

The commercial charging basis: Annual, Per Event, Per Pack, or One-Time. Subscription entitlements use Annual. Consumption products use Per Event or Per Pack.

## Pack Quantity

The number of chargeable events included in a pack. Leave blank when Price Basis is not Per Pack.

---

# 3. Formulas

Create a formula reference sheet.

Columns:

- Formula Name
- Formula
- Description

Include:

## Target Customer Sell Price

`MSRP × (1 − Target Customer Discount)`

## Standard Partner Buy Price

`Target Customer Sell Price × (1 − Target Realized Partner Margin)`

## Customer Discount

`(MSRP − Customer Sell Price) ÷ MSRP`

## Realized Partner Gross Margin

`(Customer Sell Price − Partner Buy Price) ÷ Customer Sell Price`

## Customer Sell Price Approval Threshold

`MSRP × (1 − Max Customer Discount)`

This is an internal approval threshold, not a prescribed resale price.

## Standard Circularo Price Realization

`Standard Partner Buy Price ÷ MSRP`

## Floor Circularo Price Realization

`Commercial Floor Price ÷ MSRP`

## Weighted Portfolio Price Realization

`Total Partner Buy Price Value ÷ Total MSRP Value`

Do not calculate portfolio realization by averaging row-level realization percentages.

---

# 4. Partner Tiers

Create partner tier permissions.

Columns:

- Partner Tier
- Target Role
- Standard Realized Margin Ceiling
- Start Margin Ceiling
- Pro Margin Ceiling
- Business Margin Ceiling
- Enterprise Margin Ceiling
- Can Quote Start
- Can Quote Pro
- Can Quote Business
- Can Quote Enterprise
- Can Quote Ultimate
- Max User-Based Quote
- Max Transaction-Based Quote
- Requires Deal Registration
- Notes

Rows:

## Authorized

- Standard margin ceiling: 15%
- Start: 10%
- Pro: 15%
- Business: 15%
- Enterprise: 15%
- Ultimate: No

## Advanced

- Standard margin ceiling: 20%
- Start: 10%
- Pro: 15%
- Business: 20%
- Enterprise: 20%
- Ultimate: No

## Strategic

- Standard margin ceiling: 30%
- Start: 10%
- Pro: 15%
- Business: 30%
- Enterprise: 30%
- Ultimate: No

Add note:

Ultimate is always a joint Circularo engagement and cannot be independently quoted by partners.

---

# 5. Special Pricing Matrix

Create approval thresholds.

Columns:

- Customer Discount Band
- Treatment
- Required Approval
- Deal Registration Required
- Special Pricing Required
- Notes

Rows:

- 0–10%: Partner discretion / Automatic / No / No
- >10–20%: Normal commercial band / Reported and tracked / Recommended / No
- >20–35%: Special pricing / Sales leadership approval / Yes / Yes
- >35–50%: Exceptional strategic approval / CSO / Yes / Yes
- >50%: Outside standard program / CEO or prohibited / Yes / Exceptional only

Add a separate Strategic Opportunity Exception row:

- Up to 40% realized first-year partner gross margin
- Strategic Partner only
- New customer
- Business or Enterprise Plan
- Registered opportunity
- Demonstrated strategic commercial value
- CSO approval required
- Renewal returns to the standard applicable margin unless separately approved

Add note:

Approval of customer discount does not automatically increase partner margin.

---

# 6. MSRP Catalog

Create source catalog for list prices.

Columns:

- Price Book Version
- SKU
- Product
- Plan
- Product Family
- Unit
- Price Basis
- Pack Quantity
- MSRP
- Currency
- Status
- Effective From
- Effective To
- Notes

This sheet is the source for published list prices.

For subscription entitlements, MSRP is the annual list price. For consumption products, MSRP applies to the stated event or pack unit and must not be presented as an annual entitlement.

Use imported Odoo variant rows matching the Price Book SKUs.

---

# 7. Partner Buy Price Matrix

Create generated buy prices by partner tier.

Columns:

- Price Book Version
- SKU
- Product
- Plan
- MSRP
- Target Customer Discount
- Target Customer Sell Price
- Authorized Buy Price
- Advanced Buy Price
- Strategic Buy Price
- Authorized Margin
- Advanced Margin
- Strategic Margin
- Commercial Floor Price
- Customer Sell Price Approval Threshold
- Max Customer Discount
- Authorized Circularo Price Realization
- Advanced Circularo Price Realization
- Strategic Circularo Price Realization
- Floor Circularo Price Realization
- Notes

Use formulas:

- Target Customer Sell Price = MSRP × 90%
- Authorized Buy Price = Target Sell Price × (1 − Authorized Margin)
- Advanced Buy Price = Target Sell Price × (1 − Advanced Margin)
- Strategic Buy Price = Target Sell Price × (1 − Strategic Margin)
- Customer Sell Price Approval Threshold = MSRP × (1 − Max Customer Discount)
- Tier Circularo Price Realization = Tier Buy Price ÷ MSRP
- Floor Circularo Price Realization = Commercial Floor Price ÷ MSRP

Margin logic:

- Start: all tiers max 10%
- Pro: all tiers max 15%
- Business: Authorized 15%, Advanced 20%, Strategic 30%
- Enterprise: Authorized 15%, Advanced 20%, Strategic 30%

---

# 8. Discount Approval Matrix

Create customer discount approval governance.

Columns:

- Discount Range
- Approval Required
- Applies To
- Partner Discretion
- Deal Registration Required
- Special Pricing Required
- CSO Approval Required
- Notes

Rows:

- 0–10%
- >10–20%
- >20–35%
- >35–50%
- >50%

Make this consistent with the Special Pricing Matrix.

---

# 9. Price Book History

Create version control.

Columns:

- Version
- Status
- Effective From
- Effective To
- Created By
- Approved By
- Approval Date
- Summary of Changes
- Notes

Rows:

- FY2027-Q1 / Draft
- FY2027-Q2 / Planned

---

# 10. Price Realization

Create an internal Finance KPI sheet.

Columns:

- Price Book Version
- SKU
- Product
- Plan
- Price Basis
- MSRP
- Standard Partner Buy Price
- Commercial Floor Price
- Standard Circularo Price Realization
- Floor Circularo Price Realization
- Quantity / Volume
- MSRP Value
- Partner Buy Price Value
- Commercial Floor Value
- Notes

Use formulas:

- `Standard Circularo Price Realization = Standard Partner Buy Price ÷ MSRP`
- `Floor Circularo Price Realization = Commercial Floor Price ÷ MSRP`
- `MSRP Value = MSRP × Quantity / Volume`
- `Partner Buy Price Value = Standard Partner Buy Price × Quantity / Volume`
- `Commercial Floor Value = Commercial Floor Price × Quantity / Volume`

Add a summary section:

- Total MSRP Value
- Total Standard Partner Buy Price Value
- Weighted Standard Circularo Price Realization
- Total Commercial Floor Value
- Weighted Floor Circularo Price Realization

Weighted formulas:

- `Weighted Standard Circularo Price Realization = Total Standard Partner Buy Price Value ÷ Total MSRP Value`
- `Weighted Floor Circularo Price Realization = Total Commercial Floor Value ÷ Total MSRP Value`

Do not average row-level realization percentages.

---

# Formatting Requirements

Apply the following formatting:

- Bold headers
- Freeze top row on every sheet
- Enable filters on every sheet
- Auto-size columns
- Currency format: `$#,##0.00`
- Percentage format: `0%`
- Use consistent sheet tab colors if easy
- Add comments or notes where helpful
- Ensure formulas work when opened in Excel

---

# Validation / Quality Checks

After creating the workbook:

1. Confirm all required sheets exist.
2. Confirm formulas are present in calculated columns.
3. Confirm percentage and currency formats are applied.
4. Confirm no required column is missing.
5. Confirm Commercial Floor Price cells are maintained inputs, not calculated formulas.
6. Confirm unknown Commercial Floor Prices are blank and return `REVIEW`.
7. Confirm the Price Book has one master row per SKU and no tier-duplicated rows.
8. Confirm row-level and weighted Circularo Price Realization formulas are present.
9. Confirm subscription, per-event, per-pack, and one-time products use the correct Price Basis.
10. Confirm automated control flags return `OK`, `REVIEW`, or `BLOCK` as designed.
11. Save the workbook to:

`canonical/partner-management/pricing-book/Circularo_Internal_Annual_Price_Book.xlsx`

---

# Important Commercial Rules

Include these rules in the workbook notes or definitions:

- Subscription entitlements are annual. Consumption products are priced per event or per pack; one-time services must be explicitly identified.
- Monthly prices are derived by dividing MSRP by 12 only when Price Basis is Annual.
- Published List Price means MSRP at the stated Price Basis.
- Partner Buy Prices are confidential.
- Commercial Floor Price protects Circularo economics.
- Commercial Floor Price is manually maintained by the authorized commercial owner.
- Customer Sell Price Approval Threshold protects channel and market consistency as an internal approval benchmark; it is not a prescribed resale price.
- Max Customer Discount defines the maximum standard customer discount.
- Circularo Price Realization measures Partner Buy Price ÷ MSRP.
- Portfolio Price Realization must be value-weighted.
- Ultimate is not available for independent partner quotation.
- Special pricing is discretionary and requires approval.
- Deal registration is normally required for special pricing.
- Registered Deal Buy Prices are managed case by case outside this standard workbook.
- Strategic Partners may receive up to 40% realized first-year margin only for an approved, registered, new-customer Business or Enterprise opportunity with CSO approval.

---

# Automated Commercial Control Flags

Implement formula-driven flags in the Price Book:

- **Below Floor:** Return `REVIEW` when Commercial Floor Price is blank; otherwise return `BLOCK` when Standard Partner Buy Price is below Commercial Floor Price and `OK` when it is not.
- **Above Discount Authority:** Target Customer Discount exceeds the standard permitted authority.
- **Above Partner Margin Ceiling:** Target Realized Partner Margin exceeds the applicable partner-tier and plan ceiling.
- **Low Price Realization:** Return `REVIEW` when Commercial Floor Price or Floor Circularo Price Realization is blank; otherwise return `BLOCK` when Standard Circularo Price Realization is below Floor Circularo Price Realization and `OK` when it is not.
- **Ultimate Independent Quote:** Plan is Ultimate and Independent Partner Quote is Yes.
- **Special Pricing Without Deal Registration:** Special Pricing Applied is Yes and Deal Registration ID is blank where registration is required.
- **Expired Price Book Version:** Effective To is earlier than the current date.

Use visible status values such as `OK`, `REVIEW`, and `BLOCK`.
