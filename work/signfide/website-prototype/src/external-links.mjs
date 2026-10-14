// Reviewed public navigation destinations. These are not runtime dependencies or offer entitlements.
export const externalLinks = {
  circularo: { url: 'https://www.circularo.com/', label: 'Visit Circularo’s website' },
  legalStory: { url: 'https://www.circularo.com/customers/abdulla-alawadi/', label: 'Circularo’s law-firm customer story' },
  courtsStory: { url: 'https://www.circularo.com/customers/dubai-courts/', label: 'Circularo’s Dubai Courts customer story' }
};
export function externalLink(key) {
  const { url, label } = externalLinks[key];
  return `<a class="external-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${label} (external website, opens in a new tab)">${label}<span class="external-indicator">External <span aria-hidden="true">↗</span></span><span class="sr-only"> (opens in a new tab)</span></a>`;
}
