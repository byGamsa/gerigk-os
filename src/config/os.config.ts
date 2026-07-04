import type { Lang } from '@/types';

export const osConfig = {
  name: 'Gerigk OS',
  // Shown in the start menu and the "About me" app
  owner: 'Gerigk',
  defaultLang: 'de' satisfies Lang as Lang,
  bootDuration: 1800,
  storageKey: 'gerigk-os',
  toastTimeout: 4800,
} as const;
