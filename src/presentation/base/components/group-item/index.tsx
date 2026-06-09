import { HTMLAttributes } from 'react';

import * as styles from './styles.module.scss';

type Props = HTMLAttributes<HTMLDivElement> & {
  span?: 1 | 2 | 3 | 4;
};

export function GroupItem({
  span = 1,
  className = '',
  children,
  ...props
}: Props) {
  return (
    <div
      className={[styles.item, styles[`span${span}`], className].join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
