import { HTMLAttributes, ReactNode } from 'react';

import * as styles from './styles.module.scss';

type Props = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
  actions?: ReactNode;
  footer?: ReactNode;
  hoverable?: boolean;
  children: ReactNode;
};

export function Card({
  title,
  description,
  actions,
  footer,
  hoverable = false,
  children,
  className = '',
  ...props
}: Props) {
  return (
    <div
      className={[
        styles.card,
        hoverable ? styles.hoverable : '',
        className,
      ].join(' ')}
      {...props}
    >
      {(title || description || actions) && (
        <div className={styles.header}>
          <div className={styles.headerContent}>
            {title && <h3 className={styles.title}>{title}</h3>}

            {description && <p className={styles.description}>{description}</p>}
          </div>

          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      )}

      <div className={styles.content}>{children}</div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
