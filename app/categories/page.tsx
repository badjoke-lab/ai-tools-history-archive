import type { Metadata } from 'next';
import { getAllCategorySummaries } from '@/lib/categories';

export const metadata: Metadata = {
  title: 'AI tool lifecycle categories',
  description:
    'Browse AI lifecycle records by category, including chat assistants, image generation, coding tools, voice systems, developer infrastructure, and other AI product areas.',
  alternates: { canonical: '/categories/' },
  openGraph: {
    title: 'AI lifecycle categories',
    description: 'Browse source-linked AI product and model histories by category.',
    url: '/categories/',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'AI lifecycle categories',
    description: 'Browse source-linked AI product and model histories by category.'
  }
};

export default function CategoriesPage() {
  const categories = getAllCategorySummaries();

  return (
    <main className="section categories-page">
      <div className="container">
        <p className="kicker">Archive navigation</p>
        <h1>AI lifecycle categories</h1>
        <p className="lede small">
          Browse the archive by product area. Category counts are generated from the current public records, events, and evidence links.
        </p>

        <div className="category-grid">
          {categories.map((item) => (
            <a className="category-card" href={`/categories/${item.category}/`} key={item.category}>
              <h2>{item.label}</h2>
              <p>{item.recordCount} records · {item.eventCount} events · {item.evidenceCount} evidence links</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
