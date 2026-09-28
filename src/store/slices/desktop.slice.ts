import type { DesktopSlice, SliceCreator } from '../os.store.types';

export const createDesktopSlice: SliceCreator<DesktopSlice> = (set) => ({
  iconPositions: {},
  snapPreview: null,
  wallpaperNonce: 0,

  setIconPosition: (appId, cell) => set((s) => ({ iconPositions: { ...s.iconPositions, [appId]: cell } })),
  resetIconPositions: () => set({ iconPositions: {} }),
  setSnapPreview: (target) => set({ snapPreview: target }),
  nextWallpaper: () => set((s) => ({ wallpaperNonce: s.wallpaperNonce + 1 })),
});
