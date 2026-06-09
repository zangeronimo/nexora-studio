import { HTMLAttributes } from 'react';

import * as styles from './styles.module.scss';

type Props = HTMLAttributes<HTMLDivElement>;

export function Group({ className = '', children, ...props }: Props) {
  return (
    <div className={[styles.group, className].join(' ')} {...props}>
      {children}
    </div>
  );
}
