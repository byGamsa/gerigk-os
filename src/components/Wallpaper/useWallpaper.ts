import { useEffect, useRef, useState } from 'react';
import { useT } from '@/hooks/useT';
import { loadRandomWallpaper, type LoadedWallpaper } from '@/services/wallpaper/wallpaperService';

// Loads a random Unsplash wallpaper on every start (and on demand)
export function useWallpaper() {
  const { t } = useT();
  const [current, setCurrent] = useState<LoadedWallpaper | null>(null);
  // Previous image stays underneath while switching → smooth crossfade
  const [previous, setPrevious] = useState<LoadedWallpaper | null>(null);

  const currentRef = useRef<LoadedWallpaper | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadRandomWallpaper()
      .then((next) => {
        if (cancelled || !next) return;
        setPrevious(currentRef.current);
        currentRef.current = next;
        setCurrent(next);
      })
      .catch((error: unknown) => console.warn('[wallpaper]', error));
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    current,
    previous,
    credit: current ? t('wallpaper.credit', { name: current.wallpaper.author }) : null,
    creditTitle: t('wallpaper.openOnUnsplash'),
  };
}
