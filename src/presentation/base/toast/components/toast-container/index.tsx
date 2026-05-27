import { Toast } from '../../types/toast';
import { ToastItem } from '../toast-item';

import * as styles from './styles.module.scss';

type Props = {
  toasts: Toast[];
};

export function ToastContainer({ toasts }: Props) {
  return (
    <div className={styles.container}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
