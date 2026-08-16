import { wallpaperConfig } from '@/config/wallpaper.config';
import type { UnsplashPhoto, Wallpaper, WallpaperOrientation } from '@/types';

const API = 'https://api.unsplash.com';

export const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY?.trim() || null;

// Unsplash requires utm parameters on all links back to Unsplash
const withUtm = (url: string) =>
  `${url}${url.includes('?') ? '&' : '?'}utm_source=${wallpaperConfig.appName}&utm_medium=referral`;

function toWallpaper(photo: UnsplashPhoto): Wallpaper {
  return {
    id: photo.id,
    rawUrl: photo.urls.raw,
    color: photo.color,
    alt: photo.alt_description,
    author: photo.user.name,
    authorUrl: withUtm(photo.user.links.html),
    photoUrl: withUtm(photo.links.html),
    downloadLocation: photo.links.download_location,
  };
}

// Loads a batch of random photos (1 API call)
export async function fetchRandomWallpapers(orientation: WallpaperOrientation, key: string): Promise<Wallpaper[]> {
  const params = new URLSearchParams({
    count: String(wallpaperConfig.batchSize),
    orientation,
    content_filter: 'high',
  });
  if (wallpaperConfig.query) params.set('query', wallpaperConfig.query);

  const res = await fetch(`${API}/photos/random?${params}`, {
    headers: { Authorization: `Client-ID ${key}`, 'Accept-Version': 'v1' },
  });
  if (!res.ok) throw new Error(`Unsplash: HTTP ${res.status}`);
  const photos = (await res.json()) as UnsplashPhoto[];
  return photos.map(toWallpaper);
}

// Required by the Unsplash guidelines: report usage of a photo
export function trackWallpaperUse(wallpaper: Wallpaper, key: string) {
  void fetch(wallpaper.downloadLocation, { headers: { Authorization: `Client-ID ${key}` } }).catch(() => undefined);
}

// Image URL sized to the screen (incl. pixel density), cropped to its aspect ratio, AVIF/WebP where possible
export function wallpaperImageUrl(wallpaper: Wallpaper): string {
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  // Screen instead of window; some environments report 0 → Full HD minimum (w=0 would return the huge original)
  const screenW = Math.max(window.screen.width, window.innerWidth) || 1920;
  const screenH = Math.max(window.screen.height, window.innerHeight) || 1080;
  const scale = Math.min(1, wallpaperConfig.maxWidth / (screenW * dpr));
  const w = Math.round(screenW * dpr * scale);
  const h = Math.round(screenH * dpr * scale);

  const url = new URL(wallpaper.rawUrl);
  url.searchParams.set('w', String(w));
  url.searchParams.set('h', String(h));
  url.searchParams.set('fit', 'crop');
  url.searchParams.set('crop', 'entropy');
  url.searchParams.set('q', String(wallpaperConfig.quality));
  url.searchParams.set('auto', 'format');
  return url.toString();
}

export const currentOrientation = (): WallpaperOrientation =>
  window.screen.width >= window.screen.height ? 'landscape' : 'portrait';
