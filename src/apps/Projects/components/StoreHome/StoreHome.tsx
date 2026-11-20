import { cn } from '@/lib/cn';
import { categoryLabels } from '../../projects.content';
import { FeaturedCarousel } from '../FeaturedCarousel/FeaturedCarousel';
import { ProjectArt } from '../ProjectArt/ProjectArt';
import { storeHomeStyles as s } from './StoreHome.styles';
import type { StoreHomeProps } from './StoreHome.types';

// Store front page: featured banners on top, then all projects with category chips
export function StoreHome({ featured, visible, filterItems, filter, isFiltering, onFilter, onOpen, t, tr }: StoreHomeProps) {
  return (
    <div className={s.root}>
      {!isFiltering && <FeaturedCarousel projects={featured} onOpen={onOpen} t={t} tr={tr} />}

      <section className={s.section}>
        <h2 className={s.heading}>{t('projects.allProjects')}</h2>

        <div className={s.chips} role="tablist">
          {filterItems.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              className={cn(s.chip, filter === item.id && s.chipActive)}
              onClick={() => onFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className={s.empty}>{t('projects.empty')}</p>
        ) : (
          <ul className={s.grid}>
            {visible.map((p) => (
              <li key={p.slug}>
                <button type="button" className={s.row} onClick={() => onOpen(p.slug)}>
                  <ProjectArt project={p} variant="icon" className={s.rowArt} />
                  <span className={s.rowText}>
                    <span className={s.rowTitle}>{tr(p.title)}</span>
                    <span className={s.rowTagline}>{tr(p.tagline)}</span>
                    <span className={s.rowMeta}>
                      {tr(categoryLabels[p.category])} · {tr(p.year)}
                    </span>
                  </span>
                  <span className={s.rowCta}>{t('projects.view')}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
