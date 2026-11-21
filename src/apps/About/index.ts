import { defineApp } from '../defineApp';
import { About } from './About';

export const aboutApp = defineApp({
  id: 'about',
  title: { de: 'Über mich', en: 'About me' },
  icon: 'about',
  category: 'portfolio',
  component: About,
  pinned: true,
  autostart: true,
  window: { width: 760, height: 660, position: { x: -56, y: 6 } },
});
