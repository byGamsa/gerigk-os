import type { Project } from '../../Projects.types';

export interface ProjectArtProps {
  project: Project;
  // `icon` = square app icon, `banner` = wide cover
  variant: 'icon' | 'banner';
  className?: string;
}
