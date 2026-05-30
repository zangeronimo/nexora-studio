import { CoreCompanyPage } from '@presentation/core/pages/company';
import { JSX } from 'react';
import { makeCompanyService } from '../services/make-company-service';
import { makeAuthorizationProvider } from '@infra/base/provider/make-authorization-provider';

export const CompanyPageFactory = (): JSX.Element => {
  return (
    <CoreCompanyPage
      companyService={makeCompanyService()}
      authorizationProvider={makeAuthorizationProvider()}
    />
  );
};
