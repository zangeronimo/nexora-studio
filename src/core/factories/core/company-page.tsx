import { DefaultAuthHttpClient } from '@infra/http/clients/default-auth-http-client';
import { FetchHttpClient } from '@infra/http/clients/fetch-http-client';
import { LocalStorage } from '@infra/http/clients/local-storage';
import { DefaultCompanyService } from '@infra/services/core/default-company-service';
import { DefaultAuthService } from '@infra/services/default-auth-service';
import { JwtAuthorizationProvider } from '@infra/providers/jwt-authorization-provider';
import { CoreCompanyPage } from '@presentation/pages/core/company';
import { JSX } from 'react';

export const CompanyPageFactory = (): JSX.Element => {
  const httpClient = new FetchHttpClient();
  const storage = new LocalStorage();
  const authService = new DefaultAuthService(httpClient);
  const authorizationProvider = new JwtAuthorizationProvider(storage);
  const authClient = new DefaultAuthHttpClient(
    httpClient,
    storage,
    process.env.API_URL,
    authService,
  );
  const companyService = new DefaultCompanyService(authClient);
  return (
    <CoreCompanyPage
      companyService={companyService}
      authorizationProvider={authorizationProvider}
    />
  );
};
