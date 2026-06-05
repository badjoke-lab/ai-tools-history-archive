import { getAllRecords } from '@/lib/records';

export default function RecordsPage() {
  const records = getAllRecords();

  return (
    <main className="section">
      <div className="container">
        <p className="kicker">Public seed dataset</p>
        <h1>Records</h1>
        <p className="lede small">
          Initial source-linked records for AI tools, services, products, APIs, models, features, and lifecycle events.
        </p>
        <div className="record-list">
          {records.map((record) => (
            <article className="record-row" key={record.id}>
              <div>
                <a className="record-title" href={`/records/${record.slug}/`}>
                  {record.name}
                </a>
                <p>{record.summary}</p>
              </div>
              <div className="record-meta">
                <span className="badge">{record.status}</span>
                <span className="badge">{record.entity_type}</span>
                <span className="badge">{record.confidence}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
