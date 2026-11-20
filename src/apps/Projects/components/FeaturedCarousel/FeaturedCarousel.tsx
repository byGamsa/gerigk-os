import { Icon } from '@/components/Icon/Icon';
import { cn } from '@/lib/cn';
import { ProjectArt } from '../ProjectArt/ProjectArt';
import { featuredCarouselStyles as s } from './FeaturedCarousel.styles';
import type { FeaturedCarouselProps } from './FeaturedCarousel.types';
import { useFeaturedCarousel } from './useFeaturedCarousel';

// Featured projects as a swipeable banner row with arrows and page dots
export function FeaturedCarousel({ projects, onOpen, t, tr }: FeaturedCarouselProps) {
  const c = useFeaturedCarousel(projects.length);

  return (
    <section className={s.root} aria-roledescription="carousel" aria-label={t('projects.featured')} {...c.rootHandlers}>
      <div className={s.viewport}>
        <div
          ref={c.trackRef}
          className={cn(s.track, c.dragging ? s.trackDragging : s.trackSnap)}
          onScroll={c.onScroll}
          {...c.trackHandlers}
        >
          {projects.map((p) => (
            <button key={p.slug} type="button" className={s.card} onClick={() => onOpen(p.slug)}>
              <span className={s.art}>
                <ProjectArt project={p} variant="banner" className={s.image} />
              </span>
              <span className={s.shade} />
              <span className={s.body}>
                <span className={s.text}>
                  <span className={s.eyebrow}>{tr(p.status)}</span>
                  <span className={s.title}>{tr(p.title)}</span>
                  <span className={s.tagline}>{tr(p.tagline)}</span>
                </span>
                <span className={s.cta}>{t('projects.view')}</span>
              </span>
            </button>
          ))}
        </div>

        {c.hasPrev && (
          <button type="button" className={s.prev} onClick={c.prev} aria-label={t('projects.carousel.prev')}>
            <Icon name="chevronLeft" className={s.arrowIcon} />
          </button>
        )}
        {c.hasNext && (
          <button type="button" className={s.next} onClick={c.next} aria-label={t('projects.carousel.next')}>
            <Icon name="chevronRight" className={s.arrowIcon} />
          </button>
        )}
      </div>

      {c.pages > 1 && (
        <div className={s.dots}>
          {Array.from({ length: c.pages }, (_, i) => (
            <button
              key={i}
              type="button"
              className={cn(s.dot, i === c.index ? s.dotActive : s.dotIdle)}
              onClick={() => c.goTo(i)}
              aria-label={t('projects.carousel.page', { n: i + 1, total: c.pages })}
              aria-current={i === c.index}
            />
          ))}
        </div>
      )}
    </section>
  );
}
