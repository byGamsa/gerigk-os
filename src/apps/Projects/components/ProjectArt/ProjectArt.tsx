import { Icon } from '@/components/Icon/Icon';
import { cn } from '@/lib/cn';
import { projectArtStyles as s } from './ProjectArt.styles';
import type { ProjectArtProps } from './ProjectArt.types';

// Cover image of a project, or a gradient tile with its logo/icon when there is no image
export function ProjectArt({ project, variant, className }: ProjectArtProps) {
  const [from, to] = project.accent;
  const image = variant === 'icon' ? (project.iconImage ?? project.cover) : project.cover;

  return (
    <div
      className={cn(s.root, variant === 'icon' ? s.icon : s.banner, className)}
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-hidden
    >
      {image ? (
        <img src={image} alt="" className={s.image} loading="lazy" draggable={false} />
      ) : project.iconImage ? (
        <img src={project.iconImage} alt="" className={s.logo} loading="lazy" draggable={false} />
      ) : (
        <Icon name={project.icon ?? 'logo'} className={s.fallbackIcon} />
      )}
      <span className={s.edge} />
    </div>
  );
}
