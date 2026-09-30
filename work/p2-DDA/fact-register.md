# Digital Dubai Authority — discovery fact register

Status: working draft; non-canonical, internal discovery material.
Last updated: 2026-09-20.
Source S01: user instructions and pricing table in this task, 2026-09-20. All supplied commercial inputs below are reported by the user, not independently verified or approved commercial terms.

Source S02 (corrected by the user): user-provided workbook `DDA deparments shared service.xlsx`, worksheet `dda departments`, columns A:B only (`#` and `Company Name`), inspected read-only on 2026-09-20. The user identifies these columns as the potential list of all DDA departments that could use the service. This supersedes the earlier reference to `91 Entities Model` as the entity-list source. Columns C onward are excluded from factual intake.

User clarification, 2026-09-20: content previously taken from `91 Entities Model` represents our assumptions, not facts. That sheet is not a factual source for this register.

Source S03: existing-customer table and accompanying project/licensing explanation supplied directly by the user in this task, 2026-09-20. Recorded as user-reported facts for discovery; not independently verified against contracts or invoices. S03 is the current source for existing-customer details, including where these differ from assumptions in `91 Entities Model`.

Source S04: internal survey responses from Dubai entities, conducted by DDA, as supplied directly by the user in this task on 2026-09-20. The user identifies this as very important evidence. Evidence state: reported survey results. Classification: internal. The date received is not the survey fieldwork date, which has not been supplied. The pasted table is the source; no other workbook sheet is substituted for it.

Source S05: executive business-case requirements and immediate correction supplied by the user in this task, 2026-09-20. The initial procurement target is **at least 10,000 users**, superseding the user's earlier reference to 1,000. These requirements establish the intended decision, audience, and analysis horizon; they are not a confirmed buying commitment or proven financial return.

Source S06: baseline correction supplied by the user in this task, 2026-09-20. Use **DDA Shared Service Price (20% off), AED 2,360 per user/year**, as the business-case savings baseline. Keep **Regular Basic Price, AED 2,950 per user/year**, for reference only. This supersedes the earlier list-price savings comparison; it does not change reported existing contract amounts in S03.

Source S07: user answers about scope, research, timing, price protection, and funding, 2026-09-20. Interpret by answer content rather than question numbering, which does not align exactly with the previous questions.

Source S08: user-confirmed cumulative growth interpretation and detailed 10,000-user commercial offer, 2026-09-20. Recorded as user-supplied commercial terms for this business-case analysis, not a signed customer agreement. S08 supersedes earlier uncertainty about included services, standard support, onboarding, and specified migration-charge cessation.

Source S09: user answers to support and hosting clarifications, 2026-09-20. Add 10% support to the baseline too; on-premise support is 20%; all four existing SaaS customers qualify for the specified Azure migration-charge cessation. The scope and replacement mechanics of the on-premise percentage are being clarified separately.

Source S10: user confirmation of on-premise support mechanics, 2026-09-20. In both baseline and central scenarios, 20% support replaces the standard 10% on the on-premise customers' allocated annual subscription fees, and replaces their old support charges. This resolves S09's allocation/replacement question; do not apply 30% or retain superseded support charges.

## Confirmed offer and migration rules

Sources: S08, updated by S09/S10. Applies to a 10,000-user annual commitment, within the five-year commitment and annual billing arrangement in S07.

| Item | User-supplied commercial terms |
| --- | --- |
| Subscription | AED 1,180 per user/year |
| Included | Digital Sovereign Sign; unlimited manual transactions; unlimited external recipients; hosting; branding |
| Onboarding | One-time AED 18,000 per new entity only |
| Standard support | 8×5 support at 10% of annual subscription fees |
| Baseline standard support | Add 10% to the S06 baseline subscription fee (S09) |
| Separately purchased | Automated/API transaction add-ons; Sovereign Collaboration; AI services; Evidence based Archiving for Standalone Documents and files |
| Existing charges | Cease upon migration for entities on DDA Shared Service or Circularo's DESC-certified Azure hosting |
| On-premise customers | 20% of their allocated annual subscription fees, replacing 10% standard support and old support charges in both scenarios (S09/S10) |

- The user confirms **25% cumulative growth, not 25% per year**. The stated three-to-five-year horizon remains; exact annual adoption and the choice of Year 3 versus Year 5 for reaching 12,500 users are not yet fixed. Treat growth as a planning assumption, not a demand commitment.
- Unlimited manual transactions does not include unlimited automated/API transactions. Unlimited external recipients does not create a paid license requirement for every recipient.
- New-entity onboarding is charged once per qualifying entity, not once per user or per year. Do not charge the stated onboarding fee to existing customer entities merely because they migrate. The deduplicated number and onboarding dates of new entities remain unknown.
- Apply charge cessation only from each qualifying entity's migration date. S09 confirms all four S03 SaaS customers qualify: Dubai Ambulance, Dubai Culture, PCFC, and Dubai Healthcare City Authority. Together they have 470 reported users; DDA Shared Service adds 100, giving 570 reported users covered by the stated cessation rule. Do not infer prepaid-fee refunds or credits.
- On-premise projects in S03: DDA On-Premise (50 users), DESC (60), ICD (150), and RTA (1,000). Apply S10's replacement rule to their allocated subscriptions. Do not charge standard support in addition or retain their old support charges after the replacement takes effect.
- The current-state RTA CAPEX status is unchanged. The proposed future model is subscription-based under S07, with its on-premise support exception governed by this section.
- VAT treatment, optional add-on quantities/prices, extra services beyond the stated offer, and deployment/onboarding timing remain open. Baseline standard support and on-premise support mechanics are resolved in S09/S10. No claim of an all-inclusive total is made.

### Central subscription and standard support — derived arithmetic

| Cost for a constant 10,000 users | Annual AED | Five-year AED |
| --- | ---: | ---: |
| Subscription | 11,800,000 | 59,000,000 |
| Standard 8×5 support at 10% | 1,180,000 | 5,900,000 |
| Subscription plus standard support | **12,980,000** | **64,900,000** |

These standard-support figures exclude new-entity onboarding, separately purchased add-ons, the on-premise support adjustment under S10, and any applicable tax or other unpriced costs. The five-year amount holds quantity fixed to isolate the starting commitment; it does not include the growth scenario. Onboarding adds AED 18,000 × the number of qualifying new entities, counted once over the horizon.

Baseline subscription pricing remains S06, with additional standard support confirmed in S09. The earlier AED 59m saving remains explicitly subscription-only; it is not net savings after support and onboarding.

### Matched standard-support comparison — derived arithmetic

This isolates subscription plus 10% standard support for 10,000 constant users in each scenario, before applying the on-premise exception. It is not the final mixed-deployment budget.

| Comparison | Annual AED | Five-year AED |
| --- | ---: | ---: |
| Baseline subscription plus standard support | 25,960,000 | 129,800,000 |
| Central subscription plus standard support | 12,980,000 | 64,900,000 |
| Gross savings before onboarding and other adjustments | **12,980,000** | **64,900,000** |

The matched standard-support comparison retains a 50% reduction. Do not add this saving to the earlier subscription-only saving: this replaces it when support is included.

The four existing on-premise projects total 1,260 reported users. S10 confirms 20% replaces 10% on their allocated subscription fees in both scenarios, with old support charges replaced.

### Existing on-premise allocation retained — conditional mixed-deployment illustration

Assume the 1,260 existing on-premise users retain that deployment and all other 8,740 initial licenses use standard hosted support. These deployment allocations and full-year timing are scenario assumptions, not new user confirmations. Quantity is held at 10,000 for five years to isolate the initial pool; growth is separate.

| Cost | Annual baseline AED | Annual central AED |
| --- | ---: | ---: |
| Subscription for 10,000 users | 23,600,000 | 11,800,000 |
| Support: 8,740 hosted users at 10% | 2,062,640 | 1,031,320 |
| Support: 1,260 on-premise users at 20% | 594,720 | 297,360 |
| Subscription plus applicable support | **26,257,360** | **13,128,680** |

Gross savings in this matched deployment scenario are AED 13,128,680 annually, or AED 65,643,400 over five years. Central five-year subscription/support cost is AED 65,643,400 versus AED 131,286,800 baseline. Excludes new-entity onboarding, add-ons, applicable tax, transition timing and any other unpriced costs. This is not net ROI or measured savings against today's invoices.

## Latest confirmed direction and research questions

- The initial 10,000-user pool includes existing customers. RTA is to use the standard subscription model in the proposed central arrangement; its historical CAPEX license remains a current-state fact.
- Purchase the initial 10,000 users immediately, rather than phasing the initial purchase with onboarding. Billing is annual, with a five-year commitment and annual budgeting.
- DDA funds centrally. The user expects participating entity budgets will probably fund it internally; that internal allocation mechanism is tentative, not confirmed.
- Five-year price protection with no indexation is a material proposed benefit and must appear explicitly in the analysis. Any claim of extra avoided-increase savings requires an independent-purchase escalation assumption; none has yet been supplied. Confirm whether price protection also covers added licenses.
- S08 confirms approximately 25% cumulative growth over the previously stated three-to-five-year horizon. Annual timing remains a planning assumption to settle; this is not an annual growth rate or a confirmed demand forecast.
- Deep research is authorized to establish workforce numbers, entity boundaries, demand assumptions, and the justification for 10,000 initial licenses, incorporating the supplied survey where available. Public workforce counts must not be treated as licensed-user demand.
- Included services, standard support, new-entity onboarding, baseline standard support, qualification of all four SaaS customers, and on-premise support mechanics are resolved in S08–S10. Additional services, currency/VAT details of historical costs, deployment allocations, and respondent identities remain open.
- Remaining planning inputs include annual growth timing, added-seat price protection, entity allocations/onboarding schedule, and any independent-price escalation assumption.

### Research outputs and initial findings

- Public-source evidence, scope limitations, survey arithmetic, and model-design notes are recorded in [research-notes.md](research-notes.md). This research supports analysis; it is not an approved demand forecast.
- The full source population and row-level research status are preserved in [entity-research-register.md](entity-research-register.md). All 92 name rows are retained; the workbook is unchanged. Unknown workforce and allocation values are not filled with assumptions from `91 Entities Model`.
- S03 plus S07 establishes an initial migration candidate base of 1,830 reported project users, including RTA; 8,170 additional allocations are needed to reach 10,000. Survey overlap remains unknown.
- S04's numerical user bands imply a lower bound of 4,921 current/expected users across 21 numerical responses, excluding the unquantified `Other` response. This is derived arithmetic, not confirmed migration demand.
- Public-source R01 in the research notes reports over 76,000 Smart Employee users across 76 government entities in May 2025. It is an ecosystem scale benchmark, not the exact S02 population or a license-demand count.
- Research flags predecessor/brand overlaps, group-level workforce risks, and a federal-program scope issue. These remain visible and do not silently change the user-supplied list.

## Scope and stage

- Working folder: `/Users/josefneumann/Projects/ai-workspace/sales-system/work/p2-DDA`. Do not modify anything outside this folder.
- Current stage: analysis, fact gathering, and user-authorized deep research before preparing the executive business case. Record evidence and resolve material inputs before finalizing the case.
- Earlier intake questions were deferred. The user subsequently invited clarification and supplied S07 answers; ask remaining material questions while continuing independent research.
- Intended buyer: Digital Dubai Authority (DDA), as named by the user.
- Intended outcome: motivate DDA to purchase Circularo centrally for all the entities instead of each entity purchasing its own subscription.
- Savings from central procurement are the proposition to assess, not yet an established finding. A potential entity list and existing-customer figures have been supplied; future participation, demand, comparable cost scope, and commercial rules remain unresolved.

## Executive business-case brief

Source: S05. Record the direction now; resolve material inputs before preparing the executive business case.

- Audience: executive management of Digital Dubai Authority (DDA).
- Decision to justify: central procurement of **at least 10,000 Circularo users** as the initial purchase. Use 10,000 throughout subsequent analysis; do not use the superseded 1,000-user target.
- User-reported current purchasing arrangement: entities purchase subscriptions independently. Preserve the previously reported RTA CAPEX exception. DDA's existing Shared Service deployment does not itself establish central procurement across entities.
- Requested value story, updated by S06: make the benefits and savings of central procurement immediately clear against the DDA Shared Service Price baseline. The supplied central tier represents a 50% reduction against that baseline. Its 60% discount against Regular Basic Price is reference context only.
- Financial horizon and commitment: five years, with annual billing and annual budgeting, confirmed in S07. Exact start date remains open.
- Include three evidence groups: existing customers (S03), prospective customers informed by DDA's survey (S04), and wider potential across the supplied entity list (S02, columns A:B only).
- Survey expressions of interest are prospective demand, not new customers or orders. Map entities across these sources before adding their users to avoid double counting.

### Preliminary arithmetic and analysis structure — not a completed business case

- S08 confirms the subscription rate for the 10,000-user commitment, which is 50% below the S06 subscription baseline. Regular Basic Price remains a reference only. Included services and standard support are recorded in S08/S09; baseline standard support is now aligned. The on-premise exception and any remaining differences in included services must still be reflected.
- Conditional illustration: assume 10,000 licenses are centrally purchased for every full year, the applicable tier rate covers every user, and both comparison rates remain unchanged for five years. The following is undiscounted license-only arithmetic from S01 using the baseline explicitly selected in S06, not an approved quote or a statement of actual current expenditure.

| Comparison for 10,000 users | Annual AED | Five-year AED |
| --- | ---: | ---: |
| DDA Shared Service Price baseline | 23,600,000 | 118,000,000 |
| Central subscription at supplied tier rate | 11,800,000 | 59,000,000 |
| Gross license savings versus DDA Shared Service Price baseline (50%) | 11,800,000 | 59,000,000 |

- This illustration is subscription-only. Hosting is included under S08; standard support and new-entity onboarding are now priced separately above. Additional on-premise support, optional add-ons, tax, and any other unpriced costs remain outside the illustration. It does not establish net savings against existing contracts or ROI.
- Arithmetic from S03: existing subscription project rows total **830 users** across seven customer entities. RTA's separate 1,000 CAPEX users are excluded from that historical subscription subtotal but included in the proposed central pool under S07, giving **1,830 reported existing project users** in scope. Within the 830, 100 belong to DDA Shared Service and 730 to other subscription projects. These are reported project counts, not verified unique people or a completed migration allocation.
- The existing customer figures and aggregate survey do not yet establish a funded requirement for 10,000 central licenses. Justification needs entity-level allocations or explicitly agreed demand assumptions, with onboarding timing and unused-license exposure visible.
- Proposed analysis: allocate the initial 10,000 users across eligible existing customers and identified prospects; compare matched independent and central procurement scenarios annually over five years; assess slower onboarding and alternative demand levels; show wider entity potential separately from committed demand.
- Use the S06 DDA Shared Service Price baseline for the main savings comparison. Keep Regular Basic Price for reference only. Preserve S03 actual contract costs in the existing-customer analysis and reconcile any differences from the selected baseline; do not overwrite actual contract amounts with the baseline.
- Show annual and cumulative costs, net savings after transition and operating costs, and payback/ROI using an explicitly agreed investment definition. Do not label gross baseline savings as ROI. Discounted valuation, if requested, needs a supplied or agreed discount rate.

### Priority inputs for the initial purchase — saved for later clarification

1. Resolved by S07: the 10,000 includes existing customers, and RTA uses the standard subscription model in the proposed arrangement. Operational migration timing and entity-level allocation remain open.
2. S08–S10 confirm the initial offer, onboarding, baseline standard support and on-premise support mechanics. Growth-seat terms, deployment allocation and unpriced services remain open.
3. S08–S10 confirm charge cessation upon migration for DDA Shared Service and all four existing SaaS customers, and replacement of old on-premise support. Prepaid-credit treatment and transition timing remain open. S06 remains the comparison baseline.
4. Which entities and user allocations support the initial 10,000 licenses, and when would they onboard? Can the survey respondents be identified and mapped to the existing customer and potential entity lists?
5. Resolved by S07: initial purchase is immediate; billing is annual under a five-year commitment with no indexation. Added-license price protection and operational onboarding timing remain open.

## Supplied pricing inputs

Source: S01. Currency: AED. Unit: per user per year. Preserve supplied values without rounding or reinterpretation.

| Pricing / model assumption | AED per user/year |
| --- | ---: |
| Regular Basic Price | 2950 |
| DDA Shared Service Price (20% off) | 2360 |
| Tier 1 - 100 to 499 | 2213 |
| Tier 2 - 500 to 999 | 2065 |
| Tier 3 - 1,000 to 1,999 | 1770 |
| Tier 4 - 2,000 to 2,999 | 1475 |
| Tier 5 - 3,000+ | 1180 |

S06 establishes the DDA Shared Service Price as the main comparison baseline and Regular Basic Price as reference only. S08 confirms the specific 10,000-user offer. General tier eligibility outside this offer and treatment of added licenses remain to be confirmed. No additional discount stacking is assumed.

## Potential entity population

- User-supplied population source: S02, `dda departments!A2:B93` (headers in A1:B1). Use only these two columns. Keep the workbook as the source list, preserving its names, numbering, and ordering.
- Observed in the specified source columns: 92 populated name rows, of which 91 have a number in column A. These are potential service users, not commitments to participate or buy.
- Source-list observations for later clarification: `Digital Dubai Authority` appears at B9 and B10 (A10 is blank); `Dubai Municipality` appears at B42 and B50 (both numbered 40). Preserve these entries without merging or correcting them. The row count does not establish a count of distinct organizations.
- Workbook was read only and has not been modified. Preliminary arithmetic is separately labeled; the executive business case has not been prepared.

## Existing customers and projects

Source: S03. All rows have status `Customer`. Preserve supplied figures and blank fields exactly. Blank amounts mean unspecified, not zero. Currency and VAT treatment were not explicitly stated in this customer table and remain to be confirmed; the earlier pricing table separately specifies AED.

| # | Customer | Status | Users | Transactions | Annual Subscription | Annual Support | Deployment | Note |
| --- | --- | --- | ---: | --- | ---: | ---: | --- | --- |
| 8 | Digital Dubai Authority | Customer | 50 | Unlimited | 163,201.60 | 63,397.00 | On-Premise | |
| 8 | Digital Dubai Authority | Customer | 100 | Unlimited | 293,444.33 | 75,000.00 | Shared Service | |
| 17 | Dubai Corporation for Ambulances Services | Customer | 275 | 10,000 | 147,268.13 | | SaaS | |
| 19 | Dubai Culture & Arts Authority | Customer | 25 | Unlimited | 110,988.75 | | SaaS | |
| 24 | Dubai Electronic Security Center | Customer | 60 | Unlimited | 234,635.43 | | On-Premise | |
| 57 | Investment Corporation of Dubai | Customer | 150 | Unlimited | 177,108.00 | | On-Premise | |
| 70 | Ports, Customs and Free Zone Corporation (PCFC) | Customer | 20 | Unlimited | 116,564.92 | | SaaS | |
| 74 | Roads and Transport Authority (RTA) | Customer | 1,000 | Unlimited | | 608,000.00 | On-Premise | Capex |
| 91 | Dubai Healthcare City Authority | Customer | 150 | 5,000.00 | 57,627.50 | | SaaS | |

### User-reported project and licensing facts

- The table covers eight distinct customer entities and nine project rows. DDA is one customer with two separate projects; preserve both rows.
- DDA's On-Premise project has 50 users. Its Shared Service project has 100 users and is the central deployment intended for onboarding other DDA entities in the future.
- Central procurement for future onboarding is the desired model, not a confirmed procurement commitment or completed rollout.
- RTA is currently the only existing customer that is not subscription based: it purchased a CAPEX license. Its annual support amount is recorded separately. No historical CAPEX purchase amount was supplied.
- Other listed customers/projects are subscription based, including those deployed On-Premise. Deployment type and licensing model are separate attributes.
- DDA's two source-list appearances are consistent with the user's explanation of two projects; they must not be counted as two distinct entities. No workbook rows have been edited.
- PCFC's current user count is 20 per S03. The earlier model's figure of 30 is an assumption and must not override this user-supplied fact.

## DDA internal entity survey

Source: S04. Preserve questions, response labels, counts, and percentages as supplied. The results describe survey respondents and must not be extrapolated to all potential entities without an explicit assumption. Survey responses are not procurement commitments or independently verified operational figures.

### Q1. Does your organization currently use a digital/electronic signature system?

| Response | Number of Responses | % |
| --- | ---: | ---: |
| Yes | 21 | 55.26% |
| No | 10 | 26.32% |
| Under planning | 6 | 15.79% |
| Under implementation | 1 | 2.63% |
| Total | 38 | 100% |

### Q2. Which digital signature system is currently used / being implemented?

| Response | Number of Responses | % |
| --- | ---: | ---: |
| Circularo Digital Sign | 6 | 27.27% |
| Adobe Sign | 5 | 22.73% |
| DocuSign | 2 | 9.09% |
| Other | 9 | 40.91% |
| Total | 22 | 100% |

### Q2a. Other systems specified

| Response | Number of Responses | % |
| --- | ---: | ---: |
| d2tick | 2 | — |
| signeasy | 2 | — |
| Ascertia SigningHub | 1 | — |
| DocuSign & Adobe Sign | 1 | — |
| emSigner | 1 | — |
| Kofax SignDoc | 1 | — |
| Tungsten (Kofax) SignDoc | 1 | — |

### Q3. Current / expected number of digital signature users when implementation is complete

| Response | Number of Responses | % |
| --- | ---: | ---: |
| 1–50 users | 6 | 27.27% |
| 51–100 users | 4 | 18.18% |
| 101–500 users | 7 | 31.82% |
| More than 1,000 users | 4 | 18.18% |
| Other | 1 | 4.55% |
| Total | 22 | 100% |

### Q4. Approximate annual cost of the current / expected digital signature system

| Response | Number of Responses | % |
| --- | ---: | ---: |
| Less than AED 50,000 | 7 | 31.82% |
| AED 50,001–100,000 | 6 | 27.27% |
| AED 100,001–250,000 | 6 | 27.27% |
| AED 250,001–500,000 | 1 | 4.55% |
| More than AED 2,000,000 | 1 | 4.55% |
| Not available / unknown | 1 | 4.55% |
| Total | 22 | 100% |

### Q5. Do you expect digital signature usage to increase in the future?

| Response | Number of Responses | % |
| --- | ---: | ---: |
| Yes – moderate increase expected | 11 | 50.00% |
| Yes – significant increase expected | 6 | 27.27% |
| Unsure / to be determined | 1 | 4.55% |
| No – expected to remain approximately the same | 4 | 18.18% |
| Total | 22 | 100% |

### Q6. What factors are expected to drive this increase?

| Response | Number of Responses | % |
| --- | ---: | ---: |
| Increase in number of users | 13 | 76.47% |
| Expansion to additional departments | 10 | 58.82% |
| Increased external signing with suppliers, partners, customers/public | 10 | 58.82% |
| New document types / new use cases | 9 | 52.94% |
| Other | 0 | 0.00% |

### Q7. Would your organization be interested in using a digital signature system?

| Response | Number of Responses | % |
| --- | ---: | ---: |
| Yes – we have a current requirement | 10 | 62.50% |
| Yes – may need it in the future | 6 | 37.50% |
| Total interested organizations | 16 | 100% |

### Q8. What is the primary use of digital/electronic signature in your organization, or expected use if implemented?

| Response | Number of Responses | % |
| --- | ---: | ---: |
| Both internal and external | 26 | 68.42% |
| Internal – document approval/signing between departments or employees | 10 | 26.32% |
| External – signing documents with suppliers, partners, customers/public | 2 | 5.26% |
| Total | 38 | 100% |

### Survey interpretation notes — separate from supplied results

- Supplied response totals differ: Q1 and Q8 have 38 responses; Q2–Q5 have 22; Q7 reports 16 interested organizations. Do not present percentages from one group as percentages of another.
- Inference requiring confirmation: Q6 percentages imply a denominator of 17 and multiple selections per respondent. The 42 selections are not 42 organizations. Q5 has 17 responses expecting growth, which is consistent with this inference but does not prove question routing.
- Inference requiring confirmation: Q2–Q5 may cover the 21 current users plus one organization implementing a system; Q7 may cover the ten non-users plus six planning organizations. Aggregate counts alone do not establish respondent identity or routing.
- Q2a is the supplied breakdown of Q2's nine `Other` responses, not nine additional respondents. Preserve compound and differently named systems as supplied; do not reassign or merge vendor categories without supporting detail.
- Q3 mixes current and expected users, and Q4 mixes current and expected cost. Neither supplies an exact total of current licenses or actual expenditure. Do not assign midpoints or caps to bands as facts.
- Q3 does not show a 501–1,000-user category. Q4 does not show AED 500,001–2,000,000 and leaves the exact AED 50,000 boundary unclear. Do not interpret absent categories as zero responses or silently repair the ranges.
- Q2's six Circularo responses and S03's eight existing customer entities describe different evidence sets. Survey coverage, timing, and respondent mapping must be established before reconciling them; neither number overwrites the other.
- Rounded Q4 component percentages sum to 100.01%; retain the supplied 100% total and original percentages.
- No survey-derived savings, portfolio-wide adoption forecast, or business-case conclusions have been prepared.

## Assumptions excluded from the factual baseline

- All content previously inspected in `91 Entities Model` is classified as assumptions, per the user's correction. Its entity list is superseded by S02.
- This includes statuses, employee figures and their basis labels, potential-user percentages and counts, current-user figures, pricing logic, costs, savings, and the five-year horizon. None establishes a fact for this discovery.
- Earlier observations about employee-estimate counts and possible name overlaps from that sheet have been removed from the factual population section.
- Pricing supplied directly by the user remains separately recorded under S01; workbook formulas do not resolve the deferred pricing questions.
- Existing-customer facts supplied directly in S03 are recorded on their own evidence basis, even when similar fields appear in the assumptions sheet.

## Open questions

### Pricing mechanics — deferred at user's request

1. Are the volume tiers available only for DDA's central purchase, or also for entities buying independently?
2. Are thresholds measured using the combined number of licensed users across all participating entities? At a threshold, does its rate apply to every user or only users within that band?
3. Its role as the business-case baseline is confirmed in S06. What contractual eligibility conditions apply to the DDA shared-service price?
4. Are these approved offer prices or planning assumptions? Are they exclusive or inclusive of VAT, and do all rows cover the same subscription scope?

### Existing-customer details — saved for later answers

1. Are all S03 subscription and support amounts in AED, and are they inclusive or exclusive of VAT? What contract period or as-of date do the figures represent?
2. Are the populated annual support amounts additional to the annual subscription amounts? For blank support fields, is support included, separately charged but not supplied, or not applicable?
3. What period and definition apply to the transaction allowances, and what does `Unlimited` cover?
4. Are user counts contracted licenses, deployed accounts, or active users? How are the 100 Shared Service licenses currently allocated?
5. Existing customers are included and RTA moves to subscription in the proposed model (S07). S10 confirms replacement of old on-premise support with 20% of allocated subscription fees. Operational migration timing remains unresolved.
6. What are the renewal dates, remaining commitments, and included services for the current contracts?

### Survey details — saved for later answers

1. When was the survey conducted, how many entities were invited, and was there one response per entity? Can the responding entities be mapped to S02 and S03?
2. What were the routing rules for the 22-response and 16-response groups? Was Q6 a multiple-choice question answered by the 17 respondents expecting growth?
3. Are the missing user and cost bands omitted zero-response options, or is this the complete questionnaire? What does Q3's `Other` response mean?
4. What costs does Q4 include (licenses, support, hosting, implementation, VAT), for which period, and which answers are actual versus expected?
5. Are respondent-level user counts, spending figures, vendor details, and adoption timing available to clarify the bands and overlap with existing customers?
6. What internal attribution or quotation conditions apply when using DDA's survey in the eventual business case?

### Subsequent discovery — unresolved

- Entity list is supplied in S02. Still unresolved: duplicate/name overlap review, current organizational boundaries, procurement scope, and which potential entities will participate.
- Existing customers, user counts, deployments, and annual subscription/support figures are supplied in S03. Remaining contract interpretation, renewal dates, commitments, and central-procurement treatment are deferred above.
- Expected licensed users by entity, adoption timing, and growth.
- Main pricing baseline is confirmed in S06. Reconciliation with actual existing contracts, any applicable commercial exceptions, and uptake remain open.
- S08–S10 confirm the central offer's edition, inclusions, standard and on-premise support and manual-transaction/recipient allowances. Any remaining baseline feature differences and separately purchased add-ons remain open.
- Hosting and deployment model; central administration and entity separation requirements.
- S08–S10 price standard/on-premise support and new-entity onboarding, and include hosting in the offer. Confirm any additional implementation, migration, integration, training and operating costs beyond the stated offer; do not assume unpriced items are zero.
- Five-year commitment, annual billing, immediate initial purchase, and no indexation are confirmed in S07. Growth/reduction rules, added-license pricing, and offer validity remain open.
- DDA funds centrally (S07); participating entity budget contributions are tentative. Internal allocation mechanism, procurement authority, named decision makers, and start date remain open.
- Five-year evaluation horizon is confirmed by S05. Exact start date, savings/ROI definitions, success criteria, and evidence required for a buying decision remain open.

## Stage gate

The user authorized business-case preparation by agreeing to proceed with an Excel model, an executive Word brief and 2–3 executive slides. Preparation is now authorized within this working folder. Unresolved items remain visibly qualified and editable; they have not become verified facts.

## Business case preparation assumptions

The first review model uses linear growth from 10,000 to 12,500 paid users by Year 5, retains 1,260 existing on-premise users and treats added seats as hosted. It assumes added-seat pricing of AED 1,180, subject to confirmation of price protection. The illustrative new-entity schedule is 10, 6, 8, 8 and 8 across the five years, totaling 40. This schedule is a planning input, not a survey finding or confirmed onboarding plan.

The base model compares full matched capacity, assumes migration at the Year 1 start, and excludes unpriced services and tax. A slower-adoption case tests underuse and a quarter-year of known legacy charges. Zero additional cost allowance means no allowance included, not that missing services have no cost. The main baseline escalation is zero; a separate 3% sensitivity illustrates hypothetical price-lock value. The proposed five-year procurement ROI definition is net comparative benefit divided by central modeled program cost, subject to review.
