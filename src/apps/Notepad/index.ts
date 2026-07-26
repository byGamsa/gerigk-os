import { defineApp } from '../defineApp';
import { Notepad } from './Notepad';
import type { NotepadArgs } from './Notepad.types';

export const notepadApp = defineApp<NotepadArgs>({
  id: 'notepad',
  title: { de: 'Editor', en: 'Notepad' },
  icon: 'notepad',
  category: 'tool',
  component: Notepad,
  pinned: true,
  window: { width: 680, height: 500 },
  // One window per file
  instanceKey: (args) => args.fileId ?? 'untitled',
});
