// Build-time only: one isolated, offline Chrome page; no source-supplied config.
import {readFileSync, existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import puppeteer from 'puppeteer-core';

let browser;
try {
  const jobs = JSON.parse(readFileSync(0, 'utf8'));
  const executablePath = process.env.MARKDOWN_HTML_PACK_CHROME || [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  ].find(existsSync);
  if (!executablePath) throw new Error('Install Chrome/Chromium or set MARKDOWN_HTML_PACK_CHROME to its executable.');
  browser = await puppeteer.launch({executablePath, headless: true,
    args: ['--disable-background-networking', '--disable-component-update', '--no-first-run']});
  const page = await browser.newPage();
  await page.setViewport({width: 1600, height: 1200});
  await page.setOfflineMode(true);
  await page.setRequestInterception(true);
  const requests = [];
  page.on('request', request => { requests.push(request.url()); request.abort(); });
  await page.setContent(`<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'none'; connect-src 'none'; font-src 'none'">`);
  await page.addScriptTag({content: readFileSync(fileURLToPath(new URL('../node_modules/mermaid/dist/mermaid.min.js', import.meta.url)), 'utf8')});
  await page.evaluate(() => mermaid.initialize({
    startOnLoad: false, securityLevel: 'strict', htmlLabels: false,
    theme: 'default', fontFamily: 'Arial, sans-serif',
    themeCSS: '.edgeLabel rect,.edgeLabel .labelBkg{fill:#fff!important;fill-opacity:1!important;opacity:1!important}',
    suppressErrorRendering: true, maxTextSize: 50000, maxEdges: 500,
    flowchart: {htmlLabels: false, useMaxWidth: false, wrappingWidth: 240},
    sequence: {useMaxWidth: false, wrap: true},
  }));
  const result = [];
  for (const [index, job] of jobs.entries()) {
    try {
      const svg = await page.evaluate(async ({source, index}) => {
        // The source download retains its exact bytes. Interpret quoted flowchart
        // backslash-n labels as line breaks for the static rendering only.
        if (/^\s*(flowchart|graph)\b/.test(source)) {
          source = source.replace(/"(?:[^"\\]|\\.)*"/g, label => label.replace(/\\n/g, '\n'));
        }
        return (await mermaid.render('packDiagram' + index, source)).svg;
      }, {source: job.source, index});
      if (requests.length) throw new Error('Diagram attempted a blocked resource request.');
      result.push(svg);
    } catch (error) {
      throw new Error(`${job.location}: ${error.message}`);
    }
  }
  process.stdout.write(JSON.stringify(result));
} catch (error) {
  process.stderr.write(String(error.message) + '\n');
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
}
