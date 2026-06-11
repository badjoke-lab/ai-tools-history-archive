import type { Metadata } from 'next';
import { EventList } from '@/components/EventList';
import { getEventsByTypes } from '@/lib/events';

export const metadata: Metadata = {
  title: 'AI tool shutdowns and closure notices',
  description:
    'Browse source-linked shutdown notices and confirmed closures for AI tools, services, products, APIs, models, and features.',
  alternates: { canonical: '/shutdowns/' },
  openGraph: {
    title: 'AI tool shutdowns and closure notices',
    description: 'A source-linked index of announced and confirmed AI product shutdowns.',
    url: '/shutdowns/',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'AI tool shutdowns and closure notices',
    description: 'A source-linked index of announced and confirmed AI product shutdowns.'
  }
};

export default function ShutdownsPage() {
  const events = getEventsByTypes(['shutdown_notice', 'shutdown']);

  return (
    <main className="section events-page">
      <div className="container">
        <p className="kicker">Shutdown-related lifecycle events</p>
        <h1>AI tool shutdowns</h1>
        <p className="lede small">
          Browse announced and confirmed shutdown events with dates, affected entities, current status, and supporting public evidence.
        </p>
        <EventList
          events={events}
          emptyTitle="No shutdown events found."
          emptyBody="No shutdown notice or confirmed shutdown events are included in the current public dataset."
        />
      </div>
    </main>
  );
}
