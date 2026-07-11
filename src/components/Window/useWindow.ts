import { useCallback, useEffect, useLayoutEffect, useRef, type CSSProperties, type MouseEvent } from 'react';
import { getApp } from '@/apps/registry';
import { useT } from '@/hooks/useT';
import { taskbarRegistry } from '@/lib/domRegistry';
import { centerOf } from '@/lib/geometry';
import { useOsStore } from '@/store/os.store';
import type { WindowState } from '@/types';
import { useWindowDrag } from './useWindowDrag';
import { useWindowResize } from './useWindowResize';

const GEOMETRY_ANIMATION_MS = 400;

// Transform origin matching the current animation target (icon, taskbar, center)
function useTransformOrigin(win: WindowState | undefined): string {
  const origin = useRef('center');
  if (!win) return origin.current;
  if (win.status === 'opening') {
    origin.current = win.origin ? `${win.origin.x - win.rect.x}px ${win.origin.y - win.rect.y}px` : 'center';
  } else if (win.status === 'minimized') {
    const button = taskbarRegistry.get(win.appId);
    if (button) {
      const c = centerOf(button);
      origin.current = `${c.x - win.rect.x}px ${c.y - win.rect.y}px`;
    }
  } else if (win.status === 'closing') {
    origin.current = 'center';
  }
  return origin.current;
}

export function useWindow(id: string) {
  const { t, tr } = useT();
  const win = useOsStore((s) => s.windows[id]);
  const isActive = useOsStore((s) => s.activeId === id);
  const actions = useOsStore.getState();
  const ref = useRef<HTMLElement>(null);
  const onTitlebarPointerDown = useWindowDrag(id);
  const onResizePointerDown = useWindowResize(id);
  const transformOrigin = useTransformOrigin(win);

  // Opening: render one frame in the initial state, then switch to normal
  useLayoutEffect(() => {
    if (win?.status !== 'opening') return;
    void ref.current?.offsetWidth;
    const frame = requestAnimationFrame(() => actions.setWindowStatus(id, 'normal'));
    return () => cancelAnimationFrame(frame);
  }, [win?.status, id, actions]);

  // Maximize/restore: disable the geometry transition once it is done
  useEffect(() => {
    if (!win?.animateGeometry) return;
    const timer = window.setTimeout(() => actions.clearGeometryAnimation(id), GEOMETRY_ANIMATION_MS);
    return () => window.clearTimeout(timer);
  }, [win?.animateGeometry, win?.maximized, id, actions]);

  const focus = useCallback(() => {
    const s = useOsStore.getState();
    if (s.activeId !== id) s.focusWindow(id);
  }, [id]);

  const minimize = useCallback(() => actions.minimizeWindow(id), [actions, id]);
  const toggleMaximize = useCallback(() => actions.toggleMaximize(id), [actions, id]);
  const close = useCallback(() => actions.closeWindow(id), [actions, id]);

  const onTitlebarDoubleClick = useCallback(
    (e: MouseEvent) => {
      if (!(e.target as Element).closest('[data-window-control]')) toggleMaximize();
    },
    [toggleMaximize],
  );

  const style: CSSProperties | undefined = win && {
    left: win.rect.x,
    top: win.rect.y,
    width: win.rect.width,
    height: win.rect.height,
    minWidth: win.minSize.width,
    minHeight: win.minSize.height,
    zIndex: win.z,
    transformOrigin,
  };

  return {
    ref,
    win,
    app: win ? getApp(win.appId) : undefined,
    title: win ? tr(win.title) : '',
    isActive,
    style,
    t,
    focus,
    minimize,
    toggleMaximize,
    close,
    onTitlebarPointerDown,
    onTitlebarDoubleClick,
    onResizePointerDown,
  };
}
