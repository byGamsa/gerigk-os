import { cn } from '@/lib/cn';
import type { AppWindowProps } from '@/types';
import { notepadStyles as s } from './Notepad.styles';
import type { NotepadArgs } from './Notepad.types';
import { useNotepad } from './useNotepad';

export function Notepad({ windowId, args }: AppWindowProps<NotepadArgs>) {
  const np = useNotepad(windowId, args);
  const { compose } = np;

  return (
    <div className={s.root}>
      <div className={s.menu} role="menubar">
        <button type="button" className={s.menuItem} data-flyout-trigger="menu" onClick={np.openFileMenu}>
          {np.t('np.menu.file')}
        </button>
        <span className={s.menuItem}>{np.t('np.menu.edit')}</span>
        <span className={s.menuItem}>{np.t('np.menu.view')}</span>

        {np.renaming ? (
          <input
            className={s.fileNameInput}
            defaultValue={np.fileName}
            autoFocus
            onFocus={(e) => e.currentTarget.setSelectionRange(0, e.currentTarget.value.replace(/\.txt$/i, '').length)}
            onBlur={(e) => np.finishRename(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') np.finishRename(e.currentTarget.value);
              if (e.key === 'Escape') np.cancelRename();
            }}
            aria-label={np.t('np.rename')}
          />
        ) : (
          <span
            className={cn(s.fileName, np.canRename && s.fileNameEditable)}
            onDoubleClick={np.startRename}
            title={np.canRename ? np.t('np.rename') : undefined}
          >
            {np.unsaved && <span className={s.unsavedDot} aria-hidden />}
            {np.fileName}
          </span>
        )}
      </div>

      {compose && (
        <input
          className={s.honeypot}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={compose.website}
          onChange={(e) => compose.setWebsite(e.target.value)}
        />
      )}

      <textarea
        className={s.editor}
        value={np.text}
        onChange={np.onChange}
        onSelect={np.onCaret}
        onKeyUp={np.onCaret}
        onClick={np.onCaret}
        onKeyDown={np.onKeyDown}
        maxLength={np.maxLength}
        spellCheck={false}
        autoFocus={Boolean(compose)}
        aria-label={np.t('np.title')}
      />

      <footer className={s.status}>
        <span className={s.position}>{np.position}</span>
        <span className={s.hideNarrow}>{np.chars}</span>
        <span className={s.hideNarrow}>100 %</span>
        <span>UTF-8</span>
      </footer>

      {compose && np.confirming && (
        <div className={s.dialogBackdrop}>
          <div className={s.dialog} role="alertdialog" aria-label={np.t('np.title')}>
            <p className={s.dialogText}>{np.confirmText}</p>
            <div className={s.dialogActions}>
              <button type="button" className={s.dialogPrimary} onClick={compose.confirmSave} autoFocus>
                {np.t('np.confirm.save')}
              </button>
              <button type="button" className={s.dialogButton} onClick={compose.confirmDiscard}>
                {np.t('np.confirm.discard')}
              </button>
              <button type="button" className={s.dialogButton} onClick={compose.confirmCancel}>
                {np.t('np.confirm.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
