---
id: signfide:operations-readme
title: "SignFide operations strategy"
kind: overview
status: draft
owner: unassigned
updated: "2026-10-14"
classification: confidential
sources:
  - "../DECISIONS.md"
  - "../company/cooperation-responsibilities-and-raci.md"
  - "../company/operating-model-options.md"
---

# SignFide operations strategy

## Operating principles

SignFide will initially leverage Circularo's existing operational infrastructure to accelerate its US market launch and minimize unnecessary investment. The objective is commercial and financial independence while benefiting from shared technology, systems and operational expertise.

**Shared infrastructure, separate business operations.**

The initial model prioritizes simplicity, scalability, automation and clear responsibilities between SignFide, REDA and Circularo. The descriptions of Circularo's existing systems and product-led capabilities below reflect Josef's supplied operating context; SignFide-specific configuration is implementation work.

This is the primary operations overview. Add dedicated billing, support or CRM documents only when implementation needs more detail. [Company](../company/README.md) and [Commercial](../commercial/README.md) retain ownership of contractual and commercial terms.

## Business data ownership

Use one system of record for each type of business data:

| Data | System of record |
| --- | --- |
| Leads and opportunities | CRM; platform selection remains open |
| Quotations and invoices | Odoo |
| Financial subscriptions and billing | Odoo |
| Payment transactions | Stripe / banking |
| Product entitlements and usage | Circularo |
| Support tickets | Zoho Desk |

Other systems may display or synchronize these records without becoming competing authorities. Odoo holds the financial subscription and billing state; Circularo holds the actual service entitlements and usage. Stripe processes payments rather than becoming a second financial-subscription ledger.

Maintain a shared customer reference and mappings between each system's record IDs. Reconcile payment, invoice and entitlement states so a repeated event does not create duplicate billing or provisioning. Stripe transaction status and bank settlement must remain distinguishable from Odoo's reconciled invoice state. Detailed synchronization rules belong with the implementation when needed.

## Quotation, billing and invoicing

### Existing Circularo infrastructure

Circularo uses a multi-company Odoo environment for Quote-to-Bill processes, including customer quotations, sales orders, recurring subscriptions, invoicing, payment tracking, Stripe integration and bank transfer payments.

### SignFide approach

Reuse this environment by configuring SignFide LLC as a separate Odoo company. Set up SignFide customer/billing records, USD pricing and quotations, branded invoices, independent subscription/revenue tracking, US payment and banking connections, and separate financial reporting.

Company-specific permissions, accounting configuration and data separation need to match SignFide's business structure. Its US bank account and Stripe merchant configuration must use the appropriate SignFide legal entity and payment arrangements.

**Immediate implementation priority: configure SignFide LLC in Odoo and enable the complete sales-assisted Quote-to-Cash process.** See SF-T-015 in [TASKS](../TASKS.md).

The initial flow is quotation → accepted sales order and financial subscription where applicable → invoice → Stripe or bank payment → Odoo payment reconciliation → Circularo service activation/provisioning handoff. Exact invoicing and activation timing follows the agreed payment terms. Assisted provisioning is acceptable initially; this flow does not require self-service checkout.

## Product-led sales and payments

### Existing Circularo capabilities

Circularo supports customer trial registration and activation, product usage, self-service Stripe upgrades, sales-assisted upgrades for advanced plans/add-ons, and subscription activation following successful payment. Customers can upgrade before trial expiry or contact sales for additional options.

SignFide can reuse these capabilities as its customer journey develops.

### Phase 1 sales-assisted launch

Use Odoo-generated quotations and invoices, with Stripe or bank transfer payment options. Coordinate provisioning with Circularo, using an assisted handoff where full automation is not yet available. This is the initial commercial operating route.

### Phase 2 self-service

Extend the SignFide journey with trial registration, checkout, Stripe self-upgrade, automated service provisioning, renewal/upgrade handling and customer communications. Synchronize these flows with Odoo financial subscriptions and Circularo entitlements, preserving the system ownership above.

Self-service is an extension to the initial sales-assisted route, not a prerequisite for starting that route.

### Phase 3 freemium

Evaluate SignFide adoption of Circularo's planned Start-based freemium offering. The internal Circularo target and distinction from SignFide adoption are recorded in [Product](../product/README.md#q1-2027-freemium-target). Use lifecycle automation to support free/trial-to-paid conversion when the relevant offering is available.

## Customer support

Circularo currently uses Zoho Desk. Reuse it with dedicated SignFide branding, customer-facing channels, team responsibilities and appropriate access controls.

| Level | Responsibility |
| --- | --- |
| L1 — SignFide / REDA | Customer inquiries, onboarding, account assistance, basic troubleshooting and commercial questions |
| L2 — Circularo | Product configuration, advanced troubleshooting and technical escalations |
| L3 — Circularo Engineering | Software defects, infrastructure and development-related issues |

The shared platform should provide end-to-end ticket visibility within authorized access, clear case ownership, escalation, SLA tracking and consistent customer communication. Agree named REDA staffing and the actual service levels; the platform choice alone does not supply coverage.

Phase 1 implementation is tracked in SF-T-019. Use the [cooperation RACI](../company/cooperation-responsibilities-and-raci.md) for team responsibilities and company approval boundaries.

## Customer relationship management

Circularo currently uses Pipedrive. SignFide may use that environment, establish an independent Pipedrive environment or choose another CRM suited to US sales operations.

**Keep SignFide's CRM selection independent from Circularo's choice.** The selected CRM should support leads/opportunities, REDA sales activity, customer/partner pipelines, forecasting, Odoo integration, trial conversion and sales reporting.

CRM selection remains open in SF-OQ-034; implementation is SF-T-016. Whatever the platform, the CRM owns leads/opportunities, while Odoo owns quotations, invoices and financial subscriptions.

## Supplier and intercompany operations

Circularo supplies the underlying platform and technical services. The agreements must define licensing/wholesale pricing, any applicable revenue-sharing arrangement, supplier/intercompany invoicing, hosting costs, support, refund/chargeback allocation and reconciliation.

Use the [corporate and commercial model](../company/corporate-structure-and-commercial-model.md) and [operating options](../company/operating-model-options.md) for the parties and flows. Sharing Odoo or another system does not merge the companies, change the ownership structure or create an agreed revenue share.

Configure supplier items and billing from the agreed SignFide buy-price schedule; customer prices and discounts do not recalculate Circularo's buy price. The [wholesale model](../commercial/wholesale-pricing.md) owns the pricing methodology and proposed billing/review mechanics; Odoo implementation follows the eventual agreed schedule.

## US business operations

The US operation includes banking/settlement, merchant administration, bookkeeping, tax handling, customer/subscription terms, privacy, refunds/cancellation, onboarding, renewals, access management and reporting. US-specific accounting, tax and legal configuration needs the appropriate professional input.

Keep company access and reporting distinct within shared systems. Financial and customer records remain in those systems; this repository holds operational descriptions and suitable aggregate evidence, not credentials or raw customer/payment records.

## Implementation sequence and open decisions

| Phase | Focus | Central tracking |
| --- | --- | --- |
| 1 — Initial launch | SignFide Odoo company, quotation/invoice templates, commercial subscriptions, US bank/Stripe payments, reconciliation and assisted provisioning; Zoho Desk/L1-L3; CRM selection and reporting | SF-T-015, SF-T-019, SF-T-016 |
| 2 — Product-led growth | SignFide trial/checkout integration, self-upgrade, automated activation, synchronized billing/entitlements and customer communication | SF-T-017 |
| 3 — Scale | Freemium adoption when available, lifecycle optimization, expanded partner operations and analytics | SF-T-026; subsequent scope as needed |

These are operational stages, not new fixed calendar deadlines. The live backlog remains [TASKS](../TASKS.md).

The remaining implementation choices are Odoo company/accounting setup and US merchant/banking arrangements (SF-OQ-033), CRM and reporting (SF-OQ-034), REDA support staffing/service levels (SF-OQ-037), supplier economics (SF-OQ-009/SF-OQ-022), self-service synchronization (SF-OQ-027), applicable US legal/tax treatment (SF-OQ-030/SF-OQ-035) and freemium adoption (SF-OQ-041). Use [OPEN-QUESTIONS](../OPEN-QUESTIONS.md) for their details.

Reuse mature Circularo capabilities. Add SignFide-specific operations where US needs, commercial independence, requirements or customer experience justify them.
