import { useLocation } from 'react-router-dom';

import { AuthorizationService } from '@application/contracts/security/authorizaton-service';

import { AppRoute } from '../types/app-route';

import { canActivateRoute } from '../guards/can-activate-route';

import { AccessDeniedPage } from '@presentation/pages/errors/access-denied/access-denied-page';
import { NotFoundPage } from '@presentation/pages/errors/not-found/not-found-page';

type Props = {
  route: AppRoute;
  auth: AuthorizationService;
};

export function ProtectedRoute({ route, auth }: Props) {
  const location = useLocation();

  const canActivate = canActivateRoute(auth, route);

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
