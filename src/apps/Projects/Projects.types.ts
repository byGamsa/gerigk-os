import type { IconName } from '@/components/Icon/Icon.types';
import type { LocalizedValue } from '@/types';

// Window args – `project` (slug) opens a project page, empty = store home
export interface ProjectsArgs {
  project?: string;
}

export type ProjectCategory = 'games' | 'web' | 'mobile' | 'desktop' | 'cloud' | 'ai';

export type ProjectFilter = 'all' | ProjectCategory;

export interface ProjectScreenshot {
  // Self-hosted image below `public/projects/`
  src: string;
  caption: LocalizedValue;
}

export interface ProjectLink {
  label: LocalizedValue;
  href: string;
  kind: 'github' | 'site' | 'video' | 'docs';
}

export interface ProjectSection {
  heading: LocalizedValue;
  // Paragraph text or bullet list
  text?: LocalizedValue;
  bullets?: readonly LocalizedValue[];
}

export interface Project {
  slug: string;
  title: LocalizedValue;
  tagline: LocalizedValue;
  category: ProjectCategory;
  year: LocalizedValue;
  team: LocalizedValue;
  status: LocalizedValue;
  // Cover image (also used as app icon); without it a gradient tile with `icon` is shown
  cover?: string;
  icon?: IconName;
  // Optional square app icon (otherwise the cover is cropped)
  iconImage?: string;
  // Tile / banner gradient
  accent: readonly [string, string];
  featured?: boolean;
  description: LocalizedValue;
  sections: readonly ProjectSection[];
  tags: readonly string[];
  screenshots: readonly ProjectScreenshot[];
  links: readonly ProjectLink[];
}

// Opens an external link in the browser app, growing out of the clicked element
export type OpenLink = (href: string, origin: Element) => void;

// Opens the screenshot viewer with a gallery at the given index
export type OpenViewer = (images: readonly ProjectScreenshot[], index: number) => void;

export interface ViewerState {
  images: readonly ProjectScreenshot[];
  index: number;
}
