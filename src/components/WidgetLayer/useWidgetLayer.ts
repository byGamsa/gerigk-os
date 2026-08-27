import { useShallow } from 'zustand/react/shallow';
import { getApp } from '@/apps/registry';
import { usePresence } from '@/hooks/usePresence';
import { useOsStore } from '@/store/os.store';

interface WidgetEntry {
  windowId: string;
  appId: string;
}

// Widgets of all minimized windows whose app defines a `widget`
export function useWidgetLayer() {
  const entries = useOsStore(
    useShallow((s) =>
      Object.values(s.windows)
        .filter((w) => w.status === 'minimized' && getApp(w.appId)?.widget)
        .map((w) => `${w.id}|${w.appId}`),
    ),
  );

  const items: WidgetEntry[] = entries.map((e) => {
    const [windowId = '', appId = ''] = e.split('|');
    return { windowId, appId };
  });

  return usePresence(items, (item) => item.windowId, 320).map((entry) => ({
    ...entry,
    Widget: getApp(entry.item.appId)?.widget,
  }));
}
