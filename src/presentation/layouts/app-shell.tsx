import { Outlet } from 'react-router-dom';

import { AuthorizationService } from '@application/contracts/security/authorizaton-service';

import { Sidebar } from '@presentation/shell/components/sidebar/sidebar';
import { Topbar } from '@presentation/shell/components/topbar';

type Props = {
  auth: AuthorizationService;
};

export const AppShell = ({ auth }: Props) => {
  return (
    <div>
      <Sidebar auth={auth} />

      <div>
        <Topbar />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
