import { DashboardPage } from '@presentation/pages/dashboard';
import { AppRoute } from '../types/app-route';
import { CorePage } from '@presentation/pages/core';
import { CompanyPageFactory } from '../../../core/factories/core/company-page';

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

  /**
   * CULINARY MODULE
   */
  {
    path: '/core',
    element: <CorePage />,
    labelKey: 'sidebar_core',
    showInSidebar: true,
    isGroupRoute: true,
    children: [
      {
        path: 'companies',
        labelKey: 'sidebar_core_companies',
        showInSidebar: true,
        permission: 'core.company.view',
        element: <CompanyPageFactory />,
      },

      {
        path: 'companies/new',
        element: <div>Company Create</div>,
        permission: 'core.company.create',
        showInSidebar: false,
      },
      {
        path: 'companies/edit/:id',
        element: <div>Company Edit</div>,
        permission: 'core.company.update',
        showInSidebar: false,
      },
    ],
  },
];
