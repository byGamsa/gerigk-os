import { useCallback, type PointerEvent as ReactPointerEvent } from 'react';
import { getDeskArea, snapTargetAt } from '@/lib/geometry';
import { clamp } from '@/lib/math';
import { useOsStore } from '@/store/os.store';
import type { Rect, SnapTarget } from '@/types';

const DRAG_THRESHOLD = 4;

// Dragging via the title bar: un-maximizes/un-snaps under the cursor, snaps at the top (maximize) or side edges (half)
export function useWindowDrag(id: string) {
  return useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (e.button !== 0 || (e.target as Element).closest('[data-window-control]')) return;
      const handle = e.currentTarget;
      handle.setPointerCapture(e.pointerId);

      const store = useOsStore.getState;
      const start = { x: e.clientX, y: e.clientY };
      let base: Rect = { ...store().windows[id]!.rect };
      let moving = false;
      let snap: SnapTarget | null = null;

      const onMove = (ev: PointerEvent) => {
        const dx = ev.clientX - start.x;
        const dy = ev.clientY - start.y;
        if (!moving) {
          if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
          moving = true;
          const win = store().windows[id];
          if ((win?.maximized || win?.snapped) && win.prevRect) {
            const ratio = (start.x - win.rect.x) / win.rect.width;
            base = { ...win.prevRect, x: start.x - win.prevRect.width * ratio, y: win.rect.y };
            store().unmaximizeTo(id, base);
          }
        }
        const area = getDeskArea();
        store().setWindowRect(id, {
          ...base,
          x: clamp(base.x + dx, -base.width + 100, window.innerWidth - 100),
          y: clamp(base.y + dy, area.y, window.innerHeight - 60),
        });
        const nextSnap = snapTargetAt(ev.clientX, ev.clientY, area);
        if (nextSnap !== snap) {
          snap = nextSnap;
          store().setSnapPreview(snap);
        }
      };

      const onUp = () => {
        handle.removeEventListener('pointermove', onMove);
        handle.removeEventListener('pointerup', onUp);
        handle.removeEventListener('pointercancel', onUp);
        if (snap) {
          store().setSnapPreview(null);
          if (snap === 'max') store().maximizeWindow(id);
          else store().snapWindow(id, snap);
        }
      };

      handle.addEventListener('pointermove', onMove);
      handle.addEventListener('pointerup', onUp);
      handle.addEventListener('pointercancel', onUp);
    },
    [id],
  );
}
