import { useFullscreen } from '@/hooks/useFullscreen';
import { useT } from '@/hooks/useT';
import { useOsStore } from '@/store/os.store';
import type { QuickTile } from './QuickSettings.types';

export function useQuickSettings() {
  const { t } = useT();
  const fullscreen = useFullscreen();
  const muted = useOsStore((s) => s.muted);
  const { toggleLang, toggleMute, resetIconPositions } = useOsStore.getState();

  const tiles: QuickTile[] = [
    { id: 'lang', icon: 'globe', label: t('qs.language'), value: t('qs.languageName'), active: true, onToggle: toggleLang },
    { id: 'sound', icon: muted ? 'volumeMute' : 'volume', label: t('qs.sound'), value: t(muted ? 'qs.off' : 'qs.on'), active: !muted, onToggle: toggleMute },
    ...(fullscreen.supported
      ? [{ id: 'fullscreen', icon: 'fullscreen' as const, label: t('qs.fullscreen'), value: t(fullscreen.active ? 'qs.on' : 'qs.off'), active: fullscreen.active, onToggle: fullscreen.toggle }]
      : []),
    { id: 'arrange', icon: 'grid', label: t('qs.arrange'), active: false, onToggle: resetIconPositions },
  ];

  return { t, tiles };
}
