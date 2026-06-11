import type { Metadata } from 'next';
import { EventList } from '@/components/EventList';
import { getApiModelLifecycleEvents } from '@/lib/events';

export const metadata: Metadata = {
  title: 'AI API deprecations and model retirements',
  description:
    'Browse source-linked AI API deprecations, API shutdowns, model deprecations, model retirements, replacement guidance, and removal dates.',
  alternates: { canonical: '/api-model-deprecations/' },
  openGraph: {
    title: 'AI API deprecations and model retirements',
    description: 'A source-linked index of AI API shutdowns, model retirements, and replacement paths.',
    url: '/api-model-deprecations/',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'AI API deprecations and model retirements',
    description: 'A source-linked index of AI API shutdowns, model retirements, and replacement paths.'
  }
};

export default function ApiModelDeprecationsPage() {
  const events = getApiModelLifecycleEvents();

  return (
    <main className="section events-page">
      <div className="container">
        <p className="kicker">Developer-facing lifecycle events</p>
        <h1>AI API deprecations and model retirements</h1>
        <p className="lede small">
          Browse dated API deprecations, API removals, model deprecations, and model retirements with affected names, shutdown dates, current status, and replacement guidance where available.
        </p>
        <EventList
          events={events}
          emptyTitle="No API or model lifecycle events found."
          emptyBody="No API deprecation, API shutdown, model deprecation, or model retirement events are included in the current public dataset."
        />
      </div>
    </main>
  );
}
