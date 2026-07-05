import type { IconName } from '@/components/Icon/Icon.types';
import type { AnchorRect } from './geometry.types';
import type { LocalizedValue } from './i18n.types';

export type FlyoutId = 'start' | 'calendar' | 'quick' | 'menu';

export type MenuItem =
  | { type: 'item'; label: string; icon?: IconName; disabled?: boolean; onSelect: () => void }
  | { type: 'label'; label: string }
  | { type: 'separator' };

export interface FlyoutState {
  id: FlyoutId;
  anchor: AnchorRect;
  // Which trigger opened the flyout (for toggle behavior)
  source: string;
  items?: MenuItem[];
  // Incremented on every open – forces repositioning
  openedAt: number;
}

export interface ToastInput {
  title?: LocalizedValue;
  text: LocalizedValue;
  icon?: IconName;
  timeout?: number;
}

export interface Toast extends ToastInput {
  id: string;
}
