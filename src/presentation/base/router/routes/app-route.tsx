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
import { CoreUserCreatePageFactory } from '@main/factories/core/user/user-create-page';
import { CoreUserUpdatePageFactory } from '@main/factories/core/user/user-update-page';
import { SystemPage } from '@presentation/system';
import { SystemRolePageFactory } from '@main/factories/system/role/role-page';
import { SystemRoleCreatePageFactory } from '@main/factories/system/role/role-create-page';
import { SystemRoleUpdatePageFactory } from '@main/factories/system/role/role-update-page';
import { SystemRolePermissionPageFactory } from '@main/factories/system/role/role-permissions-page';
import { SystemUserCompanyPageFactory } from '@main/factories/system/user-company/user-company-page';
import { SystemUserCompanyCreatePageFactory } from '@main/factories/system/user-company/user-company-create-page';
import { SystemUserCompanyUpdatePageFactory } from '@main/factories/system/user-company/user-company-update-page';
import { SystemUserCompanyModulesPageFactory } from '@main/factories/system/user-company/user-company-modules-page';
import { Boxes, LayoutDashboard, Settings, ChefHat } from 'lucide-react';
import { CulinaryPage } from '@presentation/culinary';
import { CulinaryCategoryPageFactory } from '@main/factories/culinary/category/category-page';
import { CulinaryCategoryCreatePageFactory } from '@main/factories/culinary/category/category-create-page';
import { CulinaryCategoryUpdatePageFactory } from '@main/factories/culinary/category/category-update-page';

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
    icon: <LayoutDashboard size={18} />,
  },

  /**
   * CULINARY MODULE
   */
  {
    path: '/culinary',
    element: <CulinaryPage />,
    labelKey: 'sidebar.culinary.title',
    showInSidebar: true,
    isGroupRoute: true,
    icon: <ChefHat size={18} />,
    children: [
      {
        path: 'categories',
        labelKey: 'sidebar.culinary.categories.title',
        showInSidebar: true,
        permission: 'culinary.category.view',
        element: <CulinaryCategoryPageFactory />,
      },
      {
        path: 'categories/create',
        element: <CulinaryCategoryCreatePageFactory />,
        permission: 'culinary.category.create',
        showInSidebar: false,
      },
      {
        path: 'categories/edit/:id',
        element: <CulinaryCategoryUpdatePageFactory />,
        permission: 'culinary.category.update',
        showInSidebar: false,
      },
    ],
  },

  /**
   * CORE MODULE
   */
  {
    path: '/core',
    element: <CorePage />,
    labelKey: 'sidebar.core.title',
    showInSidebar: true,
    isGroupRoute: true,
    icon: <Boxes size={18} />,
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
        permission: 'core.user.view',
        element: <UserPageFactory />,
      },
      {
        path: 'users/create',
        element: <CoreUserCreatePageFactory />,
        permission: 'core.user.create',
        showInSidebar: false,
      },
      {
        path: 'users/edit/:id',
        element: <CoreUserUpdatePageFactory />,
        permission: 'core.user.update',
        showInSidebar: false,
      },
    ],
  },

  /**
   * SYSTEM MODULE
   */
  {
    path: '/system',
    element: <SystemPage />,
    labelKey: 'sidebar.system.title',
    showInSidebar: true,
    isGroupRoute: true,
    icon: <Settings size={18} />,
    children: [
      {
        path: 'roles',
        labelKey: 'sidebar.system.roles.title',
        showInSidebar: true,
        permission: 'system.role.view',
        element: <SystemRolePageFactory />,
      },
      {
        path: 'roles/create',
        element: <SystemRoleCreatePageFactory />,
        permission: 'system.role.create',
        showInSidebar: false,
      },
      {
        path: 'roles/edit/:id',
        element: <SystemRoleUpdatePageFactory />,
        permission: 'system.role.update',
        showInSidebar: false,
      },
      {
        path: 'roles/:id/permissions',
        element: <SystemRolePermissionPageFactory />,
        permission: 'system.role.update',
        showInSidebar: false,
      },

      {
        path: 'usercompanies',
        labelKey: 'sidebar.system.usercompany.title',
        showInSidebar: true,
        permission: 'system.usercompany.view',
        element: <SystemUserCompanyPageFactory />,
      },
      {
        path: 'usercompanies/create',
        element: <SystemUserCompanyCreatePageFactory />,
        permission: 'system.usercompany.create',
        showInSidebar: false,
      },
      {
        path: 'usercompanies/edit/:id',
        element: <SystemUserCompanyUpdatePageFactory />,
        permission: 'system.usercompany.update',
        showInSidebar: false,
      },
      {
        path: 'usercompanies/:id/modules',
        element: <SystemUserCompanyModulesPageFactory />,
        permission: 'system.usercompany.update',
        showInSidebar: false,
      },
    ],
  },
];
