import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { clamp } from '@/lib/math';
import { useOsStore } from '@/store/os.store';
import type { FlyoutId } from '@/types';
import type { FlyoutAlign, FlyoutSide } from './Flyout.types';

const GAP = 10;
const EDGE = 8;

// Positions a flyout at its anchor – above the taskbar or below the top bar
export function useFlyoutPosition(id: FlyoutId, align: FlyoutAlign) {
  const ref = useRef<HTMLDivElement>(null);
  const flyout = useOsStore((s) => (s.flyout?.id === id ? s.flyout : null));
  const [style, setStyle] = useState<CSSProperties>({ left: -9999, top: -9999 });
  const [side, setSide] = useState<FlyoutSide>('bottom');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!flyout || !el) return;
    const { anchor } = flyout;
    const { offsetWidth: w, offsetHeight: h } = el;

    if (anchor.kind === 'point') {
      const left = clamp(anchor.x, EDGE, window.innerWidth - w - EDGE);
      const top = anchor.y + h > window.innerHeight - EDGE ? Math.max(EDGE, anchor.y - h) : anchor.y;
      setSide('top');
      setStyle({ left, top, transformOrigin: `${anchor.x - left}px ${anchor.y - top}px` });
      return;
    }

    const center = align === 'screen' ? window.innerWidth / 2 : anchor.x + anchor.width / 2;
    const left = clamp(center - w / 2, EDGE, window.innerWidth - w - EDGE);
    const originX = `${anchor.x + anchor.width / 2 - left}px`;
    if (anchor.barTop < window.innerHeight / 2) {
      setSide('top');
      setStyle({ left, top: anchor.barBottom + GAP, transformOrigin: `${originX} 0` });
    } else {
      setSide('bottom');
      setStyle({ left, bottom: window.innerHeight - anchor.barTop + GAP, transformOrigin: `${originX} 100%` });
    }
  }, [flyout, align]);

  return { ref, open: Boolean(flyout), style, side, flyout };
}
