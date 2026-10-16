# Contributing

Read `AGENTS.md`, `GOVERNANCE.md`, the relevant subject or relationship instructions, and any upstream records before editing.

## Choose a home

Use `shared/` for material maintained for reuse, `relationships/` for an organization and `work/` for a project or experiment. Add folders only when real content needs them. Direct sales and partner sales share the same knowledge library; organize playbooks around useful tasks.

## Maintain reusable material

1. Identify the one governing record. Change a full master first when its definitions change, then reconcile derived representations and revision references.
2. Preserve stable IDs, status, classification, evidence and source lineage. Moving a draft into `shared/` does not approve it.
3. Use the [shared schema](schemas/README.md) for maintained records. Navigation READMEs need no envelope. Unknown owner/review dates may be explicit null/unassigned in drafts; do not invent review evidence.
4. Reference exact commercial rules by stable ID and inspect dependencies in `generated/dependency-graph.json`.
5. Reconcile affected consumers or record their impact disposition. Increment approved revisions for semantic changes.
6. Run `rtk make catalog` and `rtk make validate`, then prepare a focused review through the pull-request template.

Promote a coherent reusable package with its supporting review and provenance when that helps readers. Keep historical sources explicitly separated. Do not split a document into small records without a concrete consumer need.

## Presentations

Use `work/slides/<task>/` for authoring and QA. Maintained reusable decks live at `shared/assets/slides/<topic>/<stable-name>.pptx` beside the same-basename Markdown record. Set one `topic` matching the folder and use metadata for sales motion, audience and secondary associations. Normal revisions replace the stable file; create a separate file only for a distinct durable variant. Complete visual and overflow QA before promotion; location does not approve claims.

## Agent skills

Use `.agents/skills/<skill-name>/SKILL.md` with name and description frontmatter. Keep procedures separate from business facts. Update realistic routing and behavior fixtures when behavior changes; validate changed scripts or routing.

## Data and build files

Preserve local allowlists and the explicitly authorized investor-outreach scope. Keep credentials, unrelated personal/raw customer data and CRM exports out of Git. Version permitted editable sources and selected deliverables; dependencies, caches, preview renders and temporary build directories remain local. Do not force-add excluded files.
