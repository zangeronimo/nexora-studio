import { KeyboardEvent, useState } from 'react';

import * as styles from './styles.module.scss';

type Props = {
  id?: string;

  label?: string;
  error?: string;
  helperText?: string;

  fullWidth?: boolean;

  value: string[];

  placeholder?: string;

  multiline?: boolean;

  addButtonTitle: string;
  emptyMessage: string;

  onChange?: (value: string[]) => void;
};

export function StringListInput({
  id,
  label,
  error,
  helperText,
  fullWidth = false,
  value,
  placeholder,
  multiline = false,
  addButtonTitle,
  emptyMessage,
  onChange,
}: Props) {
  const [currentValue, setCurrentValue] = useState('');

  const handleAdd = () => {
    const item = currentValue.trim();

    if (!item) {
      return;
    }

    onChange?.([...value, item]);

    setCurrentValue('');
  };

  const handleRemove = (index: number) => {
    onChange?.(value.filter((_, current) => current !== index));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();

    handleAdd();
  };

  return (
    <div
      className={[styles.field, fullWidth ? styles.fullWidth : ''].join(' ')}
    >
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.editor}>
        {multiline ? (
          <textarea
            id={id}
            value={currentValue}
            placeholder={placeholder}
            className={styles.textarea}
            onChange={(event) => setCurrentValue(event.target.value)}
          />
        ) : (
          <input
            id={id}
            value={currentValue}
            placeholder={placeholder}
            className={styles.input}
            onChange={(event) => setCurrentValue(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        )}

        <button type="button" className={styles.addButton} onClick={handleAdd}>
          {addButtonTitle}
        </button>
      </div>

      {value.length === 0 ? (
        <span className={styles.emptyMessage}>{emptyMessage}</span>
      ) : (
        <div className={styles.list}>
          {value.map((item, index) => (
            <div key={`${item}-${index}`} className={styles.item}>
              <span className={styles.itemText}>{item}</span>

              <button
                type="button"
                className={styles.removeButton}
                onClick={() => handleRemove(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {error ? (
        <span className={styles.errorMessage}>{error}</span>
      ) : (
        helperText && <span className={styles.helperText}>{helperText}</span>
      )}
    </div>
  );
}
