import { useCallback, useEffect, useRef, useState, type FocusEvent, type MouseEvent, type PointerEvent } from 'react';
import type { DragState } from './FeaturedCarousel.types';

const autoplayMs = 6000;
// Pixels before a mouse press counts as a drag (and no longer as a click)
const dragThreshold = 5;
// Swipe distance that moves to the next/previous card even below half a card
const flickThreshold = 40;
// Snap stays off until the smooth scroll after a drag has settled
const settleMs = 450;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Paged horizontal carousel: arrows, dots, mouse drag (touch/trackpad scroll natively), autoplay paused on hover/focus
export function useFeaturedCarousel(count: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<DragState | null>(null);
  const suppressClick = useRef(false);
  const settleTimer = useRef<number>(0);
  const snapTimer = useRef<number>(0);
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  // Distance between two card starts (card width + gap) and the last reachable position
  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return null;
    const cards = el.children;
    const step = cards.length > 1 ? (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft : el.clientWidth;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const max = step > 0 ? Math.max(0, Math.round(maxScroll / step)) : 0;
    return { el, step, max, maxScroll };
  }, []);

  const sync = useCallback(() => {
    const m = measure();
    if (!m) return;
    const atEnd = m.el.scrollLeft >= m.maxScroll - 2;
    setMaxIndex(m.max);
    setIndex(atEnd ? m.max : Math.round(m.el.scrollLeft / m.step));
  }, [measure]);

  // Re-measure when the window (container) is resized – cards per view change with container queries
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    sync();
    return () => observer.disconnect();
  }, [sync, count]);

  useEffect(
    () => () => {
      window.clearTimeout(settleTimer.current);
      window.clearTimeout(snapTimer.current);
    },
    [],
  );

  const goTo = useCallback(
    (target: number) => {
      const m = measure();
      if (!m) return;
      const next = Math.min(Math.max(target, 0), m.max);
      // Mandatory snap cancels programmatic smooth scrolling in Chromium → off until the animation has settled
      const el = m.el;
      const restoreSnap = () => {
        window.clearTimeout(snapTimer.current);
        el.style.scrollSnapType = '';
      };
      el.style.scrollSnapType = 'none';
      window.clearTimeout(snapTimer.current);
      // `scrollend` where supported, timeout as fallback
      el.addEventListener('scrollend', restoreSnap, { once: true });
      snapTimer.current = window.setTimeout(restoreSnap, 1200);
      el.scrollTo({ left: Math.min(next * m.step, m.maxScroll), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      setIndex(next);
    },
    [measure],
  );

  // Autoplay: restarts after every page change, wraps around at the end
  const paused = hovered || focused || dragging;
  useEffect(() => {
    if (paused || maxIndex === 0 || prefersReducedMotion()) return;
    const timer = window.setTimeout(() => goTo(index >= maxIndex ? 0 : index + 1), autoplayMs);
    return () => window.clearTimeout(timer);
  }, [paused, index, maxIndex, goTo]);

  // Mouse drag only – touch and trackpads scroll the track natively (with scroll snap)
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || !trackRef.current) return;
    drag.current = { pointerId: e.pointerId, startX: e.clientX, startLeft: trackRef.current.scrollLeft, moved: false };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = trackRef.current;
    if (!d || !el || e.pointerId !== d.pointerId) return;
    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < dragThreshold) return;
      d.moved = true;
      window.clearTimeout(settleTimer.current);
      setDragging(true);
      el.setPointerCapture(e.pointerId);
    }
    el.scrollLeft = d.startLeft - dx;
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved || e.pointerId !== d.pointerId) return;
    suppressClick.current = true;
    const m = measure();
    if (m) {
      const dx = e.clientX - d.startX;
      const exact = m.el.scrollLeft / m.step;
      const target = dx < -flickThreshold ? Math.ceil(exact) : dx > flickThreshold ? Math.floor(exact) : Math.round(exact);
      goTo(target);
    }
    settleTimer.current = window.setTimeout(() => setDragging(false), settleMs);
  };

  // A drag must not open the card it started on
  const onClickCapture = (e: MouseEvent) => {
    if (!suppressClick.current) return;
    suppressClick.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  return {
    trackRef,
    index,
    pages: maxIndex + 1,
    hasPrev: index > 0,
    hasNext: index < maxIndex,
    dragging,
    prev: () => goTo(index - 1),
    next: () => goTo(index + 1),
    goTo,
    onScroll: () => {
      if (!drag.current?.moved) sync();
    },
    trackHandlers: { onPointerDown, onPointerMove, onPointerUp: endDrag, onPointerCancel: endDrag, onClickCapture },
    rootHandlers: {
      onPointerEnter: (e: PointerEvent) => e.pointerType === 'mouse' && setHovered(true),
      onPointerLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur: (e: FocusEvent) => !e.currentTarget.contains(e.relatedTarget) && setFocused(false),
    },
  };
}
