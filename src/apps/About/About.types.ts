import type { LocalizedValue } from '@/types';

export interface ContactLink {
  label: string;
  href: string;
}

// Highlight card (project, award …)
export interface AboutHighlight {
  title: string;
  meta: LocalizedValue;
  text: LocalizedValue;
  // Optional website, opened in the browser app
  href?: string;
}

// Entry in the experience / education / volunteering timeline
export interface TimelineEntry {
  title: LocalizedValue;
  org: string;
  period: LocalizedValue;
  text?: LocalizedValue;
}

export interface SkillGroup {
  label: LocalizedValue;
  items: readonly LocalizedValue[];
}

export interface AboutContent {
  name: string;
  // Profile photo (public path); without one the initials are shown
  photo?: string;
  role: LocalizedValue;
  location: LocalizedValue;
  intro: LocalizedValue;
  contact: readonly ContactLink[];
  highlights: readonly AboutHighlight[];
  experience: readonly TimelineEntry[];
  education: readonly TimelineEntry[];
  skills: readonly SkillGroup[];
  volunteering: readonly TimelineEntry[];
  awards: readonly TimelineEntry[];
}
