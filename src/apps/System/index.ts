import { defineApp } from '../defineApp';
import { System } from './System';
import type { SystemArgs } from './System.types';

// Settings with legal notice and privacy policy – opened via the start menu profile or the top bar links
export const systemApp = defineApp<SystemArgs>({
  id: 'system',
  title: { de: 'Einstellungen', en: 'Settings' },
  icon: 'system',
  category: 'system',
  component: System,
  window: { width: 1040, height: 680, minWidth: 360, minHeight: 320 },
});
