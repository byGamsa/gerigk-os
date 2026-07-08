import type { AppId } from './app.types';
import type { Point, Rect, Size } from './geometry.types';
import type { LocalizedValue } from './i18n.types';

export type WindowStatus = 'opening' | 'normal' | 'minimized' | 'closing';

export type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export interface WindowState {
  id: string;
  appId: AppId;
  // Instance key (app + instanceKey)
  key: string;
  args: unknown;
  title: LocalizedValue;
  rect: Rect;
  // Geometry before maximizing
  prevRect: Rect | null;
  minSize: Size;
  maximized: boolean;
  status: WindowStatus;
  // Animate geometry changes (maximize / restore)
  animateGeometry: boolean;
  z: number;
  openedAt: number;
  focusedAt: number;
  // Screen point the window "grows out of"
  origin: Point | null;
}
