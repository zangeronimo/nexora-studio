import { Outlet } from 'react-router-dom';

import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';

import * as styles from './styles.module.scss';
import { useState } from 'react';
import { PageTitleContext } from '@presentation/base/shell/context/page-title-context';
import { Sidebar } from '@presentation/base/shell/components/sidebar';
import { Topbar } from '@presentation/base/shell/components/topbar';

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
