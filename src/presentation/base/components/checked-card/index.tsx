import { Check } from 'lucide-react';
import { ReactNode } from 'react';

import * as styles from './styles.module.scss';

type Props = {
  checked: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
};

export function CheckedCard({
  checked,
  disabled = false,
  children,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`${styles.card} ${checked ? styles.checked : ''}`}
      onClick={onClick}
    >
      <div className={styles.icon}>{checked && <Check size={16} />}</div>

      <div className={styles.content}>{children}</div>
    </button>
  );
}
