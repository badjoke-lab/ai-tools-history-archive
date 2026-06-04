const focusAreas = [
  {
    title: 'Lifecycle records',
    body: 'Track public lifecycle changes for AI tools, services, products, APIs, models, features, and hardware.'
  },
  {
    title: 'Event timelines',
    body: 'Represent shutdowns, acquisitions, rebrands, deprecations, retirements, feature removals, and pricing changes as source-linked events.'
  },
  {
    title: 'Evidence-first archive',
    body: 'Use public sources, confidence labels, and clear current-state notes instead of unsourced claims or rankings.'
  }
];

const eventTypes = [
  'shutdowns',
  'acquisitions',
  'rebrands',
  'API deprecations',
  'model retirements',
  'feature removals',
  'pricing changes'
];

export default function Home() {
  return (
    <main>
      <header className="header">
        <div className="container header-inner">
          <a className="brand" href="/">
            AI Tools History Archive
          </a>
          <nav className="nav" aria-label="Primary navigation">
            <a href="/docs/product-spec">Spec</a>
            <a href="/docs/data-model">Data model</a>
            <a href="/docs/source-and-evidence-policy">Evidence</a>
            <a href="/docs/runbooks/current-status">Status</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <p className="kicker">Source-linked AI product history</p>
          <h1>Track how AI tools change, disappear, merge, and retire.</h1>
          <p className="lede">
            A public archive for AI tool shutdowns, acquisitions, rebrands, API deprecations, model retirements, feature removals, pricing changes, and major product transitions.
          </p>
          <div className="actions">
            <a className="button" href="/docs/product-spec">
              Read the public spec
            </a>
            <a className="button secondary" href="/docs/source-and-evidence-policy">
              Evidence policy
            </a>
          </div>
          <div className="badge-row" aria-label="Tracked event types">
            {eventTypes.map((eventType) => (
              <span className="badge" key={eventType}>
                {eventType}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Initial foundation</h2>
          <div className="grid">
            {focusAreas.map((area) => (
              <article className="card" key={area.title}>
                <h3>{area.title}</h3>
                <p>{area.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>What this is not</h2>
          <div className="grid">
            <article className="card">
              <h3>Not a ranking site</h3>
              <p>This archive is not an AI tool recommendation list, popularity chart, or best-tools directory.</p>
            </article>
            <article className="card">
              <h3>Not a graveyard joke site</h3>
              <p>The archive uses a neutral white-background registry style focused on evidence and current state.</p>
            </article>
            <article className="card">
              <h3>Not an automated verdict engine</h3>
              <p>Records should be reviewed and backed by public sources before they become canonical data.</p>
            </article>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          AI Tools History Archive is being built as a static-friendly, public, source-linked registry.
        </div>
      </footer>
    </main>
  );
}
