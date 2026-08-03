import { Icon } from '@/components/Icon/Icon';
import { cn } from '@/lib/cn';
import { explorerStyles as s } from './Explorer.styles';
import type { ExplorerColumn, ExplorerProps } from './Explorer.types';
import { useExplorer } from './useExplorer';

// Columns hidden in narrow windows
const isWide = (col: ExplorerColumn) => col !== 'name' && col !== 'size';

export function Explorer({ windowId, initialFolder }: ExplorerProps) {
  const ex = useExplorer(windowId, initialFolder);
  const { t, tr } = ex;
  const folderName = tr(ex.folder.name);

  return (
    <div className={s.root}>
      <div className={s.toolbar}>
        <button type="button" className={s.navButton} disabled={!ex.canGoBack} onClick={ex.goBack} aria-label={t('explorer.back')} title={t('explorer.back')}>
          <Icon name="arrowLeft" className={s.navIcon} />
        </button>
        <button type="button" className={s.navButton} disabled={!ex.canGoForward} onClick={ex.goForward} aria-label={t('explorer.forward')} title={t('explorer.forward')}>
          <Icon name="arrowRight" className={s.navIcon} />
        </button>
        <div className={s.path}>
          <Icon name="monitor" className={s.pathIcon} />
          <span className={s.pathRoot}>{t('explorer.thisPc')}</span>
          <Icon name="chevronRight" className={s.pathSeparator} />
          <span className={s.pathCurrent}>{folderName}</span>
        </div>
        <label className={s.search}>
          <Icon name="search" className={s.searchIcon} />
          <input
            className={s.searchInput}
            value={ex.query}
            onChange={(e) => ex.setQuery(e.target.value)}
            placeholder={t('explorer.search', { folder: folderName })}
          />
        </label>
      </div>

      {ex.isTrash && (
        <div className={s.actions}>
          <button type="button" className={s.action} onClick={ex.emptyBin}>
            <Icon name="trashSmall" className={s.actionIcon} />
            {t('trash.empty')}
          </button>
          <button type="button" className={s.action} disabled>
            <Icon name="restoreFile" className={s.actionIcon} />
            {t('trash.restore')}
          </button>
        </div>
      )}

      <div className={s.main}>
        <nav className={s.sidebar} aria-label={t('explorer.thisPc')}>
          {ex.folders.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-current={f.id === ex.folder.id ? 'page' : undefined}
              className={cn(s.sideItem, f.id === ex.folder.id && s.sideItemActive)}
              onClick={() => ex.navigate(f.id)}
            >
              <Icon name={f.icon} className={s.sideIcon} />
              {tr(f.name)}
            </button>
          ))}
        </nav>

        <div className={s.list} role="listbox" aria-label={folderName}>
          {ex.total > 0 && (
            <div className={s.head}>
              {ex.columns.map((col) => (
                <span key={col} className={cn(isWide(col) ? s.cellWide : s.cell, col === 'size' && s.headRight)}>
                  {ex.columnLabel[col]}
                </span>
              ))}
            </div>
          )}

          {ex.rows.length === 0 && (
            <div className={s.empty}>
              <Icon name="folder" className={s.emptyIcon} />
              {ex.total === 0 ? t('explorer.empty') : t('explorer.noMatches')}
            </div>
          )}

          {ex.rows.map((row) => (
            <button
              key={row.entry.id}
              type="button"
              role="option"
              aria-selected={ex.selectedId === row.entry.id}
              className={cn(s.row, ex.selectedId === row.entry.id && s.rowSelected)}
              {...ex.rowHandlers(row.entry)}
            >
              {ex.columns.map((col) =>
                col === 'name' ? (
                  <span key={col} className={s.name}>
                    <Icon name={row.icon} className={s.fileIcon} />
                    <span className={s.cell}>{row.cells.name}</span>
                  </span>
                ) : (
                  <span key={col} className={col === 'size' ? s.cellSize : s.cellWide}>
                    {row.cells[col]}
                  </span>
                ),
              )}
            </button>
          ))}
        </div>
      </div>

      <footer className={s.status}>{t('explorer.items', { n: ex.rows.length })}</footer>
    </div>
  );
}
