import { osConfig } from '@/config/os.config';
import type { AboutContent } from './About.types';

// Placeholder content – replace with your real data
export const aboutContent: AboutContent = {
  name: osConfig.owner,
  role: { de: 'Entwickler · Designer', en: 'Developer · Designer' },
  intro: {
    de: 'Willkommen in meinem Portfolio! Hier entsteht nach und nach ein Überblick über meine Projekte, Erfahrungen und Ideen – jede App auf diesem Desktop erzählt ein Stück davon.',
    en: 'Welcome to my portfolio! This is where an overview of my projects, experience and ideas is taking shape – every app on this desktop tells part of the story.',
  },
  skills: ['TypeScript', 'React', 'Unity', 'C#'],
  contact: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
};
