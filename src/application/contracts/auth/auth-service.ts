import { LoginRequest } from '@application/requests/use-cases/login-request';

export interface AuthService {
  login(request: LoginRequest): Promise<string | null>;
  refresh(): Promise<string | null>;
  logout(): Promise<void>;
}
