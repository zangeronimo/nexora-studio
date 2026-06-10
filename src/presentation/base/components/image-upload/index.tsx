import { useEffect, useRef, useState } from 'react';

import { Modal } from '../modal';

import * as styles from './styles.module.scss';

type Props = {
  id?: string;

  label?: string;
  error?: string;
  helperText?: string;

  disabled?: boolean;
  loading?: boolean;

  maxSizeInMb?: number;

  modalTitle: string;

  selectButtonTitle: string;
  uploadButtonTitle: string;
  cancelButtonTitle: string;

  onUpload: (file: File) => Promise<void>;
};

const INVALID_TYPE_ERROR = 'Only WEBP images are allowed.';
const INVALID_SIZE_ERROR = 'File size exceeds the allowed limit.';

export function ImageUpload({
  id,
  label,
  error,
  helperText,
  disabled = false,
  loading = false,
  maxSizeInMb = 5,
  modalTitle,
  selectButtonTitle,
  uploadButtonTitle,
  cancelButtonTitle,
  onUpload,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [validationError, setValidationError] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleSelect = (selectedFile: File | null) => {
    setValidationError('');

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== 'image/webp') {
      setValidationError(INVALID_TYPE_ERROR);

      return;
    }

    if (selectedFile.size > maxSizeInMb * 1024 * 1024) {
      setValidationError(INVALID_SIZE_ERROR);

      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));

    setOpen(true);
  };

  const handleRemove = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    setPreview(null);
    setValidationError('');

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleClose = () => {
    if (loading) {
      return;
    }

    handleRemove();
    setOpen(false);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    await onUpload(file);

    handleClose();
  };

  const currentError = validationError || error;

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        id={id}
        type="file"
        accept=".webp,image/webp"
        className={styles.hiddenInput}
        disabled={disabled || loading}
        onChange={(event) => handleSelect(event.target.files?.[0] ?? null)}
      />

      <button
        type="button"
        className={[styles.uploadArea, currentError ? styles.error : ''].join(
          ' ',
        )}
        disabled={disabled || loading}
        onClick={() => inputRef.current?.click()}
      >
        <span className={styles.uploadTitle}>{selectButtonTitle}</span>

        <span className={styles.uploadDescription}>
          WEBP • Max {maxSizeInMb} MB
        </span>
      </button>

      {currentError ? (
        <span className={styles.errorMessage}>{currentError}</span>
      ) : (
        helperText && <span className={styles.helperText}>{helperText}</span>
      )}

      <Modal open={open} title={modalTitle} onClose={handleClose}>
        <div className={styles.modalContent}>
          {preview && (
            <div className={styles.preview}>
              <img
                src={preview}
                alt={file?.name}
                className={styles.previewImage}
              />
            </div>
          )}

          {file && <span className={styles.fileName}>{file.name}</span>}

          <div className={styles.previewActions}>
            <button
              type="button"
              disabled={loading}
              className={styles.actionButton}
              onClick={() => inputRef.current?.click()}
            >
              {selectButtonTitle}
            </button>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              disabled={loading}
              className={styles.actionButton}
              onClick={handleClose}
            >
              {cancelButtonTitle}
            </button>

            <button
              type="button"
              disabled={!file || loading}
              className={styles.actionButton}
              onClick={handleUpload}
            >
              {uploadButtonTitle}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
