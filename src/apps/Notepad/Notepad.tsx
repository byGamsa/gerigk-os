import type { AppWindowProps } from '@/types';
import { notepadStyles as s } from './Notepad.styles';
import type { NotepadArgs } from './Notepad.types';
import { useNotepad } from './useNotepad';

export function Notepad({ windowId, args }: AppWindowProps<NotepadArgs>) {
  const np = useNotepad(windowId, args);

  return (
    <div className={s.root}>
      <div className={s.menu} role="menubar">
        <span className={s.menuItem}>{np.t('np.menu.file')}</span>
        <span className={s.menuItem}>{np.t('np.menu.edit')}</span>
        <span className={s.menuItem}>{np.t('np.menu.view')}</span>
      </div>

      <textarea
        className={s.editor}
        value={np.text}
        onChange={np.onChange}
        onSelect={np.onCaret}
        onKeyUp={np.onCaret}
        onClick={np.onCaret}
        spellCheck={false}
        aria-label={np.t('np.title')}
      />

      <footer className={s.status}>
        <span className={s.position}>{np.position}</span>
        <span className={s.hideNarrow}>{np.chars}</span>
        <span className={s.hideNarrow}>100 %</span>
        <span>UTF-8</span>
      </footer>
    </div>
  );
}
