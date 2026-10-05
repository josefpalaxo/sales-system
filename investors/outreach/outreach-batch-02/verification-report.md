---
title: "Verification of investor outreach batches"
id: investor-batch:outreach-batch-02-verification
status: draft
classification: confidential
canonical: false
revision: 2
created: 2026-10-02
updated: 2026-10-02
owner: null
batch_id: outreach-batch-02
---

## Change history

- 2026-10-03 — Relocated to investors/outreach and authorised for Git versioning. Earlier validation/ignore findings below are historical; see [current relocation checks](../relocation-verification.md).
- 2026-10-02 — Recorded the revised secondary-required, non-VC mandate and the batch 02 research conclusions.

# Verification of investor outreach batches

Local consistency checks passed for the relocation and the new research screen: 341 local links resolved, 29 research/index files across the two batches are ignored by Git, and the new CSV/JSON records agree. These checks establish file integrity and traceability, not investor interest, deal acceptance or Circularo business facts.

## Relocation of batch 01

- All 17 original research/brief/index files are in `../outreach-batch-01/`.
- Seven CSV/JSON files retain their original SHA-256 checksums.
- The research brief's text is preserved; relocation added a final newline.
- Markdown links and referenced anchors resolve; the root work index points to each separate mandate.
- The brief's existing Git allowlist remains; research/contact outputs remain ignored. No files were staged, committed or pushed.

## Batch 02 consistency

- 24 unique profiles and candidate IDs: eight UAE/GCC, eight US, eight Europe.
- 12 operating-company routes; 12 private-equity/principal-investment routes. Conventional VC routes are excluded; G+D and stc refer to operating-parent sponsorship only.
- All 24 records state the USD 4m minimum ticket, mandatory secondary component and null upper ticket/ownership cap.
- 16 candidates link to batch 01; eight are new. The original 100 have a disposition row.
- 26 unique personal LinkedIn locators across 19 organisations: 18 authenticated-profile checks reused from batch 01, eight new indexed or official-link matches. Five named investment routes remain unresolved.
- 24 company LinkedIn locators are provided with review scope.
- 139 source IDs resolve from candidate/contact references; shared URLs can have different historical and new review scopes.
- CSV and JSON candidate names, IDs, contacts and parameters agree.
- Every new Markdown file has confidential, non-canonical draft YAML and change history; local links/profile/source anchors resolve.
- Both batch research packages remain ignored by Git, with the original batch brief as the existing allowlist exception.

## Repository validation and authority

`rtk make validate` remains unsuccessful because of the existing `tmp`, `investors/work` and `work/m-capital/work` directory-policy findings, plus unresolved vendor-package README links under the slide generator's `vendor/node_modules`. No canonical record changed; catalog regeneration is not applicable. No claim of full repository validation is made.

No investor acceptance of founder-secondary proceeds has been confirmed. Published shareholder liquidity, acquisitions, primary investment and group size are separate evidence categories. Full financial/legal-entity eligibility remains unresolved. Review the exact material and audience before external use.
