import { AuthorizationProvider } from '@application/contracts/security/authorizaton-provider';
import { AppRoute } from '@presentation/router/types/app-route';

export function canShowItem(
  authorizationProvider: AuthorizationProvider,
  item: AppRoute,
): boolean {
  if (!item.showInSidebar) {
    return false;
  }
  if (item.permission) {
    return authorizationProvider.hasPermission(item.permission);
  }

  if (item.anyPermissions?.length) {
    return authorizationProvider.hasSomePermission(item.anyPermissions);
  }

  if (item.allPermissions?.length) {
    return item.allPermissions.every((p) =>
      authorizationProvider.hasPermission(p),
    );
  }

  return true;
}
