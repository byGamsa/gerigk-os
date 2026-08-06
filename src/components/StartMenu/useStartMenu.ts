import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import { apps } from '@/apps/registry';
import { osConfig } from '@/config/os.config';
import { useT } from '@/hooks/useT';
import { anchorFromElement } from '@/lib/geometry';
import { launchApp } from '@/services/launcher';
import { useOsStore } from '@/store/os.store';

export function useStartMenu() {
  const { t, tr } = useT();
  const open = useOsStore((s) => s.flyout?.id === 'start');
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // On open: clear the search and focus it (mouse/keyboard only)
  useEffect(() => {
    if (!open) return;
    setQuery('');
    if (window.matchMedia('(pointer: fine)').matches) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(timer);
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return apps.filter((app) => !app.hidden && tr(app.title).toLowerCase().includes(q));
  }, [query, tr]);

  const launch = useCallback((appId: string, el?: Element) => launchApp(appId, undefined, el), []);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const first = results[0];
      if (first) launch(first.id);
    },
    [launch, results],
  );

  const openPowerMenu = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const s = useOsStore.getState();
      s.openMenu(
        [{ type: 'item', label: t('start.restart'), icon: 'refresh', onSelect: s.restart }],
        anchorFromElement(e.currentTarget),
        'start:power',
      );
    },
    [t],
  );

  return {
    t,
    tr,
    inputRef,
    query,
    setQuery,
    results,
    launch,
    onSubmit,
    openPowerMenu,
    owner: osConfig.owner,
    initials: osConfig.owner.slice(0, 1).toUpperCase(),
  };
}
