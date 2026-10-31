// Everything that identifies this riad. Edit this file (and rooms/experiences/reviews/faq) to rebrand the site.
import type { L10n } from '../lib/l10n';

export const site = {
  name: 'Riad Zitoun',
  // Logo: a wordmark. Set `mark` to an inline SVG path (24x24 viewBox) or leave empty for text only.
  logo: {
    wordmark: 'Riad Zitoun',
    mark: 'M12 3 4 8v13h5v-6a3 3 0 0 1 6 0v6h5V8z',
  },
  tagline: {
    fr: 'Maison d’hôtes dans la médina de Marrakech',
    en: 'Guesthouse in the Marrakech medina',
    ar: 'دار ضيافة في مدينة مراكش العتيقة',
  } satisfies L10n,
  whatsapp: '212600000000', // international format, digits only (demo number)
  phone: '+212 6 00 00 00 00',
  email: 'bonjour@riad-zitoun.example',
  address: {
    fr: '12 derb Zitoun, Riad Zitoun el Kdim, médina, 40000 Marrakech',
    en: '12 Derb Zitoun, Riad Zitoun el Kdim, Medina, 40000 Marrakech',
    ar: '12 درب الزيتون، رياض الزيتون القديم، المدينة العتيقة، 40000 مراكش',
  } satisfies L10n,
  currency: { code: 'MAD', eurRate: 10.8 }, // 1 EUR = eurRate MAD. Update when you like.
  checkIn: '14:00',
  checkOut: '11:00',
  // Demo coordinates, approximate. Replace with the real riad.
  map: { lat: 31.6254, lon: -7.9857, zoomSpan: 0.0045 },
  // Where the sample photos come from (shown in the footer).
  photoCredit: 'Unsplash',
  themeColor: '#F4EEE6',
  languages: ['fr', 'en', 'ar'] as const,
  defaultLang: 'fr' as const,
};

export type Lang = (typeof site.languages)[number];
