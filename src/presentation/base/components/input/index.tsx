import { forwardRef, InputHTMLAttributes } from 'react';

import * as styles from './styles.module.scss';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  onChange?: (value: string) => void;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      label,
      error,
      helperText,
      fullWidth = false,
      className = '',
      onChange,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={[styles.field, fullWidth ? styles.fullWidth : ''].join(' ')}
      >
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          data-testid={id}
          className={[styles.input, error ? styles.error : '', className].join(
            ' ',
          )}
          onChange={(event) => onChange?.(event.target.value)}
          {...props}
        />

        {error ? (
          <span className={styles.errorMessage}>{error}</span>
        ) : (
          helperText && <span className={styles.helperText}>{helperText}</span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
