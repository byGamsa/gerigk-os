import { useCallback } from 'react';
import { playlist, trackUrl } from '@/services/music/playlist';
import { useOsStore } from '@/store/os.store';
import { useSpotifyPlayer } from '../hooks/useSpotifyPlayer';

export function useSpotifyWidget(windowId: string) {
  const player = useSpotifyPlayer();
  const expand = useCallback(() => useOsStore.getState().focusWindow(windowId), [windowId]);
  const close = useCallback(() => useOsStore.getState().closeWindow(windowId), [windowId]);

  return {
    ...player,
    cover: player.track?.cover ?? playlist.cover,
    title: player.track?.title ?? playlist.name,
    artist: player.track?.artist ?? playlist.owner,
    link: player.track ? trackUrl(player.track) : playlist.url,
    expand,
    close,
  };
}
