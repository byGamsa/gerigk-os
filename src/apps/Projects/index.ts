import { defineApp } from '../defineApp';
import { Projects } from './Projects';
import type { ProjectsArgs } from './Projects.types';

export type { ProjectsArgs } from './Projects.types';

export const projectsApp = defineApp<ProjectsArgs>({
  id: 'projects',
  title: { de: 'Projekte', en: 'Projects' },
  icon: 'projects',
  category: 'portfolio',
  component: Projects,
  desktop: true,
  window: { width: 900, height: 640, minWidth: 360, minHeight: 360 },
});
