import { AuthorizationService } from '@application/contracts/security/authorizaton-service';
import { RouteGuardParams } from '../types/route-guard-params';

export function canActivateRoute(
  auth: AuthorizationService,
  guard?: RouteGuardParams,
): boolean {
  if (!guard) {
    return true;
  }

  if (guard.permission) {
    return auth.hasPermission(guard.permission);
  }

  if (guard.anyPermissions) {
    return auth.hasSomePermission(guard.anyPermissions);
  }

  return true;
}
