---
id: signfide:website-prototype-agents
title: "Signfide website prototype instructions"
kind: instructions
status: draft
owner: unassigned
updated: "2026-10-14"
classification: confidential
sources:
  - "../AGENTS.md"
  - "PRODUCT.md"
  - "DESIGN.md"
---

# Signfide website prototype instructions

## Scope and handling

This is internal, non-canonical prototype work. Parent repository instructions and governance still apply. Read README.md, PRODUCT.md, DESIGN.md, then the local source snapshot and wordmark board before implementation. Use DESIGN.md for the user's chosen visual direction; source recommendations do not establish verified product or commercial facts.

All project-specific writes must stay under this directory. Keep source, assets, dependencies, configuration, content drafts, screenshots, QA notes, and build outputs here. Do not create a nested Git repository or a nested directory named `work`. Do not modify parent manifests, lockfiles, configuration, shared records, or adjacent Signfide materials. Do not switch branches, stash unrelated work, stage unrelated files, commit, or push as part of building the prototype.

Use `apply_patch` for authored file edits. Prefix shell commands with `rtk` according to the repository instructions. Use this folder as the working directory for project commands. Never write credentials or real contact/customer data.

## Skill routing

- Impeccable: primary design, brand context, responsive refinement, critique and polish. Follow its setup workflow with this folder as the target. Explicit user-selected colors take precedence over random palette seeds or generic style prohibitions.
- Sites: local-only implementation workflow. Do not register a Site, synchronize hosted source, package for publication, or deploy.
- React best practices: use if the implementation edits React components.
- Imagegen: optional, only where a new image materially helps. Save any resulting asset here. Do not fabricate product screenshots or use the full identity board as the website logo.
- Browser tools: inspect the actual implementation at desktop and mobile sizes, including keyboard navigation and interactive states.
- Vercel web-design-guidelines: optional audit if already installed. Missing optional tooling is not a blocker and does not authorize installation.

## Execution

Choose the simplest maintainable implementation that supports eight direct-loadable routes and browser-local interactions. A buildless static implementation is acceptable; use a framework only when it provides a concrete benefit. Keep dependencies local and minimal. When using a package manager, save its manifest and lockfile here.

Implement the homepage and common shell, inspect and refine them, then complete the remaining routes. Use one coherent system across pages while varying layouts for their content. Do not stop at an isolated hero, a static image, a collection of empty routes, or a plan.

Content can be drafted to complete the website, but unverified launch facts must remain visibly qualified or omitted. Record unresolved choices in the single project register at [OPEN-QUESTIONS](../OPEN-QUESTIONS.md). Keep `LAUNCH-QUESTIONS.md` as a concise navigation view to those stable IDs, not another live registry. Follow the parent SignFide YAML metadata conventions for first-party Markdown. Do not research or select commercial commitments on the owner's behalf.

## Completion

Verify all routes, internal links, navigation, CTAs, form states, browser history and mobile layouts. Check accessible labels, focus visibility, contrast and reduced-motion behavior. Confirm the site builds or serves without missing assets or console errors. Save representative screenshots and a concise QA report under `qa/`; report any verification limits honestly.

Update README.md with reproducible commands and the implemented structure. Keep ignored dependency/build/QA files local. Run the repository-required catalog and validation checks when applicable; disclose unrelated existing failures without expanding this project's scope. Keep all unresolved claims and launch decisions visible. A working local prototype is the deliverable; public launch is a separate request.
