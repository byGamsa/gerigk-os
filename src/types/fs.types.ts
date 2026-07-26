import type { IconName } from '@/components/Icon/Icon.types';
import type { AppId } from './app.types';
import type { LocalizedValue } from './i18n.types';

export type FolderId = 'desktop' | 'documents' | 'downloads' | 'pictures' | 'trash';

export interface FolderDefinition {
  id: FolderId;
  name: LocalizedValue;
  icon: IconName;
}

interface FsEntryBase {
  id: string;
  folder: FolderId;
  // ISO date of the last modification
  modifiedAt: string;
}

// Text file – opens in the editor
export interface VirtualFile extends FsEntryBase {
  kind: 'text';
  name: LocalizedValue;
  content: LocalizedValue;
  // Recycle bin only: original location
  originalPath?: LocalizedValue;
  // Recycle bin only: ISO date of deletion
  deletedAt?: string;
}

// Shortcut to an app (e.g. desktop icons)
export interface AppShortcut extends FsEntryBase {
  kind: 'shortcut';
  appId: AppId;
}

export type FsEntry = VirtualFile | AppShortcut;

// Explorer app args
export interface ExplorerArgs {
  folder?: FolderId;
}
