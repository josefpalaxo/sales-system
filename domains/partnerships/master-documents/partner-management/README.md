---
schema_version: 1
id: master:partner-management-readme
kind: master-document
domain: partnerships
title: "Partner Management"
status: draft
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "partner-management/README.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/partner-management/README.md"
  source_sha256: 29f1eaf1cf64dc7dc3289f8bbdacf8a6a391ec7944cb6e82dc6a53b5f524228d
  legacy_status: draft
  legacy_classification: internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    title: Partner Management
    status: draft
    classification: internal
    audience: internal
    scope: Circularo partner-program policy, operations, pricing governance, partner guidance, and internal price-book materials
    last_updated: 2026-07-06
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

# Partner Management

This folder is the canonical knowledge base for Circularo's SaaS Reseller and Master Distributor program. It contains the internal policy and operating model, confidential partner guidance, external enablement material, and the reproducible internal pricing workbook.

The working quotation calculator lives in `../../wip/qtn-calculator/` (legacy reference: `../../wip/qtn-calculator/`; dependency not migrated) and is not canonical policy or approved commercial source material.

## Start here

| Need | Start with | Then use |
|---|---|---|
| Understand the authoritative internal program rules | [Circularo Partner Program Policy](<Circularo Partner Program Policy.md>) | Operations Guide and relevant specialist guide |
| Administer partners, approvals, registrations, renewals, or disputes | [Circularo Partner Program Operations Guide](<Circularo Partner Program Operations Guide.md>) | Policy, Internal Partner Price Book, and Deal Registration Guide |
| Understand the pricing model and design rationale | [Circularo Partner Pricing Strategy Architecture](<Circularo Partner Pricing Strategy Architecture.md>) | Internal Partner Price Book and pricing workbook package |
| Maintain or interpret internal SKU-level pricing | [Circularo Internal Partner Price Book](<Circularo Internal Partner Price Book.md>) | [`pricing-book/`](<pricing-book/>) |
| Give a partner the overall program explanation | [Circularo Partner Program Guide](<Circularo Partner Program Guide.md>) | FAQ and specialist partner guides |
| Explain partner pricing and special pricing | [Circularo Partner Pricing & Special Pricing Guide](<Circularo Partner Pricing & Special Pricing Guide.md>) | [Circularo Partner Deal Registration Guide](<Circularo Partner Deal Registration Guide.md>) |
| Understand deal registration, opportunity protection, and special-pricing request requirements | [Circularo Partner Deal Registration Guide](<Circularo Partner Deal Registration Guide.md>) | [Circularo Partner Pricing & Special Pricing Guide](<Circularo Partner Pricing & Special Pricing Guide.md>) |
| Answer a common partner question | [Circularo Partner Program FAQ](<Circularo Partner Program FAQ.md>) | The relevant detailed guide |
| Discover, configure, and quote Circularo SaaS | [Circularo SaaS Partner Sales Catalog](<Circularo SaaS Partner Sales Catalog.md>) | [Selling Circularo SaaS as a Partner](<Selling Circularo SaaS as a Partner.md>), Program Guide, and pricing guide |

## Authority and precedence

For a contracted transaction, the signed Partner Agreement, applicable Order Form, and applicable law prevail.

For internal program administration, use this order:

1. [Circularo Partner Program Policy](<Circularo Partner Program Policy.md>) — authoritative internal summary of the partner model.
2. [Circularo Partner Pricing Strategy Architecture](<Circularo Partner Pricing Strategy Architecture.md>) — approved Hybrid+ pricing architecture and design.
3. [Circularo Internal Partner Price Book](<Circularo Internal Partner Price Book.md>) — canonical interpretation of internal price-book fields and controls.
4. [Circularo Partner Program Operations Guide](<Circularo Partner Program Operations Guide.md>) — internal execution procedures.
5. The approved pricing-workbook version — operational SKU-level implementation.

Partner-facing guides explain the model but do not override internal policy, signed terms, or approved transaction-specific decisions.

## Internal governance documents

| Document | Purpose | Audience |
|---|---|---|
| [Circularo Partner Program Policy](<Circularo Partner Program Policy.md>) | Authoritative internal rules for partner types, tiers, pricing, margin ceilings, deal registration, renewals, distributor economics, payment, approvals, legal controls, and reporting. | Internal |
| [Circularo Partner Program Operations Guide](<Circularo Partner Program Operations Guide.md>) | Procedures for onboarding, tier administration, quote controls, special pricing, registration conflicts, renewals, credit, reporting, audit, and launch readiness. | Internal |
| [Circularo Partner Pricing Strategy Architecture](<Circularo Partner Pricing Strategy Architecture.md>) | Rationale and specification for the five-layer Hybrid+ pricing architecture, Commercial Pricing Engine, and Circularo Price Realization. | Executive Management, Sales, Finance, Product |
| [Circularo Internal Partner Price Book](<Circularo Internal Partner Price Book.md>) | Canonical internal specification for price bases, partner and plan ceilings, formulas, Commercial Floor Price, approval controls, SKU governance, versioning, and workbook interpretation. | Authorized internal users only |

Internal pricing information—including Commercial Floor Price, internal approval thresholds, Circularo Price Realization, and other partners' pricing—must not be disclosed externally.

## Partner-facing documents

| Document | Purpose | Classification and use |
|---|---|---|
| [Circularo Partner Program Guide](<Circularo Partner Program Guide.md>) | Concise overview of partner types, tiers, eligible offers, economics, registration, renewals, payment, responsibilities, and Circularo commitments. | External; approved partners |
| [Circularo Partner Program FAQ](<Circularo Partner Program FAQ.md>) | Plain-language answers on tiers, pricing, margin, price bases, registration, renewals, products, API Add-Ons, trust services, quoting, reporting, and distributors. | External; approved partners |
| [Circularo Partner Pricing & Special Pricing Guide](<Circularo Partner Pricing & Special Pricing Guide.md>) | Confidential explanation of MSRP, Partner Buy Price, customer discount, realized margin, tier and plan ceilings, approval bands, and special pricing. | Confidential; approved partners |
| [Circularo Partner Deal Registration Guide](<Circularo Partner Deal Registration Guide.md>) | Confidential process for registration requirements, acceptance, protection, maintenance, cancellation, special-pricing requests, and joint engagement. | Confidential; approved partners |
| [Circularo SaaS Partner Sales Catalog](<Circularo SaaS Partner Sales Catalog.md>) | Partner-facing SaaS catalog for Start, Pro, Business, Enterprise, subscription variants, Add-Ons, customer list prices, and quote guardrails. | External; approved partners |
| [Selling Circularo SaaS as a Partner](<Selling Circularo SaaS as a Partner.md>) | Practical discovery, plan and subscription-model selection, quoting limits, Add-On selection, commercial guardrails, and escalation scenarios. | External; approved partners |

Do not send the internal policy, operations guide, pricing architecture, internal price book, workbook, generator, or internal workbook documentation to partners.

## Internal pricing workbook

The [`pricing-book/`](<pricing-book/>) package implements the internal Commercial Pricing Engine. Its workbook contains one master row per SKU, generates tier-specific partner prices, keeps unknown Commercial Floor Prices blank for review, and reports value-weighted Circularo Price Realization.

| File | Purpose |
|---|---|
| [`pricing-book/README.md`](<pricing-book/README.md>) | Package entry point, file map, rebuild command, and core operating rules |
| [`pricing-book/plan.md`](<pricing-book/plan.md>) | Approved functional specification, worksheet definitions, formulas, controls, and validation requirements |
| [`pricing-book/technical-documentation.md`](<pricing-book/technical-documentation.md>) | Architecture, dependencies, data flow, worksheet reference, formulas, controls, extension procedure, limitations, and future integration |
| [`pricing-book/user-manual.md`](<pricing-book/user-manual.md>) | End-user workflow, maintained inputs, scenarios, prohibited actions, troubleshooting, and version approval |
| [`pricing-book/lessons-learned.md`](<pricing-book/lessons-learned.md>) | Implemented decisions, conventions, QA results, and future improvements |
| [`pricing-book/Circularo_Internal_Annual_Price_Book.xlsx`](<pricing-book/Circularo_Internal_Annual_Price_Book.xlsx>) | Generated internal workbook; not partner-facing |
| [`pricing-book/build_price_book.py`](<pricing-book/build_price_book.py>) | Deterministic `openpyxl` generator and structural validator |

Permanent workbook changes must be made in the specification and generator, followed by a rebuild and validation. Manual edits made only in the generated workbook may be overwritten.

## Shared commercial rules

The documents in this folder use these common rules:

- Partner types are Reseller and Master Distributor.
- Partner tiers are Authorized, Advanced, and Strategic.
- Standard tier margin ceilings are 15%, 20%, and 30%, respectively.
- Plan ceilings are Start 10%, Pro 15%, Business 30%, and Enterprise 30%; the lower tier or plan ceiling applies.
- A Strategic Business or Enterprise new-customer opportunity may receive up to 40% realized first-year margin only as a registered, case-by-case CSO-approved exception.
- Ultimate and self-hosted opportunities require joint Circularo engagement and cannot be independently quoted by partners.
- Price Basis is Annual, Per Event, Per Pack, or One-Time. Only Annual prices may be divided by 12 for a monthly equivalent.
- Partners determine their final resale price independently.
- Registered-deal pricing is scope-specific, time-limited, and determined case by case outside standard workbook calculations.
- Customer-discount approval does not automatically increase partner margin.
- Professional services are outside standard partner product margins unless separately approved.

## Draft status and known limitations

All documents in this folder currently have draft status, either explicitly in metadata or by package context. Before external launch:

- complete legal and Finance review;
- approve regional, tax, currency, competition-law, and contractual variations;
- resolve remaining `TBD` thresholds, owners, service levels, review cycles, and retention periods;
- replace illustrative workbook MSRP values with approved catalogue data;
- approve and maintain Commercial Floor Prices;
- reconcile the governed product and SKU catalogue with Odoo;
- approve a price-book version with effective dates and approval evidence;
- complete final editorial and metadata review of partner-facing documents.

Draft, placeholder, zero, blank, expired, or unapproved pricing must not be treated as commercially approved.
