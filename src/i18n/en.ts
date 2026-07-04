import type { Dictionary } from '@/types';

// English dictionary – must contain all keys from `de` (enforced by the type).
export const en: Dictionary = {
  'os.start': 'Start',
  'os.mute': 'Mute',
  'os.unmute': 'Unmute',

  'start.search': 'Search apps',
  'start.all': 'All apps',
  'start.noResults': 'No results',
  'start.power': 'Power',
  'start.restart': 'Restart',

  'win.minimize': 'Minimize',
  'win.maximize': 'Maximize',
  'win.restore': 'Restore',
  'win.close': 'Close',

  'task.open': 'Open',
  'task.closeAll': 'Close all windows',
  'task.close': 'Close window',

  'ctx.open': 'Open',
  'ctx.arrange': 'Arrange icons',
  'ctx.refresh': 'Refresh',
  'ctx.language': 'Language: Deutsch',
  'ctx.fullscreen': 'Full screen',

  'cal.today': 'Today',
  'cal.noEvents': 'No events',
  'cal.prev': 'Previous month',
  'cal.next': 'Next month',

  'qs.language': 'Language',
  'qs.languageName': 'English',
  'qs.fullscreen': 'Full screen',
  'qs.sound': 'Sound',
  'qs.on': 'On',
  'qs.off': 'Off',
  'qs.arrange': 'Arrange',

  'tray.language': 'Switch language',
  'tray.hidden': 'Quick settings',
  'tray.network': 'Network',
  'tray.online': 'Connected',
  'tray.offline': 'Offline',
  'tray.volume': 'Volume',
  'tray.battery': 'Battery',
  'tray.charging': 'Charging',
  'tray.clock': 'Time and date',

  'toast.welcome':
    'Welcome! Double-click an icon to open an app. By the way, there is still something in the recycle bin …',
};
