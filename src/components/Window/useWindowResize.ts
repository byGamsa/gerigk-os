import { useCallback, type PointerEvent as ReactPointerEvent } from 'react';
import { getDeskArea } from '@/lib/geometry';
import { useOsStore } from '@/store/os.store';
import type { Rect, ResizeDirection } from '@/types';

// Resizing via edge and corner handles
export function useWindowResize(id: string) {
  return useCallback(
    (e: ReactPointerEvent<HTMLElement>, dir: ResizeDirection) => {
      const win = useOsStore.getState().windows[id];
      if (e.button !== 0 || !win || win.maximized) return;
      e.stopPropagation();
      const handle = e.currentTarget;
      handle.setPointerCapture(e.pointerId);

      const start = { x: e.clientX, y: e.clientY };
      const base = { ...win.rect };
      const { width: minW, height: minH } = win.minSize;
      const minTop = getDeskArea().y;

      const onMove = (ev: PointerEvent) => {
        const dx = ev.clientX - start.x;
        const dy = ev.clientY - start.y;
        const next: Rect = { ...base };
        if (dir.includes('e')) next.width = Math.max(minW, base.width + dx);
        if (dir.includes('s')) next.height = Math.max(minH, base.height + dy);
        if (dir.includes('w')) {
          next.width = Math.max(minW, base.width - dx);
          next.x = base.x + base.width - next.width;
        }
        if (dir.includes('n')) {
          const bottom = base.y + base.height;
          next.y = Math.max(minTop, Math.min(base.y + dy, bottom - minH));
          next.height = bottom - next.y;
        }
        useOsStore.getState().setWindowRect(id, next);
      };

      const onUp = () => {
        handle.removeEventListener('pointermove', onMove);
        handle.removeEventListener('pointerup', onUp);
        handle.removeEventListener('pointercancel', onUp);
      };

      handle.addEventListener('pointermove', onMove);
      handle.addEventListener('pointerup', onUp);
      handle.addEventListener('pointercancel', onUp);
    },
    [id],
  );
}
