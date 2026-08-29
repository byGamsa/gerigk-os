import { clamp } from '@/lib/math';
import type { PlaybackState, RepeatMode } from '@/types';
import type { MediaSlice, SliceCreator } from '../os.store.types';

export const initialPlayback: PlaybackState = {
  ready: false,
  uri: null,
  videoId: null,
  isPaused: true,
  isBuffering: false,
  position: 0,
  duration: 0,
};

const nextRepeat: Record<RepeatMode, RepeatMode> = { off: 'all', all: 'one', one: 'off' };

export const createMediaSlice: SliceCreator<MediaSlice> = (set) => ({
  playback: initialPlayback,
  shuffle: false,
  repeat: 'all',
  volume: 70,

  setPlayback: (patch) => set((s) => ({ playback: { ...s.playback, ...patch } })),
  resetPlayback: () => set({ playback: initialPlayback }),
  toggleShuffle: () => set((s) => ({ shuffle: !s.shuffle })),
  cycleRepeat: () => set((s) => ({ repeat: nextRepeat[s.repeat] })),
  // Raising the volume unmutes (like Windows)
  setVolume: (volume) =>
    set((s) => {
      const v = Math.round(clamp(volume, 0, 100));
      return { volume: v, muted: v > 0 ? false : s.muted };
    }),
});
