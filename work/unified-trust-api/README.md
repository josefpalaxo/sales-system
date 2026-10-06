---
title: Unified Trust API sales preparation
status: draft
classification: internal
canonical: false
prepared_on: 2026-10-06
---

# Unified Trust API sales preparation

**Recommended core message: One API for trusted digital execution.** Lead with orchestration of a document transaction: the required participants and actions, configured trust capabilities, progress events, and the returned document and evidence.

This working pack is for Circularo internal review. It does not approve messaging for external use or change governed product or commercial records. Enterprise buyers and solution architects are the default audience; software vendor, partner and public sector adaptations are included.

## Drafts

- [Sales brief](sales-brief.md) — buyer problem, qualification signals, value, use cases, discovery, objections and a pilot close.
- [Pitch](pitch.md) — thirty-second and ninety-second scripts, an eight-slide storyline, audience variations and a demonstration sequence.
- [Positioning](positioning.md) — category, positioning statement, message hierarchy, differentiation and language boundaries.
- [Evidence and review](evidence-and-review.md) — selected documentation proof, source gaps, governed dependencies and accountable review decisions.
- [Landing page copy](landing-page-copy.md) — replacement web copy for the developer and integrator page, with hero, capability sections, use cases, FAQs and CTAs.
- [Landing page handoff](landing-page-handoff.md) — page structure, SEO metadata, visual direction, source handling and publication review.
- [Proposal copy](proposal-copy.md) — customer-facing introduction, benefits and deployment structure using Josef's supplied packaging wording; API access is presented as a capability of eligible Circularo Plans.
- [Commercial correction review](commercial-review.md) — tracks Josef's latest correction and the shared commercial records requiring reconciliation. The proposal uses this correction as its commercial basis.
- [LinkedIn post drafts](linkedin-posts.md) — five company-page posts covering the introduction, workflow coordination, a contract example, evidence and developer integration.
- [Blog article](blog-article.md) — a full article introducing the connected document process, its benefits, an example and the corrected commercial model.
- [Team Slack message](slack-message.md) — a message Josef can paste when sharing the zip, explaining the pack and six deliverables to finalize.

## Team production status

| Deliverable | Available in this pack | Work to finalize |
| --- | --- | --- |
| Customer-facing slide deck | Eight-slide storyline in `pitch.md` | Produce the branded deck, validate the example and visuals, and approve customer-facing copy. No PPTX is included. |
| Customer-facing proposal or appendix | Introduction, benefits and corrected deployment structure in `proposal-copy.md` | Apply proposal formatting and define offer-specific services, allowances and commercial terms. |
| Unified Trust API brochure | Messaging, sales brief and use-case material | Write the brochure layout copy, design the branded asset and approve it. No brochure is included. |
| Unified Trust API landing page | Copy and handoff notes | Finalize design, implementation, CTA routing and publication. No site implementation is included. |
| LinkedIn posts | Five post drafts | Finalize copy and creative assets, then agree publication order and links. |
| Blog article | Full article draft | Complete editorial and product review, add a visual, finalize metadata and links, and publish through the CMS. |

Suggested review responsibilities: Product and Engineering confirm capability claims and the transaction example; the commercial owner confirms packaging and reconciles the older records; Marketing finalizes copy and design; the web team implements the page. Assign a named owner to each deliverable before production.

For LinkedIn, use the introduction first, then the workflow, contract, evidence and developer posts. The drafts use existing contact and developer-portal links. Once the new landing page is approved and live, use its final link for the campaign where appropriate. No posting schedule or publication date is assumed.

Keep one architecture visual consistent across the deck, brochure, web page and blog. Show an application connected to a configured Circularo document process, with optional trust capabilities and progress/document retrieval returning to the application. Avoid showing all capabilities as mandatory steps.

## Sharing this folder

The editable drafts and supplied API specification and changelog are in this folder. Zip the folder with `README.md` included so the team has the file map and production status. The Slack message is prepared only; it has not been sent, and no assets have been published.

Stable IDs in the review notes refer to governed commercial records in the parent sales repository. Those records are not included in this folder. The proposal and blog use Josef's latest explicit correction, with the discrepancy retained in `commercial-review.md`; their drafting status does not imply that the older records have been reconciled.

## Single file sharing formats

- **For browsing:** `unified-trust-api.html` is a self-contained offline reader with document navigation, search, copying, original Markdown downloads and a print view of the full pack. Open it directly in a browser or share the single HTML file.
- **For AI tools:** `unified-trust-api-repomix.xml` contains the same 11 documents with file boundaries and drafting guidance.

Both editions exclude `26.1.0 - API Changelog.md`, `unified-trust-api.json` and `slack-message.md`. References to those files remain as provenance; their contents are not embedded. External website links require internet access.

The Markdown files remain the editable sources. To refresh the HTML after editing them, run `rtk proxy python3 work/unified-trust-api/html-src/build.py` from the repository root. The reusable generator and reader template live in `.agents/skills/markdown-html-pack/`; `html-src/reader-config.json` holds this pack's title, ordering, labels and exclusions. The local build wrapper uses that shared generator. Regenerate the Repomix bundle separately when the drafts change.

For another folder or selected Markdown files, use the repository-local `$markdown-html-pack` skill or run `rtk proxy python3 .agents/skills/markdown-html-pack/scripts/build.py /absolute/path/to/folder --output /absolute/path/to/reader.html --title "Document pack"`. The generated HTML can be shared alone; rebuilding from this folder requires the parent repository's shared generator and local Pandoc.

## Source inputs

- [Unified Trust API specification](unified-trust-api.json), labeled Circularo API for Integrators, version 26.1.0.
- [Local 26.1.0 changelog](26.1.0%20-%20API%20Changelog.md), with the relevant passages checked against the authenticated [Confluence page](https://circularo.atlassian.net/wiki/spaces/sd/pages/1000898990/26.1.0+-+API+Changelog).
- Josef's supplied positioning notes recommending orchestration as the central differentiation.
- Current approved commercial records referenced by stable ID in the evidence note.
- Josef's latest explicit commercial correction, recorded for review in `commercial-review.md` and applied to the proposal and blog drafts.

## Review focus

Confirm the naming and message, the configured services and assurance for the first use case, and the demonstration. Reconcile the 26.1.0 schema gaps for identity matching, template settings and Certificate of Fulfillment before building relevant payloads. The draft claims no universal provider support, guaranteed compliance, quantified savings or dedicated AI-agent governance.

Normal revisions replace these files. The supplied source files remain unchanged, and this folder uses the parent repository.
