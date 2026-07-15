import { cn } from '@/lib/cn';
import { Icon } from '../Icon/Icon';
import { BatteryIcon } from './BatteryIcon';
import { trayStyles as s } from './Tray.styles';
import { useTray } from './useTray';

export function Tray() {
  const tray = useTray();
  const { t, locale, battery } = tray;
  const batteryLabel = `${t('tray.battery')}: ${Math.round(battery.level * 100)} %${battery.charging ? ` · ${t('tray.charging')}` : ''}`;

  return (
    <div className={s.root}>
      <button
        type="button"
        data-flyout-trigger="quick"
        title={t('tray.hidden')}
        aria-label={t('tray.hidden')}
        className={cn(s.button, s.hideMobile, tray.openFlyout === 'quick' && s.open)}
        onClick={(e) => tray.toggle('quick', e.currentTarget)}
      >
        <Icon name="chevronUp" className={s.icon} />
      </button>

      <button
        type="button"
        title={t('tray.language')}
        aria-label={t('tray.language')}
        className={cn(s.button, s.lang)}
        onClick={tray.toggleLang}
      >
        <span key={tray.lang} className={s.langSwitch}>
          {locale.short}
        </span>
      </button>

      <button
        type="button"
        data-flyout-trigger="quick"
        className={cn(s.button, s.status, tray.openFlyout === 'quick' && s.open)}
        onClick={(e) => tray.toggle('quick', e.currentTarget)}
        aria-label={t('tray.hidden')}
      >
        <Icon name={tray.online ? 'wifi' : 'wifiOff'} className={s.icon} aria-label={t('tray.network')} />
        {battery.supported && <BatteryIcon level={battery.level} charging={battery.charging} aria-label={batteryLabel} />}
      </button>

      <button
        type="button"
        className={cn(s.button, s.hideMobile, tray.muted && s.muted)}
        onClick={tray.toggleMute}
        aria-pressed={tray.muted}
        aria-label={t(tray.muted ? 'os.unmute' : 'os.mute')}
        title={t(tray.muted ? 'os.unmute' : 'os.mute')}
      >
        <Icon name={tray.muted ? 'volumeMute' : 'volume'} className={s.icon} />
      </button>

      <button
        type="button"
        data-flyout-trigger="calendar"
        title={t('tray.clock')}
        aria-label={t('tray.clock')}
        className={cn(s.button, s.clock, tray.openFlyout === 'calendar' && s.open)}
        onClick={(e) => tray.toggle('calendar', e.currentTarget)}
      >
        <span className="tabular">{tray.time}</span>
        <span className="tabular">{tray.date}</span>
      </button>
    </div>
  );
}
