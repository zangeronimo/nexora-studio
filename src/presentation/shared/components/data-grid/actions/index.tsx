import { ReactNode } from 'react';

import * as styles from './styles.module.scss';

type Props = {
  children: ReactNode;
};

export function DataGridActions({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}
