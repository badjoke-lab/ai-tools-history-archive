import { EventList } from '@/components/EventList';
import { getEventsByTypes } from '@/lib/events';

export default function AcquisitionsPage() {
  const events = getEventsByTypes(['acquisition', 'merger']);

  return (
    <main className="section events-page">
      <div className="container">
        <p className="kicker">Acquisition and merger lifecycle events</p>
        <h1>Acquisitions</h1>
        <p className="lede small">
          Acquisition and merger events for AI entities in the current public seed dataset.
        </p>
        <EventList
          events={events}
          emptyTitle="No acquisition or merger events found."
          emptyBody="No acquisition or merger events are included in the current seed dataset."
        />
      </div>
    </main>
  );
}
