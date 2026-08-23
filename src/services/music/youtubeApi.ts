import type { YTNamespace, YTState } from '@/types';

const SCRIPT_SRC = 'https://www.youtube.com/iframe_api';

export const YT_STATE = {
  unstarted: -1,
  ended: 0,
  playing: 1,
  paused: 2,
  buffering: 3,
  cued: 5,
} as const satisfies Record<string, YTState>;

// Error codes where another video may help (not embeddable, removed, invalid)
export const RECOVERABLE_YT_ERRORS: readonly number[] = [2, 5, 100, 101, 150];

let apiPromise: Promise<YTNamespace> | null = null;

// Loads the official YouTube IFrame Player API exactly once
export function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  apiPromise ??= new Promise<YTNamespace>((resolve, reject) => {
    window.onYouTubeIframeAPIReady = () => (window.YT ? resolve(window.YT) : reject(new Error('YT fehlt')));
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onerror = () => {
      apiPromise = null;
      script.remove();
      reject(new Error('YouTube IFrame API konnte nicht geladen werden'));
    };
    document.head.appendChild(script);
  });
  return apiPromise;
}
