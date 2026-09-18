import { Icon } from '@/components/Icon/Icon';
import { useT } from '@/hooks/useT';
import { hostOf } from '../../browser.utils';
import { previewPageStyles as s } from './PreviewPage.styles';
import type { PreviewPageProps } from './PreviewPage.types';

// Preview for sites that forbid embedding (X-Frame-Options/CSP)
export function PreviewPage({ url, site, onOpenExternal }: PreviewPageProps) {
  const { t } = useT();
  const query = site.host === 'search.brave.com' ? new URL(url).searchParams.get('q') : null;

  return (
    <div className={s.root}>
      <div className={s.card}>
        {site.icon ? (
          <img src={site.icon} alt="" className={s.icon} draggable={false} />
        ) : (
          <Icon name={query ? 'brave' : 'globe'} className={s.iconFallback} />
        )}
        <div className={s.host}>{hostOf(url)}</div>
        <h1 className={s.title}>{query ? t('browser.searchResults', { q: query }) : site.title}</h1>
        {site.description && <p className={s.description}>{site.description}</p>}
        <button type="button" className={s.button} onClick={onOpenExternal}>
          {t(query ? 'browser.openResults' : 'browser.openSite')}
          <Icon name="externalLink" className={s.buttonIcon} />
        </button>
        <p className={s.note}>{t('browser.blocked')}</p>
      </div>
    </div>
  );
}
