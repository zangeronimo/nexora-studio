import { AuthorizationService } from '@application/contracts/security/authorizaton-service';
import { AppRoute } from '@presentation/router/types/app-route';

export function canShowItem(
  auth: AuthorizationService,
  item: AppRoute,
): boolean {
  if (item.permission) {
    return auth.hasPermission(item.permission);
  }

  if (item.anyPermissions?.length) {
    return auth.hasSomePermission(item.anyPermissions);
  }

  if (item.allPermissions?.length) {
    return item.allPermissions.every((p) => auth.hasPermission(p));
  }

  return true;
}
