import type { IconName } from '@/components/Icon/Icon.types';

export type SystemPage = 'info' | 'privacy';

// System app args – `page` selects the displayed page
export interface SystemArgs {
  page?: SystemPage;
}

export interface SystemNavItem {
  id: SystemPage;
  icon: IconName;
  label: string;
}

// Top tile (like Processor/RAM/… in Windows Settings)
export interface InfoTileData {
  id: string;
  icon: IconName;
  label: string;
  value: string;
  detail: string;
}

export interface InfoRow {
  label: string;
  // Multi-line values as an array
  value: string | readonly string[];
  href?: string;
}

export interface InfoParagraph {
  heading: string;
  text: string;
}

// Collapsible section with a "Copy" button
export interface InfoSectionData {
  id: string;
  icon: IconName;
  title: string;
  rows?: readonly InfoRow[];
  paragraphs?: readonly InfoParagraph[];
}

export interface RelatedLink {
  label: string;
  href?: string;
  onSelect?: () => void;
}

export interface SystemContent {
  tiles: InfoTileData[];
  sections: InfoSectionData[];
  links: RelatedLink[];
  // Required details not yet filled in (placeholders in legal.config.ts)
  missing: string[];
}
