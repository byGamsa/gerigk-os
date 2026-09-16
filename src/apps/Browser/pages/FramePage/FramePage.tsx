import { useT } from '@/hooks/useT';
import { framePageStyles as s } from './FramePage.styles';
import type { FramePageProps } from './FramePage.types';

// Embedded website; blocked embedding cannot be detected, hence the "Open in new tab" hint
export function FramePage({ url, reloadKey, onOpenExternal }: FramePageProps) {
  const { t } = useT();
  return (
    <div className={s.root}>
      <iframe
        key={`${url}#${reloadKey}`}
        src={url}
        title={url}
        className={s.frame}
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
      <div className={s.hint}>
        {t('browser.frameHint')}
        <button type="button" className={s.hintButton} onClick={onOpenExternal}>
          {t('browser.openExternal')}
        </button>
      </div>
    </div>
  );
}
