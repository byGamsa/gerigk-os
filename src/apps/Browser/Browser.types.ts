import type { SiteInfo } from '@/types';

// How the active tab is rendered
export type TabView =
  | { kind: 'newtab' }
  // Site forbids embedding → preview card with "Open website"
  | { kind: 'preview'; url: string; site: SiteInfo }
  // Embedded via iframe
  | { kind: 'frame'; url: string };

export interface TabSummary {
  id: string;
  title: string;
  icon: string | null;
  active: boolean;
}
