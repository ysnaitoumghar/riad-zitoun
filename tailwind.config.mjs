import { theme } from './src/config/theme.mjs';

const color = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: Object.fromEntries(Object.keys(theme).map((k) => [k, color(k)])),
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
      },
      borderRadius: { DEFAULT: '12px', md: '12px', lg: '12px', xl: '12px', '2xl': '12px' },
      maxWidth: { page: '1180px' },
    },
  },
  plugins: [],
};
