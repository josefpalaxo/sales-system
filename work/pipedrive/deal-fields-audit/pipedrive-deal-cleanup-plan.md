---
title: Pipedrive deal cleanup plan
status: draft
classification: confidential
owner: role:cso
---

# Pipedrive deal cleanup plan

Proposed implementation sequence for the [Deal audit](pipedrive-deal-fields-audit.md) and [draft dictionary](pipedrive-deal-target-model.md), October 17, 2026, America/Los_Angeles. **The audit made no CRM changes.** Organization/partner approvals do not authorize these Deal changes. ClickHouse is excluded; no external integration compatibility is claimed.

## Priorities and risk

| Priority | Review/action proposal | Size of initial queue | Risk |
| --- | --- | --- | --- |
| P0 | Resolve outcome/stage contradictions before relying on sales reporting | 35 open in Lost stage; six open in subscription Closed stage; two archived open Deals | High: closing, reopening or moving records changes history and automation |
| P0 | Correct the inverted term after confirming actual dates | One Deal | High: contract/provisioning timing; never guess which boundary is wrong |
| P1 | Restore responsibility for current sales work | 19 open non-archived sales Deals with inactive owners | Medium/high: ownership, access and task routing |
| P1 | Define reporting and forecasting scope | Four pipelines, including 266 subscription records and 54 non-archived legacy records | High if operational/history counts are treated as comparable sales conversions |
| P1 | Confirm field ownership, transaction parties and source contracts | All 23 custom fields and their Lead/Deal uses | Medium/high: handoff, attribution and shared-field changes |
| P2 | Normalize verified formatting and review sparse sales data | 209 spaced subscription IDs; scoped amount/date/volume/next-step queues | Medium/high: IDs, forecast dates and inferred amounts |
| P2 | Reconcile references and loss context | One unavailable Distributor target; one deleted referrer; 57 lost Deals without reason; five competitor tags on non-lost Deals | Medium/high: identity, historic attribution and loss reporting |
| P3 | Simplify names, descriptions, forms and duplicate option labels | Reviewed field/label/option plan only | Low for display-only changes; high for deletion or shared-schema effects |

Queues overlap and are dated snapshots. Review the 438 open non-archived sales Deals with On hold/Lost stages visible separately; for a narrower progression view, use the 270 excluding those stages. Missing value/volume/date at an early stage is not automatically a defect.

## Disposition of all custom fields

| Current field | Proposed action after approval | Prerequisite / protection |
| --- | --- | --- |
| Commercial Volume | Keep type and key; add clear unit/period guidance | Review six non-volume entries and one Czech expression; no numeric-only conversion |
| Reseller | Keep transaction organization link | Preserve historical commercial arrangements; confirm native Deal organization's role |
| Distributor | Keep transaction organization link | Investigate one 404 target and ten same-reseller/distributor arrangements; no company reclassification by comparison |
| Marketing Source | Keep; define attribution and relation to native channel | Preserve 198 custom-only Deal values and current Lead values; approve any eventual crosswalk |
| Referral URL | Keep captured evidence; remove from routine manual creation if appropriate | Preserve 43 Deal, 528 current Lead and 517 archived Lead values |
| Referred by | Keep Person link | Review one deleted Person reference; retain historic source before any correction |
| Lost to | Keep; optional Lost-to competitor rename | Review five non-lost selections; preserve option IDs and reopening context |
| Plan | Keep; optional Plan / offer rename | Preserve all 13 option IDs including Trial/Promo, Start and Trial Start; no catalog repricing or stage copy |
| Subscription ID | Keep; approved whitespace normalization only | Confirm writer and actual product identity; retain original-to-normalized mapping for all 209 changes |
| Data Region | Keep enum; optional Hosting / deployment target rename | Preserve ten IDs and named environment distinctions; do not split into speculative new fields |
| Start Date | Keep; optional Subscription start date rename | Define term/snapshot meaning; protect archived Lead data |
| End Date | Keep; optional Subscription end date rename | Correct one inverted pair only from verified source; do not fill 100 start-only terms by arithmetic |
| Billing Period | Keep; optional Billing cadence rename | Resolve Bi-Annually's one assignment before more precise label/cadence mapping |
| Billing contact | Keep distinct transaction contact | Verify routing/source before changing 54 differing/missing affiliations |
| Admin contact | Keep distinct transaction contact | Verify actual operational association; 22 affiliations differ or are missing |
| Reason | Keep; optional Enquiry reason rename | Preserve 31 Deal and 478 archived Lead values; do not merge into native Lost reason |
| UTM source | Keep integration field | Eight current Leads have values; zero on Deals is not non-use |
| UTM medium | Keep integration field | Eight current Lead values |
| UTM campaign | Keep integration field | 129 current Lead values |
| UTM term | Keep integration field | Eight current Lead values |
| UTM content | Keep integration field | Eight current Lead values |
| Geo country | Keep capture geography; conditional Captured country rename | Seven Deal and 255 current Lead values; source not verified as customer/hosting address |
| Geo city | Keep capture geography; conditional Captured city rename | Seven Deal and 255 current Lead values; preserve capture provenance |

**Introduce zero custom fields and retire zero immediately.** All 23 have stored values somewhere in the shared Lead/Deal schema. Unused individual option labels do not independently authorize removal.

## Phase 1 — settle process meaning and preserve evidence

Agree which pipelines represent opportunity progression, subscription administration and retained history. Keep status, stage and archive state separate. Confirm how closed subscription records, renewals, trials and cancellations are represented before changing any of the 266 subscription-pipeline records. Do not convert subscription losses into new-business opportunity losses or declare a current active contract from Won alone.

For any approved production work, take fresh source definitions/values and a reviewed ID-based before/after plan in ignored storage. Preserve keys, option IDs, owners, visibility, stage/probability settings, all transaction party links, product attachments and historical timestamps. Keep external identity/source mappings and unresolved exceptions visible. The current ignored audit evidence is a baseline, not an immutable live-state guarantee.

The owners must resolve:

1. Deal value basis: annual versus total term, Circularo's amount versus another transaction party's amount, currency mapping and applicable product scope. Do not establish a financial policy from current populated amounts.
2. Native Organization's role in channel/shared-service transactions; actual Reseller/Distributor and Billing/Admin contact responsibilities.
3. Whether subscription fields are proposal snapshots, current operational state or handoff references, and which external writer owns them.
4. Marketing Source versus Source channel/origin, attribution timing and preservation through Lead conversion.
5. Data Region's broader deployment meaning, Reason's enquiry scope and Bi-Annually's actual cadence.
6. Stage meanings, permitted probability overrides, inclusion of On hold/legacy/subscription records and exact criteria for closing a Deal.

The imported partner-program documents remain drafts. This review does not create registration, pricing, commission, territorial or eligibility rights or authorize new approval flags.

## Phase 2 — targeted outcome, ownership and reference review

Inspect the 35 open Deals in the stage named Lost. For each, an owner decides whether it is an actual loss with a recorded reason, a live opportunity in the wrong stage or intentional retained context. Only implement the approved disposition. Preserve prior stage/outcome history and consider triggered workflows; stage label alone is not evidence to close the whole group.

Review six open Deals in subscription Closed separately from sales outcomes, plus the two archived open Deals and 13 open legacy-pipeline Deals. Do not mass-archive pipeline 18 merely because its name includes Archive; 54 records remain non-archived and their intended access/history must be confirmed.

Resolve the one Start Date/End Date inversion from the contract/subscription source. Do not fix it by adding one day, reversing dates or using the expected close date without evidence. Review start-only terms as a separate completeness question, not a default-duration migration.

Assign the 19 inactive-owned current sales Deals to actual accountable active owners after agreement. The broader 1,257 inactive-owned historical population is not a mandate to reassign everything. Preserve record visibility; two Deals are owner-only.

The Distributor target that returned 404 needs identity/access/merge-history review. The absent referrer is individually readable with is_deleted=true; preserve attribution and decide whether a replacement or retained historical link is appropriate. Every populated native Deal Organization/Person reference resolved. Nine no-party Deals are archived history; do not fabricate affiliations.

Review same Reseller/Distributor (ten), reseller equal to native Organization (five), and distributor equal to native Organization (three) against actual agreements. Comparisons with the organization's current primary Partner type are evidence of different classifications, not a bulk correction plan. Preserve deal-specific historical rights and do not infer Organization BillingEntity, Partner type or Person operational roles from these references.

## Phase 3 — forecast, quantities and subscription identifiers

Scope review to sales pipeline 20/23 and appropriate stages. The full 438 open non-archived cohort has 272 zero values, 286 missing expected close dates, 65 dates before October 17, 346 missing next-activity references and 285 missing Commercial Volume values. The narrower 270 progression cohort has 173/172/16/224/169 respectively. Use owner-led qualification and real next actions; no arbitrary values, default year-end dates or guessed quantities.

Review Trial Account stage 167's 100% default. Its 13 non-archived open Deals currently have zero value; five have explicit 50% overrides and eight no override. This is a prospective probability-policy decision, not demonstrated positive-value inflation. Do not overwrite all overrides or nulls with a uniform percentage. Preserve old stage/probability evidence if a configuration change is approved.

Protect amount/currency pairs and derived metrics. Ten Deals use inactive custom currencies named CZK/EUR under nonstandard codes. Finance/integration owners must confirm their mapping and amounts before any relabeling; never apply a guessed exchange rate. Do not sum currency amounts in an unqualified total or fill MRR/ARR/ACV on unrelated records.

For Commercial Volume, correct only reviewed concepts/units. Keep text supporting users, transactions per stated period and combinations. The native `products_count` equals enabled quantity totals on the 299 verified Deals; it is not consistently attachment-row count and has no guaranteed user/transaction unit. Preserve actual product lines, quantity, pricing, cadence, enabled state and comments if reconciling a Deal. No price changes are part of this plan.

All 233 populated subscription identifiers become distinct `CLI-<digits>` tokens after removing whitespace. Prepare a mapping for the 209 spaced values only after confirming the token with the product/integration owner and checking every reader/writer. Keep the original values recoverable. Do not move an identifier between an Organization's primary subscription link and a Deal without establishing that their relationship scope is the same.

## Phase 4 — shared Lead capture and field/form clarity

Test real conversion lineage and field mapping using a separately approved small test/record set. All five UTM fields have current Lead values despite no Deal values. This is a shared-schema dependency; it is not proof that conversion is broken or permission to delete those fields. Protect the 724 current and 526 archived Lead snapshots, including 242 archived term-date pairs and 478 Reason values.

Retain native Source channel/origin and custom Marketing Source until the marketing/integration owner establishes whether they describe capture mechanism, business attribution or both. Preserve 198 custom-only and 33 native-only Deal values. A Referral/Lead Suggestions combination or Web/Web Forms pair may reflect different concepts. No lossy mapping is approved from labels alone.

Apply approved display names and descriptions without changing keys/types/option IDs. Suggested clear names are Enquiry reason, Lost-to competitor, Plan / offer, Hosting / deployment target, Subscription start/end date and Billing cadence. Captured country/city requires source confirmation first. Changing shared field definitions can affect Lead entry and integrations, so verify both entities, not only the Deal detail page.

Keep normal creation short: Title, Pipeline/Stage, responsible Owner/default visibility, known Organization/Person, and optional early Value/Currency, expected close, volume/plan. Show channel organization fields when relevant. Move capture-only URL/UTM/geography and operational subscription/contact fields out of routine manual creation where supported. Introduce stage-aware descriptions and business checks before considering mandatory flags. Extended v2 visibility/required namespaces were not readable; verify current UI and permissions before applying configuration.

Native Lost reason has duplicate User adoption challenges labels under IDs 116 and 122. Preserve the three text-matching records and inspect consumers before deduplicating the options. Review 57 missing loss reasons and five competitor selections on non-lost Deals; do not invent reasons or erase historic reopening context. Keep custom Reason separate.

Review labels for actual event, owner-style, product or tactical meaning. Preserve event provenance and do not silently convert Important to account Priority, a personal-name tag to Owner, CUSTOMER to active subscription, or product tags to Plan. Four exact title/organization/pipeline groups repeat; they are review candidates, not automatic merges.

## Dependencies, execution method and acceptance

All 19 accessible Deal filter conditions were inspected and had no custom Deal-field references. That does not inventory private filters, Lead filters, forms, automations, report writers or Odoo/product integrations. Shared Lead values are confirmed dependencies. ClickHouse remains out of scope; do not claim migration of its consumers from this plan.

Use small, approved ID-based batches. CSV can be suitable for reviewed scalar formatting, display-name-independent record values or ownership updates after importer semantics are checked. It is not an approved bulk close/merge/currency conversion/product migration file. Reference changes, outcome/stage transitions and shared-field configuration need their own readback and workflow checks. Preserve update timestamps for freshness checks and verify intended changes plus unrelated-value preservation.

Completion criteria for any later approved implementation:

- Every affected field has an agreed meaning, accountable owner and consumer disposition; keys/options survive display-only changes.
- Sales reporting keeps subscription/legacy/archive scopes explicit, and every approved stage/status change has a per-record decision and preserved history.
- Current work has an agreed owner and evidence-based next steps/forecast inputs; early-stage unknowns remain explicit.
- The inverted term and approved reference/identifier corrections match authoritative sources and their reviewed before/after mapping.
- No shared Lead values are lost; capture/conversion, billing/admin routing and other affected consumers pass their scoped checks.
- Prices, amounts, currencies, product quantities and recurrence are preserved unless separately approved for a verified commercial correction.
- The dictionary and CRM guide match the final live state, unresolved cases remain visible, and repository catalog/validation pass.

The current completed work is this read-only audit and reviewable proposal. Production cleanup remains unapproved and unexecuted.
