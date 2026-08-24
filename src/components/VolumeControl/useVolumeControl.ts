import { useCallback, type ChangeEvent } from 'react';
import { useT } from '@/hooks/useT';
import { useOsStore } from '@/store/os.store';
import type { IconName } from '../Icon/Icon.types';

// OS-wide volume (controls the music player)
export function useVolumeControl() {
  const { t } = useT();
  const volume = useOsStore((s) => s.volume);
  const muted = useOsStore((s) => s.muted);
  const setVolume = useOsStore((s) => s.setVolume);
  const toggleMute = useOsStore((s) => s.toggleMute);

  const effective = muted ? 0 : volume;
  const icon: IconName = effective === 0 ? 'volumeMute' : effective < 45 ? 'volumeLow' : 'volume';

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setVolume(Number(e.target.value)), [setVolume]);

  return {
    value: effective,
    muted,
    icon,
    onChange,
    toggleMute,
    label: t('os.volume'),
    muteLabel: t(muted ? 'os.unmute' : 'os.mute'),
  };
}
