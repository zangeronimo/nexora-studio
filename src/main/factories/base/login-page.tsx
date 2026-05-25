import { Logout } from '@application/base/security/logout';
import { Login } from '@application/base/security/login';
import { FetchHttpClient } from '@infra/base/http/clients/fetch-http-client';
import { LocalStorage } from '@infra/base/http/clients/local-storage';
import { DefaultAuthService } from '@infra/base/security/services/default-auth-service';
import { useAuth } from '@presentation/base/auth/use-auth';
import { LoginPage } from '@presentation/base/pages/login/login-page';
import { JSX } from 'react';

export const LoginPageFactory = (): JSX.Element => {
  const { setAuthenticated } = useAuth();
  const httpClient = new FetchHttpClient();
  const storage = new LocalStorage();
  const authService = new DefaultAuthService(httpClient);
  const login = new Login(authService, storage, setAuthenticated);
  const logout = new Logout(storage, authService);
  return <LoginPage login={login} logout={logout} />;
};
