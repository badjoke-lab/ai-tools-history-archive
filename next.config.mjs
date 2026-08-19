// Cloudflare Pages may invoke `next build` directly instead of the package
// `build` script. Generate both the canonical native machine-readable layer
// and the Series interoperability adapter when Next loads its build
// configuration so every deployment path produces the same static files.
await import('./scripts/generate-machine-records.mjs');
await import('./scripts/generate-series-adapter.mjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true
};

export default nextConfig;
