---
title: "Batch 05 verification report"
id: investor-batch:outreach-batch-05-verification
batch_id: outreach-batch-05
status: draft
classification: confidential
canonical: false
evidence_state: observed
revision: 2
created: 2026-10-03
updated: 2026-10-03
owner: Josef Neumann
---

## Change history

- 2026-10-03 — Relocated to investors/outreach and authorised for Git versioning. Earlier validation/ignore findings below are historical; see [current relocation checks](../relocation-verification.md).
- 2026-10-03 — Recorded artifact checks, research limitations and repository validation errors.

# Batch 05 verification report

## Artifact checks

- Structured research parses as JSON; 30 unique adviser IDs.
- Tiers: six A, six B, eighteen C; no numeric fit scores or rankings.
- Twelve detailed profiles; three or more attributable/qualified case examples for eleven of them. BDO UAE has an explicit case-evidence gap rather than fabricated examples.
- Thirteen primary named contact routes, including Alantra's regional/technology pair; twelve have personal LinkedIn URLs. Clipperton's personal URL remains unknown. Talaria's exact seniority is unconfirmed.
- Six personalised LinkedIn drafts plus general email, optional sizing paragraph, response and follow-up drafts.
- Markdown has YAML and top change history. Local link targets were checked; this report resolves the initially pending README link.
- Amount/ownership are indicative, minority preferred, majority/control acceptable and founder secondary required. Current mandate acceptance and engagement economics remain unknown.
- Firm names consolidated for GCA/Houlihan, Results/Canaccord and Bryan Garnier/Stifel.
- No actual outreach was sent, no forms submitted, no LinkedIn invitations sent and no adviser engaged. Existing contact-register workbook and saved conversations were not modified.
- Research, contacts and drafts remain local under the existing investors/work Git ignore policy. No staging, commit or push was requested or performed for this batch.

## Repository validation

Ran `rtk make validate` on 2026-10-03. **It did not pass.** The validator reports the same broader repository issues previously observed:

- Directory-policy findings for `tmp/`, the user-authorised `investors/work/` exception, and `work/m-capital/work/`.
- Broken vendor README links under the slide generator's `node_modules` for skia-canvas benchmark images and debug example files.

No batch 05 file-specific error was reported by the repository validator. These unrelated policy/vendor findings were not changed in this task; repository-wide validation remains unresolved. No canonical source records changed, so no catalog regeneration was required.

## Limits of verification

Checks establish local artifact consistency and traceability, not adviser acceptance, fee terms, current regulatory permission, customer reference approval or independently audited transaction execution. Public firm cases remain attributed, pending/announced deals are distinguished, and founder proceeds are not inferred. Review the [profiles](adviser-profiles.md), [evidence register](evidence-register.md) and [selection questions](outreach-strategy.md) before appointing an adviser.
