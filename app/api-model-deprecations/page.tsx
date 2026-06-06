import { EventList } from '@/components/EventList';
import { getApiModelLifecycleEvents } from '@/lib/events';

export default function ApiModelDeprecationsPage() {
  const events = getApiModelLifecycleEvents();

  return (
    <main className="section events-page">
      <div className="container">
        <p className="kicker">Developer-facing lifecycle events</p>
        <h1>API / Model Deprecations</h1>
        <p className="lede small">
          API deprecations, API shutdowns, model deprecations, and model retirements in the current public seed dataset.
        </p>
        <EventList
          events={events}
          emptyTitle="No API or model lifecycle events found."
          emptyBody="No API deprecation, API shutdown, model deprecation, or model retirement events are included in the current seed dataset."
        />
      </div>
    </main>
  );
}
