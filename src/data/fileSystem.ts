import { desktopApps } from '@/apps/registry';
import type { AppShortcut, FolderId, FsEntry, VirtualFile } from '@/types';
import { files } from './fs/files';

export { folders, getFolder } from './fs/folders';

// The Desktop folder shows shortcuts to all desktop apps
const desktopShortcuts = (): AppShortcut[] =>
  desktopApps.map((app) => ({
    id: `shortcut-${app.id}`,
    kind: 'shortcut',
    folder: 'desktop',
    appId: app.id,
    modifiedAt: '2026-05-26T11:47:00',
  }));

// All entries of a folder
export function entriesIn(folder: FolderId): FsEntry[] {
  const own = files.filter((f) => f.folder === folder);
  return folder === 'desktop' ? [...desktopShortcuts(), ...own] : own;
}

export const findFile = (id: string | undefined): VirtualFile | undefined =>
  id ? files.find((f) => f.id === id) : undefined;
