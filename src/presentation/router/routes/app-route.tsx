import { DashboardPage } from '@presentation/pages/dashboard';
import { AppRoute } from '../types/app-route';
import { CoreCompanyPage } from '@presentation/pages/core/company';

/**
 * ROUTES = single source of truth for:
 * - routing
 * - permissions
 * - sidebar derivation (future)
 *
 * RULES:
 * - each module has a LIST page as entrypoint
 * - create/edit are secondary routes
 * - no "container-only" routes
 */
export const routes: AppRoute[] = [
  /**
   * DASHBOARD
   */
  {
    path: '/',
    element: <DashboardPage />,
    labelKey: 'sidebar_dashboard',
    showInSidebar: true,
  },
  {
    path: '/core',
    labelKey: 'core',
    isGroupRoute: true,
    showInSidebar: false,
    children: [
      {
        path: 'companies',
        labelKey: 'core_companies',
        permission: 'core.company.view',
        showInSidebar: true,
        element: <CoreCompanyPage />,
      },
    ],
  },
];
