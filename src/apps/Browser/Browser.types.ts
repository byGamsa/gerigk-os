// How the active tab is rendered
export type TabView =
  | { kind: 'newtab' }
  // Embedded via iframe
  | { kind: 'frame'; url: string };

export interface TabSummary {
  id: string;
  title: string;
  icon: string | null;
  active: boolean;
}
