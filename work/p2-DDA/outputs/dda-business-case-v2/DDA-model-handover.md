# DDA Circularo savings model — agent handover

Prepared: 21 September 2026. Updated for the user's 50% Year 1 existing-customer growth correction. Confidential working material; non-canonical. This document describes the inspected workbook and the user's modeling decisions. It does not establish signed commercial terms or independently verified government spending.

## 1. Start here

**Current workbook:** `DDA-savings-model-v2.3xlsx.xlsx`. The unusual double `xlsx` in the name is intentional here: it is the exact file currently present. Do not silently rename it or work on an older copy.

**Location:** `/Users/josefneumann/Projects/ai-workspace/sales-system/work/p2-DDA/outputs/dda-business-case-v2/DDA-savings-model-v2.3xlsx.xlsx`

**User's write boundary:** modify files only inside `/Users/josefneumann/Projects/ai-workspace/sales-system/work/p2-DDA`. This includes all temporary outputs and QA artifacts. Preserve manual workbook edits and the original source workbook.

**Main control:** change the yellow input **`Summary!E4`** to 5,000, 8,000 or 10,000 users. `Setup!E5` is a formula pointing to that input. Do not overwrite it. The workbook currently selects 10,000.

The model compares subscription costs under central procurement with a mixed counterfactual: actual existing-customer prices plus assumed prices for additional users. **Support is separate and is never included in the savings comparison.** It is a subscription-savings model, not a complete project ROI, NPV or cash-flow model.

The user ultimately wants an executive business case for Digital Dubai Authority, an Excel model, a Word brief and 2–3 executive slides. The current work includes the simplified v2 Excel model and executive slide deck. The v2 slide deck is `DDA-executive-proposal.pptx` (four main slides plus six optional detail slides). No corresponding v2 Word brief has been produced. Older v1 deliverables exist and must not be presented as reflecting this model.

For a new ChatGPT conversation, attach this Markdown file and the current XLSX. This document explains the model but does not replace the workbook for editing or formula verification.

## 2. Business objective and accepted modeling decisions

DDA should see the financial benefit of centrally procuring Circularo for participating Dubai government entities instead of each entity procuring separately. Present three initial annual commitment options: **5K, 8K and 10K**, with 10K selected by default. The pricing ladder has seven bands; proposal options and band counts are different things.

The broader commercial intention is annual billing with a five-year commitment and a locked central unit price. DDA funds centrally and may allocate costs internally to participating entities; this internal funding mechanism is not modeled.

Current controlling decisions:

- Regular Basic Price is **AED 2,950 per user/year** for the v2 list-price benchmark.
- Existing customers retain their supplied actual subscription prices in the counterfactual comparison. Do not substitute list price for them.
- Existing customer users today: **1,310**. Add **50% in Year 1**, or **655** users, as a separate visible adoption source.
- Apply **5% annual user growth from Year 2 through Year 5** to Existing, Survey and Other cohorts. Do not add another 5% in Year 1.
- The user explicitly confirmed that growth increases paid subscription volume at the locked unit price. It is not free usage within an unchanged 10K budget.
- Use the full survey user estimate without deducting existing customers. The user explicitly said: **“Keep A; use full survey counts without a deduction.”** Preserve this as a modeling instruction, not proof that the populations do not overlap.
- Do not count the 16 entities expressing interest as extra quantified users: their user counts have not been supplied.
- Support must be shown separately. Do not compare support fees, assume current support fees, or deduct central support from subscription savings.
- Default baseline escalation is zero. Central unit prices remain fixed. Optional baseline escalation can illustrate price-lock value but is not part of default savings.

## 3. Current pricing ladder

Source in workbook: `Setup!C26:I33`. Rates are the user-accepted schedule for this working model, not evidence of an executed offer.

| Tier | Initial annual commitment | Subscription discount from AED 2,950 | Subscription AED/user/year | Separate support as % of subscription |
| --- | --- | ---: | ---: | ---: |
| 1 | 1–1,000 | 25% | 2,212.50 | 25% |
| 2 | 1,001–1,999 | 30% | 2,065.00 | 22% |
| 3 | 2,000–4,999 | 40% | 1,770.00 | 20% |
| 4 | 5,000–7,999 | 50% | 1,475.00 | 18% |
| 5 | 8,000–9,999 | 55% | 1,327.50 | 16% |
| 6 | 10,000–12,000 | 60% | 1,180.00 | 14% |
| 7 | 12,001+ | 65% | 1,032.50 | 12% |

The selected band applies to the whole pool, not marginal blocks. At exact band boundaries, total price can drop. Minimum thresholds must remain sorted because the lookup uses approximate `MATCH`.

For the selected 10K case, the model keeps **AED 1,180** and **14% support** for all five years. It does not automatically apply Tier 7 when the forecast reaches 12,155 users in Year 5. The separate full-potential illustration does select Tier 7 at 15,200 users. Do not confuse these two views or change repricing behavior without instruction.

## 4. Existing customers — source inputs

Workbook: `Existing customers!C9:L15`, totals in row 16. User-reported final subscription data; the source prices are not independently verified.

| Entity # | Customer/project | Users today | AED/user/year | Current annual subscription AED |
| --- | --- | ---: | ---: | ---: |
| 8 | Digital Dubai Authority (VIP Project) | 50 | 1,850.94 | 92,547.00 |
| 8 | Digital Dubai Authority | 100 | 2,212.50 | 221,250.00 |
| 19 | Dubai Culture & Arts Authority | 25 | 2,212.48 | 55,312.00 |
| 24 | Dubai Electronic Security Center | 60 | 2,507.50 | 150,450.00 |
| 70 | Ports, Customs and Free Zone Corporation (PCFC) | 25 | 2,159.43 | 53,985.75 |
| 74 | Roads and Transport Authority (RTA) | 1,000 | 1,245.00 | 1,245,000.00 |
| 92 | His Highness the Rulers Court | 50 | 2,212.50 | 110,625.00 |
| | **Total** | **1,310** | | **1,929,169.75** |

These are seven project rows across six distinct customer entities; DDA has two projects. The original six rows specify unlimited transactions. Transaction allowance was not supplied for the Rulers Court addition.

For v2, RTA is deliberately modeled as a user-based subscription using the supplied price. Its historical CAPEX arrangement in v1 is not the v2 calculation basis. PCFC uses 25 users, not the earlier 20. Dubai Ambulance, ICD and Dubai Healthcare City appear in earlier customer information but are outside the supplied final v2 customer-price table. Their omission does not mean they stopped being customers. Do not reintroduce them without updated v2 instructions/data.

### Executive pricing benchmark versus actual-spend savings — latest instruction

For executive pricing headlines, use the **simple average of the seven project unit prices**, with equal weight per project: **AED 2,057.19/user/year → AED 1,180 = 42.64% lower** (approximately 43%). The unrounded simple average is AED 2,057.192857142857. There are six distinct entities and seven project rows because DDA has two projects. Label the measure as a simple project-price average, not a user-weighted average or an equal-weighted average of six entities.

Keep the **weighted average of AED 1,472.65** and its **19.87%** comparison in the appendix for transparency. RTA has 1,000 of 1,310 users (76.34%) at AED 1,245, the lowest supplied unit price, so it dominates the weighted average. The two measures answer different questions: typical project unit pricing versus average subscription cost per actual existing user.

**No cash-savings formula changes:** existing annual baseline stays **SUM(customer users × customer actual unit price) = AED 1,929,169.75**. At the central price, the existing-user allocation costs **1,310 × AED 1,180 = AED 1,545,800**. Annual savings remain **AED 383,369.75**, not 42.64% of existing spend. Never apply the simple average to all 1,310 existing users.

The Year 1 growth and five-year existing-user forecasts continue using the same current weighted price mix. The workbook remains unchanged by this executive presentation update. Slide 8's weighted-price extrapolation across all forecast users remains a separately labeled modeled benchmark (AED 81.37m benchmark, AED 16.17m benefit), not actual aggregate government spending. Do not replace it with the simple average without explicit instructions for a new modeled scenario.

### What “Existing — subscription benchmark AED” means

This is the alternative cost of serving the forecast existing-customer cohort at its **current weighted average subscription price**. It is not the AED 2,950 list price or the AED 1,180 central price.

```text
Current annual subscriptions = SUM(customer users × customer unit price)
Weighted current price = 1,929,169.75 / 1,310
                       = AED 1,472.6486641221375 per user/year

Year 1 existing users = 1,310 + ROUND(1,310 × 50%, 0) = 1,965
Year 1 existing benchmark = 1,965 × unrounded weighted current price
                         = AED 2,893,754.63
```

`Potential!D35` contains:

```excel
=IF($E$14=0,0,'Existing customers'!$G$16*D28/$E$14)*(1+'Setup'!$E$12)^0
```

Later columns use that year's existing-user count and escalation exponent. The assumption is that growth retains the current customer price mix. Do not round the weighted unit price before multiplying.

`Existing customers!J9:J16` is a static five-year comparison for today's users. Summary and Potential include growth and therefore have different five-year existing-customer savings. This distinction is intentional; do not force those figures to equal one another.

## 5. Survey evidence and interpretation

The internal DDA survey was supplied by the user. Respondent-level data is pending. Question bases differ; do not apply every percentage to 38 respondents.

### User bands used in the adoption model

Workbook: `Survey!C21:H27`, displayed on `Summary!C18:H23`.

| Current/expected users per entity | Responses | Minimum users per response | Minimum total | Illustrative average | Illustrative total |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1–50 | 6 | 1 | 6 | 25.5 | 153 |
| 51–100 | 4 | 51 | 204 | 75.5 | 302 |
| 101–500 | 7 | 101 | 707 | 300.5 | 2,103.5 |
| More than 1,000 | 4 | 1,001 | 4,004 | 2,000 | 8,000 |
| **Quantified total** | **21** | | **4,921** | | **10,558.5** |

The original full survey also has one “Other / unspecified” response: 22 responses in all. Unknown users are excluded, not assigned zero observed users.

Default `Setup!E57 = 1` selects the numerical minimum **4,921**. `E57 = 2` selects the illustration, rounded to 10,559 for allocation and capped by available seats. Midpoints and the 2,000-user average for the open band are editable assumptions, not observed totals. The numerical minimum is a minimum implied by the answered bands, not a confirmed minimum purchase or a uniquely new-customer pipeline.

### Annual system cost bands

Workbook: `Survey!C8:H15`.

| Reported current/expected annual system cost | Responses | Illustrative average AED |
| --- | ---: | ---: |
| Less than AED 50,000 | 7 | 25,000 |
| AED 50,001–100,000 | 6 | 75,000.50 |
| AED 100,001–250,000 | 6 | 175,000.50 |
| AED 250,001–500,000 | 1 | 375,000.50 |
| More than AED 2,000,000 | 1 | 2,500,000 |
| Not available / unknown | 1 | Not quantified |

The illustrative cost total is AED 4,550,006.50. These costs are unpaired with user bands and may include support or other services. **They do not feed the subscription-savings claim.** Do not divide the aggregate cost estimate by the aggregate user estimate to invent a comparable customer price.

### Demand and growth signals

- 38 entities surveyed; 21 currently use a digital/electronic signature system.
- Of the remaining 17 in Q1: 10 reported no system, six were planning and one was implementing.
- 16 entities expressed interest: 10 current requirements and six possible future needs.
- 17 of 22 growth-question respondents expect usage growth: **77.27%**.
- 13 of 17 growth respondents cite more users: **76.47%**. This was a multiple-selection question.
- These are shares of responding organizations, not user growth rates. They do not mathematically establish the separate 50% or 5% assumptions.
- The survey's quantified user cohort must not be relabeled as the 16 additional-interest entities.

## 6. Entity scope and overall potential

Planning scope is **92 entities**, including user-added entity #92, His Highness the Rulers Court. With 38 surveyed, the model uses **54 unsurveyed entities** as an illustrative pool for the remaining adoption target. Respondent identities are not available to validate this pool's exact membership.

The original source is `DDA deparments shared service.xlsx`, sheet **`dda departments`**, **columns A:B only**. Other columns and the `91 Entities Model` sheet contain assumptions, not verified facts. Preserve the original workbook.

`Entities!C9:D100` preserves 92 original name rows. The Rulers Court is appended at row 101 with provenance. `Entities!D103` therefore counts **93 raw name rows**, not 93 distinct entities. The source contains repeated project rows/aliases. Do not “correct” the 92-entity planning scope to the raw row count.

Overall potential is **76,000 employees × 20% adoption = 15,200 users**. This is a planning assumption that includes Existing, Survey and Other users; it is not an additional cohort. Adding an entity did not establish a higher employee population.

`Potential!C43:I57` is a separate full-potential scale illustration, not an extra purchase or a forecast date. At 15,200 users it shows AED 1,032.50/user/year, AED 15,694,000 subscription and AED 1,883,280 separate support annually.

## 7. Workbook map and controls

| Sheet | Main purpose and important ranges |
| --- | --- |
| Summary | Main output; editable commitment E4; savings C8:H13; survey bands C18:H23; adoption/evidence C28:I35; support E38; two native charts; adoption-source table C61:D66. |
| Setup | Assumptions and pricing ladder. E5 links to Summary E4. Selected tier/rates E15:E19. |
| Existing customers | Source user counts and prices in C9:E15; source totals D16/G16; allocated central cost/savings F:L. |
| Survey | Unpaired source cost/user bands; matched subscription comparison C32:H49; reach and demand signals C52:J72. |
| Potential | Demand context; five-year user/cost model C25:I41; full-potential illustration C43:I57; adoption logic C62:I83; A1/A2/B/C bridge C86:H91; reconciliation E100. |
| Respondents | Blank future input area C9:M46, 38 rows. Feeds comparable non-customer subscription costs once inputs qualify. |
| Entities | Source list and the user-supplied entity addition, with provenance. |

| Control | Current value | Meaning |
| --- | ---: | --- |
| Summary!E4 | 10,000 | Only commitment input; positive whole users. |
| Setup!E5 | Formula | `='Summary'!E4`; do not enter a second independent commitment here. |
| Setup!E8 | 2,950 | Regular Basic Price AED/user/year. |
| Setup!E9 | 5 | Fixed model horizon; changing it does not add forecast columns. |
| Setup!E10 | 76,000 | Employee planning population. |
| Setup!E11 | 20% | Employee-based potential adoption. |
| Setup!E12 | 0% | Optional annual baseline-price escalation; not central indexation. |
| Setup!E13 | 100% | Usage of remaining capacity after existing Year 1 growth. |
| Setup!E54 | 92 | Planning entity scope. |
| Setup!E55 | 6 | Distinct existing customer entities. |
| Setup!E56 | 0% | Share of current existing users deducted from the survey estimate. |
| Setup!E57 | 1 | Survey selection: 1 = numerical minimum; 2 = illustration. |
| Setup!E67 | 50% | Existing-customer Year 1 user growth. |
| Setup!E68 | 5% | All-cohort annual user growth in Years 2–5. |

Amber identifies inputs. Formula cells should remain formulas. Working-sheet numeric inputs are blue and cross-sheet links green; Summary outputs mainly use dark text. Charts are native/editable and tied to worksheet cells.

## 8. Calculation logic

### Year 1 adoption

With no matched respondent data, the default calculation is:

```text
Existing today = 1,310
Existing Year 1 growth = ROUND(1,310 × 50%, 0) = 655
Existing Year 1 total = 1,965
Remaining capacity = MAX(0, commitment − 1,965)
Additional seats used = ROUND(remaining capacity × usage assumption, 0)
Survey allocation = MIN(additional seats used, selected survey estimate)
Other used seats = MAX(0, additional seats used − survey allocation)
Unused seats = MAX(0, remaining capacity − additional seats used)
```

In the general formula, Survey allocation also respects matched Survey users using `MAX(selected estimate after deduction, matched Survey users)`, capped by capacity. Matched Other users are validated against the Other allocation.

The 10K adoption-source table is **1,310 Existing + 655 Existing growth + 4,921 Survey + 3,114 Other + 0 Unused = 10,000**.

There are two different gaps:

- `Potential!E17` is **8,035** seats beyond existing/growth and individually matched new users. Aggregate survey estimates are not treated as individually identified allocations here.
- `Potential!E72` is **3,114** Other users needed after the modeled survey allocation. This is a residual adoption target, not surveyed demand.

Existing/growth/Survey cover **68.86%**. Allocating 3,114 Other users across 54 unsurveyed entities gives about 57.67 each, rounded up to **58** as a feasibility illustration, not a forecast of each entity's demand.

### Years 2–5

Each cohort uses `ROUND(previous year users × (1 + 5%), 0)`. Round by cohort each year, then sum. This can differ from rounding the growth of the aggregate only once.

Paid users each year = `MAX(initial annual commitment, total users in use)`. Full-year billing is assumed; there is no monthly ramp, churn or proration. Growth first uses any unused minimum-commitment capacity before increasing paid volume.

`Potential` columns D:H are Years 1–5. Column I totals monetary flows only; annual user counts must not be presented as five-year unique users.

| Row | Meaning |
| ---: | --- |
| 26–27 | Existing and Survey/Other growth rates. |
| 28–30 | Existing (including growth), Survey and Other users. |
| 31–32 | Users in use and paid subscription users. |
| 33 | Locked selected subscription unit price. |
| 35 | Existing benchmark at weighted current prices. |
| 36–37 | Survey and Other subscription benchmarks. |
| 38 | Combined subscription benchmark. |
| 39 | Paid users × locked central unit price. |
| 40 | Benchmark minus central subscription: subscription savings. |
| 41 | Separate support: central subscription × selected support rate. |

Survey/Other benchmarks use AED 2,950 for unpriced users. Once matched costs are provided, the appropriate cohort's Year 1 comparable subscription costs replace the same users' list-price assumptions. Subsequent years preserve that Year 1 blended price per user. Optional baseline escalation compounds both existing and new-user benchmarks; it does not change the locked central price.

Summary uses four savings rows: A1 current existing, A2 existing Year 1 growth, B Survey and C Other. Later existing-cohort savings are split between A1/A2 in proportion to their Year 1 users. If capacity is unused, its central subscription cost is allocated to C without adding hypothetical baseline spending. The adoption-source table separately displays Unused.

Annual reconciliation: `Potential!E100 = Potential!G91 − Potential!D40`, expected zero. Five-year Summary savings must equal `Potential!I40`. Retain negative savings where they occur; they are not a calculation error merely because they weaken an option.

## 9. Current 10K reference results

These are the inspected saved values, useful for regression checks. They are conditional on the current inputs and are not permanent commercial facts.

| Users | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Existing, including growth | 1,965 | 2,063 | 2,166 | 2,274 | 2,388 |
| Survey | 4,921 | 5,167 | 5,425 | 5,696 | 5,981 |
| Other | 3,114 | 3,270 | 3,434 | 3,606 | 3,786 |
| Total / paid users | 10,000 | 10,500 | 11,025 | 11,576 | 12,155 |
| Central subscription AED | 11,800,000 | 12,390,000 | 13,009,500 | 13,659,680 | 14,342,900 |

| Year 1 savings source | Users | Benchmark AED | Central subscription AED | Subscription saving AED |
| --- | ---: | ---: | ---: | ---: |
| A1 Current existing | 1,310 | 1,929,169.75 | 1,545,800.00 | 383,369.75 |
| A2 Existing growth | 655 | 964,584.88 | 772,900.00 | 191,684.88 |
| B Survey | 4,921 | 14,516,950.00 | 5,806,780.00 | 8,710,170.00 |
| C Other | 3,114 | 9,186,300.00 | 3,674,520.00 | 5,511,780.00 |
| **Total** | **10,000** | **26,597,004.63** | **11,800,000.00** | **14,797,004.63** |

Five-year subscription benchmark: **AED 146,967,073.90**. Central subscription: **AED 65,202,080.00**. Modeled subscription savings: **AED 81,764,993.90**. Separate support: **AED 1,652,000 in Year 1**, **AED 9,128,291.20 over five years**.

For today's 1,310 users only, annual subscription savings are AED 383,369.75 at 10K, AED 190,144.75 at 8K, and **negative AED 3,080.25 at 5K**. The 5K option should not be described as saving money for every current customer. Its broader modeled savings arise from additional users.

## 10. Adding respondent-level data

The `Respondents` input area is currently empty. The user said they would supply respondent-level records; do not fabricate them or infer them from aggregate bands.

| Column | Input/calculation |
| --- | --- |
| C | Entity name; one record per entity. |
| D | Existing Circularo? `Yes`, `No` or `Unknown`. |
| E | Comparable users, positive whole number. |
| F | Reported total annual system cost, retaining source scope. |
| G | Comparable annual subscription cost only. Blank means unknown; zero is a valid supplied value. |
| H | Cost basis: `Current` or `Expected`. |
| I–J | Calculated central subscription and saving. |
| K | Calculated input status. |
| L | Source / cost-scope note. |
| M | Demand cohort: `Survey respondents` or `Other departments`. |

Only complete rows marked `Ready`, with Existing Circularo? = `No`, enter new-customer calculations. Existing/unknown status, missing inputs and duplicate entity names are visibly excluded. Duplicate detection uses names; it does not resolve spelling variations or aliases automatically.

Reported cost in F does not automatically become comparable subscription cost in G. Confirm scope first. Expected costs are forecasts, not actual spending. `Survey!E34:E40` summarizes qualifying rows from both cohort labels despite the sheet name. The cohort field assigns their costs to B or C in the model.

Watch `Potential!I17` (capacity/usage) and `E79` (cohort allocation). Invalid allocations should not be turned into healthy-looking zero savings. Keep `n.a.` for unavailable comparisons.

## 11. Source history and superseded assumptions

Files relative to the authorized working folder:

- `v2-fact-register.md`: source/decision chronology through V2-S16. Earlier sections contain historical calculations and statements; the latest growth and control decisions supersede them.
- `v2-pricing-proposal.md`: pricing proposal history. Use the accepted V2-P04 ladder, not abandoned intermediate proposals.
- `fact-register.md`: original v1 context. Do not copy its prices, support rules or customer totals into v2 without reconciling later instructions.
- `research-notes.md` and `entity-research-register.md`: earlier research context; inspect provenance before reuse.
- `build/source-data.json`: extraction used for the original entity list, not a replacement for the source workbook.
- `outputs/dda-business-case/`: older v1 deliverables. These are a different model version.

Superseded directions that must not silently return: AED 2,360 baseline; AED 1,180 for every commitment of 3,000+; 70% highest-tier discount; only three pricing bands; deployment-specific 10%/20% support comparisons; constant five-year user quantities; an assumed 250 users for each interested entity; 91-entity scope; 1,260 existing users; editing Setup E5 as the primary control.

Earlier package descriptions mentioned included products/services, AED 18,000 onboarding for new entities, migration charge cessation and separate add-ons. The simplified workbook does not calculate those economics. Retrieve and confirm the applicable terms before using them in a proposal or adding costs; do not assume excluded costs are zero.

## 12. Limits and next work

The main unresolved data is matched respondent identities, user counts and comparable subscription spend. Until supplied, B/C remain modeled avoided costs against list price, not proven savings versus current government expenditure. The chosen no-deduction treatment means the additive adoption case is not independently deduplicated.

Other open commercial/implementation inputs include entity-specific allocations, migration dates, actual annual onboarding pace, the cost of optional services and complete implementation costs. The model assumes full-year use and has no deployment schedule. The employee-based potential is not an adoption commitment.

For an executive report, distinguish current-customer savings from modeled opportunity and separate support from savings. Do not call the subscription-savings total audited cash savings or a complete ROI. Do not claim the survey proves a 10K purchase will be reached easily; explain the cohort assumptions and remaining adoption target.

Continue with user-requested changes or the executive artifacts after reviewing the latest workbook. Do not restart the business-case assumptions, repeatedly ask answered questions, or overwrite manual edits by regenerating from an old script.

## 13. Editing, validation and handover state

The authoring code is `build/build_v2_model.mjs`; validation is `build/verify_v2_model.py`. Artifacts were created/edited with the bundled `@oai/artifact-tool` runtime, with native recalculation in bundled LibreOffice and read-only `openpyxl` checks. Use the spreadsheet skill and bundled dependencies for future XLSX work. Repository instructions require `rtk` for shell commands and `apply_patch` for text/code edits.

**Filename hazard:** both scripts still target **v2.1**, while the current file is **v2.2xlsx.xlsx**. The `--fix-summary-input` mode also expects v2.1. Do not run either blindly. Resolve the current filename and update the intended input/output path first. The normal builder recreates a workbook from scripted inputs and can discard later manual edits; prefer importing and narrowly editing the latest workbook.

QA artifacts live in `build/v2/`, including `tests.json`, `summary-control-tests.json`, `native-verification.json`, renders and private recalculation copies. They are historical test evidence, not the current deliverable. Avoid treating an older recalculated copy as the user's latest model.

Previous validation covered 236 growth/formula checks, native 5K/8K/10K recalculation, chart references, source-row preservation, and the Summary E4 control fix. The control fix compared unchanged cell values/formulas against its v2.1 input. For this handover, the current renamed file was inspected read-only: seven sheets, two charts, no cached Excel error cells, empty respondent inputs, Summary E4 = 10,000 and Setup E5 linked correctly. The subsequent V2-S15 update changed only Setup!E67 to 50%, recalculated and independently checked the five-year figures in bundled LibreOffice, preserved all original cell styles and refreshed formula/chart caches. Current QA is in `build/growth-50/`.

When changing the workbook:

1. Inspect the latest file and preserve unrelated user edits. Record a private before-copy inside the allowed folder.
2. Keep Summary E4 as the sole commitment input and Setup E5 as its link. Do not reintroduce the circular or disconnected-control problem.
3. Verify 5K, 8K and 10K by editing Summary E4, including selected rates, summary counts/costs, forecasts and charts. Restore the intended saved selection.
4. Reconcile A1+A2+B+C to the Year 1 and five-year models; verify support stays separate.
5. Test affected assumptions and edge cases, including growth rounding, unused capacity and respondent-data validity when relevant.
6. Recalculate in the target/native engine and inspect for formula errors. Cached values alone are not proof of live recalculation.
7. Render affected ranges and inspect legibility, labels and native charts. Do not modify unrelated sheets merely to restyle them.
8. Update this handover with new decisions and the actual output filename.

Snapshot SHA-256 of the inspected current workbook:

```text
e07f0ec5943b9418188092209baa54ea8277100435622906cf6d1a8de3a4c83d
```

The hash identifies this handover's source snapshot; later edits will legitimately change it.

## 14. Suggested prompt for the next session

> Continue the Digital Dubai Authority Circularo central procurement model using the attached DDA-model-handover.md and DDA-savings-model-v2.3xlsx.xlsx. Read the handover before editing. Preserve current user decisions and manual workbook edits. Summary E4 is the commitment control. Keep current existing users and Year 1 growth separate, grow all cohorts 5% from Year 2, charge growing volume at the locked unit price, and keep support outside subscription savings. Use actual prices for existing users and clearly label survey/Other list-price comparisons as modeled assumptions. If working in the local repository, write only inside work/p2-DDA and resolve the latest filename before running any builder. First inspect the workbook, then carry out my next requested change.
