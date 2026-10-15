---
schema_version: 1
id: master:sales-hub
kind: master-document
domain: shared
title: "Sales Hub"
status: draft
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "Sales Hub.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/Sales Hub.md"
  source_sha256: 044948b26307e45814e10793b0a5e5326676d0bee13395e6b1e3ac66564f1721
  legacy_status: draft
  legacy_classification: internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    title: Sales Hub
    status: draft
    classification: internal
    audience: internal
    scope: Circularo sales guidelines, partner management references, and enablement
    last_updated: 2026-07-06
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

# Sales Hub

Use this hub to find the correct document for each audience and task. Internal documents may contain confidential policy, pricing, approval, and operating information and must not be shared with partners or customers.

## Hub Sections

| Section | Purpose | Use |
| --- | --- | --- |
| [Sales Guidelines](<sales-guidelines/README.md>) | Landing page for positioning, SaaS selling motion, API commercial guidance, and sovereign trust positioning. | Internal sales guidance |
| [Partner Management](<../../domains/partnerships/master-documents/partner-management/README.md>) | Canonical index for partner-program policy, operations, pricing governance, partner guidance, and the internal pricing workbook. | Internal sales and partner operations |

## Circularo Sales Guidelines

Use these documents for the core sales narrative, SaaS selling motion, API commercial guidance, and sovereign trust positioning.

| Document | Purpose | Use |
| --- | --- | --- |
| [Circularo Positioning Framework](<sales-guidelines/Circularo Positioning Framework.md>) | Primary positioning narrative for Circularo as a Digital Trust Platform and the two core sales motions. | Internal sales guidance |
| [Selling Circularo SaaS](<sales-guidelines/Selling Circularo  SaaS.md>) | Core SaaS sales motion covering solution-led selling, licensing rules, trust services, storage, support, and decision paths. | Internal sales guidance |
| [Selling Sovereign Trust Solutions](<sales-guidelines/Selling Sovereign Trust Solutions.md>) | Sales guide for sovereign trust deployments, shared services, and controlled infrastructure offers. | Internal sales guidance |
| [Selling API Plans](<sales-guidelines/Selling Circularo API Plans.md>) | API selling guide explaining how to position API access as an add-on across subscription models. | Internal sales guidance |
| [API Licensing Principles](<sales-guidelines/API Licensing Principles.md>) | Licensing rules that define API integration access versus trust-service consumption. | Internal commercial guidance |
| [API Pricing Recommendations](<sales-guidelines/API Pricing Recommendations.md>) | Recommended commercial structure for API access, trust-service transactions, and volume pricing. | Internal commercial guidance |


## Partner Management Guidelines

All partner-management content now lives in `partner-management/`.

Use those documents for partner-program policy, operations, pricing governance, deal registration, partner enablement, and the internal pricing workbook.

Start with the [Partner Management index](<../../domains/partnerships/master-documents/partner-management/README.md>) when choosing a document for a specific task.

### Internal governance

| Document | Purpose | Use |
| --- | --- | --- |
| [Circularo Partner Program Policy](<../../domains/partnerships/master-documents/partner-management/Circularo Partner Program Policy.md>) | Authoritative internal policy for partner types, tiers, pricing architecture, margin ceilings, deal registration, renewals, payment obligations, approvals, and governance. | **Internal only — confidential** |
| [Circularo Partner Program Operations Guide](<../../domains/partnerships/master-documents/partner-management/Circularo Partner Program Operations Guide.md>) | Internal procedures for onboarding, tier administration, special pricing, registration conflicts, renewals, credit controls, reporting, and audit trails. | **Internal only — confidential** |
| [Circularo Partner Pricing Strategy Architecture](<../../domains/partnerships/master-documents/partner-management/Circularo Partner Pricing Strategy Architecture.md>) | Hybrid+ pricing architecture, commercial layers, internal controls, partner-tier ceilings, and Circularo Price Realization. | **Internal only — confidential** |
| [Circularo Internal Partner Price Book](<../../domains/partnerships/master-documents/partner-management/Circularo Internal Partner Price Book.md>) | Canonical internal interpretation of price-book fields, formulas, Commercial Floor Price, approval controls, SKU governance, and versioning. | **Internal only — strictly confidential** |
| [Internal Price Book End-User Manual](<../../domains/partnerships/master-documents/partner-management/pricing-book/user-manual.md>) | Operating workflow for the internal pricing workbook, including maintained inputs, controls, scenarios, troubleshooting, and approval. | **Internal only — confidential** |

### Partner-facing guidance

| Document | Purpose | Use |
| --- | --- | --- |
| [Circularo Partner Program Guide](<../../domains/partnerships/master-documents/partner-management/Circularo Partner Program Guide.md>) | Concise partner-facing overview of the program, partner types, tiers, eligible offers, responsibilities, benefits, renewals, and payment expectations. | **External — approved partners** |
| [Circularo Partner Pricing & Special Pricing Guide](<../../domains/partnerships/master-documents/partner-management/Circularo Partner Pricing & Special Pricing Guide.md>) | Confidential guidance for MSRP, Partner Buy Price, realized margin, customer discounts, tier and plan ceilings, and special pricing. | **Confidential — approved partners** |
| [Circularo Partner Deal Registration Guide](<../../domains/partnerships/master-documents/partner-management/Circularo Partner Deal Registration Guide.md>) | Confidential process for deal registration, opportunity protection, maintenance, cancellation, special-pricing requests, and joint engagement. | **Confidential — approved partners** |
| [Circularo Partner Program FAQ](<../../domains/partnerships/master-documents/partner-management/Circularo Partner Program FAQ.md>) | Plain-language answers to common partner questions about tiers, pricing, margins, registration, renewals, products, reporting, and distributors. | **External — approved partners** |
| [Selling Circularo SaaS as a Partner](<../../domains/partnerships/master-documents/partner-management/Selling Circularo SaaS as a Partner.md>) | Practical playbook for discovering customer needs, selecting a SaaS plan and subscription model, applying quoting limits, choosing Add-Ons, and identifying opportunities that require Circularo engagement. | **External — approved partners** |

### Partner price lists

| Document | Purpose | Use |
| --- | --- | --- |
| [Circularo SaaS Partner Price List](<../../domains/partnerships/master-documents/partner-management/partner-facing-price-list-saas.csv>) | Partner-ready SaaS plan and variant pricing, including annual billing units and transaction allowances. | **External — approved partners; confidential commercial guidance** |
| [Circularo SaaS Add-On Price List](<../../domains/partnerships/master-documents/partner-management/partner-facing-addon-pricelist-saas.csv>) | Partner-ready pricing for approved SaaS Add-Ons and their billing units. | **External — approved partners; confidential commercial guidance** |

### Document precedence

1. Signed Partner Agreement, applicable Order Form, and applicable law
2. Circularo Partner Program Policy
3. Circularo Partner Pricing Strategy Architecture
4. Circularo Internal Partner Price Book
5. Circularo Partner Program Operations Guide
6. Approved operational price-book version
7. Partner-facing guides and FAQ

Partner-facing documents explain the program but do not override signed terms, internal policy, or approved transaction-specific decisions. Internal Commercial Floor Prices, approval thresholds, Circularo Price Realization, and other partners' pricing must never be shared externally.

## Future Sales Hub Sections

Add future artifact groups here as they are approved, for example:

- Training and certification
- Deal-registration forms
- Customer-facing collateral
- Regional program addenda
- Legal and commercial templates
