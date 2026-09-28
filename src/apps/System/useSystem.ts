import { useCallback, useMemo } from 'react';
import { legalConfig } from '@/config/legal.config';
import { osConfig } from '@/config/os.config';
import { useT } from '@/hooks/useT';
import { useWindowTitle } from '@/hooks/useWindowTitle';
import { localize } from '@/i18n';
import { launchApp } from '@/services/launcher';
import { useOsStore } from '@/store/os.store';
import { buildPrivacyContent } from './privacy.content';
import { buildSystemContent, isPlaceholder } from './system.content';
import type { SystemArgs, SystemNavItem, SystemPage } from './System.types';

// Page navigation and content of the settings window (legal notice & privacy)
export function useSystem(windowId: string, args: SystemArgs) {
  const { t, lang } = useT();
  const page: SystemPage = args.page ?? 'info';

  const info = useMemo(() => buildSystemContent(lang, () => launchApp('about')), [lang]);
  const privacy = useMemo(() => buildPrivacyContent(lang), [lang]);

  useWindowTitle(windowId, page === 'privacy' ? localize('legal.privacy') : localize('system.titleInfo'));

  // The page lives in the window args → the "Privacy" link can switch it too
  const navigate = useCallback(
    (next: SystemPage) => useOsStore.getState().setWindowArgs(windowId, { page: next } satisfies SystemArgs),
    [windowId],
  );

  const navItems: SystemNavItem[] = [
    { id: 'info', icon: 'info', label: t('system.nav.info') },
    { id: 'privacy', icon: 'shield', label: t('system.nav.privacy') },
  ];

  const name = isPlaceholder(legalConfig.name) ? osConfig.owner : legalConfig.name;
  const missing = page === 'privacy' ? [...info.missing, ...privacy.missing] : info.missing;

  return {
    t,
    page,
    navigate,
    navItems,
    profile: {
      name,
      subtitle: isPlaceholder(legalConfig.email) ? t('start.profile') : legalConfig.email,
      initials: name.slice(0, 1).toUpperCase(),
    },
    breadcrumb: page === 'privacy' ? t('system.nav.privacy') : t('system.nav.info'),
    info,
    privacy,
    missingText: missing.length ? t('system.incompleteHint', { fields: missing.join(', ') }) : null,
    deviceName: osConfig.name.toUpperCase().replace(/\s+/g, '-'),
    deviceSubtitle: `Portfolio · Version ${__APP_VERSION__}`,
  };
}

export type SystemApi = ReturnType<typeof useSystem>;
