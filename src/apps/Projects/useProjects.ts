import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useT } from '@/hooks/useT';
import { useWindowTitle } from '@/hooks/useWindowTitle';
import { localize } from '@/i18n';
import { launchApp } from '@/services/launcher';
import { useOsStore } from '@/store/os.store';
import type { BrowserArgs } from '@/types';
import { categoryLabels, findProject, projects } from './projects.content';
import type { OpenLink, OpenViewer, ProjectFilter, ProjectsArgs, ViewerState } from './Projects.types';

const filters: readonly ProjectFilter[] = ['all', 'games', 'web', 'mobile', 'desktop', 'cloud', 'ai'];

// Store navigation (home ↔ project page), search and category filter
export function useProjects(windowId: string, args: ProjectsArgs) {
  const { t, tr } = useT();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<ProjectFilter>('all');
  const [viewer, setViewer] = useState<ViewerState | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const project = findProject(args.project);

  useWindowTitle(windowId, project ? project.title : localize('projects.title'));

  // The current page lives in the window args → terminal/launcher can deep-link a project
  const openProject = useCallback(
    (slug?: string) => useOsStore.getState().setWindowArgs(windowId, (slug ? { project: slug } : {}) satisfies ProjectsArgs),
    [windowId],
  );

  // Every page change starts at the top and closes the screenshot viewer
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    setViewer(null);
  }, [project?.slug]);

  const openViewer: OpenViewer = useCallback((images, index) => setViewer({ images, index }), []);
  const setViewerIndex = useCallback((index: number) => setViewer((v) => (v ? { ...v, index } : v)), []);
  const closeViewer = useCallback(() => setViewer(null), []);

  const openLink: OpenLink = useCallback((href, origin) => launchApp<BrowserArgs>('brave', { url: href }, origin), []);

  const needle = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      projects.filter((p) => {
        if (filter !== 'all' && p.category !== filter) return false;
        if (!needle) return true;
        const haystack = [tr(p.title), tr(p.tagline), tr(categoryLabels[p.category]), ...p.tags].join(' ').toLowerCase();
        return haystack.includes(needle);
      }),
    [filter, needle, tr],
  );

  const filterItems = filters.map((id) => ({
    id,
    label: id === 'all' ? t('projects.all') : tr(categoryLabels[id]),
  }));

  return {
    t,
    tr,
    project,
    openProject,
    openLink,
    viewer,
    openViewer,
    setViewerIndex,
    closeViewer,
    scrollRef,
    query,
    setQuery,
    filter,
    setFilter,
    filterItems,
    visible,
    featured: projects.filter((p) => p.featured),
    isFiltering: filter !== 'all' || needle.length > 0,
  };
}
