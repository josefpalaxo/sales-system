---
title: "Central investor register verification"
id: investor-workspace:central-contact-register-verification
status: draft
classification: confidential
canonical: false
revision: 2
created: 2026-10-03
updated: 2026-10-03
owner: Josef Neumann
---

## Change history

- 2026-10-03 — Relocated to investors/outreach and authorised for Git versioning. Earlier validation/ignore findings below are historical; see [current relocation checks](../relocation-verification.md).
- 2026-10-03 — Recorded import reconciliation, spreadsheet calculation checks, visual review and the repository validation limitation.

# Central investor register verification

**Deliverable checks passed:** 86 unique people/contact IDs, 105 batch memberships across batches 01–04, 130 organisation research entries, eight observed outbound activities, and eight saved conversation transcripts. No duplicate person names remained; matching personal profiles were consolidated across batches. Avery Rosin's unresolved affiliation was retained rather than assigned to a firm.

The workbook's recalculated totals were 86 contacts, eight “Sent awaiting reply” and 78 “No outreach recorded.” The eight sent entries have October 3 recorded dates; follow-up dates remain blank. Formula inspection reported zero matched errors. The Contacts, Activity and Organisations tabs were rendered and visually inspected.

An appended test activity updated a previously uncontacted person to “Replied” and October 4 in the contact view. A status change on a sent record updated its matching contact. The test row was cleared and the sent status restored before the final export. The final totals returned to 86 / 8 / 78. No test correspondence was sent or retained as an activity.

The calculation engine did not refresh expanded structured Activity references during the first append test. The delivered workbook instead uses aligned, bounded Activity references for 1,000 rows; the same append test then passed. This capacity is documented in the workbook and guide. Native Excel behavior has not been tested.

The builder preserves the initial JSON snapshots separately from the editable workbook and refuses to overwrite an existing workbook. No automatic browser synchronisation or contact monitoring was created. No messages or invitations were sent by the agent.

## Repository validation

`rtk make validate` ran on October 3 and **failed on existing repository issues**:

- Directory policy findings for root `tmp/`, `investors/work/` and `work/m-capital/work/`. The investor workspace is the user's explicitly authorised location.
- Unresolved documentation links in the existing slide-generator vendor copies of `skia-canvas` and `debug`.

The validator reported no register-specific Markdown link errors. These findings also appear in the prior batch verification report; they were not introduced or repaired by this task. No canonical knowledge records were changed, so generated catalog regeneration was not required. Register files and correspondence remain local under the investor work ignore policy; no commit or push was performed.
