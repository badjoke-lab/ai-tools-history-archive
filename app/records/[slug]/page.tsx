import { ConfidenceBadge } from '@/components/ConfidenceBadge';
import { EventTimeline } from '@/components/EventTimeline';
import { EvidenceList } from '@/components/EvidenceList';
import { getStatusTone, StatusBadge } from '@/components/StatusBadge';
import { getAllRecords, getRecordBySlug } from '@/lib/records';

export function generateStaticParams() {
  return getAllRecords().map((record) => ({ slug: record.slug }));
}

function displayValue(value: string) {
  return value.replaceAll('_', ' ');
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

  const primaryEvidence = record.evidence[0];
  const relatedRecords = record.related_records
    .map((slug) => getRecordBySlug(slug))
    .filter(Boolean);

  return (
    <main className="section record-detail-page">
      <div className="container detail-layout">
        <a className="back-link" href="/records/">← Records</a>

        <header className="detail-header evidence-detail-header">
          <div>
            <p className="kicker">{displayValue(record.entity_type)}</p>
            <h1>{record.name}</h1>
            <p className="lede small detail-lede">{record.summary}</p>
          </div>
          <div className="detail-status-stack">
            <StatusBadge label={record.status} tone={getStatusTone(record.status)} />
            <ConfidenceBadge confidence={record.confidence} />
            <span className="mini-label">Evidence {record.evidence.length}</span>
            <span className="mini-label">Reviewed {record.last_reviewed_at}</span>
          </div>
        </header>

        <section className="card detail-card current-state-card">
          <p className="kicker">Current state</p>
          <h2>{record.name}</h2>
          <p>{record.current_state}</p>
          {record.last_known_url ? (
            <p className="source-line">
              Last known URL: <a href={record.last_known_url}>{record.last_known_url}</a>
            </p>
          ) : null}
        </section>

        <section className="detail-two-column">
          <div className="card detail-card">
            <p className="kicker">Key facts</p>
            <dl className="fact-list compact-facts">
              <div><dt>Operator</dt><dd>{record.operator}</dd></div>
              <div><dt>Status</dt><dd>{displayValue(record.status)}</dd></div>
              <div><dt>Entity type</dt><dd>{displayValue(record.entity_type)}</dd></div>
              <div><dt>Country</dt><dd>{record.country ?? 'Unknown'}</dd></div>
              <div><dt>Launched</dt><dd>{record.launched_at ?? 'Unknown'}</dd></div>
              <div><dt>Ended / changed</dt><dd>{record.ended_at ?? 'Not confirmed'}</dd></div>
              <div><dt>URL status</dt><dd>{displayValue(record.current_url_status)}</dd></div>
              <div><dt>Last reviewed</dt><dd>{record.last_reviewed_at}</dd></div>
            </dl>
          </div>

          <div className="card detail-card evidence-summary-card">
            <p className="kicker">Primary evidence</p>
            {primaryEvidence ? (
              <>
                <h2>{primaryEvidence.title}</h2>
                <p>{primaryEvidence.publisher ?? 'Public source'} · {displayValue(primaryEvidence.source_type)} · {primaryEvidence.reliability} reliability</p>
                <a className="button secondary evidence-button" href={primaryEvidence.url}>Open source</a>
              </>
            ) : (
              <p>No evidence item is attached to this record.</p>
            )}
          </div>
        </section>

        <section className="card detail-card">
          <div className="section-heading-row compact-heading-row">
            <div>
              <p className="kicker">Timeline</p>
              <h2>Dated lifecycle events</h2>
            </div>
            <span className="mini-label">{record.events.length} events</span>
          </div>
          <EventTimeline events={record.events} />
        </section>

        <section className="card detail-card evidence-detail-card">
          <div className="section-heading-row compact-heading-row">
            <div>
              <p className="kicker">Evidence</p>
              <h2>Source links supporting this record</h2>
            </div>
            <span className="mini-label">{record.evidence.length} links</span>
          </div>
          <EvidenceList evidence={record.evidence} />
        </section>

        {record.known_unknowns && record.known_unknowns.length > 0 ? (
          <section className="card detail-card warning-card">
            <p className="kicker">Known unknowns</p>
            <ul className="simple-list">
              {record.known_unknowns.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {relatedRecords.length > 0 ? (
          <section className="card detail-card">
            <p className="kicker">Related records</p>
            <div className="related-record-list">
              {relatedRecords.map((related) => related ? (
                <a href={`/records/${related.slug}/`} key={related.slug}>{related.name}</a>
              ) : null)}
            </div>
          </section>
        ) : null}

        <section className="card detail-card correction-card">
          <p className="kicker">Correction path</p>
          <h2>Found a better source or status change?</h2>
          <p>Use the submit page to report missing evidence, a changed status, a broken source link, or a correction for this record.</p>
          <a className="button secondary evidence-button" href="/submit/">Report correction</a>
        </section>
      </div>
    </main>
  );
}
