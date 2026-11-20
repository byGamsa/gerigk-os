import { Icon } from '@/components/Icon/Icon';
import { osConfig } from '@/config/os.config';
import { ProjectArt } from '../ProjectArt/ProjectArt';
import { projectPageStyles as s } from './ProjectPage.styles';
import type { ProjectPageProps } from './ProjectPage.types';
import { useProjectPage } from './useProjectPage';

// Product page of a project: header with "Open", info strip, screenshots, description, tech stack, links
export function ProjectPage(props: ProjectPageProps) {
  const { project, onOpenLink, onOpenViewer, t, tr } = props;
  const page = useProjectPage(props);

  return (
    <article className={s.root}>
      <header className={s.header}>
        <ProjectArt project={project} variant="icon" className={s.icon} />
        <div className={s.headText}>
          <h1 className={s.title}>{tr(project.title)}</h1>
          <p className={s.tagline}>{tr(project.tagline)}</p>
          <p className={s.owner}>{osConfig.owner}</p>
          <div className={s.actions}>
            {page.primary ? (
              <button type="button" className={s.primary} onClick={(e) => onOpenLink(page.primary!.href, e.currentTarget)}>
                {t('projects.open')}
                <Icon name="externalLink" className={s.primaryIcon} />
              </button>
            ) : (
              <span className={s.privateBadge}>
                <Icon name="lock" className={s.privateIcon} />
                {t('projects.private')}
              </span>
            )}
          </div>
        </div>
      </header>

      <dl className={s.info}>
        {page.info.map((cell) => (
          <div key={cell.label} className={s.infoCell}>
            <dt className={s.infoLabel}>{cell.label}</dt>
            <dd className={s.infoValue} title={cell.value}>
              {cell.value}
            </dd>
          </div>
        ))}
      </dl>

      {page.gallery.length > 0 && (
        <div className={s.gallery} aria-label={t('projects.screenshots')}>
          {page.gallery.map((shot, i) => (
            <button key={shot.src} type="button" className={s.shot} onClick={() => onOpenViewer(page.gallery, i)} aria-label={tr(shot.caption)}>
              <img src={shot.src} alt="" className={s.shotImage} loading="lazy" draggable={false} />
              <span className={s.shotEdge} />
            </button>
          ))}
        </div>
      )}

      <section>
        <h2 className={s.heading}>{t('projects.about')}</h2>
        <p className={s.text}>{tr(project.description)}</p>
      </section>

      {project.sections.map((section) => (
        <section key={tr(section.heading)}>
          <h2 className={s.heading}>{tr(section.heading)}</h2>
          {section.text && <p className={s.text}>{tr(section.text)}</p>}
          {section.bullets && (
            <ul className={s.bullets}>
              {section.bullets.map((bullet) => (
                <li key={tr(bullet)} className={s.bullet}>
                  {tr(bullet)}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section>
        <h2 className={s.heading}>{t('projects.stack')}</h2>
        <ul className={s.tags}>
          {project.tags.map((tag) => (
            <li key={tag} className={s.tag}>
              {tag}
            </li>
          ))}
        </ul>
      </section>

      {page.links.length > 0 && (
        <section>
          <h2 className={s.heading}>{t('projects.links')}</h2>
          <div className={s.links}>
            {page.links.map((link) => (
              <button key={link.href} type="button" className={s.link} onClick={(e) => onOpenLink(link.href, e.currentTarget)}>
                <Icon name={link.icon} className={s.linkIcon} />
                <span className={s.linkText}>
                  <span className={s.linkLabel}>{tr(link.label)}</span>
                  <span className={s.linkHost}>{link.host}</span>
                </span>
                <Icon name="externalLink" className={s.linkArrow} />
              </button>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
