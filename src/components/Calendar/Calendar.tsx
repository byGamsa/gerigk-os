import { cn } from '@/lib/cn';
import { Flyout } from '../Flyout/Flyout';
import { Icon } from '../Icon/Icon';
import { calendarStyles as s } from './Calendar.styles';
import { useCalendar } from './useCalendar';

export function Calendar() {
  const cal = useCalendar();

  return (
    <Flyout id="calendar" className={s.panel} ariaLabel={cal.t('tray.clock')}>
      <div className={s.header}>
        <div className={s.time}>{cal.time}</div>
        <div className={s.heading}>{cal.heading}</div>
      </div>

      <div className={s.nav}>
        <span className={s.month}>{cal.monthLabel}</span>
        <div className={s.navButtons}>
          <button type="button" className={s.navButton} onClick={cal.prev} aria-label={cal.t('cal.prev')} title={cal.t('cal.prev')}>
            <Icon name="chevronLeft" className={s.navIcon} />
          </button>
          <button type="button" className={s.navButton} onClick={cal.next} aria-label={cal.t('cal.next')} title={cal.t('cal.next')}>
            <Icon name="chevronRight" className={s.navIcon} />
          </button>
        </div>
      </div>

      <div key={cal.monthKey} role="grid" className={cn(s.grid, s.gridAnimate[cal.direction])} onWheel={cal.onWheel}>
        {cal.weekdays.map((wd) => (
          <div key={wd} role="columnheader" className={s.weekday}>
            {wd}
          </div>
        ))}
        {cal.days.map((d) => (
          <button
            key={d.key}
            type="button"
            role="gridcell"
            aria-selected={d.isSelected}
            aria-label={cal.dayLabel(d.date)}
            aria-current={d.isToday ? 'date' : undefined}
            className={cn(s.day, !d.inMonth && s.dayOther, d.isToday && s.dayToday, d.isSelected && !d.isToday && s.daySelected)}
            onClick={() => cal.select(d.date)}
          >
            {d.day}
          </button>
        ))}
      </div>

      <div className={s.footer}>
        <div className={s.footerText}>
          <div className={s.footerDate}>{cal.selectedLabel}</div>
          <div className={s.footerHint}>{cal.t('cal.noEvents')}</div>
        </div>
        <button type="button" className={s.todayButton} onClick={cal.goToday}>
          {cal.t('cal.today')}
        </button>
      </div>
    </Flyout>
  );
}
