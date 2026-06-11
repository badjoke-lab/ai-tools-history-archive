import type { Metadata } from 'next';
import { StatTable } from '@/components/StatTable';
import { getArchiveStats, toStatRows } from '@/lib/stats';

export const metadata: Metadata = {
  title: 'AI lifecycle archive statistics',
  description:
    'View counts for AI lifecycle records, events, evidence links, statuses, entity types, categories, event types, and confidence levels.',
  alternates: { canonical: '/stats/' },
  openGraph: {
    title: 'AI lifecycle archive statistics',
    description: 'Summary counts for source-linked AI product, API, model, and feature lifecycle records.',
    url: '/stats/',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'AI lifecycle archive statistics',
    description: 'Summary counts for source-linked AI product, API, model, and feature lifecycle records.'
  }
};

export default function StatsPage() {
  const stats = getArchiveStats();

  return (
    <main className="section stats-page">
      <div className="container">
        <p className="kicker">Archive summary</p>
        <h1>AI lifecycle archive statistics</h1>
        <p className="lede small">
          Counts are generated directly from the public registry and summarize records, events, evidence coverage, entity types, categories, statuses, and confidence levels.
        </p>

        <div className="compact-stats" aria-label="Archive totals">
          <span>{stats.totals.records} records</span>
          <span>{stats.totals.events} events</span>
          <span>{stats.totals.evidence} evidence links</span>
        </div>

        <div className="stats-grid">
          <StatTable title="By status" rows={toStatRows(stats.byStatus)} />
          <StatTable title="By entity type" rows={toStatRows(stats.byEntityType)} />
          <StatTable title="By category" rows={toStatRows(stats.byCategory)} />
          <StatTable title="By event type" rows={toStatRows(stats.byEventType)} />
          <StatTable title="By confidence" rows={toStatRows(stats.byConfidence)} />
        </div>
      </div>
    </main>
  );
}
