import { Fragment } from 'react';
import { Icon } from '@/components/Icon/Icon';
import type { AppWindowProps } from '@/types';
import { aboutStyles as s } from './About.styles';
import { useAbout } from './useAbout';

export function About(_props: AppWindowProps) {
  const { t, tr, content, initials, sections, openWebsite } = useAbout();

  return (
    <article className={s.root}>
      <header className={s.hero}>
        <div className={s.avatar} aria-hidden>
          {initials}
        </div>
        <div>
          <h1 className={s.name}>{content.name}</h1>
          <p className={s.role}>{tr(content.role)}</p>
          <p className={s.location}>{tr(content.location)}</p>
        </div>
      </header>

      <p className={s.intro}>{tr(content.intro)}</p>

      <nav className={s.links} aria-label={t('about.contact')}>
        {content.contact.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className={s.link}>
            {link.label}
          </a>
        ))}
      </nav>

      <h2 className={s.heading}>{t('about.highlights')}</h2>
      <div className={s.highlights}>
        {content.highlights.map((h) => (
          <section key={h.title} className={s.highlight}>
            <h3 className={s.highlightTitle}>{h.title}</h3>
            <p className={s.highlightMeta}>{tr(h.meta)}</p>
            <p className={s.highlightText}>{tr(h.text)}</p>
            {h.href && (
              <button type="button" className={s.highlightLink} onClick={(e) => openWebsite(h.href!, e.currentTarget)}>
                {h.href.replace('https://', '')}
                <Icon name="externalLink" className={s.highlightLinkIcon} />
              </button>
            )}
          </section>
        ))}
      </div>

      {sections.map((section) => (
        <Fragment key={section.id}>
          <h2 className={s.heading}>{section.title}</h2>
          <ol className={s.timeline}>
            {section.entries.map((entry) => (
              <li key={`${entry.org}-${tr(entry.period)}`} className={s.entry}>
                <span className={s.dot} aria-hidden />
                <span className={s.period}>{tr(entry.period)}</span>
                <div>
                  <div className={s.entryTitle}>{tr(entry.title)}</div>
                  <div className={s.entryOrg}>{entry.org}</div>
                  {entry.text && <p className={s.entryText}>{tr(entry.text)}</p>}
                </div>
              </li>
            ))}
          </ol>
        </Fragment>
      ))}

      <h2 className={s.heading}>{t('about.skills')}</h2>
      <div className={s.skills}>
        {content.skills.map((group) => (
          <Fragment key={tr(group.label)}>
            <span className={s.skillLabel}>{tr(group.label)}</span>
            <ul className={s.chips}>
              {group.items.map((item) => (
                <li key={tr(item)} className={s.chip}>
                  {tr(item)}
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </div>
    </article>
  );
}
