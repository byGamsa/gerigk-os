import type { DesktopSlice, SliceCreator } from '../os.store.types';

export const createDesktopSlice: SliceCreator<DesktopSlice> = (set) => ({
  iconPositions: {},
  snapPreview: false,
  wallpaperNonce: 0,

  setIconPosition: (appId, cell) => set((s) => ({ iconPositions: { ...s.iconPositions, [appId]: cell } })),
  resetIconPositions: () => set({ iconPositions: {} }),
  setSnapPreview: (visible) => set({ snapPreview: visible }),
  nextWallpaper: () => set((s) => ({ wallpaperNonce: s.wallpaperNonce + 1 })),
});
