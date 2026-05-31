import { ReactNode, useState } from 'react';

import * as styles from './styles.module.scss';

type Props = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function Accordion({ title, children, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setOpen((old) => !old)}
      >
        <span className={styles.icon}>{open ? '▼' : '▶'}</span>

        <span className={styles.title}>{title}</span>
      </button>

      {open && <div className={styles.content}>{children}</div>}
    </div>
  );
}
