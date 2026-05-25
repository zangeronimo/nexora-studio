import { DefaultAuthHttpClient } from '@infra/base/http/clients/default-auth-http-client';
import { FetchHttpClient } from '@infra/base/http/clients/fetch-http-client';
import { LocalStorage } from '@infra/base/http/clients/local-storage';
import { CompanyService } from '@infra/core/services/company-service';
import { DefaultAuthService } from '@infra/base/security/services/default-auth-service';
import { JwtAuthorizationProvider } from '@infra/base/security/providers/jwt-authorization-provider';
import { CoreCompanyPage } from '@presentation/core/pages/company';
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
  const companyService = new CompanyService(authClient);
  return (
    <CoreCompanyPage
      companyService={companyService}
      authorizationProvider={authorizationProvider}
    />
  );
};
