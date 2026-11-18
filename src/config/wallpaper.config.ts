// Photos themselves are curated in wallpapers.manifest.json and synced with `npm run wallpapers:sync`
export const wallpaperConfig = {
  // Maximum delivered image width in pixels (4K)
  maxWidth: 3840,
  // App name for the attribution links back to Unsplash (utm_source)
  appName: 'gerigk_os',
} as const;
