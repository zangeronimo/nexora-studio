import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { canActivateRoute } from '@presentation/base/router/guards/can-activate-route';

import { AppRoute } from '@presentation/base/router/types/app-route';

export function buildSidebarRoutes(
  routes: AppRoute[],
  authorizationProvider: AuthorizationProvider,
): AppRoute[] {
  return routes.reduce<AppRoute[]>((acc, route) => {
    if (!route.showInSidebar) {
      return acc;
    }

    if (route.isGroupRoute) {
      const children = buildSidebarRoutes(
        route.children ?? [],
        authorizationProvider,
      );

      if (children.length === 0) {
        return acc;
      }

      acc.push({
        ...route,
        children,
      });

      return acc;
    }

    const allowed = canActivateRoute(authorizationProvider, {
      permission: route.permission,
      anyPermissions: route.anyPermissions,
      allPermissions: route.allPermissions,
    });

    if (!allowed) {
      return acc;
    }

    acc.push(route);

    return acc;
  }, []);
}
