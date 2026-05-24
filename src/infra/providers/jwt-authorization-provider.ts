import { Storage } from '@application/contracts/core/storage';
import { AuthorizationProvider } from '@application/contracts/security/authorizaton-provider';
import { AccessTokenPayload } from '@application/contracts/security/access-token-payload';
import { parseAccessToken } from '@application/security/parse-access-token';
import { hasPermission } from '@application/security/has-permission';
import { hasSomePermission } from '@application/security/has-some-permission';

export class JwtAuthorizationProvider implements AuthorizationProvider {
  constructor(private readonly storage: Storage) {}
  _payload(): AccessTokenPayload | null {
    const token = this.storage.get<string>('accessToken');
    if (!token) return null;
    return parseAccessToken(token);
  }
  hasPermission(permission: string): boolean {
    return hasPermission(this._payload(), permission);
  }
  hasSomePermission(permissions: string[]): boolean {
    return hasSomePermission(this._payload(), permissions);
  }
}
