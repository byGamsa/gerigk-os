import type { ComponentType } from 'react';
import type { IconName } from '@/components/Icon/Icon.types';
import type { LocalizedValue } from './i18n.types';
import type { Point, Size } from './geometry.types';

export type AppId = string;

export type AppCategory = 'system' | 'portfolio' | 'tool' | 'game';

// Desktop grid cell. Negative values count from the right/bottom edge.
export interface GridCell {
  col: number;
  row: number;
}

// Props every app component receives in its window
export interface AppWindowProps<TArgs = unknown> {
  windowId: string;
  args: TArgs;
}

// Props for the mini widget shown while the app window is minimized
export interface AppWidgetProps {
  windowId: string;
}

export interface AppWindowOptions extends Partial<Size> {
  minWidth?: number;
  minHeight?: number;
  // Start position relative to the desk area; negative values count from the right/bottom (default: centered, cascading)
  position?: Point;
}

export interface AppDefinition<TArgs = unknown> {
  id: AppId;
  title: LocalizedValue;
  icon: IconName;
  component: ComponentType<AppWindowProps<TArgs>>;
  category?: AppCategory;
  // Pinned to the taskbar
  pinned?: boolean;
  // Show on the desktop – `true` = auto-place, or a start cell
  desktop?: boolean | GridCell;
  // Hide from the start menu
  hidden?: boolean;
  // Opened automatically after booting
  autostart?: boolean;
  window?: AppWindowOptions;
  // Decides whether to open a new window or focus an existing one (same key → same window; default: one per app)
  instanceKey?: (args: TArgs) => string;
  // Optional widget shown while the window is minimized
  widget?: ComponentType<AppWidgetProps>;
}

export type AnyAppDefinition = AppDefinition<any>;
