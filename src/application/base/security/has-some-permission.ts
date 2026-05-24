import { AccessTokenPayload } from '@application/base/security/contracts/access-token-payload';

export function hasSomePermission(
  payload: AccessTokenPayload | null,
  permissions: string[],
): boolean {
  if (!payload) {
    return false;
  }

  return permissions.some((permission) =>
    payload.permissions.includes(permission),
  );
}
