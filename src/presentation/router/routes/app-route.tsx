import { DashboardPage } from '@presentation/pages/dashboard/dashboard-page';
import { AppRoute } from '../types/app-route';
import { CulinaryLayout } from '@presentation/pages/culinary/culinary-layout';

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
    labelKey: 'dashboard',
    showInSidebar: true,
  },

  /**
   * CULINARY MODULE
   */
  {
    path: '/culinary',
    element: <CulinaryLayout />,
    labelKey: 'culinary',
    showInSidebar: true,
    isGroupRoute: true,
    children: [
      /**
       * RECIPES (ENTRYPOINT = LIST)
       */
      {
        path: 'recipes',
        labelKey: 'recipes',
        showInSidebar: true,
        anyPermissions: ['culinary.recipe.view', 'core.user.view'],
        element: <div>Recipes</div>,
      },

      {
        path: 'recipes/new',
        element: <div>Recipes Create</div>,
        permission: 'core.user.view',
        showInSidebar: false,
      },
      {
        path: 'recipes/edit/:id',
        element: <div>Recipes Edit</div>,
        permission: 'culinary.recipe.edit',
        showInSidebar: false,
      },

      /**
       * CATEGORIES
       */
      {
        path: 'categories',
        labelKey: 'categories',
        showInSidebar: true,
        permission: 'culinary.category.view',
        element: <div>Categories</div>,
      },

      /**
       * RATINGS
       */
      {
        path: 'ratings',
        labelKey: 'ratings',
        showInSidebar: true,
        permission: 'culinary.rating.view',
        element: <div>Ratings</div>,
      },
    ],
  },
];
