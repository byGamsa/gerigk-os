import { useMemo } from 'react';
import type { IconName } from '@/components/Icon/Icon.types';
import { categoryLabels } from '../../projects.content';
import type { ProjectLink, ProjectScreenshot } from '../../Projects.types';
import type { InfoCell, ProjectPageProps } from './ProjectPage.types';

const linkIcons: Record<ProjectLink['kind'], IconName> = {
  github: 'code',
  site: 'globe',
  video: 'play',
  docs: 'document',
};

// Gallery (cover + screenshots), info strip and links of a project page
export function useProjectPage({ project, t, tr }: ProjectPageProps) {
  const gallery = useMemo<ProjectScreenshot[]>(() => {
    const shots = [...project.screenshots];
    if (project.cover && !shots.some((shot) => shot.src === project.cover)) {
      shots.unshift({ src: project.cover, caption: project.title });
    }
    return shots;
  }, [project]);

  const info: InfoCell[] = [
    { label: t('projects.info.year'), value: tr(project.year) },
    { label: t('projects.info.category'), value: tr(categoryLabels[project.category]) },
    { label: t('projects.info.team'), value: tr(project.team) },
    { label: t('projects.info.status'), value: tr(project.status) },
  ];

  const links = project.links.map((link) => ({
    ...link,
    icon: linkIcons[link.kind],
    host: new URL(link.href).host.replace(/^www\./, ''),
  }));

  return {
    gallery,
    info,
    links,
    primary: links[0],
  };
}
