import { type JSX } from 'react';
import { AppLayout } from './layouts/app-layout';
import { DashboardPage } from './pages/dashboard/dashboard-page';
import { AuthLayout } from './layouts/auth-layout';
import { useAuth } from './auth/use-auth';
import { LoginPageFactory } from '../core/i18n/factories/login-page';

export const App = (): JSX.Element => {
  const { authenticated } = useAuth();
  if (authenticated) {
    return (
      <AppLayout>
        <DashboardPage />
      </AppLayout>
    );
  } else {
    return (
      <AuthLayout>
        <LoginPageFactory />
      </AuthLayout>
    );
  }
};
