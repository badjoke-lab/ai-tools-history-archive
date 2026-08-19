// Cloudflare Pages may invoke `next build` directly instead of the package
// `build` script. Generate the canonical machine-readable layer when Next
// loads its build configuration so both deployment paths produce the same
// static files.
await import('./scripts/generate-machine-records.mjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true
};

export default nextConfig;
