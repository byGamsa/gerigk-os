// One self-hosted photo as written by `npm run wallpapers:sync` (src/data/wallpapers.generated.json)
export interface WallpaperPhoto {
  // Unsplash photo id, also the folder name in storage (`<id>/<width>.<format>`)
  id: string;
  author: string;
  // Unsplash username of the photographer
  username: string;
  width: number;
  height: number;
  // Dominant color as a placeholder while loading
  color: string;
  // Available widths in px, ascending
  widths: number[];
}

export interface WallpaperManifest {
  // Public URL prefix of the stored files (Supabase Storage bucket or /wallpapers)
  baseUrl: string;
  photos: WallpaperPhoto[];
}

// Normalized wallpaper for the UI
export interface Wallpaper {
  id: string;
  color: string;
  author: string;
  authorUrl: string;
  photoUrl: string;
}

export type WallpaperFormat = 'avif' | 'webp';
