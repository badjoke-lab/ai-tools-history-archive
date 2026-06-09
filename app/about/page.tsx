export default function AboutPage() {
  return (
    <main className="section static-page">
      <div className="container narrow-container">
        <p className="kicker">Project overview</p>
        <h1>About AI Tools History Archive</h1>
        <p className="lede small">
          A public, source-linked registry for tracking how AI tools, services, products, APIs, models, and features change over time.
        </p>

        <section className="card static-card">
          <h2>What the archive covers</h2>
          <p>
            The archive records material lifecycle events such as shutdowns, acquisitions, mergers, rebrands, API deprecations, API removals, model retirements, feature removals, pricing-model changes, and other major transitions affecting availability, ownership, identity, or access.
          </p>
        </section>

        <section className="card static-card">
          <h2>How a record is structured</h2>
          <p>
            Each entity can include a current-state summary, dated lifecycle events, public evidence links, confidence labels, review dates, known unknowns, related records, and a public correction path.
          </p>
        </section>

        <section className="card static-card">
          <h2>Why this archive exists</h2>
          <p>
            AI products change quickly, while original product pages, support notices, model names, and API documentation may later disappear or be rewritten. The archive keeps those transitions organized by entity, date, event, and evidence.
          </p>
        </section>

        <section className="card static-card">
          <h2>What this site is not</h2>
          <p>
            This is not an AI tool ranking site, recommendation directory, popularity chart, review platform, or automated verdict engine. It does not assign success, failure, safety, or blame without directly supporting public evidence.
          </p>
        </section>

        <section className="card static-card">
          <h2>Evidence and neutrality</h2>
          <p>
            Official announcements, documentation, support pages, changelogs, archived pages, acquisition statements, and regulator or court records are preferred. Secondary reporting is used when primary material is unavailable. Uncertainty remains visible when the public record is incomplete.
          </p>
        </section>

        <section className="card static-card">
          <h2>Current stage</h2>
          <p>
            Coverage is still incomplete. Records may be expanded, corrected, split, merged, or reclassified as stronger public evidence becomes available. The methodology and correction process are public so changes can be reviewed consistently.
          </p>
        </section>

        <section className="card static-card">
          <h2>Explore the archive</h2>
          <div className="actions">
            <a className="button" href="/records/">Browse records</a>
            <a className="button secondary" href="/events/">Browse events</a>
            <a className="button secondary" href="/methodology/">Read methodology</a>
            <a className="button secondary" href="/submit/">Submit correction</a>
          </div>
        </section>
      </div>
    </main>
  );
}
