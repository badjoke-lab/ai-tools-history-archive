import type { Metadata } from 'next';
import { CompareRecords } from '@/components/CompareRecords';
import { getAllRecords } from '@/lib/records';

export const metadata: Metadata = {
  title: 'Compare lifecycle records',
  description: 'Compare 2–4 source-linked AI lifecycle records across provider, status, dates, lifecycle events, replacement/export signals, and evidence provenance.',
  alternates: { canonical: '/compare/' }
};

export default function ComparePage() {
  const records = getAllRecords();
  return (
    <main>
      <section className="hero">
        <div className="container narrow-container">
          <p className="kicker">Historical Compare</p>
          <h1>Compare AI lifecycle records</h1>
          <p className="lede">Place 2–4 canonical records side by side. Compare recorded lifecycle facts and evidence signals without rankings, recommendations, or generated replacement claims.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <CompareRecords records={records} />
        </div>
      </section>
    </main>
  );
}
