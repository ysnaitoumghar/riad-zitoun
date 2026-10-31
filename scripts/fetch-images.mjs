// Downloads the Unsplash photos used by the demo into src/assets/photos.
// Run once: npm run images   (files are committed, so you only need this to re-fetch or swap photos)
// Each key is the file name used in src/config/*.ts; the value is the Unsplash photo id.
import { writeFile, mkdir } from 'node:fs/promises';

const PHOTOS = {
  courtyard: 'TFhl8b-rRPg',   // courtyard with plunge pool and orange trees
  fountain: 'tIK9VHzEO0A',    // zellige fountain and olive tree
  terrace: 'hoR3kld8wZY',     // tiled terrace under banana leaves
  balcony: 'qsAcZGkv0FQ',     // balcony with curtains and wrought-iron railing
  salon: 'Ed-H6IrkrdM',       // zellige salon with cedar ceiling
  dining: 'zOFWHSN3oTQ',      // brick arches and mosaic table
  tea: 'pbMf0vDIdO8',         // mint tea on a terrace
  pillow: '27v8-mFWHuM',      // bed with patterned tiles
  medina: 'IFJet9MhDSE',      // medina alley
  corridor: 'OR3ToX4bgKs',    // white gallery with lanterns
  lounge: 'Hd9CYKjfpCs',      // sitting room
  hammam: 'lBPwkc0g3Bo',      // tiled bathing pool
  food: '_V4v7BbG338',        // tagine and Moroccan table
  agafay: 'U_SG5fO-ivs',      // camels, Agafay desert
};

await mkdir('src/assets/photos', { recursive: true });
for (const [name, id] of Object.entries(PHOTOS)) {
  const res = await fetch(`https://unsplash.com/photos/${id}/download?force=true&w=2000`, { redirect: 'follow' });
  if (!res.ok || !(res.headers.get('content-type') || '').startsWith('image/')) {
    console.error(`FAILED ${name} (${id}): HTTP ${res.status}`);
    process.exitCode = 1;
    continue;
  }
  await writeFile(`src/assets/photos/${name}.jpg`, Buffer.from(await res.arrayBuffer()));
  console.log(`ok ${name}`);
}
