import { cn } from '@/lib/cn';
import { Flyout } from '../Flyout/Flyout';
import { Icon } from '../Icon/Icon';
import { VolumeControl } from '../VolumeControl/VolumeControl';
import { quickSettingsStyles as s } from './QuickSettings.styles';
import { useQuickSettings } from './useQuickSettings';

export function QuickSettings() {
  const { t, tiles } = useQuickSettings();

  return (
    <Flyout id="quick" className={s.panel} ariaLabel={t('tray.hidden')}>
      <div className={s.grid}>
        {tiles.map((tile) => (
          <button
            key={tile.id}
            type="button"
            aria-pressed={tile.active}
            className={cn(s.tile, tile.active ? s.tileActive : s.tileIdle)}
            onClick={tile.onToggle}
          >
            <Icon name={tile.icon} className={s.tileIcon} />
            <span>
              <span className={cn('block', s.tileLabel)}>{tile.label}</span>
              {tile.value && <span className={s.tileValue}>{tile.value}</span>}
            </span>
          </button>
        ))}
      </div>
      <VolumeControl showValue className={s.volume} />
    </Flyout>
  );
}
