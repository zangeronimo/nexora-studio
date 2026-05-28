// presentation/base/components/confirm-modal/confirm-modal.tsx

import { TriangleAlert } from 'lucide-react';

import { Modal } from '../modal';

import { CancelButton } from '../action-buttons/cancel-button';
import { ConfirmButton } from '../action-buttons/confirm-button';

import * as styles from './styles.module.scss';

type Props = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  loading = false,
  onConfirm,
  onClose,
}: Props) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      footer={
        <>
          <CancelButton
            title={cancelLabel}
            disabled={loading}
            onClick={onClose}
          />

          <ConfirmButton
            title={confirmLabel}
            loading={loading}
            onClick={onConfirm}
          />
        </>
      }
    >
      <div className={styles.content}>
        <div className={styles.alert}>
          <TriangleAlert size={18} />
        </div>

        <p>{description}</p>
      </div>
    </Modal>
  );
}
