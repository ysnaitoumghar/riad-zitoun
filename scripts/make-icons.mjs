// Generates the PWA / home-screen icons from the brand colours and logo mark.
// Run: node scripts/make-icons.mjs   (re-run after changing theme.mjs or site.ts)
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { theme } from '../src/config/theme.mjs';

const rgb = (t) => `rgb(${t.split(' ').join(',')})`;
const bg = rgb(theme.accent);
const fg = rgb(theme.sand);
// Same house mark as the header logo (24x24 viewBox)
const MARK = 'M12 3 4 8v13h5v-6a3 3 0 0 1 6 0v6h5V8z';

const svg = (size, pad) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${bg}"/>
  <g transform="translate(${pad} ${pad}) scale(${(size - pad * 2) / 24})">
    <path d="${MARK}" fill="${fg}"/>
  </g>
</svg>`;

await mkdir('public/icons', { recursive: true });
const out = [
  ['apple-touch-icon.png', 180, 40],
  ['icon-192.png', 192, 44],
  ['icon-512.png', 512, 118],
  ['icon-maskable-512.png', 512, 150], // extra padding: maskable safe zone
];
for (const [name, size, pad] of out) {
  await sharp(Buffer.from(svg(size, pad))).png().toFile(`public/icons/${name}`);
  console.log('wrote', name);
}
