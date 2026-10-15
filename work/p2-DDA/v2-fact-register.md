# DDA simplified business case v2

Working material, confidential, non-canonical.

## Stage and source

Stage: simplified Excel model created with 10,000 users selected and an editable commitment parameter for 8,000 or 5,000 users. The current growth revision is V2-S13 below: Summary separates current existing users, Year 1 existing growth, survey opportunity and other departments. Potential forecasts users and subscription costs over five years. Earlier numerical snapshots below remain history and are superseded by V2-S13. B/C use modeled savings against Regular Basic Price, with full survey counts added as explicitly instructed; actual respondent-cost savings await the source data. No v2 Word brief or slide deck has been created.

V2-S01: user-supplied final existing user-based subscription table, received 21 September 2026. These are the controlling inputs for this part of v2. Evidence is user-reported, not independently verified. Preserve the original model and its source history separately.

## Existing user-based subscriptions

| # | Customer | Status | Users | Transactions | User price per year |
| --- | --- | --- | ---: | --- | ---: |
| 8 | Digital Dubai Authority (VIP Project) | Customer | 50 | Unlimited | 1,850.94 |
| 8 | Digital Dubai Authority | Customer | 100 | Unlimited | 2,212.50 |
| 19 | Dubai Culture & Arts Authority | Customer | 25 | Unlimited | 2,212.48 |
| 24 | Dubai Electronic Security Center | Customer | 60 | Unlimited | 2,507.50 |
| 70 | Ports, Customs and Free Zone Corporation (PCFC) | Customer | 25 | Unlimited | 2,159.43 |
| 74 | Roads and Transport Authority (RTA) | Customer | 1,000 | Unlimited | 1,245.00 |
| 92 | His Highness the Rulers Court | Customer | 50 | Not supplied | 2,212.50 |

Arithmetic check after V2-S12: 1,310 users across seven project rows and six distinct customer entities. The two DDA projects remain separate. Annual current subscriptions total AED 1,929,169.75. The new row is sourced to V2-S12; the original six remain sourced to V2-S01.

## Handling for subsequent instructions

- Treat the supplied amounts as annual per-user subscription prices, not the earlier annual project totals.
- Use PCFC's 25 users for v2. Preserve the previous user count only in the original version's history.
- Include RTA in the v2 user-based subscription inputs as explicitly instructed. The prior version's CAPEX description remains historical source context; do not carry its old support-only cost into this v2 table.
- The three customers omitted from this table are not included in this first v2 input set. Their omission does not establish that they ceased being customers or determine their treatment in later steps.
- The new table does not specify support inclusion, tax treatment, deployment or migration timing. Do not infer these from its prices or silently apply the earlier model's assumptions. Await the user's further instructions.
- Subscription-only pricing comparisons are now recorded separately in `v2-pricing-proposal.md`. They are proposals and derived calculations, not approved commercial terms. Growth, support, onboarding, allocation and ROI modeling await further instructions.

## Pricing redesign clarification

V2-S02: the user confirmed that the earlier open-ended volume tier was an internal assumption only, not an offer to DDA or a contractual agreement. This permits proposing a different central commitment ladder without treating the old threshold as an existing customer entitlement. The underlying supplied schedule is retained in the original fact register, S01. The new proposed central package prices have not yet been accepted by the user.

V2-S03: on 21 September 2026, the user instructed that Regular Basic Price, AED 2,950 per user/year, is the comparison baseline for v2, replacing the earlier DDA Shared Service baseline for this version. The user also specified that discounts for commitments above 10,000 users should exceed 60%. At exactly 10,000 users, the proposed rate corresponds to 60%; rates for higher commitments remain to be defined. This is a user-specified modeling direction, not an approved higher-volume offer. Preserve existing customer prices from V2-S01 when calculating savings against their current subscriptions; the list-price benchmark does not establish actual current spending.

V2-S04: subsequent user direction on 21 September 2026 separates proposal options from pricing bands. Present exactly three proposal options: 5,000, 8,000 and 10,000 annually committed users. Define exactly three volume-discount bands, whose thresholds may differ from those proposal quantities. The highest band applies above 12,000 users with a 70% discount from the V2-S03 baseline; the derived annual per-user price is AED 885. The assistant's interrupted suggestion to replace the 10,000-user option with 12,000+ is superseded by this explicit correction. The first two bands' boundaries and discounts remain to be defined; do not treat the previous assistant-proposed rates as accepted. Interpret “above 12,000” literally as 12,001+ whole users pending final band design. This replaces the earlier tentative higher-volume rule in V2-S03.

V2-S05: the user supplied 76,000 employees as the population for v2 planning and estimated potential signature users at at least 20% of that population. Evidence for the population in this instruction is user-reported; the adoption share is a user-supplied assumption, not measured demand. Arithmetic: 76,000 × 20% = 15,200 potential users, approximately 15,000 for planning. This potential includes existing users rather than being additive to them. Do not describe the assumed minimum adoption share as a verified demand floor or add survey counts without resolving overlap.

V2-P02: in response to the request to show pricing bands, the assistant proposed a three-band ladder in `v2-pricing-proposal.md`. The first two bands and their discounts are recommendations, not user-confirmed facts. V2-S04 remains the source of the highest-band direction. No revised Excel or executive artifacts have been produced.

V2-S06: the user clarified that the pricing ladder must begin with Tier 1 covering up to 500 users and continue upward, rather than beginning at 5,000. The three proposal options remain 5,000, 8,000 and 10,000. The assistant interprets this correction as permitting a fuller pricing ladder instead of the earlier three-band constraint; the resulting eight-band V2-P03 is a proposal, not an accepted tier count or commercial schedule. The above-12,000 direction in V2-S04 remains unchanged.

V2-S07: the user subsequently specified Tier 1 up to 1,000 users at a 25% subscription discount, and the highest tier above 12,000 users at a 65% subscription discount. Support must be added as a percentage of annual subscription fees, beginning at 25% for Tier 1 and ending at 12% for the highest tier. These endpoints supersede the previous starting threshold and highest discount. The assistant applies support to the discounted annual subscription amount. Intermediate discount and support rates in V2-P04 are proposed, not user-confirmed; no deployment-specific exception or comparable baseline-support rate was specified in this update. The three proposal options remain 5,000, 8,000 and 10,000 users.

V2-S08: the user accepted proceeding from V2-P04 to a clear Excel savings model, starting with 10,000 users and changing a parameter to produce 8,000- and 5,000-user cases. Required views: existing customers first, separately new customers supported by the survey, then overall potential. The supplied cost-band and user-band distributions each contain 21 quantified responses. The earlier full survey includes one additional unknown response for each question; preserve those as unknown, not zero. V2-P04 is the controlling schedule for this workbook.

V2-S09: the user explicitly instructed that all savings comparisons are subscription-only. Support must remain a separate charge and must not be compared. Do not add assumed current support, calculate support savings, or deduct central support from subscription savings. The user will provide respondent-level data so existing-customer overlap and comparable annual subscription costs can be resolved.

V2-S10: the user requested a clear A/B/C summary: existing customers, survey-based opportunity and other departments, explaining how the remaining commitment can be filled. The user supplied 91 entities in total and 38 surveyed, giving 53 unsurveyed for planning. Preserve the raw entity list separately; this direction does not remove its repeated names or verify all source rows as unique. Supporting original survey signals: 21 currently use a digital signature system; 16 express demand (10 current requirement, six future need); 17 of 22 growth-question respondents expect growth; 13 of the 17 growth respondents cite more users. The latter figures are shares of organizations/respondents, not growth rates in user counts.

V2-S11: the user required the supplied user bands to drive the summary and clarified “Keep A; use full survey counts without a deduction.” Apply zero overlap deduction by default, while identifying additive treatment as a modeling instruction rather than verified unique users. The earlier proposed 250-users-per-demand-entity assumption is withdrawn and is not used. Quantified user-band minimum: 6×1 + 4×51 + 7×101 + 4×1,001 = 4,921. The optional illustration remains 10,558.5 using band midpoints and 2,000 users per open-band response. It is an assumption, not observed demand. Do not attach the quantified user counts to the 16 additional-demand entities or add extra user counts for those entities.

V2-S12: on 21 September 2026, the user added existing customer **His Highness the Rulers Court**, entity **92**, with **50 users** at **AED 2,212.50 per user/year**, and stated that it was missing from the government entity list. This is user-reported evidence. Add it to both the v2 customer table and the model's entity list. Total planning scope becomes 92 entities; with the supplied 38 surveyed, the model uses 54 unsurveyed. No transaction allowance or additional employee population was supplied. Preserve the historical source workbook and append the user addition with provenance in the v2 Entities sheet. The 92 original source name rows plus this addition give 93 raw name rows, distinct from the 92-entity planning scope because the source contains repeated project rows/aliases.

## Simplified workbook and verification

Artifact: `outputs/dda-business-case-v2/DDA-savings-model-v2.1.xlsx`. Change `Summary!E4` to select committed users; pricing, existing-customer savings, overall subscription benchmark, separate support fees and charts update. `Respondents` is a blank input area for the pending source data. Matched non-customer rows feed new-customer savings and replace corresponding list-price assumptions in the overall comparison. Unknown, duplicate and incomplete rows are excluded visibly.

After V2-S12, at 10,000 users, the supplied 1,310 existing users produce annual subscription savings of AED 383,369.75 (19.87%). Central subscription is AED 11,800,000 annually; support is separately AED 1,652,000. The larger subscription saving of AED 15,764,669.75 assumes all remaining 8,690 seats are used and would otherwise cost Regular Basic Price. It is not verified current government spending. At 8,000, existing-customer savings are AED 190,144.75; at 5,000, the existing cohort's subscription cost increases by AED 3,080.25, which remains visible rather than being called savings.

Model conventions: five-year quantities held constant; no central price indexation; baseline escalation defaults to zero and is editable; full additional-seat usage is an explicit editable assumption. Survey midpoints and open-band averages are assumptions, not observations. Overall potential is 15,200 users under V2-S05 and includes the other cohorts. Onboarding, tax and optional services are excluded. A complete project ROI is not claimed.

Verification: 46 formula and input-behavior checks; all three commitment options recalculated in bundled LibreOffice using private copies; no formula errors; 92 raw entity rows matched to source columns A:B; two native charts and all worksheet views reviewed. Original source workbook unchanged. QA files are confined to `build/v2/`.

## A/B/C summary revision

The updated Summary includes the four survey user bands, their numerical minimum and illustrative totals, coverage/growth signals, the remaining adoption target and a native user-allocation chart. The underlying seven-tab structure is retained. `Setup!E57` selects numerical minimum (1, default) or midpoint illustration (2). `Setup!E56` defaults to zero overlap deduction as instructed. `Summary!E4` remains the commitment control.

After V2-S12, at the 10,000-user default: A = 1,310 users and AED 383,369.75 annual subscription savings against supplied current prices; B = 4,921 survey-based users and AED 8,710,170 annual modeled savings against list price; C = 3,769 users as the residual adoption target and AED 6,671,130 modeled savings against list price. Total annual modeled subscription savings are AED 15,764,669.75, or AED 78,823,348.75 over five years. A+B = 6,231 users, or 62.31% of the commitment. C across 54 unsurveyed entities requires 69.80 users on average, rounded up to 70 for the illustrative adoption test. This is not a survey-derived forecast for unsurveyed entities and does not establish deployment timing. Total modeled savings decrease by AED 36,875 versus the previous version because 50 assumed list-price seats now use the customer's lower actual current price; the existing-customer savings increase by AED 51,625.

The 16 demand entities support the qualitative demand case but add no unquantified seats. Potential remains 15,200 under the employee adoption assumption. Support is separately presented and never compared. Pending respondent records have an explicit survey/other-department cohort input so matched prices replace list-price assumptions in the correct group. Revised validation: 63 formula/behavior checks, including A/B/C reconciliation, 10K/8K/5K, minimum/midpoint selection, unused capacity and matched-cost replacement; native recalculation and visual review repeated for affected outputs.

V2-S12 verification: 69 formula/behavior checks passed. The 10K, 8K and 5K cases recalculated in bundled LibreOffice without formula errors. The original 92 source rows remain intact, and entity #92 and its customer subscription were verified separately. Summary, customer table and appended entity row were visually reviewed. The historical source workbook remains unchanged.

## Historical growth model — V2-S13 (Year 1 rate superseded by V2-S15)

The user reported 20% growth among existing customers in Year 1 and requested a separate adoption-source row. The user also requested 5% annual user growth in the five-year Existing / Survey / Other schedule, then confirmed that Years 2–5 growth increases paid subscription volume at the locked unit price. Model interpretation: apply the 20% once to today's existing cohort in Year 1; apply 5% to all three cohorts from Year 2 onward. Do not add another 5% in Year 1. The earlier constant-user forecast is superseded.

Inputs are editable at `Setup!E67` (20%) and `Setup!E68` (5%). Both are user-reported expectations, not executed purchase commitments. Existing source subscriptions remain unchanged. Year 1 growth is 1,310 × 20% = 262 users, giving 1,572 existing-customer users including growth. At the selected 10K commitment, the adoption plan is 1,310 current existing + 262 existing growth + 4,921 survey + 3,507 other + zero unused. This covers 64.93% from existing/growth/survey; the other-department target averages 64.94 users across 54 unsurveyed entities, rounded up to 65.

| Users | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Existing, including growth | 1,572 | 1,651 | 1,734 | 1,821 | 1,912 |
| Survey | 4,921 | 5,167 | 5,425 | 5,696 | 5,981 |
| Other | 3,507 | 3,682 | 3,866 | 4,059 | 4,262 |
| Total users / paid users | 10,000 | 10,500 | 11,025 | 11,576 | 12,155 |

Each cohort is rounded to whole users after annual growth. All forecast users are assumed billable for the full year, with paid users never below the selected initial commitment. The selected unit rate remains AED 1,180 throughout the 10K case, including when users pass 12,000; automatic repricing is not applied, consistent with the locked-price instruction. The selected support percentage is also held constant and remains separate from subscription savings.

For the counterfactual benchmark, existing-customer growth uses the supplied weighted current subscription price. Survey and Other preserve their respective Year 1 subscription cost mix, using list price until matched respondent data is available. This is an explicit modeling assumption. The current-existing and Year 1-growth rows split later existing-cohort costs and savings proportionally. User counts and cost forecasts are not claimed as observed actuals.

Year 1 subscription savings: current existing AED 383,369.75; existing growth AED 76,673.95; survey AED 8,710,170; other AED 6,207,390; total AED 15,377,603.70. Five-year central subscription is AED 65,202,080; modeled five-year subscription savings are approximately AED 84,964,936.89. Support is separately forecast; onboarding, tax and optional services remain excluded.

Validation: 236 formula/input checks passed, including all three commitment options, growth counts, annual and five-year costs, zero-growth restoration, unused capacity, matched respondent costs and reconciliation. All three scenarios recalculated in LibreOffice without formula errors; native adoption-chart references include the extra growth row. Changed summary, forecast and assumptions views were visually checked.


## Commitment control fix — V2-S14

The user renamed the workbook to DDA-savings-model-v2.1.xlsx and reported that editing Summary E4 did not change the model. Summary E4 was a formula displaying Setup E5. It is now the single editable commitment input, highlighted amber. Setup E5 links back to Summary E4; the rest of the model retains its established dependencies. The saved 10,000-user selection was retained. Changing Summary E4 to 5,000, 8,000 and 10,000 was tested for pricing and summary totals, with native recalculation verification. The edit imports the user's v2.1 file and preserves other cell values and formulas.

## Current Year 1 growth correction — V2-S15

The user corrected Year 1 existing-customer growth to **50%**, replacing the 20% rate in V2-S13, and requested the model and presentation update. This is user-reported growth, not independently verified contracted demand. `Setup!E67` is now 50%. The 5% annual growth from Year 2, 20% employee-based potential adoption, existing prices, central commitment and support terms are unchanged.

The selected 10K allocation is 1,310 current existing + 655 existing growth + 4,921 survey + 3,114 Other. Existing/growth/survey account for 68.86%; Other averages 57.67 users across 54 unsurveyed entities, rounded up to 58. The expanded existing cohort has 1,965 users and AED 575,054.63 Year 1 subscription savings at the same weighted current price. Survey overlap remains unresolved and the full survey allocation is retained by user instruction.

The five-year existing cohort is 1,965 / 2,063 / 2,166 / 2,274 / 2,388. Other is 3,114 / 3,270 / 3,434 / 3,606 / 3,786. Survey and total paid users remain unchanged. Five-year benchmark AED 146,967,073.90 less central subscription AED 65,202,080 gives modeled subscription savings of AED 81,764,993.90. Savings decrease versus the earlier forecast because more seats use the lower existing-customer benchmark instead of list price. Support remains separate.

Current workbook: `outputs/dda-business-case-v2/DDA-savings-model-v2.3xlsx.xlsx`. Current presentation: `outputs/dda-business-case-v2/DDA-executive-proposal.pptx`. The old growth calculations above are retained as history and must not be reused as current results.

## Executive simple-average pricing benchmark — V2-S16

The user directed that executive pricing messages use the simple, equally weighted average of the seven supplied project unit prices: AED 2,057.192857142857, displayed as **AED 2,057.19/user/year**. The central price of AED 1,180 is **42.64% lower**, approximately 43%. The population is seven projects across six entities, including two DDA projects. This is a pricing benchmark, not the mean price paid per existing user.

Retain the weighted average of AED 1,472.65 and the 19.87% comparison in the appendix. RTA accounts for 1,000 / 1,310 users (76.34%) at AED 1,245. The user explicitly prohibits applying the simple average to calculate actual existing-customer AED savings. Preserve SUM(actual unit price × users) = AED 1,929,169.75 as the current annual baseline, AED 1,545,800 as the central allocation, and AED 383,369.75 as the annual existing-user saving. The Excel model's actual-spend formulas and growth assumptions remain unchanged. This instruction changes executive presentation and documentation, not the source prices or cash-savings calculation.
