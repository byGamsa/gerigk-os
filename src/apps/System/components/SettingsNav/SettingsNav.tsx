import { Icon } from '@/components/Icon/Icon';
import { cn } from '@/lib/cn';
import { settingsNavStyles as s } from './SettingsNav.styles';
import type { SettingsNavProps } from './SettingsNav.types';

// Left navigation in Windows Settings style (profile + pages)
export function SettingsNav({ items, active, onSelect, profile }: SettingsNavProps) {
  return (
    <nav className={s.root}>
      <div className={s.profile}>
        <span className={s.avatar} aria-hidden>
          {profile.initials}
        </span>
        <div className={s.profileText}>
          <div className={s.profileName}>{profile.name}</div>
          <div className={s.profileSubtitle}>{profile.subtitle}</div>
        </div>
      </div>

      <div className={s.list} role="tablist">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={cn(s.item, isActive && s.itemActive)}
              onClick={() => onSelect(item.id)}
            >
              {isActive && <span className={s.indicator} />}
              <Icon name={item.icon} className={s.icon} />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
