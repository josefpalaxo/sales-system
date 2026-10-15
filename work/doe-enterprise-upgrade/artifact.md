# DoE Enterprise upgrade proposal template contract

Reference: /Users/josefneumann/Downloads/[template] EN Proposal for Circularo Enterprise Plan Subscription.docx
SHA256: 906fe2dbbc320ed3a4dac710dd56e14c6f60d0dae4c60ab9f7ad0d972fe86498
Reference render: qa/template, 42 pages, 5 sections. All page patterns reviewed in contact sheets; cover and running furniture examined at full page size.
Package inventory: qa/package-inventory.json records every part size and hash.

## Page and typography
Letter portrait 12240 x 15840 twips. Cover top/bottom 1440, left 1417.3228, right 1016.6513 twips. Body left 1440, right 1016.6513. Header 0, footer 720. Preserve cover three-column metadata section and first-page header/footer. Body single column, bottom 1440.
Title style Spartan bold purple 1D0090, source cover direct size 37pt, line 1.15. Subtitle Spartan bold gray 666666 at 19pt. Heading1 Spartan bold 20pt, Heading2 Spartan bold 14pt. Body Mulish from docDefaults; use 11pt and 1.1 line spacing with 8pt paragraph spacing for new prose. Preserve source named styles and embedded fonts. Body headings black. Purple small labels and purple table headers with white text derive from source comparison table. Body cells white, subtle horizontal purple rules, 10pt Mulish.
Default header uses a thin rule, document label and copyright. Footer uses rule, Circularo logo, PAGE/NUMPAGES. First-page logo and purple flourish preserved byte for byte. Title and table purple intentionally retained as requested visual-template fidelity.

## Slots and content flow
word/document.xml body children 0-29 form cover. Preserve cover drawings and paragraph geometry. Rewrite p[5] title, p[7:8] subtitle, p[17] customer, p[21] date, p[23] reference, p[25] author and p[27] confidentiality. Remove highlights on rewritten fields.
Body child 30 TOC content control and all subsequent original content are removed under explicit permission to ignore source content. No TOC needed for six-page proposal. Original generic claims, certifications, screenshots, customer logos, licensing terms and appendices are not reused as evidence. Existing drawing/media parts remain preserved but unused where source body is removed.
Clone source heading and body patterns into five new content pages: proposal overview and existing scope; oversight and identity; preparation and integration plus further capabilities; rollout and additional services; commercial schedule. Allow page count and section count change as part of authorized full content replacement. Retain first three cover section properties plus one final body section, remove redundant appendix section.
Tables are used for existing subscription facts and editable commercial details only. No embedded internal sources or sales strategy in customer text. Pricing and timing remain explicit bracketed placeholders.

## Package preservation
All package parts and relationships preserve-only except word/document.xml (rewrite), word/header1.xml (correct document label), word/settings.xml (updateFields), docProps/core.xml (document metadata). Styles, numbering, fonts, images, all relationships, first-page header, both footers and other opaque parts remain byte-identical. Existing PAGE and NUMPAGES remain live, updateFields true because Word refresh unavailable. No headless save over deliverable.

## Verification
Verify reference hash unchanged, preserve-only parts identical, no legacy template prose in body, planned page count and no layout overflow. Render final DOCX and inspect every final page. Compare cover and running furniture with reference. Source geometry contains fractional OOXML twips rejected by python-docx property audit; raw XML is authoritative. Do not normalize unrelated source geometry. Inspect final text and required placeholders. Only final DOCX is delivered.

## Content authority
Prior ClickHouse/Odoo query: order 2253, QTN/2025/09/02088, 500 Business users and specified inclusions, term 2025-12-20 to 2026-12-19, source extract 2026-09-28. Supplied CSV supplies Enterprise feature inclusions. Current tenant configuration is unverified; comparison says additions to recorded subscription scope, not proof features are disabled. Proposed preservation of negotiated inclusions is subject to final order. API consumption separately licensed per approved repository rules. AI uses customer credentials and separate provider charges. No invented prices, implementation commitments, service levels, compliance guarantees or savings.

## Final verification and intentional adjustments
Final output has seven pages: cover plus six content pages. Additional capabilities receive their own page for readability. Cover confidentiality moved into p[15]; p[27:29] removed to avoid a spill page. Four source-derived sections retained. First-page artwork, font parts, styles, numbering, all relationships and both footer parts remain byte-identical. Only document.xml, header1.xml and settings.xml changed; source has no docProps/core.xml. Final render qa/final-2 inspected on all seven pages. Page fields show 2/7 through 7/7 correctly. Existing-inclusions cross-reference points to verified page 2. No template TOC, appendices, generic licensing assertions or certifications remain in the visible document. Pricing and metadata placeholders are intentional. No repository canonical records changed.

## Enterprise-only paid add-ons revision
User explicitly updated the commercial scope: SCIM, Custom Application Name and Custom Upload Form are optional paid add-ons available only with Enterprise. This task-specific instruction governs the proposal; it does not update canonical product records. The supplied CSV also identifies Custom Web Forms and BIM 360 as Enterprise-only paid options. Public add-on overview currently labels Application Name and Upload Form Business and above; that discrepancy remains recorded here and is not silently promoted into a canonical rule.

Technical descriptions checked against https://www.circularo.com/blog/summer-2026-release/ and https://help.circularo.com/en/how-to-setting-up-scim (SCIM lifecycle synchronization and configuration) and https://help.circularo.com/en/add-on-overview (application name and upload metadata). Packaging follows the explicit user update and supplied matrix. Benefits are proposed use cases, not claims of measured DoE outcomes. Custom Application Name retains its branding prerequisite and attribution. Added a dedicated paid-options page, adoption prioritization and a separate commercial placeholder; included capabilities are explicitly separated from paid options.

Revision verification: qa/final-3 rendered eight pages and all eight were visually inspected. Dedicated optional-add-ons page is page 6; adoption is page 7; commercial schedule is page 8. No clipping, spill pages or table splits. Included-feature cross-reference to pages 3–5 and current-subscription cross-reference to page 2 checked against the render. Page fields display 2/8 through 8/8. Build preservation assertions passed with only document.xml, header1.xml and settings.xml changed. Same final DOCX path retained.
