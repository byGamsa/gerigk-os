import type { LocalizedValue } from '@/types';

export interface ContactLink {
  label: string;
  href: string;
}

export interface AboutContent {
  name: string;
  role: LocalizedValue;
  intro: LocalizedValue;
  skills: readonly string[];
  contact: readonly ContactLink[];
}
