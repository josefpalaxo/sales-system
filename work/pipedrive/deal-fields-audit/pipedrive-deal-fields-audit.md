---
title: Pipedrive deal fields audit
status: draft
classification: confidential
owner: role:cso
---

# Pipedrive deal fields audit

Read-only review dated **October 17, 2026, America/Los_Angeles**. Live Pipedrive is the primary source. ClickHouse is excluded by user instruction; Odoo, product-manager state, contract records and external automation configurations were not audited. No CRM records, fields, options, stages, probabilities, filters or automations were changed.

The main problem is semantic overlap: sales opportunities, subscription administration and historical deals share fields and reporting surfaces. Clean up their definitions and scoped review queues before changing the schema. **There are 23 custom fields; 18 have Deal values, and the other five have Lead values. None is demonstrated to be unused across the shared schema. No new custom field or immediate field deletion is recommended.**

## Evidence and coverage

| Source | Verified coverage |
| --- | --- |
| Deal field metadata | 72 v2 definitions: **23 custom and 49 standard/system**; 71 v1 entries include alternate names and companion fields |
| Non-archived Deals | **1,266**, fully paginated: 462 open, 246 won, 558 lost |
| Archived Deals | **1,153**, separately paginated: two open, 1,151 lost |
| Combined Deal census | **2,419 unique IDs**, no duplicate or overlapping IDs between the two populations; no deleted records included |
| Main Deal collection | 2026-10-17 07:10:34–07:10:40 UTC, October 17 00:10 PDT; later targeted verification and dependency reads are separate |
| Reference entities | Fresh complete accessible censuses of 5,229 Organizations, 13,299 Persons, and the user directory |
| Process configuration | Four pipelines and all 32 current stages; official MCP independently returned the same stage count |
| Products | 317 attachment rows across all 299 Deals with a positive native product counter |
| Filters | All 19 accessible Deal filters and full conditions inspected |
| Shared Lead dependencies | All 724 accessible non-archived and 526 archived Leads inspected for these custom-field keys only; this is not a complete Lead process audit |
| Verification | 11 representative Deals re-read individually, with all custom values matching the census; three also read through v1; official MCP independently verified the inverted date pair |
| Metadata consistency | Complete v2 definitions unchanged between start and end of main collection |

Every Deal returned all 23 discovered custom keys and every v2 standard key when optional response fields were requested. Omitting a custom-field subset returned the complete custom collection, avoiding the 15-key subset limit. Both Deal endpoints reached terminal cursors. This is an enumeration of accessible records, not a transactionally frozen database snapshot or an audit of all user-level visibility.

Leads share Deal custom-field definitions. The official MCP supplied the non-archived Lead census; the verified company API supplied archived Leads after the global legacy route returned 404. The shared-field check materially changes the retirement assessment below.

Definitions, complete actual custom-value distributions and counts, example IDs, all source records, product rows and review queues are in Git-ignored [local evidence](local/). No credentials, contact details, individual deal titles, customer-level values or raw CRM exports are reproduced here. This is a confidential draft for review, not an approved dictionary or implementation authorization.

## Statistical definitions and denominators

Unless otherwise stated, population and percentages use **all 2,419 Deals**, including archived history. The custom inventory also provides non-archived counts out of 1,266. A populated scalar is non-null and not whitespace; zero and false are populated native values. Distinct values are exact raw values; Labels count distinct combinations. Per-option counts may overlap for multi-selects.

The operational sales review cohort is **438 non-archived open Deals in Circularo (20) and Strategic Deals (23)**. It includes 133 On hold and 35 in a stage named Lost. A narrower progression cohort excludes those two stages and contains **270** Deals. Legacy pipeline 18 and subscription pipeline 21 are not silently included in sales-completeness metrics. Missing fields can be legitimate at early stages; these counts are review queues, not a requirement to invent values.

## Current pipeline and stage model

| Pipeline ID / name | All Deals | Open | Won | Lost | Archived | Non-archived |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 18 OLD Circularo [Archive] | 1,205 | 13 | 39 | 1,153 | 1,151 | 54 |
| 20 Circularo | 938 | 430 | 2 | 506 | 2 | 936 |
| 21 Subscriptions | 266 | 11 | 205 | 50 | 0 | 266 |
| 23 Strategic Deals | 10 | 10 | 0 | 0 | 0 | 10 |
| Total | 2,419 | 464 | 246 | 1,709 | 1,153 | 1,266 |

An “Archive” pipeline name does not archive a record: pipeline 18 still has **54 non-archived Deals**, including 13 open. Conversely, two Circularo Deals are archived while their native status remains open. Archive state and commercial outcome are distinct.

Subscriptions contributes **205 of 246 won Deals** and its stages mostly describe plans, not sales progression. A combined won count, stage conversion rate or forecast across all four pipelines would mix different processes. Actual subscription entitlement, invoice status and current recurring revenue cannot be established from Won or a plan-named stage.

All configured stages are listed below. Probability is configured stage metadata, not the observed effective probability of every Deal. Deal overrides and pipeline settings also matter. Subscription pipeline disables deal-probability overrides; the other three enable them.

| Pipeline | Stage ID | Order | Current stage | Configured probability | All Deals | Non-archived open |
| --- | ---: | ---: | --- | ---: | ---: | ---: |
| 18 | 97 | 1 | Idea | 0% | 110 | 1 |
| 18 | 83 | 2 | Lead In | 0% | 460 | 11 |
| 18 | 85 | 3 | Circularo Account (trial) | 5% | 243 | 0 |
| 18 | 84 | 4 | First Contact Made | 10% | 123 | 1 |
| 18 | 88 | 5 | Follow-ups | 25% | 150 | 0 |
| 18 | 86 | 6 | Proposal Made | 30% | 112 | 0 |
| 18 | 89 | 7 | Production | 80% | 3 | 0 |
| 18 | 87 | 8 | Paid Account | 100% | 3 | 0 |
| 18 | 90 | 9 | Renewed | 100% | 1 | 0 |
| 20 | 104 | 1 | Idea | 0% | 27 | 27 |
| 20 | 103 | 2 | Lead in | 0% | 64 | 64 |
| 20 | 100 | 3 | First Contact | 10% | 60 | 53 |
| 20 | 167 | 4 | Trial Account | 100% | 14 | 13 |
| 20 | 101 | 5 | Follow-up | 20% | 11 | 10 |
| 20 | 102 | 6 | Proposal | 30% | 69 | 68 |
| 20 | 117 | 7 | Negotiation | 60% | 26 | 25 |
| 20 | 121 | 8 | On hold | 0% | 238 | 133 |
| 20 | 122 | 9 | Lost | 0% | 429 | 35 |
| 21 | 105 | 1 | Pro | 100% | 26 | 2 |
| 21 | 106 | 2 | Business | 100% | 91 | 2 |
| 21 | 107 | 3 | Enterprise | 100% | 12 | 0 |
| 21 | 108 | 4 | Ultimate | 100% | 15 | 0 |
| 21 | 152 | 5 | Ultimate (Shared Services) | 100% | 9 | 1 |
| 21 | 178 | 6 | DigiSign / GovSign | 100% | 7 | 0 |
| 21 | 109 | 7 | Promo Pro | 100% | 17 | 0 |
| 21 | 110 | 8 | Promo Business | 100% | 30 | 0 |
| 21 | 111 | 9 | Others | 100% | 5 | 0 |
| 21 | 120 | 10 | Closed | 100% | 55 | 6 |
| 23 | 128 | 1 | Exploring | 0% | 7 | 7 |
| 23 | 123 | 2 | Qualifying | 10% | 2 | 2 |
| 23 | 126 | 3 | Proposal | 25% | 1 | 1 |
| 23 | 127 | 4 | Contracting | 80% | 0 | 0 |

No unavailable stage/pipeline reference or pipeline–stage mismatch was found. All explicit Deal probabilities are within 0–100. **13 non-archived open Trial Account Deals** have zero value; five have a 50% override and eight have no explicit override. The stage's 100% default deserves owner review, but this snapshot does not demonstrate positive-value forecast inflation from those 13 records. A null override is not a zero probability.

## Complete custom-field inventory

| Current name / inferred purpose | Stable API key | Type | All populated / 2,419 | Non-archived / 1,266 | Distinct | Recommendation |
| --- | --- | --- | ---: | ---: | ---: | --- |
| Commercial Volume — licensed users/transactions, sometimes other text | `89de8ed94e3caded8b428a8d4b27f1e3e8a7ab31` | varchar | 229 (9.47%) | 229 | 193 | Keep text; define units and period; review six clear non-volume entries |
| Reseller — organization acting in this transaction | `e428b2794b0ab18a55784c7c63bfb20a819cb4ab` | org | 584 (24.14%) | 500 | 104 | Keep; distinct from organization primary Partner type |
| Distributor — organization acting in this transaction | `a1feb77f12a6056652f1656f955d5dfee416c973` | org | 927 (38.32%) | 282 | 40 | Keep; review one unavailable reference and role overlaps |
| Marketing Source — business acquisition attribution | `83d355814afab519b5a10d56268db6dbeb9c0c11` | enum | 528 (21.83%) | 385 | 7 | Keep pending source/channel semantics and mapping review |
| Referral URL — captured referral/landing source | `f84448edbf816bcc6331ae317d8755def31c277a` | varchar | 43 (1.78%) | 43 | 7 | Keep as source evidence; check one missing scheme |
| Referred by — introducing Person | `87a07677ce4aa795ceb36ef7daaabaa76033fe67` | people | 251 (10.38%) | 61 | 69 | Keep; one reference resolves to a deleted Person |
| Lost to — competitor on a lost opportunity | `999c7186e12ded126682482ee1a7ec9e1eca60d5` | enum | 28 (1.16%) | 28 | 5 | Keep; five selections are on non-lost Deals |
| Plan — plan/product family and offer variants | `b2c8c4e77e70df0cd7a0e6bcbf5890253ebcfb4c` | enum | 715 (29.56%) | 715 | 11 | Keep IDs; clarify Plan / offer and pipeline-specific meaning |
| Subscription ID — subscription reference | `70552a4c0ba614629f95928dac186d06be25b63d` | varchar | 233 (9.63%) | 233 | 233 | Keep; normalize spacing only after writer/identity confirmation |
| Data Region — geographic and deployment target | `2b23d940cc1caeea6e4906e25ae3449971fc312b` | enum | 940 (38.86%) | 939 | 10 | Keep; proposed Hosting / deployment target avoids claiming every option is a region |
| Start Date — intended/current subscription term boundary | `62ee31e3f4c3acea108c641b1198f6db89510aca` | date | 115 (4.75%) | 115 | 107 | Keep pending term/authority definition; also populated on archived Leads |
| End Date — intended/current subscription term boundary | `f7d0c52b9990546dcc19f642ab24feed5c764b21` | date | 15 (0.62%) | 15 | 15 | Keep; correct inverted term only from verified source |
| Billing Period — billing cadence | `f8c3a08821cf4dc91a9887cb5ccdfe27edf09943` | enum | 194 (8.02%) | 194 | 4 | Keep; clarify Bi-Annually before mapping to product cadence |
| Billing contact — transaction/service billing recipient | `4f15c06c68f43af7ffc59080ec59ae769c052519` | people | 192 (7.94%) | 192 | 161 | Keep; not a duplicate of primary sales contact |
| Admin contact — transaction/service operational administrator | `d344e20716f2a4ab7a3638f503c42fe48794c1c7` | people | 183 (7.57%) | 183 | 180 | Keep; not automatic product permissions |
| Reason — enquiry/use-case context | `b3da447d50a98bb31150324fc3cb262e070fc313` | varchar | 31 (1.28%) | 31 | 7 | Keep; proposed Enquiry reason; not native Lost reason |
| UTM source | `f693efce5556eedba6b97b2f331725db59d42265` | varchar | 0 | 0 | 0 | Keep: eight non-archived Leads contain values |
| UTM medium | `b9636afc9d4130a03abcc3efbbb909cfe506566a` | varchar | 0 | 0 | 0 | Keep: eight non-archived Leads contain values |
| UTM campaign | `4f7cefd99083a61e924546074d04acfc288ba8f6` | varchar | 0 | 0 | 0 | Keep: 129 non-archived Leads contain values |
| UTM term | `257d944dee8ba339189723f816d5af57d094e4b6` | varchar | 0 | 0 | 0 | Keep: eight non-archived Leads contain values |
| UTM content | `79e377383b6c58cb1ec6d2a5ce7884d04e6a830e` | varchar | 0 | 0 | 0 | Keep: eight non-archived Leads contain values |
| Geo country — captured geography, source unconfirmed | `5eac4faaa96e6eb9f5a4be23aaf0eb83bb3bcb91` | varchar | 7 (0.29%) | 7 | 2 | Keep; also 255 non-archived Leads; not a hosting or legal country |
| Geo city — captured geography, source unconfirmed | `0167e69958db752b08e8efb99d4fa6ef6c198473` | varchar | 7 (0.29%) | 7 | 3 | Keep; also 255 non-archived Leads; do not overwrite Organization address |

## Actual configuration

All 23 custom fields are active, editable, searchable, filterable, sortable and bulk-editable in v1 metadata. All are visible in detail and have false mandatory/important flags. Only **Commercial Volume** and **Lost to** have non-empty descriptions. No retired field history is inferred.

| Group ID | Fields | On Deal creation |
| --- | --- | --- |
| 1 | Commercial Volume, Reseller, Distributor | All three |
| 3 | Marketing Source, Referral URL, Referred by, Lost to | Marketing Source and Referral URL only |
| 8 | Plan, Subscription ID, Data Region, Start Date, End Date, Billing Period, Billing contact, Admin contact | Plan and Data Region only |
| 16 | Reason | Yes |
| null | Five UTM fields, Geo country, Geo city | None |

Group display names and actual UI layout were not verified. The documented extended v2 visibility/importance/required namespace request returned **403**. The available v1 flags do not independently establish every pipeline/stage-specific UI restriction or status requirement. No mandatory/important setting was changed.

## Findings requiring review

### Sales hygiene needs stage-aware review

| Review condition | All 438 open non-archived sales Deals | Narrower 270 progression Deals |
| --- | ---: | ---: |
| Zero value | 272 | 173 |
| No expected close date | 286 | 172 |
| Expected close before October 17, 2026 | 65 | 16 |
| No next-activity reference | 346 | 224 |
| No Commercial Volume | 285 | 169 |
| Inactive owner | 19 | 10 |

The narrower cohort excludes On hold and the stage named Lost. Even there, an Idea/Exploring record need not have a confirmed proposal value. Review qualification and ownership rather than bulk-filling zero values, arbitrary close dates or default quantities. Across all pipelines, 21 non-archived open Deals have inactive owners; 1,257 Deals overall have inactive owners, mostly history. All 20 referenced Deal owner IDs resolved.

**35 open Deals in stage Lost** and **six open Deals in subscription stage Closed** demonstrate that stage names and native outcome are not kept equivalent. Investigate the intended outcome before changing either; subscription closure may be an operational event rather than a new sales loss. Two archived open Deals also need an explicit disposition if current work is expected.

### Amounts, units and product quantities must remain distinct

There are 1,661 zero-valued Deals and no negative values. Zero is stored data, not necessarily a missing estimate or a free-contract decision. Currency distribution is USD 1,762; AED 644; CZK two; EUR one; custom `H_5` eight; custom `_8H` two. Currency metadata confirms the latter two are **inactive custom currencies with display names CZK and EUR**, respectively. They are not unrecognized records, and their financial mapping must not be guessed from display names. No currency conversion or mixed-currency amount total was calculated.

All 299 positive product counters were verified against product attachments: **317 rows, 316 enabled**. For every one of those Deals, `products_count` equals the sum of enabled product quantities, not necessarily the number of attachment rows. One Deal reports 2,000 and another 20 because of quantity. Do not use that native counter as a row count, licensed users or annual transactions without unit evidence.

Attachments contain 128 one-time, 188 annual and one quarterly billing frequency selections, including the one disabled row. Native MRR/ARR/ACV are non-null on 298 Deals; MRR and ARR are positive on 179, ACV on 214. One archived lost Deal with products has null native revenue metrics. These native values are not a complete subscription ledger or independently validated booked revenue. Product prices, cadence, contract term and Deal value need agreed scope before any reconciliation.

Commercial Volume intentionally supports users, annual transactions and combinations, as recorded in Confluence. Of 229 current values, seven lack the literal English user/transaction tokens: six contain other concepts such as priority, offer/deployment wording or support renewal, and one is a Czech transaction expression. Preserve meaning and confirm units before correction. A numeric-only replacement would lose legitimate mixed-unit descriptions. No extra Users/Transactions custom fields are justified by this audit alone.

### Subscription fields mix commercial snapshots and operational state

Subscription ID is populated on 233 Deals and is unique even after normalization. **209** contain spacing around the identifier separator; removing whitespace makes **all 233** conform to `CLI-<digits>`, with 233 distinct normalized identifiers. This is a formatting finding, not 209 invalid subscriptions. No external product identity lookup was performed. Thirty-seven of the 266 subscription-pipeline records lack an ID; some may be historical, trials or other workflows.

Start Date has 115 values, End Date 15; all 15 ends have a start, leaving **100 start-only terms**. One end precedes its start by a day, independently confirmed by the official MCP. Do not infer missing end dates from cadence or overwrite them from expected close. Billing Period's **Bi-Annually** label has one assignment and is ambiguous without an agreed six-month versus two-year meaning; preserve ID 106 until confirmed.

Plan mixes product family, commercial tiers and Promo/Trial variants. Subscription stages repeat many of those categories, while Closed is a state. Some stage/Plan pairs differ and 23 subscription-pipeline records lack Plan; none can be corrected merely by copying stage labels. Data Region also mixes six geographic choices, two named environments and two deployment modes. Rename/define the existing field broadly before introducing more fields; do not infer hosting location from captured Geo country or a customer's address.

### Transaction participants are not redundant organization/person classifications

Reseller and Distributor are transaction-level organization links. They are not substitutes for the linked organization's current single primary Partner type. **177 Reseller-linked Deals** and **703 Distributor-linked Deals** do not match the respective current organization primary type, including blanks. These are descriptive comparisons, not proven bad historic arrangements or grounds to reclassify companies. A company can have different authorized roles across transactions.

Ten Deals name the same organization as both Reseller and Distributor. Five Reseller references and three Distributor references equal native Deal Organization. Review the actual transaction parties and who the native Organization represents; do not automatically clear channel roles or replace an end customer with an intermediary. Marketing Source=Partner appears on 45 Deals without either channel-organization link; a referral/partner arrangement can explain that.

One Distributor reference was absent from the organization census and returned **404** individually; deletion versus access/merge history remains unknown. One Referred by reference was absent from the non-deleted Person census but individual readback succeeded with **is_deleted=true**. That is a historical reference to a deleted Person, not an inaccessible endpoint.

Billing contact is populated on 192 Deals and Admin contact on 183; their affiliations differ from or are missing relative to the Deal organization on **54** and **22** records. Shared services, partners and bill-to arrangements can explain differences. They are distinct from the primary sales contact and from Organization BillingEntity/EndCustomer or global Person contact-role tags. No routing change is justified solely by these comparisons.

Native Organization is missing on 34 Deals, primary Person on 420, and **nine have neither**, all in archived history. Every populated native Deal Organization/Person link resolved in the accessible censuses. Do not fabricate a customer or contact to complete historical imports.

### Attribution and loss context need semantic separation

Custom Marketing Source has 528 values and native Source channel 363. Both are present on 330 Deals; **198 have custom source only**, **33 native channel only**, and 1,858 neither. Some paired values agree; others differ in granularity, for example a referral versus a capture mechanism. Native origin identifies creation mechanism, not the complete business acquisition source. There is no approved lossless crosswalk yet; retain both representations and preserve UTM/referral evidence.

All five UTM fields are empty across Deals but used on shared Leads. Their emptiness does **not** authorize deletion or prove conversion is broken: the compared cohorts are different and individual conversion lineage was not audited. Test a real approved conversion/mapping before changing the source capture.

Custom Reason stores enquiry/use-case context, most commonly business evaluation, and is also heavily populated on archived Leads. It is not a duplicate of native Lost reason. One Deal's Reason contains only a country; investigate the capture mapping/value rather than blindly moving every Reason into loss reporting.

Native Lost reason is populated on 1,652 of 1,709 lost Deals; **57 lack a reason**, including 43 non-archived lost Deals. Stored values contain **175 distinct texts**, with 270 entries not exactly matching a currently configured label. Free text is supported; these are not invalid option IDs. Five Lost to competitor selections are on non-lost Deals; retain prior-loss/reopening context until reviewed.

## Every configured custom option

| Field | ID | Current value | Deal selections |
| --- | ---: | --- | ---: |
| Marketing Source | 32 | Partner | 152 |
| Marketing Source | 33 | Google Adwords | 75 |
| Marketing Source | 34 | Referral | 41 |
| Marketing Source | 38 | Phone | 3 |
| Marketing Source | 42 | Web | 79 |
| Marketing Source | 175 | Prospecting | 176 |
| Marketing Source | 208 | Email Campaign | 2 |
| Marketing Source | 294 | Consultant | 0 |
| Lost to | 262 | DocuSign | 13 |
| Lost to | 263 | AdobeSign | 4 |
| Lost to | 264 | emSigner | 3 |
| Lost to | 265 | SignNow | 0 |
| Lost to | 266 | SignEasy | 0 |
| Lost to | 267 | Signi | 0 |
| Lost to | 268 | PandaDoc | 0 |
| Lost to | 269 | SigningHub | 0 |
| Lost to | 270 | Autenti | 0 |
| Lost to | 271 | Nintex eSign | 0 |
| Lost to | 272 | Dropbox Sign | 0 |
| Lost to | 273 | Xodo Sign (EverSign) | 0 |
| Lost to | 274 | Zoho Sign | 3 |
| Lost to | 275 | RightSignature | 0 |
| Lost to | 280 | Nitro Sign | 0 |
| Lost to | 276 | Other | 5 |
| Plan | 109 | Pro | 31 |
| Plan | 110 | Business | 476 |
| Plan | 111 | Enterprise | 27 |
| Plan | 112 | Ultimate | 53 |
| Plan | 174 | GovSign | 43 |
| Plan | 251 | DigiSign | 18 |
| Plan | 113 | Promo Pro | 20 |
| Plan | 114 | Promo Business | 36 |
| Plan | 115 | Other | 9 |
| Plan | 155 | Trial Pro | 1 |
| Plan | 156 | Trial Business | 1 |
| Plan | 398 | Start | 0 |
| Plan | 399 | Trial Start | 0 |
| Data Region | 128 | United Arab Emirates | 662 |
| Data Region | 129 | Saudi Arabia | 48 |
| Data Region | 130 | Qatar | 42 |
| Data Region | 131 | Europe | 107 |
| Data Region | 221 | USA | 7 |
| Data Region | 222 | Australia | 2 |
| Data Region | 247 | TDRA FedNet Cloud - UAE | 38 |
| Data Region | 250 | DDA Shared Services Infrastructure | 18 |
| Data Region | 278 | OnPrem Deployment | 14 |
| Data Region | 279 | Self-Hosting Deployment | 2 |
| Billing Period | 105 | Annually | 190 |
| Billing Period | 106 | Bi-Annually | 1 |
| Billing Period | 107 | Quarterly | 1 |
| Billing Period | 108 | Monthly | 2 |

No undefined custom option ID was found. Zero Deal use is not permission to remove options from the shared Lead/Deal schema or a future writer's payload.

## Native option coverage

Native Source channel options/usage: 227 Lead Suggestions 26; 228 Web Forms 63; 226 Prospecting 164; 229 Chatbot 0; 231 Web visitors 3; 232 Email Campaigns 1; 233 Marketplace 0; 234 Messaging Inbox 2; 245 Partner 103; 376 Partner Program 1. Native origin: ManuallyCreated 2,008; API 409; Import two; Automation, Marketplace, Prospector, LeadSuggestion, WebForms, Chatbot, LiveChat, WebVisitors, Campaigns, MessagingInbox and WhatsAppBusiness zero. These are configured identifiers, not inferred acquisition channels.

Native Lost reason has 17 configured entries but 16 distinct labels. Counts below match stored text, not recoverable option-ID selections. IDs **116 and 122 share the same label** and cannot be allocated separately from returned text; their three matching rows are the same three records.

| Native Lost reason ID | Configured label | Exact text matches |
| --- | --- | ---: |
| 241 | Renewed with the existing solution | 17 |
| 23 | Too expensive | 12 |
| 24 | Lack of relationship | 116 |
| 25 | Bad proposal | 23 |
| 26 | Lack of communication | 732 |
| 27 | Wrong solution | 60 |
| 28 | Irrelevant | 381 |
| 60 | Missing features | 5 |
| 116 / 122 | User adoption challenges | 3 shared matches |
| 117 | Dissatisfaction with product performance | 0 |
| 118 | Switching to competitor solution | 9 |
| 119 | Budget constraints or downsizing | 0 |
| 120 | Ineffective customer support | 0 |
| 121 | Changed business requirements | 6 |
| 123 | Complex integration challenges | 2 |
| 124 | Stronger competitor offering | 16 |

Native Labels has 22 configured options, selected on 607 Deals in 67 combinations. Preserve the full names/IDs and values in ignored metadata. Event/provenance tags: 168 Gitex-2025 (13), 246 GISEC Global-2025 (one), 302 GITEX-2024 (four), 303 GITEX-2023 (six), 304 LEAP KSA-2024 (one). Other tags: 103 CUSTOMER (45), 64 Check status (one), 65 Important (143), 75 TENDER (30), 137 Upsell (two), 172 Govsign (55), 249 DigiSign (14), 305 Spanish (zero), 308 Partner (18). Person-named tags 104/167/256/287/296/392 have 300/265/47/16/14/6 selections; account/project-specific tags 248/254 have 14/four. Those names are intentionally not copied here. Their purposes and dependencies need review; labels do not establish current ownership, account priority, product entitlement or partner terms.

## Complete standard/system inventory

All 49 v2 native definitions below were returned on every Deal with optional fields requested. Zero/false are populated values, so a full counter column is not evidence that every record has activities or products. Currency is an additional monetary companion returned on all Deals, not a 50th v2 field definition.

| Native field | API key | Type | Populated / 2,419 | Exact distinct |
| --- | --- | --- | ---: | ---: |
| ID | `id` | int | 2,419 | 2,419 |
| Title | `title` | varchar | 2,419 | 2,414 |
| Owner | `owner_id` | user | 2,419 | 20 |
| Pipeline | `pipeline_id` | double | 2,419 | 4 |
| Stage | `stage_id` | stage | 2,419 | 31 |
| Status | `status` | status | 2,419 | 3 |
| Deal created | `add_time` | date | 2,419 | 2,392 |
| Update time | `update_time` | date | 2,419 | 971 |
| Last stage change | `stage_change_time` | date | 1,865 | 1,282 |
| Next activity | `next_activity_id` | activity | 165 | 165 |
| Last activity | `last_activity_id` | activity | 1,614 | 1,614 |
| Won time | `won_time` | date | 246 | 246 |
| Lost time | `lost_time` | date | 1,709 | 1,404 |
| Deal closed on | `close_time` | date | 1,955 | 1,650 |
| Lost reason | `lost_reason` | varchar_options | 1,652 | 175 |
| Visible to | `visible_to` | visible_to | 2,419 | 2 |
| Total activities | `activities_count` | int | 2,419 | 39 |
| Done activities | `done_activities_count` | int | 2,419 | 40 |
| Activities to do | `undone_activities_count` | int | 2,419 | 6 |
| Email messages count | `email_messages_count` | int | 2,419 | 197 |
| Creator | `creator_user_id` | user | 2,419 | 24 |
| Last email received | `last_incoming_mail_time` | date | 1,652 | 1,628 |
| Last email sent | `last_outgoing_mail_time` | date | 1,377 | 1,356 |
| MRR | `mrr` | monetary | 298 | 168 |
| ARR | `arr` | monetary | 298 | 168 |
| ACV | `acv` | monetary | 298 | 197 |
| Source origin | `origin` | enum | 2,419 | 3 |
| Source origin ID | `origin_id` | varchar | 0 | 0 |
| Source channel | `channel` | enum | 363 | 8 |
| Source channel ID | `channel_id` | varchar | 6 | 5 |
| Archive status | `is_archived` | boolean | 2,419 | 2 |
| Archive time | `archive_time` | date | 1,153 | 53 |
| Value | `value` | monetary | 2,419 | 427 |
| Organization | `org_id` | org | 2,385 | 2,100 |
| Contact person | `person_id` | people | 1,999 | 1,763 |
| Expected close date | `expected_close_date` | date | 480 | 238 |
| Probability override | `probability` | int | 354 | 16 |
| Labels | `label_ids` | set | 607 | 67 combinations |
| Files count | `files_count` | int | 2,419 | 25 |
| First won time | `first_won_time` | date | 320 | 320 |
| Followers count | `followers_count` | int | 2,419 | 7 |
| Is deleted | `is_deleted` | boolean | 2,419, all false | 1 |
| Local close date | `local_close_date` | date | 619 | 230 |
| Local lost date | `local_lost_date` | date | 507 | 163 |
| Local won date | `local_won_date` | date | 112 | 90 |
| Notes count | `notes_count` | int | 2,419 | 26 |
| Participants count | `participants_count` | int | 2,419 | 25 |
| Products count | `products_count` | int | 2,419 | 6 |
| Smart BCC email | `smart_bcc_email` | varchar | 2,419 | 2,419 |

All current won/lost Deals have their corresponding native won/lost timestamp and close_time. First won time is populated on 320, more than the current 246 won Deals: history/reopening can explain that. Sparse local-date fields are not evidence of missing actual close timestamps. Visible to is 1 Item owner on two Deals and 3 All users on 2,417; visibility was not changed.

v1 and v2 together expose 87 different keys, not 87 independent fields. Legacy v1-only keys include `user_id`, `pipeline`, `label`, activity dates, product summary properties, `sequence_enrollment`, `weighted_value` and monetary companion currencies. v2 uses `owner_id`, `pipeline_id`, `label_ids`, activity IDs and additional counters/local dates. The `currency` companion was returned for every Deal despite not being a separate v2 definition. Complete schemas remain local for migration mapping.

## Shared-field dependencies and remaining limits

| Shared field | Non-archived Leads / 724 | Archived Leads / 526 |
| --- | ---: | ---: |
| Commercial Volume | 1 | 0 |
| Reseller | 1 | 0 |
| Distributor | 0 | 0 |
| Marketing Source | 162 | 0 |
| Referral URL | 528 | 517 |
| Referred by | 0 | 0 |
| Lost to | 0 | 0 |
| Plan | 96 | 0 |
| Subscription ID | 0 | 0 |
| Data Region | 400 | 0 |
| Start Date | 0 | 242 |
| End Date | 0 | 242 |
| Billing Period | 0 | 0 |
| Billing contact | 0 | 0 |
| Admin contact | 0 | 0 |
| Reason | 0 | 478 |
| UTM source | 8 | 0 |
| UTM medium | 8 | 0 |
| UTM campaign | 129 | 0 |
| UTM term | 8 | 0 |
| UTM content | 8 | 0 |
| Geo country | 255 | 0 |
| Geo city | 255 | 0 |

No custom Deal-field reference was found in the 19 accessible Deal filter conditions, and a repository search found no prior reference to these 23 keys. This does not establish absence from private/Lead filters, web forms, integration code, automations, exports or external reports. The shared Lead data above is a confirmed dependency even though the Deal filters contain no custom reference.

Four exact normalized title/organization/pipeline groups repeat. Subscription renewals, copied opportunities or distinct periods may be intentional. These are not an approved merge list. Individual titles and mappings remain private.

The [partner deal-registration guide](../../../shared/playbooks/partners/Circularo%20Partner%20Deal%20Registration%20Guide.md) is a draft master, not approved policy. Its registration/pricing process does not justify speculative new Deal fields or approval flags in this audit. Existing agreement and source-system owners must confirm commercial and operational semantics. The Confluence [CRM Data Hygiene & Customization Log](https://circularo.atlassian.net/wiki/spaces/Sales/pages/735182849/CRM+Data+Hygiene+Customization+Log), version 14, provides the reported Commercial Volume rule; its prior instruction is not proof of complete current adoption.

Local evidence includes full v1/v2 definitions, unchanged after-metadata, six Deal pages, all custom distributions, `field-statistics.json`, `summary.json`, `stage-statistics.json`, `issues.json`, complete product attachments, user/reference censuses, filter conditions, currency definitions, representative and reference readbacks, repeated-title candidates, and shared Lead values/usage counts. One-off scripts remain ignored; no reusable audit framework was introduced.

Official interpretation references: [Deal Fields](https://developers.pipedrive.com/docs/api/v1/DealFields), [Deals](https://developers.pipedrive.com/docs/api/v1/Deals), [Deal Products](https://developers.pipedrive.com/docs/api/v1/DealProducts), and [Leads and shared custom fields](https://developers.pipedrive.com/docs/api/v1/Leads). Actual findings come from the live account evidence, not reference-page examples.

Continue with the [proposed Deal dictionary](pipedrive-deal-target-model.md) and [cleanup plan](pipedrive-deal-cleanup-plan.md).
