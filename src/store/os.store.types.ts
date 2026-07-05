import type { StateCreator } from 'zustand';
import type {
  AnchorRect,
  FlyoutId,
  FlyoutState,
  Lang,
  MenuItem,
  Toast,
  ToastInput,
} from '@/types';

export interface SettingsSlice {
  lang: Lang;
  muted: boolean;
  welcomed: boolean;
  booting: boolean;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  toggleMute: () => void;
  markWelcomed: () => void;
  finishBoot: () => void;
  restart: () => void;
}

export interface UiSlice {
  flyout: FlyoutState | null;
  toasts: Toast[];
  toggleFlyout: (id: Exclude<FlyoutId, 'menu'>, anchor: AnchorRect, source: string) => void;
  openMenu: (items: MenuItem[], anchor: AnchorRect, source: string) => void;
  closeFlyout: () => void;
  notify: (toast: ToastInput) => void;
  dismissToast: (id: string) => void;
}

export type OsStore = SettingsSlice & UiSlice;

export type SliceCreator<T> = StateCreator<OsStore, [['zustand/persist', unknown]], [], T>;

// Persisted part of the store
export type PersistedState = Pick<OsStore, 'lang' | 'muted' | 'welcomed'>;
