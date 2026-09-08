import { defineApp } from '../defineApp';
import { Terminal } from './Terminal';

export const terminalApp = defineApp({
  id: 'terminal',
  title: 'Terminal',
  icon: 'terminal',
  category: 'tool',
  pinned: true,
  component: Terminal,
  // Every launch = new session (like a real terminal)
  instanceKey: () => crypto.randomUUID?.() ?? String(Math.random()),
  window: { width: 820, height: 520, minWidth: 360, minHeight: 240 },
});
