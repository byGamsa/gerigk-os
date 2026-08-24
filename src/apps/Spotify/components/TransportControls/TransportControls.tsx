import { Icon } from '@/components/Icon/Icon';
import { cn } from '@/lib/cn';
import { transportStyles as s } from './TransportControls.styles';
import type { TransportControlsProps } from './TransportControls.types';

export function TransportControls({ player, size = 'md', className }: TransportControlsProps) {
  const { t } = player;
  const button = cn(s.button, s.buttonSize[size]);

  return (
    <div className={cn(s.root, s.gap[size], className)}>
      <button
        type="button"
        className={cn(button, player.shuffle && s.toggleActive)}
        onClick={player.toggleShuffle}
        aria-pressed={player.shuffle}
        aria-label={t('spotify.shuffle')}
        title={t('spotify.shuffle')}
      >
        <Icon name="shuffle" className={s.icon[size]} />
      </button>
      <button type="button" className={button} onClick={player.previous} disabled={!player.ready} aria-label={t('spotify.previous')} title={t('spotify.previous')}>
        <Icon name="skipBack" className={s.icon[size]} />
      </button>
      <button
        type="button"
        className={cn(s.play, s.playSize[size])}
        onClick={player.togglePlay}
        disabled={!player.ready}
        aria-label={t(player.isPlaying ? 'spotify.pause' : 'spotify.play')}
        title={t(player.isPlaying ? 'spotify.pause' : 'spotify.play')}
      >
        <Icon name={player.isPlaying ? 'pause' : 'play'} className={s.playIcon[size]} />
      </button>
      <button type="button" className={button} onClick={player.next} disabled={!player.ready} aria-label={t('spotify.next')} title={t('spotify.next')}>
        <Icon name="skipForward" className={s.icon[size]} />
      </button>
      <button
        type="button"
        className={cn(button, player.repeat !== 'off' && s.toggleActive)}
        onClick={player.cycleRepeat}
        aria-label={player.repeatLabel}
        title={player.repeatLabel}
      >
        <Icon name={player.repeat === 'one' ? 'repeatOne' : 'repeat'} className={s.icon[size]} />
      </button>
    </div>
  );
}
