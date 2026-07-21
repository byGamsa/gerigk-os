import { useCallback, useEffect, useState } from 'react';
import { useOsStore } from '@/store/os.store';
import type { Toast } from '@/types';

const EXIT_MS = 280;

// Toast lifecycle: auto-hide, then remove
export function useToast(toast: Toast) {
  const [leaving, setLeaving] = useState(false);
  const dismiss = useCallback(() => setLeaving(true), []);

  useEffect(() => {
    const timer = window.setTimeout(dismiss, toast.timeout);
    return () => window.clearTimeout(timer);
  }, [dismiss, toast.timeout]);

  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(() => useOsStore.getState().dismissToast(toast.id), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [leaving, toast.id]);

  return { leaving, dismiss };
}
