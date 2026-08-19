import type { Metadata } from 'next';
import { StatTable } from '@/components/StatTable';
import { getArchiveStats, toStatRows } from '@/lib/stats';

export const metadata: Metadata = {
  title: 'AI lifecycle archive statistics',
  description:
    'View deterministic lifecycle, provider, replacement-guidance, provenance, and coverage statistics generated from reviewed AI lifecycle records.',
  alternates: { canonical: '/stats/' },
  openGraph: {
    title: 'AI lifecycle archive statistics',
    description: 'Lifecycle, provider, provenance, and registry-quality statistics generated from reviewed records.',
    url: '/stats/',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'AI lifecycle archive statistics',
    description: 'Lifecycle, provider, provenance, and registry-quality statistics generated from reviewed records.'
  }
};

function coveragePercent(count: number, total: number) {
  return total === 0 ? '0%' : `${Math.round((count / total) * 100)}%`;
}

export default function StatsPage() {
  const stats = getArchiveStats();
  const total = stats.totals.records;

  return (
    <main className="section stats-page">
      <div className="container">
        <p className="kicker">Archive summary</p>
        <h1>AI lifecycle archive statistics</h1>
        <p className="lede small">
          Deterministic counts generated from reviewed canonical records. These statistics describe registry coverage and recorded lifecycle history; they are not product rankings or safety scores.
        </p>

        <div className="compact-stats" aria-label="Archive totals">
          <span>{stats.totals.records} records</span>
          <span>{stats.totals.events} events</span>
          <span>{stats.totals.evidence} evidence links</span>
        </div>

        <section className="static-card">
          <p className="kicker">Lifecycle and provenance coverage</p>
          <h2>Recorded signals</h2>
          <div className="compact-stats" aria-label="Lifecycle coverage">
            <span>Replacement guidance {stats.coverage.replacementGuidanceRecorded}/{total} · {coveragePercent(stats.coverage.replacementGuidanceRecorded, total)}</span>
            <span>Export deadline {stats.coverage.dataExportDeadlineRecorded}/{total} · {coveragePercent(stats.coverage.dataExportDeadlineRecorded, total)}</span>
            <span>High-reliability evidence {stats.coverage.highReliabilityEvidence}/{total} · {coveragePercent(stats.coverage.highReliabilityEvidence, total)}</span>
            <span>Archived evidence {stats.coverage.archivedEvidenceAvailable}/{total} · {coveragePercent(stats.coverage.archivedEvidenceAvailable, total)}</span>
            <span>Launch year {stats.coverage.launchYearRecorded}/{total} · {coveragePercent(stats.coverage.launchYearRecorded, total)}</span>
            <span>End/change year {stats.coverage.endYearRecorded}/{total} · {coveragePercent(stats.coverage.endYearRecorded, total)}</span>
            <span>Comparable lifespan {stats.coverage.lifespanComparable}/{total} · {coveragePercent(stats.coverage.lifespanComparable, total)}</span>
            <span>Last review {stats.coverage.lastReviewedRecorded}/{total} · {coveragePercent(stats.coverage.lastReviewedRecorded, total)}</span>
          </div>
          <p className="muted">
            “Recorded” means the canonical registry contains that signal. Absence is not proof that no replacement, export path, archive, or lifecycle boundary existed.
          </p>
        </section>

        <div className="stats-grid">
          <StatTable title="By status" rows={toStatRows(stats.byStatus)} />
          <StatTable title="By provider / operator" rows={toStatRows(stats.byOperator)} />
          <StatTable title="By entity type" rows={toStatRows(stats.byEntityType)} />
          <StatTable title="By category" rows={toStatRows(stats.byCategory)} />
          <StatTable title="By lifecycle event type" rows={toStatRows(stats.byEventType)} />
          <StatTable title="By record confidence" rows={toStatRows(stats.byConfidence)} />
          <StatTable title="Launch year" rows={toStatRows(stats.byLaunchYear)} />
          <StatTable title="End / change year" rows={toStatRows(stats.byEndYear)} />
          <StatTable title="Recorded lifespan span" rows={toStatRows(stats.lifespanBuckets)} />
          <StatTable title="Evidence source type" rows={toStatRows(stats.byEvidenceSourceType)} />
          <StatTable title="Evidence reliability" rows={toStatRows(stats.byEvidenceReliability)} />
          <StatTable title="Last reviewed year" rows={toStatRows(stats.byReviewYear)} />
        </div>

        <section className="static-card">
          <p className="kicker">Interpretation boundary</p>
          <h2>What these numbers do not claim</h2>
          <p className="muted">
            Lifespan uses only records with both a recorded launch year and end/change year and reports calendar-year span. Replacement guidance is a provenance signal only; it does not identify or endorse a replacement target. Data-export deadlines do not mean export or migration completed.
          </p>
        </section>
      </div>
    </main>
  );
}
