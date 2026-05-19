import { AuthorizationService } from '@application/contracts/security/authorizaton-service';
import { AppRoute } from '../types/app-route';
import { canActivateRoute } from '../guards/can-activate-route';
import { useAuth } from '@presentation/auth/use-auth';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({
  route,
  auth,
}: {
  route: AppRoute;
  auth: AuthorizationService;
}) {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (
    !canActivateRoute(auth, {
      permission: route.permission,
      anyPermissions: route.anyPermissions,
    })
  ) {
    return <div>Forbidden</div>;
  }

  return route.element;
}
