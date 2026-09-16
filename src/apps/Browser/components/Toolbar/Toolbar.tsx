import { Icon } from '@/components/Icon/Icon';
import { toolbarStyles as s } from './Toolbar.styles';
import type { ToolbarProps } from './Toolbar.types';
import { useToolbar } from './useToolbar';

// Back / forward / reload + address bar
export function Toolbar(props: ToolbarProps) {
  const tb = useToolbar(props);
  const { t } = tb;

  return (
    <div className={s.root}>
      <button type="button" className={s.button} disabled={!props.canGoBack} onClick={props.onBack} aria-label={t('browser.back')} title={t('browser.back')}>
        <Icon name="arrowLeft" className={s.icon} />
      </button>
      <button type="button" className={s.button} disabled={!props.canGoForward} onClick={props.onForward} aria-label={t('browser.forward')} title={t('browser.forward')}>
        <Icon name="arrowRight" className={s.icon} />
      </button>
      <button type="button" className={s.button} onClick={props.onReload} aria-label={t('browser.reload')} title={t('browser.reload')}>
        <Icon name="refresh" className={s.icon} />
      </button>

      <form className={s.form} onSubmit={tb.submit} role="search">
        <Icon name={tb.secure ? 'lock' : 'search'} className={s.lock} />
        <input
          ref={tb.inputRef}
          className={s.input}
          value={tb.value}
          onChange={(e) => tb.onChange(e.target.value)}
          onFocus={tb.onFocus}
          onBlur={tb.onBlur}
          placeholder={t('browser.address')}
          aria-label={t('browser.address')}
          spellCheck={false}
        />
      </form>

      {tb.showExternal && (
        <button type="button" className={s.button} onClick={props.onOpenExternal} aria-label={t('browser.openExternal')} title={t('browser.openExternal')}>
          <Icon name="externalLink" className={s.icon} />
        </button>
      )}
    </div>
  );
}
