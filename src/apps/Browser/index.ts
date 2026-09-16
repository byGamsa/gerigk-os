import type { BrowserArgs } from '@/types';
import { defineApp } from '../defineApp';
import { Browser } from './Browser';

export const browserApp = defineApp<BrowserArgs>({
  id: 'brave',
  title: 'Brave',
  icon: 'brave',
  category: 'tool',
  pinned: true,
  component: Browser,
  window: { width: 1100, height: 700, minWidth: 420, minHeight: 360 },
});
