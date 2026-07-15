import type { PresencePhase } from '@/hooks/usePresence';
import type { AnyAppDefinition } from '@/types';

export interface TaskbarItem {
  app: AnyAppDefinition;
  running: boolean;
  active: boolean;
  phase: PresencePhase;
}

export interface TaskbarButtonProps {
  item: TaskbarItem;
  label: string;
  onActivate: (appId: string, el: HTMLElement) => void;
}
