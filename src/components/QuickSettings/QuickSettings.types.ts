import type { IconName } from '../Icon/Icon.types';

export interface QuickTile {
  id: string;
  icon: IconName;
  label: string;
  value?: string;
  active: boolean;
  onToggle: () => void;
}
