import { usePageTitle } from '../../context/page-title-context';
import * as styles from './styles.module.scss';
import { useAuthSession } from '@presentation/base/session/use-auth-session';

export function Topbar() {
  const { session } = useAuthSession();
  const page = usePageTitle();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.title}>{page.title}</h1>
      </div>

      <div className={styles.right}>
        <button className={styles.userButton}>
          <div className={styles.avatar}>
            {session?.userCompany?.user?.name?.[0]}
          </div>

          <div className={styles.userInfo}>
            <span className={styles.userName}>
              {session?.userCompany?.user?.name}
            </span>

            <span className={styles.userEmail}>
              {session?.userCompany?.company?.name}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
