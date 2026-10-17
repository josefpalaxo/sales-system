---
title: Pipedrive deal target model
status: draft
classification: confidential
owner: role:cso
---

# Pipedrive deal target model

Proposed dictionary based on the [Deal audit](pipedrive-deal-fields-audit.md), October 17, 2026, America/Los_Angeles. **Draft for accountable-owner review.** This is not an approved commercial policy, a canonical field dictionary or authorization to change CRM data. Current names, field keys, option IDs and pipeline/stage IDs remain in force until changes are explicitly approved.

## Process and authority boundaries

Treat a sales opportunity, a subscription administration record and an archived historical record as different reporting scopes even when all are implemented as Pipedrive Deals. Keep Circularo (20) and Strategic Deals (23) as the current sales scopes; assess On hold and the stage named Lost separately. Preserve subscription pipeline 21 and legacy pipeline 18 until their owners approve their future purpose and dependency disposition. Do not bulk-move or close records to make the model look consistent.

Native `status` is the commercial outcome: open, won or lost for the non-deleted census. Native `is_archived` controls archival state. A stage name, Plan, product account existence or subscription Closed stage does not replace either property. Define subscription cancellation/expiry in the system that owns the subscription; do not mix it into new-business loss reporting without an explicit agreed model.

Keep all **23 existing custom fields** initially. Five empty Deal fields contain values on shared Leads, and other fields preserve transaction participants or operational context. **Add no custom fields and retire none immediately.** No speculative Deal type, users count, transaction count, deployment field, approval field, billing entity field or sync flag is necessary for the first cleanup. A later demonstrated workflow can justify a separate proposal.

Pipedrive owns sales-stage context, the responsible seller and the recorded opportunity snapshot. Signed agreements, orders, product/subscription records and their accountable owners establish actual entitlement, term, bill-to obligations and approved pricing. Those external records were not inspected. The imported [partner deal-registration guide](../../../shared/playbooks/partners/Circularo%20Partner%20Deal%20Registration%20Guide.md) remains a draft; it does not establish program rights or CRM approval requirements.

## Native fields people maintain

| Recommended name | Standard key / type | Definition and allowed values | Required business scope | Deal creation | Action / authority |
| --- | --- | --- | --- | --- | --- |
| Deal title | `title`, text | Recognizable opportunity or operational record, with explicit context where a subscription/renewal is represented | Every Deal | Yes | Keep; use actual context, not a universal title rewrite |
| Owner | `owner_id`, user | Accountable seller/relationship owner; current Pipedrive user ID | Active owner expected for current sales work | Show/default under approved form | Keep; approve reassignment of inactive-owned work |
| Pipeline | `pipeline_id`, pipeline ID | Existing IDs 18, 20, 21, 23; business process scope, not customer type | Every Deal | Yes | Keep IDs and history; confirm entry/routing rules |
| Stage | `stage_id`, stage ID | One of the actual stages belonging to that pipeline, listed in the audit | Every Deal | Yes | Keep current IDs pending process review; do not use Lost stage as a status substitute |
| Status | `status`, native status | open / won / lost; deleted is a system lifecycle value outside this census | Native outcome when known | Default open, preserve existing behavior | Keep; closing is an owner decision with evidence |
| Organization | `org_id`, organization reference | Evidenced customer/opportunity organization, with its role in the transaction explicitly understood | Expected when a customer entity is known | Yes, optional under workflow | Keep; do not substitute a reseller merely to fill a blank |
| Contact person | `person_id`, Person reference | Primary sales contact for this opportunity | When known; not every historical record | Yes, optional | Keep separate from Billing contact, Admin contact and other participants |
| Value and currency | `value` + `currency`, native monetary pair | Recorded opportunity amount in its exact currency; owner must define whether the basis is annual, total term or another agreed scope | Before a deal enters a value-bearing forecast/proposal | Yes, optional early | Keep; no invented estimate, automatic currency relabel or cross-currency sum |
| Expected close date | `expected_close_date`, date | Current evidence-based expected commercial decision date | Before inclusion in a dated sales forecast; not every Idea or operational record | Yes, optional early | Keep; no default quarter-end, term-end or past-date overwrite |
| Probability override | `probability`, nullable integer 0–100 | Explicit override where enabled; null retains native stage/pipeline behavior | Only with an evidenced forecasting reason | Optional; preserve native behavior | Keep; do not fill null with zero or set Trial to 100 without approved logic |
| Lost reason | `lost_reason`, native text/options | Why the opportunity was lost; preserve existing labels and meaningful free text | When recording an actual loss | Closing workflow | Keep; resolve duplicate configured label without erasing original explanations |
| Source channel | `channel`, native option | Defined capture/acquisition mechanism, existing IDs in audit | When known | Optional | Keep; distinguish from business marketing attribution until mapping is approved |
| Source channel ID | `channel_id`, native text | Actual external capture/reference identity associated with the channel | Integration-dependent | No routine manual input | Keep exact identifiers; not an opportunity-type field |
| Labels | `label_ids`, native multi-select | Approved tactical context, event provenance and defined work tags | No global requirement | Optional | Keep existing IDs; reconcile owner-style/product/customer duplicates individually |
| Visible to | `visible_to`, native visibility | 1 Item owner or 3 All users under current access policy | Native/default | Preserve default | Keep; no expansion of sharing during cleanup |

Native Organization and Contact person have conditional legacy required metadata expressing an either/or relationship. Nine archived records lack both; that history does not justify creating placeholder identities. Required UI configuration must be verified for the intended pipeline and status rather than inferred from system mandatory flags.

## Every custom field and proposed disposition

All proposed names below are unapplied. Preserve each existing key and option ID if the owner approves a display-name change. All current custom mandatory/important flags are false in available v1 metadata; proposed business scope is not a request for global mandatory fields.

| Proposed name | Current name / stable API key | Existing type and values | Business definition / authority | Required / creation | Cleanup |
| --- | --- | --- | --- | --- | --- |
| Commercial Volume | Commercial Volume — `89de8ed94e3caded8b428a8d4b27f1e3e8a7ab31` | Text; users, transactions per stated period, or both | Quantity/scope behind the offer; seller confirms against proposal/agreement | Before volume-based proposal / Optional | Retain mixed-unit text; correct six non-volume entries and normalize one Czech expression only after review |
| Reseller | Reseller — `e428b2794b0ab18a55784c7c63bfb20a819cb4ab` | Organization reference | Reseller participating in this transaction; agreement/deal owner | If applicable / Optional | Keep independent of organization primary Partner type |
| Distributor | Distributor — `a1feb77f12a6056652f1656f955d5dfee416c973` | Organization reference | Distributor participating in this transaction; agreement/deal owner | If applicable / Optional | Review unavailable reference and party overlaps; retain historical roles |
| Marketing Source | Marketing Source — `83d355814afab519b5a10d56268db6dbeb9c0c11` | Existing enum, eight IDs below | Business acquisition attribution, pending agreement on first/last-touch and relation to native channel; marketing owner | When known / Optional | Preserve 198 custom-only Deal values and existing Lead usage; no automatic consolidation |
| Referral URL | Referral URL — `f84448edbf816bcc6331ae317d8755def31c277a` | Text URL or blank | Actual captured referral/landing evidence; source/integration owner | Capture only / No manual creation input | Retain query/provenance information as appropriate; verify one missing-scheme value |
| Referred by | Referred by — `87a07677ce4aa795ceb36ef7daaabaa76033fe67` | Person reference | Person who introduced this opportunity, not necessarily the contact's general introducer | If evidenced / Optional | Preserve one deleted-Person reference until history/identity is resolved |
| Lost-to competitor | Lost to — `999c7186e12ded126682482ee1a7ec9e1eca60d5` | Existing competitor enum, 16 IDs below | Competitor that won the opportunity under the recorded loss context; seller | On competitive loss, when known / No | Review five non-lost records for reopening/history; do not require a competitor for every loss |
| Plan / offer | Plan — `b2c8c4e77e70df0cd7a0e6bcbf5890253ebcfb4c` | Existing 13-option enum below | Proposed plan/offer in sales scope; recorded operational plan in subscription scope, subject to source confirmation | When the proposed product is known / Optional | Preserve Trial/Promo and product-family distinctions; do not copy subscription stages mechanically |
| Subscription ID | Subscription ID — `70552a4c0ba614629f95928dac186d06be25b63d` | Existing text; evidenced `CLI-<digits>` identifier | Link to the explicitly identified subscription, not all subscriptions for an organization; subscription/integration owner | Only when an actual subscription is known / No | Review 209 spacing variants; retain exact before/after mapping and writer compatibility |
| Hosting / deployment target | Data Region — `2b23d940cc1caeea6e4906e25ae3449971fc312b` | Existing 10-option enum below | Selected geographic hosting choice, named environment or deployment mode; solution/subscription owner | At deployment/provisioning commitment / Optional | Broader name preserves current meanings; no geographic inference for OnPrem or Self-Hosting |
| Subscription start date | Start Date — `62ee31e3f4c3acea108c641b1198f6db89510aca` | Existing date | Intended/confirmed term start for the scoped record; contract/subscription owner defines whether snapshot or current state | At relevant handoff / No | Preserve shared Lead data; do not substitute expected close |
| Subscription end date | End Date — `f7d0c52b9990546dcc19f642ab24feed5c764b21` | Existing date or blank | Explicitly known term end in the same scope as start; not automatically cancellation or next billing date | Only when a bounded end is evidenced / No | Review inverted pair and 100 start-only Deals; no synthetic end dates |
| Billing cadence | Billing Period — `f8c3a08821cf4dc91a9887cb5ccdfe27edf09943` | Existing enum IDs 105–108 below | Invoice cadence for the relevant arrangement; finance/integration owner | When relevant to operational handoff / No | Clarify Bi-Annually; do not equate with contract duration or product recurrence without validation |
| Billing contact | Billing contact — `4f15c06c68f43af7ffc59080ec59ae769c052519` | Person reference | Actual billing communication contact for the arrangement; billing/account owner | Before relevant billing handoff / No | Preserve bill-to/shared-services associations distinct from primary sales contact |
| Admin contact | Admin contact — `d344e20716f2a4ab7a3638f503c42fe48794c1c7` | Person reference | Operational administrator/contact for the arrangement; operational owner | Before relevant service handoff / No | A selected contact is not evidence of product permissions |
| Enquiry reason | Reason — `b3da447d50a98bb31150324fc3cb262e070fc313` | Existing text | Why the prospect enquired or the use case under consideration; source/seller | When known / Optional | Keep distinct from Lost reason; review geographic-only value and shared archived-Lead use |
| UTM source | UTM source — `f693efce5556eedba6b97b2f331725db59d42265` | Existing text | Captured campaign source token; capture system | Integration-managed / No | Keep; eight current Lead values despite zero Deal values |
| UTM medium | UTM medium — `b9636afc9d4130a03abcc3efbbb909cfe506566a` | Existing text | Captured campaign medium token | Integration-managed / No | Keep; eight current Lead values |
| UTM campaign | UTM campaign — `4f7cefd99083a61e924546074d04acfc288ba8f6` | Existing text | Captured campaign identifier/token | Integration-managed / No | Keep; 129 current Lead values |
| UTM term | UTM term — `257d944dee8ba339189723f816d5af57d094e4b6` | Existing text | Captured campaign keyword/term token | Integration-managed / No | Keep; eight current Lead values |
| UTM content | UTM content — `79e377383b6c58cb1ec6d2a5ce7884d04e6a830e` | Existing text | Captured creative/content token | Integration-managed / No | Keep; eight current Lead values |
| Captured country, if source confirmed | Geo country — `5eac4faaa96e6eb9f5a4be23aaf0eb83bb3bcb91` | Existing text | Geography captured by the acquisition system; derivation unverified | Integration-managed / No | Retain seven Deal and 255 current Lead values; not legal or hosting country |
| Captured city, if source confirmed | Geo city — `0167e69958db752b08e8efb99d4fa6ef6c198473` | Existing text | Geography captured by the acquisition system; derivation unverified | Integration-managed / No | Retain seven Deal and 255 current Lead values; not Organization address |

Shared Lead usage also includes 242 archived Start Date/End Date values and 478 archived Reason values. Field or option deletion would affect that context. Deal creation visibility and Lead capture/mapping must be tested separately; simplifying the Deal form is not permission to erase Lead history or change every capture form.

## Allowed custom options and meanings

Keep all current IDs, including zero-use values. The audit has complete population tables; this section defines the proposed interpretation without approving contractual rights.

| Field | Existing option IDs / values | Definition or qualification |
| --- | --- | --- |
| Marketing Source | 32 Partner; 33 Google Adwords; 34 Referral; 38 Phone; 42 Web; 175 Prospecting; 208 Email Campaign; 294 Consultant | Business source categories. Partner/Consultant/Referral need the actual attribution context; they do not automatically designate a reseller/distributor or approve commission. First versus last touch remains an owner decision. |
| Lost-to competitor | 262 DocuSign; 263 AdobeSign; 264 emSigner; 265 SignNow; 266 SignEasy; 267 Signi; 268 PandaDoc; 269 SigningHub; 270 Autenti; 271 Nintex eSign; 272 Dropbox Sign; 273 Xodo Sign (EverSign); 274 Zoho Sign; 275 RightSignature; 280 Nitro Sign; 276 Other | Competitor in the recorded loss. Other needs contextual evidence; no automatic selection from Lost reason keywords or marketing intelligence. |
| Plan / offer | 109 Pro; 110 Business; 111 Enterprise; 112 Ultimate; 174 GovSign; 251 DigiSign; 113 Promo Pro; 114 Promo Business; 115 Other; 155 Trial Pro; 156 Trial Business; 398 Start; 399 Trial Start | Preserve the actual offer selection. A CRM option does not establish current product availability, price, entitlement or eligibility. Legacy selections need a versioned source mapping before catalog harmonization. |
| Hosting / deployment target | 128 United Arab Emirates; 129 Saudi Arabia; 130 Qatar; 131 Europe; 221 USA; 222 Australia | Geographic choices at their current level of precision; Europe is not a country. No data-residency compliance claim follows from the tag alone. |
| Hosting / deployment target | 247 TDRA FedNet Cloud - UAE; 250 DDA Shared Services Infrastructure | Specific named environments. Do not flatten them to a generic country and lose environment identity. |
| Hosting / deployment target | 278 OnPrem Deployment; 279 Self-Hosting Deployment | Deployment modes; geographic region is unspecified in this field. Do not guess a country from the customer's address. |
| Billing cadence | 105 Annually; 106 Bi-Annually; 107 Quarterly; 108 Monthly | Preserve four IDs. Annually/Quarterly/Monthly retain ordinary cadence meanings; ID 106 requires source-owner confirmation before any more precise relabeling or recurrence mapping. |

Commercial Volume stays text because the recorded rule allows combinations such as **100 users**, **8,000 transactions per year**, or **5,000 transactions per year with 25 users**. These are illustrative formats, not customer data. Preserve whether volume is expected or contracted in the relevant record context; do not put account priority, plan names, fees or deployment wording in this field. Product quantity alone cannot supply those units.

## Loss, source, participants and labels

Native Lost reason keeps its configured labels and free text. The duplicate User adoption challenges entries (IDs 116 and 122) need a dependency/owner decision before deduplication; returned text does not identify which ID was selected. Custom Enquiry reason remains separate. Lost-to competitor is conditional, not required for a loss caused by budget, inactivity or poor fit.

Native `origin` describes how the record was created; `channel` and `channel_id` describe a native source and its reference. Marketing Source describes business attribution only if that definition is approved. UTM and Referral URL preserve source evidence. The current representations cannot be collapsed safely just because their labels overlap: preserve custom-only/native-only values and establish a source-of-truth crosswalk first.

Native primary Organization is not universally interchangeable with payer, reseller, distributor or end-user entity. Before changing its meaning, confirm current agreements and integration/report contracts. Keep the existing transaction-level Reseller/Distributor links and Billing/Admin contact references. Their selections do not automatically modify Organization Customer role/Partner type or Person operational roles. Where a deal-specific association is insufficient for a subscription's multi-entity arrangement, refer to the authoritative arrangement record rather than inventing another global CRM classification.

Labels remain the existing native multiple-selection field with 22 IDs. Preserve event provenance and meaningful tactical tags; review owner-style labels against native Owner without silently transferring responsibility. Important is not automatically Organization Priority, CUSTOMER is not a reliable active-subscription indicator, and product-named tags are not automatically Plan. Preserve Upsell's current evidence without introducing a new general opportunity-type field solely for two labeled records.

## Native system properties remain managed

Keep every standard property in the [audit inventory](pipedrive-deal-fields-audit.md#complete-standardsystem-inventory), without additional human creation inputs or mandatory rules:

- Identity/provenance: `id`, `creator_user_id`, `add_time`, `update_time`, `stage_change_time`, `origin`, `origin_id`, `is_deleted`.
- Outcome/archive history: `won_time`, `lost_time`, `close_time`, `first_won_time`, `local_won_date`, `local_lost_date`, `local_close_date`, `is_archived`, `archive_time`.
- Activity references/counts: `next_activity_id`, `last_activity_id`, `activities_count`, `done_activities_count`, `undone_activities_count`.
- Communications: `email_messages_count`, `last_incoming_mail_time`, `last_outgoing_mail_time`, `smart_bcc_email`.
- Native counts: `files_count`, `notes_count`, `followers_count`, `participants_count`, `products_count`.
- Product-based monetary metrics: `mrr`, `arr`, `acv`; keep their exact currency/representation and source context. They are not manually completed CRM revenue fields.

Retain legacy `user_id`, `pipeline`, `label`, activity-date, weighted-value and monetary-currency aliases where existing readers require them. Modern v2 reads use the keys above. The `currency` companion and optional `source_lead_id` conversion lineage are also retained; the latter is a response property, not an extra custom field. Null probability overrides, null derived metrics and zero counters have distinct meanings.

## Suggested form and stage requirements

Keep creation short: Title, correct Pipeline/Stage, default/responsible Owner, Organization/Person, optional Value/Currency, expected close when known, optional Commercial Volume and proposed Plan. Expose Reseller/Distributor only when relevant. Enquiry reason can remain a simple input. Attribution capture, UTM, geography, subscription identity/term, Billing/Admin contact and validator/integration properties belong in detail or the relevant handoff workflow. This is a form proposal; actual pipeline-specific visibility was not verified beyond available metadata.

Before value-bearing Proposal/Negotiation/Contracting work, the owner should confirm customer scope, amount basis/currency, volume where relevant, expected decision date and next action. Candidate stage IDs include Circularo Proposal 102 / Negotiation 117 and Strategic Proposal 126 / Contracting 127. This does not approve required-field configuration or demand fabricated data on Idea/Exploring, On hold, legacy history or operational subscription records.

Before implementation, Sales Operations/CSO approves stage semantics, probability policy, forecast membership and names; Finance/commercial owners approve amount/cadence/party meaning; marketing/integration owners approve shared Lead source fields and conversion behavior; subscription owners approve operational fields and lineage. The [cleanup plan](pipedrive-deal-cleanup-plan.md) records the safe sequence and unresolved dependencies.
