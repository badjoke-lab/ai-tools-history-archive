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
          <h1>Record not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container detail-layout">
        <a className="back-link" href="/records/">← Records</a>
        <header className="detail-header">
          <p className="kicker">{record.entity_type}</p>
          <h1>{record.name}</h1>
          <div className="badge-row">
            <span className="badge">{record.status}</span>
            <span className="badge">{record.confidence}</span>
            {record.category.map((category) => (
              <span className="badge" key={category}>{category}</span>
            ))}
          </div>
        </header>

        <section className="card detail-card">
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
            <div><dt>Last reviewed</dt><dd>{record.last_reviewed_at}</dd></div>
          </dl>
        </section>

        <section className="card detail-card">
          <h2>Timeline</h2>
          <ol className="timeline">
            {record.events.map((event) => (
              <li key={event.id}>
                <strong>{event.date}</strong> — {event.title}
                <p>{event.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="card detail-card">
          <h2>Evidence</h2>
          <ul className="evidence-list">
            {record.evidence.map((evidence) => (
              <li key={evidence.id}>
                <a href={evidence.url}>{evidence.title}</a>
                <p>{evidence.publisher ?? 'Unknown publisher'} · {evidence.source_type} · {evidence.reliability}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
