import { useT } from '@/hooks/useT';
import { musicPlayer } from '@/services/music/player';
import { findTrack, playlist } from '@/services/music/playlist';
import { useOsStore } from '@/store/os.store';
import type { TranslationKey } from '@/types';

const repeatLabel = { off: 'spotify.repeat.off', all: 'spotify.repeat.all', one: 'spotify.repeat.one' } as const satisfies Record<
  string,
  TranslationKey
>;

// Shared state + controls for the music window and widget
export function useSpotifyPlayer() {
  const { t } = useT();
  const playback = useOsStore((s) => s.playback);
  const shuffle = useOsStore((s) => s.shuffle);
  const repeat = useOsStore((s) => s.repeat);
  const toggleShuffle = useOsStore((s) => s.toggleShuffle);
  const cycleRepeat = useOsStore((s) => s.cycleRepeat);

  const track = findTrack(playback.uri) ?? null;

  return {
    t,
    playlist,
    track,
    ready: playback.ready,
    isPlaying: !playback.isPaused,
    isBuffering: playback.isBuffering,
    position: playback.position,
    duration: playback.duration || track?.durationMs || 0,
    shuffle,
    repeat,
    repeatLabel: t(repeatLabel[repeat]),
    toggleShuffle,
    cycleRepeat,
    togglePlay: musicPlayer.togglePlay,
    next: () => musicPlayer.next(),
    previous: musicPlayer.previous,
    seek: musicPlayer.seek,
    playTrack: musicPlayer.playTrack,
  };
}

export type SpotifyPlayerApi = ReturnType<typeof useSpotifyPlayer>;
