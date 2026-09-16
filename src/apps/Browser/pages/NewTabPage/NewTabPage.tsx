import { Icon } from '@/components/Icon/Icon';
import { newTabPageStyles as s } from './NewTabPage.styles';
import type { NewTabPageProps } from './NewTabPage.types';
import { useNewTabPage } from './useNewTabPage';

// Brave-style "New tab" page: bookmarks + search bar
export function NewTabPage(props: NewTabPageProps) {
  const nt = useNewTabPage(props);

  return (
    <div className={s.root}>
      <nav className={s.bookmarks} aria-label={nt.t('browser.bookmarks')}>
        {nt.bookmarks.map((bm) => (
          <button key={bm.url} type="button" className={s.bookmark} onClick={() => props.onOpen(bm.url)} title={bm.url}>
            <span className={s.bookmarkTile}>
              <img src={bm.icon} alt="" className={s.bookmarkIcon} draggable={false} />
            </span>
            <span className={s.bookmarkLabel}>{bm.title}</span>
          </button>
        ))}
      </nav>

      <form className={s.search} onSubmit={nt.submit} role="search">
        <Icon name="brave" className={s.searchLogo} />
        <input
          className={s.searchInput}
          value={nt.query}
          onChange={(e) => nt.setQuery(e.target.value)}
          placeholder={nt.t('browser.search')}
          aria-label={nt.t('browser.search')}
        />
      </form>
      <p className={s.hint}>{nt.t('browser.searchHint')}</p>
    </div>
  );
}
