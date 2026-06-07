import type { MetadataRoute } from 'next';
import { records } from '@/data/records';
import { categories } from '@/data/enums';

const siteUrl = 'https://ai-tools-history-archive.pages.dev';

const staticRoutes = [
  '',
  'records',
  'events',
  'shutdowns',
  'acquisitions',
  'rebrands',
  'api-model-deprecations',
  'categories',
  'stats',
  'methodology',
  'glossary',
  'submit',
  'about'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}/${route ? `${route}/` : ''}`,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.7
  }));

  const recordEntries = records.map((record) => ({
    url: `${siteUrl}/records/${record.slug}/`,
    lastModified: record.last_reviewed_at,
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }));

  const categoryEntries = categories.map((category) => ({
    url: `${siteUrl}/categories/${category}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.5
  }));

  return [...staticEntries, ...recordEntries, ...categoryEntries];
}
