import { getAllCategorySummaries } from '@/lib/categories';

export default function CategoriesPage() {
  const categories = getAllCategorySummaries();

  return (
    <main className="section categories-page">
      <div className="container">
        <p className="kicker">Archive navigation</p>
        <h1>Categories</h1>
        <p className="lede small">
          Browse AI lifecycle records by product area. Counts are generated from the current public seed dataset.
        </p>

        <div className="category-grid">
          {categories.map((item) => (
            <a className="category-card" href={`/categories/${item.category}/`} key={item.category}>
              <h2>{item.label}</h2>
              <p>{item.recordCount} records · {item.eventCount} events · {item.evidenceCount} evidence links</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
