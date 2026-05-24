import { Outlet } from 'react-router-dom';

import { AuthorizationProvider } from '@application/contracts/security/authorizaton-provider';

import { Sidebar } from '@presentation/shell/components/sidebar';
import { Topbar } from '@presentation/shell/components/topbar';

import * as styles from './styles.module.scss';
import { PageTitleContext } from '@presentation/shell/context/page-title-context';
import { useState } from 'react';

type Props = {
  authorizationProvider: AuthorizationProvider;
};

export const AppShell = ({ authorizationProvider }: Props) => {
  const [title, setTitle] = useState<string | undefined>();

  return (
    <PageTitleContext.Provider value={{ title, setTitle }}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <Sidebar authorizationProvider={authorizationProvider} />
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
