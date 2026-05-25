import { Logout } from '@application/base/security/logout';
import { FetchHttpClient } from '@infra/base/http/clients/fetch-http-client';
import { LocalStorage } from '@infra/base/http/clients/local-storage';
import { DefaultAuthService } from '@infra/base/security/services/default-auth-service';
import { LogoutPage } from '@presentation/base/pages/logout/logout-page';
import { JSX } from 'react';

export const LogoutPageFactory = (): JSX.Element => {
  const httpClient = new FetchHttpClient();
  const storage = new LocalStorage();
  const authService = new DefaultAuthService(httpClient);
  const logout = new Logout(storage, authService);
  return <LogoutPage logout={logout} />;
};
