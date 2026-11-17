import { useCallback, useEffect, useState, type ChangeEvent, type KeyboardEvent, type MouseEvent, type SyntheticEvent } from 'react';
import { findFile } from '@/data/fileSystem';
import { useT } from '@/hooks/useT';
import { useWindowTitle } from '@/hooks/useWindowTitle';
import { resolveLocalized, translate } from '@/i18n';
import { anchorFromElement } from '@/lib/geometry';
import { useOsStore } from '@/store/os.store';
import type { Lang } from '@/types';
import type { CaretPosition, NotepadArgs } from './Notepad.types';
import { GUESTBOOK_LIMITS, useGuestbookCompose } from './useGuestbookCompose';

const UNTITLED = 'untitled.txt';

function caretOf(el: HTMLTextAreaElement): CaretPosition {
  const lines = el.value.slice(0, el.selectionStart).split('\n');
  return { line: lines.length, col: (lines.at(-1)?.length ?? 0) + 1 };
}

// With .txt, max. length of a guestbook file name
const normalizeName = (name: string) => {
  const base = name.trim().replace(/\.txt$/i, '').slice(0, GUESTBOOK_LIMITS.title);
  return base ? `${base}.txt` : UNTITLED;
};

export function useNotepad(windowId: string, args: NotepadArgs) {
  const { t, tr, lang } = useT();
  const file = findFile(args.fileId);
  const composing = args.compose === 'guestbook';
  const [text, setText] = useState(() => (file ? tr(file.content) : ''));
  const [dirty, setDirty] = useState(false);
  const [caret, setCaret] = useState<CaretPosition>({ line: 1, col: 1 });
  const [draftName, setDraftName] = useState(UNTITLED);
  const [renaming, setRenaming] = useState(false);
  const markSaved = useCallback(() => setDirty(false), []);
  const compose = useGuestbookCompose(windowId, composing, draftName, text, markSaved);

  // Unmodified files follow language changes
  useEffect(() => {
    if (file && !dirty) setText(resolveLocalized(lang, file.content));
  }, [lang, file, dirty]);

  const nameFor = (l: Lang) => (composing ? draftName : file ? resolveLocalized(l, file.name) : translate(l, 'np.untitled'));
  const unsaved = composing ? text.trim() !== '' : dirty;
  useWindowTitle(windowId, {
    de: `${unsaved ? '• ' : ''}${nameFor('de')} – ${translate('de', 'np.title')}`,
    en: `${unsaved ? '• ' : ''}${nameFor('en')} – ${translate('en', 'np.title')}`,
  });

  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setDirty(true);
    setCaret(caretOf(e.target));
  }, []);

  const onCaret = useCallback((e: SyntheticEvent<HTMLTextAreaElement>) => setCaret(caretOf(e.currentTarget)), []);

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      compose.save();
    }
  };

  const openFileMenu = (e: MouseEvent<HTMLButtonElement>) =>
    useOsStore.getState().openMenu(
      [
        { type: 'item', label: `${t('np.save')}  ·  Ctrl+S`, icon: 'document', disabled: !composing, onSelect: compose.save },
        { type: 'separator' },
        { type: 'item', label: t('np.close'), icon: 'close', onSelect: () => useOsStore.getState().closeWindow(windowId) },
      ],
      anchorFromElement(e.currentTarget),
      `notepad:${windowId}`,
    );

  return {
    t,
    text,
    onChange,
    onCaret,
    onKeyDown,
    openFileMenu,
    fileName: nameFor(lang),
    unsaved,
    // Only new guestbook files can be renamed (double-click on the name)
    canRename: composing,
    renaming,
    startRename: () => composing && setRenaming(true),
    finishRename: (name: string) => {
      setDraftName(normalizeName(name));
      setRenaming(false);
    },
    cancelRename: () => setRenaming(false),
    compose: composing ? compose : null,
    confirming: compose.confirming,
    confirmText: t('np.confirm.text', { name: draftName }),
    maxLength: composing ? GUESTBOOK_LIMITS.body : undefined,
    position: t('np.position', { line: caret.line, col: caret.col }),
    chars: t('np.chars', { n: text.length }),
  };
}
