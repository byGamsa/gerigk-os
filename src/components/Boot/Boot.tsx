import { cn } from '@/lib/cn';
import { Icon } from '../Icon/Icon';
import { bootStyles as s } from './Boot.styles';
import { useBoot } from './useBoot';

export function Boot() {
  const { booting } = useBoot();

  return (
    <div className={cn(s.root, booting ? s.visible : s.hidden)} aria-hidden={!booting}>
      <div className={s.inner}>
        <Icon name="logo" className={s.logo} />
        <div className={s.track}>
          <div className={s.bar} />
        </div>
      </div>
    </div>
  );
}
