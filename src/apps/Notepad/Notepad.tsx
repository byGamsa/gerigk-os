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
        spellCheck={false}
        aria-label={np.t('np.title')}
      />
    </div>
  );
}
