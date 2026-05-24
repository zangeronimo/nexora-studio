import { AppRoute } from '../types/app-route';
import { LoginPageFactory } from '@core/factories/core/login-page';
import { AuthLayout } from '@presentation/layouts/auth-layout';
import { LogoutPageFactory } from '@core/factories/core/logout-page';

export const publicRoutes: AppRoute[] = [
  {
    path: '/login',
    showInSidebar: false,
    element: (
      <AuthLayout>
        <LoginPageFactory />
      </AuthLayout>
    ),
  },
  {
    path: '/logout',
    showInSidebar: false,
    element: <LogoutPageFactory />,
  },
];
