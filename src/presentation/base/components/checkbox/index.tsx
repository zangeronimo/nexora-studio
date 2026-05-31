import { InputHTMLAttributes } from 'react';

import * as styles from './styles.module.scss';

type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> & {
  label: string;
  description?: string;
  onChange?: (checked: boolean) => void;
};

export function Checkbox({
  id,
  label,
  description,
  checked,
  disabled,
  onChange,
  ...props
}: Props) {
  return (
    <label
      htmlFor={id}
      className={[styles.container, disabled ? styles.disabled : ''].join(' ')}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className={styles.checkbox}
        onChange={(event) => onChange?.(event.target.checked)}
        {...props}
      />

      <div className={styles.content}>
        <span className={styles.label}>{label}</span>

        {description && (
          <span className={styles.description}>{description}</span>
        )}
      </div>
    </label>
  );
}
