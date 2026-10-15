---
id: signfide:website-prototype-product
title: "Signfide website prototype"
kind: working-document
status: draft
owner: unassigned
updated: "2026-10-14"
classification: confidential
sources:
  - "references/website-strategy-source.md"
  - "../company/cooperation-responsibilities-and-raci.md"
---

# Signfide website prototype

## Platform

web

## Register

brand

## Purpose and audience

Create a credible, warm, precise marketing prototype for Signfide, a proposed US legal agreement and eSignature brand powered by Circularo. Primary visitors are attorneys, law firms, and legal teams evaluating agreement workflows. They need to understand the proposed offer, see relevant legal-document scenarios, explore trust information, and find a clear next step.

This prototype tests presentation, information architecture, copy, and navigation. It does not implement an eSignature product, a live trial, production booking, authentication, billing, or an agreement backend.

## Identity and core messaging

- Name: Signfide; lowercase `signfide` in the wordmark.
- Main tagline: Signing in faith.
- Homepage headline: Legal agreements, signed with confidence.
- Use “Powered by Circularo” as a secondary endorsement, particularly on About and Security & Trust.
- Link hero and footer endorsements to `/about#powered-by-circularo`, keeping the Signfide identity primary.
- Explain “faith” in the sense of good faith and authentic agreements, without religious imagery.
- Use clear US English and concrete legal workflows. Avoid unverifiable superiority claims or generic promises.

## Required routes

| Route | Required content and behavior |
| --- | --- |
| `/` | Hero; concise proposed value; preparation-to-record workflow; legal scenarios; reasons to evaluate; trust introduction; final CTA. Use the source strategy's hierarchy as a starting point, not a rigid repeated-card template. |
| `/solutions/law-firms` | Engagement letters, NDAs, service agreements, and other illustrative scenarios; explain the workflow and team/client benefits without promising unverified functionality. |
| `/features/electronic-signatures` | Explain the proposed sender/recipient journey with a clearly labeled illustrative document demonstration. Distinguish a demonstration from an actual product screen. |
| `/features/document-workflows` | Show preparation, review, approval, signing, and record retrieval as the proposed experience. Present a legible visual sequence or interactive example. |
| `/pricing` | A useful pricing enquiry page explaining the information needed for a quote: team size, signing volume, workflow needs. State that pricing is to be confirmed. No invented prices, plan entitlements, discounts, or unlimited-use promises. |
| `/compare/docusign` | An evaluation guide organized around legal workflows, usability, migration, support, and total cost. Use buyer questions rather than unsupported winner/loser comparisons. Mark a feature matrix as pending verification if included. |
| `/security` | Describe the trust questions a buyer should evaluate: identity, integrity, evidence, hosting, access, and retention. Explain owner-reported US Microsoft Azure hosting and Circularo’s planned platform operations role. Assurance, certification, exact configuration, and legal details remain pending. |
| `/about` | Brand story, good-faith principle, proposed US legal focus, and Circularo relationship. Do not invent team members, addresses, customer numbers, company history, or contact details. |

## Circularo foundation and service model

The initial operating-model baseline is a Circularo-managed co-branded service, using applicable Circularo editions and an agreed configuration. Signfide is the planned US brand and commercial entity: it handles the customer relationship, onboarding, and first-line support. Circularo supplies and operates the underlying technology, maintains the software, and handles technical escalation.

Josef confirmed in the active implementation chat on 2026-10-14 that the service is hosted on Microsoft Azure in the United States. Use that supplied location in this internal prototype. Record it as owner-reported evidence, not an independent infrastructure audit. This supersedes the handover's planned-only hosting wording. The dedicated-environment configuration, edition scope, readiness, charges, and service commitments remain unresolved; hosting location does not establish commercial availability or assurance.

Applicable applications and integrations retain Circularo branding. No separately published Signfide app or integration ecosystem is included in the initial model. The final offer will list available components and their requirements; do not imply every Circularo capability is included.

Use the existing About page for the anchored relationship explanation and the native-disclosure FAQ at `/about#service-questions`. Homepage content introduces the division of roles alongside the trust narrative. Product pages link to the explanation while keeping fictional examples clearly labelled. Do not expose internal operating-team names, RACI, ownership, capital, or supplier terms in generated pages.

Heritage statements describe what Circularo publishes about its own experience. They do not establish Signfide customers, US legal suitability, inherited certifications, or results for the planned service. Only the reviewed official navigation URLs in `src/external-links.mjs` are permitted. Label them as external and opening in a new tab; load no external runtime assets. See [heritage evidence](references/heritage-evidence.md).

## Navigation

Provide accessible desktop navigation and a working mobile menu. Suggested grouping: Product (the two feature pages), Solutions (Law Firms), Pricing, and Why Signfide (About, Security & Trust, comparison). The source's Resources navigation item may be omitted until there is actual resource content; do not leave empty destinations. Use footer links to make every required route discoverable.

## CTAs and forms

Use “Book a Demo” as the default primary CTA, leading to an accessible local dialog or on-page enquiry form. Because no booking or submission integration is provided, explicitly identify the interaction as a prototype, use no external endpoint, and show “Demo request preview — nothing was sent” after valid completion. Do not persist entered data. Include required-field, error, close, focus-return and success-preview states.

Do not advertise an available free trial. “Start Free” becomes appropriate only after the owner confirms a working signup path. Secondary CTAs such as “Explore the signing experience” should lead to relevant prototype content. Use “Discuss pricing” on the pricing page.

## Evidence and content boundaries

The supplied strategy has an empty supporting-page-copy section. Draft complete, concise copy within these boundaries rather than leaving lorem ipsum or empty pages. Identify the site as an internal prototype with proposed capabilities using one discreet, persistent notice; qualify specific unsupported claims where they appear.

Do not fabricate customer logos, testimonials, usage statistics, security badges, product screenshots, compliance claims, competitor shortcomings, live availability or commercial terms. Use only fictional example documents and names in demonstrations, labeled as illustrative. Do not imply mock workflow states prove shipped product capabilities. Put unresolved product, price, assurance, booking, hosting, legal and asset questions into LAUNCH-QUESTIONS.md.

## Acceptance criteria

All eight routes render on direct navigation and refresh. Navigation and browser history behave correctly. CTAs have meaningful local destinations and forms honestly describe their behavior. Desktop, tablet and mobile layouts are readable and complete. The result includes usable source, local assets, reproducible run/build instructions, QA evidence and unresolved launch questions. It remains local until separate publication instructions are given.
