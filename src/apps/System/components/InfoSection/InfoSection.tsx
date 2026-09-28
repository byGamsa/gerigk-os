import { Icon } from '@/components/Icon/Icon';
import { cn } from '@/lib/cn';
import { isPlaceholder } from '../../system.content';
import type { InfoRow } from '../../System.types';
import { infoSectionStyles as s } from './InfoSection.styles';
import type { InfoSectionProps } from './InfoSection.types';
import { useInfoSection } from './useInfoSection';

function RowValue({ row }: { row: InfoRow }) {
  const lines = typeof row.value === 'string' ? [row.value] : row.value;
  const content = lines.map((line, i) => (
    <span key={i} className={cn('block', isPlaceholder(line) && s.placeholder)}>
      {line}
    </span>
  ));
  if (!row.href) return <>{content}</>;
  const external = row.href.startsWith('http');
  return (
    <a href={row.href} className={s.rowLink} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {content}
    </a>
  );
}

// Collapsible section in Windows Settings style ("Device specifications")
export function InfoSection(props: InfoSectionProps) {
  const { section, links } = props;
  const sec = useInfoSection(props);

  return (
    <section className={s.root}>
      <header className={s.header}>
        <Icon name={section.icon} className={s.headerIcon} />
        <h2 className={s.title}>{section.title}</h2>
        <button
          type="button"
          className={s.toggle}
          onClick={sec.toggle}
          aria-expanded={sec.open}
          aria-controls={sec.contentId}
          aria-label={sec.t(sec.open ? 'system.collapse' : 'system.expand')}
        >
          <Icon name="chevronUp" className={cn(s.toggleIcon, !sec.open && s.toggleIconClosed)} />
        </button>
      </header>

      {sec.open && (
        <div id={sec.contentId}>
          <div className={s.body}>
            {section.rows && (
              <dl className={s.rows}>
                {section.rows.map((row) => (
                  <div key={row.label} className="contents">
                    <dt className={s.rowLabel}>{row.label}</dt>
                    <dd className={s.rowValue}>
                      <RowValue row={row} />
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            {section.paragraphs && (
              <div className={s.paragraphs}>
                {section.paragraphs.map((p) => (
                  <div key={p.heading}>
                    <h3 className={s.paragraphHeading}>{p.heading}</h3>
                    <p className={s.paragraphText}>{p.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {links && links.length > 0 && (
            <div className={s.links}>
              <span className={s.linksLabel}>{sec.t('system.related')}</span>
              {links.map((link) =>
                link.href ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className={s.link}
                    {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    {link.label}
                  </a>
                ) : (
                  <button key={link.label} type="button" className={s.link} onClick={link.onSelect}>
                    {link.label}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
