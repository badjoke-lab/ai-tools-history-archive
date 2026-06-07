import { StatTable } from '@/components/StatTable';
import { getArchiveStats, toStatRows } from '@/lib/stats';

export default function StatsPage() {
  const stats = getArchiveStats();

  return (
    <main className="section stats-page">
      <div className="container">
        <p className="kicker">Archive summary</p>
        <h1>Stats</h1>
        <p className="lede small">Basic counts generated from the current public seed dataset.</p>

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
