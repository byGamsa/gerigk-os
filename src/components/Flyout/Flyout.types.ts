import type { ReactNode } from 'react';
import type { FlyoutId } from '@/types';

export type FlyoutAlign = 'anchor' | 'screen';

export interface FlyoutProps {
  id: FlyoutId;
  children: ReactNode;
  className?: string;
  // `screen` centers horizontally on the screen (start menu)
  align?: FlyoutAlign;
  ariaLabel?: string;
}

export type FlyoutSide = 'top' | 'bottom';
