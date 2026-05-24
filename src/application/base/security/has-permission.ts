import { AccessTokenPayload } from '@application/base/security/contracts/access-token-payload';

export function hasPermission(
  payload: AccessTokenPayload | null,
  permission: string,
): boolean {
  return !!payload?.permissions.includes(permission);
}
