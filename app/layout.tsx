import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Tools History Archive',
  description:
    'A source-linked archive for AI tool shutdowns, acquisitions, rebrands, API deprecations, model retirements, feature removals, and major product changes.'
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
  return (
    <html lang="en">
      <body>
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
