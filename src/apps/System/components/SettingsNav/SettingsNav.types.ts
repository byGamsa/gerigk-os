import type { SystemNavItem, SystemPage } from '../../System.types';

export interface SettingsNavProps {
  items: readonly SystemNavItem[];
  active: SystemPage;
  onSelect: (page: SystemPage) => void;
  profile: { name: string; subtitle: string; initials: string };
}
