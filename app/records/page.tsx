import type { Metadata } from 'next';
import { RecordFilters } from '@/components/RecordFilters';
import { getAllRecords, getRecordStats } from '@/lib/records';

export const metadata: Metadata = {
  title: 'AI tools, services, APIs, and model lifecycle records',
  description:
    'Search source-linked records for AI tool shutdowns, rebrands, acquisitions, API deprecations, model retirements, feature removals, and other product lifecycle changes.',
  alternates: { canonical: '/records/' },
  openGraph: {
    title: 'AI lifecycle records',
    description:
      'Browse source-linked histories for AI tools, services, APIs, models, products, and features.',
    url: '/records/',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'AI lifecycle records',
    description: 'Search source-linked histories for AI tools, services, APIs, models, products, and features.'
  }
};

export default function RecordsPage() {
  const records = getAllRecords();
  const stats = getRecordStats();

  return (
    <main className="section records-page">
      <div className="container">
        <p className="kicker">Source-linked registry</p>
        <h1>AI lifecycle records</h1>
        <p className="lede small">
          Search and filter AI tools, services, products, APIs, models, companies, hardware, and features by status, entity type, operator, and lifecycle history.
        </p>

        <div className="compact-stats" aria-label="Record summary">
          <span>{stats.totalRecords} records</span>
          <span>{stats.totalEvents} events</span>
          <span>{stats.totalEvidence} evidence links</span>
        </div>

        <RecordFilters records={records} />
      </div>
    </main>
  );
}
