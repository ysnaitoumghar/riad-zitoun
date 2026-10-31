import type { L10n, L10nList } from '../lib/l10n';

export interface Experience {
  id: string;
  title: L10n;
  short: L10n;
  details: L10nList; // bullet points shown when the card expands
  price: L10n; // free text so each riad can write "from 450 MAD per person"
  photo: string;
  alt: L10n;
}

export const experiences: Experience[] = [
  {
    id: 'cooking',
    title: { fr: 'Cours de cuisine', en: 'Cooking class', ar: 'درس في الطبخ' },
    short: { fr: 'Tajine et salades, avec la cuisinière de la maison.', en: 'Tagine and salads with the riad’s cook.', ar: 'طاجين وسلطات مع طباخة الدار.' },
    details: {
      fr: ['Visite du marché des épices le matin, 1 h', 'Préparation de 3 plats, 2 h 30', 'Déjeuner sur la terrasse avec ce que vous avez cuisiné', 'De 2 à 8 personnes'],
      en: ['Spice market visit in the morning, 1 h', 'Cooking three dishes, 2 h 30', 'Lunch on the terrace with what you cooked', '2 to 8 people'],
      ar: ['زيارة سوق التوابل صباحا، ساعة واحدة', 'تحضير ثلاثة أطباق، ساعتان ونصف', 'غداء على السطح بما طبختم', 'من شخصين إلى 8 أشخاص'],
    },
    price: { fr: '450 MAD par personne', en: '450 MAD per person', ar: '450 درهم للشخص' },
    photo: 'food',
    alt: { fr: 'Tajine de légumes et bols d’épices', en: 'Vegetable tagine and bowls of spices', ar: 'طاجين خضار وأوعية توابل' },
  },
  {
    id: 'hammam',
    title: { fr: 'Hammam et gommage', en: 'Hammam and scrub', ar: 'حمام وتقشير' },
    short: { fr: 'Hammam traditionnel au savon noir, gommage par une masseuse.', en: 'Traditional hammam with black soap, scrub by an attendant.', ar: 'حمام تقليدي بالصابون البلدي مع تقشير على يد مدلكة.' },
    details: {
      fr: ['Vapeur, savon noir et gommage au gant kessa, 45 min', 'Massage à l’huile d’argan en option, 30 min', 'Sur réservation, le matin ou en fin d’après-midi', 'Serviettes et thé fournis'],
      en: ['Steam, black soap and kessa glove scrub, 45 min', 'Argan oil massage optional, 30 min', 'By reservation, morning or late afternoon', 'Towels and tea provided'],
      ar: ['بخار وصابون بلدي وتقشير بالكيس، 45 دقيقة', 'تدليك بزيت الأركان اختياري، 30 دقيقة', 'بالحجز، صباحا أو في نهاية العصر', 'المناشف والشاي متوفران'],
    },
    price: { fr: '350 MAD le gommage, 600 MAD avec massage', en: '350 MAD scrub, 600 MAD with massage', ar: '350 درهم للتقشير، 600 درهم مع التدليك' },
    photo: 'hammam',
    alt: { fr: 'Bassin carrelé de zellige vert', en: 'Green zellige tiled pool', ar: 'حوض مبلط بالزليج الأخضر' },
  },
  {
    id: 'desert',
    title: { fr: 'Journée dans le désert d’Agafay', en: 'Day in the Agafay desert', ar: 'يوم في صحراء أكافاي' },
    short: { fr: 'Désert de pierres à 45 minutes de Marrakech, balade à dos de dromadaire.', en: 'Stone desert 45 minutes from Marrakech, with a camel ride.', ar: 'صحراء حجرية على بعد 45 دقيقة من مراكش مع جولة على الجمال.' },
    details: {
      fr: ['Départ à 15 h, retour vers 22 h', 'Balade à dos de dromadaire au coucher du soleil, 1 h', 'Dîner sous tente berbère', 'Transport privé aller-retour inclus'],
      en: ['Pick-up at 3 pm, back around 10 pm', 'Camel ride at sunset, 1 h', 'Dinner in a Berber tent', 'Private round-trip transport included'],
      ar: ['الانطلاق على الساعة 15:00 والعودة حوالي 22:00', 'جولة على الجمال عند الغروب، ساعة واحدة', 'عشاء في خيمة أمازيغية', 'النقل الخاص ذهابا وإيابا مشمول'],
    },
    price: { fr: '900 MAD par personne', en: '900 MAD per person', ar: '900 درهم للشخص' },
    photo: 'agafay',
    alt: { fr: 'Dromadaires couchés dans le désert d’Agafay', en: 'Camels resting in the Agafay desert', ar: 'جمال مستلقية في صحراء أكافاي' },
  },
  {
    id: 'transfer',
    title: { fr: 'Transfert depuis l’aéroport', en: 'Airport transfer', ar: 'النقل من المطار' },
    short: { fr: 'Un chauffeur vous attend à l’arrivée, puis un porteur vous guide dans la médina.', en: 'A driver meets you at arrivals, then a porter guides you through the medina.', ar: 'سائق ينتظركم في قاعة الوصول ثم حمّال يرافقكم داخل المدينة العتيقة.' },
    details: {
      fr: ['Aéroport Marrakech-Ménara, environ 20 minutes de route', 'Le véhicule s’arrête à la porte de la médina, 7 minutes à pied avec le porteur', 'De jour comme de nuit', 'Indiquez votre numéro de vol'],
      en: ['Marrakech Menara airport, about 20 minutes by road', 'The car stops at the medina gate, then 7 minutes on foot with the porter', 'Day or night', 'Send us your flight number'],
      ar: ['مطار مراكش المنارة، حوالي 20 دقيقة بالسيارة', 'تتوقف السيارة عند باب المدينة ثم 7 دقائق مشيا مع الحمّال', 'نهارا أو ليلا', 'أرسلوا لنا رقم الرحلة'],
    },
    price: { fr: '250 MAD par trajet, jusqu’à 3 personnes', en: '250 MAD each way, up to 3 people', ar: '250 درهم للرحلة، حتى 3 أشخاص' },
    photo: 'medina',
    alt: { fr: 'Ruelle de la médina avec une charrette', en: 'Medina alley with a cart', ar: 'زقاق في المدينة العتيقة مع عربة' },
  },
];
