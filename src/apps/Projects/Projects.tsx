import { Icon } from '@/components/Icon/Icon';
import type { AppWindowProps } from '@/types';
import { Lightbox } from './components/Lightbox/Lightbox';
import { ProjectPage } from './components/ProjectPage/ProjectPage';
import { StoreHome } from './components/StoreHome/StoreHome';
import { projectsStyles as s } from './Projects.styles';
import type { ProjectsArgs } from './Projects.types';
import { useProjects } from './useProjects';

// Project store: front page with featured projects and categories, one product page per project
export function Projects({ windowId, args }: AppWindowProps<ProjectsArgs>) {
  const store = useProjects(windowId, args);
  const { t, tr } = store;

  return (
    <div className={s.root}>
      <div className={s.toolbar}>
        <button type="button" className={s.back} onClick={() => store.openProject()} disabled={!store.project} aria-label={t('projects.back')}>
          <Icon name="arrowLeft" className={s.backIcon} />
        </button>
        <div className={s.brand}>
          <Icon name="projects" className={s.brandIcon} />
          <span className={s.brandName}>{t('projects.store')}</span>
        </div>
        <label className={s.search}>
          <Icon name="search" className={s.searchIcon} />
          <input
            className={s.searchInput}
            value={store.query}
            onChange={(e) => {
              store.setQuery(e.target.value);
              if (store.project) store.openProject();
            }}
            placeholder={t('projects.search')}
            aria-label={t('projects.search')}
          />
        </label>
      </div>

      <div ref={store.scrollRef} className={s.scroll}>
        {store.project ? (
          <ProjectPage project={store.project} onOpenLink={store.openLink} onOpenViewer={store.openViewer} t={t} tr={tr} />
        ) : (
          <StoreHome
            featured={store.featured}
            visible={store.visible}
            filterItems={store.filterItems}
            filter={store.filter}
            isFiltering={store.isFiltering}
            onFilter={store.setFilter}
            onOpen={store.openProject}
            t={t}
            tr={tr}
          />
        )}
      </div>

      {store.viewer && (
        <Lightbox
          images={store.viewer.images}
          index={store.viewer.index}
          onIndex={store.setViewerIndex}
          onClose={store.closeViewer}
          labels={{ close: t('projects.viewer.close'), prev: t('projects.viewer.prev'), next: t('projects.viewer.next') }}
          tr={tr}
        />
      )}
    </div>
  );
}
