---
title: Pipedrive person target model
status: draft
classification: confidential
owner: role:cso
---

# Pipedrive person target model

Proposed field dictionary based on the [live Person audit](pipedrive-person-fields-audit.md), dated October 16, 2026, America/Los_Angeles. This is a **draft for owner review**, not a canonical approved policy or authorization to implement changes. Current UI names remain valid until an explicit rename is approved. Existing keys and option IDs must survive display-name changes.

## Model boundaries

One Person represents a known individual or an explicitly understood operational contact record. Native Organization records the evidenced primary affiliation; organization classifications, partner commercial type, partner capabilities, partner tiers and corporate ownership stay on Organizations. Do not infer an individual's relationship state, consent, employer or buying authority from an organization's classification.

Separate the person's lifecycle, relationship/buying roles, operational responsibilities and address validation. An investor can also be a connector; a business champion can be a billing contact. A valid address is neither proof of an active relationship nor communication permission. Deal-specific buying roles and participation need the relevant deal's context rather than a blanket role on every deal.

Keep all 12 existing custom fields pending the scoped cleanup below. **Introduce no new custom fields and retire none immediately.** Use existing native fields and the integration/validator's evidence rather than adding duplicate email, phone, job-title, employer, partner-type, sync-status or consent fields.

## Native fields people maintain

| Recommended name | Standard API representation | Type and allowed values | Definition / authority | Mandatory business scope | Creation form | Action |
| --- | --- | --- | --- | --- | --- | --- |
| Name | `name` | Native text; actual known name or explicitly identified operational contact | Person/account owner, verified contact context | Yes for every record; do not guess missing parts | Yes | Keep; review 43 names containing `@` individually |
| First name / Last name | `first_name`, `last_name` | Native name components | Verified person identity; respect real naming conventions | No global separate last-name requirement | No additional inputs | Keep; no mechanical name splitting |
| Organization | `org_id` | Native organization ID, or blank | Primary evidenced affiliation; contact owner confirms changes | Expected when an employer/organization is known; not required for every investor, connector or independent contact | Yes, optional | Keep; review unlinked operational contacts first |
| Owner | `owner_id` | Native Pipedrive user ID | Accountable relationship manager; Sales Operations owns allocation | Yes; an active accountable owner is expected for currently managed contacts | Yes/default | Keep; approve reassignment, starting with open-deal contacts |
| Visible to | `visible_to` | 1 Item owner; 3 All users | Existing CRM access policy; administrator | Native/system default | Preserve default | Keep; no visibility expansion in cleanup |
| Email | `emails` | Native array of address, label and primary flag | Actual current addresses, confirmed by contact/source; technical validation from validator | Required only before email use, not for every contact | Yes, optional | Keep all justified addresses and the intended primary address |
| Phone | `phones` | Native array of number, label and primary flag | Confirmed contact numbers; preserve country codes/extensions | Required only for the relevant contact workflow | Yes, optional | Keep; normalize cautiously and resolve five primary-flag exceptions |
| Job title | `job_title` | Native text; verified current position | Person or verified professional source | No global requirement | Yes, optional | Keep; no new Position field |
| Labels | `label_ids` | Native multiple selections, existing IDs in audit | Event/campaign provenance and explicitly defined tactical tags | No | Optional | Retain history; reconcile duplicate hygiene/lifecycle meanings before retirement |
| Postal address | `postal_address` | Native structured address; verified contact location | Person/source; not automatically the linked organization's office | Only where a real operational purpose exists | No | Keep existing 725 values; no new City/Country/ZIP custom fields |
| Notes property | `notes` | Native contact-sync text | Existing contact-sync/source context | No | No | Keep distinct from dated CRM note records |
| Birthday | `birthday` | Native date or blank | Person-confirmed information where useful for an authorized workflow | No | No | Keep optional; privately review four identical dates |
| Instant messenger | Metadata `ims`, actual response `im` | Native account collection | Person-confirmed messaging identity | No | No | Keep optional; preserve existing one populated record |

Job title, Postal address, Notes property, Birthday and instant-messenger values were readable in this account. Their native APIs can depend on contact sync; verify the intended writer before changing them. They are not automatically additional custom-field requirements. Confirm the target form in the UI after approval; the current audit used API configuration flags.

## Every retained custom field

All current custom fields are technically optional. The business requirements below are conditional workflow rules, not a request to enable global UI mandatory flags. None of the proposed names has been applied.

| Recommended name | Current name | Stable key | Type / allowed values | Definition and source of truth | Mandatory / creation | Migration or cleanup |
| --- | --- | --- | --- | --- | --- | --- |
| Contact status | Status | `4a36906ca2ce42e649a8cdc2f5959fb09a7037b8` | Existing enum, IDs 327–332 below | Current overall relationship with this person, independent of the employer and deal stage; relationship owner | Expected for actively managed contacts / Yes, optional | Keep all six IDs; do not set 12,697 blanks to Lead |
| Relationship roles | Persona | `1570adcfb0bce32b1129c18901682f01d5bce5f8` | Existing multi-select, IDs 318–326 below | Evidenced relationship and buying roles; owner retains deal context | When known / Yes, optional | Preserve combinations; clarify Distributor label and scope before change |
| Followers, pending source confirmation | Followers | `2c24bfceda164ef253552b32a71f4aa67bd8b349` | Existing number; nonnegative whole counts if audience metric is confirmed | Likely social audience from enrichment; exact source/refresh owner unknown | No / No | Retain 21 values. Rename LinkedIn followers only after confirming provenance; do not reuse native followers |
| LinkedIn profile | LinkedIn profile | `524c1fb2473916338f2360db0378cb99bb2c298a` | Existing text; a verified person profile URL | Person/verified enrichment source | No / Optional, preferably detail view | Keep key and filter 1900; review four URL-shape exceptions and repeated profiles |
| Contact summary | About | `51db565ad71813d83000580cea0ad1beb76a28f3` | Existing long text; short curated context | Relationship owner, supported by source; historical updates belong in dated notes | No / No | Curate 86 values; do not blanket-copy to Job title or native Notes |
| Email validation status | Email Status | `84e3203ff45c4e26ada44aa887c3f47dcdb8e8ae` | Existing enum, IDs 339–343 below | Validator result for an identified current address; provider/run evidence owns technical result | Required by the recorded rule before automated email / No manual creation input | Reconcile stale results; stop manual guessing of valid; preserve negative/uncertain results |
| Language, pending meaning confirmation | Language | `63a69c2f4d71802df5f43caf25bc49a72bcdca6c` | Existing autocomplete text; approved language names and evidenced combinations | Owner/person confirms communication preference; imported skills are not necessarily preference | No / Optional, preferably detail view | Keep type. If preference is approved as scope, rename Communication language only after reviewing skills/proficiency values |
| Introduced by | Introduced By | `b5e14e8dd6e08f2fbc01c445351347fc7a97413e` | Existing Person reference, or blank | Actual introducing person with verified identity | When an introduction is known / Optional | Review eight unavailable references and one self-reference; preserve referral evidence |
| Contact source | Contact Source | `26701eb6288417495c36ba20a76e9a4aea3f69b2` | Existing autocomplete text; proposed taxonomy below | Source evidence and owner; whether first acquisition or latest interaction must be settled | Prefer known source on new managed contacts / Yes, optional | Safe alias cleanup; preserve named event/referrer detail before broad categorization |
| Sync to Odoo, if destination confirmed | Synchronize | `03dad96d483efd99a4e778704a4ba8886304a211` | Existing enum: 317 Yes; blank unspecified | Integration owner defines affirmative inclusion/request | Before that integration only / No | Preserve ID 317 and blank semantics; not proof of successful sync |
| Operational contact roles | Contact type | `183206092fc769f0789dd3f4156a2d8492105b51` | Existing multi-select, IDs 289–292 below | Evidenced operational responsibilities for the relevant organization/service; owner/integration | When used for operational routing / No | Retain combinations; review sync-enabled contacts with blank roles |
| Related organization, pending definition | Related organization | `8cf5f127081ed2f83cf140fd1e4a4615d7c20814` | Existing organization reference, or blank | Integration owner must establish what relationship this represents | Current integration contract only / No | Preserve all 128, including ten not equal to native affiliation; conditional future retirement only |

“Sync to Odoo” is a proposed clarification grounded in the existing integration context, not verified evidence that every flagged Person exists in Odoo or that this field's actual writer uses that destination. Keep Synchronize as the UI name until the owner confirms the contract.

## Option dictionary

### Contact status

| ID | Existing value | Proposed operational definition |
| --- | --- | --- |
| 327 | Lead | Potential relationship being qualified or first developed |
| 328 | Active | Current, evidenced commercial or operational engagement with this person |
| 329 | Re-engage | Owner considers the relationship worth reactivation, with a deliberate next step |
| 330 | Dormant | Parked relationship; no automation-driven outreach |
| 331 | Disqualified | Explicit owner decision not to pursue; retain reason/history |
| 332 | Former | Relationship has ended; retain relevant history |

Blank means unassigned, not Lead, Dormant or Disqualified. Person status does not inherit Organization status; a job change is not automatically an ended personal relationship. Do not add Organizations' Prospect option simply for symmetry.

The recorded log restricts automatic transitions to Active → Re-engage after at least 12 months of inactivity. It protects Dormant, Former and Disqualified from automatic reactivation. Keep this as the restrictive recorded rule until the owner resolves the log's inconsistent trigger/follow-up text. No automation change is part of this proposal. A deployed rule would require a source-status=Active condition and reliable inactivity evidence; null last-activity data is not a timestamp or permission to reactivate.

### Relationship roles

| ID | Existing value | Meaning / safeguard |
| --- | --- | --- |
| 318 | Investor | Investment-related relationship with the person; not evidence of current investment or fundraising authorization |
| 319 | Business Champion | Supports the business case or adoption in an evidenced engagement; not automatically the decision maker |
| 320 | Distributor | Preserve current value until owner review; proposed interpretation/label Distributor contact if the person represents a distributor |
| 321 | Reference | Potential reference contact with evidence; selection does not authorize public reference use |
| 322 | Connector | Can facilitate relevant introductions; not the same as being the actual Introduced by person |
| 323 | Talent | Recruitment/talent relationship where relevant to this CRM scope |
| 324 | Technical Buyer | Evaluates technical suitability in an identified engagement |
| 325 | Security Owner | Responsible for security assessment/approval in the relevant context |
| 326 | Procurement | Handles procurement/commercial purchasing process in the relevant context |

Keep this existing multi-select rather than splitting it into several new fields now. The Distributor option is the one clear company-model ambiguity: review its 30 current selections and meaning, preserving ID 320 if only the label changes. Do not automatically make their organizations Distributor or Partner, or infer personal roles from organization Partner type. Keep Decision Maker and Current POC labels until their distinct meanings have been resolved; they do not map mechanically to Business Champion.

### Email validation status

| ID | Existing value | Working interpretation / handling |
| --- | --- | --- |
| 339 | valid | Stored positive validation result; automated use still requires the exact current address, freshness and other workflow checks |
| 340 | invalid | Stored negative result; exclude from automated email unless a new address/result is verified |
| 341 | accept_all_unverifiable | Inconclusive acceptance result; not confirmed valid |
| 342 | unknown | Validation was inconclusive; not confirmed valid |
| 343 | disposable | Stored disposable-address result; exclude from automated email under the recorded rule |
| null | Blank | No recorded classification; do not manufacture a positive result or equate with provider unknown |

Keep the five existing labels and IDs for compatibility. No “No email” enum option is needed: derive absence from the actual current email collection. The Person field alone cannot represent separate results for multiple addresses. Prefer an existing validator's record of checked address, result and time; that evidence was not supplied and is an implementation prerequisite, not a new CRM framework to build in this audit. A single additional Person date would not solve address ambiguity.

Define invalidation/revalidation behavior when the validated address is removed, replaced or a different address becomes primary. Current address selection must not inherit an old valid flag without evidence. Native marketing fields were unavailable to this API account/company; do not replace them with Email validation status or assume a deliverability result grants consent.

### Operational contact roles

| ID | Existing value | Proposed meaning |
| --- | --- | --- |
| 289 | Billing | Person/mailbox responsible for billing communications for the relevant entity or service |
| 290 | Admin | Operational administrator/contact; scope does not automatically grant product permissions |
| 291 | Technical | Technical coordination/support contact for the relevant entity or service |
| 292 | Support | Contact for support coordination under the applicable arrangement |

Multiple values may coexist. Clarify Admin/Technical/Support routing with the integration owner before consolidating even their small populations. These roles are distinct from buying roles, Organization EndCustomer/BillingEntity, and product access rights. Pipedrive does not become the source of truth for per-subscription authorization merely because a role is selected.

## Source, language and label conventions

Keep Contact source as autocomplete text initially. Approve a small vocabulary such as **LinkedIn, Inbound website, Referral, Partner, Event, Outbound, Campaign, Direct contact, Other**, with explicit rules for ambiguous imported values. Decide whether the field means original acquisition source before mapping an existing campaign or later interaction over it. Retain the actual event name/year in existing event labels or dated source notes; preserve evidence of referrers rather than assigning every named source to a channel by guesswork. Do not introduce another general source field.

Keep Language as autocomplete text. If the owner chooses communication preference as its scope, use consistent names, for example English, Arabic, Czech, French and Portuguese, while allowing other evidenced languages. Merge verified spelling/code aliases; manually resolve multilingual/proficiency strings. Do not infer preferred language from citizenship, location, name or first item in an imported list. No new language-skill or language-code field is justified by this audit.

Labels remain native multi-select with all 22 existing IDs until reviewed. Preserve event provenance and meaningful temporary work tags. Derive No email from actual addresses and reconcile Invalid email with the validator before retiring their manually maintained labels. Confirm dependencies before removing the unused Department label. Lost is a deal outcome; Left the Organization is employment context; neither should automatically become Person Former. Keep any original reason/history during reconciliation.

## System fields remain native and managed

The [audit's complete inventory](pipedrive-person-fields-audit.md#complete-standardsystem-inventory) defines all 41 standard fields. In addition to the user-maintained fields above, retain these native properties without new human mandatory rules or creation inputs:

- Identity and provenance: `id`, `add_time`, `update_time`, `is_deleted`, `picture_id`.
- Deal counters: `open_deals_count`, `won_deals_count`, `lost_deals_count`, `closed_deals_count`, `participant_open_deals_count`, `participant_closed_deals_count`, `related_open_deals_count`, `related_won_deals_count`, `related_lost_deals_count`, `related_closed_deals_count`.
- Activity references and counters: `next_activity_id`, `last_activity_id`, `activities_count`, `done_activities_count`, `undone_activities_count`.
- Communication history: `email_messages_count`, `last_incoming_mail_time`, `last_outgoing_mail_time`.
- Other native counts: `files_count`, `notes_count`, `followers_count`.
- Routing: `smart_bcc_email`, which is not a contact's own email address.

System zero/false values remain legitimate. Preserve legacy `email`, `phone`, `im`, `label`, activity-date and flattened postal-address aliases where an existing integration still needs them; modern reads use `emails`, `phones`, `label_ids`, activity references and nested address data. Do not broaden visibility or alter deletion state while cleaning data.

## Authority and approval

Pipedrive holds contact identity, evidenced affiliation, relationship ownership and recorded engagement context. The person/verified source establishes their current details. The validator owns technical email result evidence. Existing product/subscription or finance systems own access rights and order-specific billing responsibilities; the audit did not inspect them. Integration owners approve any sync or operational-reference change.

Sales Operations/CSO should approve the field meanings, managed-contact scope, role names and creation form. The integration owner must approve Synchronize, Contact type and Related organization semantics and dependencies. The relationship owner must approve each identity merge, employer correction, introducer correction and lifecycle reassignment. The [cleanup plan](pipedrive-person-cleanup-plan.md) defines the proposed sequence. Business approval and production changes remain outstanding.
