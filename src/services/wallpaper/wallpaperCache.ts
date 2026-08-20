import { osConfig } from '@/config/os.config';
import { wallpaperConfig } from '@/config/wallpaper.config';
import type { Wallpaper, WallpaperCacheEntry, WallpaperOrientation } from '@/types';

const STORAGE_KEY = `${osConfig.storageKey}:wallpapers`;

function read(): WallpaperCacheEntry | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WallpaperCacheEntry) : null;
  } catch {
    return null;
  }
}

function write(entry: WallpaperCacheEntry) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
  } catch {
    // Storage full/blocked – continue without cache
  }
}

// Stored batch, if still fresh and matching search term/orientation
export function cachedWallpapers(orientation: WallpaperOrientation): WallpaperCacheEntry | null {
  const entry = read();
  if (!entry || entry.photos.length === 0) return null;
  const fresh = Date.now() - entry.fetchedAt < wallpaperConfig.cacheHours * 3_600_000;
  const matches = entry.query === wallpaperConfig.query && entry.orientation === orientation;
  return fresh && matches ? entry : null;
}

// Any stored batch – fallback when the API is not delivering
export function anyCachedWallpapers(): WallpaperCacheEntry | null {
  const entry = read();
  return entry && entry.photos.length > 0 ? entry : null;
}

// ---------- Block after hitting the hourly limit ----------

const BLOCK_KEY = `${osConfig.storageKey}:unsplash-blocked-until`;

export function blockedUntil(): number {
  try {
    return Number(localStorage.getItem(BLOCK_KEY)) || 0;
  } catch {
    return 0;
  }
}

// Unsplash resets the limit hourly → don't ask again until the next full hour
export function blockUntilNextHour() {
  const next = new Date();
  next.setHours(next.getHours() + 1, 0, 30, 0);
  try {
    localStorage.setItem(BLOCK_KEY, String(next.getTime()));
  } catch {
    // ignore
  }
}

export function storeWallpapers(orientation: WallpaperOrientation, photos: Wallpaper[]): WallpaperCacheEntry {
  const entry: WallpaperCacheEntry = {
    fetchedAt: Date.now(),
    query: wallpaperConfig.query,
    orientation,
    photos,
    lastShownId: read()?.lastShownId ?? null,
  };
  write(entry);
  return entry;
}

// Random photo – never the same one twice in a row
export function pickWallpaper(entry: WallpaperCacheEntry): Wallpaper {
  const candidates = entry.photos.filter((p) => p.id !== entry.lastShownId);
  const pool = candidates.length ? candidates : entry.photos;
  const picked = pool[Math.floor(Math.random() * pool.length)]!;
  write({ ...entry, lastShownId: picked.id });
  return picked;
}
