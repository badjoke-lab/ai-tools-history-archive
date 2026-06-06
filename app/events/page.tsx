import { EventList } from '@/components/EventList';
import { getAllEvents } from '@/lib/events';

export default function EventsPage() {
  const events = getAllEvents();

  return (
    <main className="section events-page">
      <div className="container">
        <p className="kicker">Lifecycle timeline</p>
        <h1>Events</h1>
        <p className="lede small">
          A dated index of lifecycle changes across AI tools, services, products, APIs, models, and features.
        </p>

        <div className="event-nav" aria-label="Event sections">
          <a href="/shutdowns/">Shutdowns</a>
          <a href="/acquisitions/">Acquisitions</a>
          <a href="/rebrands/">Rebrands</a>
          <a href="/api-model-deprecations/">API / model deprecations</a>
        </div>

        <EventList events={events} />
      </div>
    </main>
  );
}
