---
schema_version: 1
id: source:sales-repo-canonical
kind: source
domain: shared
title: Sales Repo Canonical Document Library
status: reviewed
revision: 1
classification: restricted
owner: role:cso
last_reviewed: 2026-10-14
review_by: 2027-01-12
sources: []
relations: {}
spec:
  original_location: /Users/josefneumann/Projects/ai-workspace/sales-repo/canonical
  review_scope: migration inventory and integrity only; not business approval
  inventory: work/commercial-master-migration/manifest.json
  authority: source status is preserved per document; folder naming does not approve draft material
---

# Sales Repo Canonical Document Library

Josef requested that the canonical document library be retained in sales-system, with full master documents as the business authority and smaller records as derived representations. Cross-domain material is under [shared master documents](../../shared/master-documents/README.md); partner-specific material is under [partnership master documents](../../domains/partnerships/master-documents/README.md).

Most imported documents were marked draft. One API licensing rationale was marked approved but lacked review dates; its imported record is reviewed pending confirmation of current approval and dates. The source metadata is preserved in each imported document. Legacy external labels are treated as intended audiences, not publication approval. Strictly internal price-book material is restricted.

The original source folder was not modified. The Commercial Model differs from the already approved sales-system source revision; the latter remains the active master, with the original source preserved as historical comparison. The [migration report](../../work/commercial-master-migration/README.md) records coverage, hashes, differences, and dependencies outside the imported folder.
