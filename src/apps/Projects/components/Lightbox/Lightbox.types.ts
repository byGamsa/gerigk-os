import type { ProjectScreenshot } from '../../Projects.types';

export interface LightboxProps {
  images: readonly ProjectScreenshot[];
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
  labels: { close: string; prev: string; next: string };
  tr: (value: ProjectScreenshot['caption']) => string;
}
