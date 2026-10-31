import type { Lang } from '../lib/l10n';

// Interface strings. Booking panel strings are passed to the browser as JSON, so keep them short.
type Dict = {
  nav: { home: string; rooms: string; riad: string; experiences: string; location: string; faq: string; contact: string; menu: string; close: string; language: string; skip: string };
  cta: { whatsapp: string; book: string; seeRooms: string; seeRoom: string; askWhatsapp: string; viewAll: string; openMap: string; fromPrice: string; perNight: string };
  sections: Record<string, { title: string; sub?: string }>;
  room: { size: string; bed: string; guests: string; amenities: string; back: string; price: string; guestsMax: string; breakfast: string; otherRooms: string };
  booking: {
    title: string; checkIn: string; checkOut: string; guests: string; room: string; nights: (n: number) => string; total: string; approx: string;
    pickDates: string; minusGuest: string; plusGuest: string; perNightLine: string; breakfastIncluded: string; opens: string;
    guestsN: (n: number) => string;
    msg: (p: { name: string; room: string; from: string; to: string; nightsLabel: string; guestsLabel: string; total: string }) => string;
  };
  generic: { whatsappMsg: (name: string) => string; roomMsg: (name: string, room: string) => string; expMsg: (name: string, exp: string) => string };
  reviews: { sample: string; rating: (n: number) => string };
  viewer: { open: string; close: string; prev: string; next: string; counter: (i: number, n: number) => string; hint: string };
  location: { distances: string; directions: string; mapLabel: string; mapActivate: string; address: string; maps: string };
  contact: { whatsapp: string; email: string; phone: string; address: string; hours: string; hoursValue: string };
  footer: { rights: string; demo: string; photos: string };
  amenities: Record<string, string>;
  notFound: { title: string; text: string; home: string };
  meta: { homeTitle: string; homeDesc: string; locationTitle: string };
};

const fr: Dict = {
  nav: { home: 'Accueil', rooms: 'Chambres', riad: 'Le riad', experiences: 'Expériences', location: 'Accès', faq: 'Questions', contact: 'Contact', menu: 'Menu', close: 'Fermer', language: 'Langue', skip: 'Aller au contenu' },
  cta: { whatsapp: 'Réserver sur WhatsApp', book: 'Réserver', seeRooms: 'Voir les chambres', seeRoom: 'Voir la chambre', askWhatsapp: 'Demander sur WhatsApp', viewAll: 'Tout voir', openMap: 'Ouvrir dans OpenStreetMap', fromPrice: 'à partir de', perNight: 'par nuit' },
  sections: {
    rooms: { title: 'Les chambres', sub: 'Trois chambres autour du patio. Petit déjeuner inclus.' },
    riad: { title: 'Le riad', sub: 'Ce que vous trouverez dans la maison.' },
    booking: { title: 'Réservez votre séjour', sub: 'Choisissez vos dates : le total se calcule, puis la demande part sur WhatsApp.' },
    experiences: { title: 'Expériences', sub: 'Touchez une carte pour voir le détail et le prix.' },
    location: { title: 'Où nous trouver', sub: 'Dans la médina, à pied de Jemaa el-Fna.' },
    reviews: { title: 'Avis des voyageurs' },
    faq: { title: 'Questions fréquentes' },
    contact: { title: 'Nous contacter', sub: 'Nous répondons sur WhatsApp, en général dans l’heure, de 8 h à 22 h.' },
    gallery: { title: 'Photos' },
  },
  room: { size: 'Surface', bed: 'Couchage', guests: 'Voyageurs', amenities: 'Équipements', back: 'Toutes les chambres', price: 'Tarif', guestsMax: 'personnes maximum', breakfast: 'Petit déjeuner inclus', otherRooms: 'Autres chambres' },
  booking: {
    title: 'Réserver', checkIn: 'Arrivée', checkOut: 'Départ', guests: 'Voyageurs', room: 'Chambre',
    nights: (n) => `${n} ${n > 1 ? 'nuits' : 'nuit'}`, total: 'Total', approx: 'environ', pickDates: 'Choisissez vos dates pour voir le total.',
    minusGuest: 'Un voyageur de moins', plusGuest: 'Un voyageur de plus', perNightLine: 'par nuit', breakfastIncluded: 'Petit déjeuner inclus', opens: 'Ouvre WhatsApp avec votre demande déjà écrite.',
    guestsN: (n) => `${n} ${n > 1 ? 'personnes' : 'personne'}`,
    msg: (p) => `Bonjour ${p.name}, je voudrais réserver : ${p.room}, du ${p.from} au ${p.to} (${p.nightsLabel}), pour ${p.guestsLabel}. Total indicatif : ${p.total}. Est-ce disponible ?`,
  },
  generic: {
    whatsappMsg: (n) => `Bonjour ${n}, j’aimerais réserver une chambre. Pouvez-vous m’aider ?`,
    roomMsg: (n, r) => `Bonjour ${n}, je suis intéressé(e) par : ${r}. Est-elle disponible ?`,
    expMsg: (n, e) => `Bonjour ${n}, j’aimerais des informations sur : ${e}.`,
  },
  reviews: { sample: 'Exemples d’avis pour cette démonstration, pas de vrais voyageurs.', rating: (n) => `Note ${n} sur 5` },
  viewer: { open: 'Agrandir la photo', close: 'Fermer', prev: 'Photo précédente', next: 'Photo suivante', counter: (i, n) => `Photo ${i} sur ${n}`, hint: 'Pincez pour zoomer, glissez vers le bas pour fermer' },
  location: { distances: 'Distances', directions: 'Comment venir, pas à pas', mapLabel: 'Carte OpenStreetMap', mapActivate: 'Toucher pour déplacer la carte', address: 'Adresse', maps: 'Voir sur la carte' },
  contact: { whatsapp: 'WhatsApp', email: 'E-mail', phone: 'Téléphone', address: 'Adresse', hours: 'Réception', hoursValue: 'Tous les jours, 8 h à 22 h' },
  footer: { rights: 'Site de démonstration.', demo: 'Riad fictif créé comme exemple de site pour maisons d’hôtes.', photos: 'Photos' },
  amenities: { ac: 'Climatisation', heating: 'Chauffage', wifi: 'Wi-Fi rapide', safe: 'Coffre-fort', courtyardView: 'Vue sur le patio', terraceAccess: 'Accès à la terrasse', bathtub: 'Baignoire', shower: 'Douche à l’italienne', teaSet: 'Plateau de thé', hairdryer: 'Sèche-cheveux', linen: 'Linge de lit en coton' },
  notFound: { title: 'Page introuvable', text: 'Cette page n’existe pas ou a été déplacée.', home: 'Retour à l’accueil' },
  meta: { homeTitle: 'Maison d’hôtes à Marrakech', homeDesc: 'Riad de 3 chambres dans la médina de Marrakech, à 10 minutes à pied de Jemaa el-Fna. Petit déjeuner inclus. Réservation sur WhatsApp.', locationTitle: 'Accès et plan' },
};

const en: Dict = {
  nav: { home: 'Home', rooms: 'Rooms', riad: 'The riad', experiences: 'Experiences', location: 'Location', faq: 'FAQ', contact: 'Contact', menu: 'Menu', close: 'Close', language: 'Language', skip: 'Skip to content' },
  cta: { whatsapp: 'Book on WhatsApp', book: 'Book', seeRooms: 'See the rooms', seeRoom: 'View room', askWhatsapp: 'Ask on WhatsApp', viewAll: 'View all', openMap: 'Open in OpenStreetMap', fromPrice: 'from', perNight: 'per night' },
  sections: {
    rooms: { title: 'The rooms', sub: 'Three rooms around the courtyard. Breakfast included.' },
    riad: { title: 'The riad', sub: 'What you will find in the house.' },
    booking: { title: 'Plan your stay', sub: 'Pick your dates: the total updates, then the request goes to WhatsApp.' },
    experiences: { title: 'Experiences', sub: 'Tap a card for details and price.' },
    location: { title: 'Where to find us', sub: 'In the medina, within walking distance of Jemaa el-Fna.' },
    reviews: { title: 'Guest reviews' },
    faq: { title: 'Frequently asked questions' },
    contact: { title: 'Get in touch', sub: 'We reply on WhatsApp, usually within the hour, from 8 am to 10 pm.' },
    gallery: { title: 'Photos' },
  },
  room: { size: 'Size', bed: 'Bed', guests: 'Guests', amenities: 'Amenities', back: 'All rooms', price: 'Rate', guestsMax: 'guests maximum', breakfast: 'Breakfast included', otherRooms: 'Other rooms' },
  booking: {
    title: 'Book', checkIn: 'Check-in', checkOut: 'Check-out', guests: 'Guests', room: 'Room',
    nights: (n) => `${n} ${n > 1 ? 'nights' : 'night'}`, total: 'Total', approx: 'about', pickDates: 'Pick your dates to see the total.',
    minusGuest: 'One guest less', plusGuest: 'One guest more', perNightLine: 'per night', breakfastIncluded: 'Breakfast included', opens: 'Opens WhatsApp with your request already written.',
    guestsN: (n) => `${n} ${n > 1 ? 'guests' : 'guest'}`,
    msg: (p) => `Hello ${p.name}, I would like to book: ${p.room}, from ${p.from} to ${p.to} (${p.nightsLabel}), for ${p.guestsLabel}. Estimated total: ${p.total}. Is it available?`,
  },
  generic: {
    whatsappMsg: (n) => `Hello ${n}, I would like to book a room. Can you help me?`,
    roomMsg: (n, r) => `Hello ${n}, I am interested in: ${r}. Is it available?`,
    expMsg: (n, e) => `Hello ${n}, I would like more information about: ${e}.`,
  },
  reviews: { sample: 'Sample reviews for this demo, not real guests.', rating: (n) => `Rated ${n} out of 5` },
  viewer: { open: 'Enlarge photo', close: 'Close', prev: 'Previous photo', next: 'Next photo', counter: (i, n) => `Photo ${i} of ${n}`, hint: 'Pinch to zoom, swipe down to close' },
  location: { distances: 'Distances', directions: 'How to get here, step by step', mapLabel: 'OpenStreetMap map', mapActivate: 'Tap to move the map', address: 'Address', maps: 'See on the map' },
  contact: { whatsapp: 'WhatsApp', email: 'Email', phone: 'Phone', address: 'Address', hours: 'Reception', hoursValue: 'Every day, 8 am to 10 pm' },
  footer: { rights: 'Demo website.', demo: 'A fictional riad created as a sample site for guesthouses.', photos: 'Photos' },
  amenities: { ac: 'Air conditioning', heating: 'Heating', wifi: 'Fast Wi-Fi', safe: 'Safe', courtyardView: 'Courtyard view', terraceAccess: 'Terrace access', bathtub: 'Bathtub', shower: 'Walk-in shower', teaSet: 'Tea tray', hairdryer: 'Hairdryer', linen: 'Cotton bed linen' },
  notFound: { title: 'Page not found', text: 'This page does not exist or has moved.', home: 'Back to home' },
  meta: { homeTitle: 'Guesthouse in Marrakech', homeDesc: 'Three-room riad in the Marrakech medina, 10 minutes on foot from Jemaa el-Fna. Breakfast included. Book on WhatsApp.', locationTitle: 'Location and directions' },
};

const ar: Dict = {
  nav: { home: 'الرئيسية', rooms: 'الغرف', riad: 'الرياض', experiences: 'التجارب', location: 'الموقع', faq: 'أسئلة', contact: 'اتصال', menu: 'القائمة', close: 'إغلاق', language: 'اللغة', skip: 'انتقل إلى المحتوى' },
  cta: { whatsapp: 'احجز عبر واتساب', book: 'احجز', seeRooms: 'شاهد الغرف', seeRoom: 'عرض الغرفة', askWhatsapp: 'اسأل عبر واتساب', viewAll: 'عرض الكل', openMap: 'فتح في OpenStreetMap', fromPrice: 'ابتداء من', perNight: 'لليلة' },
  sections: {
    rooms: { title: 'الغرف', sub: 'ثلاث غرف حول الباحة. الفطور مشمول.' },
    riad: { title: 'الرياض', sub: 'ما ستجدونه في الدار.' },
    booking: { title: 'خططوا لإقامتكم', sub: 'اختاروا التواريخ فيُحسب المجموع، ثم يُرسل الطلب عبر واتساب.' },
    experiences: { title: 'التجارب', sub: 'المسوا البطاقة لمعرفة التفاصيل والسعر.' },
    location: { title: 'كيف تجدوننا', sub: 'في المدينة العتيقة، مشيا من ساحة جامع الفنا.' },
    reviews: { title: 'آراء الضيوف' },
    faq: { title: 'الأسئلة الشائعة' },
    contact: { title: 'تواصلوا معنا', sub: 'نرد عبر واتساب، غالبا خلال ساعة، من 8 صباحا إلى 10 ليلا.' },
    gallery: { title: 'الصور' },
  },
  room: { size: 'المساحة', bed: 'السرير', guests: 'النزلاء', amenities: 'التجهيزات', back: 'كل الغرف', price: 'السعر', guestsMax: 'أشخاص كحد أقصى', breakfast: 'الفطور مشمول', otherRooms: 'غرف أخرى' },
  booking: {
    title: 'احجز', checkIn: 'الوصول', checkOut: 'المغادرة', guests: 'النزلاء', room: 'الغرفة',
    nights: (n) => (n === 1 ? 'ليلة واحدة' : n === 2 ? 'ليلتان' : n <= 10 ? `${n} ليال` : `${n} ليلة`), total: 'المجموع', approx: 'حوالي', pickDates: 'اختاروا التواريخ لمعرفة المجموع.',
    minusGuest: 'نزيل أقل', plusGuest: 'نزيل أكثر', perNightLine: 'لليلة', breakfastIncluded: 'الفطور مشمول', opens: 'يفتح واتساب مع طلبكم مكتوبا مسبقا.',
    guestsN: (n) => (n === 1 ? 'نزيل واحد' : n === 2 ? 'نزيلين' : `${n} نزلاء`),
    msg: (p) => `مرحبا ${p.name}، أود حجز: ${p.room}، من ${p.from} إلى ${p.to} (${p.nightsLabel})، لـ ${p.guestsLabel}. المجموع التقريبي: ${p.total}. هل هي متوفرة؟`,
  },
  generic: {
    whatsappMsg: (n) => `مرحبا ${n}، أود حجز غرفة. هل يمكنكم مساعدتي؟`,
    roomMsg: (n, r) => `مرحبا ${n}، أنا مهتم بـ: ${r}. هل هي متوفرة؟`,
    expMsg: (n, e) => `مرحبا ${n}، أود معلومات عن: ${e}.`,
  },
  reviews: { sample: 'آراء نموذجية لهذا العرض التجريبي، وليست لضيوف حقيقيين.', rating: (n) => `التقييم ${n} من 5` },
  viewer: { open: 'تكبير الصورة', close: 'إغلاق', prev: 'الصورة السابقة', next: 'الصورة التالية', counter: (i, n) => `الصورة ${i} من ${n}`, hint: 'اقرصوا للتكبير واسحبوا للأسفل للإغلاق' },
  location: { distances: 'المسافات', directions: 'كيف تصلون، خطوة بخطوة', mapLabel: 'خريطة OpenStreetMap', mapActivate: 'المس لتحريك الخريطة', address: 'العنوان', maps: 'عرض على الخريطة' },
  contact: { whatsapp: 'واتساب', email: 'البريد الإلكتروني', phone: 'الهاتف', address: 'العنوان', hours: 'الاستقبال', hoursValue: 'كل يوم، من 8 صباحا إلى 10 ليلا' },
  footer: { rights: 'موقع تجريبي.', demo: 'رياض وهمي أُنشئ كنموذج لمواقع دور الضيافة.', photos: 'الصور' },
  amenities: { ac: 'تكييف', heating: 'تدفئة', wifi: 'واي فاي سريع', safe: 'خزنة', courtyardView: 'إطلالة على الباحة', terraceAccess: 'مدخل إلى السطح', bathtub: 'حوض استحمام', shower: 'دوش', teaSet: 'صينية شاي', hairdryer: 'مجفف شعر', linen: 'أغطية سرير قطنية' },
  notFound: { title: 'الصفحة غير موجودة', text: 'هذه الصفحة غير موجودة أو تم نقلها.', home: 'العودة إلى الرئيسية' },
  meta: { homeTitle: 'دار ضيافة في مراكش', homeDesc: 'رياض من ثلاث غرف في المدينة العتيقة بمراكش، على بعد 10 دقائق مشيا من جامع الفنا. الفطور مشمول. الحجز عبر واتساب.', locationTitle: 'الموقع والاتجاهات' },
};

export const ui: Record<Lang, Dict> = { fr, en, ar };
export type { Dict };
