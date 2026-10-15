---
title: "Circularo central investor contact register"
id: investor-workspace:central-contact-register
status: draft
classification: confidential
canonical: false
evidence_state: reported
revision: 2
created: 2026-10-03
updated: 2026-10-03
owner: Josef Neumann
---

## Change history

- 2026-10-03 — Updated outreach location and/or Git handling at Josef's instruction; evidence and approval states retained.
- 2026-10-03 — Consolidated all four investor batches into one register; recorded eight observed LinkedIn messages and saved the loaded conversations.

# Circularo central investor contact register

**Use [contact-register.xlsx](contact-register.xlsx) as the editable contact and activity register for every investor batch.** It contains 86 distinct people, 130 organisation research entries and eight recorded outreach activities. This is a confidential, non-canonical working record, versioned under Git at Josef's instruction on 2026-10-03.

The Contacts tab holds one row per person, their LinkedIn profile, all associated batches, published role/relevance, source files and verification cautions. The Activity tab holds individual interactions. The Organisations tab preserves firm research coverage, including candidates without an identified person; grouped operating-company/fund entries retain the source's scope rather than implying a common investment vehicle.

## Recorded outreach and conversations

All eight loaded threads showed one outbound message from Josef and LinkedIn's “You haven’t received a response yet.” No meeting, response, read receipt or investment interest is inferred.

| Person | Organisation | Recorded date | LinkedIn displayed time | Conversation |
| --- | --- | --- | --- | --- |
| Kobie Fuller | Upfront Ventures | 2026-10-03 | 3:30 PM | [Message and thread](conversations/kobie-fuller.md) |
| Paul Huber | Clearlake Capital Group | 2026-10-03 | 3:28 PM | [Message and thread](conversations/paul-huber.md) |
| Ryan Laurin | Marlin Equity Partners | 2026-10-03 | 3:25 PM | [Message and thread](conversations/ryan-laurin.md) |
| Hasan Askari | K1 Investment Management | 2026-10-03 | 3:22 PM | [Message and thread](conversations/hasan-askari.md) |
| Jed Leidheiser | March Capital | 2026-10-03 | 3:20 PM | [Message and thread](conversations/jed-leidheiser.md) |
| Thomas Oh | Arrowroot Capital | 2026-10-03 | 3:18 PM | [Message and thread](conversations/thomas-oh.md) |
| Dylan Pearce | Greycroft | 2026-10-03 | 2:52 PM | [Message and thread](conversations/dylan-pearce.md) |
| Alex Neo | Singtel Innov8 | 2026-10-03 | 1:00 AM | [Message and thread](conversations/alex-neo.md) |

LinkedIn displayed “TODAY”; the register maps that label to the client's October 3, 2026 calendar date. Displayed times are preserved separately. The timezone and absolute timestamps were not exposed and have not been inferred. The transcripts preserve the complete message text loaded in these eight threads, including subjects and signatures; they are not an export of unseen or archived history. Unrelated conversations were excluded.

## How to update

1. Find the person in Contacts and copy their Contact ID. Filter by batch, organisation or latest logged status as needed.
2. Add a row inside the Activity table for each new message, reply, meeting or material internal update. Use a unique Entry number greater than every existing Entry; the next number is **9**. Entry numbers preserve logging order even when rows are sorted.
3. Enter the Contact ID, actual date, channel, direction, resulting status, subject/summary, owner and evidence. Add a follow-up date only when you choose one. Dates must be real spreadsheet dates, not text. Do not leave the date or status blank for a real entry.
4. Contacts calculates the latest logged status, next action, follow-up date and links from the highest Entry number for that person. First recorded contact and last activity date use the earliest and latest recorded dates. The first recorded date is not a claim about lifetime first contact.
5. Append replies to the person's conversation Markdown file with the date, direction and source. Point the Activity row to that transcript and the LinkedIn thread when available. Do not overwrite the originally sent wording.
6. For a new person, add one Contacts row, use a unique permanent Contact ID and copy the calculated columns from an existing row. Retain all relevant batch references, professional verification cautions and source files.

The workbook supports **1,000 Activity rows**, worksheet rows 8–1007. Before exceeding that capacity, extend the Activity references in the calculated Contacts columns together and verify the totals. New Activity rows should inherit the table's formatting; copy status/direction validation from an existing row if necessary. The workbook was checked with the artifact calculation engine; native Excel opening has not been tested.

**The workbook is the continuing editable register.** [import-snapshot.json](import-snapshot.json) and [conversation-import.json](conversation-import.json) preserve the initial import and capture only. They do not automatically sync with workbook edits. The build script refuses to overwrite an existing workbook; any later rebuild must first merge manual activity and contact changes. There is no automatic LinkedIn monitoring.

## Import scope and evidence

| Source | Imported person memberships |
| --- | ---: |
| [Batch 01 contacts](../outreach-batch-01/contacts.csv) | 31 |
| [Batch 02 contacts](../outreach-batch-02/contacts.csv) | 26 |
| [Batch 03 lead notes](../outreach-batch-03/README.md) | 26 |
| [Batch 04 research and event contacts](../outreach-batch-04/README.md) | 22 |

These 105 memberships consolidate to 86 people. Matching personal LinkedIn URLs are normalised across regional hosts and trailing slashes. Distinct profiles are not merged on name alone. Research candidates, including conventional VC firms, retain their original batch assumptions; importing them does not qualify them for the latest transaction mandate. “No outreach recorded” means no activity is present in this register, not that Josef has never contacted them.

Profile and role verification retain their source scope and dates. Some links are locators requiring reconfirmation; one imported contact has no LinkedIn URL. Avery Rosin's event/LinkedIn affiliation conflict remains unresolved; no firm was selected by assumption. Prior batch status statements are research snapshots; this register and its dated evidence hold the current working outreach state.

Message claims, including financial figures, customer references and future product direction, remain attributed sent correspondence. Saving them does not independently verify the statements or approve them as reusable Circularo facts. The [investor master](../../master/investor-materials-master.md) remains the reference for evidence boundaries.

## Observations and recommendations

- Capture messages when sent: LinkedIn's relative date labels become harder to interpret later. Record the absolute date and retain the displayed time and timezone uncertainty.
- Maintain one person across batches. Dylan Pearce belongs to both batches 03 and 04; separate contact rows would risk duplicate pitches and split reply history.
- Qualify founder secondary early in a substantive discussion. The observed introductory messages do not explicitly establish the mandatory liquidity component, and a request for institutional investment does not imply acceptance of secondary proceeds.
- Use the saved sent message when drafting a follow-up. It may differ from the prepared batch draft; actual correspondence determines continuity.
- Treat second-degree connections as possible introduction routes, not evidence of a willing introducer. Reconfirm current vehicle and authority before relying on titles.
- For LA outreach, choose actual meeting slots within the confirmed October 8–15 visit when a reply arrives. Follow-up dates and meeting status remain unassigned until a real decision or agreement.

## Verification

The import reconciles 86 unique contact IDs and 86 distinct people, all four batches and eight transcript files. The workbook contains filterable tables and recalculated formulas without formula errors. An appended test interaction updated a previously uncontacted person's dates/status; a changed status updated the matching sent contact. Both tests were removed/restored before export. All three worksheets were rendered and visually checked. Repository-wide validation is documented in [verification.md](verification.md).

Return to the [investor batch index](../README.md).
