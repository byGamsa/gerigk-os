import { defineApp } from '../defineApp';
import { About } from './About';

export const aboutApp = defineApp({
  id: 'about',
  title: { de: 'Über mich', en: 'About me' },
  icon: 'about',
  category: 'portfolio',
  component: About,
  pinned: true,
  window: { width: 640, height: 560 },
});
