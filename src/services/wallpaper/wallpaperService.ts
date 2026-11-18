import { osConfig } from '@/config/os.config';
import type { Wallpaper, WallpaperFormat, WallpaperPhoto } from '@/types';
import { toWallpaper, wallpaperImageUrl, wallpaperPhotos } from './wallpaperSource';

export interface LoadedWallpaper {
  wallpaper: Wallpaper;
  // Fully loaded image URL at screen resolution
  src: string;
}

// Context menu / terminal only offer "next wallpaper" when photos are synced
export const hasWallpapers = wallpaperPhotos.length > 0;

const LAST_KEY = `${osConfig.storageKey}:wallpaper-last`;

// Leftovers of the former Unsplash API cache
try {
  localStorage.removeItem(`${osConfig.storageKey}:wallpapers`);
  localStorage.removeItem(`${osConfig.storageKey}:unsplash-blocked-until`);
} catch {
  // Storage blocked – nothing to clean up
}

function readLast(): string | null {
  try {
    return localStorage.getItem(LAST_KEY);
  } catch {
    return null;
  }
}

function writeLast(id: string) {
  try {
    localStorage.setItem(LAST_KEY, id);
  } catch {
    // Storage blocked – repeats across visits are then possible
  }
}

// Random photo – never the same one twice in a row (also across visits)
function pickPhoto(): WallpaperPhoto {
  const last = readLast();
  const candidates = wallpaperPhotos.filter((p) => p.id !== last);
  const pool = candidates.length ? candidates : wallpaperPhotos;
  const picked = pool[Math.floor(Math.random() * pool.length)]!;
  writeLast(picked.id);
  return picked;
}

// Fully load the image before showing it; `onload` instead of `decode()` (hangs in background tabs)
function preload(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Hintergrund konnte nicht geladen werden: ${src}`));
    img.src = src;
  });
}

// AVIF first; browsers without AVIF fail to load it once and stay on WebP afterwards
let formats: WallpaperFormat[] = ['avif', 'webp'];

// Random self-hosted wallpaper at screen resolution; `null` without photos or on failure (gray background)
export async function loadRandomWallpaper(): Promise<LoadedWallpaper | null> {
  if (!hasWallpapers) return null;
  const photo = pickPhoto();

  for (const format of formats) {
    const src = wallpaperImageUrl(photo, format);
    try {
      await preload(src);
      return { wallpaper: toWallpaper(photo), src };
    } catch {
      if (format === 'avif') formats = ['webp'];
    }
  }
  console.warn('[wallpaper] Hintergrund konnte nicht geladen werden – grauer Hintergrund.');
  return null;
}
