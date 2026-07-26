import { useEffect } from 'react';
import { useOsStore } from '@/store/os.store';
import type { LocalizedValue } from '@/types';

// Sets the window title from within an app (e.g. "note.txt – Editor")
export function useWindowTitle(windowId: string, title: LocalizedValue) {
  const setWindowTitle = useOsStore((s) => s.setWindowTitle);
  const signature = JSON.stringify(title);

  useEffect(() => {
    setWindowTitle(windowId, title);
    // Signature instead of object identity
  }, [windowId, signature, setWindowTitle]);
}
