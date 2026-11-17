import { desktopApps } from '@/apps/registry';
import { getGuestbookState } from '@/services/guestbook/guestbookStore';
import type { AppShortcut, FolderId, FsEntry, GuestbookEntry, OwnGuestbookFile, VirtualFile } from '@/types';
import { files } from './fs/files';

export { folders, getFolder } from './fs/folders';

const GUESTBOOK_PREFIX = 'gb-';

// The Desktop folder shows shortcuts to all desktop apps
const desktopShortcuts = (): AppShortcut[] =>
  desktopApps.map((app) => ({
    id: `shortcut-${app.id}`,
    kind: 'shortcut',
    folder: 'desktop',
    appId: app.id,
    modifiedAt: '2026-05-26T11:47:00',
  }));

// Guestbook entries (Supabase) and the visitor's own files as anonymous text files
const guestbookFile = (entry: GuestbookEntry | OwnGuestbookFile): VirtualFile => ({
  id: `${GUESTBOOK_PREFIX}${entry.id}`,
  kind: 'text',
  folder: 'guestbook',
  name: `${entry.title}.txt`,
  content: entry.body,
  modifiedAt: entry.createdAt,
  guestbookStatus: 'status' in entry ? entry.status : undefined,
});

function guestbookFiles(): VirtualFile[] {
  const { entries, own } = getGuestbookState();
  const serverIds = new Set(entries.map((e) => e.id));
  const ownOnly = own.filter((f) => !f.serverId || !serverIds.has(f.serverId));
  return [...ownOnly, ...entries].map(guestbookFile);
}

// Entry id of a guestbook file (server id or own-…), `null` for any other file
export const guestbookEntryId = (fileId: string) => (fileId.startsWith(GUESTBOOK_PREFIX) ? fileId.slice(GUESTBOOK_PREFIX.length) : null);

// All entries of a folder
export function entriesIn(folder: FolderId): FsEntry[] {
  if (folder === 'guestbook') return guestbookFiles();
  const own = files.filter((f) => f.folder === folder);
  return folder === 'desktop' ? [...desktopShortcuts(), ...own] : own;
}

export function findFile(id: string | undefined): VirtualFile | undefined {
  if (!id) return undefined;
  if (id.startsWith(GUESTBOOK_PREFIX)) {
    const { entries, own } = getGuestbookState();
    const entryId = guestbookEntryId(id);
    const entry = entries.find((e) => e.id === entryId) ?? own.find((f) => f.id === entryId);
    return entry && guestbookFile(entry);
  }
  return files.find((f) => f.id === id);
}
