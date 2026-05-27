import { CheckCircle, Info, XCircle } from 'lucide-react';

import { Toast } from '../../types/toast';

import * as styles from './styles.module.scss';

type Props = {
  toast: Toast;
};

export function ToastItem({ toast }: Props) {
  const icon = {
    success: <CheckCircle size={18} />,
    error: <XCircle size={18} />,
    info: <Info size={18} />,
  }[toast.type];

  return (
    <div className={`${styles.toast} ${styles[toast.type]}`}>
      <div className={styles.icon}>{icon}</div>

      <div className={styles.content}>
        <strong>{toast.title}</strong>

        {toast.message && <span>{toast.message}</span>}
      </div>
    </div>
  );
}
