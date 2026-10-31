// Brand colours. Plain .mjs so that tailwind.config.mjs and the layout can both read it.
// Values are "R G B" triplets so Tailwind can apply opacity (bg-accent/10).
export const theme = {
  sand: '244 238 230',      // page background, tadelakt
  paper: '251 248 243',     // cards and panels
  stone: '226 216 202',     // borders and dividers
  ink: '43 38 32',          // main text, cedar-black
  muted: '107 98 86',       // secondary text (4.9:1 on sand)
  cedar: '58 44 33',        // dark sections
  accent: '47 93 87',       // the single accent: zellige green
  accentInk: '255 255 255', // text on accent
};
