import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Deployed on GitHub Pages at https://<user>.github.io/<repo>/
// The GitHub Actions workflow sets SITE and BASE automatically. Locally both are empty.
const site = process.env.SITE || 'http://localhost:4321';
const base = process.env.BASE || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [tailwind({ applyBaseStyles: false })],
  prefetch: { prefetchAll: false, defaultStrategy: 'viewport' },
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
  build: { inlineStylesheets: 'auto' },
});
