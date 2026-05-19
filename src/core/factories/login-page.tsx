import { Logout } from '@application/use-cases/logout';
import { UserLogin } from '@application/use-cases/user-login';
import { FetchHttpClient } from '@infra/http/clients/fetch-http-client';
import { LocalStorage } from '@infra/http/clients/local-storage';
import { DefaultAuthService } from '@infra/services/default-auth-service';
import { useAuth } from '@presentation/auth/use-auth';
import { LoginPage } from '@presentation/pages/login/login-page';
import { JSX } from 'react';

export const LoginPageFactory = (): JSX.Element => {
  const { setAuthenticated } = useAuth();
  const httpClient = new FetchHttpClient();
  const storage = new LocalStorage();
  const authService = new DefaultAuthService(httpClient);
  const userLogin = new UserLogin(authService, storage, setAuthenticated);
  const logout = new Logout(storage);
  return <LoginPage userLogin={userLogin} logout={logout} />;
};
