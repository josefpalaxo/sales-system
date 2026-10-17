---
schema_version: 1
id: master:partner-management-pricing-book-user-manual
kind: master-document
domain: partnerships
title: "Circularo Internal Price Book — End-User Manual"
status: draft
revision: 1
classification: restricted
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "partner-management/pricing-book/user-manual.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/partner-management/pricing-book/user-manual.md"
  source_sha256: 74f2a7e7eff2965b88d8923c33c53d3c7b94800a63c0a9bc6f243fcf69f37e1f
  legacy_status: draft
  legacy_classification: internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

# Circularo Internal Price Book — End-User Manual

## 1. Intended users

The workbook is intended for:

- Commercial Operations;
- Sales leadership;
- Finance;
- Product Operations;
- authorized internal users supporting partner pricing.

It is not partner-facing or customer-facing.

## 2. Before you begin

Open [`Circularo_Internal_Annual_Price_Book.xlsx`](<Circularo_Internal_Annual_Price_Book.xlsx>).

Confirm:

1. the expected Price Book Version is active;
2. workbook status is appropriate for the task;
3. formulas recalculate when the file opens;
4. you are working on a controlled copy;
5. displayed MSRP values come from the checked-in Odoo product catalog export and must still pass internal governance before external use.

Do not issue a quotation from a Draft price book without the required approval.

## 3. Color guide

| Color/style | Action |
|---|---|
| Blue text | Editable input |
| Yellow fill | Enter or confirm a required value |
| Green text | Do not edit; linked from another worksheet |
| Black text | Do not edit; calculated formula |
| Green `OK` | Control passed |
| Yellow `REVIEW` | Human review or maintained input required |
| Red `BLOCK` | Stop; commercial rule is breached |

## 4. Standard operating workflow

### Step 1 — Confirm product and MSRP

Go to `MSRP Catalog`.

Review:

- SKU;
- Product;
- Plan;
- Unit;
- Price Basis;
- Pack Quantity;
- MSRP;
- Status;
- effective dates.

If MSRP shows zero or a dash:

- do not treat the product as free;
- confirm the approved price;
- update the source input only after authorization.

### Step 2 — Review the master Price Book

Go to `Price Book` and locate the SKU using filters.

Review:

- Target Customer Discount;
- Target Customer Sell Price;
- Standard Partner Buy Price;
- Commercial Floor Price;
- Customer Sell Price Approval Threshold;
- Target Realized Partner Margin;
- Circularo Price Realization;
- all control flags.

Do not create duplicate rows for partner tiers.

### Step 3 — Maintain Commercial Floor Price

Commercial Floor Price is a manually approved input.

If no approved floor exists:

- leave the cell blank;
- expect `Below Floor` and `Low Price Realization` to show `REVIEW`;
- do not enter a temporary floor merely to clear the warning.

If Finance/CSO approves a floor:

1. enter it in the yellow Commercial Floor Price cell;
2. verify Floor Circularo Price Realization;
3. confirm floor-related controls recalculate;
4. retain the approval evidence through the applicable governance process.

### Step 4 — Review tier prices

Go to `Partner Buy Price Matrix`.

For the SKU, review:

- Authorized Buy Price;
- Advanced Buy Price;
- Strategic Buy Price;
- tier margins;
- tier Price Realization;
- Commercial Floor Price.

Standard ceilings:

| Plan | Authorized | Advanced | Strategic |
|---|---:|---:|---:|
| Start | 10% | 10% | 10% |
| Pro | 15% | 15% | 15% |
| Business | 15% | 20% | 30% |
| Enterprise | 15% | 20% | 30% |

Ultimate cannot be quoted independently by a partner.

### Step 5 — Check discount authority

Use `Discount Approval Matrix` or `Special Pricing Matrix`.

| Customer discount | Treatment |
|---:|---|
| 0–10% | Partner discretion |
| >10–20% | Reported and tracked |
| >20–35% | Special pricing approval |
| >35–50% | CSO approval |
| >50% | Outside the standard program |

Approval of a customer discount does not automatically increase partner margin.

### Step 6 — Review Price Realization

Go to `Price Realization`.

Use `Quantity / Volume` to model the expected mix.

Review:

- Standard Circularo Price Realization;
- Floor Circularo Price Realization;
- weighted Standard Circularo Price Realization;
- weighted Floor Circularo Price Realization.

Price Realization:

```text
Partner Buy Price ÷ MSRP
```

For a portfolio, use the weighted summary. Never average row percentages manually.

### Step 7 — Resolve controls

Before using a price:

- relevant controls should be `OK`; or
- every `REVIEW` must have a documented reason and owner;
- every `BLOCK` must be resolved or formally escalated.

## 5. Maintaining common inputs

### Target Customer Discount

Normally 10%. Change it only where commercial policy permits.

### Max Customer Discount

Defines the internal standard approval boundary. It does not prescribe the partner's resale price.

### Target Realized Partner Margin

The Price Book uses one standard target per SKU. Tier-specific values are generated separately.

Do not use the master target to bypass Partner Tier ceilings.

### Independent Partner Quote

Set to `Yes` only when testing or recording an independent partner quotation. If Plan is Ultimate, the control returns `BLOCK`.

### Special Pricing Applied

Set to `Yes` when non-standard special pricing is proposed.

Where deal registration is required, enter the Deal Registration ID. A missing ID returns `BLOCK`.

### Effective To

- blank: `REVIEW`;
- current/future date: `OK`;
- past date: `BLOCK`.

## 6. Product price bases

### Annual

Subscription or entitlement price.

Monthly equivalent:

```text
MSRP ÷ 12, only when Price Basis is Annual
```

### Per Event

Each chargeable transaction or consumption event. Do not divide by 12.

### Per Pack

MSRP covers the stated Pack Quantity. Always verify the pack size.

### One-Time

Finite service or explicitly one-time commercial item.

## 7. Strategic Opportunity Exception

Up to 40% realized first-year partner margin may be considered only when all conditions are met:

- Strategic Partner;
- new customer;
- registered opportunity;
- Business or Enterprise Plan;
- demonstrated strategic value;
- CSO approval.

Renewal pricing returns to standard unless separately approved.

The workbook does not calculate a Registered Deal Buy Price. Approved deal pricing is handled case by case outside this standard workbook.

## 8. Worksheet guide

| Worksheet | Purpose |
|---|---|
| Workbook Guide | Workbook orientation, source explanation, cautions, and navigation links |
| Price Book | Master SKU review, standard pricing, maintained floor, controls |
| Definitions | Field meaning and ownership |
| Formulas | Commercial formula reference |
| Partner Tiers | Tier ceilings and quotation permissions |
| Special Pricing Matrix | Special-pricing approval rules |
| MSRP Catalog | Product, price basis, MSRP, status, and effective-date inputs |
| Partner Buy Price Matrix | Tier-specific partner buy prices |
| Discount Approval Matrix | Customer-discount authority |
| Price Book History | Version and approval history |
| Price Realization | Row and weighted Finance KPIs |

## 9. Common scenarios

### Standard Business quote

1. Find the Business SKU.
2. Confirm MSRP and price basis.
3. Confirm Target Customer Discount.
4. Review the applicable tier price.
5. Check floor controls.
6. Check discount authority.
7. Confirm no control shows `BLOCK`.

### Missing Commercial Floor Price

1. Leave the floor blank.
2. Treat `REVIEW` as a real governance task.
3. Ask Finance/CSO for the approved floor.
4. Do not use an invented percentage or product cost.

### Strategic first-year exception

1. Confirm the partner is Strategic.
2. Confirm the customer is new.
3. Confirm Business or Enterprise.
4. Confirm deal registration.
5. Obtain CSO approval.
6. Calculate and document deal pricing outside the standard workbook.
7. Record that renewal returns to standard unless separately approved.

### Consumption product

1. Confirm whether pricing is Per Event or Per Pack.
2. If Per Pack, confirm Pack Quantity.
3. Do not annualize or divide by 12.
4. Use expected volume in Price Realization only for weighted analysis.

## 10. Prohibited actions

- Do not overwrite formula cells.
- Do not replace green linked cells with hardcoded values.
- Do not treat zero MSRP as free.
- Do not invent Commercial Floor Prices.
- Do not average Price Realization percentages.
- Do not independently quote Ultimate.
- Do not approve special pricing without authority.
- Do not disclose Partner Buy Prices externally.
- Do not use Customer Sell Price Approval Threshold as a prescribed resale price.
- Do not add duplicate master rows for partner tiers.

## 11. Troubleshooting

### Formulas are blank

Check:

- MSRP is populated;
- the source SKU exists;
- required inputs are populated;
- automatic calculation is enabled.

### Floor controls show REVIEW

Commercial Floor Price is probably blank. Obtain the approved floor or retain the review status.

### Price Realization is blank

Check:

- MSRP is greater than zero;
- Standard Partner Buy Price is calculated;
- Commercial Floor Price exists for floor realization.

### SKU shows a dash for MSRP

The source MSRP is zero or missing. Confirm an approved price. Do not quote it as free.

### A control shows BLOCK

Stop the pricing workflow. Correct the inputs or escalate to the required approver.

### Values do not update

In Excel:

1. set Calculation Options to `Automatic`;
2. select Calculate Now;
3. save the workbook.

## 12. Version and approval process

Before distribution:

1. update `Price Book History`;
2. set the correct version status;
3. populate Approved By and Approval Date;
4. confirm effective dates;
5. verify required controls;
6. save a controlled approved copy;
7. retain prior versions according to repository governance.

## 13. Help and escalation

Use:

- `Definitions` for field meaning;
- `Formulas` for calculation logic;
- `Special Pricing Matrix` and `Discount Approval Matrix` for authority;
- [`technical-documentation.md`](<technical-documentation.md>) for architecture and maintenance;
- Commercial Operations, Finance, or the CSO for unresolved approvals.
