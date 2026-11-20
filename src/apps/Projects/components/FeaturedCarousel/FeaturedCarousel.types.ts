import type { LocalizedValue, TranslateVars, TranslationKey } from '@/types';
import type { Project } from '../../Projects.types';

export interface FeaturedCarouselProps {
  projects: readonly Project[];
  onOpen: (slug: string) => void;
  t: (key: TranslationKey, vars?: TranslateVars) => string;
  tr: (value: LocalizedValue) => string;
}

// Active mouse drag on the track
export interface DragState {
  pointerId: number;
  startX: number;
  startLeft: number;
  moved: boolean;
}
