import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import puppeteer from 'puppeteer-core';
import {existsSync} from 'node:fs';

const executablePath = process.env.MARKDOWN_HTML_PACK_CHROME || [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome'
].find(existsSync);
const browser = await puppeteer.launch({executablePath, headless: true});
try {
  const page = await browser.newPage();
  await page.setOfflineMode(true);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const url = pathToFileURL(process.argv[2]).href;
  await page.goto(url);
  const sources = await page.$eval('#source-data', el => JSON.parse(el.textContent));
  const nested = Object.entries(sources).find(([, source]) => source.name === 'company/nested/brief.md')[0];
  const root = 'details[data-folder="."]';
  const company = 'details[data-folder="company"]';
  const deep = 'details[data-folder="company/nested"]';
  assert.equal(await page.$eval(root, el => el.open), true);
  assert.equal(await page.$eval(company, el => el.open), false);
  await page.click(company + '>summary');
  assert.equal(await page.$eval(company, el => el.open), true);
  await page.focus(company + '>summary');
  await page.keyboard.press('Space');
  assert.equal(await page.$eval(company, el => el.open), false);
  await page.keyboard.press('Enter');
  assert.equal(await page.$eval(company, el => el.open), true);
  assert.equal(await page.$eval(deep, el => el.open), false);
  await page.click(company + '>summary');
  await page.type('#document-search', 'UniqueNavigatorTerm');
  await page.click('#result-list a');
  for (const folder of [root, company, deep]) assert.equal(await page.$eval(folder, el => el.open), true);
  assert.equal(await page.$eval(`.document-link[data-document="${nested}"]`, el => el.getAttribute('aria-current')), 'page');
  await page.click(root + '>summary');
  await page.goto('about:blank');
  await page.goto(url + '#' + nested);
  for (const folder of [root, company, deep]) assert.equal(await page.$eval(folder, el => el.open), true);
  assert.equal(await page.$eval('#' + nested, el => el.hidden), false);
  assert.equal(await page.$eval('details[data-folder="product"]', el => el.open), false);
  assert.equal(await page.$eval(company + '>summary', el => parseFloat(getComputedStyle(el).fontSize)), 16);
  for (const width of [390, 320]) {
    await page.setViewport({width, height: 844});
    if (await page.$eval('.menu-toggle', el => el.getAttribute('aria-expanded')) === 'false') await page.click('.menu-toggle');
    await page.click(company + '>summary');
    assert.equal(await page.$eval(company, el => el.open), false);
    await page.focus(company + '>summary');
    await page.keyboard.press('Space');
    assert.equal(await page.$eval(company, el => el.open), true);
    assert(await page.$eval(company + '>summary', el => el.getBoundingClientRect().height) >= 44);
    assert.equal(await page.$eval('.wordmark', el => {
      const range = document.createRange();
      range.selectNodeContents(el);
      return range.getClientRects().length;
    }), 1);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
  }
  assert.deepEqual(errors, []);
  await page.setViewport({width: 1280, height: 900});
  await page.setJavaScriptEnabled(false);
  await page.goto('about:blank');
  await page.goto(url);
  await page.click(company + '>summary');
  assert.equal(await page.$eval(company, el => el.open), true);
  console.log('PASS: Folder hierarchy, native mouse/keyboard toggles, search/direct navigation and no-JavaScript disclosure.');
} finally {
  await browser.close();
}
