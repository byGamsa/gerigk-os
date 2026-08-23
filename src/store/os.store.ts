import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { osConfig } from '@/config/os.config';
import { languages } from '@/i18n';
import type { OsStore, PersistedState } from './os.store.types';
import { createDesktopSlice } from './slices/desktop.slice';
import { createMediaSlice } from './slices/media.slice';
import { createSettingsSlice } from './slices/settings.slice';
import { createUiSlice } from './slices/ui.slice';
import { createWindowsSlice } from './slices/windows.slice';

export const useOsStore = create<OsStore>()(
  persist(
    (...a) => ({
      ...createSettingsSlice(...a),
      ...createWindowsSlice(...a),
      ...createDesktopSlice(...a),
      ...createUiSlice(...a),
      ...createMediaSlice(...a),
    }),
    {
      name: osConfig.storageKey,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s): PersistedState => ({
        lang: s.lang,
        muted: s.muted,
        welcomed: s.welcomed,
        iconPositions: s.iconPositions,
        shuffle: s.shuffle,
        repeat: s.repeat,
        volume: s.volume,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<PersistedState>;
        return {
          ...current,
          ...p,
          lang: p.lang && languages.includes(p.lang) ? p.lang : current.lang,
        };
      },
    },
  ),
);

export type { OsStore } from './os.store.types';
