import type { DesktopSlice, SliceCreator } from '../os.store.types';

export const createDesktopSlice: SliceCreator<DesktopSlice> = (set) => ({
  iconPositions: {},
  snapPreview: false,

  setIconPosition: (appId, cell) => set((s) => ({ iconPositions: { ...s.iconPositions, [appId]: cell } })),
  resetIconPositions: () => set({ iconPositions: {} }),
  setSnapPreview: (visible) => set({ snapPreview: visible }),
});
