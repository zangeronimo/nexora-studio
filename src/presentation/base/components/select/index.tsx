import { SelectHTMLAttributes } from 'react';

import * as styles from './styles.module.scss';

export type SelectOption = {
  label: string;
  value: string;
};

type Props = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> & {
  label?: string;
  error?: string;
  options: SelectOption[];
  fullWidth?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
};

export function Select({
  id,
  label,
  value,
  options,
  error,
  disabled = false,
  fullWidth = false,
  placeholder = 'Select one',
  className = '',
  onChange,
  ...props
}: Props) {
  return (
    <div
      className={[styles.container, fullWidth ? styles.fullWidth : ''].join(
        ' ',
      )}
    >
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.wrapper}>
        <select
          id={id}
          data-testid={id}
          value={value}
          disabled={disabled}
          className={[styles.select, error ? styles.error : '', className].join(
            ' ',
          )}
          onChange={(event) => onChange?.(event.target.value)}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span className={styles.icon}>▼</span>
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
