---
id: investor-master:data-quality
status: draft
revision: 2
classification: confidential
owner: unassigned
updated_at: 2026-10-06
review_by: unassigned
---

# Data Quality and Open Questions

## Review scope

As of **2026-10-01**, setup reviewed the original brief and the relevant governed company, commercial, source, conflict, decision and deck records in sales-system. It did not treat account-specific working output, raw CRM data or draft deck content as authoritative. This is a scoped audit, not a claim that no further evidence exists elsewhere.

No numeric investor financial/customer dataset was present in the governed records reviewed, so no numeric conflicts could be reconciled. Unknown values remain unknown.

## Conflicting or stale source material

| ID | Finding | Source / evidence state | Handling | Suggested reviewer; assignment pending |
| --- | --- | --- | --- | --- |
| DQ-01 | Workspace add-on scope remains unresolved; review was due 2026-09-15 | `conflict:add-on-workspace-scope` open/material; `commercial-rule:add-on-scopes` reviewed/contradicted | Do not make affected claims; seek an explicit upstream disposition | Source owner: role:cso |
| DQ-02 | Older commercial snapshot wording conflicts with later typed records on automation and storage | `source:commercial-model-2026`; both original blocking conflicts are resolved | Resolve current terms via `decision:transaction-based-automation-entitlement` and `decision:transactional-document-storage-fair-use`; do not reopen or duplicate old rules | Source owner: role:cso |
| DQ-03 | Company record is reviewed, not approved; key corporate fields remain unknown | `company:circularo` | Obtain corporate evidence and approve the description for its audience | Management / corporate secretary |
| DQ-04 | Sovereign-platform deck is a draft with no source lineage | `deck:unified-sovereign-trust-platform` | Do not use it to confirm capabilities, deployments or future architecture | Product / product marketing |
| DQ-05 | Approved commercial references have review deadlines of 2026-11-26 | Source register, inspected 2026-10-01 | Current at inspection only; recheck status, dependencies and deadline before later use | Source owner: role:cso |

These findings constrain their stated scopes. The open material workspace conflict does not invalidate unrelated approved records. Full source locators and fingerprints are in the [source register](../sources/internal/sales-system-register.md).

## Missing information and management confirmation

| ID | Required evidence / question | Authoritative destination | Suggested reviewer; assignment pending | Status |
| --- | --- | --- | --- | --- |
| DQ-06 | Legal entities, HQ, founding history, founders and approved company description | [Company snapshot](company/company-snapshot.md) | Management / corporate secretary | NEEDS VERIFICATION |
| DQ-07 | Current ownership, cap table, funding instruments and dates | [Ownership and funding](company/ownership-and-funding-history.md) | Corporate secretary / finance | NEEDS VERIFICATION |
| DQ-08 | ARR, revenue, growth, EBITDA, margins, retention, churn, customer count, segment/geographic mix and pipeline, including definitions and periods | [Key metrics](traction/key-metrics.md) | Finance / commercial operations | NEEDS VERIFICATION |
| DQ-09 | Historical financials, accounting basis, contracted amounts, forecast assumptions and reconciliations | [Historical financials](financials/historical-financials.md) and [forecasts](financials/forecasts.md) | Finance | NEEDS VERIFICATION |
| DQ-10 | Named deployment relationships, operational status, scale, reference rights and safe claims | [Deployment register](traction/sovereign-deployments.md) | Commercial / delivery / legal | NEEDS VERIFICATION |
| DQ-11 | Live capability evidence, release dates, approved roadmap and architecture maturity, including eDoc and agentic concepts | [Product roadmap](product/product-roadmap.md) | Product / engineering | NEEDS VERIFICATION |
| DQ-12 | Transaction mandate, ownership range, value, primary/secondary split, founder objectives, governance and disclosure boundaries | [Strategic investment opportunity](transaction/strategic-investment-opportunity.md) | Management / shareholders | NEEDS VERIFICATION |
| DQ-13 | Evidence for the brief's profitability, recurring-business, government/enterprise-base and sovereign-embedding assertions | [Investment thesis](strategy/investment-thesis.md) | Management / finance / commercial | NEEDS VERIFICATION |
| DQ-14 | Accountable master owners, review dates, approval evidence and investor disclosure rules | [Governance](../GOVERNANCE.md) | Management | Unassigned |
| DQ-15 | Long-term IPO ambition and whether any approved plan exists | [Exit and IPO](transaction/long-term-exit-and-ipo.md) | Management / shareholders | VISION; plan unverified |

## Market claims requiring external verification

| ID | Claim area | Evidence needed | Destination |
| --- | --- | --- | --- |
| DQ-16 | GCC / UAE / KSA market size, growth and addressable demand | Dated primary research/official statistics, segment definition, geography, currency and methodology | [Market opportunity](market/market-opportunity.md) and [GCC](market/gcc-opportunity.md) |
| DQ-17 | Competitor capability and comparative advantage | Current first-party documentation, product edition, geography and deployment scope | [Competitive landscape](market/competitive-landscape.md) |
| DQ-18 | Regulatory, sovereign, identity and digital-trust requirements | Current official source and qualified review for the precise jurisdiction/claim | [Industry trends](market/industry-trends.md) |
| DQ-19 | Valuation comparables and strategic transaction evidence | Dated filings/announcements, transaction scope and metric definitions | [Valuation context](financials/valuation-context.md) |

No external market research was performed for this scaffold. Research is an evidence task, not permission to invent values.

## Jahani briefing source review on 6 October 2026

The following issues were identified while preparing Josef's requested [Jahani briefing](../investors/jahaniandassociates/strategic-shareholder-briefing.md). The [supplied pre-call memo](<../investors/jahaniandassociates/sources/25-09-2026-Pre-Call Memo - Circularo.md>) is dated 2 October 2026 in its body. It and the supporting investor drafts are management-reported source material without documented claim approval. This scoped review adds unresolved issues; it does not reconcile or approve business figures. Owners below are suggested reviewers, not appointments.

| ID | Competing claims or missing definition | Sources and periods | Disposition and suggested reviewer |
| --- | --- | --- | --- |
| DQ-20 | USD 2.96M ARR versus USD 2.69M net ARR; gross/net treatment and snapshot timing not reconciled | [Master investment thesis](strategy/investment-thesis.md), Thesis 1, December 2025; supplied pre-call memo, section 9 Q2, 2025 | Open. Both preserved; neither selected in the briefing. Latest ARR, date and definition requested. Finance |
| DQ-21 | 2022 adjusted EBITDA USD 8K and margin 9.2% do not reconcile against USD 1.28M net revenue; 2025 cost of sales USD 1.22M does not reconcile against USD 2.79M net revenue and 69.2% gross margin if the scope and basis match | Supplied pre-call memo, section 9 Q2, 2022/2025 | Open. 2022 figures and cost-of-sales narrative excluded from the briefing; 2024/2025 revenue and margins remain attributed management draft figures pending finance review. No correction inferred. Finance |
| DQ-22 | Addressable government entities, deployed entities, active usage, paying adoption and percentage penetration are not consistently distinguished | Supplied pre-call memo, sections 1 Q5 and 9 Q1/Q4; [positioning brief](<../investors/jahaniandassociates/sources/22-09-2026-Circularo — Investor Positioning Brief.md>), sections 7-9; October 2026 drafts | Open. Aggregate reach and penetration figures withheld from the briefing. Dated active/addressable counts, current Circularo revenue and next adoption milestone requested per platform. Commercial / delivery |
| DQ-23 | GCC concentration stated as approximately 97% recurring revenue versus approximately 98% ARR; dates and denominators insufficiently defined | Supplied pre-call memo, sections 5 Q1, 14 Q1 and 19; October 2026 draft | Open. Briefing uses qualitative GCC concentration only. Finance / commercial operations |
| DQ-24 | Reference to Qubit's mandate does not establish current engagement, scope or exclusivity relevant to another adviser | Supplied pre-call memo, section 17 Q2; October 2026 draft | Open. Adviser mandate claim omitted from the Jahani briefing; no exclusivity inferred. Management |

## Resolution log

For each issue retain: competing assertions (if any), source IDs and reporting periods, accountable owner, decision date, evidence, decision rationale, impacted master/material paths and follow-up review deadline. Keep resolved entries and their history.

- 2026-10-01: Initial audit; no business facts approved or conflicts resolved by the setup agent.
- 2026-10-06: Added DQ-20 through DQ-24 from the Jahani source review. No competing assertion selected, claim approved or common financial fact updated. The briefing companion records source lineage and completion fields.
