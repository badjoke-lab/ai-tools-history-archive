const terms = [
  ['Acquisition', 'A company or product is purchased by another organization. The original product may continue, merge, or shut down.'],
  ['API deprecation', 'A developer-facing notice that an API is no longer recommended and may be removed later.'],
  ['API shutdown', 'An API endpoint or developer platform becomes unavailable after a stated or observed removal.'],
  ['Feature removal', 'A specific product feature is removed while the broader product may continue to operate.'],
  ['Model retirement', 'An AI model becomes unavailable or is replaced by a newer model.'],
  ['Rebrand', 'A product or service continues under a new name or brand structure.'],
  ['Shutdown notice', 'A public announcement that a product, service, feature, API, or model will be discontinued.'],
  ['Source type', 'The kind of public evidence used for a record, such as official documentation, support pages, changelogs, media reports, or archived pages.']
];

export default function GlossaryPage() {
  return (
    <main className="section static-page">
      <div className="container narrow-container">
        <p className="kicker">Definitions</p>
        <h1>Glossary</h1>
        <p className="lede small">
          Short definitions for terms used across the archive.
        </p>

        <div className="glossary-list">
          {terms.map(([term, definition]) => (
            <section className="card static-card" key={term}>
              <h2>{term}</h2>
              <p>{definition}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
