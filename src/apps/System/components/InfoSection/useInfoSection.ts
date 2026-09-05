import { useCallback, useId, useState } from 'react';
import { useT } from '@/hooks/useT';
import { localize } from '@/i18n';
import { useOsStore } from '@/store/os.store';
import { sectionToText } from '../../system.content';
import type { InfoSectionProps } from './InfoSection.types';

// Expand/collapse and copy an info section
export function useInfoSection({ section, defaultOpen = true }: InfoSectionProps) {
  const { t } = useT();
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  const copy = useCallback(async () => {
    const text = sectionToText(section.title, section.rows, section.paragraphs);
    try {
      await navigator.clipboard.writeText(text);
      useOsStore.getState().notify({ text: localize('system.copied'), icon: 'copy' });
    } catch {
      useOsStore.getState().notify({ text: localize('system.copyFailed'), icon: 'copy' });
    }
  }, [section]);

  return {
    t,
    open,
    toggle: () => setOpen((o) => !o),
    contentId,
    copy,
  };
}
