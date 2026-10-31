import type { L10n, L10nList } from '../lib/l10n';

// Page copy that belongs to the riad (not to the interface). Edit freely when rebranding.

export const hero = {
  photo: 'courtyard',
  alt: {
    fr: 'Patio du riad avec bassin, orangers et portes en cèdre',
    en: 'Riad courtyard with a pool, orange trees and cedar doors',
    ar: 'باحة الرياض بحوض وأشجار برتقال وأبواب من الأرز',
  } satisfies L10n,
  // One array item per line, each line is revealed in turn.
  lines: {
    fr: ['Un patio calme', 'au cœur de la médina'],
    en: ['A quiet courtyard', 'in the heart of the medina'],
    ar: ['باحة هادئة', 'في قلب المدينة العتيقة'],
  } satisfies L10nList,
  sub: {
    fr: '3 chambres, un bassin, une terrasse. À 10 minutes à pied de Jemaa el-Fna.',
    en: '3 rooms, a plunge pool, a terrace. 10 minutes on foot from Jemaa el-Fna.',
    ar: '3 غرف، حوض سباحة صغير، وسطح. على بعد 10 دقائق مشيا من ساحة جامع الفنا.',
  } satisfies L10n,
};

export const intro = {
  title: {
    fr: 'Une maison de famille devenue maison d’hôtes',
    en: 'A family house turned guesthouse',
    ar: 'بيت عائلي صار دار ضيافة',
  } satisfies L10n,
  text: {
    fr: 'Le riad a été construit autour d’un patio et restauré en gardant le cèdre, le zellige et le tadelakt d’origine. Trois chambres seulement, donc le service reste simple : on connaît votre prénom, on prépare le petit déjeuner à l’heure que vous choisissez.',
    en: 'The riad was built around a courtyard and restored keeping its original cedar, zellige and tadelakt. With only three rooms the service stays simple: we know your name, and breakfast is served at the time you choose.',
    ar: 'بُني الرياض حول باحة وجرى ترميمه مع الحفاظ على الأرز والزليج والتدلاكت الأصلية. ثلاث غرف فقط، لذلك تبقى الخدمة بسيطة: نعرف أسماءكم ونقدم الفطور في الوقت الذي تختارونه.',
  } satisfies L10n,
  facts: [
    { value: '3', label: { fr: 'chambres', en: 'rooms', ar: 'غرف' } },
    { value: '10 min', label: { fr: 'à pied de Jemaa el-Fna', en: 'walk to Jemaa el-Fna', ar: 'مشيا إلى جامع الفنا' } },
    { value: '1100 MAD', label: { fr: 'la nuit, petit déjeuner inclus', en: 'per night, breakfast included', ar: 'لليلة، الفطور مشمول' } },
  ] as { value: string; label: L10n }[],
};

export interface Feature {
  id: string;
  title: L10n;
  text: L10n;
  photo: string;
  position?: string; // CSS object-position
  alt: L10n;
}

export const features: Feature[] = [
  {
    id: 'terrace',
    title: { fr: 'Terrasse sur les toits', en: 'Rooftop terrace', ar: 'سطح الدار' },
    text: {
      fr: 'Ouverte de 7 h à 23 h, avec vue sur les minarets et l’Atlas quand le ciel est dégagé. Thé à la menthe offert à 17 h.',
      en: 'Open from 7 am to 11 pm, with views of the minarets and the Atlas on clear days. Mint tea is free at 5 pm.',
      ar: 'مفتوح من 7 صباحا إلى 11 ليلا، بإطلالة على المآذن وجبال الأطلس عندما يصفو الجو. شاي بالنعناع مجاني على الساعة 17:00.',
    },
    photo: 'tea',
    alt: { fr: 'Thé à la menthe sur la terrasse', en: 'Mint tea on the terrace', ar: 'شاي بالنعناع على السطح' },
  },
  {
    id: 'pool',
    title: { fr: 'Bassin dans le patio', en: 'Courtyard plunge pool', ar: 'حوض الباحة' },
    text: {
      fr: 'Un bassin de 6 m sur 2 m, profond de 1,40 m, ombragé par les orangers. Il n’est pas chauffé : prévoyez de l’utiliser surtout d’avril à octobre.',
      en: 'A 6 m by 2 m pool, 1.4 m deep, shaded by orange trees. It is not heated, so it is best from April to October.',
      ar: 'حوض طوله 6 أمتار وعرضه مترين وعمقه 1.40 متر، تظلله أشجار البرتقال. غير مدفأ، لذا يُستعمل أكثر من أبريل إلى أكتوبر.',
    },
    photo: 'courtyard',
    position: '50% 90%',
    alt: { fr: 'Bassin du patio avec chaises longues', en: 'Courtyard pool with sun loungers', ar: 'حوض الباحة مع كراسي استلقاء' },
  },
  {
    id: 'hammam',
    title: { fr: 'Hammam privé', en: 'Private hammam', ar: 'حمام خاص' },
    text: {
      fr: 'Une petite salle en zellige pour deux ou trois personnes, chauffée à la demande. Réservation la veille, gommage possible avec une masseuse.',
      en: 'A small zellige room for two or three people, heated on request. Book the day before; a scrub with an attendant is available.',
      ar: 'قاعة صغيرة من الزليج لشخصين أو ثلاثة، تُسخّن عند الطلب. الحجز في اليوم السابق، ويمكن طلب تقشير مع مدلكة.',
    },
    photo: 'hammam',
    alt: { fr: 'Salle en zellige vert du hammam', en: 'Green zellige hammam room', ar: 'قاعة الحمام بالزليج الأخضر' },
  },
  {
    id: 'breakfast',
    title: { fr: 'Petit déjeuner', en: 'Breakfast', ar: 'الفطور' },
    text: {
      fr: 'Servi de 8 h à 11 h dans le patio ou sur la terrasse : msemen, baghrir, œufs, confitures maison, jus d’orange pressé, café et thé.',
      en: 'Served from 8 to 11 am in the courtyard or on the terrace: msemen, baghrir, eggs, homemade jams, fresh orange juice, coffee and tea.',
      ar: 'يُقدم من 8 إلى 11 صباحا في الباحة أو على السطح: مسمن وبغرير وبيض ومربى منزلية وعصير برتقال طازج وقهوة وشاي.',
    },
    photo: 'food',
    alt: { fr: 'Plats marocains sur une table', en: 'Moroccan dishes on a table', ar: 'أطباق مغربية على طاولة' },
  },
];

export const location = {
  intro: {
    fr: 'Le riad est dans un derb sans voiture, au sud de Jemaa el-Fna, dans le quartier de Riad Zitoun. Les taxis ne peuvent pas entrer : l’accès se fait à pied.',
    en: 'The riad is in a car-free derb south of Jemaa el-Fna, in the Riad Zitoun district. Taxis cannot enter, so the last part is on foot.',
    ar: 'يقع الرياض في درب خال من السيارات جنوب ساحة جامع الفنا، في حي رياض الزيتون. لا تدخل سيارات الأجرة، لذلك يكون الجزء الأخير مشيا.',
  } satisfies L10n,
  distances: [
    { place: { fr: 'Place Jemaa el-Fna', en: 'Jemaa el-Fna square', ar: 'ساحة جامع الفنا' }, value: { fr: '650 m, 10 min à pied', en: '650 m, 10 min on foot', ar: '650 م، 10 دقائق مشيا' } },
    { place: { fr: 'Palais de la Bahia', en: 'Bahia Palace', ar: 'قصر الباهية' }, value: { fr: '450 m, 7 min à pied', en: '450 m, 7 min on foot', ar: '450 م، 7 دقائق مشيا' } },
    { place: { fr: 'Aéroport Marrakech-Ménara', en: 'Marrakech Menara airport', ar: 'مطار مراكش المنارة' }, value: { fr: '6 km, 20 min en voiture', en: '6 km, 20 min by car', ar: '6 كم، 20 دقيقة بالسيارة' } },
    { place: { fr: 'Gare ONCF', en: 'ONCF train station', ar: 'محطة القطار' }, value: { fr: '4 km, 15 min en taxi', en: '4 km, 15 min by taxi', ar: '4 كم، 15 دقيقة بسيارة أجرة' } },
  ],
  // Step-by-step directions. These are sample directions for the fictional riad: rewrite for the real one.
  steps: {
    fr: [
      'Faites-vous déposer en taxi à la porte Bab Agnaou. Les voitures ne vont pas plus loin.',
      'Entrez dans la médina et suivez la rue Riad Zitoun el Kdim vers le nord-est, pendant environ 300 m.',
      'Après la deuxième fontaine, prenez la ruelle à gauche : c’est le derb Zitoun.',
      'Continuez 80 m. La porte en cèdre sculpté avec un heurtoir en laiton est au numéro 12.',
      'Sonnez, ou appelez-nous sur WhatsApp : quelqu’un vient vous ouvrir et porter vos bagages.',
    ],
    en: [
      'Take a taxi to the Bab Agnaou gate. Cars cannot go further.',
      'Walk into the medina and follow Rue Riad Zitoun el Kdim north-east for about 300 m.',
      'After the second fountain, turn left into the alley: this is Derb Zitoun.',
      'Keep going for 80 m. The carved cedar door with a brass knocker is number 12.',
      'Ring the bell, or message us on WhatsApp: someone will open the door and carry your bags.',
    ],
    ar: [
      'اطلبوا من سائق سيارة الأجرة أن يتوقف عند باب أكناو. لا تستطيع السيارات التقدم أكثر.',
      'ادخلوا المدينة العتيقة واتبعوا شارع رياض الزيتون القديم نحو الشمال الشرقي لمسافة 300 متر تقريبا.',
      'بعد النافورة الثانية، انعطفوا يسارا إلى الزقاق: هذا هو درب الزيتون.',
      'تابعوا 80 مترا. الباب من خشب الأرز المنحوت وعليه مطرقة نحاسية يحمل الرقم 12.',
      'اضغطوا الجرس أو راسلونا على واتساب: سيأتي من يفتح لكم ويحمل حقائبكم.',
    ],
  } satisfies L10nList,
};

export const faq: { q: L10n; a: L10n }[] = [
  {
    q: { fr: 'À quelle heure peut-on arriver et partir ?', en: 'What are check-in and check-out times?', ar: 'ما هي أوقات الوصول والمغادرة؟' },
    a: {
      fr: 'L’arrivée est possible à partir de 14 h, le départ avant 11 h. Si votre vol arrive tôt ou repart tard, nous gardons vos bagages gratuitement.',
      en: 'Check-in is from 2 pm and check-out before 11 am. If your flight lands early or leaves late, we store your luggage for free.',
      ar: 'يبدأ تسجيل الوصول من الساعة 14:00 والمغادرة قبل 11:00. إن كانت رحلتكم تصل مبكرا أو تغادر متأخرة نحفظ حقائبكم مجانا.',
    },
  },
  {
    q: { fr: 'Comment trouve-t-on le riad dans la médina ?', en: 'How do we find the riad in the medina?', ar: 'كيف نجد الرياض داخل المدينة؟' },
    a: {
      fr: 'Nous pouvons envoyer un porteur vous chercher à Bab Agnaou, ou à l’aéroport avec le transfert. Les indications pas à pas sont sur la page Accès.',
      en: 'We can send a porter to meet you at Bab Agnaou, or at the airport with the transfer. Step-by-step directions are on the Location page.',
      ar: 'يمكننا إرسال حمّال لاستقبالكم عند باب أكناو أو في المطار مع خدمة النقل. التوضيحات خطوة بخطوة في صفحة الموقع.',
    },
  },
  {
    q: { fr: 'Le petit déjeuner est-il inclus ?', en: 'Is breakfast included?', ar: 'هل الفطور مشمول؟' },
    a: {
      fr: 'Oui, dans tous les tarifs. Il est servi de 8 h à 11 h. Dites-nous vos allergies à la réservation.',
      en: 'Yes, in every rate. It is served from 8 to 11 am. Tell us about allergies when you book.',
      ar: 'نعم، في جميع الأسعار. يُقدم من 8 إلى 11 صباحا. أخبرونا بأي حساسية عند الحجز.',
    },
  },
  {
    q: { fr: 'Comment réserver et payer ?', en: 'How do I book and pay?', ar: 'كيف أحجز وأدفع؟' },
    a: {
      fr: 'Écrivez-nous sur WhatsApp avec vos dates : nous confirmons la disponibilité en quelques heures. Un acompte de 30 % garantit la chambre, le solde se règle sur place en dirhams ou en euros.',
      en: 'Message us on WhatsApp with your dates and we confirm availability within a few hours. A 30% deposit secures the room and the balance is paid on arrival in dirhams or euros.',
      ar: 'راسلونا على واتساب مع تواريخكم ونؤكد التوفر خلال ساعات. دفعة مقدمة بنسبة 30٪ تضمن الغرفة، والباقي يُدفع عند الوصول بالدرهم أو باليورو.',
    },
  },
  {
    q: { fr: 'Peut-on annuler gratuitement ?', en: 'Can I cancel for free?', ar: 'هل يمكن الإلغاء مجانا؟' },
    a: {
      fr: 'Oui, jusqu’à 7 jours avant l’arrivée. Passé ce délai, l’acompte n’est pas remboursé.',
      en: 'Yes, up to 7 days before arrival. After that the deposit is not refunded.',
      ar: 'نعم، حتى 7 أيام قبل الوصول. بعد ذلك لا تُسترد الدفعة المقدمة.',
    },
  },
  {
    q: { fr: 'Le riad convient-il aux enfants ?', en: 'Is the riad suitable for children?', ar: 'هل الرياض مناسب للأطفال؟' },
    a: {
      fr: 'Oui, à partir de 6 ans. Le bassin n’a pas de barrière et les escaliers sont raides : les enfants restent sous la surveillance de leurs parents.',
      en: 'Yes, from age 6. The pool has no fence and the stairs are steep, so children must be supervised.',
      ar: 'نعم، من عمر 6 سنوات. الحوض بلا سياج والدرج شديد الانحدار، لذا يجب مراقبة الأطفال.',
    },
  },
];
