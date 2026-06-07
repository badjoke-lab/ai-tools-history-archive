import type { MetadataRoute } from 'next';

const siteUrl = 'https://ai-tools-history-archive.pages.dev';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
