# Signfide prototype QA

Verified 2026-10-14. Local prototype in the existing parent repository on branch `work`.

## Result

All eight routes passed at 1440, 768, 390, and 320px: 32 route/viewport checks, no horizontal overflow, and zero automated WCAG A/AA violations in the tested default states. Build and JavaScript syntax checks passed. Machine evidence is in [routes-results.json](routes-results.json).

## Execution and evidence

### Heritage update verification — 2026-10-14

The Circularo heritage/service-model update retains all eight routes and the selected Good Faith system. Hosting copy incorporates Josef’s owner-reported confirmation of Microsoft Azure in the United States; dedicated-environment configuration and service assurances remain pending.

The refreshed QA run checks:

- Hero and footer endorsements, including the footer from a directly loaded Pricing route, reach `/about#powered-by-circularo`.
- The heritage section and FAQ land below the sticky header at 1440, 768, 390, and 320px. A duplicated scroll offset found during visual review was corrected; section margins now add only 16px to the existing page scroll padding.
- Three exact reviewed external anchors have accessible labels, visible external indicators, new-tab disclosure, and `noopener noreferrer`. They are not fetched or followed during local browser QA.
- Native FAQ keyboard disclosure explains Circularo-branded components, the first-line/technical support split, and owner-reported US Azure hosting.
- The build and link-policy fixtures permit reviewed anchors while rejecting external scripts, styles, images, font references, embeds, unexpected/altered URLs, and protocol-relative asset examples.
- All earlier route, navigation, form, keyboard, history, reduced-motion, no-submission, and no-storage checks remain active. Zero external runtime requests is still required.

Focused screenshots are in `qa/screenshots/heritage-home-{width}.png`, `heritage-about-{width}-viewport.png`, `heritage-faq-{width}.png`, and `heritage-hosting-{width}.png`, in addition to refreshed full-page screenshots. Capture uses reduced motion and waits for a rendered frame after resizing, avoiding unstable scroll/compositing captures. Actual navigation was also visually inspected in the in-app browser.

The public sources were rechecked separately; [heritage evidence](../references/heritage-evidence.md) records their limited support. Published Circularo examples were not transferred into Signfide customer proof. Internal company/shareholder/RACI details and supplier terms are absent from the website.

Isolated section captures temporarily hide floating navigation through a QA-only same-origin stylesheet supplied by the test runner; anchored viewport captures retain the actual header. The prototype's CSP was not changed.

This implementation did not edit sibling company documents, original reference snapshots, the branch, or deployment settings. Publication and domain connection remain separate requests.

Run from the project folder, with the preview server running:

```sh
rtk proxy npm run build
rtk proxy node --check src/app.js
rtk proxy npm run qa
```

Browser: installed Google Chrome, controlled with local Playwright Core. No downloaded browser or external service is needed. Full-page desktop/tablet/mobile screenshots and representative interaction states are retained in the ignored `qa/screenshots/` folder.

| Check | Result |
| --- | --- |
| All eight direct routes and refreshes | HTTP 200, unique title and single h1 |
| Internal links and section anchors | All destinations and fragment IDs verified |
| Unknown route | Designed HTTP 404 and working homepage recovery |
| Browser history | Pricing navigation, Back and Forward verified |
| Desktop navigation | Keyboard disclosure, link focus, Escape closing |
| Mobile navigation | Menu open/close, Escape, demo CTA, route change and refresh |
| Skip link | First keyboard stop reaches main content |
| Demo dialog | Focus wrapping, close/Escape, and return to invoking control; mobile fallback returns to Menu |
| Form errors | Required and invalid-email states, associated messages, first-invalid focus |
| Demo success | Exact local-only preview message; fields cleared; no meeting booked |
| Pricing success | Required name, email, team size, volume; preview message; fields cleared |
| Agreement example | Prepare/Sign/Record, fictional signature, reset, arrow-key tab navigation |
| Workflow example | Five stages, End-key navigation, matching content |
| Comparison checklist | Selection count, reset; local page state only |
| Trust questions | Expand/collapse behavior |
| Reduced motion | Smooth scrolling disabled and CSS animations/transitions removed |
| Runtime requests | No external requests or POST requests; fonts/assets served locally |
| Browser storage | No localStorage or sessionStorage entries |
| Console and missing assets | No unexpected browser errors; deliberate 404 is separately expected |

## Visual review and refinement

Homepage and common shell were built and visually inspected at desktop and mobile widths before the other seven routes were authored. The initial visual pass established the selected wordmark, generous typography, parchment canvas, restrained rules, oxblood sections, and labelled agreement example.

Independent Impeccable layout and typography assessment ran separately from the mechanical detector scan. The final review preserved the selected brand and fixed the actionable issues:

- The security page’s heading on an oxblood section initially inherited oxblood. It now uses parchment and is readable.
- Sustained supporting text and lists were enlarged to 16px. Functional controls were enlarged; meaningful prototype labels use at least 12px. The compact mobile header omits its tiny tagline; the tagline remains elsewhere.
- Dialog keyboard wrapping was made explicit, and mobile demo closing returns focus to the Menu control when the original CTA is hidden.
- Example actions and reset controls meet a 44px minimum target height.
- Shared component rhythm uses spacing tokens, while document miniature metadata and optical offsets retain deliberate compact values.

The detector’s font warning is an intentional exception: DESIGN.md explicitly selects Inter and Newsreader. No alternative palette or font was substituted. Headlines remain within a 6rem ceiling and tracking is no tighter than -.035em. The original ring symbol is absent.

Saved visuals inspected include the homepage desktop/mobile and full-page layouts, security desktop, pricing mobile, workflow tablet, law-firm desktop, electronic-signature mobile, comparison desktop, About mobile, mobile menu, and demo success state. Every route also has desktop, tablet, and mobile screenshots.

## Verification limits

- Tested in desktop Chrome with emulated viewports, not physical iOS/Android devices, Safari, or Firefox.
- Automated axe scans and keyboard checks do not constitute a screen-reader audit or accessibility certification.
- This verifies presentation and local interactions, not a signing engine, identity assurance, commercial availability, actual evidence, booking, security, or legal suitability.
- Final custom logo lettering is unresolved; the site uses a documented provisional typographic wordmark.
- Launch facts remain in [LAUNCH-QUESTIONS.md](../LAUNCH-QUESTIONS.md).

## Parent repository check

Read-only validation ran with Python bytecode writing disabled:

```sh
rtk proxy env PYTHONDONTWRITEBYTECODE=1 make -C ../../.. validate
```

It failed on pre-existing issues outside this folder: the root `tmp` tree, `work/m-capital/work`, missing partner/investor Markdown targets, and broken links in a sibling slide project’s vendored dependencies. No new Signfide prototype issue was reported. These unrelated paths were preserved. No governed records changed, and no parent catalog rebuild was performed.

No branch switch, commit, push, deployment, domain connection, or hosted Site registration occurred in this task.
