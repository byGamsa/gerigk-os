import { Icon } from '@/components/Icon/Icon';
import { cn } from '@/lib/cn';
import { tabStripStyles as s } from './TabStrip.styles';
import type { TabStripProps } from './TabStrip.types';

// Brave-style tab strip
export function TabStrip({ tabs, onSelect, onClose, onNewTab, labels }: TabStripProps) {
  return (
    <div className={s.root} role="tablist">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tab"
          tabIndex={0}
          aria-selected={tab.active}
          title={tab.title}
          className={cn(s.tab, tab.active && s.tabActive)}
          onClick={() => onSelect(tab.id)}
          onKeyDown={(e) => e.key === 'Enter' && onSelect(tab.id)}
          onAuxClick={(e) => e.button === 1 && onClose(tab.id)}
        >
          {tab.icon ? (
            <img src={tab.icon} alt="" className={s.favicon} draggable={false} />
          ) : (
            <Icon name="globe" className={s.faviconFallback} />
          )}
          <span className={s.title}>{tab.title}</span>
          <button
            type="button"
            className={cn(s.close, tab.active && s.closeVisible)}
            aria-label={labels.close}
            title={labels.close}
            onClick={(e) => {
              e.stopPropagation();
              onClose(tab.id);
            }}
          >
            <Icon name="close" className={s.closeIcon} />
          </button>
        </div>
      ))}
      <button type="button" className={s.add} onClick={onNewTab} aria-label={labels.newTab} title={labels.newTab}>
        <Icon name="plus" className={s.addIcon} />
      </button>
    </div>
  );
}
