import { Storage } from '@application/contracts/core/storage';
import { AccessTokenPayload } from '../../../core/security/contracts/access-token-payload';
import { AuthorizationService } from '@application/contracts/security/authorizaton-service';
import { parseAccessToken } from '../../../core/security/domain/parse-access-token';
import { hasPermission } from '../../../core/security/domain/has-permission';
import { hasSomePermission } from '../../../core/security/domain/has-some-permission';

export class DefaultAuthorizationService implements AuthorizationService {
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
