import { useLocation } from 'react-router-dom';

import { AppRoute } from '../types/app-route';

import { canActivateRoute } from '../guards/can-activate-route';

import { AccessDeniedPage } from '@presentation/base/errors/access-denied/access-denied-page';
import { NotFoundPage } from '@presentation/base/errors/not-found/not-found-page';
import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';

type Props = {
  route: AppRoute;
  authorizationProvider: AuthorizationProvider;
};

export function ProtectedRoute({ route, authorizationProvider }: Props) {
  const location = useLocation();

  const canActivate = canActivateRoute(authorizationProvider, route);

  if (!canActivate) {
    return <AccessDeniedPage />;
  }

  /**
   * GROUP ROUTE
   *
   * Example:
   * /culinary
   *
   * Can only exist as parent layout.
   */
  if (route.isGroupRoute) {
    const isDirectAccess = location.pathname === route.path;

    if (isDirectAccess) {
      return <NotFoundPage />;
    }
  }

  return route.element;
}
