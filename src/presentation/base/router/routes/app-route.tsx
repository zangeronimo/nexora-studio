import { DashboardPage } from '@presentation/base/pages/dashboard';
import { AppRoute } from '../types/app-route';
import { CorePage } from '@presentation/core/pages';
import { CompanyPageFactory } from '@main/factories/core/company/company-page';
import { CoreCompanyCreatePageFactory } from '@main/factories/core/company/company-create-page';
import { CoreCompanyUpdatePageFactory } from '@main/factories/core/company/company-update-page';
import { CoreCompanyModulesPageFactory } from '@main/factories/core/company/company-modules-page';
import { ModulePageFactory } from '@main/factories/core/module/module-page';

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
    labelKey: 'sidebar.dashboard',
    showInSidebar: true,
  },

  /**
   * CULINARY MODULE
   */
  {
    path: '/core',
    element: <CorePage />,
    labelKey: 'sidebar.core.title',
    showInSidebar: true,
    isGroupRoute: true,
    children: [
      {
        path: 'companies',
        labelKey: 'sidebar.core.companies.title',
        showInSidebar: true,
        permission: 'core.company.view',
        element: <CompanyPageFactory />,
      },
      {
        path: 'companies/create',
        element: <CoreCompanyCreatePageFactory />,
        permission: 'core.company.create',
        showInSidebar: false,
      },
      {
        path: 'companies/edit/:id',
        element: <CoreCompanyUpdatePageFactory />,
        permission: 'core.company.update',
        showInSidebar: false,
      },
      {
        path: 'companies/:id/modules',
        element: <CoreCompanyModulesPageFactory />,
        permission: 'core.company.update',
        showInSidebar: false,
      },

      {
        path: 'modulew',
        labelKey: 'sidebar.core.modules.title',
        showInSidebar: true,
        permission: 'core.module.view',
        element: <ModulePageFactory />,
      },
    ],
  },
];
