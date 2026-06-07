import type { EventWithRecord } from '@/lib/events';
import { ConfidenceBadge } from './ConfidenceBadge';
import { getStatusTone, StatusBadge } from './StatusBadge';

type EventListProps = {
  events: EventWithRecord[];
  emptyTitle?: string;
  emptyBody?: string;
};

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
    <div className="event-list">
      {events.map((event) => (
        <article className="event-card" key={event.id}>
          <div className="event-card-main">
            <p className="event-date">{event.date}</p>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <a className="event-record-link" href={`/records/${event.record.slug}/`}>
              View record: {event.record.name}
            </a>
          </div>
          <div className="event-card-side">
            <span className="mini-label">{event.type}</span>
            <span className="mini-label">{event.record.entity_type}</span>
            <StatusBadge label={event.record.status} tone={getStatusTone(event.record.status)} />
            <ConfidenceBadge confidence={event.confidence} />
          </div>
        </article>
      ))}
    </div>
  );
}
