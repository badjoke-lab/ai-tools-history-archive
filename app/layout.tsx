import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://ai-tools-history-archive.pages.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AI Tools History Archive',
    template: '%s | AI Tools History Archive'
  },
  description:
    'Track AI tool shutdowns, acquisitions, rebrands, API deprecations, model retirements, feature removals, and major product changes with source-linked evidence.',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'AI Tools History Archive',
    title: 'AI Tools History Archive',
    description:
      'A source-linked archive for AI service shutdowns, acquisitions, rebrands, API deprecations, model retirements, feature removals, and major product changes.'
  },
  twitter: {
    card: 'summary',
    title: 'AI Tools History Archive',
    description:
      'Track AI tool shutdowns, acquisitions, rebrands, API deprecations, model retirements, feature removals, and major product changes.'
  }
};

const navItems = [
  ['Records', '/records/'],
  ['Events', '/events/'],
  ['Categories', '/categories/'],
  ['Stats', '/stats/'],
  ['Methodology', '/methodology/'],
  ['Submit', '/submit/'],
  ['About', '/about/']
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI Tools History Archive',
    url: siteUrl,
    description:
      'A source-linked archive for AI tool and service lifecycle changes, including shutdowns, acquisitions, rebrands, API deprecations, model retirements, feature removals, and major product changes.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/records/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <header className="header">
          <div className="container header-inner">
            <a className="brand" href="/">AI Tools History Archive</a>
            <nav className="nav" aria-label="Primary navigation">
              {navItems.map(([label, href]) => (
                <a href={href} key={href}>{label}</a>
              ))}
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="container">
            Source-linked AI lifecycle archive. Early seed stage.
          </div>
        </footer>
      </body>
    </html>
  );
}
