import type { SiteInfo } from '@/types';

export interface PreviewPageProps {
  url: string;
  site: SiteInfo;
  onOpenExternal: () => void;
}
