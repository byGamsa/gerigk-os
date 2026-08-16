export const wallpaperConfig = {
  // Search term for random Unsplash photos; `null` = fully random (may yield unsuitable wallpapers)
  query: 'landscape nature' as string | null,
  // Photos loaded per API call (max. 30)
  batchSize: 30,
  // How long a loaded batch is reused in the browser
  cacheHours: 6,
  // Maximum image width in pixels (4K)
  maxWidth: 3840,
  // Quality of the delivered JPG/AVIF file (imgix, 1–100)
  quality: 85,
  // App name for the Unsplash attribution (utm_source)
  appName: 'gerigk_os',
} as const;
