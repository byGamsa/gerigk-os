import { cn } from '@/lib/cn';
import { wallpaperStyles as s } from './Wallpaper.styles';
import { useWallpaper } from './useWallpaper';

// Desktop background: random self-hosted Unsplash photo with photographer credit, otherwise neutral gray
export function Wallpaper() {
  const wp = useWallpaper();
  const { current, previous } = wp;

  return (
    <>
      <div className={s.root} aria-hidden>
        {previous && <div className={s.layer} style={{ backgroundImage: `url(${previous.src})` }} />}
        {current && (
          <div
            key={current.wallpaper.id}
            className={cn(s.layer, s.photo)}
            style={{ backgroundImage: `url(${current.src})`, backgroundColor: current.wallpaper.color ?? undefined }}
          />
        )}
      </div>

      <div className={s.corner}>
        {current && (
          <a
            href={current.wallpaper.photoUrl}
            target="_blank"
            rel="noreferrer"
            className={s.credit}
            title={wp.creditTitle}
          >
            {wp.credit} <span className={s.creditBrand}>· Unsplash</span>
          </a>
        )}
      </div>
    </>
  );
}
