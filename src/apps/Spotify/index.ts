import { defineApp } from '../defineApp';
import { Spotify } from './Spotify';

export const spotifyApp = defineApp({
  id: 'spotify',
  title: 'Spotify',
  icon: 'spotify',
  category: 'portfolio',
  component: Spotify,
  pinned: true,
  window: { width: 860, height: 620, minWidth: 380, minHeight: 420 },
});
