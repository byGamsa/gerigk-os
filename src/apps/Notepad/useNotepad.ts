import { useCallback, useEffect, useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { findFile } from '@/data/fileSystem';
import { useT } from '@/hooks/useT';
import { useWindowTitle } from '@/hooks/useWindowTitle';
import { resolveLocalized, translate } from '@/i18n';
import type { CaretPosition, NotepadArgs } from './Notepad.types';

function caretOf(el: HTMLTextAreaElement): CaretPosition {
  const lines = el.value.slice(0, el.selectionStart).split('\n');
  return { line: lines.length, col: (lines.at(-1)?.length ?? 0) + 1 };
}

export function useNotepad(windowId: string, args: NotepadArgs) {
  const { t, tr, lang } = useT();
  const file = findFile(args.fileId);
  const [text, setText] = useState(() => (file ? tr(file.content) : ''));
  const [dirty, setDirty] = useState(false);
  const [caret, setCaret] = useState<CaretPosition>({ line: 1, col: 1 });

  // Unmodified files follow language changes
  useEffect(() => {
    if (file && !dirty) setText(resolveLocalized(lang, file.content));
  }, [lang, file, dirty]);

  useWindowTitle(windowId, {
    de: `${dirty ? '• ' : ''}${file ? resolveLocalized('de', file.name) : translate('de', 'np.untitled')} – ${translate('de', 'np.title')}`,
    en: `${dirty ? '• ' : ''}${file ? resolveLocalized('en', file.name) : translate('en', 'np.untitled')} – ${translate('en', 'np.title')}`,
  });

  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setDirty(true);
    setCaret(caretOf(e.target));
  }, []);

  const onCaret = useCallback((e: SyntheticEvent<HTMLTextAreaElement>) => setCaret(caretOf(e.currentTarget)), []);

  return {
    t,
    text,
    onChange,
    onCaret,
    position: t('np.position', { line: caret.line, col: caret.col }),
    chars: t('np.chars', { n: text.length }),
  };
}
