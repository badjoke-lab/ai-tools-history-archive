import { getAllEvents } from '@/lib/events';
import { getAllRecords, getRecordStats } from '@/lib/records';

const quickLinks = [
  ['Records', '/records/'],
  ['Events', '/events/'],
  ['API / model changes', '/api-model-deprecations/'],
  ['Shutdowns', '/shutdowns/'],
  ['Categories', '/categories/'],
  ['Stats', '/stats/']
];

const principles = [
  ['Evidence first', 'Records are based on public sources, dated events, confidence labels, and current-state notes.'],
  ['Lifecycle focused', 'The archive tracks shutdowns, deprecations, rebrands, removals, acquisitions, and model/API retirements.'],
  ['Registry, not ranking', 'This is not a popularity chart, recommendation list, or automated verdict engine.']
];

function label(value: string) {
  return value.replaceAll('_', ' ');
}

export default function Home() {
  const records = getAllRecords();
  const stats = getRecordStats();
  const events = getAllEvents();
  const latestEvents = events.slice(0, 5);
  const categoryCount = new Set(records.flatMap((record) => record.category)).size;
  const eventTypeCount = new Set(events.map((event) => event.type)).size;
  const latestReviewDate = records.map((record) => record.last_reviewed_at).sort((a, b) => b.localeCompare(a))[0];

  return (
    <main>
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div>
            <p className="kicker">Source-linked AI lifecycle registry</p>
            <h1>Track AI product changes with dated events and public evidence.</h1>
            <p className="lede home-lede">
              A compact archive for AI tool shutdowns, acquisitions, rebrands, API deprecations, model retirements, feature removals, and major product transitions.
            </p>
            <div className="actions primary-actions">
              <a className="button" href="/records/">Browse records</a>
              <a className="button secondary" href="/events/">View timeline</a>
            </div>
          </div>

          <aside className="home-status-panel" aria-label="Archive status">
            <p className="panel-label">Current seed dataset</p>
            <div className="metric-grid">
              <div><strong>{stats.totalRecords}</strong><span>records</span></div>
              <div><strong>{stats.totalEvents}</strong><span>events</span></div>
              <div><strong>{stats.totalEvidence}</strong><span>evidence links</span></div>
              <div><strong>{categoryCount}</strong><span>categories</span></div>
            </div>
            <p className="status-note">{eventTypeCount} event types tracked. Last reviewed: {latestReviewDate ?? 'unknown'}.</p>
          </aside>
        </div>
      </section>

      <section className="section tight-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <p className="kicker">Start here</p>
              <h2>Registry entry points</h2>
            </div>
            <a className="text-link" href="/methodology/">Methodology</a>
          </div>
          <div className="quick-link-grid">
            {quickLinks.map(([text, href]) => (
              <a className="quick-link-card" href={href} key={href}>{text}</a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <p className="kicker">Latest lifecycle events</p>
              <h2>Recently dated changes</h2>
            </div>
            <a className="text-link" href="/events/">All events</a>
          </div>
          <div className="home-event-list">
            {latestEvents.map((event) => (
              <article className="home-event-row" key={event.id}>
                <div className="home-event-date">{event.date}</div>
                <div className="home-event-main">
                  <h3>{event.title}</h3>
                  <p>{event.record.name}</p>
                </div>
                <div className="badge-row event-badges">
                  <span className="mini-label">{label(event.type)}</span>
                  <span className="mini-label">{label(event.record.entity_type)}</span>
                  <span className="mini-label">{label(event.record.status)}</span>
                </div>
                <a className="row-link" href={`/records/${event.record.slug}/`}>Open</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section quiet-section">
        <div className="container">
          <div className="grid principle-grid">
            {principles.map(([title, body]) => (
              <article className="card compact-card" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
