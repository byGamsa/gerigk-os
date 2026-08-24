import type { SpotifyPlayerApi } from '../../hooks/useSpotifyPlayer';

export type TransportSize = 'sm' | 'md';

export interface TransportControlsProps {
  player: SpotifyPlayerApi;
  size?: TransportSize;
  className?: string;
}
