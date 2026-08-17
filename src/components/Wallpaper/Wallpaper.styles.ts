export const wallpaperStyles = {
  root: 'absolute inset-0 overflow-hidden bg-desk',
  layer: 'absolute inset-0 bg-cover bg-center bg-no-repeat',
  photo: 'animate-[wallpaper-fade_1.4s_cubic-bezier(.16,1,.3,1)_both]',
  // Bottom-left corner: photo credit
  corner: 'absolute bottom-3 left-3 z-[4] flex items-center gap-1.5 max-sm:bottom-desk-bottom max-sm:mb-1',
  credit:
    'glass-strong rounded-full px-3 py-1 text-[11px] font-medium text-ink-soft !shadow-none transition-colors hover:text-ink',
  creditBrand: 'text-ink-faint',
} as const;
