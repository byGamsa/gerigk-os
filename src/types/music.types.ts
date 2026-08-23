// ---------- Playlist data (from scripts/sync-playlist.mjs) ----------

export interface PlaylistTrack {
  // Spotify URI – serves as a stable track ID
  uri: string;
  // Spotify track ID
  id: string;
  title: string;
  artist: string;
  durationMs: number;
  explicit: boolean;
  cover: string | null;
  // YouTube videos as playback source, best match first
  videoIds: string[];
}

export interface Playlist {
  id: string;
  uri: string;
  // Link to the playlist on Spotify
  url: string;
  name: string;
  owner: string;
  cover: string | null;
  syncedAt: string;
  tracks: PlaylistTrack[];
}

// ---------- Playback state ----------

export type RepeatMode = 'off' | 'all' | 'one';

export interface PlaybackState {
  // YouTube player is initialized
  ready: boolean;
  // Current track (Spotify URI)
  uri: string | null;
  // Currently loaded YouTube video
  videoId: string | null;
  isPaused: boolean;
  isBuffering: boolean;
  // Milliseconds
  position: number;
  // Milliseconds
  duration: number;
}

// ---------- YouTube IFrame Player API (used parts only) ----------

// -1 unstarted · 0 ended · 1 playing · 2 paused · 3 buffering · 5 cued (see YT_STATE)
export type YTState = -1 | 0 | 1 | 2 | 3 | 5;

export interface YTPlayer {
  loadVideoById(videoId: string, startSeconds?: number): void;
  cueVideoById(videoId: string, startSeconds?: number): void;
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  setVolume(volume: number): void;
  mute(): void;
  unMute(): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): YTState;
  destroy(): void;
}

export interface YTPlayerEvent<T = number> {
  target: YTPlayer;
  data: T;
}

export interface YTPlayerOptions {
  // e.g. https://www.youtube-nocookie.com (privacy-enhanced mode)
  host?: string;
  width?: number | string;
  height?: number | string;
  videoId?: string;
  playerVars?: Record<string, string | number>;
  events?: {
    onReady?: (event: YTPlayerEvent<null>) => void;
    onStateChange?: (event: YTPlayerEvent<YTState>) => void;
    onError?: (event: YTPlayerEvent<number>) => void;
  };
}

export interface YTNamespace {
  Player: new (element: HTMLElement, options: YTPlayerOptions) => YTPlayer;
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}
