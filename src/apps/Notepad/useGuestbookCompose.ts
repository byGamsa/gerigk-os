import { useCallback, useEffect, useState } from 'react';
import { useT } from '@/hooks/useT';
import { closeGuards } from '@/lib/closeGuards';
import { saveGuestbookFile } from '@/services/guestbook/guestbookStore';
import { useOsStore } from '@/store/os.store';
import type { NotepadArgs } from './Notepad.types';

export const GUESTBOOK_LIMITS = { title: 60, body: 1000 } as const;

// File name without extension, as stored in the guestbook
const baseName = (fileName: string) => fileName.replace(/\.txt$/i, '').trim().slice(0, GUESTBOOK_LIMITS.title) || 'untitled';

// A new guestbook file in the editor: save (Ctrl+S / File › Save), ask before closing unsaved changes
export function useGuestbookCompose(windowId: string, active: boolean, fileName: string, text: string, onSaved: () => void) {
  const { lang } = useT();
  // Honeypot – only bots fill in the hidden field
  const [website, setWebsite] = useState('');
  const [confirming, setConfirming] = useState(false);
  const unsaved = active && text.trim() !== '';

  const save = useCallback(() => {
    if (!active || !text.trim()) return;
    const id = saveGuestbookFile({ title: baseName(fileName), body: text.trim().slice(0, GUESTBOOK_LIMITS.body), website }, lang);
    // From now on the window shows the saved file like any other text file
    useOsStore.getState().setWindowArgs(windowId, { fileId: `gb-${id}` } satisfies NotepadArgs);
    onSaved();
  }, [active, fileName, lang, onSaved, text, website, windowId]);

  // Closing an unsaved file asks first (window close button, taskbar, kill …)
  useEffect(() => {
    if (!unsaved) return;
    closeGuards.set(windowId, () => {
      setConfirming(true);
      return true;
    });
    return () => {
      closeGuards.delete(windowId);
    };
  }, [unsaved, windowId]);

  const close = (force: boolean) => useOsStore.getState().closeWindow(windowId, force);

  return {
    website,
    setWebsite,
    save,
    confirming,
    confirmSave: () => {
      save();
      close(true);
    },
    confirmDiscard: () => close(true),
    confirmCancel: () => setConfirming(false),
  };
}
