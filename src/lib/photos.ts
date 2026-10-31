import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/photos/*.{jpg,jpeg,png,webp}', { eager: true });

/** Look up a photo by file name (without extension) from src/assets/photos. */
export function photo(name: string): ImageMetadata {
  const key = Object.keys(files).find((k) => k.split('/').pop()!.replace(/\.[a-z]+$/, '') === name);
  if (!key) throw new Error(`Photo "${name}" not found in src/assets/photos`);
  return files[key].default;
}
