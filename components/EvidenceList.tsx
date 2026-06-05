import type { Evidence } from '@/data/schema';

type EvidenceListProps = {
  evidence: Evidence[];
};

export function EvidenceList({ evidence }: EvidenceListProps) {
  if (evidence.length === 0) {
    return <p className="muted">No evidence has been added yet.</p>;
  }

  return (
    <ul className="evidence-list polished-evidence-list">
      {evidence.map((item) => (
        <li key={item.id}>
          <div className="evidence-title-row">
            <a href={item.url}>{item.title}</a>
            <span className="mini-label">{item.reliability}</span>
          </div>
          <p>
            {item.publisher ?? 'Unknown publisher'} · {item.source_type} · Accessed {item.accessed_at}
          </p>
          <p className="evidence-supports">Supports: {item.supports.join(', ')}</p>
        </li>
      ))}
    </ul>
  );
}
