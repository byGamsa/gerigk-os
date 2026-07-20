import { useCallback, useMemo, type MouseEvent } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { getApp, pinnedApps } from '@/apps/registry';
import { usePresence } from '@/hooks/usePresence';
import { useT } from '@/hooks/useT';
import { anchorFromElement } from '@/lib/geometry';
import { activateFromTaskbar, closeAppWindows, launchApp } from '@/services/launcher';
import { useOsStore } from '@/store/os.store';
import type { AnyAppDefinition } from '@/types';
import type { TaskbarItem } from './Taskbar.types';

// Pinned apps + running unpinned apps (in launch order)
export function useTaskbar() {
  const { t, tr } = useT();

  const runningIds = useOsStore(
    useShallow((s) => {
      const open = Object.values(s.windows)
        .filter((w) => w.status !== 'closing')
        .sort((a, b) => a.openedAt - b.openedAt)
        .map((w) => w.appId);
      return [...new Set(open)];
    }),
  );
  const activeAppId = useOsStore((s) => {
    const w = s.activeId ? s.windows[s.activeId] : undefined;
    return w && w.status !== 'minimized' ? w.appId : null;
  });

  const list = useMemo<AnyAppDefinition[]>(() => {
    const extra = runningIds
      .map((id) => getApp(id))
      .filter((app): app is AnyAppDefinition => Boolean(app && !app.pinned));
    return [...pinnedApps, ...extra];
  }, [runningIds]);

  const presence = usePresence(list, (app) => app.id);

  const items: TaskbarItem[] = presence.map(({ item: app, phase }) => ({
    app,
    phase,
    running: runningIds.includes(app.id),
    active: activeAppId === app.id,
  }));

  const onActivate = useCallback((appId: string, el: HTMLElement) => activateFromTaskbar(appId, el), []);

  const onContextMenu = useCallback(
    (appId: string, e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const app = getApp(appId);
      if (!app) return;
      const el = e.currentTarget;
      const running = runningIds.includes(appId);
      useOsStore.getState().openMenu(
        [
          { type: 'label', label: tr(app.title) },
          { type: 'item', label: t('task.open'), icon: app.icon, onSelect: () => launchApp(appId, undefined, el) },
          ...(running
            ? [{ type: 'item' as const, label: t('task.closeAll'), icon: 'close' as const, onSelect: () => closeAppWindows(appId) }]
            : []),
        ],
        anchorFromElement(el),
        `task:${appId}`,
      );
    },
    [runningIds, t, tr],
  );

  const toggleStart = useCallback((el: HTMLElement) => {
    useOsStore.getState().toggleFlyout('start', anchorFromElement(el), 'taskbar');
  }, []);

  return { items, tr, t, onActivate, onContextMenu, toggleStart };
}
