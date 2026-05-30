import { DashboardPage } from '@presentation/base/pages/dashboard';
import { AppRoute } from '../types/app-route';
import { CorePage } from '@presentation/core/pages';
import { CompanyPageFactory } from '@main/factories/core/company/company-page';
import { CoreCompanyCreatePageFactory } from '@main/factories/core/company/company-create-page';
import { CoreCompanyUpdatePageFactory } from '@main/factories/core/company/company-update-page';
import { CoreCompanyModulesPageFactory } from '@main/factories/core/company/company-modules-page';
import { ModulePageFactory } from '@main/factories/core/module/module-page';
import { CoreModuleCreatePageFactory } from '@main/factories/core/module/module-create-page';
import { CoreModuleUpdatePageFactory } from '@main/factories/core/module/module-update-page';
import { UserPageFactory } from '@main/factories/core/user/user-page';

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
        path: 'modules',
        labelKey: 'sidebar.core.modules.title',
        showInSidebar: true,
        permission: 'core.module.view',
        element: <ModulePageFactory />,
      },
      {
        path: 'modules/create',
        element: <CoreModuleCreatePageFactory />,
        permission: 'core.module.create',
        showInSidebar: false,
      },
      {
        path: 'modules/edit/:id',
        element: <CoreModuleUpdatePageFactory />,
        permission: 'core.module.update',
        showInSidebar: false,
      },

      {
        path: 'users',
        labelKey: 'sidebar.core.users.title',
        showInSidebar: true,
        permission: 'core.module.view',
        element: <UserPageFactory />,
      },
      {
        path: 'users/create',
        element: <CoreModuleCreatePageFactory />,
        permission: 'core.module.create',
        showInSidebar: false,
      },
      {
        path: 'users/edit/:id',
        element: <CoreModuleUpdatePageFactory />,
        permission: 'core.module.update',
        showInSidebar: false,
      },
    ],
  },
];
