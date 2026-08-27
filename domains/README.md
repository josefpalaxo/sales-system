# Sales domains

A domain is a cohesive sales motion with domain-specific knowledge, messaging, methodology, plays, or templates. Initial domains are:

- [`direct-sales/`](direct-sales/README.md)
- [`partnerships/`](partnerships/README.md)

## Domain capsule

```text
domains/<domain>/
├── README.md
├── knowledge/
├── messaging/
├── methodology/
├── plays/
└── templates/
```

Use the same layer semantics in every domain. Cross-domain concepts belong under `shared/` and are referenced by stable ID.

## Adding a domain

1. Confirm it is a durable sales motion, not a temporary initiative.
2. Register the domain slug in `governance/vocabularies.yaml`.
3. Name an accountable owner in `governance/owners.yaml`.
4. Create the capsule and a README defining scope, boundaries, consumers, and shared dependencies.
5. Add only layers containing actual work; empty layer README files are optional after the initial examples.
6. Add CODEOWNERS routing when a real GitHub team is known.
7. Run `rtk make catalog` and `rtk make validate`.

Do not create another working directory inside a domain. All working material goes under the root `work/`.

