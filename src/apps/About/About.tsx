import { useT } from '@/hooks/useT';
import type { AppWindowProps } from '@/types';
import { aboutContent as content } from './about.content';
import { aboutStyles as s } from './About.styles';

export function About(_props: AppWindowProps) {
  const { t, tr } = useT();

  return (
    <article className={s.root}>
      <header className={s.hero}>
        <div className={s.avatar} aria-hidden>
          {content.name.slice(0, 1)}
        </div>
        <div>
          <h1 className={s.name}>{content.name}</h1>
          <p className={s.role}>{tr(content.role)}</p>
        </div>
      </header>

      <p className={s.intro}>{tr(content.intro)}</p>

      <h2 className={s.heading}>{t('about.skills')}</h2>
      <ul className={s.chips}>
        {content.skills.map((skill) => (
          <li key={skill} className={s.chip}>
            {skill}
          </li>
        ))}
      </ul>

      <h2 className={s.heading}>{t('about.contact')}</h2>
      <div className={s.links}>
        {content.contact.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className={s.link}>
            {link.label}
          </a>
        ))}
      </div>

      <p className={s.note}>{t('about.note')}</p>
    </article>
  );
}
