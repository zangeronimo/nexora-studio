import { Button } from '@presentation/base/components/button';
import { Modal } from '@presentation/base/components/modal';
import { Textarea } from '@presentation/base/components/textarea';
import { useEffect, useState } from 'react';

import * as styles from './styles.module.scss';

type JsonImportModalProps = {
  open: boolean;
  onClose: () => void;
  onImport: (data: unknown) => void;
};

export function JsonImportModal({
  open,
  onClose,
  onImport,
}: JsonImportModalProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [parsedJson, setParsedJson] = useState<unknown | null>(null);

  useEffect(() => {
    if (!open) {
      setValue('');
      setError('');
      setParsedJson(null);
    }
  }, [open]);

  useEffect(() => {
    if (!value.trim()) {
      setError('');
      setParsedJson(null);
      return;
    }

    try {
      const parsed = JSON.parse(value);

      setParsedJson(parsed);
      setError('');
    } catch {
      setParsedJson(null);
      setError('Invalid JSON');
    }
  }, [value]);

  const handleImport = () => {
    if (!parsedJson) {
      return;
    }

    onImport(parsedJson);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Import JSON">
      <div className={styles.jsonImportModal}>
        <Textarea
          value={value}
          onChange={setValue}
          rows={20}
          placeholder="Paste your JSON here..."
        />

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.actions}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={handleImport} disabled={!parsedJson}>
            Import
          </Button>
        </div>
      </div>
    </Modal>
  );
}
