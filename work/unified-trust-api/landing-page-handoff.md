---
title: Unified Trust API landing page handoff
status: draft
classification: internal
canonical: false
prepared_on: 2026-10-06
---

# Unified Trust API landing page handoff

Use [Landing page copy](landing-page-copy.md) as the replacement body for the current developer and integrator page. The recommended structure leads with a connected document transaction, then gives buyers and developers clear paths to an integration discussion or the API reference.

## Page scope and metadata

| Item | Recommendation |
| --- | --- |
| Existing route | Keep `/for-developers/` for this revision. |
| Navigation label | Unified Trust API |
| Hero eyebrow | Circularo Unified Trust API |
| H1 | One API for trusted digital execution |
| SEO title | Unified Trust API for Developers and Integrators \| Circularo |
| Meta description | Connect identity verification, approvals, signatures, seals, timestamps and document evidence to your applications with Circularo Unified Trust API. |
| Primary CTA | Discuss your integration → `https://www.circularo.com/contact/` |
| Secondary CTA | Explore the API → `https://developers.circularo.com/` |
| Primary audience | Enterprise application teams and solution architects |
| Supporting audiences | Developers, software vendors and integration partners |

The contact destination and developer portal were checked on 6 October 2026. The portal's root redirects to `/latest`; use the stable root link in page copy. No new form, scheduling link or API trial entitlement is assumed.

## Section sequence

1. **Hero:** State the orchestration proposition and offer both next steps.
2. **Buyer problem:** Explain what has to connect around document execution.
3. **Capability grid:** Six concise cards connect verification, workflow, signing, sealing, evidence and events to the process.
4. **How it works:** Initiate the transaction, coordinate required actions, return the result.
5. **Use cases:** Contract execution, digital services and enterprise automation.
6. **Evidence:** Explain the value after signing: visibility, retrieval and document history.
7. **Developer resources:** Retain the technical route through REST API documentation, examples, authentication and webhooks.
8. **Audience cards:** Enterprise teams, software vendors and integration partners.
9. **FAQ:** Explain the name, scope, integration path and provider confirmation.
10. **Closing CTA:** Invite the visitor to discuss one real transaction.

For a shorter layout, combine the use cases and audience cards; retain the hero, capability grid, evidence section and developer route.

## Visual direction

Use one main architecture visual alongside the hero or buyer problem. Show the business application connected to Circularo Unified Trust API, with the configured document process inside Circularo. Group participant verification, reviews and approvals, signatures, seals and timestamps around that process. Show progress events and document/audit retrieval returning to the application.

Do not present every capability as a mandatory sequence. The workflow determines the actions and order. Label a use-case flow as an example, and use application types rather than third-party logos that might imply a supplied connector. Use a synthetic executed document and audit trail if illustrating outputs.

## Changes from the current page

The [current page](https://www.circularo.com/for-developers/) starts with an eSigning API proposition and organizes its body around developers, partners, system integrations and API onboarding. Those audiences remain relevant. The replacement gives the connected trust process the opening role and keeps developer resources as implementation support.

Replace the general API add-on inclusions block with an implementation discussion. Exact packaging belongs in the current governed commercial records. Avoid carrying broad compliance, leadership or effortless implementation language into this draft without separately approved evidence.

The reusable corporate header, navigation and footer are outside the replacement body. The page's final promotional callout is replaced by the transaction-specific CTA.

## Sources and claim handling

| Source | Use in this draft |
| --- | --- |
| [Positioning](positioning.md) and [Pitch](pitch.md) | Proposed message, audience emphasis and transaction story. Both remain internal drafts. |
| [API specification](unified-trust-api.json) | Document workflows and creation, recipient purposes and routing, external-recipient KYC controls, signing, sealing and timestamps, audit PDF, authentication and webhooks. Evidence locators and limits remain in [Evidence and review](evidence-and-review.md). |
| [Current developer landing page](https://www.circularo.com/for-developers/) | Existing audience and content structure; not independent approval of new claims. |
| [Developer portal](https://developers.circularo.com/) | Directly checked resource categories: getting started, scenarios, example integrations, webhooks and REST API documentation. |
| [Contact page](https://www.circularo.com/contact/) | Checked destination for an integration inquiry. |

The page uses generic document audit language. It does not promote the Certificate of Fulfillment option or newer identity-matching fields while their supplied-schema gaps remain unresolved. It also makes no qualified legal-status, residency, universal-provider, quantified-savings or AI-agent-governance claim. Workflow governance and access controls are not presented as verification of legal signing authority.

Commercial references remain `commercial-rule:api-access`, `commercial-rule:add-on-plan-eligibility`, `commercial-rule:automated-transactions` and `commercial-rule:sandbox-environments`; do not turn the capability grid into an entitlement table.

## Publication review

Product and Engineering should confirm the advertised capability scope and configured-service qualifier. Product Marketing should approve the name and copy, with CSO review for commercial consistency. The draft is ready for those owners to review; it is not published or approved for external reuse.
