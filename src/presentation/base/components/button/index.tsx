import { ButtonHTMLAttributes, ReactNode } from 'react';

import * as styles from './styles.module.scss';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

type Size = 'sm' | 'md' | 'lg' | 'icon';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;

  size?: Size;

  fullWidth?: boolean;

  loading?: boolean;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;
};

export function Button({
  children,

  variant = 'primary',

  size = 'md',

  fullWidth = false,

  loading = false,

  disabled,

  leftIcon,
  rightIcon,

  className = '',

  ...props
}: Props) {
  const isDisabled = disabled || loading;

  const isIconOnly = size === 'icon';

  return (
    <button
      className={[
        styles.button,

        styles[variant],

        styles[size],

        fullWidth ? styles.fullWidth : '',

        isDisabled ? styles.disabled : '',

        className,
      ].join(' ')}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <span className={styles.spinner} />
      ) : (
        <>
          {leftIcon && <span className={styles.icon}>{leftIcon}</span>}

          {!isIconOnly && <span className={styles.label}>{children}</span>}

          {rightIcon && <span className={styles.icon}>{rightIcon}</span>}

          {isIconOnly && !leftIcon && children}
        </>
      )}
    </button>
  );
}
