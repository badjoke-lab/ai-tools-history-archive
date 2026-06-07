export const siteConfig = {
  name: 'AI Tools History Archive',
  url: 'https://ai-tools-history-archive.pages.dev',
  description:
    'A source-linked archive for AI tool shutdowns, acquisitions, rebrands, API deprecations, model retirements, feature removals, and major product changes.'
};

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}
