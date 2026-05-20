import { AuthorizationService } from '@application/contracts/security/authorizaton-service';

type Params = {
  permission?: string;
  anyPermissions?: string[];
  allPermissions?: string[];
};

export function canActivateRoute(
  auth: AuthorizationService,
  params: Params,
): boolean {
  const { permission, anyPermissions, allPermissions } = params;

  // 1. single permission (legacy / simples)
  if (permission) {
    return auth.hasPermission(permission);
  }

  // 2. ANY (OR logic)
  if (anyPermissions?.length) {
    return auth.hasSomePermission(anyPermissions);
  }

  // 3. ALL (AND logic) ← NOVO
  if (allPermissions?.length) {
    return allPermissions.every((p) => auth.hasPermission(p));
  }

  // default: allow if no restriction
  return true;
}
