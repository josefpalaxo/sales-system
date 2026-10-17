---
title: Pipedrive person cleanup plan
status: draft
classification: confidential
owner: role:cso
---

# Pipedrive person cleanup plan

This is a proposal based on the [read-only audit](pipedrive-person-fields-audit.md) and [draft Person dictionary](pipedrive-person-target-model.md), October 16, 2026, America/Los_Angeles. **No CRM data, fields, options, filters or automations have been changed.** The earlier Organization and partner approvals do not authorize this Person cleanup. ClickHouse remains outside scope by user instruction.

## Scope and priorities

| Priority | Outcome | Proposed work | Risk |
| --- | --- | --- | --- |
| P0 | Avoid routing/email based on contradictory information | Review 51 valid-status contacts with no email, nine valid-status/Invalid email label conflicts, and nine valid-status contacts with multiple addresses; establish validated-address evidence | High: wrong recipient, lost result history or incorrect suppression |
| P1 | Restore responsibility for current work | Review 38 contacts with open deals owned by inactive users; then scope the wider 7,546 inactive-owner population | Medium/high: ownership and access workflows |
| P1 | Reliable field meanings | Approve dictionary, managed-contact lifecycle scope, source/language meaning and operational-reference ownership; add descriptions | Medium: semantic integrations and reporting |
| P1 | Preserve operational routing | Confirm integration contract for 793 Synchronize selections, 415 contact-role assignments and 128 Related organization links | High: billing/admin/support routing |
| P2 | Resolve contact data quality | Review duplicate candidates, introductions, phone primary flags, language/source aliases and LinkedIn shapes | Medium/high: identity merges and historical provenance |
| P3 | Simplify routine entry and labels | Apply approved display-name/form changes; retire only reconciled labels and conditionally redundant fields | Low for visibility; high for deletion/data loss |

Counts overlap; they are not a count of distinct records requiring every action. Re-read the relevant records before preparing any write plan because these counts describe the audit census, not a permanent queue.

## Disposition of every custom field

| Existing field | Action after approval | Priority | Risk / prerequisite |
| --- | --- | --- | --- |
| Status | Keep; optionally rename Contact status; describe all six existing values | P1 | Preserve IDs; no defaulting 12,697 blank contacts or mirroring organization state |
| Persona | Keep multi-select; optionally rename Relationship roles | P1 | Review Distributor's 30 selections and any label rename; do not split into new fields without evidence |
| Followers | Retain 21 values pending source/use decision; conditional LinkedIn followers rename | P2 | Source inferred, not confirmed; never replace native followers_count |
| LinkedIn profile | Keep; preserve key and filter 1900 | P2 | Confirm four URL-shape exceptions and shared profiles; no identity merge by URL alone |
| About | Keep; optionally rename Contact summary and remove from creation | P2 | Curate 86 summaries; preserve employment/source context and native note distinctions |
| Email Status | Keep IDs; optionally rename Email validation status; remove manual creation input | P0/P1 | Identify checked address, timestamp/provider evidence and all writers before changing results |
| Language | Keep autocomplete text; define intended meaning before possible Communication language rename | P2 | Protect 40 multilingual/proficiency values; do not infer a preferred language |
| Introduced By | Keep; standardize display capitalization if useful | P2 | Eight unavailable reference rows, five target IDs and one self-reference need owner disposition |
| Contact Source | Keep autocomplete text; describe source definition | P2 | Approve first-acquisition vs later-interaction semantics; preserve named event/referrer detail |
| Synchronize | Keep Yes=317 and blank; optional Sync to Odoo rename only if confirmed | P1 | Integration-owner contract, current writer and routing behavior must be known |
| Contact type | Keep multi-select; optional Operational contact roles rename | P1 | Preserve Billing/Admin/Technical/Support IDs and combinations; confirm routing semantics |
| Related organization | Keep for now; conditional retirement only after migration | P1/P3 | All 128 are sync-enabled; preserve eight different and two native-blank associations |

Introduce **zero** new custom fields. Retire **zero** custom fields immediately. A source/meaning decision is required for Followers; low population is not enough to delete it. Related organization is the main consolidation candidate, but 118 equal values do not prove all consumers can use native Organization.

## Phase 1 — approve meanings and preserve evidence

Use the ignored audit evidence as the initial baseline, then take a fresh complete snapshot immediately before an approved write. Keep original definitions, option IDs, all collection entries and primary flags, custom values, links, owners, visibility, lifecycle and update timestamps in ignored storage. Preserve existing native note/activity/deal history. Record the actual approval scope and a reviewed ID-based before/after plan.

Resolve these decisions with the accountable owners:

1. Which current contacts require an active owner and maintained lifecycle? Do not apply completeness rules indiscriminately to historical imports.
2. Does Persona's Distributor mean a distributor representative, and may it be relabeled with the same ID? Keep company Partner type separate.
3. Is Language a communication preference or an imported language-skills profile? Which values can be normalized without losing meaning?
4. Does Contact Source record original acquisition or a later interaction? Where does specific event/referrer provenance remain?
5. What actual external integration uses Synchronize, Contact type and Related organization? Which organization association controls routing?
6. What checked email address and time support a valid status, and what happens when that address is changed or removed?

Do not approve the lifecycle automation merely from the Confluence diagram: its narrow allowed transition conflicts with broader trigger/follow-up prose. Record the resolved rule before implementation. This audit does not invent a business policy to resolve that conflict.

## Phase 2 — email and ownership review

| Review population | Count | Proposed handling / acceptance |
| --- | ---: | --- |
| valid without current email | 51 | Exclude from automated-address selection by actual-email check; investigate removal/history; do not invent an address or silently relabel provider results |
| All validation results without current email | 113 | Preserve historical result, identify old checked address if possible; define clearing/invalidation policy before writing |
| Has email, no result | 3,796 | Keep unvalidated; prepare a separately approved validation batch only if needed; no paid service calls in this audit |
| valid with multiple addresses | 9 | Identify the checked/current target address; do not apply result to every address |
| Invalid email label plus valid status | 9 | Reconcile source, timestamp and address; a new label or field is not a resolution |
| No email label but current email present | 7 | Verify actual collection and intended address; remove stale label only in approved cleanup |
| Basic syntax exceptions | 29 entries / 28 Persons | Review original data; do not guess domain spelling or merge packed addresses automatically |
| Open-deal contacts with inactive owners | 38 | Agree the responsible active owner with account/deal owners; preserve Person affiliation and record visibility |
| Wider inactive-owner population | 7,546 | Prioritize managed/current relationships; document archival exceptions rather than reassigning all to one user |

The recorded automated-email rule requires valid status. A working audience additionally needs a real current target address, validation evidence tied to that address, compatible lifecycle and applicable communication permission. Native marketing-status fields returned “not allowed for this company”; their absence is not consent. No message sending, validator purchase or external contact is authorized here.

Prefer saved filters or the existing send/validation system's controls over another persisted “sendable” field. Accessible filters were inspected; no Email Status dependency was found there, but external writers and audiences are still unknown.

## Phase 3 — affiliation, operational routing and identity

Keep native Organization as primary affiliation. Investigate the ten Related organization cases not equal to native affiliation first; decide whether they represent a real second operational association, an incomplete affiliation or a wrong value. Do not overwrite either field by comparing counts alone.

For the 118 matching pairs, test the integration's current read/write behavior and null handling before proposing removal of the custom reference. Validate all 128 routing outcomes if the field is ever retired. An approved transition must move readers and writers, retain a recoverable mapping and verify contact-role associations before field deletion. No external system was changed or verified in this audit.

Review sync-enabled contacts with missing role (382), native organization (ten) or email (11) against actual integration requirements. These overlap and can be legitimate; do not fill Billing, Admin, email or organization by default. Do not translate a Person Billing role into Organization BillingEntity or grant product permissions from a CRM tag.

Review the eight unavailable introducer rows and the one self-introduction against source/merge history. API 404 is not proof of deletion. Resolve any replacement person by identity, not name similarity, and preserve original references before clearing or replacing them.

Duplicate review uses the ignored candidate lists: 210 shared-email groups (434 Persons), 245 shared-phone groups (599 Persons), and 12 same-name/same-organization groups (27 Persons). Shared mailboxes, switches, job moves and different people can explain matches. Approve merges individually, choose the surviving identity, and explicitly preserve/reconcile emails, primary flags, phones, owners, organization history, introductions, notes, activities, deal participation and external IDs. None of the lists is a bulk-merge file.

## Phase 4 — normalization and form simplification

Normalize only approved exact aliases in Language and Contact Source. Start with whitespace/case and confirmed spelling/code aliases, keep the original values in the backup, and retain meaningful event/referrer detail. The 40 language list/proficiency values require explicit decisions before becoming a preferred-language value. Do not convert autocomplete fields to option types simply to constrain entry: field-type changes require a different migration and are not justified now.

Curate About into a brief contact summary where appropriate. Move a current position to existing Job title only after confirming it; preserve employment changes as dated history. Native `notes` and the CRM note timeline are different representations, so neither is an automatic bulk destination.

Review five phone collections with inconsistent primary flags, 15 phone-length candidates, four LinkedIn-shape candidates and four repeated birthday values. Preserve extensions and international format; never guess missing numbers or personal details. Recheck before/after by Person ID and actual value, not display name.

Proposed simple creation form: Name, Owner/default visibility, optional Organization, Email, Phone, Job title, Contact source, Contact status and Relationship roles. LinkedIn, Language and Introduced by can remain optional detail inputs if entry friction is a concern. Keep summary, numeric enrichment, validator-controlled status, sync flags and operational routing in detail views. Establish descriptions and owners before changing any mandatory setting.

Retain event labels such as Gitex-2025. Replace No email's manual hygiene meaning with actual-address filtering after reconciliation, and review Invalid email against the validator. Do not map Cold lead to Dormant, Lost to Former, Decision Maker to Business Champion, or Current POC to anything until meanings are approved. The unused Department label is only a candidate for retirement after dependency review.

## Dependencies and implementation method

The confirmed custom-field filter dependency is **Person filter 1900 → LinkedIn profile field ID 9066**. All 28 accessible Person filters were examined. Other integrations, private filters, imports, contact sync, CRM automations and Odoo configuration remain unverified. Preserve field keys and option IDs through display-name changes and test real consumers with their owners. ClickHouse work is explicitly excluded; this plan makes no compatibility claim for it.

Use a small reviewed batch for routine renames/descriptions or exact corrections after approval. An ID-based CSV may suit owner-reviewed scalar changes and reassignment; it is not yet prepared or approved. Verify importer behavior for blank cells, primary email/phone collections, links and multi-select replacement before any import. Reference corrections, merges and routing transitions need their own checks. Retain original values and verify every intended result plus unrelated-value preservation. There is no reason to build a reusable framework or perform all corrections as one destructive bulk action.

## Acceptance and completion

- All 12 custom fields have approved definitions, an accountable owner and a documented consumer disposition; technical optionality and business scope are explicit.
- Existing keys and option IDs are unchanged for approved renames. Current field options and UI configuration are read back after implementation.
- The approved email queue has no valid flag used without an actual current target address and supporting validation evidence; negative/unknown/blank results remain excluded under the recorded rule.
- Ownership changes match the agreed managed-contact plan; unrelated fields and visibility remain preserved.
- Every approved reference correction/merge has a before/after ID mapping and preserved history; unresolved cases stay visible.
- All affected routing outcomes and consumers are verified before any conditional retirement. No deletion is implied by approval of a display-name change.
- The Person dictionary and [CRM user guide](../pipedrive-crm-user-guide.md) are reconciled with the final approved/live state, and the repository catalog and validation pass.

Until those scoped changes are approved and executed, the deliverable is this reviewable audit and proposal. The existing CRM remains unchanged.
