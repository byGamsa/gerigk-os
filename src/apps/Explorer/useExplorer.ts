import { useCallback, useMemo, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from 'react';
import { getApp } from '@/apps/registry';
import { entriesIn, folders, getFolder } from '@/data/fileSystem';
import { useT } from '@/hooks/useT';
import { useWindowTitle } from '@/hooks/useWindowTitle';
import { formatDateTime, formatFileSize } from '@/lib/format';
import { launchApp } from '@/services/launcher';
import type { FolderId, FsEntry } from '@/types';
import type { NotepadArgs } from '../Notepad/Notepad.types';
import type { ExplorerColumn, ExplorerHistory, ExplorerRow } from './Explorer.types';

const TRASH_COLUMNS: readonly ExplorerColumn[] = ['name', 'origin', 'deleted', 'size'];
const DEFAULT_COLUMNS: readonly ExplorerColumn[] = ['name', 'modified', 'type', 'size'];

// File explorer logic: navigation with history, search, selection, opening
export function useExplorer(windowId: string, initialFolder: FolderId) {
  const { t, tr, lang } = useT();
  const [history, setHistory] = useState<ExplorerHistory>({ stack: [initialFolder], index: 0 });
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const folderId = history.stack[history.index] ?? initialFolder;
  const folder = getFolder(folderId);
  const isTrash = folderId === 'trash';
  const columns = isTrash ? TRASH_COLUMNS : DEFAULT_COLUMNS;

  useWindowTitle(windowId, folder.name);

  // ---------- Navigation ----------

  const resetView = () => {
    setQuery('');
    setSelectedId(null);
  };

  const navigate = useCallback(
    (id: FolderId) => {
      if (id === folderId) return;
      setHistory((h) => ({ stack: [...h.stack.slice(0, h.index + 1), id], index: h.index + 1 }));
      resetView();
    },
    [folderId],
  );

  const canGoBack = history.index > 0;
  const canGoForward = history.index < history.stack.length - 1;
  const goBack = useCallback(() => {
    setHistory((h) => ({ ...h, index: Math.max(0, h.index - 1) }));
    resetView();
  }, []);
  const goForward = useCallback(() => {
    setHistory((h) => ({ ...h, index: Math.min(h.stack.length - 1, h.index + 1) }));
    resetView();
  }, []);

  // ---------- Entries ----------

  const rows = useMemo<ExplorerRow[]>(() => {
    const q = query.trim().toLowerCase();
    return entriesIn(folderId)
      .map((entry): ExplorerRow => {
        if (entry.kind === 'shortcut') {
          const app = getApp(entry.appId);
          return {
            entry,
            icon: app?.icon ?? 'folder',
            cells: {
              name: app ? tr(app.title) : entry.appId,
              origin: '',
              deleted: '',
              modified: formatDateTime(new Date(entry.modifiedAt), lang),
              type: t('explorer.type.shortcut'),
              size: '1 KB',
            },
          };
        }
        return {
          entry,
          icon: 'textFile',
          cells: {
            name: tr(entry.name),
            origin: entry.originalPath ? tr(entry.originalPath) : '',
            deleted: entry.deletedAt ? formatDateTime(new Date(entry.deletedAt), lang) : '',
            modified: formatDateTime(new Date(entry.modifiedAt), lang),
            type: t('explorer.type.text'),
            size: formatFileSize(new Blob([tr(entry.content)]).size),
          },
        };
      })
      .filter((row) => row.cells.name.toLowerCase().includes(q));
  }, [folderId, lang, query, t, tr]);

  // ---------- Opening ----------

  const open = useCallback((entry: FsEntry, el: Element) => {
    if (entry.kind === 'shortcut') launchApp(entry.appId, undefined, el);
    else launchApp<NotepadArgs>('notepad', { fileId: entry.id }, el);
  }, []);

  const rowHandlers = useCallback(
    (entry: FsEntry) => ({
      onClick: () => setSelectedId(entry.id),
      onDoubleClick: (e: MouseEvent<HTMLElement>) => open(entry, e.currentTarget),
      onPointerUp: (e: PointerEvent<HTMLElement>) => {
        if (e.pointerType !== 'mouse') open(entry, e.currentTarget);
      },
      onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter') open(entry, e.currentTarget);
      },
    }),
    [open],
  );

  const columnLabel: Record<ExplorerColumn, string> = {
    name: t('explorer.col.name'),
    origin: t('explorer.col.origin'),
    deleted: t('explorer.col.deleted'),
    modified: t('explorer.col.modified'),
    type: t('explorer.col.type'),
    size: t('explorer.col.size'),
  };

  return {
    t,
    tr,
    folder,
    folders,
    isTrash,
    columns,
    columnLabel,
    rows,
    total: entriesIn(folderId).length,
    query,
    setQuery,
    selectedId,
    rowHandlers,
    navigate,
    canGoBack,
    canGoForward,
    goBack,
    goForward,
  };
}
