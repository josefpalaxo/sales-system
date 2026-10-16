# Repository structure

The repository is a practical sales library with three content destinations:

1. `shared/`: reusable knowledge and materials, organized by subject.
2. `relationships/`: context for a specific organization.
3. `work/`: projects, experiments and preparation.

`shared/` contains company, product, commercial, messaging, playbooks, market, proof, templates and assets where real content exists. Direct sales and partnerships are sales motions, represented in metadata and task-oriented guidance rather than separate knowledge trees.

Full masters and structured representations live with their subject. Stable IDs, `record_role`, revision references, approval metadata and conflicts express authority. Draft reusable material is discoverable in `shared/`; its placement never grants approval. Relationship records remain operational context, outside the reusable catalogue.

`governance/` holds ownership, vocabularies, source registration, decisions and conflicts. `sources/` preserves original inputs and historical snapshots. `.agents/` holds procedures and brand/tool resources. `scripts/` and `schemas/` support validation; `generated/` contains derived catalogues.

## Extend only when useful

- Add a document to the closest existing subject before creating another category.
- Add a folder when actual content or a distinct maintained responsibility needs it.
- Keep one maintained home per concept; reference stable IDs across subjects.
- Create a structured representation only when a real consumer needs it, and reconcile it with its master.
- Use status, classification and evidence independently. Keep uncertainty and open conflicts visible.
- Keep build products and local dependencies out of version control. Preserve selected deliverables and their sources.

The [migration report](work/repository-restructure/README.md) records how the previous domains and standalone workspaces were consolidated. Root instructions, schemas, validators and skill routing follow this structure.
