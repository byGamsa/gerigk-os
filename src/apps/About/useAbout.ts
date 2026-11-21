import { useCallback } from 'react';
import { useT } from '@/hooks/useT';
import { launchApp } from '@/services/launcher';
import type { BrowserArgs } from '@/types';
import { aboutContent } from './about.content';

// Content of the "About me" window, resolved for the current language
export function useAbout() {
  const { t, tr } = useT();
  const content = aboutContent;

  const openWebsite = useCallback((url: string, el: Element) => launchApp<BrowserArgs>('brave', { url }, el), []);

  return {
    t,
    tr,
    content,
    openWebsite,
    initials: content.name
      .split(' ')
      .map((part) => part.slice(0, 1))
      .join('')
      .toUpperCase(),
    sections: [
      { id: 'experience', title: t('about.experience'), entries: content.experience },
      { id: 'education', title: t('about.education'), entries: content.education },
      { id: 'volunteering', title: t('about.volunteering'), entries: content.volunteering },
      { id: 'awards', title: t('about.awards'), entries: content.awards },
    ],
  };
}
