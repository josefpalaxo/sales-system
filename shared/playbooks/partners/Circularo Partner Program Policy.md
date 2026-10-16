---
schema_version: 1
id: master:partner-management-circularo-partner-program-policy
kind: master-document
domain: partnerships
title: "Circularo Partner Program Policy"
status: draft
revision: 1
classification: internal
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
record_role: master
sources:
  - ref: source:sales-repo-canonical
    locator: "partner-management/Circularo Partner Program Policy.md"
relations: {}
spec:
  import_date: 2026-10-14
  source_path: "sales-repo/canonical/partner-management/Circularo Partner Program Policy.md"
  source_sha256: 5510e26aaeb0b55267196d13223f181ffe792ec71a8ffa033aa75b15ca21c064
  legacy_status: draft
  legacy_classification: internal
  review_scope: migration integrity and metadata only; content approval remains as qualified below
  legacy_frontmatter: |
    title: Circularo Partner Program Policy
    status: draft
    classification: internal
    audience: internal
    owner: CSO
    scope: SaaS resellers and Master Distributors
    last_updated: 2026-07-06
---

> Imported draft: retained for internal review. Statements about approval, canonical policy, prices, and external audiences in the inherited text do not establish current approval or permission to share.

# Circularo Partner Program Policy

## 1. Purpose and authority

This policy defines the commercial and operating rules for Circularo's SaaS reseller and Master Distributor program.

This document is the authoritative internal summary of the partner model. The signed Partner Agreement, applicable Order Form, and applicable law prevail over this policy. Partner-facing guides explain this policy but do not replace it.

Where this policy conflicts with older working papers, this policy prevails once approved.

## 2. Key assumptions and limits

| Area | Policy |
| --- | --- |
| Partner types | Reseller and Master Distributor |
| Partner tiers | Authorized, Advanced, Strategic |
| Commercial model | Public customer list price plus confidential tier-based partner buy price and registered-deal special pricing |
| Contracting | Partner normally contracts with and invoices the end customer |
| Payment risk | Circularo must be paid by the partner regardless of whether the partner collects from the customer |
| Currency and tax | USD, excluding tax for the initial SaaS program; Price Basis is Annual, Per Event, Per Pack, or One-Time; regional variations TBD |
| Normal customer discount | Up to 20% from list as the ordinary commercial band |
| Exceptional customer discount | Up to 50% for approved high-volume or strategic opportunities |
| Typical realized partner gross margin | Approximately 20% after customer discount |
| Recurring gross-margin ceiling | Lower of the partner-tier ceiling and plan ceiling; never more than 30% under standard pricing |
| Start plan ceiling | 10% realized partner gross margin |
| Pro plan ceiling | 15% realized partner gross margin |
| Business/Enterprise ceiling | 30% realized partner gross margin |
| First-year exception | Up to 40% realized gross margin only for CSO-approved Strategic Business/Enterprise new-logo deals |
| Renewal economics | Earned only when the partner actively manages adoption, support coordination, and renewal |
| Vendor-managed renewal | May carry reduced or 0% renewal margin |
| Deal registration | First complete accepted registration receives protection for up to six months |
| Best-price protection | Registered partner receives the best Circularo-funded price/discount relative to later partners for materially comparable scope during the protection period |
| Direct channel | Circularo should not undercut an active registered partner on materially comparable scope and terms |
| Professional services | Excluded from standard partner product margins |
| Included product categories | SaaS subscriptions, eligible add-ons, consumption services, trust services, certificates, and storage |
| Legal principle | Partner sets its customer resale price independently; Circularo controls its own list price, buy price, incentives, and special-price funding |

## 3. Program scope

### Reseller

A Reseller:

- Buys eligible Circularo subscriptions and add-ons.
- Contracts with and invoices the end customer.
- Determines the final customer price.
- Manages the sales process.
- Coordinates onboarding, adoption, first-line support, and renewal as agreed.
- Reports required end-customer and sell-through data.
- Pays Circularo under the agreed payment terms regardless of customer collection.

### Master Distributor

A Master Distributor:

- Performs the reseller responsibilities where selling directly.
- May supply and manage authorized downstream resellers.
- May provide local billing, credit, enablement, aggregation, and first-line operational support.
- Must disclose the downstream reseller and end customer.
- Receives an Authorized, Advanced, or Strategic tier.
- Must manage total channel economics within the approved deal envelope.

Master Distributor is a partner type, not a fourth tier.

## 4. Partner tiers

| Tier | Indicative recurring economics | Expected behavior |
| --- | --- | --- |
| Authorized | 10–15% | Product training, active pipeline, accurate reporting, basic customer management |
| Advanced | 15–20% | Certified capability, consistent revenue, deal registration discipline, adoption and renewal management |
| Strategic | 20–30% | Highest volume, joint planning, forecasting, customer success, support capability, and renewal ownership |

The ranges describe potential realized recurring partner gross margin, not automatic discounts from list price.

Exact revenue thresholds, certification requirements, review periods, and benefit levels are `TBD`.

Tier assignment and continuation depend on:

- Revenue and growth
- Pipeline quality
- Certifications and enablement
- Forecast accuracy
- Customer adoption and satisfaction
- Renewal performance
- Payment performance
- Reporting compliance
- Program and contract compliance

## 5. Margin ceilings

### Realized gross margin

`Partner Gross Margin % = (Customer Sell Price − Partner Buy Price) ÷ Customer Sell Price`

Margin must be calculated after the partner's customer discount.

### Effective recurring ceiling

The maximum realized recurring margin is the lower of:

1. The partner's approved tier ceiling; and
2. The selected plan ceiling.

Examples:

- Strategic + Start: maximum 10%
- Strategic + Pro: maximum 15%
- Advanced + Business: maximum 20%
- Strategic + Business or Enterprise: maximum 30%

The ceiling is not a guaranteed margin. Circularo is not required to reduce its buy price to preserve the ceiling after a partner discounts the customer.

### First-year exception

The CSO may approve up to 40% realized first-year gross margin only when all conditions apply:

- Strategic partner
- Business or Enterprise
- New-logo opportunity
- Registered and active deal
- Commercial justification documented
- Circularo Commercial Floor Price and contribution requirements satisfied
- One-time treatment recorded separately from recurring economics

The exception does not automatically carry into renewal.

This exception is case by case, sits outside standard price-book calculations, and requires explicit CSO approval.

## 6. Pricing architecture

Circularo uses the Hybrid+ pricing architecture with five layers:

1. **MSRP with Price Basis** — recommended/reference customer price.
2. **Target Customer Sell Price** — internal expected market realization after target customer discount.
3. **Standard Partner Buy Price** — confidential tier-based price.
4. **Commercial Floor Price** — internal minimum normally approved partner buy price.
5. **Registered-Deal Buy Price** — approved special price for one registered opportunity.

Every MSRP uses one explicit Price Basis:

| Price Basis | Meaning |
| --- | --- |
| Annual | Annual subscription or entitlement |
| Per Event | Each chargeable consumption event |
| Per Pack | A stated pack of events or credits |
| One-Time | A finite service or explicitly one-time item |

Monthly equivalents may be derived only from Annual prices. Per Event, Per Pack, and One-Time prices must not be divided by 12.

Commercial Floor Price:

- is manually maintained by the authorized commercial owner;
- is not a product cost;
- must remain blank when unknown;
- must never be replaced by an invented placeholder merely to clear a control.

Registered-Deal Buy Prices are determined case by case outside standard workbook calculations. They are time-limited, scope-specific, and do not automatically apply to renewals.

Circularo uses a **Customer Sell Price Approval Threshold** as an internal approval and escalation benchmark:

`MSRP × (1 − Maximum Customer Discount)`

This threshold does not prescribe, fix, or contractually restrict the partner's independently determined resale price.

Circularo Price Realization measures how much MSRP Circularo retains:

`Partner Buy Price ÷ MSRP`

Portfolio Price Realization must be value-weighted:

`Total Partner Buy Price Value ÷ Total MSRP Value`

Row-level realization percentages must not be averaged.

The partner independently determines its customer sell price.

Circularo may decline to fund a customer discount or special price that does not meet vendor economics, program rules, or legal requirements.

The canonical pricing workbook, generator, technical documentation, and end-user manual are maintained under [`pricing-book/`](<../../commercial/partners/pricing-book>).

## 7. Customer-discount bands

| Customer discount from list | Circularo treatment |
| ---: | --- |
| 0–10% | Normal partner discretion |
| >10–20% | Ordinary commercial band; tracked |
| >20–35% | Registered deal and special-pricing review |
| >35–50% | Exceptional high-volume or strategic opportunity; CSO approval |
| >50% | Outside standard policy |

These bands govern Circularo funding and review. They do not establish a mandatory resale price where such a restriction would be unlawful.

The partner may reduce its own margin without requiring Circularo to reduce the partner buy price.

## 8. Deal registration

### Eligibility

A registration must include:

- Partner
- End customer
- Opportunity and business problem
- Expected products and scope
- Expected value and quantity
- Expected close date
- Partner activities already completed
- Next steps

### Priority

The first complete registration accepted by Circularo receives protection.

Submission time alone does not create protection. The registration must be sufficiently complete, credible, and accepted.

### Protection

Protection lasts for a maximum of six months.

During the active period, the registered partner receives:

- Opportunity protection for the registered scope
- The best Circularo-funded buy price or discount relative to any later partner pursuing materially comparable scope
- Protection from Circularo direct sales undercutting its materially comparable customer offer

Comparable scope considers quantity, term, payment timing, support, currency, country, risk, and included services.

### Review and cancellation

Circularo may review, amend, suspend, or cancel registration when:

- The partner does not demonstrate progress
- Information is inaccurate or incomplete
- The scope materially changes
- The customer requests another route
- The partner is not in good standing
- Payment or compliance issues arise
- The opportunity becomes dormant
- Law, procurement rules, or operational requirements require another route

If Circularo must transact directly, approved partner protection may be preserved through a fee, rebate, subcontracted role, or another documented arrangement.

## 9. Renewals and expansions

Recurring economics are earned through recurring work.

To retain renewal margin, the partner must:

- Maintain the customer relationship
- Support adoption and usage
- Coordinate first-line support
- Forecast renewal
- Keep opportunity and account data current
- Lead or materially support the renewal
- Remain in good standing
- Pay Circularo on time

If Circularo assumes customer management and renewal responsibility, partner renewal margin may be reduced or set to 0%.

Expansion follows the same plan, tier, registration, and margin rules as a new order unless contractually agreed otherwise.

## 10. Products and services

The partner model applies initially to:

- SaaS subscriptions
- Eligible feature add-ons
- Consumption-based add-ons
- Trust and identity services
- Certificates
- Storage

Each product must state whether pricing is Annual, Per Event, Per Pack, or One-Time.

Circularo may introduce category-specific ceilings where third-party cost, region, risk, or supplier terms justify them.

Circularo professional services are excluded from standard partner discounts and margins. They require a separate statement of work or commercial approval.

## 11. Distributor economics

When a Master Distributor and downstream Reseller participate:

- The total channel economics must remain inside one approved envelope.
- The distributor and reseller must not each receive the full plan or tier ceiling.
- The end customer and downstream reseller must be disclosed.
- Allocation should reflect credit, billing, enablement, support, adoption, and renewal responsibilities.
- The approved split must be recorded.

Exact distributor allocation rules are `TBD`.

## 12. Payment and credit

- Circularo invoices the partner according to the Order Form.
- Partner payment is not conditional on end-customer payment.
- Credit limits and payment terms are assigned by Circularo.
- Orders over the credit limit may require prepayment or approval.
- Overdue accounts may lose access to new orders, deal protection, rebates, incentives, or renewals.
- Credit limits, standard payment terms, and regional exceptions are `TBD`.

## 13. Approval authority

The CSO approves:

- Customer discounts above 35% and up to 50%
- First-year realized margin above the normal ceiling and up to 40%
- Exceptional registered-deal buy prices
- Material direct-channel exceptions
- Deviations from standard tier economics

Operational delegations and monetary thresholds are `TBD`.

No approval may override applicable law, signed contractual terms, or the 40% first-year ceiling without a formal policy amendment.

## 14. Legal and contractual controls

- The signed Partner Agreement and Order Form prevail.
- Partners determine their resale prices independently.
- Recommended prices and discount bands must be reviewed for each region.
- Minimum resale or advertised-price restrictions must not be used without legal approval.
- Initial priority regions are Middle East, EU, and USA.
- Country-specific legal and tax addenda are `TBD`.

## 15. Reporting and audit

Partners must provide:

- End-customer identity
- Customer sell price
- Customer discount from list
- Products and quantities
- Contract term
- Registration ID
- Renewal owner
- Distributor/downstream reseller where applicable

Circularo tracks:

- List price
- Price Basis and Pack Quantity where applicable
- Partner buy price
- Commercial Floor Price
- Customer Sell Price Approval Threshold
- Customer sell price
- Realized partner gross margin
- Circularo price realization
- Weighted portfolio price realization
- Discount approvals
- Deal-registration status
- Renewal performance
- Payment performance

Reporting cadence and systems are `TBD`.

## 16. Policy lifecycle

- Status: draft
- Effective date: `TBD`
- Review cycle: `TBD`
- Owner: CSO
- Legal review: required before external launch
- Finance review: required before price-book activation
- Canonical pricing implementation: [`pricing-book/`](<../../commercial/partners/pricing-book>)
