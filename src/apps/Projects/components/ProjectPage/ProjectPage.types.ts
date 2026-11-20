import type { LocalizedValue, TranslateVars, TranslationKey } from '@/types';
import type { OpenLink, OpenViewer, Project } from '../../Projects.types';

export interface ProjectPageProps {
  project: Project;
  onOpenLink: OpenLink;
  onOpenViewer: OpenViewer;
  t: (key: TranslationKey, vars?: TranslateVars) => string;
  tr: (value: LocalizedValue) => string;
}

export interface InfoCell {
  label: string;
  value: string;
}
