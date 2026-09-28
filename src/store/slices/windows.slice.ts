import { layout } from '@/config/layout';
import { cascadeRect, getDeskArea, isMobileViewport, keepInViewport, positionedRect } from '@/lib/geometry';
import { createId } from '@/lib/math';
import type { WindowState } from '@/types';
import type { SliceCreator, WindowsSlice } from '../os.store.types';

const CLOSE_DURATION = 260;

// Topmost visible window (for focus changes after closing/minimizing)
function topVisible(windows: Record<string, WindowState>, excludeId?: string): WindowState | null {
  return (
    Object.values(windows)
      .filter((w) => w.id !== excludeId && w.status !== 'minimized' && w.status !== 'closing')
      .sort((a, b) => b.focusedAt - a.focusedAt)[0] ?? null
  );
}

export const createWindowsSlice: SliceCreator<WindowsSlice> = (set, get) => {
  // Updates a single window immutably
  const patch = (id: string, update: Partial<WindowState> | ((w: WindowState) => Partial<WindowState>)) =>
    set((s) => {
      const win = s.windows[id];
      if (!win) return s;
      const next = typeof update === 'function' ? update(win) : update;
      return { windows: { ...s.windows, [id]: { ...win, ...next } } };
    });

  return {
    windows: {},
    activeId: null,
    zTop: 10,
    focusSeq: 0,

    openWindow: (app, args, origin) => {
      const key = `${app.id}:${app.instanceKey ? app.instanceKey(args) : 'main'}`;
      const existing = Object.values(get().windows).find((w) => w.key === key && w.status !== 'closing');
      if (existing) {
        // Pass new args (e.g. a specific page) to the open window
        if (args && typeof args === 'object' && Object.keys(args).length > 0) patch(existing.id, { args });
        get().focusWindow(existing.id);
        return existing.id;
      }

      const id = createId('win');
      const area = getDeskArea();
      const openCount = Object.keys(get().windows).length;
      const size = {
        width: app.window?.width ?? layout.window.defaultWidth,
        height: app.window?.height ?? layout.window.defaultHeight,
      };
      const rect = app.window?.position ? positionedRect(size, area, app.window.position) : cascadeRect(size, area, openCount);
      const mobile = isMobileViewport();
      const z = get().zTop + 1;
      const focusedAt = get().focusSeq + 1;

      const win: WindowState = {
        id,
        appId: app.id,
        key,
        args,
        title: app.title,
        rect: mobile ? area : rect,
        prevRect: mobile ? rect : null,
        minSize: {
          width: app.window?.minWidth ?? layout.window.minWidth,
          height: app.window?.minHeight ?? layout.window.minHeight,
        },
        maximized: mobile,
        status: 'opening',
        animateGeometry: false,
        z,
        openedAt: Date.now(),
        focusedAt,
        origin,
      };

      set((s) => ({ windows: { ...s.windows, [id]: win }, activeId: id, zTop: z, focusSeq: focusedAt }));
      return id;
    },

    closeWindow: (id) => {
      const { windows, activeId } = get();
      if (!windows[id] || windows[id].status === 'closing') return;
      const next = activeId === id ? topVisible(windows, id) : null;
      patch(id, { status: 'closing' });
      if (activeId === id) set({ activeId: next?.id ?? null });
      window.setTimeout(() => get().removeWindow(id), CLOSE_DURATION);
    },

    removeWindow: (id) =>
      set((s) => {
        const { [id]: _removed, ...rest } = s.windows;
        return { windows: rest };
      }),

    minimizeWindow: (id) => {
      const { windows, activeId } = get();
      patch(id, { status: 'minimized' });
      if (activeId === id) set({ activeId: topVisible(windows, id)?.id ?? null });
    },

    restoreWindow: (id) => patch(id, { status: 'normal' }),

    focusWindow: (id) => {
      const win = get().windows[id];
      if (!win || win.status === 'closing') return;
      const z = win.z === get().zTop ? win.z : get().zTop + 1;
      const focusedAt = get().focusSeq + 1;
      set({ zTop: z, focusSeq: focusedAt, activeId: id });
      patch(id, (w) => ({ z, focusedAt, status: w.status === 'minimized' ? 'normal' : w.status }));
    },

    blurWindows: () => {
      if (get().activeId) set({ activeId: null });
    },

    toggleMaximize: (id) => {
      const win = get().windows[id];
      if (!win) return;
      if (win.maximized) {
        patch(id, { maximized: false, rect: win.prevRect ?? win.rect, animateGeometry: true });
      } else {
        get().maximizeWindow(id);
      }
    },

    maximizeWindow: (id) =>
      patch(id, (w) => ({ maximized: true, prevRect: w.rect, rect: getDeskArea(), animateGeometry: true })),

    unmaximizeTo: (id, rect) => patch(id, { maximized: false, rect, animateGeometry: false }),

    setWindowRect: (id, rect) => patch(id, { rect }),

    setWindowStatus: (id, status) => patch(id, { status }),

    setWindowTitle: (id, title) => patch(id, { title }),

    setWindowArgs: (id, args) => patch(id, { args }),

    clearGeometryAnimation: (id) => patch(id, { animateGeometry: false }),

    fitWindowsToViewport: () =>
      set((s) => {
        const area = getDeskArea();
        const windows = Object.fromEntries(
          Object.entries(s.windows).map(([id, w]) => [
            id,
            { ...w, rect: w.maximized ? area : keepInViewport(w.rect, area) },
          ]),
        );
        return { windows };
      }),
  };
};
