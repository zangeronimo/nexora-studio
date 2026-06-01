import { getInitials } from './helpers/get-initials';

import * as styles from './styles.module.scss';

type Props = {
  name: string;
  avatarUrl?: string;

  size?: 'sm' | 'md' | 'lg' | 'xl';

  className?: string;
};

export function Avatar({ name, avatarUrl, size = 'md', className }: Props) {
  const initials = getInitials(name);

  return (
    <div className={`${styles.avatar} ${styles[size]} ${className ?? ''}`}>
      {avatarUrl ? (
        <img
          src={`${process.env.API_URL}${avatarUrl}`}
          alt={name}
          className={styles.image}
          draggable={false}
        />
      ) : (
        <span className={styles.initials}>{initials}</span>
      )}
    </div>
  );
}
