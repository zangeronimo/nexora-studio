import { forwardRef, InputHTMLAttributes } from 'react';

import * as styles from './styles.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      className = '',
      id,
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
          className={[styles.input, error ? styles.error : '', className].join(
            ' ',
          )}
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
