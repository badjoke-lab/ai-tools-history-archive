import type { Record } from '@/data/schema';
import { ConfidenceBadge } from './ConfidenceBadge';
import { getStatusTone, StatusBadge } from './StatusBadge';

type RecordCardProps = {
  record: Record;
};

export function RecordCard({ record }: RecordCardProps) {
  const latestEvent = record.events.at(-1);

  return (
    <article className="record-card">
      <div className="record-card-main">
        <div className="record-card-heading">
          <a className="record-title" href={`/records/${record.slug}/`}>
            {record.name}
          </a>
          <StatusBadge label={record.status} tone={getStatusTone(record.status)} />
        </div>
        <p>{record.summary}</p>
        {latestEvent ? (
          <p className="record-latest-event">
            Latest event: <strong>{latestEvent.date}</strong> · {latestEvent.title}
          </p>
        ) : null}
      </div>
      <div className="record-card-side">
        <ConfidenceBadge confidence={record.confidence} />
        <span className="mini-label">{record.entity_type}</span>
        <span className="mini-label">{record.operator}</span>
        <span className="mini-label">Evidence: {record.evidence.length}</span>
      </div>
    </article>
  );
}
