import { InfoSection } from '../components/InfoSection/InfoSection';
import { InfoTile } from '../components/InfoTile/InfoTile';
import { systemStyles as s } from '../System.styles';
import type { SystemApi } from '../useSystem';

// System › About – tiles, legal notice, disclaimer, credits, system info
export function InfoPage({ sys }: { sys: SystemApi }) {
  const { info, t } = sys;

  return (
    <>
      <div className={s.tiles}>
        {info.tiles.map((tile) => (
          <InfoTile key={tile.id} tile={tile} />
        ))}
      </div>

      <div className={s.device}>
        <div className="min-w-0">
          <div className={s.deviceName}>{sys.deviceName}</div>
          <div className={s.deviceSubtitle}>{sys.deviceSubtitle}</div>
        </div>
        <button type="button" className={s.deviceButton} onClick={sys.copyImprint}>
          {t('system.copyImprint')}
        </button>
      </div>

      <div className={s.sections}>
        {info.sections.map((section) => (
          <InfoSection
            key={section.id}
            section={section}
            links={section.id === 'imprint' ? info.links : undefined}
            defaultOpen={section.id === 'imprint' || section.id === 'system'}
          />
        ))}
      </div>
    </>
  );
}
