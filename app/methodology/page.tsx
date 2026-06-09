const principles = [
  'Use public sources and cite the evidence behind each lifecycle event.',
  'Separate records, events, and evidence so each statement can be reviewed independently.',
  'Prefer official announcements, official documentation, support pages, changelogs, press releases, and archived pages.',
  'Use neutral language and avoid unsupported claims about intent, quality, legality, or failure reasons.',
  'Keep unknown, disputed, and needs-review states visible instead of forcing a false conclusion.'
];

const confidenceRules = [
  ['High', 'An official source or direct documentation supports the event and date.'],
  ['Medium', 'Credible secondary reporting or archived material supports the event, but official confirmation is incomplete.'],
  ['Low', 'The public record is limited, indirect, or internally inconsistent.'],
  ['Needs review', 'The entry is incomplete or awaiting stronger evidence and should not be treated as confirmed.']
];

const sourceHierarchy = [
  ['Tier 1', 'Official product announcements, documentation, support pages, changelogs, legal filings, and operator statements.'],
  ['Tier 2', 'Archived official pages, acquisition announcements from counterparties, and regulator or court records.'],
  ['Tier 3', 'Credible reporting, interviews, and specialist publications used when primary material is unavailable.'],
  ['Tier 4', 'Community posts, social posts, directories, and mirrors used only as leads or supporting context.']
];

export default function MethodologyPage() {
  return (
    <main className="section static-page">
      <div className="container narrow-container">
        <p className="kicker">Review rules</p>
        <h1>Methodology</h1>
        <p className="lede small">
          AI Tools History Archive records lifecycle changes for AI tools, services, products, APIs, models, and features using dated public evidence and neutral wording.
        </p>

        <section className="card static-card">
          <h2>What the archive records</h2>
          <p>
            A record represents an AI-related entity. Events describe dated lifecycle changes. Evidence links support the event, date, current state, or replacement path. The archive is designed to answer what changed, when it changed, and which public source supports that statement.
          </p>
        </section>

        <section className="card static-card">
          <h2>Core principles</h2>
          <ul className="simple-list">
            {principles.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="card static-card">
          <h2>Inclusion threshold</h2>
          <p>
            An entry should describe a material lifecycle change, not a routine release note. Typical qualifying changes include shutdown notices, confirmed shutdowns, acquisitions, mergers, rebrands, API deprecations, API removals, model retirements, feature removals, pricing-model changes, or another transition that materially changes availability, ownership, identity, or access.
          </p>
        </section>

        <section className="card static-card">
          <h2>Source hierarchy</h2>
          <table className="stat-table">
            <tbody>
              {sourceHierarchy.map(([label, body]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="card static-card">
          <h2>Confidence levels</h2>
          <table className="stat-table">
            <tbody>
              {confidenceRules.map(([label, body]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="card static-card">
          <h2>Current state and dates</h2>
          <p>
            Event dates refer to the dated change or announcement described by the source. Current-state text is reviewed separately and may change later. Planned shutdown dates remain future-facing until a later source confirms completion.
          </p>
        </section>

        <section className="card static-card">
          <h2>Wording and corrections</h2>
          <p>
            Records describe observable changes and source-backed facts. The archive does not infer motive or assign blame without direct evidence. Better sources, broken links, status changes, and factual corrections can be submitted through the public correction path.
          </p>
        </section>
      </div>
    </main>
  );
}
