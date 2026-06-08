import type { Record } from '@/data/schema';
import { ConfidenceBadge } from './ConfidenceBadge';
import { getStatusTone, StatusBadge } from './StatusBadge';

type RecordCardProps = {
  record: Record;
};

function displayValue(value: string) {
  return value.replaceAll('_', ' ');
}

export function RecordCard({ record }: RecordCardProps) {
  const latestEvent = record.events.at(-1);

  return (
    <article className="registry-row record-registry-row">
      <div className="registry-main-cell">
        <div className="record-card-heading">
          <a className="record-title" href={`/records/${record.slug}/`}>
            {record.name}
          </a>
          <StatusBadge label={record.status} tone={getStatusTone(record.status)} />
        </div>
        <p>{record.summary}</p>
        {latestEvent ? (
          <p className="record-latest-event">
            Latest: <strong>{latestEvent.date}</strong> · {latestEvent.title}
          </p>
        ) : null}
      </div>
      <div className="registry-meta-cell">
        <span className="mini-label">{displayValue(record.entity_type)}</span>
        <span className="mini-label">{record.operator}</span>
        <span className="mini-label">Evidence {record.evidence.length}</span>
        <ConfidenceBadge confidence={record.confidence} />
      </div>
    </article>
  );
}
