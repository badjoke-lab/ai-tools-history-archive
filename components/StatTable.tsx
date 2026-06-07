type StatRow = { label: string; count: number };

type StatTableProps = {
  title: string;
  rows: StatRow[];
  emptyText?: string;
};

export function StatTable({ title, rows, emptyText = 'No data yet.' }: StatTableProps) {
  return (
    <section className="card stat-card">
      <h2>{title}</h2>
      {rows.length > 0 ? (
        <table className="stat-table">
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{emptyText}</p>
      )}
    </section>
  );
}
