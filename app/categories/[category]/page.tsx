import type { Metadata } from 'next';
import { RecordCard } from '@/components/RecordCard';
import { categories } from '@/data/enums';
import { formatCategoryLabel, getCategoryBySlug, getRecordsByCategory } from '@/lib/categories';

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = getCategoryBySlug(params.category);

  if (!category) {
    return {
      title: 'Category not found',
      robots: { index: false, follow: false }
    };
  }

  const label = formatCategoryLabel(category);
  const title = `${label} AI lifecycle records`;
  const description = `Browse source-linked ${label.toLowerCase()} AI lifecycle records, including shutdowns, rebrands, acquisitions, deprecations, retirements, and feature changes.`;
  const canonicalPath = `/categories/${category}/`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      type: 'website'
    },
    twitter: {
      card: 'summary',
      title,
      description
    }
  };
}

export default function CategoryDetailPage({ params }: { params: { category: string } }) {
  const category = getCategoryBySlug(params.category);

  if (!category) {
    return (
      <main className="section">
        <div className="container">
          <a className="back-link" href="/categories/">← Categories</a>
          <h1>Category not found</h1>
          <p className="lede small">The requested category is not part of the current public category list.</p>
        </div>
      </main>
    );
  }

  const records = getRecordsByCategory(category);
  const label = formatCategoryLabel(category);

  return (
    <main className="section category-detail-page">
      <div className="container">
        <a className="back-link" href="/categories/">← Categories</a>
        <p className="kicker">AI lifecycle category</p>
        <h1>{label}</h1>
        <p className="lede small">
          Browse source-linked {label.toLowerCase()} records with lifecycle events, current status, evidence links, and review dates.
        </p>

        <div className="compact-stats" aria-label="Category summary">
          <span>{records.length} records</span>
          <span>{records.reduce((sum, record) => sum + record.events.length, 0)} events</span>
          <span>{records.reduce((sum, record) => sum + record.evidence.length, 0)} evidence links</span>
        </div>

        {records.length > 0 ? (
          <div className="record-list">
            {records.map((record) => (
              <RecordCard record={record} key={record.id} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No records in this category yet.</h2>
            <p>This category is part of the archive taxonomy, but no public records have been assigned to it yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
