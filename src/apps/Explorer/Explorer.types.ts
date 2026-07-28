import type { IconName } from '@/components/Icon/Icon.types';
import type { FolderId, FsEntry } from '@/types';

// File list columns – the recycle bin has its own
export type ExplorerColumn = 'name' | 'origin' | 'deleted' | 'modified' | 'type' | 'size';

export interface ExplorerRow {
  entry: FsEntry;
  icon: IconName;
  // Display value per column
  cells: Record<ExplorerColumn, string>;
}

export interface ExplorerHistory {
  stack: FolderId[];
  index: number;
}

export interface ExplorerProps {
  windowId: string;
  initialFolder: FolderId;
}
