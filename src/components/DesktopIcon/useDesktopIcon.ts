import { useCallback, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from 'react';
import { useT } from '@/hooks/useT';
import { anchorFromPoint } from '@/lib/geometry';
import { cellToPoint, findFreeCell, pointToCell } from '@/lib/grid';
import { launchApp } from '@/services/launcher';
import { useOsStore } from '@/store/os.store';
import type { Point } from '@/types';
import type { DesktopIconProps } from './DesktopIcon.types';

const DRAG_THRESHOLD = 5;

// Selecting, opening and freely dragging a desktop icon with grid snapping
export function useDesktopIcon({ app, cell, dims, occupied, onSelect }: DesktopIconProps) {
  const { t, tr } = useT();
  const [drag, setDrag] = useState<Point | null>(null);
  const base = cellToPoint(cell);
  const position = drag ? { x: base.x + drag.x, y: base.y + drag.y } : base;

  const open = useCallback((el: Element) => launchApp(app.id, undefined, el), [app.id]);

  const onPointerDown = useCallback(
    (e: PointerEvent<HTMLButtonElement>) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      useOsStore.getState().closeFlyout();
      onSelect(app.id, e.ctrlKey || e.metaKey);

      const el = e.currentTarget;
      el.setPointerCapture(e.pointerId);
      const start = { x: e.clientX, y: e.clientY };
      let moved = false;

      const onMove = (ev: globalThis.PointerEvent) => {
        const offset = { x: ev.clientX - start.x, y: ev.clientY - start.y };
        if (!moved && Math.hypot(offset.x, offset.y) < DRAG_THRESHOLD) return;
        moved = true;
        setDrag(offset);
      };

      const onUp = (ev: globalThis.PointerEvent) => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
        el.removeEventListener('pointercancel', onUp);
        if (moved) {
          const target = pointToCell({ x: base.x + ev.clientX - start.x, y: base.y + ev.clientY - start.y }, dims);
          useOsStore.getState().setIconPosition(app.id, findFreeCell(target, occupied, dims));
          setDrag(null);
        } else if (ev.type === 'pointerup' && ev.pointerType !== 'mouse') {
          // Touch: a single tap opens
          open(el);
        }
      };

      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);
      el.addEventListener('pointercancel', onUp);
    },
    [app.id, base.x, base.y, dims, occupied, onSelect, open],
  );

  const onDoubleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => open(e.currentTarget), [open]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter') open(e.currentTarget);
    },
    [open],
  );

  const onContextMenu = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onSelect(app.id, false);
      const el = e.currentTarget;
      useOsStore.getState().openMenu(
        [{ type: 'item', label: t('ctx.open'), icon: app.icon, onSelect: () => open(el) }],
        anchorFromPoint(e.clientX, e.clientY),
        `icon:${app.id}`,
      );
    },
    [app.icon, app.id, onSelect, open, t],
  );

  return {
    label: tr(app.title),
    position,
    dragging: drag !== null,
    handlers: { onPointerDown, onDoubleClick, onKeyDown, onContextMenu },
  };
}
