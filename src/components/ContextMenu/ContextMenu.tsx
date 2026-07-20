import { useOsStore } from '@/store/os.store';
import type { MenuItem } from '@/types';
import { Flyout } from '../Flyout/Flyout';
import { Icon } from '../Icon/Icon';
import { contextMenuStyles as s } from './ContextMenu.styles';

// Context and dropdown menu – content comes from the store
export function ContextMenu() {
  const items = useOsStore((st) => (st.flyout?.id === 'menu' ? st.flyout.items : undefined));

  const select = (item: Extract<MenuItem, { type: 'item' }>) => {
    useOsStore.getState().closeFlyout();
    item.onSelect();
  };

  return (
    <Flyout id="menu" className={s.panel}>
      <div role="menu">
        {items?.map((item, i) => {
          if (item.type === 'separator') return <div key={i} role="separator" className={s.separator} />;
          if (item.type === 'label') return <div key={i} className={s.label}>{item.label}</div>;
          return (
            <button key={i} type="button" role="menuitem" disabled={item.disabled} className={s.item} onClick={() => select(item)}>
              {item.icon ? <Icon name={item.icon} className={s.icon} /> : <span className={s.icon} />}
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </Flyout>
  );
}
