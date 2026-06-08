import type { EventWithRecord } from '@/lib/events';
import { ConfidenceBadge } from './ConfidenceBadge';
import { getStatusTone, StatusBadge } from './StatusBadge';

type EventListProps = {
  events: EventWithRecord[];
  emptyTitle?: string;
  emptyBody?: string;
};

function displayValue(value: string) {
  return value.replaceAll('_', ' ');
}

export function EventList({
  events,
  emptyTitle = 'No events found.',
  emptyBody = 'No matching lifecycle events are included in the current seed dataset.'
}: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="empty-state">
        <h2>{emptyTitle}</h2>
        <p>{emptyBody}</p>
      </div>
    );
  }

  return (
    <div className="registry-list event-registry-list">
      {events.map((event) => (
        <article className="registry-row event-registry-row" key={event.id}>
          <div className="registry-date">{event.date}</div>
          <div className="registry-main-cell">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <a className="event-record-link" href={`/records/${event.record.slug}/`}>
              {event.record.name}
            </a>
          </div>
          <div className="registry-meta-cell">
            <span className="mini-label">{displayValue(event.type)}</span>
            <span className="mini-label">{displayValue(event.record.entity_type)}</span>
            <StatusBadge label={event.record.status} tone={getStatusTone(event.record.status)} />
            <ConfidenceBadge confidence={event.confidence} />
          </div>
        </article>
      ))}
    </div>
  );
}
