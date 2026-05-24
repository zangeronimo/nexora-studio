import { Storage } from '@application/base/contracts/storage';
import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { AccessTokenPayload } from '@application/base/security/contracts/access-token-payload';
import { parseAccessToken } from '@application/base/security/parse-access-token';
import { hasPermission } from '@application/base/security/has-permission';
import { hasSomePermission } from '@application/base/security/has-some-permission';

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
