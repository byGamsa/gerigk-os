import { Icon } from '@/components/Icon/Icon';
import type { AppWidgetProps } from '@/types';
import { ProgressBar } from '../components/ProgressBar/ProgressBar';
import { TransportControls } from '../components/TransportControls/TransportControls';
import { spotifyWidgetStyles as s } from './SpotifyWidget.styles';
import { useSpotifyWidget } from './useSpotifyWidget';

// Mini player while the Spotify window is minimized
export function SpotifyWidget({ windowId }: AppWidgetProps) {
  const w = useSpotifyWidget(windowId);
  const { t } = w;

  return (
    <section className={s.root} aria-label="Spotify">
      {w.cover && <div className={s.glow} style={{ backgroundImage: `url(${w.cover})` }} />}

      <div className={s.header}>
        {w.cover ? (
          <img src={w.cover} alt="" className={s.cover} draggable={false} />
        ) : (
          <span className={s.coverFallback}>
            <Icon name="music" className={s.coverFallbackIcon} />
          </span>
        )}
        <div className={s.text}>
          <div className={s.title}>{w.title}</div>
          <div className={s.artist}>{w.artist}</div>
        </div>
        <div className={s.actions}>
          <a href={w.link} target="_blank" rel="noreferrer" className={s.action} aria-label={t('spotify.open')} title={t('spotify.open')}>
            <Icon name="spotify" className={s.brand} />
          </a>
          <button type="button" className={s.action} onClick={w.expand} aria-label={t('spotify.expand')} title={t('spotify.expand')}>
            <Icon name="expand" className={s.actionIcon} />
          </button>
          <button type="button" className={s.action} onClick={w.close} aria-label={t('spotify.close')} title={t('spotify.close')}>
            <Icon name="close" className={s.actionIcon} />
          </button>
        </div>
      </div>

      <TransportControls player={w} size="sm" />
      <ProgressBar position={w.position} duration={w.duration} onSeek={w.seek} label={t('spotify.seek')} disabled={!w.ready} />
    </section>
  );
}
