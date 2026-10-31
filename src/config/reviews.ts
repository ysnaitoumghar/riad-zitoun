import type { L10n } from '../lib/l10n';

// SAMPLE CONTENT for the demo. The site shows a label saying these are examples.
// Replace with real reviews and set reviewsAreSample to false before going live.
export const reviewsAreSample = true;

export interface Review {
  name: string;
  from: L10n;
  stay: L10n;
  rating: number;
  text: L10n;
}

export const reviews: Review[] = [
  {
    name: 'Claire',
    from: { fr: 'Lyon', en: 'Lyon', ar: 'ليون' },
    stay: { fr: 'Suite Cèdre, mars', en: 'Cedar Suite, March', ar: 'جناح الأرز، مارس' },
    rating: 5,
    text: {
      fr: 'Le petit déjeuner sur la terrasse, le calme du patio le soir, et Hassan qui est venu nous chercher à la porte de la médina avec nos valises.',
      en: 'Breakfast on the terrace, the quiet of the courtyard in the evening, and Hassan meeting us at the medina gate to carry our bags.',
      ar: 'الفطور على السطح، وهدوء الباحة في المساء، وحسن الذي استقبلنا عند باب المدينة وحمل حقائبنا.',
    },
  },
  {
    name: 'Tom and Ella',
    from: { fr: 'Bristol', en: 'Bristol', ar: 'بريستول' },
    stay: { fr: 'Chambre Zellige, novembre', en: 'Zellige Room, November', ar: 'غرفة الزليج، نوفمبر' },
    rating: 5,
    text: {
      fr: 'Jemaa el-Fna est à dix minutes à pied, mais on n’entend rien dans la chambre. Le cours de cuisine était le meilleur moment du séjour.',
      en: 'Jemaa el-Fna is ten minutes on foot, yet the room is completely silent. The cooking class was the highlight of our stay.',
      ar: 'ساحة جامع الفنا على بعد عشر دقائق مشيا لكن الغرفة هادئة تماما. كان درس الطبخ أجمل لحظات إقامتنا.',
    },
  },
  {
    name: 'Samira',
    from: { fr: 'Casablanca', en: 'Casablanca', ar: 'الدار البيضاء' },
    stay: { fr: 'Chambre Tadelakt, février', en: 'Tadelakt Room, February', ar: 'غرفة التدلاكت، فبراير' },
    rating: 4,
    text: {
      fr: 'Propre, chaleureux, bien chauffé en hiver. Les escaliers sont raides, prévenez-les si vous avez du mal à monter.',
      en: 'Clean, warm and well heated in winter. The stairs are steep, so tell them if climbing is difficult.',
      ar: 'نظيف ودافئ ومدفأ جيدا في الشتاء. الدرج شديد الانحدار، أخبروهم إن كان الصعود صعبا عليكم.',
    },
  },
];
