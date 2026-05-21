import { Outlet } from 'react-router-dom';

import { AuthorizationService } from '@application/contracts/security/authorizaton-service';

import { Sidebar } from '@presentation/shell/components/sidebar';
import { Topbar } from '@presentation/shell/components/topbar';

import * as styles from './styles.module.scss';

type Props = {
  auth: AuthorizationService;
};

export const AppShell = ({ auth }: Props) => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar auth={auth} />
      </aside>

      <div className={styles.wrapper}>
        <header className={styles.topbar}>
          <Topbar />
        </header>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
