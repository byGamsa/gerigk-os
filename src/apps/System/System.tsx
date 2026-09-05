import { Icon } from '@/components/Icon/Icon';
import type { AppWindowProps } from '@/types';
import { SettingsNav } from './components/SettingsNav/SettingsNav';
import { InfoPage } from './pages/InfoPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { systemStyles as s } from './System.styles';
import type { SystemArgs } from './System.types';
import { useSystem } from './useSystem';

// Windows-style settings: navigation left, "System › About" or "System › Privacy" right
export function System({ windowId, args }: AppWindowProps<SystemArgs>) {
  const sys = useSystem(windowId, args);

  return (
    <div className={s.root}>
      <SettingsNav items={sys.navItems} active={sys.page} onSelect={sys.navigate} profile={sys.profile} />

      <div className={s.content} role="tabpanel">
        <h1 className={s.breadcrumb}>
          <span className={s.breadcrumbParent}>System</span>
          <Icon name="chevronRight" className={s.breadcrumbIcon} />
          <span>{sys.breadcrumb}</span>
        </h1>

        {sys.missingText && (
          <div className={s.warning} role="alert">
            <Icon name="info" className={s.warningIcon} />
            <div>
              <div className={s.warningTitle}>{sys.t('system.incomplete')}</div>
              <div className={s.warningText}>{sys.missingText}</div>
            </div>
          </div>
        )}

        {sys.page === 'privacy' ? <PrivacyPage sys={sys} /> : <InfoPage sys={sys} />}
      </div>
    </div>
  );
}
