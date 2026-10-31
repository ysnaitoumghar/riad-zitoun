import type { APIRoute } from 'astro';
import { site } from '../config/site';
import { href, pageUrl } from '../lib/l10n';

export const GET: APIRoute = () => {
  const manifest = {
    name: site.name,
    short_name: site.name,
    description: site.tagline[site.defaultLang],
    lang: site.defaultLang,
    start_url: pageUrl(site.defaultLang),
    scope: href('/'),
    display: 'standalone',
    background_color: site.themeColor,
    theme_color: site.themeColor,
    icons: [
      { src: href('/icons/icon-192.png'), sizes: '192x192', type: 'image/png' },
      { src: href('/icons/icon-512.png'), sizes: '512x512', type: 'image/png' },
      { src: href('/icons/icon-maskable-512.png'), sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
  return new Response(JSON.stringify(manifest), { headers: { 'Content-Type': 'application/manifest+json' } });
};
