export type Lang = 'fr' | 'en' | 'ar';
export type L10n = Record<Lang, string>;
export type L10nList = Record<Lang, string[]>;

export const langs: Lang[] = ['fr', 'en', 'ar'];
export const langNames: Record<Lang, string> = { fr: 'Français', en: 'English', ar: 'العربية' };
export const langShort: Record<Lang, string> = { fr: 'FR', en: 'EN', ar: 'ع' };
export const dir = (l: Lang) => (l === 'ar' ? 'rtl' : 'ltr');
export const tr = <T extends string | string[]>(v: Record<Lang, T>, l: Lang): T => v[l];

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
/** Prefix a path with the site base (GitHub Pages sub-path). */
export const href = (path = '/') => `${base}${path.startsWith('/') ? path : '/' + path}`;
export const pageUrl = (l: Lang, path = '') => href(`/${l}/${path}`.replace(/\/+$/, '/').replace(/^\/\//, '/'));

export const locales: Record<Lang, string> = { fr: 'fr-FR', en: 'en-GB', ar: 'ar-MA-u-nu-latn' };
export const money = (n: number, l: Lang, cur = 'MAD') => `${new Intl.NumberFormat(locales[l], { maximumFractionDigits: 0 }).format(n)} ${cur}`;
