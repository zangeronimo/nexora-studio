import { DashboardPage } from '@presentation/pages/dashboard/dashboard-page';
import { AppRoute } from '../types/app-route';
import { withAppLayout } from '../wrappers/with-app-layout';

export const routes: AppRoute[] = [
  {
    path: '/',
    element: withAppLayout(<DashboardPage />),
  },
];
