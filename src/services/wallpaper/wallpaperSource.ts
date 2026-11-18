import { wallpaperConfig } from '@/config/wallpaper.config';
import data from '@/data/wallpapers.generated.json';
import type { Wallpaper, WallpaperFormat, WallpaperManifest, WallpaperPhoto } from '@/types';

const manifest = data as WallpaperManifest;
export const wallpaperPhotos: readonly WallpaperPhoto[] = manifest.baseUrl ? manifest.photos : [];

// Attribution links back to Unsplash carry utm parameters (Unsplash guideline, kept as good practice)
const withUtm = (url: string) => `${url}?utm_source=${wallpaperConfig.appName}&utm_medium=referral`;

export function toWallpaper(photo: WallpaperPhoto): Wallpaper {
  return {
    id: photo.id,
    color: photo.color,
    author: photo.author,
    authorUrl: withUtm(`https://unsplash.com/@${photo.username}`),
    photoUrl: withUtm(`https://unsplash.com/photos/${photo.id}`),
  };
}

// Smallest stored width that still covers the screen (bg-cover) at its pixel density
function pickWidth(photo: WallpaperPhoto): number {
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  // Screen instead of window; some environments report 0 → Full HD minimum
  const screenW = Math.max(window.screen.width, window.innerWidth) || 1920;
  const screenH = Math.max(window.screen.height, window.innerHeight) || 1080;
  const coverW = Math.max(screenW, screenH * (photo.width / photo.height)) * dpr;
  const needed = Math.min(coverW, wallpaperConfig.maxWidth);
  return photo.widths.find((w) => w >= needed) ?? photo.widths[photo.widths.length - 1]!;
}

export function wallpaperImageUrl(photo: WallpaperPhoto, format: WallpaperFormat): string {
  return `${manifest.baseUrl}/${photo.id}/${pickWidth(photo)}.${format}`;
}
