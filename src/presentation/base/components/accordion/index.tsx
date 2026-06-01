import { ReactNode, useState } from 'react';
import { ChevronRight } from 'lucide-react';

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
        <span className={styles.title}>{title}</span>

        <ChevronRight
          size={16}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
        />
      </button>

      {open && <div className={styles.content}>{children}</div>}
    </div>
  );
}
