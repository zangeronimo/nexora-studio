export interface AuthorizationProvider {
  hasPermission(permission: string): boolean;
  hasSomePermission(permissions: string[]): boolean;
}
