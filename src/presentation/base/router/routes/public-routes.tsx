import { AppRoute } from '../types/app-route';
import { LoginPageFactory } from '@main/factories/base/login-page';
import { AuthLayout } from '@presentation/base/layouts/auth-layout';
import { LogoutPageFactory } from '@main/factories/base/logout-page';

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
