---
id: signfide:tasks
title: "SignFide task backlog"
kind: register
status: draft
owner: unassigned
updated: "2026-10-14"
classification: confidential
sources:
  - "ROADMAP.md"
  - "OPEN-QUESTIONS.md"
  - "DECISIONS.md"
---

# SignFide task backlog

This is the only live action backlog. Status values: `todo`, `in-progress`, `blocked`, `done`, `cancelled`. Leads are proposed functions, not appointments; no business due dates are approved. D0 is the unapproved kickoff in ROADMAP. Completion requires evidence or an explicit decision. Confidential customer/adviser records remain in their owning systems.

## Workspace delivery

| ID | Action | Status | Lead | Dependencies | Completion evidence |
| --- | --- | --- | --- | --- | --- |
| SF-T-001 | Establish workspace, metadata, consolidated trackers and source preservation | done | Codex for Josef's authorized migration | SF-D-007 | Completed 2026-10-14; [migration evidence and limits](archive/workspace-migration.md#verification-results) |

## Foundation and validation

The immediate operational implementation priority is SF-T-015 below: establish the sales-assisted Odoo Quote-to-Cash route. Self-service and freemium extend that route later rather than blocking it.

| ID | Action | Status | Proposed lead | Dependencies | Completion evidence |
| --- | --- | --- | --- | --- | --- |
| SF-T-002 | Run founder workshop and appoint decision-makers | todo | Founders | SF-OQ-001 through SF-OQ-023 | Named approvers, recorded decisions and unresolved issues; no assumed signatures |
| SF-T-003 | Select advisers and assess company/holding route | todo | Founders with US/UAE advisers | SF-OQ-030; [holding brief](company/jp-investment-setup-advice.md) | Reviewed entity/tax/registration scope, costs and route decision |
| SF-T-004 | Complete REDA resource, funding and performance schedule | todo | REDA lead and founders | SF-OQ-001, SF-OQ-002, SF-OQ-008, SF-OQ-013 | Named capacity, payer, deliverables, approved targets, counting and shortfall rules |
| SF-T-005 | Prepare Circularo supplier/service and wholesale term sheet | todo | Circularo and SignFide authorized leads | SF-OQ-003, SF-OQ-009, SF-OQ-012, SF-OQ-017 | Scope, charging units, service/data terms, term/exit and continuity accepted for drafting |
| SF-T-006 | Clear brand and audit domain/assets/account rights | todo | IP lead with counsel | SF-OQ-004, SF-OQ-005, SF-OQ-006, SF-OQ-010, SF-OQ-015 | Clearance advice, ownership/control evidence and authorized filing/license instructions |
| SF-T-007 | Prepare budget, cash scenarios and spending controls | todo | Finance and founders | SF-OQ-008, SF-OQ-009, SF-OQ-033 | Proposed first-90-day and 12-month model; payer, capital and spending approvals |
| SF-T-008 | Design and run buyer discovery | todo | REDA commercial | SF-OQ-026; [research](research/README.md) | Approved scope, aggregate needs/objections/usage and ICP recommendation |
| SF-T-009 | Recruit and qualify design partners | todo | REDA commercial | SF-T-008; SF-OQ-029 | Consented commitments, use cases and pilot expectations in owning system |
| SF-T-010 | Establish Circularo edition baseline and SignFide product mapping | todo | Circularo product with REDA commercial | SF-OQ-026, SF-OQ-028, SF-OQ-032 | Existing edition comparison, SignFide packaging alternatives, licensing/provisioning mapping and genuinely additional customer requirements; see [product strategy](product/README.md) |
| SF-T-011 | Validate offer and economics | todo | REDA and finance with Circularo | SF-T-005, SF-T-007, SF-T-008; SF-OQ-032 | Comparable usage/cost evidence, margins and approved scope/price/allowance decision |
| SF-T-012 | Define launch sales/channel routes | todo | REDA channel and SignFide management | SF-OQ-019 through SF-OQ-023, SF-OQ-031 | Approved appointments, seller/payment map, account rules and customer coverage |

## Build, pilot and launch

| ID | Action | Status | Proposed lead | Dependencies | Completion evidence |
| --- | --- | --- | --- | --- | --- |
| SF-T-013 | Complete critical company, cooperation, supplier and IP agreements | todo | Authorized parties with counsel | SF-T-002 through SF-T-006; SF-OQ-017, SF-OQ-030 | Executed documents in authorized system; safe scope/date references recorded |
| SF-T-014 | Configure service and verify pilot functionality | todo | Circularo technology | SF-T-010, SF-T-013; SF-OQ-028 | Tenant/configuration, permissions, signing/evidence and workflow acceptance |
| SF-T-015 | Priority 1: configure SignFide LLC in Odoo and enable sales-assisted Quote-to-Cash | todo | SignFide finance; REDA operations with Circularo Odoo/platform support | SignFide company/accounting configuration, selected offer and appropriate banking/merchant arrangements; SF-OQ-033 | Separate Odoo company and access, USD quotation/order/invoice templates, financial subscriptions, Stripe/bank payment and reconciliation, separate reporting and assisted Circularo provisioning handoff; no self-service dependency |
| SF-T-016 | Select and configure SignFide CRM | todo | REDA commercial | SF-OQ-034, SF-OQ-036 | Chosen CRM, company access, lead/opportunity and partner pipelines, reporting and Odoo record mapping; CRM choice independent of Circularo's existing Pipedrive |
| SF-T-017 | Extend product-led sales with synchronized self-service | todo | REDA commercial and Circularo technology | Sales-assisted route SF-T-015; SF-T-014, SF-T-016; SF-OQ-027 | SignFide trial/checkout/self-upgrade, provisioning and lifecycle integration; Odoo financial subscriptions, payment reconciliation and Circularo entitlements stay synchronized |
| SF-T-018 | Prepare customer legal/security and incident materials | todo | Authorized legal/security leads; REDA coordination | SF-T-010, SF-T-013; SF-OQ-035 | Reviewed terms/privacy/DPA, workflow scope, claims and incident decisions |
| SF-T-019 | Configure SignFide in shared Zoho Desk and establish customer support | todo | REDA customer team and Circularo service | SF-OQ-037; agreed team responsibilities and access | Dedicated branding/channels, L1 REDA, L2 Circularo, L3 engineering, ticket ownership/visibility, escalation, SLA tracking and named coverage; onboarding/exit coordination follows SF-OQ-011/SF-OQ-023 |
| SF-T-020 | Adapt website/marketing to approved launch scope | todo | REDA marketing | SF-T-006, SF-T-011, SF-T-015, SF-T-018; SF-OQ-025, SF-OQ-039, SF-OQ-040 | Accurate copy, sales-assisted contact/quotation path, assets/legal pages and responsive/keyboard QA; Phase 2 self-service is not required for the initial route |
| SF-T-021 | Run controlled pilot and record acceptance | todo | REDA customer team; Circularo technical lead | SF-T-009, SF-T-014, SF-T-015, SF-T-018, SF-T-019; SF-OQ-029 | Approved real workflows, aggregate value and assisted support/payment/export checks; gate decision; no dependency on Phase 2 self-service |
| SF-T-022 | Run commercial beta and measure economics | todo | REDA commercial and finance | SF-T-021; approved offer/spend | Paying cohort, reconciled cash, activation, service/acquisition costs and retention baselines |
| SF-T-023 | Collect authorized customer proof | todo | REDA marketing | SF-T-021, SF-T-022; SF-OQ-040 | Written permission for scoped quotes, names/logos or stories |
| SF-T-024 | Record public-launch go/no-go and next budget | todo | Authorized SignFide management | SF-T-018 through SF-T-023; SF-OQ-018, SF-OQ-029, SF-OQ-039 | Named approval, accepted evidence and spend limits; remain beta if gate fails |
| SF-T-025 | Establish reviews and REDA scorecard | todo | SignFide management and REDA | SF-T-002, SF-T-004, SF-T-016; SF-OQ-034 | Accepted kickoff/reviews, resource/outcome definitions, reporting and decision process |
| SF-T-026 | Evaluate SignFide freemium adoption | todo | REDA commercial with Circularo product | SF-OQ-041; Circularo offering availability | Adoption recommendation, target audience, edition/offer mapping and commercial implications based on [Circularo roadmap context](product/README.md#q1-2027-freemium-target) |
| SF-T-027 | Develop Circularo-to-SignFide wholesale buy-price model from actual costs | todo | Circularo finance/commercial with SignFide finance and relevant advisers | Actual cost/volume inputs and agreed allocation scope; SF-D-011; SF-OQ-009/SF-OQ-022 | Four-edition and applicable API/add-on cost model, service/IP remuneration alternatives, direct/channel economics and proposed consolidated buy prices; [methodology](commercial/wholesale-pricing.md); illustrations alone do not complete the task |

## Completion rules

The local website is an available prototype, not completion of SF-T-020 or the launch journey. Corporate drafts are inputs, not executed agreements. Resolve blockers through linked questions; record decisions before changing approved scope. Add actual completion dates/evidence and preserve cancelled/superseded task history.
