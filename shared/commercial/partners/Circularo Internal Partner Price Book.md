---
schema_version: 1
id: master:partner-management-circularo-internal-partner-price-book
kind: master-document
domain: partnerships
title: "Circularo Internal Partner Price Book"
status: draft
revision: 1
classification: restricted
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "partner-management/Circularo Internal Partner Price Book.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/partner-management/Circularo Internal Partner Price Book.md"
  source_sha256: 57b106d1a97c78ac45eabd391fe05ee63db951d657164274a1bdef4e10573d7c
  legacy_status: draft
  legacy_classification: strictly-internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    title: Circularo Internal Partner Price Book
    type: internal-price-book
    status: draft
    classification: strictly-internal
    audience: Commercial Operations, Sales Leadership, Finance, Product Operations
    owner: CSO
    last_updated: 2026-07-06
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

# Circularo Internal Partner Price Book

## 1. Purpose

This document is the canonical internal commercial specification for Circularo partner pricing. It defines how approved product prices, partner economics, commercial floors, approval thresholds, and price-realization measures must be interpreted.

The maintained SKU-level implementation is the controlled workbook:

- [`pricing-book/Circularo_Internal_Annual_Price_Book.xlsx`](<pricing-book/Circularo_Internal_Annual_Price_Book.xlsx>)

The workbook is an internal Commercial Pricing Engine. It is not:

- a customer quotation;
- a partner-facing price list;
- an accounting ledger;
- evidence that a draft or placeholder price is approved;
- a substitute for an approved Order Form or special-pricing approval.

Despite the workbook filename, not every product is annual. Every SKU must carry an explicit Price Basis.

## 2. Authority and source hierarchy

Use the following hierarchy when maintaining or interpreting the Price Book:

1. Signed Partner Agreement and applicable Order Form for a contracted transaction.
2. [`Circularo Partner Program Policy.md`](<../../playbooks/partners/Circularo Partner Program Policy.md>) for internal program authority.
3. [`Circularo Partner Pricing Strategy Architecture.md`](<Circularo Partner Pricing Strategy Architecture.md>) for the Hybrid+ pricing model.
4. This document for internal price-book interpretation and control rules.
5. The approved version of the generated workbook for operational SKU-level pricing.
6. Odoo for valid product identity and SKU codes, subject to reconciliation with approved commercial sources.

The canonical commercial model and approved product catalogue determine whether a product may be sold and how it is packaged. A product's existence in Odoo does not by itself approve its price, status, eligibility, or commercial treatment.

Where the workbook, Odoo, or another operational system differs from an approved canonical source:

- do not silently choose one value;
- record the discrepancy;
- stop or escalate the affected quotation where the difference is material;
- correct the operational source only after approval.

## 3. Confidentiality and permitted use

This document and the workbook contain confidential Circularo commercial information, including Partner Buy Prices, Commercial Floor Prices, approval controls, and Circularo Price Realization.

They may be used only by authorized internal personnel. Partner-facing materials may include an approved partner's applicable buy prices, but must not expose:

- Commercial Floor Price;
- internal approval thresholds;
- Circularo Price Realization;
- other partners' pricing;
- internal exception logic or approval commentary.

## 4. Hybrid+ pricing layers

Circularo manages five independent pricing layers.

| Layer | Definition | Visibility |
|---|---|---|
| MSRP with Price Basis | Published reference price before customer discount | Public |
| Target Customer Sell Price | Internal expected market price after the Target Customer Discount | Internal |
| Standard Partner Buy Price | Normal confidential price charged to an approved partner | Partner-specific and internal |
| Commercial Floor Price | Lowest partner buy price normally approvable | Strictly internal |
| Registered-Deal Buy Price | Time-limited, scope-specific special price for an approved opportunity | Deal-specific and internal |

Registered-Deal Buy Price is determined case by case outside the standard workbook calculations. It must not be inferred from partner tier, customer discount, a previous transaction, or the Commercial Floor Price.

## 5. Price bases

| Price Basis | Meaning | Treatment |
|---|---|---|
| Annual | Annual subscription or entitlement | May be shown as a monthly equivalent by dividing by 12 |
| Per Event | Each chargeable consumption event | Must not be divided by 12 |
| Per Pack | A stated pack of events or credits | Pack Quantity is mandatory; must not be divided by 12 |
| One-Time | A finite service, implementation, or explicitly one-time item | Must not be annualized |

Subscription entitlements are Annual. Consumption products are Per Event or Per Pack. A blank or ambiguous Price Basis requires review before quotation.

## 6. Standard commercial rules

- Maintain exactly one master `Price Book` row per SKU.
- Generate tier-specific prices only in `Partner Buy Price Matrix`.
- Target Customer Discount is normally 10%.
- A standard margin is a ceiling or planning input, not a guaranteed partner outcome.
- The effective standard margin ceiling is the lower of the partner-tier ceiling and plan ceiling.
- The partner independently determines its final resale price.
- Circularo controls its MSRP, Partner Buy Price, incentives, approvals, and special-price funding.
- A partner customer discount does not automatically reduce Circularo's Partner Buy Price.
- Unknown Commercial Floor Prices remain blank and return `REVIEW`.
- Zero or blank MSRP is not evidence that a product is free.
- Ultimate and self-hosted opportunities are joint Circularo engagements and cannot be independently quoted by a partner.
- Professional services are outside standard partner product margins unless explicitly approved.

## 7. Standard partner and plan ceilings

### Partner-tier ceilings

| Partner Tier | Maximum Standard Realized Margin |
|---|---:|
| Authorized | 15% |
| Advanced | 20% |
| Strategic | 30% |

### Effective plan-by-tier ceilings

| Plan | Authorized | Advanced | Strategic | Independent Partner Quote |
|---|---:|---:|---:|---|
| Start | 10% | 10% | 10% | Permitted |
| Pro | 15% | 15% | 15% | Permitted |
| Business | 15% | 20% | 30% | Permitted |
| Enterprise | 15% | 20% | 30% | Permitted |
| Ultimate / self-hosted | Not applicable | Not applicable | Not applicable | Prohibited; joint engagement only |

These are maximum standard realized-margin guidelines. Actual realized margin depends on Customer Sell Price and Partner Buy Price.

## 8. Customer-discount authority

| Customer Discount from MSRP | Internal treatment |
|---:|---|
| 0–10% | Partner discretion; automatic standard treatment |
| >10–20% | Ordinary commercial band; reported and tracked |
| >20–35% | Registered deal and Special Pricing review required |
| >35–50% | Exceptional strategic or high-volume treatment; CSO approval required |
| >50% | Outside the standard partner program |

These bands govern Circularo review and funding. They do not prescribe or fix the resale price independently selected by the partner.

## 9. Strategic Opportunity Exception

The CSO may approve up to 40% realized partner gross margin for the first year only when all conditions are met:

- the partner is Strategic;
- the opportunity is a new customer;
- the opportunity is registered and active;
- the plan is Business or Enterprise;
- strategic commercial value is documented;
- the Commercial Floor Price and contribution requirements are satisfied;
- the exception and approval are recorded separately from recurring economics.

This exception:

- is case by case;
- sits outside standard workbook calculations;
- does not create a reusable SKU price;
- does not automatically apply to renewals.

## 10. Core fields

| Field | Definition and control |
|---|---|
| Price Book Version | Controlled version identifier. A version is usable only when its status and approvals are complete. |
| SKU | Valid Odoo Internal Reference. A blank or proposed code is not an approved SKU. |
| Product | Approved product, Add-On, consumption item, or service name. |
| Plan | Applicable plan or packaging context. |
| Product Family | Reporting and product-governance grouping. |
| Unit | Commercial unit, such as user/year, organization/year, event, or pack. |
| Price Basis | Annual, Per Event, Per Pack, or One-Time. |
| Pack Quantity | Number of events or credits in a Per Pack SKU; blank otherwise. |
| MSRP | Published reference price for the stated Price Basis before discount. |
| Target Customer Discount | Expected standard customer discount, normally 10%. |
| Target Customer Sell Price | Expected market realization after Target Customer Discount. |
| Standard Partner Buy Price | Default confidential buy price produced from the target sell price and target margin. |
| Commercial Floor Price | Lowest Partner Buy Price normally approvable; manually maintained and never formula-derived. |
| Customer Sell Price Approval Threshold | Internal escalation benchmark derived from Max Customer Discount; not a resale-price restriction. |
| Max Customer Discount | Highest customer discount within the standard internal approval boundary. |
| Target Realized Partner Margin | Expected partner gross margin at Target Customer Sell Price. |
| Standard Circularo Price Realization | Proportion of MSRP retained at Standard Partner Buy Price. |
| Floor Circularo Price Realization | Proportion of MSRP retained at Commercial Floor Price. |
| Standard Approval | Authority applicable to standard pricing. |
| Floor Approval | Authority required for pricing at the Commercial Floor Price. |
| Below Floor | Control indicating whether standard pricing breaches, passes, or lacks a maintained floor. |
| Above Discount Authority | Control indicating whether the proposed customer discount exceeds authority. |
| Above Partner Margin Ceiling | Control indicating whether target margin exceeds applicable tier or plan rules. |
| Low Price Realization | Comparison of standard realization with floor realization. |
| Independent Partner Quote | Indicates whether the partner is expected to quote independently. |
| Ultimate Independent Quote | Blocks independent Ultimate/self-hosted quotation. |
| Special Pricing Applied | Indicates that non-standard pricing is proposed. |
| Deal Registration ID | Accepted opportunity-registration reference required where policy mandates registration. |
| Special Pricing Without Deal Registration | Blocks special pricing when required registration evidence is absent. |
| Effective To | Last date for which the price-book record is valid. |
| Expired Price Book Version | Control for blank or expired validity. |
| Status | Draft, approved, inactive, or other governed lifecycle state. |
| Notes | Source, assumptions, discrepancy, approval, or packaging commentary. |

The workbook `Definitions` sheet remains the detailed operational data dictionary.

## 11. Formulas

### Target Customer Sell Price

```text
MSRP × (1 − Target Customer Discount)
```

### Standard Partner Buy Price

```text
Target Customer Sell Price × (1 − Target Realized Partner Margin)
```

### Customer Discount

```text
(MSRP − Customer Sell Price) ÷ MSRP
```

### Realized Partner Gross Margin

```text
(Customer Sell Price − Partner Buy Price) ÷ Customer Sell Price
```

### Customer Sell Price Approval Threshold

```text
MSRP × (1 − Max Customer Discount)
```

This is an internal approval threshold, not a prescribed resale price.

### Circularo Price Realization

```text
Partner Buy Price ÷ MSRP
```

At standard pricing:

```text
Standard Partner Buy Price ÷ MSRP
```

At the maintained commercial floor:

```text
Commercial Floor Price ÷ MSRP
```

Portfolio realization must be value-weighted:

```text
Total Partner Buy Price Value ÷ Total MSRP Value
```

Never average row-level realization percentages.

## 12. Commercial Floor Price

Commercial Floor Price protects Circularo's minimum acceptable commercial return. It is not:

- product cost;
- automatically calculated from MSRP;
- a guaranteed special price;
- a partner-visible price;
- a minimum resale price imposed on the partner.

The authorized commercial owner maintains it manually. When no approved floor exists:

- leave the field blank;
- retain the resulting `REVIEW`;
- obtain approval before relying on floor-level economics;
- never enter a temporary percentage or invented value to clear the control.

Pricing below the approved floor requires explicit exceptional authority and documented commercial justification. A floor does not override any higher required threshold based on cost, supplier obligations, tax, currency, risk, or applicable law.

## 13. Registered deals and special pricing

Special pricing must be tied to the approved opportunity scope and commercial period. At minimum, record:

- partner;
- end customer;
- Deal Registration ID;
- products, quantities, Price Basis, and term;
- standard and proposed Partner Buy Prices;
- customer commercial context;
- realized partner margin;
- Circularo Price Realization;
- Commercial Floor Price comparison;
- approval authority and evidence;
- effective and expiry dates;
- renewal treatment.

Registered-Deal Buy Prices are time-limited and scope-specific. They do not automatically transfer to another customer, partner, quantity, territory, term, expansion, or renewal.

## 14. Controls and interpretation

| Result | Meaning | Required action |
|---|---|---|
| `OK` | The tested rule passed | Continue with remaining checks |
| `REVIEW` | A maintained input is missing or human judgment is required | Resolve or document owner and reason |
| `BLOCK` | A rule is breached | Stop; correct the input or obtain authorized exception |

Key controls include:

- standard price below Commercial Floor Price;
- target margin above plan or tier ceiling;
- customer discount above authority;
- low Circularo Price Realization;
- independent Ultimate/self-hosted quotation;
- special pricing without required deal registration;
- expired or incomplete price-book validity.

A formula result of `OK` does not by itself constitute approval. Version status, commercial authority, product eligibility, and transaction-specific requirements must also be satisfied.

## 15. Product and SKU governance

- Odoo is authoritative for valid SKU codes.
- Use `SKU to be assigned` when no valid Odoo code exists.
- Do not invent an Internal Reference.
- Preserve one genuine product and consolidate genuine commercial variants through approved packaging rather than duplicate master rows.
- Explicit plan, deployment, region, identity-provider, event, or pack differences may require distinct SKUs when commercially maintained in Odoo.
- Record products missing from Odoo and products with an incorrect Odoo category as discrepancies.
- Add-Ons must be explicitly identified by the canonical commercial model or product-level feature matrix.
- An Odoo product-category mismatch must be noted; it must not silently change canonical product eligibility.

## 16. Versioning and approval

Before an operational price-book version is used:

1. Confirm the approved product and SKU population.
2. Reconcile MSRP, Price Basis, Pack Quantity, and status with the governing sources.
3. Resolve or document every discrepancy.
4. Confirm required Commercial Floor Prices or retain visible `REVIEW` states.
5. Validate formulas and control flags.
6. Update `Price Book History`.
7. Record version status, approver, approval date, and effective dates.
8. Retain the superseded version according to repository governance.

Draft, expired, blank-price, or placeholder records must not be quoted as approved commercial terms.

## 17. Workbook structure

| Worksheet | Purpose |
|---|---|
| Price Book | One master row per SKU, standard calculations, maintained inputs, and controls |
| Definitions | Operational field dictionary and ownership |
| Formulas | Human-readable formula reference |
| Partner Tiers | Tier ceilings, plan ceilings, and quotation permissions |
| Special Pricing Matrix | Special-pricing and strategic-exception rules |
| MSRP Catalog | Product identity, Price Basis, Pack Quantity, MSRP, status, and effective dates |
| Partner Buy Price Matrix | Generated Authorized, Advanced, and Strategic prices |
| Discount Approval Matrix | Customer-discount authority and escalation |
| Price Book History | Version lifecycle and approval register |
| Price Realization | Row-level and weighted internal Finance KPIs |

## 18. Operational ownership

| Area | Primary owner |
|---|---|
| Product identity, packaging, and status | Product Operations |
| Valid SKU / Odoo Internal Reference | Product Operations / Odoo owner |
| MSRP and Price Basis | Commercial Operations with Product and Finance |
| Commercial Floor Price | Authorized commercial owner / Finance / CSO |
| Tier and plan rules | CSO |
| Special pricing and strategic exception | Required commercial approver; CSO where policy requires |
| Workbook generation and structural integrity | Commercial Operations |
| Price Realization reporting | Finance |
| Version approval and effective dates | Authorized commercial approver |

## 19. Prohibited actions

- Do not disclose internal pricing controls externally.
- Do not overwrite formula cells with hardcoded values.
- Do not treat blank or zero MSRP as approved free pricing.
- Do not invent Commercial Floor Prices or SKUs.
- Do not average Price Realization percentages.
- Do not duplicate master rows by partner tier.
- Do not independently quote Ultimate/self-hosted.
- Do not infer Registered-Deal Buy Price from the floor.
- Do not approve special pricing without the required authority and evidence.
- Do not convert Per Event, Per Pack, or One-Time pricing into monthly subscription pricing.
- Do not use Customer Sell Price Approval Threshold as a prescribed resale price.

## 20. Implementation and operating references

- [`pricing-book/README.md`](<pricing-book/README.md>) — package entry point and rebuild instructions
- [`pricing-book/plan.md`](<pricing-book/plan.md>) — approved workbook specification
- [`pricing-book/technical-documentation.md`](<pricing-book/technical-documentation.md>) — implementation, dependencies, formulas, and maintenance
- [`pricing-book/user-manual.md`](<pricing-book/user-manual.md>) — operating workflow and troubleshooting
- [`Circularo Partner Pricing & Special Pricing Guide.md`](<Circularo Partner Pricing & Special Pricing Guide.md>) — partner-facing commercial explanation
