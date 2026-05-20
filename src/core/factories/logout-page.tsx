import { Logout } from '@application/use-cases/logout';
import { FetchHttpClient } from '@infra/http/clients/fetch-http-client';
import { LocalStorage } from '@infra/http/clients/local-storage';
import { DefaultAuthService } from '@infra/services/default-auth-service';
import { LogoutPage } from '@presentation/pages/logout/logout-page';
import { JSX } from 'react';

export const LogoutPageFactory = (): JSX.Element => {
  const httpClient = new FetchHttpClient();
  const storage = new LocalStorage();
  const authService = new DefaultAuthService(httpClient);
  const logout = new Logout(storage, authService);
  return <LogoutPage logout={logout} />;
};
