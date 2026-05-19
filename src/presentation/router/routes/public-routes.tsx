import { AppRoute } from '../types/app-route';
import { LoginPageFactory } from '../../../core/factories/login-page';
import { AuthLayout } from '@presentation/layouts/auth-layout';

export const publicRoutes: AppRoute[] = [
  {
    path: '/login',
    element: (
      <AuthLayout>
        <LoginPageFactory />
      </AuthLayout>
    ),
  },
];
