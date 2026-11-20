import { useCallback, useEffect, useRef, type KeyboardEvent } from 'react';
import type { LightboxProps } from './Lightbox.types';

// Keyboard navigation (←/→/Esc) and focus handling for the screenshot viewer
export function useLightbox({ images, index, onIndex, onClose }: LightboxProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const count = images.length;

  const step = useCallback((delta: number) => onIndex((index + delta + count) % count), [index, count, onIndex]);

  // Focus the overlay so the keys work right away
  useEffect(() => {
    rootRef.current?.focus();
  }, []);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
    else return;
    e.preventDefault();
    e.stopPropagation();
  };

  return { rootRef, onKeyDown, step, image: images[index], hasMany: count > 1, position: `${index + 1} / ${count}` };
}
