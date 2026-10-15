---
id: signfide:decisions
title: "SignFide decisions"
kind: register
status: draft
owner: unassigned
updated: "2026-10-14"
classification: confidential
sources: []
---

# SignFide decisions

This log records explicit human directions in the project conversation. Dates use the 2026-10-14 session date; no executed agreement is inferred. “Confirmed internal direction” means Josef authorized that planning/implementation choice. It does not establish REDA acceptance, incorporation, legal title, licensing or availability. The conversation is the approval evidence except where recorded-source evidence is specified.

| ID | Date | Decision and scope | Decision-maker and evidence | Implementation and conditions | State |
| --- | --- | --- | --- | --- | --- |
| SF-D-001 | 2026-10-14 | Working ownership proposal: JP Investment LLC 67%, REDA designated holders 33% | Josef: “let's change 60/40 to 67/33” | [Structure](company/corporate-structure-and-commercial-model.md); holders, contribution/equity mechanisms and executed documents remain open | Confirmed internal direction |
| SF-D-002 | 2026-10-14 | Start with Option A; retain B and C as future alternatives | Josef: all previous options remain valid; “we should start with Option A as it's easiest” | [Operating models](company/operating-model-options.md); supplier scope/terms and future transitions need agreement | Confirmed internal direction |
| SF-D-003 | 2026-10-14 | Good Faith palette and serif wordmark without a separate symbol | Josef selected the wordmark alternative and explicitly required oxblood/parchment/graphite/clay and no symbol for the prototype | [Brand](brand/README.md), [prototype design](website-prototype/DESIGN.md); production lettering/icon and clearance remain open | Confirmed internal direction |
| SF-D-004 | 2026-10-14 | “Signing in faith” as main motto and primary tagline | User direction recorded in the editorial note of the [preserved brand source](archive/internal-brand-strategy-source.md) | [Brand](brand/README.md); motto choice, not legal assurance | Confirmed internal direction; recorded-source evidence |
| SF-D-005 | 2026-10-14 | Direct sales plus approved US distributors/resellers | Josef: “Signfide will work with approved distributors in the USA and will also work directly with end customers” | [Commercial structure](company/corporate-structure-and-commercial-model.md); tiers, appointments and economics remain open | Confirmed internal direction |
| SF-D-006 | 2026-10-14 | Circularo supplies technology/favorable supplier terms; REDA supplies measurable US commercialization; SignFide is the legal/brand/sales entity | Josef's explicit contribution, RACI and performance instructions | [RACI](company/cooperation-responsibilities-and-raci.md), [contribution](company/reda-contribution-and-performance.md); resources, targets, dates and remedies need agreement | Confirmed internal direction |
| SF-D-007 | 2026-10-14 | Adopt project-root structure, central trackers and YAML frontmatter; personal notes stay local and outside Git | Josef: “Agree and proceed” following the structure review and private-reference instruction | [Migration](archive/workspace-migration.md); existing parent repository, branch and local prototype retained | Confirmed internal direction |
| SF-D-008 | 2026-10-14 | Local-only prototype with meaningful local CTAs; forms send nothing; publication is separate | Josef's original dedicated-folder prototype brief | [Prototype](website-prototype/README.md); Git push instructions authorize versioning, not public deployment | Confirmed internal direction |
| SF-D-009 | 2026-10-14 | Base the product overview on existing Circularo SaaS editions, SignFide packaging choices and the shared Circularo roadmap | Josef supplied the preferred product strategy, then agreed to adopt it with metadata, Option A scope, a qualified freemium target and central tracker links | [Product strategy](product/README.md); freemium is an internal Circularo target and SignFide adoption remains SF-OQ-041. Supersedes the assistant's product-readiness overview, not the underlying platform or agreed operating options | Confirmed internal direction |

## SF-D-010 Shared operations and sales-assisted Quote-to-Cash

Date: 2026-10-14. Decision-maker: Josef, through his supplied operations strategy and explicit direction to save it as the operations overview, establish business data ownership and prioritize SignFide Odoo Quote-to-Cash.

**Confirmed internal direction:** reuse Circularo's existing multi-company Odoo and Zoho Desk with separate SignFide company configuration, records, access, branding and responsibilities. [Operations](operations/README.md#business-data-ownership) owns the system-of-record table: CRM for leads/opportunities; Odoo for quotations/invoices and financial subscriptions/billing; Stripe/banking for payments; Circularo for entitlements/usage; Zoho Desk for tickets. CRM vendor selection remains independent and open.

Configure SignFide LLC in Odoo and enable the complete sales-assisted Quote-to-Cash route as the immediate implementation priority. Assisted provisioning is acceptable initially. Self-service integration and freemium adoption are later extensions rather than initial selling prerequisites. Keep the operations overview primary; add dedicated implementation documents only when needed.

Implementation is SF-T-015, SF-T-016, SF-T-019 and later SF-T-017/SF-T-026. This records architecture and sequence, not a claim that SignFide accounts, system configuration, integrations or actual sales are already live. Circularo's existing tooling/capabilities are reported by Josef; the supplier and company agreements remain separate.

## SF-D-011 Fixed SignFide wholesale buy-price principle

Date: 2026-10-14. Decision-maker: Josef, who agreed to update the distribution/services brief and specified that the whole sales calculation will be based on SignFide's buy price, supported by his supplied wholesale-pricing draft.

**Confirmed internal direction, approved in principle:** SignFide purchases at agreed fixed wholesale buy prices, independently of its customer-facing prices, discounts, bundles and actual selling prices. Evaluate delivery costs, appropriate service remuneration and technology/IP remuneration when developing that price. Keep the working methodology in [commercial/wholesale-pricing.md](commercial/wholesale-pricing.md), with the agreement referring to its contractual wholesale schedule.

Actual buy prices, cost allocation, service rates, technology remuneration, billing/review mechanics, tax method and contractual approval remain open. Illustrations in the pricing model are not approved commercial terms. This direction replaces the distribution brief's proposed retail/reference-list discount basis. It does not establish Circularo's common ownership with SignFide or adopt a fixed initial contract term.

Implementation: SF-T-027 develops the actual-input model; SF-T-005/SF-T-011 reconcile supplier terms and SignFide pricing. Exact supply rights, approved channels, Option A service and exit protections remain in the [agreement principles](company/circularo-distribution-agreement.md).

## Choices still proposed

Global brand owner, exclusivity, entity/tax route, equity earning/remedies, supplier/public prices, exact ICP, quotas, migration priority, Phase 2 self-service details, launch date and gate acceptance remain in [OPEN-QUESTIONS](OPEN-QUESTIONS.md). Workspace approval does not adopt the supplied launch plan wholesale.

## Recording future decisions

Add stable SF-D ID, date, named authorized approver(s), exact choice/exclusions, rationale/tradeoff, evidence, affected question/task IDs, implementation and conditions. Distinguish internal direction, mutual agreement pending implementation, and execution. Preserve reversed entries with successor references. Resolve a question only when its closure evidence is met; discussion approval can leave implementation open.
