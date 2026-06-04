import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Tools History Archive',
  description:
    'A source-linked archive for AI tool shutdowns, acquisitions, rebrands, API deprecations, model retirements, feature removals, and major product changes.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
