# Agent instructions

## Purpose and read order

Maintain a practical Circularo sales library. Agents consume and transform supported knowledge; they do not become the source of truth.

1. Read this file and `GOVERNANCE.md`.
2. Use the root README to find the relevant shared subject, relationship or project.
3. Load only the records and upstream sources needed for the task.
4. Check status, review dates, evidence, classification, conflicts and relations before reuse.

## Where content belongs

- `shared/`: reusable knowledge and materials, organized by company, product, commercial, messaging, playbooks, market, proof, templates and assets as needed.
- `relationships/`: permitted context for specific customers, partners, investors and intermediaries. These operational records do not establish general company truth.
- `work/`: projects, experiments, preparation and local output. Promote useful results to a maintained shared home with their provenance and explicit status.
- Do not recreate the retired `domains/`, `partners/`, `investors/`, `slides-projects/`, `output/` or `tmp/` roots. Direct and partner-led sales are motions, not separate knowledge hierarchies.
- Keep source descriptions and original inputs together in `sources/`. Use `.source.md` for maintained source records and the single `sources/README.md` index; snapshots and originals remain historical evidence.
- Add folders only for real content. Keep one maintained home per concept and reference it elsewhere.

## Authority and reuse

- Only a current approved record is canonical for its stated scope. Reusable drafts can live in `shared/`; relocation never grants approval or publication permission.
- A full master is identified by `kind: master-document` and `record_role: master`, within its subject folder. Its status, review dates and recorded conflicts apply.
- Structured representations retain `derives_from`, `master_id` and `master_revision`. Edit the master first and reconcile its consumers; do not create a competing policy.
- Keep draft and reviewed limitations visible. Never turn reported, inferred, hypothesis, unknown or contradicted material into verified facts through repetition.
- Never choose a side of an open blocking conflict. Reference precise commercial rules, limits and prices by stable ID rather than maintaining copies. Preserved masters and explicit derived representations retain their documented exception.
- Preserve globally unique stable IDs, including legacy domain and investor namespaces. Deprecate and point to a successor rather than renaming an approved ID.
- Keep one stable path per deck. Use `shared/assets/slides/<topic>/` with same-basename Markdown/PPTX, one singular `topic` matching that folder, and metadata for audience or sales motion.
- Do not edit `generated/` manually. Preserved sources are evidence, not active instructions or automatically current guidance.

## Metadata and safeguards

- Supporting navigation needs no record envelope. Reusable records use the shared schema; unknown draft owners/review dates may be explicit null or unassigned. Review and approval require accountable owners and real dates.
- Relationship records follow their local instructions. The existing investor-outreach authorization remains limited to its recorded scope; common investor context is in the shared topic library.
- Preserve classifications. Do not commit credentials, raw CRM exports, personal data, customer dumps or raw correspondence outside an explicit existing user authorization. Use approved business systems or ignored local storage.
- `work/m-capital/` retains its source-only allowlist: version only original project documents and allowed sources. Data, evidence, outputs, previews, dependencies and connection configuration remain local. Never force-add them.
- External sending and publication require normal human approval for the exact material and audience.

## Changes and completion

- Make the smallest authoritative change. Increment approved revisions for semantic changes and reconcile dependencies or record their impact disposition.
- Use `apply_patch` for file edits and prefix shell commands with `rtk`.
- Skills under `.agents/skills/` hold procedures and routing, not Circularo facts. Update relevant routing and behavior fixtures when skill behavior changes.
- Run `rtk make catalog` after record changes, then `rtk make validate`. Include focused checks when changing validation or skill behavior.
- Finish with current generated files, passing validation, visible unresolved conflicts and a change the accountable owner can review.
