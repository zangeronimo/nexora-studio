import { useRef } from 'react';
import { Camera } from 'lucide-react';

import * as styles from './styles.module.scss';

type Props = {
  name: string;
  avatarUrl?: string;

  size?: 'sm' | 'md' | 'lg' | 'xl';

  editable?: boolean;
  loading?: boolean;

  onUpload?: (file: File) => Promise<void>;
};

export function Avatar({
  name,
  avatarUrl,
  size = 'md',
  editable = false,
  loading = false,
  onUpload,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const initials = name
    ?.split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((x) => x[0]?.toUpperCase())
    .join('');

  const imageUrl = avatarUrl ? `${process.env.API_URL}${avatarUrl}` : undefined;

  const handleOpenPicker = () => {
    if (!editable || loading) {
      return;
    }

    inputRef.current?.click();
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.type !== 'image/webp') {
      event.target.value = '';
      return;
    }

    await onUpload?.(file);

    event.target.value = '';
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.avatar} ${styles[size]} ${
          editable ? styles.editable : ''
        }`}
        onClick={editable ? handleOpenPicker : undefined}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={name} className={styles.image} />
        ) : (
          <span className={styles.initials}>{initials}</span>
        )}

        {editable && (
          <div className={styles.overlay}>
            <Camera size={20} />
          </div>
        )}
      </div>

      {editable && (
        <input
          ref={inputRef}
          type="file"
          accept=".webp,image/webp"
          hidden
          onChange={handleChange}
        />
      )}
    </div>
  );
}
