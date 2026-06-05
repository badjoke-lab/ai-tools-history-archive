import { Badge } from '@/components/Badge';
import { formatLabel, getAllRecords } from '@/lib/records';

export const metadata = {
  title: 'Records | AI Tools History Archive',
  description: 'Browse source-linked AI tool, product, model, API, and feature lifecycle records.'
};

export default function RecordsPage() {
  const records = getAllRecords();

  return (
    <main>
      <header className="header">
        <div className="container header-inner">
          <a className="brand" href="/">
            AI Tools History Archive
          </a>
          <nav className="nav" aria-label="Primary navigation">
            <a href="/records/">Records</a>
            <a href="/docs/product-spec">Spec</a>
            <a href="/docs/source-and-evidence-policy">Evidence</a>
          </nav>
        </div>
      </header>

      <section className="hero compact-hero">
        <div className="container">
          <p className="kicker">Public archive records</p>
          <h1>Records</h1>
          <p className="lede">
            Browse the current reviewed seed records. Each record includes a current-state summary, lifecycle events, and public evidence links.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container record-list">
          {records.map((record) => (
            <article className="record-row" key={record.id}>
              <div>
                <a className="record-title" href={`/records/${record.slug}/`}>
                  {record.name}
                </a>
                <p>{record.summary}</p>
              </div>
              <div className="record-meta">
                <Badge tone="strong">{formatLabel(record.status)}</Badge>
                <Badge>{formatLabel(record.entity_type)}</Badge>
                <Badge>{record.operator}</Badge>
                <Badge>{formatLabel(record.confidence)}</Badge>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
