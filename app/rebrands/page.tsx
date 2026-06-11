import type { Metadata } from 'next';
import { EventList } from '@/components/EventList';
import { getEventsByTypes } from '@/lib/events';

export const metadata: Metadata = {
  title: 'AI product rebrands and name changes',
  description:
    'Browse source-linked rebrands, renames, and product identity transitions across AI tools, services, products, APIs, models, and platforms.',
  alternates: { canonical: '/rebrands/' },
  openGraph: {
    title: 'AI product rebrands and name changes',
    description: 'A source-linked index of AI product renames, rebrands, and identity transitions.',
    url: '/rebrands/',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'AI product rebrands and name changes',
    description: 'A source-linked index of AI product renames, rebrands, and identity transitions.'
  }
};

export default function RebrandsPage() {
  const events = getEventsByTypes(['rebrand', 'merger']);

  return (
    <main className="section events-page">
      <div className="container">
        <p className="kicker">Identity and product transition events</p>
        <h1>AI product rebrands</h1>
        <p className="lede small">
          Browse dated rebrands and related identity transitions with the affected entity, prior and current state, and supporting public evidence.
        </p>
        <EventList
          events={events}
          emptyTitle="No rebrand events found."
          emptyBody="No rebrand or product transition events are included in the current public dataset."
        />
      </div>
    </main>
  );
}
