# Contributing

## Before changing content

Read `GOVERNANCE.md`, the relevant domain README, and any upstream records referenced by the target file.

## Add or change a record

1. Identify the one authoritative record for the concept.
2. Create or update typed Markdown with the common metadata envelope.
3. Use stable IDs in relations; do not copy upstream facts.
4. Add source locators and preserve evidence state.
5. Check reverse dependencies in `generated/dependency-graph.json`.
6. Update affected consumers or document why no change is required.
7. Run:

   ```bash
   rtk make catalog
   rtk make validate
   ```

8. Open a focused pull request using the repository template.

## Add a domain

Follow [`domains/README.md`](domains/README.md). A domain is a cohesive sales motion with its own knowledge, messaging, methodology, plays, or templates. Do not create a domain merely to group a few files.

## Add an agent skill

1. Use `.agents/skills/<skill-name>/SKILL.md`.
2. Keep `name` and `description` in YAML frontmatter.
3. Put detailed methods in `references/`, reusable output structures in `assets/`, and deterministic operations in `scripts/`.
4. Do not embed Circularo facts in the skill.
5. Add realistic trigger, near-neighbor, behavior, and prohibited-behavior fixtures.

## Add or revise a slide deck

1. Use `work/slides/<task>/` for builds, renders, inspections, and other scratch material.
2. Choose `shared/assets/slides/<topic>/` for cross-domain decks or `domains/<domain>/assets/slides/<topic>/` for domain-specific decks.
3. Add or update the companion `<stable-name>.md` record, using the same basename as the PPTX.
4. Set `domain` and one `topic` in YAML so it exactly mirrors the single folder below `assets/slides/`. Use `tags` and typed `relations` for secondary associations.
5. Replace the existing stable PPTX for a normal revision. Do not add `v2`, `final`, dated, or initialled copies.
6. Create another deck only for a durable audience, purpose, language, legal-scope, or domain variant, and name that distinction directly.
7. Run presentation QA and `rtk make validate` before review.

## Pull request scope

A pull request should change one coherent concept or behavior. Avoid combining unrelated content, schema, packaging, and skill changes.

## Data policy

Do not commit raw CRM exports, live account briefs, personal data, customer transcripts, credentials, or confidential working files. Use `work/` only for temporary local material; Git ignores it.
