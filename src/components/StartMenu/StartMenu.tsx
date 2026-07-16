import { Flyout } from '../Flyout/Flyout';
import { Icon } from '../Icon/Icon';
import { startMenuStyles as s } from './StartMenu.styles';
import { useStartMenu } from './useStartMenu';

export function StartMenu() {
  const m = useStartMenu();

  return (
    <Flyout id="start" align="screen" className={s.panel} ariaLabel={m.t('os.start')}>
      <form className={s.search} onSubmit={m.onSubmit} role="search">
        <Icon name="search" className={s.searchIcon} />
        <input
          ref={m.inputRef}
          value={m.query}
          onChange={(e) => m.setQuery(e.target.value)}
          placeholder={m.t('start.search')}
          aria-label={m.t('start.search')}
          className={s.searchInput}
        />
      </form>

      <div className={s.sectionTitle}>{m.t('start.all')}</div>

      <div className={s.grid}>
        {m.results.length === 0 && <div className={s.empty}>{m.t('start.noResults')}</div>}
        {m.results.map((app) => (
          <button key={app.id} type="button" className={s.app} onClick={(e) => m.launch(app.id, e.currentTarget)}>
            <Icon name={app.icon} className={s.appIcon} />
            <span>{m.tr(app.title)}</span>
          </button>
        ))}
      </div>

      <div className={s.footer}>
        <div className={s.user}>
          <span className={s.avatar}>{m.initials}</span>
          <span className={s.userName}>{m.owner}</span>
        </div>
        <button
          type="button"
          data-flyout-trigger="menu"
          className={s.power}
          onClick={m.openPowerMenu}
          aria-label={m.t('start.power')}
          title={m.t('start.power')}
        >
          <Icon name="power" className={s.powerIcon} />
        </button>
      </div>
    </Flyout>
  );
}
