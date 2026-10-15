import assert from 'node:assert/strict';
import { checkHtml, checkRuntimeSource } from './link-policy.mjs';
import { externalLinks, externalLink } from '../src/external-links.mjs';

for (const key of Object.keys(externalLinks)) assert.doesNotThrow(() => checkHtml(externalLink(key), 'reviewed navigation'));
assert.doesNotThrow(() => checkHtml('<a href="/about#powered-by-circularo">About</a><script src="/assets/app.js"></script>', 'local'));
for (const html of [
  '<a href="https://unreviewed.example/">Unreviewed</a>',
  '<a href="https://www.circularo.com/?unexpected=1">Altered destination</a>',
  '<img src="https://www.circularo.com/">',
  '<img srcset="//www.circularo.com/image.png 2x">',
  '<script src="https://www.circularo.com/"></script>',
  '<link rel="stylesheet" href="https://www.circularo.com/">',
  '<link rel="preload" as="font" href="https://www.circularo.com/">',
  '<iframe src="/about"></iframe>',
  '<a href="//www.circularo.com/">Protocol relative</a>',
  '<a href="javascript:alert(1)">Unsafe</a>'
]) assert.throws(() => checkHtml(html, 'negative fixture'));
assert.throws(() => checkRuntimeSource('@import "https://www.circularo.com/";', 'CSS'));
assert.throws(() => checkRuntimeSource('background:url("//www.circularo.com/image.png")', 'CSS'));
assert.throws(() => checkRuntimeSource('fetch("https://www.circularo.com/")', 'JS'));
console.log('PASS: reviewed anchors allowed; external assets, embeds, altered URLs, and unexpected navigation rejected.');
