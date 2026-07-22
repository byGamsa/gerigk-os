import { useEffect } from 'react';
import { osConfig } from '@/config/os.config';
import { localize } from '@/i18n';
import { useOsStore } from '@/store/os.store';

// Boot sequence: short loading screen, then a one-time welcome toast
export function useBoot() {
  const booting = useOsStore((s) => s.booting);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const s = useOsStore.getState();
      s.finishBoot();
      if (!s.welcomed) {
        window.setTimeout(() => s.notify({ text: localize('toast.welcome'), timeout: 9000 }), 1400);
        s.markWelcomed();
      }
    }, osConfig.bootDuration);
    return () => window.clearTimeout(timer);
  }, []);

  return { booting };
}
