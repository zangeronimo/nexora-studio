import { Outlet } from 'react-router-dom';

import { AuthorizationService } from '@application/contracts/security/authorizaton-service';

import { Sidebar } from '@presentation/shell/components/sidebar';
import { Topbar } from '@presentation/shell/components/topbar';

import * as styles from './styles.module.scss';
import { PageTitleContext } from '@presentation/shell/context/page-title-context';
import { useState } from 'react';

type Props = {
  auth: AuthorizationService;
};

export const AppShell = ({ auth }: Props) => {
  const [title, setTitle] = useState<string | undefined>();

  return (
    <PageTitleContext.Provider value={{ title, setTitle }}>
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
    </PageTitleContext.Provider>
  );
};
