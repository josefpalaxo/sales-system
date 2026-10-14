import { externalLinks } from '../src/external-links.mjs';

const reviewed = new Set(Object.values(externalLinks).map(link => link.url));
export function checkHtml(html, route) {
  // Remove only reviewed hrefs on actual anchors. The same URL on any asset still fails.
  const withoutReviewedNavigation = html.replace(/<a\b[^>]*>/gi, tag => tag.replace(/\bhref\s*=\s*(["'])(.*?)\1/gi, (attribute, quote, href) => {
    if (!/^https?:\/\//i.test(href)) return attribute;
    if (!reviewed.has(href)) throw new Error(`Unreviewed external navigation in ${route}: ${href}`);
    return `href=${quote}/reviewed-external-navigation${quote}`;
  }));
  if (/https?:\/\/|(?:src|srcset|href|action|poster|data)\s*=\s*["']?(?:\/\/|javascript:|data:)/i.test(withoutReviewedNavigation)) {
    throw new Error(`External or unsafe runtime reference in ${route}`);
  }
  if (/<(?:iframe|object|embed)\b/i.test(html)) throw new Error(`Embeds are outside the local prototype scope: ${route}`);
}
export function checkRuntimeSource(source, name) {
  if (/https?:\/\/|@import\b|url\(\s*["']?\/\//i.test(source)) throw new Error(`External runtime dependency in ${name}`);
}
