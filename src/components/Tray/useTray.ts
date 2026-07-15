import { useCallback } from 'react';
import { useNow } from '@/hooks/useNow';
import { useSystemStatus } from '@/hooks/useSystemStatus';
import { useT } from '@/hooks/useT';
import { formatShortDate, formatTime } from '@/lib/format';
import { anchorFromElement } from '@/lib/geometry';
import { useOsStore } from '@/store/os.store';
import type { FlyoutId } from '@/types';

export function useTray() {
  const now = useNow();
  const i18n = useT();
  const status = useSystemStatus();
  const muted = useOsStore((s) => s.muted);
  const openFlyout = useOsStore((s) => (s.flyout?.source === 'tray' ? s.flyout.id : null));

  const toggle = useCallback((id: Exclude<FlyoutId, 'menu'>, el: HTMLElement) => {
    useOsStore.getState().toggleFlyout(id, anchorFromElement(el), 'tray');
  }, []);

  return {
    ...i18n,
    ...status,
    muted,
    openFlyout,
    time: formatTime(now, i18n.lang),
    date: formatShortDate(now, i18n.lang),
    toggle,
    toggleLang: useOsStore((s) => s.toggleLang),
    toggleMute: useOsStore((s) => s.toggleMute),
  };
}
