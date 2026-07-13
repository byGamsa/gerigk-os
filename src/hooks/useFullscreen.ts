import { useCallback, useEffect, useState } from 'react';

export function useFullscreen() {
  const [active, setActive] = useState(() => Boolean(document.fullscreenElement));

  useEffect(() => {
    const update = () => setActive(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', update);
    return () => document.removeEventListener('fullscreenchange', update);
  }, []);

  const toggle = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen?.().catch(() => undefined);
  }, []);

  return { active, toggle, supported: Boolean(document.documentElement.requestFullscreen) };
}
