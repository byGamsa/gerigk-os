import { Icon } from '@/components/Icon/Icon';
import { VolumeControl } from '@/components/VolumeControl/VolumeControl';
import { cn } from '@/lib/cn';
import type { AppWindowProps } from '@/types';
import { Equalizer } from './components/Equalizer/Equalizer';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { TransportControls } from './components/TransportControls/TransportControls';
import { spotifyStyles as s } from './Spotify.styles';
import { useSpotify } from './useSpotify';

export function Spotify(_props: AppWindowProps) {
  const sp = useSpotify();
  const { t, playlist } = sp;

  return (
    <div className={s.root}>
      <div className={s.scroll}>
        {playlist.cover && (
          <div className={s.ambient} aria-hidden>
            <div className={s.ambientImage} style={{ backgroundImage: `url(${playlist.cover})` }} />
          </div>
        )}
        <header className={s.hero}>
          <div className={s.video}>
            {playlist.cover && <img src={playlist.cover} alt="" className={s.videoPoster} draggable={false} />}
            <div ref={sp.videoRef} className={s.videoHost} />
          </div>
          <div className={s.heroText}>
            <div className={s.label}>{t('spotify.playlist')}</div>
            <h1 className={s.name}>{playlist.name}</h1>
            <div className={s.meta}>{sp.meta}</div>
            <div className={s.actions}>
              <button
                type="button"
                className={s.bigPlay}
                onClick={sp.togglePlay}
                disabled={!sp.ready}
                aria-label={t(sp.isPlaying ? 'spotify.pause' : 'spotify.play')}
              >
                <Icon name={sp.isPlaying ? 'pause' : 'play'} className={s.bigPlayIcon} />
              </button>
              <button
                type="button"
                className={cn(s.iconAction, sp.shuffle && s.iconActionActive)}
                onClick={sp.toggleShuffle}
                aria-pressed={sp.shuffle}
                aria-label={t('spotify.shuffle')}
                title={t('spotify.shuffle')}
              >
                <Icon name="shuffle" className={s.iconActionIcon} />
              </button>
              <a href={playlist.url} target="_blank" rel="noreferrer" className={s.iconAction} aria-label={t('spotify.open')} title={t('spotify.open')}>
                <Icon name="externalLink" className={s.iconActionIcon} />
              </a>
            </div>
            <p className={s.source}>{t('spotify.source')}</p>
          </div>
        </header>

        <div className={s.list} role="list">
          <div className={s.head}>
            <span className={s.headIndex}>#</span>
            <span>{t('spotify.col.title')}</span>
            <span className={s.headDuration} title={t('spotify.col.duration')}>
              <Icon name="clock" className={s.headIcon} aria-label={t('spotify.col.duration')} />
            </span>
          </div>
          {playlist.tracks.map((track, i) => {
            const current = track.uri === sp.track?.uri;
            return (
              <button
                key={track.uri}
                type="button"
                role="listitem"
                className={cn(s.row, current && s.rowCurrent)}
                onClick={() => sp.selectTrack(track.uri)}
                aria-current={current || undefined}
              >
                <span className={s.index}>
                  {current && sp.isPlaying ? <Equalizer playing /> : <span className={s.indexNumber}>{i + 1}</span>}
                  {!(current && sp.isPlaying) && <Icon name="play" className={s.indexPlay} />}
                </span>
                <span className={s.trackInfo}>
                  {track.cover ? (
                    <img src={track.cover} alt="" loading="lazy" className={s.trackCover} draggable={false} />
                  ) : (
                    <span className={s.trackCover} />
                  )}
                  <span className={s.trackText}>
                    <span className={cn('block', s.trackTitle, current && s.trackTitleCurrent)}>{track.title}</span>
                    <span className={s.trackArtist}>
                      {track.explicit && <span className={s.explicit}>E</span>}
                      <span className="truncate">{track.artist}</span>
                    </span>
                  </span>
                </span>
                <span className={s.duration}>{sp.formatDuration(track.durationMs)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <footer className={s.footer}>
        <div className={s.nowPlaying}>
          {sp.track?.cover ? (
            <img src={sp.track.cover} alt="" className={s.nowCover} draggable={false} />
          ) : (
            <span className={s.nowCover} />
          )}
          <div className={s.trackText}>
            <div className={s.nowTitle}>{sp.track?.title ?? playlist.name}</div>
            <div className={s.nowArtist}>{sp.track?.artist ?? playlist.owner}</div>
          </div>
        </div>
        <div className={s.controls}>
          <TransportControls player={sp} />
          <ProgressBar position={sp.position} duration={sp.duration} onSeek={sp.seek} label={t('spotify.seek')} disabled={!sp.ready} />
        </div>
        <VolumeControl className={s.volume} />
      </footer>
    </div>
  );
}
