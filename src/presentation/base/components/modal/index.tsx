import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

import * as styles from './styles.module.scss';

type Props = {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
};

export function Modal({ open, title, children, footer, onClose }: Props) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose}>
          <X size={18} />
        </button>

        {title && (
          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
          </div>
        )}

        <div className={styles.body}>{children}</div>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
