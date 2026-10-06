---
schema_version: 1
id: partner-workspace:governance
kind: workspace-governance
domain: partnerships
title: Partner workspace governance
status: draft
classification: internal
owner: null
updated: 2026-10-02
---

# Partner workspace governance

This workspace holds partner-specific working material under the root governance exception. Versioning does not establish truth, an agreement or approval to publish. Current approved shared and domain records remain authoritative for their scopes.

## Required YAML

Every Markdown file begins with YAML frontmatter. All files require `schema_version`, globally unique `id`, `kind`, `domain: partnerships`, `title`, `status`, `classification`, `owner` and `updated`.

Every partner-specific file also requires `partner_id`, `profile`, `revision`, `evidence_state`, `last_reviewed`, `review_by` and `sources`. Paths in `profile` and source `path` fields are relative to the containing file. Use ISO dates (`YYYY-MM-DD`), integers for revisions, lists for multi-value fields, and YAML `null` for unknown values. `updated` records an edit, not a factual review. `sources: []` means no supporting evidence has yet been recorded.

The partner README is the single maintained profile and additionally requires:

| Field | Meaning |
| --- | --- |
| `partner_name` | Business name; legal identity must be verified separately |
| `website` | Reference URL, not evidence that the website has been checked |
| `partner_types` | List of reported or verified business types |
| `partner_types_evidence_state` | Evidence state for the type classification |
| `geography.reported_countries` | Reported operating countries, using ISO country codes |
| `geography.reported_regions` | Reported broader regions; do not infer country coverage |
| `geography.evidence_state` | Evidence state for the reported operating footprint |
| `geography.target_countries` | Proposed markets, separate from operating footprint |
| `geography.target_regions` | Proposed regional focus; not exclusive territories |
| `geography.target_evidence_state` | Evidence state for the proposed market focus |
| `proposed_partner_models` | Cooperation models under consideration |
| `relationship_stage` | `unknown`, `prospect`, `discovery`, `negotiation`, `active`, `paused` or `closed` |
| `relationship_stage_evidence_state` | Evidence supporting the recorded stage |
| `agreement_status` | `unknown`, `not-signed`, `signed`, `expired` or `terminated`; require evidence for non-unknown values |
| `next_action` | Action, accountable owner and due date; unknown values stay null |

Start type vocabulary with `systems-integrator`, `managed-service-provider`, `managed-security-service-provider`, `consultancy`, `hosting-provider`, `reseller`, `referral-partner`, `technology-vendor` and `distributor`. Multiple types are allowed. Add descriptive slugs when evidence requires another type. Do not classify an organisation as a Circularo reseller solely because resale is proposed.

Other documents reference the profile through `partner_id` and `profile`; they inherit its type and geography for discovery. Document-specific audiences and geographic limits may be added explicitly without changing the partner profile. Do not silently interpret the profile's markets as the scope of every deliverable.

## Evidence and approval

Use the root status, evidence and classification vocabularies. Label individual claims where evidence differs from the document's overall state. Initial materials are drafts with unassigned owners; this does not appoint the partnerships team or approve the business content. Unknown owner and review dates are allowed in these working drafts only.

Before approval, assign a registered accountable owner, resolve material evidence gaps and blocking conflicts, record the approver, approval date and evidence, and set `last_reviewed` and `review_by`. Increment `revision` for semantic changes. External approval must identify the exact deliverable revision and audience. Approval does not turn hypotheses into verified facts.

Record source paths or business-system locators and their limitations. Unresolved citations remain evidence gaps. Reference precise commercial rules, prices, limits and product claims by stable ID from current approved records. Do not reproduce them as separately maintained partner rules.

## Handling and reuse

Keep profiles, internal strategy, communication plans, permitted activity summaries and authored deliverables here. Exclude raw correspondence, personal contact data, CRM exports, credentials and customer dumps from Git. Store sensitive operational material in its owning business system or ignored files under root `work/`; do not create another local working tree here.

Activity entries distinguish planned, completed, reported and cancelled actions. Use dates only when known. A brief's preparation date is not evidence that a meeting occurred or a message was sent.

Keep reusable partnership methodology in `domains/partnerships/` and shared facts in `shared/`. Partner working records are intentionally outside the generated canonical catalog. Binary deliverables require a same-basename Markdown companion with YAML, purpose, audience, source lineage and approval state. Normal revisions replace the stable file.
