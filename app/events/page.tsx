import type { Metadata } from 'next';
import { EventList } from '@/components/EventList';
import { getAllEvents } from '@/lib/events';

export const metadata: Metadata = {
  title: 'AI product lifecycle events and timeline',
  description:
    'Browse dated AI lifecycle events including shutdowns, acquisitions, rebrands, API deprecations, model retirements, and feature removals with source-linked records.',
  alternates: { canonical: '/events/' },
  openGraph: {
    title: 'AI product lifecycle timeline',
    description: 'A dated source-linked timeline of major AI product, API, model, and feature changes.',
    url: '/events/',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'AI product lifecycle timeline',
    description: 'A dated source-linked timeline of major AI product, API, model, and feature changes.'
  }
};

export default function EventsPage() {
  const events = getAllEvents();

  return (
    <main className="section events-page">
      <div className="container">
        <p className="kicker">Source-linked lifecycle timeline</p>
        <h1>AI lifecycle events</h1>
        <p className="lede small">
          Browse dated changes across AI tools, services, products, APIs, models, companies, hardware, and features. Each event links back to a record and its supporting public evidence.
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
