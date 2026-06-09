import { forwardRef, TextareaHTMLAttributes } from 'react';

import * as styles from './styles.module.scss';

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> & {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  onChange?: (value: string) => void;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
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

        <textarea
          ref={ref}
          id={id}
          data-testid={id}
          className={[
            styles.textarea,
            error ? styles.error : '',
            className,
          ].join(' ')}
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

Textarea.displayName = 'Textarea';
