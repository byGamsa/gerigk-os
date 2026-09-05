import { Icon } from '@/components/Icon/Icon';
import { cn } from '@/lib/cn';
import { isPlaceholder } from '../../system.content';
import { infoTileStyles as s } from './InfoTile.styles';
import type { InfoTileProps } from './InfoTile.types';

export function InfoTile({ tile }: InfoTileProps) {
  return (
    <div className={s.root}>
      <div className={s.label}>
        <Icon name={tile.icon} className={s.icon} />
        {tile.label}
      </div>
      <div className={cn(s.value, isPlaceholder(tile.value) && s.placeholder)}>{tile.value}</div>
      <div className={s.detail}>{tile.detail}</div>
    </div>
  );
}
