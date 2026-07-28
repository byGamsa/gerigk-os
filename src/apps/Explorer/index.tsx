import type { AppWindowProps, ExplorerArgs } from '@/types';
import { defineApp } from '../defineApp';
import { Explorer } from './Explorer';

const explorerWindow = { width: 820, height: 500, minWidth: 380, minHeight: 280 };

// Explorer in the taskbar – starts in "Documents"
export const explorerApp = defineApp<ExplorerArgs>({
  id: 'explorer',
  title: { de: 'Explorer', en: 'File Explorer' },
  icon: 'folder',
  category: 'system',
  pinned: true,
  component: ({ windowId, args }: AppWindowProps<ExplorerArgs>) => (
    <Explorer windowId={windowId} initialFolder={args.folder ?? 'documents'} />
  ),
  window: explorerWindow,
});

// Recycle bin on the desktop – same explorer, starts in the trash
export const recycleBinApp = defineApp<ExplorerArgs>({
  id: 'recycle-bin',
  title: { de: 'Papierkorb', en: 'Recycle Bin' },
  icon: 'trash',
  category: 'system',
  component: ({ windowId, args }: AppWindowProps<ExplorerArgs>) => (
    <Explorer windowId={windowId} initialFolder={args.folder ?? 'trash'} />
  ),
  // Bottom right of the desktop (negative values count from the edge)
  desktop: { col: -1, row: -1 },
  window: explorerWindow,
});
