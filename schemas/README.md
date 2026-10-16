# Record schemas and validation

Maintained reusable records are Markdown with YAML frontmatter. [The common envelope](common.schema.json) records identity, scope, status, confidentiality, accountability, reviews, sources and relations. Supporting READMEs need no envelope; imported READMEs that already own IDs retain their records.

Unknown draft owners and review dates may be explicit null/unassigned. These values do not count as review or approval evidence. Reviewed and approved records require registered owners and real review dates. Stable legacy `domain` values describe sales scope without requiring physical domain folders.

Full masters and explicit structured representations live with their subjects. Masters carry `record_role: master`; representations retain `master_id`, `master_revision` and `derives_from`. Approval and revision agreement are enforced.

The validator checks reusable records, registered IDs and relations, master dependencies, topic paths and deck companions, active Markdown links and retired roots. It respects Git exclusions, skips historical source links and project scratch, and validates exported snapshots without requiring Git metadata. Relationship records remain outside the reusable catalogue; investor provenance and state checks run from the root validation target.

Run `rtk make catalog` after record changes and `rtk make validate`. Focused regression tests cover master dependencies, draft versus approved metadata, exported snapshots and local dependency exclusions.
