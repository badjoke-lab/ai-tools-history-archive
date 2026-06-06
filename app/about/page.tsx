export default function AboutPage() {
  return (
    <main className="section static-page">
      <div className="container narrow-container">
        <p className="kicker">Project overview</p>
        <h1>About</h1>
        <p className="lede small">
          AI Tools History Archive is a public, source-linked archive for tracking lifecycle changes across AI tools, services, products, APIs, models, and features.
        </p>

        <section className="card static-card">
          <h2>Purpose</h2>
          <p>
            The archive helps readers understand what happened to AI products over time: shutdowns, acquisitions, rebrands, deprecations, retirements, feature removals, pricing changes, and other major transitions.
          </p>
        </section>

        <section className="card static-card">
          <h2>What this site is not</h2>
          <p>
            This is not an AI tool ranking site, recommendation directory, review platform, or incident database. It focuses on lifecycle history and public evidence.
          </p>
        </section>

        <section className="card static-card">
          <h2>Current stage</h2>
          <p>
            The archive is in an early seed stage. The current dataset is small and intended to validate the data model, page structure, and evidence workflow before broader expansion.
          </p>
        </section>
      </div>
    </main>
  );
}
