import { useState } from 'react';
import { snapRect } from '@/lib/geometry';
import { useOsStore } from '@/store/os.store';
import type { Rect, SnapTarget } from '@/types';

// Snap preview: fades in place, keeps its rect while fading out, animates geometry only between two targets
export function useSnapPreview() {
  const target = useOsStore((s) => s.snapPreview);
  const [prev, setPrev] = useState<SnapTarget | null>(target);
  const [rect, setRect] = useState<Rect>(() => snapRect(target ?? 'max'));
  const [moving, setMoving] = useState(false);

  if (target !== prev) {
    setPrev(target);
    setMoving(prev !== null && target !== null);
    if (target) setRect(snapRect(target));
  }

  return { visible: target !== null, rect, moving };
}
