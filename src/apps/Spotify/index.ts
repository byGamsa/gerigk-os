import { defineApp } from '../defineApp';
import { Spotify } from './Spotify';
import { SpotifyWidget } from './widget/SpotifyWidget';

export const spotifyApp = defineApp({
  id: 'spotify',
  title: 'Spotify',
  icon: 'spotify',
  category: 'portfolio',
  component: Spotify,
  widget: SpotifyWidget,
  pinned: true,
  window: { width: 860, height: 620, minWidth: 380, minHeight: 420 },
});
