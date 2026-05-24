import { LoginRequest } from '@application/base/security/requests/login-request';

export interface AuthService {
  login(request: LoginRequest): Promise<string | null>;
  refresh(): Promise<string | null>;
  logout(): Promise<void>;
}
