# Repository storage and versioning

Apply these rules when the current repository is the Circularo sales system.

## Route by lifecycle

- Put source extracts, build scripts, renders, montages, inspection output, and other temporary material under `work/slides/<task>/`. This is the repository's only working tree and is ignored by Git.
- Put a durable deck that applies across sales domains under `shared/assets/slides/<topic-path>/`.
- Put a durable domain-specific deck under `domains/<domain>/assets/slides/<topic-path>/`.
- Keep each committed `<stable-name>.pptx` beside a governed `<stable-name>.md` record. Use the same basename and declare `domain` plus an ordered `topics` list that mirrors the topic folders.
- Treat the ordered `topics` list as the primary hierarchy, from broadest to narrowest. Express secondary associations as stable-ID relations rather than copying the deck into another topic.
- Do not promote account-specific working output, personal data, raw customer material, or restricted content into the repository.

## Use stable filenames

Update the existing PPTX at its stable path for normal revisions. Git history is the version history.

Do not create filenames containing revision markers such as `v2`, `v3`, `final`, `final-final`, dates, or initials unless the user explicitly asks for a frozen historical edition. Increment the companion record's `revision` when an approved deck changes semantically.

Create a separate deck only when it is a durable variant with a different audience, purpose, language, legal scope, or sales domain. Name that distinction directly, for example `partner-overview.pptx` or `moi-sovereign-trust-platform.pptx`, and give each variant its own governed record.

## Promotion checklist

Before promotion:

1. Confirm the topic and owning domain.
2. Check for an existing stable deck and update it instead of adding a numbered copy.
3. Complete visual and overflow QA.
4. Create or update the same-basename Markdown record without upgrading unverified claims or approval state.
5. Remove scratch output from the handoff and run repository validation.
