import type { LifecycleEvent } from '@/data/schema';

type EventTimelineProps = {
  events: LifecycleEvent[];
};

export function EventTimeline({ events }: EventTimelineProps) {
  if (events.length === 0) {
    return <p className="muted">No lifecycle events have been added yet.</p>;
  }

  return (
    <ol className="timeline polished-timeline">
      {events.map((event) => (
        <li key={event.id}>
          <div className="timeline-date">{event.date}</div>
          <div className="timeline-body">
            <div className="timeline-title-row">
              <strong>{event.title}</strong>
              <span className="mini-label">{event.type}</span>
            </div>
            <p>{event.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
