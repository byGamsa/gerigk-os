import type { ResizeDirection } from '@/types';

export interface WindowProps {
  id: string;
}

export interface ResizeHandle {
  dir: ResizeDirection;
  className: string;
}
