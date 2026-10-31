import type { L10n } from '../lib/l10n';

export interface Room {
  slug: string;
  name: L10n;
  summary: L10n;
  description: L10n;
  size: number; // m²
  bed: L10n;
  maxGuests: number;
  priceMAD: number; // per night, breakfast included
  amenities: string[]; // ids, labels live in src/i18n/ui.ts → amenities
  photos: string[]; // keys of files in src/assets/photos, first one is the cover
  alt: L10n[]; // one alt text per photo
}

export const rooms: Room[] = [
  {
    slug: 'suite-cedre',
    name: { fr: 'Suite Cèdre', en: 'Cedar Suite', ar: 'جناح الأرز' },
    summary: {
      fr: 'Suite avec balcon sur le patio, salon et salle de bain en tadelakt.',
      en: 'Suite with a balcony over the courtyard, sitting area and tadelakt bathroom.',
      ar: 'جناح بشرفة تطل على الباحة، مع ركن جلوس وحمام من التدلاكت.',
    },
    description: {
      fr: 'Au premier étage, la suite donne sur le patio par un balcon en bois de cèdre sculpté. Le lit king est face à une cheminée en zellige, le salon a une banquette pour lire ou prendre le thé. La salle de bain en tadelakt a une douche à l’italienne et une baignoire.',
      en: 'On the first floor, the suite opens onto the courtyard through a carved cedar balcony. The king bed faces a zellige fireplace and the sitting area has a daybed for reading or tea. The tadelakt bathroom has a walk-in shower and a bathtub.',
      ar: 'في الطابق الأول، يطل الجناح على الباحة عبر شرفة من خشب الأرز المنحوت. السرير الكبير قبالة مدفأة من الزليج، وفي ركن الجلوس أريكة للقراءة أو لشرب الشاي. حمام التدلاكت فيه دوش وحوض استحمام.',
    },
    size: 32,
    bed: { fr: 'Lit king 180 × 200 cm, lit d’appoint possible', en: 'King bed 180 × 200 cm, extra bed available', ar: 'سرير كبير 180 × 200 سم، سرير إضافي عند الطلب' },
    maxGuests: 3,
    priceMAD: 1900,
    amenities: ['ac', 'heating', 'wifi', 'safe', 'courtyardView', 'bathtub', 'shower', 'teaSet', 'hairdryer', 'linen'],
    photos: ['balcony', 'pillow', 'lounge'],
    alt: [
      { fr: 'Balcon de la suite avec rideaux gris-bleu et garde-corps en fer forgé', en: 'Suite balcony with grey-blue curtains and wrought-iron railing', ar: 'شرفة الجناح بستائر رمادية مزرقة وحاجز من الحديد المشغول' },
      { fr: 'Tête de lit devant un carrelage à motifs', en: 'Bed headboard in front of patterned tiles', ar: 'رأس السرير أمام بلاط مزخرف' },
      { fr: 'Salon avec banquette et plafond en bois', en: 'Sitting area with daybed and wooden ceiling', ar: 'ركن الجلوس مع أريكة وسقف خشبي' },
    ],
  },
  {
    slug: 'chambre-zellige',
    name: { fr: 'Chambre Zellige', en: 'Zellige Room', ar: 'غرفة الزليج' },
    summary: {
      fr: 'Chambre au rez-de-chaussée, murs en zellige vert, lits jumeaux ou king.',
      en: 'Ground-floor room with green zellige walls, twin or king beds.',
      ar: 'غرفة في الطابق الأرضي بجدران من الزليج الأخضر، سريران منفصلان أو سرير كبير.',
    },
    description: {
      fr: 'Au rez-de-chaussée, à deux pas de la fontaine du patio. Les murs sont habillés de zellige vert posé à la main, le plafond est en cèdre peint. Les lits peuvent être réunis en lit king ou séparés.',
      en: 'On the ground floor, a few steps from the courtyard fountain. The walls are covered in hand-laid green zellige and the ceiling is painted cedar. The beds can be joined as a king or kept as twins.',
      ar: 'في الطابق الأرضي، على بعد خطوات من نافورة الباحة. الجدران مكسوة بالزليج الأخضر المرصوف يدويا، والسقف من خشب الأرز المصبوغ. يمكن ضم السريرين أو فصلهما.',
    },
    size: 24,
    bed: { fr: 'Lit king 180 × 200 cm ou 2 lits 90 × 200 cm', en: 'King bed 180 × 200 cm or 2 beds 90 × 200 cm', ar: 'سرير كبير 180 × 200 سم أو سريران 90 × 200 سم' },
    maxGuests: 2,
    priceMAD: 1400,
    amenities: ['ac', 'heating', 'wifi', 'safe', 'courtyardView', 'shower', 'hairdryer', 'linen'],
    photos: ['salon', 'fountain', 'corridor'],
    alt: [
      { fr: 'Salon aux murs en zellige vert et plafond en cèdre', en: 'Sitting room with green zellige walls and cedar ceiling', ar: 'صالون بجدران من الزليج الأخضر وسقف من الأرز' },
      { fr: 'Fontaine en zellige bleu dans le patio', en: 'Blue zellige fountain in the courtyard', ar: 'نافورة من الزليج الأزرق في الباحة' },
      { fr: 'Galerie blanche avec lanternes en verre', en: 'White gallery with glass lanterns', ar: 'رواق أبيض بفوانيس زجاجية' },
    ],
  },
  {
    slug: 'chambre-tadelakt',
    name: { fr: 'Chambre Tadelakt', en: 'Tadelakt Room', ar: 'غرفة التدلاكت' },
    summary: {
      fr: 'Chambre calme sur la terrasse, murs en tadelakt sable, lit queen.',
      en: 'Quiet room on the terrace level, sand-coloured tadelakt walls, queen bed.',
      ar: 'غرفة هادئة في مستوى السطح، جدران من التدلاكت بلون الرمل، سرير متوسط.',
    },
    description: {
      fr: 'La plus calme de la maison, au dernier étage, avec un accès direct à la terrasse. Murs en tadelakt sable, sol en terre cuite, salle d’eau avec douche. Le petit déjeuner peut être servi sur la terrasse.',
      en: 'The quietest room in the house, on the top floor with direct access to the terrace. Sand tadelakt walls, terracotta floor and a shower room. Breakfast can be served on the terrace.',
      ar: 'أهدأ غرف الدار، في الطابق الأخير مع مدخل مباشر إلى السطح. جدران من التدلاكت الرملي وأرضية من الطين المطبوخ وحمام بدوش. يمكن تقديم الفطور على السطح.',
    },
    size: 20,
    bed: { fr: 'Lit queen 160 × 200 cm', en: 'Queen bed 160 × 200 cm', ar: 'سرير 160 × 200 سم' },
    maxGuests: 2,
    priceMAD: 1100,
    amenities: ['ac', 'heating', 'wifi', 'safe', 'terraceAccess', 'shower', 'hairdryer', 'linen'],
    photos: ['terrace', 'dining', 'tea'],
    alt: [
      { fr: 'Terrasse en terre cuite sous des feuilles de bananier', en: 'Terracotta terrace under banana leaves', ar: 'سطح من الطين المطبوخ تحت أوراق الموز' },
      { fr: 'Table en mosaïque sous des arcs en brique', en: 'Mosaic table under brick arches', ar: 'طاولة من الفسيفساء تحت أقواس من الآجر' },
      { fr: 'Plateau de thé à la menthe sur une table en bois', en: 'Mint tea tray on a wooden table', ar: 'صينية شاي بالنعناع على طاولة خشبية' },
    ],
  },
];
