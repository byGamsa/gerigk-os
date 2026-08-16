// Used part of the Unsplash API response (GET /photos/random)
export interface UnsplashPhoto {
  id: string;
  width: number;
  height: number;
  color: string | null;
  alt_description: string | null;
  urls: { raw: string };
  links: { html: string; download_location: string };
  user: { name: string; links: { html: string } };
}

// Normalized wallpaper – independent of the source
export interface Wallpaper {
  id: string;
  // Base URL (Unsplash `urls.raw`), size is added when loading
  rawUrl: string;
  // Average color as a placeholder while loading
  color: string | null;
  alt: string | null;
  author: string;
  authorUrl: string;
  photoUrl: string;
  // Must be called on use per Unsplash guidelines
  downloadLocation: string;
}

export interface WallpaperCacheEntry {
  fetchedAt: number;
  query: string | null;
  orientation: WallpaperOrientation;
  photos: Wallpaper[];
  lastShownId: string | null;
}

export type WallpaperOrientation = 'landscape' | 'portrait';
