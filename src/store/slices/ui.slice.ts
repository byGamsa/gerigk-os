import { osConfig } from '@/config/os.config';
import { createId } from '@/lib/math';
import type { SliceCreator, UiSlice } from '../os.store.types';

export const createUiSlice: SliceCreator<UiSlice> = (set, get) => ({
  flyout: null,
  toasts: [],

  toggleFlyout: (id, anchor, source) => {
    const current = get().flyout;
    if (current?.id === id && current.source === source) return set({ flyout: null });
    set({ flyout: { id, anchor, source, openedAt: Date.now() } });
  },

  openMenu: (items, anchor, source) => {
    const current = get().flyout;
    // Same trigger (e.g. top bar "Apps") → close
    if (current?.id === 'menu' && current.source === source && anchor.kind === 'bar') return set({ flyout: null });
    set({ flyout: { id: 'menu', anchor, source, items, openedAt: Date.now() } });
  },

  closeFlyout: () => {
    if (get().flyout) set({ flyout: null });
  },

  notify: (toast) => {
    const id = createId('toast');
    set((s) => ({ toasts: [...s.toasts.slice(-3), { timeout: osConfig.toastTimeout, ...toast, id }] }));
  },

  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
});
