import { usePageTitle } from '../../context/page-title-context';
import * as styles from './styles.module.scss';
import { UserMenu } from '@presentation/base/components/user-menu';

export function Topbar() {
  const page = usePageTitle();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.title}>{page.title}</h1>
      </div>

      <div className={styles.right}>
        <UserMenu />
      </div>
    </div>
  );
}
