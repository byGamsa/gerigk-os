import { osConfig } from '@/config/os.config';
import { useT } from '@/hooks/useT';
import { cn } from '@/lib/cn';
import { useOsStore } from '@/store/os.store';
import type { Toast } from '@/types';
import { Icon } from '../Icon/Icon';
import { toastStyles as s } from './Toasts.styles';
import { useToast } from './useToast';

function ToastItem({ toast }: { toast: Toast }) {
  const { tr } = useT();
  const { leaving, dismiss } = useToast(toast);

  return (
    <button type="button" role="status" className={cn(s.toast, leaving ? s.exit : s.enter)} onClick={dismiss}>
      <Icon name={toast.icon ?? 'logo'} className={s.icon} />
      <span>
        <span className={cn('block', s.title)}>{tr(toast.title ?? osConfig.name)}</span>
        <span className={cn('block', s.text)}>{tr(toast.text)}</span>
      </span>
    </button>
  );
}

export function Toasts() {
  const toasts = useOsStore((st) => st.toasts);
  return (
    <div className={s.stack} aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
