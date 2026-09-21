import { defineConfig } from 'astro/config';

// Static site — deploys to Cloudflare Pages / GitHub Pages with no adapter.
// After you get a domain, set `site` to it for correct canonical URLs & sitemap.
export default defineConfig({
  // site: 'https://awlad-elmalek.pages.dev',
  build: { format: 'directory' },
});
