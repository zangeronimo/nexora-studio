import { ReactNode, useEffect } from 'react';

import * as styles from './styles.module.scss';
import { usePageTitle } from '@presentation/shell/context/page-title-context';

type Props = {
  title: string;
  children: ReactNode;
};

export function Page({ title, children }: Props) {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle(title);
  }, [title]);

  return (
    <div className={styles.container}>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
