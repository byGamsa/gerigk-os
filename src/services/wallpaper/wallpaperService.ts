import type { Wallpaper, WallpaperCacheEntry, WallpaperOrientation } from '@/types';
import { currentOrientation, fetchRandomWallpapers, trackWallpaperUse, unsplashKey, wallpaperImageUrl } from './unsplash';
import { anyCachedWallpapers, cachedWallpapers, pickWallpaper, storeWallpapers } from './wallpaperCache';

export interface LoadedWallpaper {
  wallpaper: Wallpaper;
  // Fully loaded image URL at screen resolution
  src: string;
}

// Fully load and decode the image before showing it
async function preload(src: string): Promise<void> {
  const img = new Image();
  img.src = src;
  await img.decode();
}

// Fresh cache → else a new API batch → on error the last stored batch
async function getBatch(orientation: WallpaperOrientation, key: string): Promise<WallpaperCacheEntry | null> {
  const fresh = cachedWallpapers(orientation);
  if (fresh) return fresh;

  try {
    const photos = await fetchRandomWallpapers(orientation, key);
    return storeWallpapers(orientation, photos);
  } catch (error) {
    console.warn('[wallpaper]', error);
    return anyCachedWallpapers();
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
