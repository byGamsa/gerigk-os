import type { StateCreator } from 'zustand';
import type {
  AnchorRect,
  AnyAppDefinition,
  FlyoutId,
  FlyoutState,
  GridCell,
  Lang,
  LocalizedValue,
  MenuItem,
  Point,
  Rect,
  Toast,
  ToastInput,
  WindowState,
  WindowStatus,
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

export interface WindowsSlice {
  windows: Record<string, WindowState>;
  activeId: string | null;
  zTop: number;
  focusSeq: number;
  // Opens a window – or focuses the existing one with the same instance key
  openWindow: (app: AnyAppDefinition, args: unknown, origin: Point | null) => string;
  closeWindow: (id: string) => void;
  removeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  blurWindows: () => void;
  toggleMaximize: (id: string) => void;
  maximizeWindow: (id: string) => void;
  // Un-maximize without animation (e.g. while dragging)
  unmaximizeTo: (id: string, rect: Rect) => void;
  setWindowRect: (id: string, rect: Rect) => void;
  setWindowStatus: (id: string, status: WindowStatus) => void;
  setWindowTitle: (id: string, title: LocalizedValue) => void;
  clearGeometryAnimation: (id: string) => void;
  fitWindowsToViewport: () => void;
}

export interface DesktopSlice {
  iconPositions: Record<string, GridCell>;
  snapPreview: boolean;
  setIconPosition: (appId: string, cell: GridCell) => void;
  resetIconPositions: () => void;
  setSnapPreview: (visible: boolean) => void;
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

export type OsStore = SettingsSlice & WindowsSlice & DesktopSlice & UiSlice;

export type SliceCreator<T> = StateCreator<OsStore, [['zustand/persist', unknown]], [], T>;

// Persisted part of the store
export type PersistedState = Pick<OsStore, 'lang' | 'muted' | 'welcomed' | 'iconPositions'>;
