import { layout } from '@/config/layout';
import type { AnchorRect, Point, Rect, Size, SnapTarget } from '@/types';
import { clamp } from './math';

// Area between top bar and taskbar – target area for maximized windows
export function getDeskArea(): Rect {
  const gap = layout.windowGap;
  const top = layout.barGap + layout.topbarHeight + gap;
  const bottom = window.innerHeight - (layout.taskbarOffset + layout.taskbarHeight + gap);
  return { x: gap, y: top, width: window.innerWidth - gap * 2, height: Math.max(200, bottom - top) };
}

export const isMobileViewport = () => window.innerWidth < layout.mobileBreakpoint;

// Pointer distance to the left/right screen edge that triggers half snapping
const SNAP_EDGE = 6;

// Target area of a snapped window: whole desk area or one half of it
export function snapRect(target: SnapTarget, area: Rect = getDeskArea()): Rect {
  if (target === 'max') return area;
  const width = Math.round((area.width - layout.windowGap) / 2);
  return { ...area, width, x: target === 'left' ? area.x : area.x + area.width - width };
}

// Snap target under the pointer while dragging: top bar → maximize, left/right edge → half
export function snapTargetAt(x: number, y: number, area: Rect): SnapTarget | null {
  if (x <= SNAP_EDGE) return 'left';
  if (x >= window.innerWidth - 1 - SNAP_EDGE) return 'right';
  if (y < area.y - 4) return 'max';
  return null;
}

// Centered, slightly offset start position for new windows
export function cascadeRect(size: Size, area: Rect, index: number): Rect {
  const width = Math.min(size.width, area.width);
  const height = Math.min(size.height, area.height);
  const offset = ((index % 6) - 2) * layout.window.cascadeStep;
  return {
    width,
    height,
    x: clamp(area.x + (area.width - width) / 2 + offset, area.x, area.x + area.width - width),
    y: clamp(area.y + (area.height - height) / 2 + offset, area.y, area.y + area.height - height),
  };
}

// Fixed start position relative to the desk area, kept inside it
export function positionedRect(size: Size, area: Rect, position: Point): Rect {
  const width = Math.min(size.width, area.width);
  const height = Math.min(size.height, area.height);
  return {
    width,
    height,
    x: clamp(area.x + position.x, area.x, area.x + area.width - width),
    y: clamp(area.y + position.y, area.y, area.y + area.height - height),
  };
}

// Keeps a window in the viewport with enough visible area
export function keepInViewport(rect: Rect, area: Rect): Rect {
  return {
    ...rect,
    x: clamp(rect.x, -rect.width + 100, window.innerWidth - 100),
    y: clamp(rect.y, area.y, window.innerHeight - 60),
  };
}

export function centerOf(el: Element): Point {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

// Flyout anchor – uses the surrounding bar ([data-bar]) for the vertical position
export function anchorFromElement(el: Element): AnchorRect {
  const r = el.getBoundingClientRect();
  const bar = (el.closest('[data-bar]') ?? el).getBoundingClientRect();
  return { kind: 'bar', x: r.left, y: r.top, width: r.width, height: r.height, barTop: bar.top, barBottom: bar.bottom };
}

export function anchorFromPoint(x: number, y: number): AnchorRect {
  return { kind: 'point', x, y, width: 0, height: 0, barTop: y, barBottom: y };
}

export const rectsIntersect = (a: DOMRect | Rect, b: DOMRect | Rect) =>
  a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
