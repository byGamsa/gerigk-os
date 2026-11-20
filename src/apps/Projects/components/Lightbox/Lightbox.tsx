import { Icon } from '@/components/Icon/Icon';
import { lightboxStyles as s } from './Lightbox.styles';
import type { LightboxProps } from './Lightbox.types';
import { useLightbox } from './useLightbox';

// Full-window screenshot viewer inside the store window
export function Lightbox(props: LightboxProps) {
  const { labels, onClose, tr } = props;
  const { rootRef, onKeyDown, step, image, hasMany, position } = useLightbox(props);

  if (!image) return null;

  return (
    <div ref={rootRef} className={s.root} role="dialog" aria-modal="true" aria-label={tr(image.caption)} tabIndex={-1} onKeyDown={onKeyDown}>
      <div className={s.bar}>
        <span className={s.position}>{hasMany ? position : ''}</span>
        <button type="button" className={s.close} onClick={onClose} aria-label={labels.close}>
          <Icon name="close" className={s.icon} />
        </button>
      </div>

      <div className={s.stage} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <img key={image.src} src={image.src} alt={tr(image.caption)} className={s.image} draggable={false} />
        {hasMany && (
          <>
            <button type="button" className={s.prev} onClick={() => step(-1)} aria-label={labels.prev}>
              <Icon name="chevronLeft" className={s.icon} />
            </button>
            <button type="button" className={s.next} onClick={() => step(1)} aria-label={labels.next}>
              <Icon name="chevronRight" className={s.icon} />
            </button>
          </>
        )}
      </div>

      <p className={s.caption}>{tr(image.caption)}</p>
    </div>
  );
}
