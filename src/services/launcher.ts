import { getApp } from '@/apps/registry';
import { centerOf } from '@/lib/geometry';
import { useOsStore } from '@/store/os.store';
import type { AppId } from '@/types';

// Bridges app registry and window store; `origin` is the element the window grows out of
export function launchApp<TArgs>(appId: AppId, args?: TArgs, origin?: Element | null): string | null {
  const app = getApp(appId);
  if (!app) {
    console.warn(`[launcher] Unbekannte App: ${appId}`);
    return null;
  }
  const store = useOsStore.getState();
  store.closeFlyout();
  return store.openWindow(app, args ?? {}, origin ? centerOf(origin) : null);
}

// Taskbar click: not running → launch · active → minimize · otherwise → restore & focus
export function activateFromTaskbar(appId: AppId, origin: Element) {
  const store = useOsStore.getState();
  const windows = Object.values(store.windows).filter((w) => w.appId === appId && w.status !== 'closing');
  if (windows.length === 0) {
    launchApp(appId, undefined, origin);
    return;
  }
  const active = store.activeId ? store.windows[store.activeId] : undefined;
  if (active && active.appId === appId && active.status !== 'minimized') {
    store.minimizeWindow(active.id);
    return;
  }
  const target = [...windows].sort((a, b) => b.focusedAt - a.focusedAt)[0];
  if (target) store.focusWindow(target.id);
}

export function closeAppWindows(appId: AppId) {
  const store = useOsStore.getState();
  Object.values(store.windows)
    .filter((w) => w.appId === appId)
    .forEach((w) => store.closeWindow(w.id));
}
