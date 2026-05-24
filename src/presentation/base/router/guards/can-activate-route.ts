import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';

type Params = {
  permission?: string;
  anyPermissions?: string[];
  allPermissions?: string[];
};

export function canActivateRoute(
  authorizationProvider: AuthorizationProvider,
  params: Params,
): boolean {
  const { permission, anyPermissions, allPermissions } = params;

  // 1. single permission (legacy / simples)
  if (permission) {
    return authorizationProvider.hasPermission(permission);
  }

  // 2. ANY (OR logic)
  if (anyPermissions?.length) {
    return authorizationProvider.hasSomePermission(anyPermissions);
  }

  // 3. ALL (AND logic) ← NOVO
  if (allPermissions?.length) {
    return allPermissions.every((p) => authorizationProvider.hasPermission(p));
  }

  // default: allow if no restriction
  return true;
}
