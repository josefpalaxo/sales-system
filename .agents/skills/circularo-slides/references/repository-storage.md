# Repository storage and versioning

Apply these rules in the Circularo sales repository.

- Author and inspect decks under `work/slides/<task>/`. Permitted sources and selected deliverables may be versioned; dependencies, caches and render previews stay local.
- Keep maintained reusable decks at `shared/assets/slides/<topic>/<stable-name>.pptx` for every sales motion, including partner enablement. The same-basename Markdown record owns status, classification, audience, sources and approval boundaries.
- Set one singular `topic` matching the single folder below `assets/slides/`. Keep `domain` as sales-scope metadata; use tags and typed stable-ID relations for secondary associations. Do not create nested topic paths or a `domains/` tree.
- Put organization-specific material in the relevant `relationships/` workspace or working project, subject to its handling rules. Do not promote raw account data as a reusable asset.
- Before drafting from company messaging, use `shared/messaging/circularo-narrative/README.md` and inspect its draft status and claim boundaries. Approved facts and commercial records retain their authority.

Normal revisions replace the stable PPTX; Git history preserves earlier versions. Create another file only for a distinct durable audience, purpose, language or legal-scope variant. An approved semantic change increments the companion revision.

Before promotion, check the existing stable path, complete visual and overflow QA, preserve source and approval states, and run repository validation. Moving a draft into the shared library does not approve its claims or external use.
