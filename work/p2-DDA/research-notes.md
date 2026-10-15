# DDA central procurement — research and modeling notes

Research date: 2026-09-20. Working material, internal, non-canonical. This is supporting research, not the executive business case or an approved forecast. Commercial and survey inputs remain in `fact-register.md` under S01–S10. Public sources below were examined through web search and accessible page/PDF text; retrieval limitations are identified. No source workbook was modified.

## Findings that matter for the 10,000-user decision

1. The addressable environment is large enough to investigate seriously. DDA reported Smart Employee serving over 76,000 employees across 76 government entities in May 2025 (R01). Using 76,000 as a reference denominator, 10,000 equals 13.2%; 12,500 equals 16.4%. These are scale checks, not licensed-user conversion rates, an exact current workforce census, or confirmation that the same entities are in S02.
2. The supplied survey provides direct demand evidence, but not a 10,000-user commitment. Its numerical user bands imply a minimum of 4,921 current/expected users in 21 responses, excluding the unquantified `Other` response. Four large respondents dominate the uncertainty. Respondent identities and precise counts are the most valuable missing data.
3. Existing customers contribute 1,830 reported project users to the proposed pool if all reported users migrate: 830 subscription users plus RTA's 1,000 CAPEX users. The remaining allocation to reach 10,000 is 8,170. The existing users may overlap the survey population; the two totals cannot simply be added.
4. The source entity list includes repeated names, predecessor organizations, brand names, and potentially overlapping groups. It also includes a federal program. Preserve the source rows, then confirm procurement and employee boundaries before using a unique entity count or summing headcounts.
5. The discount makes a large pool attractive only with sufficient adoption and equivalent scope. Paying for 10,000 central licenses costs the same as 5,000 licenses at the selected baseline before any other costs. This is a license-cost equality threshold, not overall ROI or proof of sufficient demand.
6. RTA's conversion needs explicit treatment: its 1,000 licenses would cost AED 1,180,000 annually before support. S09/S10 confirm 20% on its allocated subscription, replacing standard and old support. Retaining its on-premise deployment gives annual subscription/support of AED 1,416,000. Against its reported 608,000 current support, this implies AED 808,000 more annually, conditional on comparable currency/tax scope and a full post-migration year. This is not a finalized RTA quote. Do not describe RTA itself as a saving merely because the new rate is below the selected comparison baseline.

## Public evidence register

Evidence below supports only the stated date and scope. Official publication does not verify demand, procurement eligibility, license requirements, or willingness to migrate. Publication/search dates may differ from the reporting year.

| ID | Source and period | Finding supported | Use and limitation |
| --- | --- | --- | --- |
| R01 | [Digital Dubai, GITEX Europe announcement](https://www.digitaldubai.ae/newsroom/news/dubai-to-make-presence-felt-at-gitex-europe-x-ai-everything-2025-with-a-joint-pavilion-featuring-12-government-and-private-entities), May 2025; also [Dubai Government Media Office, 18 May 2025](https://www.mediaoffice.ae/en/news/2025/may/18-05/dubai-to-make-presence-felt-at-gitex-europe-x-ai) | Smart Employee served over 76,000 employees across 76 government entities. | Strong first-party scale benchmark. Do not add entity headcounts to this aggregate or treat HR self-service users as paid signature users. |
| R02 | [DEWA Integrated Report 2025](https://www.dewa.gov.ae/-/media/Files/Investor-Relations-Files/Integrated-report-for-the-year-2025.ashx), printed p.117; [issuer filing on DFM](https://feeds.dfm.ae/documents/2026/Mar/23/b94e2b1a-48b8-4fa8-b35b-542a63444231/DEWA%20Integrated%20Repo.pdf), workforce table p.161 | 10,764 employees reported for 2025. | Workforce context for DEWA. Primary search-index extracts corroborate the total; full DEWA PDF retrieval exceeded tool size limit. Operational workers are not automatically paid sign users. |
| R03 | [Dubai Government, Dubai Health identity announcement](https://mediaoffice.ae/en/news/2023/November/11-11/Dubai-Health), 11 November 2023; [Dubai Health, Clinic of Hope announcement](https://dubaihealth.ae/w/dubai-health-marks-zayed-humanitarian-day-with-the-inauguration-of-the-clinic-of-hope-), 2024 | More than 11,000 professionals in the 2023 announcement; 2024 entity announcement describes 11,000 employees. Dubai Academic Health Corporation operates as Dubai Health. DHA has a separate regulatory role. | Historical workforce scale; one delivery-system population, not two. Do not reuse historic DHA headcounts without accounting for restructuring, or assume all clinicians need Circularo seats. |
| R04 | [du Sustainability Report 2025](https://investors.du.ae/static-files/db00b561-a6f2-41e5-a0de-c73bbad518d2), p.13; [du Annual Report](https://investors.du.ae/static-files/a619c2a1-f3e3-4552-b9b1-3d41b65f4723), human-capital section | 2,687 total employees. | Entity/corporate workforce context, subject to procurement-scope confirmation. The sustainability report introduction identifies 2025, but its GRI index contains a 2024 period statement; retain this source inconsistency. Annual-report search extract corroborates the number. |
| R05 | [ICD Annual Report 2025](https://icd.gov.ae/wp-content/uploads/2025/11/ICD-AR2025-Full-Report-2.pdf), Dubai Duty Free profile pp.116–117 | Dubai Duty Free reports 5,800+ employees supporting operations. | Search-index evidence; full PDF retrieval failed. Do not turn this rounded floor into an exact count, or count it again inside ICD-wide workforce. |
| R06 | [Dubai Customs, Our Employees](https://www.dubaicustoms.gov.ae/en/SocialResponsibility/Csr/OurEmployees/Pages/default.aspx), undated page | The entity page states 2,880 personnel. | Reported but undated; not accepted as a current 2026 count. A recent crawl does not establish a recent underlying observation. |
| R07 | [Dubai Government Media Office, Dubai Ambulance performance](https://www.mediaoffice.ae/en/news/2024/april/04-04/dubai-ambulance-responds-to-over), 4 April 2024, covering 2023 | Describes 1,375 personnel managing and operating specialized ambulance services. | Operational-team scope, not established total entity headcount; use only as contextual evidence. S03's 275 licensed users remains the direct current-customer input. |
| R08 | [RTA Sustainability Report 2024](https://www.rta.ae/wps/wcm/connect/rta/b7653aa3-5dbc-436f-90a3-8dd1aeb270d0/RTA%2BSustainability%2BReport%2B2024-%2BFinal.pdf?MOD=AJPERES), printed pp.125–126 | An employee-category table includes a 2024 total of 3,259. | Candidate only: text extraction and search rendering differ in language/layout; screenshot retrieval failed. Confirm table purpose and population before using this as workforce or an adoption denominator. Keep S03's 1,000 users. |
| R09 | [Dubai Courts Annual Report 2024](https://www.dc.gov.ae/publicservices/websitefiles/Annual_Report/Annual-Report-2024-En.pdf), p.45 | Search extract places 1,275 beside total employees, with separate administrative and judicial metrics. | Candidate only: full retrieval failed and visual association was not verified. Do not use 1,275 in a base-case calculation until the source page is confirmed. |
| R10 | [Dubai Municipality organizational profile](https://www.linkedin.com/company/dubai-municipality) | Profile states 11,000 employees in 34 departments. | Undated self-description; similar figures appear in much older coverage. Lower confidence than a dated annual report; do not treat as current verified workforce. |
| R11 | [Dubai Government announcement of Economy/Tourism merger](https://pddportalstg.dubai.gov.ae/en/media-listing/news-events/mohammed-bin-rashid-issues-decision-to-merge-dubai-economy-dubai-tourism-to-become-dubai-s-department-of-economy-and-tourism/), 6 November 2021 | Dubai Economy and Dubai Tourism merged into the Department of Economy and Tourism. | Supports predecessor/alias review. No workforce count is supplied; do not sum their historic workforces with DET. |
| R12 | [Nedaa, About](https://www.nedaa.ae/en/Pages/aboutus.aspx) | Nedaa is the Professional Communication Corporation. | Source names for the two Nedaa rows refer to the same named organization; retain both raw rows, propose one demand group. |
| R13 | [UAE Government, housing authorities and programmes](https://u.ae/en/information-and-services/housing/housing-authorities-and-programmes); [Ministry of Energy and Infrastructure, About](https://www.moei.gov.ae/en/about-ministry) | Sheikh Zayed Housing Programme is federal and was merged into MoEI in 2020. | Flag eligibility under a DDA purchase for confirmation; do not silently delete the user-supplied potential entity. |
| R14 | [Dubai Government, DIEZ measures](https://mediaoffice.ae/en/news/2026/april/09-04/dubai-integrated-economic-zones-authority-launches-set-of-economic-measures), 9 April 2026 | DIEZ covers DAFZ, Dubai Silicon Oasis, and Dubai CommerCity. | Parent/zone relationships require workforce boundaries. Zone tenant employees are not automatically authority employees or eligible subscribers. |
| R15 | [ICD, ESG and CSR](https://icd.gov.ae/corporate-social-responsibility/), 2025 activities | Its Happiness Club reached over 76,000 employees across 39 companies. | This is an ICD-affiliated network, not ICD headquarters headcount. It is also a different population from R01 despite the similar number. Exclude from employee totals. |
| R16 | [Dubai Airports, accessibility training](https://media.dubaiairports.ae/dubai-airports-redefines-accessible-travel-and-enhances-autism-services-and-training/), 2025 | 45,000 training participants span the wider airport community, including partners. | Exclude as an employer headcount or paid-user estimate. Airport-community scale must not be assigned entirely to Dubai Airports. |
| R17 | [Digital Dubai, HR Register](https://www.digitaldubai.ae/knowledge-hub/blogs/the-dubai-hr-register-why-human-decisions-need-sound-data), 2021; [GRP HRMS service description](https://partnersportal.digitaldubai.ae/Services/Details/c9038cc7-2e35-4867-9aca-04b721e18f20) | DDA describes a public-sector HR data initiative and a centralized HR system with regular/outsourced employee records. | Indicates an authoritative route for aggregate counts by entity and role. This research has not accessed those records or requested personal data. |
| R18 | [Dubai Supreme Legislation Committee](https://slc.dubai.gov.ae/en/) | Official name and remit of the Supreme Legislation Committee. | Supports alias review for the two SLC names in the supplied list. |

## Entity boundaries to resolve before adding demand

References below use Excel row numbers in `dda departments`, not the supplied `#` field, which is not unique. Preserve the raw workbook as S02.

| Source rows | Issue | Research disposition |
| --- | --- | --- |
| 9, 10 | DDA appears twice | One entity, two projects, established by S03/S07. Preserve project-level counts; total reported users 150. |
| 42, 50 | Dubai Municipality appears twice, both numbered 40 | Literal duplicate; one candidate demand population pending source-owner review. |
| 5, 6, 8, 24 | Economic Development, Economy and Tourism, Tourism and Commerce Marketing, Dubai Economy and Tourism | Merger evidence R11. Map predecessor/alias rows to current DET scope before any aggregation. |
| 12, 33 | Dubai Academic Health Corporation; Dubai Health | Brand relationship confirmed by R03; do not count two workforce populations. |
| 34 | DHA | Keep separate from Dubai Health; verify current regulator-only scope. |
| 71, 73 | Two Nedaa names | Same named organization per R12; propose one demand group. |
| 80, 85 | Supreme Legislation Committee / The Supreme Legislation Committee | Alias candidate supported by R18. |
| 11, 18 | Civil Defense / Civil Defence | Name/translation overlap candidate; separate operational scopes not established. |
| 31, 82 | Two Government Human Resources names | Alias candidate; retain until confirmed. |
| 45, 75 | Dubai Public Prosecution / Public Prosecution | Alias candidate; retain until confirmed. |
| 14, 46 | Airport Freezone; Silicon Oasis | Related through DIEZ, not automatically the same operating team. Separate authority staff from zone tenants (R14). |
| 59 and portfolio-company rows | ICD alongside portfolio organizations | Use corporate-only workforce for ICD; avoid adding consolidated/network counts to subsidiaries (R15). |
| 72, 86, 22 | PCFC, Trakhees, Customs | Parent/operating-unit and shared-staff boundaries need confirmation; no grouping imposed. |
| 54, 60 | Endowment and Minor Trust Foundation; Islamic Affairs & Charitable Activities labeled “Awqaf Dubai” | Naming/scope review required. Do not merge just because both refer to endowment/charitable activities. |
| 92 | Sheikh Zayed Housing Programme | Federal/MoEI scope per R13; DDA procurement eligibility unresolved. |

No final deduplicated total is declared. Source coverage is not procurement authority. The complete row-by-row intake and current research status is in `entity-research-register.md`.

## Survey demand analysis

Source: S04 in the fact register. These calculations describe the supplied distribution, not new survey findings.

| User band | Responses | Strict numerical lower bound | Midpoint illustration for bounded bands |
| --- | ---: | ---: | ---: |
| 1–50 | 6 | 6 | 153 |
| 51–100 | 4 | 204 | 302 |
| 101–500 | 7 | 707 | 2,103.5 |
| More than 1,000 | 4 | 4,004 | No finite midpoint |
| Other | 1 | Not quantified | Not quantified |
| Numerical responses only | 21 | 4,921 | Incomplete |

Bounded-band midpoints total 2,558.5 users. If the four large respondents averaged 1,500, 2,000, or 2,500 users, the illustrative totals would be 8,558.5, 10,558.5, or 12,558.5 before the `Other` response. These are sensitivity calculations, not measured counts or recommended allocations; fractional totals arise from midpoints. Reaching 10,000 within this group alone would require about 1,861 users on average in each large respondent under those bounded-band midpoint assumptions.

The strict lower bound is more defensible than a midpoint estimate, but it still mixes current and expected users and assumes distinct respondent organizations and integer counts. It says nothing about their migration willingness, required license type, or date of adoption.

- Ten organizations report a current requirement and six future interest. Their user counts are not provided. Do not borrow the 22-response group's average without treating selection bias and respondent differences explicitly.
- Seventeen of 22 respondents expect growth: 77.27% by count arithmetic. This supports direction, not a 25% growth magnitude or a three-to-five-year timetable.
- Twenty-eight of 38 report some external signing. S08 now confirms unlimited external recipients and unlimited manual transactions in the offer; do not count recipients as paid seats. Automated/API transactions are separately purchased, so digital workflow volume must not be presented as unlimited included automation.
- Q4 cost bands cannot establish a reliable aggregate actual-cost baseline: they mix current/expected spend, include an open upper band and an unknown response, and lack matched user counts. Retain the user-selected S06 benchmark and show actual current-customer spend separately.

## Model design for review

### Demand and adoption

Build demand from entity rows with: accepted group, eligibility, workforce scope/year, existing license count, survey respondent match, paid-license roles, proposed allocation, and onboarding quarter. Prefer actual user counts and named allocations over workforce percentages. When roles are unknown, leave the allocation open or explicitly mark a scenario assumption.

Use three evidence layers without adding overlapping populations:

1. Existing customer migration: 1,830 reported users, subject to migration timing and license interpretation.
2. Survey-backed prospects and expansion: match respondent IDs to layer 1, then add only incremental licenses.
3. Remaining entity potential: estimate from confirmed workforce/roles and stated adoption assumptions, excluding predecessor/alias duplicates.

An immediate 10,000-seat purchase is a commercial requirement; enrollment need not be immediate. Track paid seats and deployed seats separately. Show delayed adoption as a scenario rather than assuming every paid seat is useful from day one.

### Growth

S08 confirms that the user's 25% growth assumption is cumulative, not annual. The annual timing remains to be settled within the stated three-to-five-year horizon. A possible scenario is 10,000 / 10,625 / 11,250 / 11,875 / 12,500 annual seats from Year 1 through Year 5. This linear path is not a confirmed forecast. Growth between Year 1 and Year 5 corresponds to approximately 5.74% CAGR over four intervals.

If this path is chosen and both unit prices remain fixed for added licenses, it totals 56,250 license-years: AED 132.75m baseline, AED 66.375m central, and AED 66.375m gross license savings. No adoption path or added-license terms have yet been approved, so retain the fixed 10,000-user comparison as the current confirmed quantity illustration.

With S09's matched standard support, the same illustrative path gives AED 146.025m baseline versus AED 73.0125m central, before the on-premise exception, new-entity onboarding and separately purchased services. The Year 5 standard-support recurring cost at 12,500 seats would be AED 16.225m. These calculations are scenario outputs, not a confirmed budget.

### Commercial inclusions and support treatment

Use the authoritative working offer table in `fact-register.md`, S08–S10. Hosting and branding are included; do not add an invented hosting fee. New-entity onboarding is charged once and depends on actual new entities, not the raw source-row count. Existing customer migration does not trigger the stated new-entity onboarding fee.

For a flat 10,000-seat pool, subscription plus standard support is AED 12.98m annually and AED 64.9m over five years. The matched baseline is AED 25.96m annually and AED 129.8m over five years. Gross savings including matched standard support are AED 12.98m annually and AED 64.9m over five years, before onboarding and other adjustments. These replace subscription-only savings when showing support-inclusive totals; do not add both savings figures together.

The actual deployment mix must reflect the on-premise support exception. The S03 on-premise project counts total 1,260; Shared Service and confirmed qualifying SaaS total 570. The remaining 8,170 initial allocations have no confirmed deployment mix yet. S10 confirms that 20% replaces 10% on the on-premise subscription allocation in both scenarios and replaces old support charges.

If the existing 1,260 remain on-premise and all other initial seats are hosted, the annual subscription/support calculation is AED 13,128,680 centrally against AED 26,257,360 baseline. At a constant quantity and deployment mix, five-year gross savings and five-year central subscription/support cost each equal AED 65,643,400. This is the conditional mixed-deployment illustration in the fact register; exclude onboarding, add-ons, transition and tax from any claim based on it. Do not stack 10% and 20% or add old support again.

S09 confirms that all four existing SaaS customers qualify for the cessation rule. Existing charges cease upon their respective migrations and for DDA Shared Service. S10 separately confirms replacement of old on-premise support. Keep pre-migration costs in the transition schedule; do not assume prepaid refunds or carry superseded support indefinitely after its replacement takes effect.

### Price protection and value attribution

The five-year central price lock provides budget predictability even if the alternative never increases. Quantify avoided increases only as a separate scenario until an escalation rate and contractual basis are supplied.

For each year t, let U_t be the same matched quantity under both alternatives, B the S06 baseline, P the central price, and e an explicitly labeled independent-price escalation assumption:

- Flat-baseline license savings = sum(U_t × (B − P)).
- Additional avoided baseline escalation = sum(U_t × B × ((1 + e)^(t − 1) − 1)).
- Total gross savings against that escalated alternative = the sum of the preceding two amounts.
- Do not add a second avoided-escalation figure calculated on the central price; that would measure a different counterfactual and double count protection in the same comparison.
- If e = 0, incremental avoided-escalation savings are zero. Inflation in the economy does not establish a subscription renewal increase.
- Price protection does not imply a fixed total annual bill if license quantities grow.

Annual budgeting should show the five-year contractual commitment, the annual payment schedule, and any growth obligations separately. Potential entity budget contributions are internal funding transfers, not government-wide cost savings or incremental external revenue.

### Comparable costs and financial safeguards

- S03 totals: subscriptions 1,300,838.66; populated support fields 746,397.00; combined populated amounts 2,047,235.66. Currency, tax and additive treatment are still unconfirmed. Missing support entries remain unknown. These totals are not established all-in annual government spending.
- The S06 baseline is a modeled comparison for a specified quantity; do not imply today's entities already spend AED 23.6m on these 10,000 licenses.
- Preserve RTA's conversion cost and any overlapping contract charges. Historical CAPEX payment is not a recurring subscription cost; treatment of remaining asset value is an accounting input to request, not an assumed cash saving.
- Show separate one-time transition and annual operating costs, with unknowns visibly unpriced. Avoid zero-filled missing costs.
- Evaluate net savings and cumulative payback only after equivalent cost scope and transition costs are established. Any ROI percentage requires an explicit denominator and period agreed with the user.
- At the supplied rates, 5,000 independently purchased license-years at the baseline equal the annual cost of 10,000 central licenses. For a five-year flat pool, the analogous equality is 25,000 independently purchased license-years. This excludes all non-license costs and actual-contract differences.

## Research limits and next evidence needed

The initial research establishes portfolio scale and several workforce references, but it does not verify a current headcount for every source row or prove 10,000 committed paid users. Do not backfill remaining rows from `91 Entities Model`.

Highest-value next evidence is: (1) anonymized respondent-to-entity mapping and exact counts for the four large survey respondents, (2) aggregate DDA/GRP workforce counts by entity and role, (3) intended first-year allocations, deployment mix and quarterly onboarding, (4) any services beyond the confirmed offer, and (5) confirmation of added-seat price protection and comparison escalation assumptions. No contacts have been messaged and no external data access has been requested.

Continue targeted official-report retrieval for the largest unresolved entities and resolve candidate PDF values before using them. Use the evidence obtained to test, rather than force, the 10,000-user proposition.
