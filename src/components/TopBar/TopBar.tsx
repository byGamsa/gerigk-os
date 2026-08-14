import { cn } from '@/lib/cn';
import { Icon } from '../Icon/Icon';
import { BatteryIcon } from '../Tray/BatteryIcon';
import { topBarStyles as s } from './TopBar.styles';
import { useTopBar } from './useTopBar';

export function TopBar() {
  const bar = useTopBar();
  const { t, battery } = bar;
  const isOpen = (source: string) => bar.openSource === source;

  return (
    <header className={s.root} data-bar>
      <div className={s.group}>
        <button
          type="button"
          data-flyout-trigger="start"
          aria-label={t('os.start')}
          title={t('os.start')}
          className={cn(s.button, isOpen('start@topbar') && s.open)}
          onClick={(e) => bar.toggle('start', e.currentTarget)}
        >
          <Icon name="logoMono" className={s.logo} />
        </button>
        <button
          type="button"
          data-flyout-trigger="menu"
          className={cn(s.button, isOpen('menu@topbar:apps') && s.open)}
          onClick={(e) => bar.openApps(e.currentTarget)}
        >
          {t('menu.apps')}
        </button>
        <button
          type="button"
          data-flyout-trigger="menu"
          className={cn(s.button, isOpen('menu@topbar:games') && s.open)}
          onClick={(e) => bar.openGames(e.currentTarget)}
        >
          {t('menu.games')}
        </button>
      </div>

      <div className={s.group}>
        <button type="button" className={cn(s.button, s.hideMobile)} title={t('tray.downloads')} aria-label={t('tray.downloads')} onClick={bar.showDownloads}>
          <Icon name="download" className={s.icon} />
        </button>
        <button
          type="button"
          className={cn(s.button, s.hideMobile)}
          title={t(bar.muted ? 'os.unmute' : 'os.mute')}
          aria-label={t(bar.muted ? 'os.unmute' : 'os.mute')}
          aria-pressed={bar.muted}
          onClick={bar.toggleMute}
        >
          <Icon name={bar.muted ? 'volumeMute' : 'volume'} className={s.icon} />
        </button>
        <button
          type="button"
          data-flyout-trigger="quick"
          className={cn(s.button, s.hideMobile)}
          title={t('tray.more')}
          aria-label={t('tray.more')}
          onClick={(e) => bar.toggle('quick', e.currentTarget)}
        >
          <Icon name="dots" className={s.icon} />
        </button>
        <span className={s.divider} />

        {battery.supported && (
          <span className={s.static} title={t('tray.battery')}>
            <BatteryIcon level={battery.level} charging={battery.charging} />
            <span className="tabular">{Math.round(battery.level * 100)}%</span>
          </span>
        )}
        <span className={s.static} title={t('tray.network')}>
          <Icon name={bar.online ? 'wifi' : 'wifiOff'} className={s.icon} />
          <span>{t(bar.online ? 'tray.online' : 'tray.offline')}</span>
        </span>

        <button
          type="button"
          data-flyout-trigger="calendar"
          className={cn(s.button, s.clock, isOpen('calendar@topbar') && s.open)}
          onClick={(e) => bar.toggle('calendar', e.currentTarget)}
        >
          {bar.clock}
        </button>
      </div>
    </header>
  );
}
