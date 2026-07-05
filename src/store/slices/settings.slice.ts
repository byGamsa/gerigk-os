import { osConfig } from '@/config/os.config';
import { nextLang } from '@/i18n';
import type { SettingsSlice, SliceCreator } from '../os.store.types';

export const createSettingsSlice: SliceCreator<SettingsSlice> = (set, get) => ({
  lang: osConfig.defaultLang,
  muted: false,
  welcomed: false,
  booting: true,

  setLang: (lang) => {
    document.documentElement.lang = lang;
    set({ lang });
  },
  toggleLang: () => get().setLang(nextLang(get().lang)),
  toggleMute: () => set((s) => ({ muted: !s.muted })),
  markWelcomed: () => set({ welcomed: true }),
  finishBoot: () => set({ booting: false }),
  restart: () => {
    set({ booting: true, flyout: null });
    window.setTimeout(() => window.location.reload(), 900);
  },
});
