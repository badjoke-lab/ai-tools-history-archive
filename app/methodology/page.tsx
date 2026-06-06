const principles = [
  'Use public sources and cite the evidence behind each lifecycle event.',
  'Separate records, events, and evidence so that each change can be reviewed independently.',
  'Prefer official announcements, official documentation, support pages, changelogs, press releases, and archived pages.',
  'Use neutral language and avoid unsupported claims about intent, quality, legality, or failure reasons.',
  'Allow unknown and needs-review states when the available public evidence is incomplete.'
];

const confidenceRules = [
  ['High', 'Official source or direct documentation supports the event.'],
  ['Medium', 'Credible secondary sources or archived pages support the event, but official confirmation is incomplete.'],
  ['Low', 'Limited public evidence exists and the record needs more review.'],
  ['Needs review', 'The record is included as a candidate or incomplete public entry and should not be treated as confirmed.']
];

export default function MethodologyPage() {
  return (
    <main className="section static-page">
      <div className="container narrow-container">
        <p className="kicker">Review rules</p>
        <h1>Methodology</h1>
        <p className="lede small">
          AI Tools History Archive records lifecycle changes for AI tools, services, products, APIs, models, and features using public evidence and neutral wording.
        </p>

        <section className="card static-card">
          <h2>Core principles</h2>
          <ul className="simple-list">
            {principles.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="card static-card">
          <h2>What counts as a lifecycle event?</h2>
          <p>
            Lifecycle events include shutdown notices, confirmed shutdowns, acquisitions, mergers, rebrands, API deprecations, API shutdowns, model retirements, feature removals, pricing changes, and other major product transitions.
          </p>
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
          <h2>Wording policy</h2>
          <p>
            Records should describe what changed, when it changed, what the current state appears to be, and which public sources support that statement. Strong claims should not be made unless directly supported by evidence.
          </p>
        </section>
      </div>
    </main>
  );
}
