import type { TabSummary } from '../../Browser.types';

export interface TabStripProps {
  tabs: readonly TabSummary[];
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
  onNewTab: () => void;
  labels: { newTab: string; close: string };
}
