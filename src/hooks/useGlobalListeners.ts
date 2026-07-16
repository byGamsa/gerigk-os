import { useEffect } from 'react';
import { useOsStore } from '@/store/os.store';

// App-wide listeners: close flyouts on outside click/Escape, refit windows on resize, report online/offline
export function useGlobalListeners() {
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const { flyout, closeFlyout } = useOsStore.getState();
      if (!flyout || !(e.target instanceof Element)) return;
      if (e.target.closest(`[data-flyout-root="${flyout.id}"]`)) return;
      if (e.target.closest(`[data-flyout-trigger="${flyout.id}"]`)) return;
      closeFlyout();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') useOsStore.getState().closeFlyout();
    };
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const s = useOsStore.getState();
        s.fitWindowsToViewport();
        s.closeFlyout();
      });
    };

    window.addEventListener('pointerdown', onPointerDown, true);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);
}
