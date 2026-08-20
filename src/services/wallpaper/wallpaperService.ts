import type { Wallpaper, WallpaperCacheEntry, WallpaperOrientation } from '@/types';
import {
  currentOrientation,
  fetchRandomWallpapers,
  trackWallpaperUse,
  UnsplashError,
  unsplashKey,
  wallpaperImageUrl,
} from './unsplash';
import {
  anyCachedWallpapers,
  blockedUntil,
  blockUntilNextHour,
  cachedWallpapers,
  pickWallpaper,
  storeWallpapers,
} from './wallpaperCache';

export interface LoadedWallpaper {
  wallpaper: Wallpaper;
  // Fully loaded image URL at screen resolution
  src: string;
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

// In-flight API request – concurrent calls (e.g. React StrictMode) share one request
let inFlight: Promise<WallpaperCacheEntry> | null = null;

// Fresh cache → else a new API batch → on error/limit the last stored batch (saves the hourly limit)
async function getBatch(orientation: WallpaperOrientation, key: string): Promise<WallpaperCacheEntry | null> {
  const fresh = cachedWallpapers(orientation);
  if (fresh) return fresh;

  const stale = anyCachedWallpapers();
  if (Date.now() < blockedUntil()) return stale;

  inFlight ??= fetchRandomWallpapers(orientation, key)
    .then((photos) => storeWallpapers(orientation, photos))
    .finally(() => {
      inFlight = null;
    });

  try {
    return await inFlight;
  } catch (error) {
    if (error instanceof UnsplashError && error.rateLimited) {
      blockUntilNextHour();
      console.info('[wallpaper] Unsplash-Stundenlimit erreicht – nächster Versuch zur vollen Stunde.');
    } else {
      console.warn('[wallpaper]', error);
    }
    return stale;
  }
}

// Random Unsplash wallpaper at screen resolution; `null` without API key or on failure (gray background)
export async function loadRandomWallpaper(): Promise<LoadedWallpaper | null> {
  if (!unsplashKey) return null;
  const entry = await getBatch(currentOrientation(), unsplashKey);
  if (!entry) return null;

  const wallpaper = pickWallpaper(entry);
  const src = wallpaperImageUrl(wallpaper);
  await preload(src);
  trackWallpaperUse(wallpaper, unsplashKey);
  return { wallpaper, src };
}
