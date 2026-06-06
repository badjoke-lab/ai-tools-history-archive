const requestedFields = [
  'Record name',
  'Entity type: tool, service, product, API, model, feature, company, or hardware',
  'What changed?',
  'Event date or approximate date',
  'Public evidence URL',
  'Whether the evidence is official or secondary',
  'Current URL or last-known URL',
  'Short note explaining the correction or suggested addition'
];

export default function SubmitPage() {
  return (
    <main className="section static-page">
      <div className="container narrow-container">
        <p className="kicker">Corrections and suggestions</p>
        <h1>Submit</h1>
        <p className="lede small">
          Suggest a new record or correction using public evidence. Submissions are reviewed before any public record is changed.
        </p>

        <section className="card static-card">
          <h2>What to include</h2>
          <ul className="simple-list">
            {requestedFields.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="card static-card">
          <h2>Review policy</h2>
          <p>
            Submitted information is not published automatically. Records should be supported by public evidence and written in a neutral, verifiable form.
          </p>
        </section>

        <section className="card static-card">
          <h2>Submission channels</h2>
          <p>
            A public issue template or external form can be added later. Until then, use the project repository issues for public corrections that do not include private information.
          </p>
          <a className="button secondary" href="https://github.com/badjoke-lab/ai-tools-history-archive/issues">
            Open GitHub Issues
          </a>
        </section>
      </div>
    </main>
  );
}
