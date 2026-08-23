import { localize } from '@/i18n';
import { useOsStore } from '@/store/os.store';
import type { PlaylistTrack, YTPlayer, YTState } from '@/types';
import { findTrack, playlist, trackIndex } from './playlist';
import { loadYouTubeApi, RECOVERABLE_YT_ERRORS, YT_STATE } from './youtubeApi';

// Below this position "Previous" jumps to the previous song instead of the start
const RESTART_THRESHOLD_MS = 3000;
// Update interval for the progress display (the API has no progress event)
const POLL_MS = 250;

let player: YTPlayer | null = null;
let pollTimer: number | undefined;
// Which video candidate of the current song is playing
let candidate = 0;
// Guard against endless loops when no video is playable at all
let consecutiveFailures = 0;

const store = useOsStore.getState;

// ---------- Volume & mute: OS state → player ----------

function applyAudio() {
  if (!player) return;
  const { volume, muted } = store();
  player.setVolume(volume);
  if (muted) player.mute();
  else player.unMute();
}

useOsStore.subscribe((state, prev) => {
  if (state.volume !== prev.volume || state.muted !== prev.muted) applyAudio();
});

// ---------- Progress ----------

function syncProgress() {
  if (!player) return;
  store().setPlayback({
    position: player.getCurrentTime() * 1000,
    duration: player.getDuration() * 1000 || store().playback.duration,
  });
}

function startPolling() {
  window.clearInterval(pollTimer);
  pollTimer = window.setInterval(syncProgress, POLL_MS);
}

function stopPolling() {
  window.clearInterval(pollTimer);
  pollTimer = undefined;
}

// ---------- Events ----------

function onStateChange(state: YTState) {
  switch (state) {
    case YT_STATE.playing:
      consecutiveFailures = 0;
      store().setPlayback({ isPaused: false, isBuffering: false });
      startPolling();
      break;
    case YT_STATE.buffering:
      store().setPlayback({ isBuffering: true });
      break;
    case YT_STATE.paused:
    case YT_STATE.cued:
      stopPolling();
      syncProgress();
      store().setPlayback({ isPaused: true, isBuffering: false });
      break;
    case YT_STATE.ended:
      stopPolling();
      store().setPlayback({ isPaused: true });
      musicPlayer.next(true);
      break;
  }
}

// Video not embeddable/removed → next candidate, otherwise next song
function onError(code: number) {
  const track = findTrack(store().playback.uri);
  if (!track || !RECOVERABLE_YT_ERRORS.includes(code)) return;
  const nextVideo = track.videoIds[candidate + 1];
  if (nextVideo) {
    candidate += 1;
    loadVideo(track, nextVideo, true);
    return;
  }
  consecutiveFailures += 1;
  store().notify({ text: localize('spotify.unavailable', { title: track.title }), icon: 'music' });
  if (consecutiveFailures < playlist.tracks.length) musicPlayer.next(true);
}

// ---------- Helpers ----------

function loadVideo(track: PlaylistTrack, videoId: string, autoplay: boolean) {
  if (!player) return;
  store().setPlayback({ uri: track.uri, videoId, position: 0, duration: track.durationMs, isBuffering: autoplay });
  if (autoplay) player.loadVideoById(videoId);
  else player.cueVideoById(videoId);
}

function neighbour(direction: 1 | -1, auto: boolean): string | null {
  const { shuffle, repeat, playback } = store();
  const tracks = playlist.tracks;
  if (tracks.length === 0) return null;
  const current = trackIndex(playback.uri);

  if (auto && repeat === 'one' && playback.uri) return playback.uri;
  if (shuffle && tracks.length > 1) {
    let i = current;
    while (i === current) i = Math.floor(Math.random() * tracks.length);
    return tracks[i]!.uri;
  }
  const next = current + direction;
  if (next >= 0 && next < tracks.length) return tracks[next]!.uri;
  if (repeat === 'off' && auto) return null;
  return tracks[(next + tracks.length) % tracks.length]!.uri;
}

// Controls the single YouTube player of the music app (DOM element provided by the window)
export const musicPlayer = {
  // Creates the player in the element (song is only cued, not started). Returns a cleanup function.
  attach(element: HTMLElement, initialUri: string): () => void {
    let disposed = false;
    const target = document.createElement('div');
    element.appendChild(target);
    const track = findTrack(initialUri);
    candidate = 0;
    store().setPlayback({ uri: initialUri, videoId: track?.videoIds[0] ?? null, duration: track?.durationMs ?? 0 });

    loadYouTubeApi()
      .then((YT) => {
        if (disposed) return;
        player = new YT.Player(target, {
          // Privacy-enhanced mode: no YouTube cookies until a video is played
          host: 'https://www.youtube-nocookie.com',
          width: '100%',
          height: '100%',
          videoId: track?.videoIds[0],
          playerVars: { playsinline: 1, rel: 0, controls: 0, iv_load_policy: 3, disablekb: 1, fs: 0, origin: window.location.origin },
          events: {
            onReady: () => {
              applyAudio();
              store().setPlayback({ ready: true });
            },
            onStateChange: (e) => onStateChange(e.data),
            onError: (e) => onError(e.data),
          },
        });
      })
      .catch((error: unknown) => console.error(error));

    return () => {
      disposed = true;
      stopPolling();
      player?.destroy();
      player = null;
      element.replaceChildren();
      store().resetPlayback();
    };
  },

  playTrack(uri: string) {
    const track = findTrack(uri);
    if (!player || !track) return;
    candidate = 0;
    const videoId = track.videoIds[0];
    if (!videoId) {
      store().setPlayback({ uri });
      return onError(150);
    }
    loadVideo(track, videoId, true);
  },

  togglePlay() {
    if (!player) return;
    if (player.getPlayerState() === YT_STATE.playing) player.pauseVideo();
    else player.playVideo();
  },

  next(auto = false) {
    const uri = neighbour(1, auto);
    if (!uri) return player?.pauseVideo();
    if (uri === store().playback.uri) {
      player?.seekTo(0, true);
      player?.playVideo();
    } else {
      musicPlayer.playTrack(uri);
    }
  },

  previous() {
    if (store().playback.position > RESTART_THRESHOLD_MS) return musicPlayer.seek(0);
    const uri = neighbour(-1, false);
    if (uri) musicPlayer.playTrack(uri);
  },

  // Position in milliseconds
  seek(ms: number) {
    if (!player) return;
    store().setPlayback({ position: ms });
    player.seekTo(ms / 1000, true);
  },
};
