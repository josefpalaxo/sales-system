import { chromium } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import { pages } from '../src/pages.mjs';
import { externalLinks } from '../src/external-links.mjs';

const root = resolve(import.meta.dirname, '..');
const base = process.env.QA_URL || 'http://127.0.0.1:4173';
const homeOnly = process.argv.includes('--home');
await mkdir(resolve(root, 'qa/screenshots'), { recursive: true });
const context = await chromium.launchPersistentContext(resolve(root, '.cache/qa-chrome'), {
  executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true, reducedMotion: 'reduce', viewport: { width: 1440, height: 1000 },
  downloadsPath: resolve(root, '.cache/downloads'), args: ['--disable-crash-reporter']
});
const page = context.pages()[0];
// Supply capture-only CSS at a same-origin URL; do not bypass or weaken the actual CSP.
await context.route(base + '/__qa/capture.css', route => route.fulfill({ status: 200, contentType: 'text/css', body: readCaptureCss }));
const readCaptureCss = await readFile(resolve(root, 'qa/capture.css'), 'utf8');
async function captureSection(locator, path) {
  const style = await page.addStyleTag({ url: base + '/__qa/capture.css' });
  try { await locator.screenshot({ path }); }
  finally { await style.evaluate(element => element.remove()); }
}
page.setDefaultTimeout(10000);
const errors = [], requests = [], results = [], externalNavigation = [], heritageAnchors = [];
const reviewedExternal = new Map(Object.values(externalLinks).map(link => [link.url, link]));
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('requestfailed', request => errors.push(`${request.url()}: ${request.failure()?.errorText}`));
page.on('request', request => requests.push({ url: request.url(), method: request.method() }));
try {
  const routes = homeOnly ? ['/'] : Object.keys(pages);
  for (const route of routes) {
    const response = await page.goto(base + route);
    assert.equal(response.status(), 200, route);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('h1').count(), 1, `${route}: single h1`);
    await page.reload();
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.title(), `${pages[route].title} · Signfide`);
    const slug = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-');
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: width < 650 ? 844 : 1000 });
      await page.evaluate(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      });
      const overflow = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, width: innerWidth }));
      assert.ok(overflow.doc <= overflow.width, `${route} overflow at ${width}: ${JSON.stringify(overflow)}`);
      if (width !== 320 || ['/', '/about', '/security'].includes(route)) await page.screenshot({ path: resolve(root, `qa/screenshots/${slug}-${width}.png`), fullPage: true });
      if (route === '/' && [1440, 390].includes(width)) await page.screenshot({ path: resolve(root, `qa/screenshots/home-${width}-viewport.png`) });
      const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
      assert.deepEqual(accessibility.violations.map(v => ({ id: v.id, impact: v.impact, targets: v.nodes.map(n => n.target) })), [], `${route} accessibility at ${width}`);
      results.push({ route, width, response: 200, overflow: false, axeViolations: 0 });
      // Isolated section captures hide floating chrome; anchored viewport captures below retain it.
      if (route === '/') await captureSection(page.locator('.heritage-home'), resolve(root, `qa/screenshots/heritage-home-${width}.png`));
      if (route === '/security') await captureSection(page.locator('#service-hosting'), resolve(root, `qa/screenshots/heritage-hosting-${width}.png`));
      assert.equal(await page.locator('.site-footer .endorsement a').getAttribute('href'), '/about#powered-by-circularo');
      if (route === '/about') {
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto(base + '/about#powered-by-circularo');
        await page.waitForFunction(() => {
          const section = document.querySelector('#powered-by-circularo').getBoundingClientRect();
          const header = document.querySelector('.site-top').getBoundingClientRect();
          return section.top >= header.bottom && section.top < innerHeight;
        });
        await page.screenshot({ path: resolve(root, `qa/screenshots/heritage-about-${width}-viewport.png`) });
        const anchor = await page.evaluate(() => ({ top: document.querySelector('#powered-by-circularo').getBoundingClientRect().top, headerBottom: document.querySelector('.site-top').getBoundingClientRect().bottom }));
        heritageAnchors.push({ width, ...anchor, visible: true });
        await page.goto(base + '/about#service-questions');
        await page.waitForFunction(() => document.querySelector('#service-questions').getBoundingClientRect().top >= document.querySelector('.site-top').getBoundingClientRect().bottom);
        await captureSection(page.locator('#service-questions'), resolve(root, `qa/screenshots/heritage-faq-${width}.png`));
        const faqAxe = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
        assert.deepEqual(faqAxe.violations, [], 'FAQ accessibility');
        await page.goto(base + route);
      }
    }
    if (!homeOnly) {
      const anchors = await page.locator('a[href]').all();
      for (const anchor of anchors) {
        const href = await anchor.getAttribute('href');
        const target = new URL(href, base + route);
        if (target.origin !== base) {
          const reviewed = reviewedExternal.get(href);
          assert.ok(reviewed, `Unreviewed external anchor: ${href}`);
          assert.equal(await anchor.getAttribute('aria-label'), `${reviewed.label} (external website, opens in a new tab)`);
          assert.ok((await anchor.textContent()).includes(reviewed.label));
          assert.equal(await anchor.getAttribute('target'), '_blank');
          assert.equal(await anchor.getAttribute('rel'), 'noopener noreferrer');
          externalNavigation.push({ route, href, label: reviewed.label, validatedWithoutFetching: true });
          continue;
        }
        assert.equal(target.origin, base, 'Local links only');
        const linked = await context.request.get(target.href);
        assert.equal(linked.status(), 200, `${route} → ${href}`);
        if (target.hash) assert.ok((await linked.text()).includes(`id="${target.hash.slice(1)}"`), `Missing anchor ${target.href}`);
      }
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  if (!homeOnly) {
    const missing = await page.goto(base + '/not-a-page');
    assert.equal(missing.status(), 404);
    await page.getByRole('link', { name: 'Go to homepage' }).click();
  }
  await page.goto(base);
  const links = await page.locator('a[href]').evaluateAll(elements => [...new Set(elements.map(a => a.getAttribute('href')))]);
  const available = new Set(Object.keys(pages));
  if (!homeOnly) for (const href of links) assert.ok(href.startsWith('#') || available.has(href.split('#')[0]) || reviewedExternal.has(href), `Unknown link ${href}`);
  if (!homeOnly) {
    await page.locator('.hero-endorsement a').click();
    await page.waitForURL(base + '/about#powered-by-circularo');
    await page.goto(base + '/pricing');
    await page.locator('.site-footer .endorsement a').click();
    await page.waitForURL(base + '/about#powered-by-circularo');
    await page.goto(base + '/about#service-questions');
    const support = page.locator('#service-questions details').nth(1);
    await support.locator('summary').focus();
    await page.keyboard.press('Enter');
    assert.equal(await support.getAttribute('open'), '');
    assert.match(await support.innerText(), /first-line support/);
    assert.match(await support.innerText(), /escalated to Circularo/);
    await page.goto(base);
  }
  await page.locator('.hero [data-open-demo]').click();
  // Native modal must contain keyboard focus in both directions.
  await page.keyboard.press('Shift+Tab');
  assert.equal(await page.locator('#demo-dialog').evaluate(el => el.contains(document.activeElement)), true);
  await page.keyboard.press('Tab');
  assert.equal(await page.locator('#demo-dialog').evaluate(el => el.contains(document.activeElement)), true);
  await page.locator('#demo-dialog .enquiry-form button[type=submit]').click();
  assert.equal(await page.locator('#demo-name').getAttribute('aria-invalid'), 'true');
  assert.equal(await page.locator('#demo-name').evaluate(el => el === document.activeElement), true);
  await page.locator('#demo-name').fill('Fictional Visitor');
  await page.locator('#demo-email').fill('not-an-email');
  await page.locator('#demo-dialog .enquiry-form button[type=submit]').click();
  assert.equal(await page.locator('#demo-email').getAttribute('aria-invalid'), 'true');
  await page.screenshot({ path: resolve(root,'qa/screenshots/demo-form-errors.png') });
  await page.locator('#demo-email').fill('fictional@example.test');
  await page.locator('#demo-dialog .enquiry-form button[type=submit]').click();
  await page.getByRole('heading', { name: 'Demo request preview — nothing was sent' }).waitFor();
  assert.equal(await page.locator('#demo-name').inputValue(), '');
  await page.screenshot({ path: resolve(root,'qa/screenshots/demo-form-success.png') });
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#demo-dialog').evaluate(el => el.open), false);
  assert.equal(await page.locator('.hero [data-open-demo]').evaluate(el => el === document.activeElement), true);
  await page.locator('[data-agreement] [data-demo-next]').click();
  await page.getByRole('button', { name: 'Add example signature' }).click();
  assert.match(await page.locator('.record-heading').innerText(), /Example complete/);
  await page.getByRole('tab', { name: /1\s*Prepare/ }).focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.getByRole('tab', { name: /2\s*Sign/ }).getAttribute('aria-selected'), 'true');
  if (!homeOnly) {
    // Actual navigation and native history, including direct route reloads above.
    await page.locator('.site-header a[href="/pricing"]').click();
    await page.waitForURL(base + '/pricing');
    await page.goBack();
    assert.equal(new URL(page.url()).pathname, '/');
    await page.goForward();
    assert.equal(new URL(page.url()).pathname, '/pricing');
    await page.getByRole('link', { name: 'Discuss pricing' }).click();
    await page.locator('[data-enquiry=pricing] button[type=submit]').click();
    assert.equal(await page.locator('#pricing-team').getAttribute('aria-invalid'), 'true');
    await page.locator('#pricing-name').fill('Fictional Visitor');
    await page.locator('#pricing-email').fill('visitor@example.test');
    await page.locator('#pricing-team').selectOption({ label: '6–20 people' });
    await page.locator('#pricing-volume').selectOption({ label: 'Up to 50' });
    await page.locator('#pricing-needs').fill('Fictional engagement letter scenario');
    await page.locator('[data-enquiry=pricing] button[type=submit]').click();
    await page.getByRole('heading', { name: 'Pricing enquiry preview — nothing was sent' }).waitFor();
    assert.equal(await page.locator('#pricing-email').inputValue(), '');
    await page.screenshot({ path: resolve(root,'qa/screenshots/pricing-form-success.png'), fullPage: true });
    await page.goto(base + '/features/document-workflows');
    await page.getByRole('tab', { name: /05\s*Keep/ }).click();
    await page.getByRole('heading', { name: 'Plan for the question that comes later.' }).waitFor();
    await page.getByRole('tab', { name: /01\s*Prepare/ }).focus();
    await page.keyboard.press('End');
    assert.equal(await page.getByRole('tab', { name: /05\s*Keep/ }).getAttribute('aria-selected'), 'true');
    await page.goto(base + '/compare/docusign');
    await page.locator('#evaluation-0').check();
    await page.locator('#evaluation-1').check();
    assert.match(await page.locator('[data-checklist-status]').innerText(), /2 of 5/);
    await page.getByRole('button', { name: 'Reset checklist' }).click();
    assert.match(await page.locator('[data-checklist-status]').innerText(), /0 of 5/);
    await page.goto(base + '/security');
    await page.getByText('Hosting & data: Where will the agreement and its data go?', { exact: true }).click();
    assert.equal(await page.locator('.trust-questions details').nth(3).getAttribute('open'), '');
    await page.goto(base);
    // Skip link is the first keyboard stop, and reaches the main content.
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('.skip-link').evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#main').evaluate(el => el === document.activeElement), true);
    await page.locator('.nav-group').first().locator('summary').focus();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('.nav-group').first().locator('a').first().evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.nav-group').first().getAttribute('open'), null);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
  await page.screenshot({ path: resolve(root,'qa/screenshots/mobile-menu.png') });
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await page.locator('#main-nav [data-open-demo]').click();
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.activeElement === document.querySelector('.menu-toggle'));
  assert.equal(await page.locator('.menu-toggle').evaluate(el => el === document.activeElement), true);
  if (!homeOnly) {
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
    await page.locator('#main-nav a[href="/solutions/law-firms"]').click();
    await page.waitForURL(base + '/solutions/law-firms');
    await page.reload();
    assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
  // A deliberately tested 404 appears as a resource error in Chromium.
  const unexpectedErrors = errors.filter(error => !error.includes('404 (Not Found)'));
  assert.deepEqual(unexpectedErrors, []);
  assert.deepEqual(requests.filter(r => !r.url.startsWith(base)), []);
  assert.deepEqual(requests.filter(r => r.method !== 'GET'), []);
  assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
  await writeFile(resolve(root, `qa/${homeOnly ? 'homepage' : 'routes'}-results.json`), JSON.stringify({ timestamp: new Date().toISOString(), browser: context.browser()?.version(), results, externalNavigation, heritageAnchors, browserErrors: unexpectedErrors, externalRequests: 0, submissions: 0, checks: ['direct loading and refresh','all internal links and anchors','reviewed external labels and destinations without fetching','heritage hero and cross-route footer links','heritage anchor visibility at all four widths','ecosystem FAQ keyboard disclosure','404 and recovery','viewport overflow','WCAG A/AA axe scan','demo validation and local success','pricing enquiry validation and success','form data cleared','Escape and focus return','dialog keyboard wrapping','skip link','dropdown keyboard access','agreement stages and arrow keys','workflow tabs','evaluation checklist and reset','trust accordions','navigation and browser history','mobile menu and navigation','reduced motion','no browser storage'] }, null, 2));
  console.log(`PASS: ${results.length} route/viewport checks; keyboard, form, mobile menu, and local-only requests verified.`);
} finally { await context.close(); }
