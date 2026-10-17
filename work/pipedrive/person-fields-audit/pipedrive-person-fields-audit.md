---
title: Pipedrive person fields audit
status: draft
classification: confidential
owner: role:cso
---

# Pipedrive person fields audit

Read-only audit dated **2026-10-16, America/Los_Angeles**. The primary source is the live Pipedrive API. ClickHouse is excluded by the user's latest instruction; Odoo and external integration configurations were not inspected. No Person, Organization, field, option, filter or automation was changed. Recommendations require owner review.

The practical priorities are to reconcile email validation with actual addresses, assign ownership for managed contacts, and distinguish contact roles from organization classifications. **All 12 custom fields have stored values; none can be deleted merely because it is unused. No new custom field is recommended.**

## Scope and evidence

| Evidence | Coverage |
| --- | --- |
| Current field definitions | 53 v2 definitions: **12 custom, 41 standard/system**; 55 v1 entries cover legacy aliases and address components |
| Person values | **13,299 unique accessible, non-deleted Persons**, all 12 custom keys explicitly requested on every record |
| Collection window | 2026-10-17 06:51:12–06:51:37 UTC; October 16, 23:51 PDT |
| Organization references | Complete accessible census of 5,229 organizations; native and custom organization references checked against IDs |
| Ownership | All 22 referenced owners resolved against the live user directory, including inactive users |
| Filters | All 28 accessible Person filters and their full conditions inspected |
| Record verification | Eight representative records re-read individually; custom values matched the census. Official MCP independently confirmed one contact with valid status and no email |
| Reference verification | Five absent introducer IDs queried individually; all returned HTTP 404, affecting eight contacts |
| Schema consistency | v2 field definitions unchanged between collection start and end |
| Historical instructions | Confluence CRM Data Hygiene & Customization Log, version 14, dated March 9, 2026 |

Pagination completed through a terminal cursor; no duplicate Person IDs occurred across 27 pages. This is a complete API enumeration of visible records, not a transactionally frozen database snapshot or evidence of unrestricted visibility for every account/user. It excludes deleted contacts and inaccessible records. A 404 does not establish whether a referenced person was deleted, merged or is inaccessible.

The official account-context MCP tool returned “Tool get_account_context not found.” Existing administrator API credentials were verified against the active Circularo account and used for complete extraction and schema endpoints. The official individual Person tool worked for verification. Credentials were never copied into audit outputs.

Raw records, complete actual custom-value distributions, source IDs, duplicate candidates and verification payloads remain in Git-ignored [local evidence](local/). Names, addresses, email addresses, telephone numbers, biographies and row-level exports are not reproduced here.

## Statistical definitions

Population percentages use all **13,299 Persons**. Populated means a non-null, non-whitespace scalar or a collection with actual non-empty values; zero and false are legitimate populated system values. Email and phone population counts Persons with at least one non-empty address/number, not serialized non-null arrays. Distinct values are exact stored values; set fields count distinct combinations. Per-option usage counts selections and can overlap.

Duplicate email candidates use trimmed, case-insensitive address equality across different Persons. Telephone candidates strip punctuation and a leading international `00` prefix without guessing country codes or extensions. Name candidates use normalized name plus native organization. These methods produce review candidates, not verified duplicate people or merge instructions. Basic email syntax and phone-length checks do not test deliverability or ownership.

## Complete custom-field inventory

| Current name / inferred purpose | Stable API key | Type | Populated | Distinct | Recommendation |
| --- | --- | --- | ---: | ---: | --- |
| Status — contact relationship lifecycle | `4a36906ca2ce42e649a8cdc2f5959fb09a7037b8` | enum | 602 (4.53%) | 6 | Keep; optionally rename Contact status; define managed-contact scope |
| Persona — relationship and buying roles | `1570adcfb0bce32b1129c18901682f01d5bce5f8` | set | 393 (2.96%) | 30 | Keep multi-select; proposed Relationship roles; review Distributor meaning |
| Followers — likely external/social audience count | `2c24bfceda164ef253552b32a71f4aa67bd8b349` | double | 21 (0.16%) | 19 | Clarify provenance; conditional rename; do not merge into native followers |
| LinkedIn profile — person profile URL | `524c1fb2473916338f2360db0378cb99bb2c298a` | varchar | 6,060 (45.57%) | 6,043 | Keep; normalize carefully; one filter dependency |
| About — short contact context/headline/biography | `51db565ad71813d83000580cea0ad1beb76a28f3` | text | 86 (0.65%) | 85 | Keep as curated summary; separate from job title and dated notes |
| Email Status — stored email validation result | `84e3203ff45c4e26ada44aa887c3f47dcdb8e8ae` | enum | 8,355 (62.82%) | 5 | Keep; proposed Email validation status; reconcile address linkage and freshness |
| Language — mixed language preference/skills text | `63a69c2f4d71802df5f43caf25bc49a72bcdca6c` | varchar_auto | 1,925 (14.47%) | 46 | Keep existing type; define preference vs skills before normalization |
| Introduced By — referring Person | `b5e14e8dd6e08f2fbc01c445351347fc7a97413e` | people | 392 (2.95%) | 226 | Keep; review eight missing-reference rows and one self-reference |
| Contact Source — acquisition channel/event/referrer text | `26701eb6288417495c36ba20a76e9a4aea3f69b2` | varchar_auto | 883 (6.64%) | 58 | Keep; normalize safe aliases; preserve event and referral detail |
| Synchronize — affirmative integration request | `03dad96d483efd99a4e778704a4ba8886304a211` | enum | 793 (5.96%) | 1 | Keep; proposed Sync to Odoo subject to integration-owner confirmation |
| Contact type — operational contact responsibilities | `183206092fc769f0789dd3f4156a2d8492105b51` | set | 415 (3.12%) | 8 | Keep multi-select; proposed Operational contact roles |
| Related organization — additional operational organization reference | `8cf5f127081ed2f83cf140fd1e4a4615d7c20814` | org | 128 (0.96%) | 79 | Keep pending dependency/meaning review; 118 equal native organization |

Purpose is inferred unless supported by the recorded rule or native field semantics. In particular, social-follower provenance and Related organization's exact integration contract remain unconfirmed.

## Actual configuration

All 12 custom fields are active, editable, bulk-editable, filterable, sortable and searchable according to v1 metadata. All are visible in detail, technically optional, not marked important, and have **no description**. Current creation visibility and group IDs:

| Field | Group ID | Creation form |
| --- | ---: | --- |
| Status | 14 | Yes |
| Persona | 14 | Yes |
| Followers | 14 | No |
| LinkedIn profile | 14 | Yes |
| About | 14 | Yes |
| Email Status | 7 | Yes |
| Language | 7 | Yes |
| Introduced By | 7 | Yes |
| Contact Source | 7 | Yes |
| Synchronize | 13 | No |
| Contact type | 13 | No |
| Related organization | 13 | No |

Group display names were not returned by the inspected APIs and are not inferred. The extended v2 `ui_visibility,important_fields,required_fields` request returned **403**. v1 flags are therefore the available configuration evidence; no visual UI inspection or independent extended-namespace confirmation was performed. No inactive custom field was returned; deleted-field history is outside coverage.

Native Name, Owner and Visible to have legacy mandatory flags. Native Organization, Phone, Email, Job title and Labels are on creation but optional. First/last names, postal address, native Notes, Birthday and instant messenger are not on creation. Legacy mandatory flags on IDs and counters describe system metadata, not manual input requirements.

## Every configured custom option and its usage

| Field | Option ID | Current label | Persons |
| --- | ---: | --- | ---: |
| Status | 327 | Lead | 295 |
| Status | 328 | Active | 167 |
| Status | 329 | Re-engage | 35 |
| Status | 330 | Dormant | 65 |
| Status | 331 | Disqualified | 4 |
| Status | 332 | Former | 36 |
| Persona | 318 | Investor | 31 |
| Persona | 319 | Business Champion | 155 |
| Persona | 320 | Distributor | 30 |
| Persona | 321 | Reference | 1 |
| Persona | 322 | Connector | 250 |
| Persona | 323 | Talent | 2 |
| Persona | 324 | Technical Buyer | 216 |
| Persona | 325 | Security Owner | 14 |
| Persona | 326 | Procurement | 25 |
| Email Status | 339 | valid | 3,670 |
| Email Status | 340 | invalid | 481 |
| Email Status | 341 | accept_all_unverifiable | 1,678 |
| Email Status | 342 | unknown | 2,513 |
| Email Status | 343 | disposable | 13 |
| Synchronize | 317 | Yes | 793 |
| Contact type | 289 | Billing | 256 |
| Contact type | 290 | Admin | 264 |
| Contact type | 291 | Technical | 2 |
| Contact type | 292 | Support | 4 |

No out-of-definition option ID was found in any custom option field or native Labels/Visible to. Persons have **six** Status options; Organizations' additional Prospect option is not present here. Do not copy Organization option IDs into Person fields.

## Confirmed findings and their limits

### Email validation no longer reconciles to the current address population

There are **12,038 Persons with email**, **1,261 without email**, and **12,178 non-empty email entries**, of which **11,512 entries** are labeled Work. There are 114 Persons with multiple emails, and 652 with email but none labeled Work. An entry label is not proof of an address's business use or ownership.

| Stored Email Status | With email | Without email | Total |
| --- | ---: | ---: | ---: |
| valid | 3,619 | 51 | 3,670 |
| invalid | 479 | 2 | 481 |
| accept_all_unverifiable | 1,648 | 30 | 1,678 |
| unknown | 2,483 | 30 | 2,513 |
| disposable | 13 | 0 | 13 |
| Blank | 3,796 | 1,148 | 4,944 |
| Total | 12,038 | 1,261 | 13,299 |

- **113** validation results have no current email, including **51 valid**. The official MCP confirmed one such example independently.
- **3,796** contacts have email and no validation result. Blank is not valid.
- **Nine** valid-status contacts have multiple addresses. A single Person-level result does not identify which address was checked; no address fingerprint, validation timestamp or provider run log was supplied.
- **29 email entries on 28 Persons** fail a basic syntax check. None of those Persons has valid status. These are review flags, not a complete RFC validator or evidence that every other address is deliverable.
- **Nine** contacts have the Invalid email label and valid Email Status; **seven** have the No email label despite currently having email. The labels and custom validation result are competing hygiene representations.

The historical log's 11,588 contacts, 3,342 without email, mixed validation totals and zero-duplicate claim are not the current census. Its operational instruction permits automated communication only for valid Email Status. Preserve that restriction, but do not treat the 3,670 valid selections as a verified sendable audience: 51 have no address and the remaining 3,619 still require current-address linkage, lifecycle checks and applicable communication permission. No outreach was sent or authorized by this audit.

Native `marketing_status` and `doi_status` were each requested separately and returned **400: Marketing fields are not allowed for this company**. Their absence is unavailable coverage, not confirmed consent or an instruction to create replacement consent fields.

### Ownership and manageable lifecycle coverage

**7,546 contacts (56.74%)** belong to inactive owners; 5,753 belong to active owners. All owner references resolved. **38 contacts with open deals** have inactive owners and merit first review. Reassigning all historical contacts to one active user would obscure responsibility and is not recommended.

Status is populated on 602 contacts and blank on **12,697**. That confirms sparse usage, not that all unclassified people are Leads. There are 371 Persons with open deals, 5,849 with positive activity counters, and 172 with a next-activity reference. Activities, mail timestamps and deal context are useful evidence but do not themselves establish lifecycle or permission to automate outreach.

The Confluence log describes Active → Re-engage after 12 months as the sole allowed automatic transition, and Dormant/Former/Disqualified as protected from automatic reactivation. Its detailed trigger text and suggested follow-up campaign are broader than that summary. No automation inventory or deployment was verified: preserve the restrictive rule and resolve the inconsistency before implementation. An old last-activity date alone must not override newer mail or ongoing operational work.

### Organization links overlap, but are not interchangeable

Native Organization is populated on **11,713 contacts (88.07%)**, referencing 3,672 organizations; **1,586** have no native organization. Every non-null native and Related organization ID appears in the accessible organization census.

Of **128 Related organization** values:

- **118** equal native Organization;
- **eight** differ from a non-null native Organization;
- **two** are populated while native Organization is blank.

All 128 also have Synchronize=Yes; 126 have Contact type. This is evidence of an operational/integration association, not proof of which system owns it. Retiring it or copying it over native Organization now could change ten meaningful associations or break an external writer that expects all 128 values.

Synchronize=Yes appears on 793 Persons. Of these, **382 lack Contact type**, **ten lack native Organization**, and **11 lack email**. These overlapping populations require integration-owner review, not a new universal mandatory-field rule. Actual Odoo mappings, sync success and contact routing were not verified. Billing/Admin/Technical/Support describe responsibilities; a Person's Billing selection does not designate an Organization as BillingEntity.

### Duplicate candidates and identity quality

| Candidate check | Groups | Distinct Persons involved | Interpretation |
| --- | ---: | ---: | --- |
| Same normalized email | 210 | 434 | Shared mailboxes, job moves or duplicate records; inspect individually |
| Same normalized telephone | 245 | 599 | Switchboards and shared numbers are legitimate; formatting alone is insufficient |
| Same normalized name and native organization | 12 | 27 | Stronger review cue, still not proof of one person |

These populations overlap and must not be added together. All Persons have a non-empty name; **43 names contain `@`** and **1,251 lack a last-name value**. Some may be role mailboxes or imported contact placeholders; neither observation justifies guessing names, splitting names mechanically or deleting records. There are **433 contacts with neither email nor phone**; introductions, LinkedIn and historical activity may still make them useful.

There are 6,009 phone entries on 4,925 Persons; 871 Persons have multiple numbers. **Five** populated phone collections do not have exactly one primary number. **15** Persons have at least one number outside a simple 7–15-digit check; extensions and local formats can explain flags. Review before changing routing or formatting.

### Enrichment and role definitions need clarification

- **Language:** 46 raw values mix names, codes, typos and proficiency profiles. English (1,450) and `en` (292), Arabic (27) and `ar` (90), and `Englsih` (19) illustrate safe candidate aliases after approval. **40** populated values include lists or proficiency notation; do not guess a preferred communication language from those skills.
- **Contact Source:** 58 raw values mix channel, campaign/event, referring people and partner organizations. `Partner ` (47) and `Partner` (four), or Direct contact/Direct Contact, are normalization candidates. A total of **47** stored values have outer whitespace. Collapsing event or referrer detail into a generic channel without preserving provenance would be lossy. Source text naming a person is not automatically a resolvable Introduced By link.
- **Persona:** relationship roles, buying roles and a company commercial model coexist. Thirty Distributor selections need interpretation; only 14 are linked to organizations currently classified Partner. The other 16 may be incomplete associations or different meanings; they are not proven mistakes. Keep the existing selections pending review. Business Champion, Technical Buyer and Procurement may depend on a specific deal rather than every engagement with the person.
- **Followers:** all 21 populated custom values have LinkedIn profiles, range 2,317–50,795, and differ from native `followers_count`, which ranges 0–5. This strongly suggests social audience rather than Pipedrive followers, but the source is not verified. Do not overwrite the native counter or delete this as a duplicate by name.
- **LinkedIn:** 6,056 values match a standard personal-profile URL shape; one matches a company page and three need other review. Shape is not verified profile ownership. The 6,060 entries contain 6,043 exact distinct URLs; repeated URLs provide additional review evidence, not automatic merges.
- **About:** actual values include job headlines, short relationship context and employment-change notes. Of 86 values, 78 coexist with native Job title, one exactly matches Job title, and two exactly match native Notes. Retain a short curated summary; use native job title for the position and dated activity notes for history after approval. No wholesale copy is justified.
- **Introduced By:** 392 values reference 226 Persons; eight rows point to five individually unavailable IDs, and one Person references itself. Preserve evidence and resolve identity/history before correction.
- **Birthday:** four records share one stored date. Review privately for intentional/default values; no business need for completeness or blanket collection was demonstrated.

## Native labels: every option and observed usage

| ID | Label | Persons | Suggested disposition, not an implemented change |
| --- | --- | ---: | --- |
| 43 | Customer | 19 | Review against the person's actual relationship and associated organization; avoid automatic copying |
| 44 | Hot lead | 10 | Keep tactical only; not lifecycle or account priority |
| 45 | Warm lead | 9 | Keep tactical only |
| 46 | Cold lead | 405 | Review tactical meaning; do not mass-map to Dormant |
| 62 | Referrals | 1 | Reconcile with source/introducer evidence |
| 159 | Gitex-2025 | 993 | Retain historical event provenance |
| 160 | Inactive | 4 | Review lifecycle overlap; three have no Status |
| 161 | No email | 228 | Replace manually maintained hygiene with derived filtering after reconciliation |
| 162 | Invalid email | 563 | Reconcile with validation result/address before retirement |
| 170 | Partner | 18 | Review organization context; not a Person partner type |
| 173 | Prospect | 146 | Review relationship context; not automatically Status=Lead |
| 179 | Department | 0 | Unused-label retirement candidate only after dependency/owner review |
| 223 | Left the Organization | 6 | Review employment history; no automatic employment change or Former status |
| 224 | Not Interested | 3 | Preserve objection/context; not automatically Disqualified |
| 252 | Lost | 1 | Deal outcome should remain on the relevant deal |
| 283 | Potential Technology Partner | 3 | Review organization-level partner context |
| 284 | Decision Maker | 54 | Preserve meaning; may be deal-specific and is not identical to Business Champion |
| 285 | Current POC | 276 | Define whether point of contact or proof of concept; do not guess |
| 295 | MS AM | 1 | Owner defines meaning before reuse |
| 386 | Rejected | 3 | Review source/context before any lifecycle mapping |
| 390 | Not Relevant | 1 | Review source/context before any lifecycle mapping |
| 391 | WIP | 2 | Temporary work tracking, not an enduring person classification |

Labels are selected on 2,682 Persons (20.17%); 10,617 have empty selections. All 22 configured IDs remain preserved. No label is approved for removal by this audit.

## Complete standard/system inventory

All 41 v2 definitions were returned on every Person when explicitly requesting optional fields. `ims` in metadata is returned as `im`; retain that API alias. Phone and email types describe native repeated collections, not additional custom fields. The populated count below includes legitimate zero/false values; it does not mean every contact has deals or activities.

| Standard field | API key | Type | Populated | Exact distinct stored values |
| --- | --- | --- | ---: | ---: |
| ID | `id` | int | 13,299 | 13,299 |
| Name | `name` | varchar | 13,299 | 12,885 |
| Person created | `add_time` | date | 13,299 | 12,470 |
| Update time | `update_time` | date | 13,299 | 8,503 |
| Organization | `org_id` | org | 11,713 | 3,672 |
| Owner | `owner_id` | user | 13,299 | 22 |
| Open deals | `open_deals_count` | double | 13,299 | 5 |
| Visible to | `visible_to` | visible_to | 13,299 | 2 |
| Next activity | `next_activity_id` | activity | 172 | 172 |
| Last activity | `last_activity_id` | activity | 5,862 | 5,841 |
| Won deals | `won_deals_count` | int | 13,299 | 5 |
| Lost deals | `lost_deals_count` | int | 13,299 | 11 |
| Closed deals | `closed_deals_count` | int | 13,299 | 12 |
| Total activities | `activities_count` | int | 13,299 | 43 |
| Done activities | `done_activities_count` | int | 13,299 | 42 |
| Activities to do | `undone_activities_count` | int | 13,299 | 7 |
| Email messages count | `email_messages_count` | int | 13,299 | 490 |
| Profile picture | `picture_id` | picture | 230 | 230 |
| Last email received | `last_incoming_mail_time` | date | 2,544 | 2,499 |
| Last email sent | `last_outgoing_mail_time` | date | 7,298 | 5,984 |
| Labels | `label_ids` | set | 2,682 | 36 combinations |
| First name | `first_name` | varchar | 13,280 | 7,448 |
| Last name | `last_name` | varchar | 12,048 | 8,635 |
| Job title | `job_title` | varchar | 2,993 | 2,041 |
| Phone | `phones` | phone | 4,925 | 4,744 collections |
| Email | `emails` | varchar | 12,038 | 11,943 collections |
| Postal address | `postal_address` | address | 725 | 450 |
| Notes | `notes` | text | 211 | 189 |
| Birthday | `birthday` | date | 4 | 1 |
| Instant messenger | `ims` → `im` | varchar | 1 | 1 |
| Files count | `files_count` | int | 13,299 | 24 |
| Followers count | `followers_count` | int | 13,299 | 6 |
| Is deleted | `is_deleted` | boolean | 13,299, all false | 1 |
| Notes count | `notes_count` | int | 13,299 | 26 |
| Participant closed deals | `participant_closed_deals_count` | int | 13,299 | 9 |
| Participant open deals | `participant_open_deals_count` | int | 13,299 | 5 |
| Related closed deals | `related_closed_deals_count` | int | 13,299 | 11 |
| Related lost deals | `related_lost_deals_count` | int | 13,299 | 8 |
| Related open deals | `related_open_deals_count` | int | 13,299 | 4 |
| Related won deals | `related_won_deals_count` | int | 13,299 | 5 |
| Smart BCC email | `smart_bcc_email` | varchar | 13,299 | 1 |

Native Notes is a contact-sync property, not the complete dated CRM Notes timeline: 211 have native Notes while **1,955** have a positive `notes_count`. Do not move summaries into the wrong representation because both use the word “notes.” Native `followers_count` is positive on 12,592 Persons; custom Followers has a separate inferred purpose.

Visible to values are **1 Item owner: three Persons** and **3 All users: 13,296 Persons**. Their visibility settings were not changed. These describe record settings, not audited per-user access or a recommendation to broaden sharing.

v1 has 18 keys absent from v2: `email`, `phone`, `im`, legacy `label`, last/next activity dates and 12 flattened postal-address components. v2 has 16 keys absent from v1, including modern collection aliases, activity references and additional counters. The union is 71 keys, not 71 independently editable fields. The complete definitions and address subfields are preserved locally.

## Dependencies, provenance and review limits

One current custom-field dependency was found in accessible filters: **filter 1900 uses LinkedIn profile (field ID 9066)** together with native email. No other custom Person field was referenced in the 28 inspected filter conditions. Existing filters also reference native email and organization fields. This does not establish that external automations, campaign tools, contact sync, imports, Odoo or private filters have no dependencies. A repository search found no existing references to these 12 custom keys outside this new audit evidence.

The Confluence log's email and lifecycle rules are reported business guidance, not proof that enforcement is deployed. Its conflicting automation passages remain unresolved. Person target definitions below are proposals, not an approved policy, a new commercial classification or permission to contact anyone. No ClickHouse or Odoo dependency assurance is claimed.

Evidence files in ignored `local/` include `v1-personFields.json`, `v2-personFields.json`, `v2-personFields-after.json`, `persons.json`, 27 saved pages, `organizations.json`, `users.json`, `field-statistics.json`, `values-<key>.json`, `summary.json`, `issues.json`, the three duplicate-candidate files, `person-filter-details.json`, `representative-readbacks.json`, `introducer-reference-verification.json`, `marketing-capability.json` and the request log. One-off collection and analysis scripts also remain ignored; this is not a reusable audit framework.

Official API interpretation references: [Person Fields](https://developers.pipedrive.com/docs/api/v1/PersonFields) and [Persons](https://developers.pipedrive.com/docs/api/v1/Persons). Historical business instructions: [CRM Data Hygiene & Customization Log](https://circularo.atlassian.net/wiki/spaces/Sales/pages/735182849/CRM+Data+Hygiene+Customization+Log). Actual counts and findings above come from live account evidence, not those reference pages.

Continue with the [proposed Person dictionary](pipedrive-person-target-model.md) and [cleanup plan](pipedrive-person-cleanup-plan.md).
