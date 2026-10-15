---
id: signfide:wholesale-pricing
title: "Circularo–SignFide wholesale buy-price model"
kind: pricing-model
status: draft
owner: unassigned
updated: "2026-10-14"
classification: confidential
modeling_status: "approved for financial modeling"
modeling_approved_by: "Josef"
modeling_approved_on: "2026-10-14"
sources:
  - "../DECISIONS.md"
  - "../company/operating-model-options.md"
  - "../operations/README.md"
---

# Circularo–SignFide wholesale buy-price model

## Fixed wholesale buy-price principle

SignFide purchases Circularo SaaS subscriptions and applicable usage/add-ons at **agreed fixed wholesale buy prices**. Circularo's charge is independent of SignFide's customer list prices, discounts, bundles or actual selling prices. SignFide calculates its sales economics from its buy price rather than deriving its buy price from a discount on retail.

Josef has confirmed this internal commercial direction. Actual buy prices, cost allocations, service remuneration, technology/IP remuneration and contractual/tax treatment remain to be agreed. This is the owning working methodology; executed Schedule A of the [distribution/services agreement](../company/circularo-distribution-agreement.md) will govern the agreed contractual prices.

| Economic layer | Responsibility | Meaning |
| --- | --- | --- |
| Circularo delivery cost | Circularo | Defined actual/allocated cost of supplying the agreed service |
| SignFide buy price | Circularo → SignFide | Agreed confidential wholesale unit price |
| SignFide selling price | SignFide → customer or approved partner | Independently determined commercial price for that route |

“Fixed” refers to the agreed unit price over its stated validity period. Total charges can vary with billable quantities, usage, add-ons and separately agreed scope. It does not mean an unlimited flat invoice or a perpetual price freeze.

## Working assumption and approval

**Working assumption:** 20% markup on the agreed delivery cost base, plus appropriate technology/IP remuneration.

**Status:** Approved for financial modeling; final wholesale prices and transfer-pricing methodology pending validation. Josef approved this scope on 2026-10-14; see SF-D-012 in [DECISIONS](../DECISIONS.md#sf-d-012-wholesale-financial-modeling-assumption). This replaces the earlier illustrative markup assumption.

**Modeled buy price = agreed delivery cost base × 1.20 + technology/IP remuneration.**

Financial-modeling approval does not establish an accepted transfer-pricing method. A markup on hosting/support alone should not be assumed to remunerate the underlying software IP. Deliver one consolidated wholesale price to SignFide rather than requiring it to administer each internal cost component as a separate charge.

### Cost base to define

Consider direct hosting/infrastructure, applicable third-party software/trust services, customer-specific operations, L2/L3 support and payment-related costs actually borne by Circularo. Consider appropriate allocation of platform maintenance, security/compliance, DevOps and relevant shared operational expenses.

Agree cost pools, allocation drivers, capacity/volume assumptions, the markup-eligible base, included standard service and separately charged work. Keep Circularo's costs separate from SignFide's own Stripe/bank costs, sales/marketing, L1 and other US operating expenses. Avoid double counting shared costs or charging included hosting/support again. Account for technology remuneration explicitly without duplicating costs already included in another component.

### Illustrative scenario only

The example retains Josef's illustrative annual cost, technology/IP amount and selling revenue for one subscription, with the markup updated to the approved financial-modeling assumption. The remaining amounts are not actual Circularo costs, an approved price list, or a committed margin.

| Component | Illustrative annual amount |
| --- | --- |
| Platform delivery cost | USD 100 |
| Service markup, 20% modeling assumption on that example cost base | USD 20 |
| Technology/IP remuneration | USD 35 |
| Consolidated SignFide buy price | USD 155 |
| SignFide net direct selling revenue | USD 300 |
| Selling revenue less buy price | USD 145 |
| Spread as a share of selling revenue, rounded | 48.3% |

The spread must also finance relevant payment, sales, acquisition, L1, onboarding and operating costs. It is not a guarantee of accounting gross profit, contribution margin or net profit. Determine accounting classifications with finance. The markup is approved for modeling only; the illustrated technology/IP amount and final contractual prices remain unapproved.

## Direct and channel economics

Use net selling revenue after customer discounts/refunds and excluding collected sales taxes. Use matching scope, quantities and periods for buy and selling prices.

| Route | SignFide calculation before other costs |
| --- | --- |
| Direct customer sale | Net customer selling revenue − Circularo buy cost |
| Sale to approved distributor/reseller | Net partner purchase revenue received by SignFide − Circularo buy cost |
| Partner's onward sale | Partner's own net resale revenue − its buy cost from SignFide or its supplying distributor |

SignFide chooses its own retail/partner selling prices and discount policies through its authorized governance. Its discount does not automatically reduce Circularo's agreed buy price. For a channel sale, use SignFide's actual wholesale receipt from the partner, not the final customer's retail price, when calculating SignFide's spread. Partner margins, commissions and onward pricing rights need their own agreement; none is set here.

Circularo's supplier invoice/payment obligations follow the agreed billable units and payment terms. Do not assume that delayed collection from a customer or partner cancels the upstream buy-price obligation. Agree trials/free accounts, activation/stop dates, partial periods, credits/refunds and non-payment treatment explicitly.

## Proposed administration and price review

1. Maintain a confidential wholesale schedule for Start, Pro, Business, Enterprise, relevant API usage and add-ons, with defined licensing/provisioning units.
2. SignFide develops customer-facing plans, bundles and channel prices independently using this buy-cost baseline.
3. Configure the agreed supplier buy prices and corresponding SignFide sales items in the existing multi-company Odoo environment. Odoo owns financial subscriptions/invoices; Circularo owns entitlements and usage; [Operations](../operations/README.md#business-data-ownership) owns the integration boundaries.
4. The draft proposes monthly Circularo billing from agreed active paid subscriptions and applicable usage. Define what “active paid” means, the billable trigger, usage source, invoice cutoffs and payment terms before adopting it. Monthly invoicing does not itself change the unit price or create a cash-collected-only supplier obligation.
5. The draft proposes annual price reviews using actual cost information and agreed principles. Define notice, approval, effective dates and existing-subscription protection. Review is not automatic unilateral or retroactive repricing; existing customer commitments need agreed treatment.
6. Exceptional enterprise/deal-specific buy prices can be agreed expressly; a SignFide retail discount alone is not a supplier-price exception.

Actual costs and the approved confidential price list should be accessible only to authorized Circularo/SignFide stakeholders. This document contains methodology and illustrative inputs, not a populated real price list. Do not copy actual cost records into broad packs merely because this methodology is included.

## Commercial and tax validation

Confirm the actual legal parties, jurisdictions and ownership/control before concluding which related-party rules apply. JP Investment's proposed interest in SignFide does not establish Circularo's upstream ownership. US rules address commonly controlled transactions; UAE rules address related-party transactions on arm's-length terms. See [IRS transfer-pricing guidance](https://www.irs.gov/businesses/international-businesses/transfer-pricing) and the [UAE FTA explanation](https://tax.gov.ae/en/faq.aspx?keyword=What+are+transfer+pricing+rules%3F), checked for these limited principles on 2026-10-14.

Evaluate relevant independent distributor arrangements as comparables, reflecting actual functions, assets, IP, service scope and risks. An appropriate cross-border adviser should assess the pricing method, documentation, software/service characterization and any applicable withholding. A cost markup used in a spreadsheet is not evidence of tax acceptance or appropriate software-IP remuneration.

## Next work

SF-T-027 in [TASKS](../TASKS.md) develops the cost-based model using actual inputs for the four editions and relevant API/add-ons, including direct and partner scenarios, using the approved working assumption above. SF-T-005/SF-T-011 connect the results to supplier terms and the US offer. SF-OQ-009 and SF-OQ-022 in [OPEN-QUESTIONS](../OPEN-QUESTIONS.md) retain the unresolved final rates, review, billing and partner economics. SF-D-011 records the buy-price principle; SF-D-012 records the financial-modeling approval in [DECISIONS](../DECISIONS.md).
