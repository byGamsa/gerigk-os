import { useCallback } from 'react';
import { apps } from '@/apps/registry';
import { useNow } from '@/hooks/useNow';
import { useSystemStatus } from '@/hooks/useSystemStatus';
import { useT } from '@/hooks/useT';
import { formatTime, formatWeekdayShort } from '@/lib/format';
import { anchorFromElement } from '@/lib/geometry';
import { launchApp } from '@/services/launcher';
import { useOsStore } from '@/store/os.store';
import type { AppCategory, FlyoutId, MenuItem } from '@/types';

export function useTopBar() {
  const now = useNow();
  const i18n = useT();
  const { t, tr, lang } = i18n;
  const status = useSystemStatus();
  const muted = useOsStore((s) => s.muted);
  const toggleMute = useOsStore((s) => s.toggleMute);
  const openSource = useOsStore((s) => (s.flyout ? `${s.flyout.id}@${s.flyout.source}` : null));

  // Dropdown with all apps of a category (or all apps)
  const openAppMenu = useCallback(
    (el: HTMLElement, source: string, category?: AppCategory) => {
      const list = apps.filter((a) => !a.hidden && (!category || a.category === category));
      const items: MenuItem[] = list.length
        ? list.map((app) => ({
            type: 'item',
            label: tr(app.title),
            icon: app.icon,
            onSelect: () => launchApp(app.id, undefined, el),
          }))
        : [{ type: 'label', label: t('menu.noGames') }];
      useOsStore.getState().openMenu(items, anchorFromElement(el), source);
    },
    [t, tr],
  );

  const toggle = useCallback((id: Exclude<FlyoutId, 'menu'>, el: HTMLElement) => {
    useOsStore.getState().toggleFlyout(id, anchorFromElement(el), 'topbar');
  }, []);

  return {
    ...i18n,
    ...status,
    muted,
    toggleMute,
    openSource,
    clock: `${formatWeekdayShort(now, lang)} ${formatTime(now, lang)}`,
    openApps: (el: HTMLElement) => openAppMenu(el, 'topbar:apps'),
    openGames: (el: HTMLElement) => openAppMenu(el, 'topbar:games', 'game'),
    toggle,
  };
}
