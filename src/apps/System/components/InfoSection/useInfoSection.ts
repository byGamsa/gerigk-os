import { useId, useState } from 'react';
import { useT } from '@/hooks/useT';
import type { InfoSectionProps } from './InfoSection.types';

// Expand/collapse an info section
export function useInfoSection({ defaultOpen = true }: InfoSectionProps) {
  const { t } = useT();
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return {
    t,
    open,
    toggle: () => setOpen((o) => !o),
    contentId,
  };
}
