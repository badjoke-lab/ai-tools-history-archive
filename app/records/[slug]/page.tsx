import { ConfidenceBadge } from '@/components/ConfidenceBadge';
import { EventTimeline } from '@/components/EventTimeline';
import { EvidenceList } from '@/components/EvidenceList';
import { getStatusTone, StatusBadge } from '@/components/StatusBadge';
import { getAllRecords, getRecordBySlug } from '@/lib/records';

export function generateStaticParams() {
  return getAllRecords().map((record) => ({ slug: record.slug }));
}

export default function RecordDetailPage({ params }: { params: { slug: string } }) {
  const record = getRecordBySlug(params.slug);

  if (!record) {
    return (
      <main className="section">
        <div className="container">
          <a className="back-link" href="/records/">← Records</a>
          <h1>Record not found</h1>
          <p className="lede small">The requested record is not included in the current public seed dataset.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="section record-detail-page">
      <div className="container detail-layout">
        <a className="back-link" href="/records/">← Records</a>
        <header className="detail-header">
          <p className="kicker">{record.entity_type}</p>
          <h1>{record.name}</h1>
          <div className="badge-row">
            <StatusBadge label={record.status} tone={getStatusTone(record.status)} />
            <ConfidenceBadge confidence={record.confidence} />
            {record.category.map((category) => (
              <span className="mini-label" key={category}>{category}</span>
            ))}
          </div>
        </header>

        <section className="card detail-card current-state-card">
          <h2>Current state</h2>
          <p>{record.current_state}</p>
        </section>

        <section className="card detail-card">
          <h2>Summary</h2>
          <p>{record.summary}</p>
          <dl className="fact-list">
            <div><dt>Operator</dt><dd>{record.operator}</dd></div>
            <div><dt>Launched</dt><dd>{record.launched_at ?? 'Unknown'}</dd></div>
            <div><dt>Ended / changed</dt><dd>{record.ended_at ?? 'Not confirmed'}</dd></div>
            <div><dt>URL status</dt><dd>{record.current_url_status}</dd></div>
            <div><dt>Evidence links</dt><dd>{record.evidence.length}</dd></div>
            <div><dt>Last reviewed</dt><dd>{record.last_reviewed_at}</dd></div>
          </dl>
        </section>

        {record.known_unknowns && record.known_unknowns.length > 0 ? (
          <section className="card detail-card">
            <h2>Known unknowns</h2>
            <ul className="simple-list">
              {record.known_unknowns.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="card detail-card">
          <h2>Timeline</h2>
          <EventTimeline events={record.events} />
        </section>

        <section className="card detail-card">
          <h2>Evidence</h2>
          <EvidenceList evidence={record.evidence} />
        </section>
      </div>
    </main>
  );
}
