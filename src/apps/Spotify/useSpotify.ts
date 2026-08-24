import { useCallback, useEffect, useRef } from 'react';
import { musicPlayer } from '@/services/music/player';
import { formatDuration, playlist, totalDurationMs } from '@/services/music/playlist';
import { useSpotifyPlayer } from './hooks/useSpotifyPlayer';

// Music window logic: mount the YouTube player, handle the track list
export function useSpotify() {
  const player = useSpotifyPlayer();
  const videoRef = useRef<HTMLDivElement>(null);

  // The player lives as long as the window – music keeps playing while minimized
  useEffect(() => {
    const el = videoRef.current;
    const first = playlist.tracks[0];
    if (!el || !first) return;
    return musicPlayer.attach(el, first.uri);
  }, []);

  const selectTrack = useCallback(
    (uri: string) => {
      if (uri === player.track?.uri && player.ready) player.togglePlay();
      else player.playTrack(uri);
    },
    [player],
  );

  return {
    ...player,
    videoRef,
    selectTrack,
    meta: `${playlist.owner} · ${player.t('spotify.songs', { n: playlist.tracks.length })} · ${formatDuration(totalDurationMs)}`,
    formatDuration,
  };
}
