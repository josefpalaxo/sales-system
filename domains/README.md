# Sales domains

A domain is a cohesive sales motion with domain-specific knowledge, messaging, methodology, plays, or templates. Initial domains are:

- [`direct-sales/`](direct-sales/README.md)
- [`partnerships/`](partnerships/README.md)

## Domain structure

```text
domains/<domain>/
└── README.md
```

Do not replicate the `shared/` structure inside each domain. A domain starts with only a README defining its scope, boundaries, consumers, and shared dependencies. Add content only when governed domain-specific records exist, and organize it around the durable concepts of that sales motion rather than a fixed repository-wide folder template. Record metadata, tags, and typed relations provide cross-domain discovery.

Cross-domain concepts belong under `shared/` and are referenced by stable ID. If a domain later owns reusable binary artifacts, add `assets/` at that time. Topic-organized slide decks use `assets/slides/<topic>/`; their singular `topic` YAML must mirror that folder. Follow the asset and versioning rules in `GOVERNANCE.md`.

## Adding a domain

1. Confirm it is a durable sales motion, not a temporary initiative.
2. Register the domain slug in `governance/vocabularies.yaml`.
3. Name an accountable owner in `governance/owners.yaml`.
4. Create the domain directory with a README defining scope, boundaries, consumers, and shared dependencies.
5. Do not pre-create content layers. Add concept-oriented directories only when actual governed records require them.
6. Add CODEOWNERS routing when a real GitHub team is known.
7. Run `rtk make catalog` and `rtk make validate`.

Do not create another working directory inside a domain. All working material goes under the root `work/`.
