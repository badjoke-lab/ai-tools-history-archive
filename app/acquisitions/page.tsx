import type { Metadata } from 'next';
import { EventList } from '@/components/EventList';
import { getEventsByTypes } from '@/lib/events';

export const metadata: Metadata = {
  title: 'AI company acquisitions and mergers',
  description:
    'Browse source-linked acquisitions and mergers involving AI companies, tools, services, products, APIs, models, and platforms.',
  alternates: { canonical: '/acquisitions/' },
  openGraph: {
    title: 'AI company acquisitions and mergers',
    description: 'A source-linked index of acquisitions and mergers across the AI product ecosystem.',
    url: '/acquisitions/',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'AI company acquisitions and mergers',
    description: 'A source-linked index of acquisitions and mergers across the AI product ecosystem.'
  }
};

export default function AcquisitionsPage() {
  const events = getEventsByTypes(['acquisition', 'merger']);

  return (
    <main className="section events-page">
      <div className="container">
        <p className="kicker">Ownership and consolidation events</p>
        <h1>AI acquisitions and mergers</h1>
        <p className="lede small">
          Browse dated ownership changes and consolidations with the affected entity, event summary, current status, and supporting public evidence.
        </p>
        <EventList
          events={events}
          emptyTitle="No acquisition or merger events found."
          emptyBody="No acquisition or merger events are included in the current public dataset."
        />
      </div>
    </main>
  );
}
