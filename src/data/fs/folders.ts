import type { FolderDefinition, FolderId } from '@/types';

// Folders in explorer sidebar order
export const folders: readonly FolderDefinition[] = [
  { id: 'desktop', name: { de: 'Desktop', en: 'Desktop' }, icon: 'monitor' },
  { id: 'documents', name: { de: 'Dokumente', en: 'Documents' }, icon: 'document' },
  { id: 'downloads', name: { de: 'Downloads', en: 'Downloads' }, icon: 'download' },
  { id: 'pictures', name: { de: 'Bilder', en: 'Pictures' }, icon: 'image' },
  { id: 'trash', name: { de: 'Papierkorb', en: 'Recycle Bin' }, icon: 'trashSmall' },
  { id: 'guestbook', name: { de: 'Gästebuch', en: 'Guestbook' }, icon: 'folderSmall', pinned: true },
];

const byId = new Map(folders.map((f) => [f.id, f]));

export const getFolder = (id: FolderId): FolderDefinition => byId.get(id) ?? folders[0]!;
