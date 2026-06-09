const requestedFields = [
  'Record name and current public URL, if available',
  'Entity type: tool, service, product, API, model, feature, company, or hardware',
  'What changed and why the existing record may be incomplete or incorrect',
  'Event date, announcement date, or best-supported approximate date',
  'At least one public evidence URL',
  'Whether each source is official, archived official material, or secondary reporting',
  'A short neutral summary of the proposed correction or new entry'
];

const acceptedReports = [
  'New lifecycle record backed by public evidence',
  'Changed status or completed shutdown',
  'Incorrect date, operator, entity type, or current-state wording',
  'Broken, redirected, or repurposed source URL',
  'Stronger primary source for an existing event',
  'Duplicate record or incorrectly grouped models/features'
];

export default function SubmitPage() {
  return (
    <main className="section static-page">
      <div className="container narrow-container">
        <p className="kicker">Corrections and suggestions</p>
        <h1>Submit evidence or a correction</h1>
        <p className="lede small">
          Suggest a new lifecycle record or improve an existing one using public evidence. Nothing submitted here is published automatically.
        </p>

        <section className="card static-card">
          <h2>Reports accepted</h2>
          <ul className="simple-list">
            {acceptedReports.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="card static-card">
          <h2>What to include</h2>
          <ul className="simple-list">
            {requestedFields.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="card static-card">
          <h2>Evidence rules</h2>
          <p>
            Prefer official announcements, documentation, support pages, changelogs, archived official pages, regulator records, or acquisition statements. Secondary reporting is useful when primary material is unavailable, but unsupported claims and private information should not be submitted.
          </p>
        </section>

        <section className="card static-card">
          <h2>Review process</h2>
          <p>
            Submissions are checked against the archive methodology. A proposal may be accepted, rewritten, left as needs review, or declined when the available public evidence is insufficient. Submitted text may be edited into neutral registry wording.
          </p>
        </section>

        <section className="card static-card">
          <h2>Public submission channel</h2>
          <p>
            Use GitHub Issues only for information that can be public. Do not include personal data, private correspondence, account credentials, confidential material, or unverified accusations.
          </p>
          <a className="button secondary evidence-button" href="https://github.com/badjoke-lab/ai-tools-history-archive/issues/new">
            Open a public issue
          </a>
        </section>
      </div>
    </main>
  );
}
