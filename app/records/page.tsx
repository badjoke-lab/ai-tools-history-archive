import { RecordsExplorer } from '@/components/RecordsExplorer';
import { getAllRecords, getRecordStats } from '@/lib/records';

export default function RecordsPage() {
  const records = getAllRecords();
  const stats = getRecordStats();

  return (
    <main className="section records-page">
      <div className="container">
        <p className="kicker">Public seed dataset</p>
        <h1>Records</h1>
        <p className="lede small">
          Initial source-linked records for AI tools, services, products, APIs, models, features, and lifecycle events.
        </p>

        <div className="compact-stats" aria-label="Record summary">
          <span>{stats.totalRecords} records</span>
          <span>{stats.totalEvents} events</span>
          <span>{stats.totalEvidence} evidence links</span>
        </div>

        <RecordsExplorer records={records} />
      </div>
    </main>
  );
}
