import { EventList } from '@/components/EventList';
import { getEventsByTypes } from '@/lib/events';

export default function ShutdownsPage() {
  const events = getEventsByTypes(['shutdown_notice', 'shutdown']);

  return (
    <main className="section events-page">
      <div className="container">
        <p className="kicker">Shutdown-related lifecycle events</p>
        <h1>Shutdowns</h1>
        <p className="lede small">
          Shutdown notices and confirmed shutdown events in the current public seed dataset.
        </p>
        <EventList
          events={events}
          emptyTitle="No shutdown events found."
          emptyBody="No shutdown notice or confirmed shutdown events are included in the current seed dataset."
        />
      </div>
    </main>
  );
}
