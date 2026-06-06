import { EventList } from '@/components/EventList';
import { getEventsByTypes } from '@/lib/events';

export default function RebrandsPage() {
  const events = getEventsByTypes(['rebrand', 'merger']);

  return (
    <main className="section events-page">
      <div className="container">
        <p className="kicker">Rebrand and transition lifecycle events</p>
        <h1>Rebrands</h1>
        <p className="lede small">
          Rebrand and product transition events in the current public seed dataset.
        </p>
        <EventList
          events={events}
          emptyTitle="No rebrand events found."
          emptyBody="No rebrand or product transition events are included in the current seed dataset."
        />
      </div>
    </main>
  );
}
