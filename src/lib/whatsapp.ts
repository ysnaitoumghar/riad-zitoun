import { site } from '../config/site';

/** wa.me link with a pre-filled message. */
export const waLink = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
