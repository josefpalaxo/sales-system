---
id: signfide:website-prototype-references-heritage-evidence
title: "Circularo heritage evidence and hosting clarification"
kind: working-document
status: draft
owner: unassigned
updated: "2026-10-14"
classification: confidential
sources:
  - "../CIRCULARO-HERITAGE-HANDOVER.md"
---

# Circularo heritage evidence and hosting clarification

Reviewed 2026-10-14. Internal working evidence for the local prototype; non-canonical and not publication approval. Original instruction-pack reference snapshots are unchanged.

## Service-model sources

- [Heritage handover](../CIRCULARO-HERITAGE-HANDOVER.md) supplies the requested website changes and evidence boundaries.
- [Cooperation responsibilities and RACI](../../company/cooperation-responsibilities-and-raci.md), especially Initial service model, supplies the Circularo-managed co-branded baseline, customer/platform responsibilities, and applicable Circularo-branded ecosystem. It is a confidential proposed appendix, not executed, and does not establish a live service. Only the scoped customer explanation was used; private terms and operating-team details are absent from generated pages.
- `company:circularo` in the shared company record is reviewed/internal rather than approved. It does not supply approved corporate proof, longevity, headquarters, or legal-entity claims. None was inferred for this prototype.

## Public-source recheck

| Source | Observed support | Treatment and limit |
| --- | --- | --- |
| [Circularo official website](https://www.circularo.com/) | Publishes agreement-platform positioning and named Circularo-branded apps and integrations | Official-site link and ecosystem context only; no Signfide entitlement inferred |
| [Circularo’s Abdulla Al Awadi & Associates story](https://www.circularo.com/customers/abdulla-alawadi/) | Publishes a law-firm example concerning approval and sign-off processes | Attributed summary and link; no testimonial, copied assets, transferred compliance claims, or Signfide customer implication |
| [Circularo’s Dubai Courts story](https://www.circularo.com/customers/dubai-courts/) | Publishes an internal approvals/signatures/records example | Attributed summary and link; no court endorsement or US legal-suitability claim |
| [Circularo for Office 365 listing](https://marketplace.microsoft.com/en-us/product/office/WA200008822?tab=Overview) | Circularo-branded marketplace listing is present | Background evidence only; not an advertised Signfide inclusion or additional website destination |

The sources were opened again during this implementation. Page existence and published text were checked; reported customer results were not independently audited. Website copy describes Circularo’s published examples and explicitly separates them from Signfide’s own service reputation. No numerical outcomes, certifications, longevity figures, or customer counts were reused.

## User-supplied hosting clarification

Josef stated in the active implementation chat on 2026-10-14: “it's hosted in MS Azure in USA”.

Scope used: the service is hosted on Microsoft Azure in the United States. Evidence state: owner-reported; not independently verified. This supersedes planned-only location wording in the original handover for this local prototype.

Not established by that clarification: the dedicated-environment configuration, exact region, launch readiness, commercial availability, subprocessors, retention, security controls, certifications, or service commitments. Those remain in [launch questions](../LAUNCH-QUESTIONS.md). The marketing prototype itself remains a loopback-only local preview.

## External-navigation boundary

The three URLs in `src/external-links.mjs` are the only reviewed external anchors. They have explicit labels, visible external indicators, new-tab disclosure, and `noopener noreferrer`. Build checks reject other external navigation, external runtime assets, and embeds. Browser QA validates destinations without fetching or following the external pages, keeping zero external runtime requests, submissions, and storage intact.
