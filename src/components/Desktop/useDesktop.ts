import { useCallback, useLayoutEffect, useMemo, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import { desktopApps } from '@/apps/registry';
import { useFullscreen } from '@/hooks/useFullscreen';
import { useT } from '@/hooks/useT';
import { anchorFromPoint } from '@/lib/geometry';
import { cellKey, measureGrid, resolveIconLayout, type GridDims } from '@/lib/grid';
import { useOsStore } from '@/store/os.store';
import type { GridCell } from '@/types';

// Grid dimensions of the icon layer, updated on resize
function useGridDims() {
  const ref = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<GridDims>({ cols: 1, rows: 1 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const next = measureGrid(el.clientWidth, el.clientHeight);
      setDims((prev) => (prev.cols === next.cols && prev.rows === next.rows ? prev : next));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, dims };
}

export function useDesktop() {
  const { t } = useT();
  const { ref, dims } = useGridDims();
  const fullscreen = useFullscreen();
  const iconPositions = useOsStore((s) => s.iconPositions);
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());

  const cells = useMemo(
    () =>
      resolveIconLayout(
        desktopApps.map((app) => ({
          id: app.id,
          saved: iconPositions[app.id],
          preferred: typeof app.desktop === 'object' ? app.desktop : undefined,
        })),
        dims,
      ),
    [dims, iconPositions],
  );

  // Occupied cells excluding the icon itself
  const occupiedFor = useCallback(
    (appId: string) =>
      new Set(
        Object.entries(cells)
          .filter(([id]) => id !== appId)
          .map(([, cell]) => cellKey(cell as GridCell)),
      ),
    [cells],
  );

  const selectIcon = useCallback((appId: string, additive: boolean) => {
    setSelected((prev) => {
      if (!additive) return prev.has(appId) && prev.size === 1 ? prev : new Set([appId]);
      const next = new Set(prev);
      if (next.has(appId)) next.delete(appId);
      else next.add(appId);
      return next;
    });
  }, []);

  const onBackgroundPointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || e.target !== e.currentTarget) return;
    useOsStore.getState().blurWindows();
    setSelected(new Set());
  }, []);

  const onBackgroundContextMenu = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      e.preventDefault();
      const s = useOsStore.getState();
      s.openMenu(
        [
          { type: 'item', label: t('ctx.arrange'), icon: 'grid', onSelect: s.resetIconPositions },
          { type: 'item', label: t('ctx.refresh'), icon: 'refresh', onSelect: () => setSelected(new Set()) },
          { type: 'separator' },
          { type: 'item', label: t('ctx.language'), icon: 'globe', onSelect: s.toggleLang },
          ...(fullscreen.supported
            ? [{ type: 'item' as const, label: t('ctx.fullscreen'), icon: 'fullscreen' as const, onSelect: fullscreen.toggle }]
            : []),
        ],
        anchorFromPoint(e.clientX, e.clientY),
        'desktop',
      );
    },
    [fullscreen.supported, fullscreen.toggle, t],
  );

  return {
    layerRef: ref,
    dims,
    apps: desktopApps,
    cells,
    occupiedFor,
    selected,
    selectIcon,
    onBackgroundPointerDown,
    onBackgroundContextMenu,
  };
}
