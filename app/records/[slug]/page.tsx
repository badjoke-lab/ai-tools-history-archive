import { notFound } from 'next/navigation';
import { Badge } from '@/components/Badge';
import { formatLabel, getRecordBySlug, getRecordSlugs } from '@/lib/records';

export function generateStaticParams() {
  return getRecordSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const record = getRecordBySlug(params.slug);

  if (!record) {
    return {
      title: 'Record not found | AI Tools History Archive'
    };
  }

  return {
    title: `${record.name} | AI Tools History Archive`,
    description: record.summary
  };
}

export default function RecordDetailPage({ params }: { params: { slug: string } }) {
  const record = getRecordBySlug(params.slug);

  if (!record) {
    notFound();
  }

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
          <p className="kicker">Record detail</p>
          <h1>{record.name}</h1>
          <p className="lede">{record.summary}</p>
          <div className="badge-row">
            <Badge tone="strong">{formatLabel(record.status)}</Badge>
            <Badge>{formatLabel(record.entity_type)}</Badge>
            <Badge>{record.operator}</Badge>
            <Badge>{formatLabel(record.confidence)} confidence</Badge>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detail-grid">
          <section className="panel">
            <h2>Current State</h2>
            <p>{record.current_state}</p>
          </section>
          <section className="panel facts-panel">
            <h2>Facts</h2>
            <dl>
              <div>
                <dt>Operator</dt>
                <dd>{record.operator}</dd>
              </div>
              <div>
                <dt>Launched</dt>
                <dd>{record.launched_at ?? 'Unknown'}</dd>
              </div>
              <div>
                <dt>Ended / changed</dt>
                <dd>{record.ended_at ?? 'Unknown'}</dd>
              </div>
              <div>
                <dt>URL status</dt>
                <dd>{formatLabel(record.current_url_status)}</dd>
              </div>
              <div>
                <dt>Last reviewed</dt>
                <dd>{record.last_reviewed_at}</dd>
              </div>
            </dl>
          </section>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Timeline</h2>
          <div className="timeline">
            {record.events.map((event) => (
              <article className="timeline-item" key={event.id}>
                <div className="timeline-date">{event.date}</div>
                <div>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="badge-row compact-badges">
                    <Badge>{formatLabel(event.type)}</Badge>
                    <Badge>{formatLabel(event.confidence)} confidence</Badge>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Evidence</h2>
          <div className="evidence-list">
            {record.evidence.map((item) => (
              <article className="evidence-card" key={item.id}>
                <h3>{item.title}</h3>
                <p>
                  <a href={item.url} rel="noreferrer" target="_blank">
                    Open source
                  </a>
                </p>
                <div className="badge-row compact-badges">
                  <Badge>{formatLabel(item.source_type)}</Badge>
                  <Badge>{formatLabel(item.reliability)} reliability</Badge>
                  <Badge>Accessed {item.accessed_at}</Badge>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
