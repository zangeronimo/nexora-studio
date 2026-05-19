export interface AuthorizationService {
  hasPermission(permission: string): boolean;
  hasSomePermission(permissions: string[]): boolean;
}
