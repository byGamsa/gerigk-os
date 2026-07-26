import { useCallback, useEffect, useState, type ChangeEvent } from 'react';
import { findFile } from '@/data/fileSystem';
import { useT } from '@/hooks/useT';
import { useWindowTitle } from '@/hooks/useWindowTitle';
import { resolveLocalized, translate } from '@/i18n';
import type { NotepadArgs } from './Notepad.types';

export function useNotepad(windowId: string, args: NotepadArgs) {
  const { t, tr, lang } = useT();
  const file = findFile(args.fileId);
  const [text, setText] = useState(() => (file ? tr(file.content) : ''));
  const [dirty, setDirty] = useState(false);

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
  }, []);

  return {
    t,
    text,
    onChange,
  };
}
