import type { LocalizedValue, TranslateVars, TranslationKey } from '@/types';
import type { Project, ProjectFilter } from '../../Projects.types';

export interface FilterItem {
  id: ProjectFilter;
  label: string;
}

export interface StoreHomeProps {
  featured: readonly Project[];
  visible: readonly Project[];
  filterItems: readonly FilterItem[];
  filter: ProjectFilter;
  isFiltering: boolean;
  onFilter: (filter: ProjectFilter) => void;
  onOpen: (slug: string) => void;
  t: (key: TranslationKey, vars?: TranslateVars) => string;
  tr: (value: LocalizedValue) => string;
}
