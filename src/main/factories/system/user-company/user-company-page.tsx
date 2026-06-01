import { JSX } from 'react';
import { makeUserCompanyService } from '../services/make-user-company-service';
import { makeAuthorizationProvider } from '@infra/base/provider/make-authorization-provider';
import { SystemUserCompanyPage } from '@presentation/system/pages/user-company';

export const SystemUserCompanyPageFactory = (): JSX.Element => {
  return (
    <SystemUserCompanyPage
      userCompanyService={makeUserCompanyService()}
      authorizationProvider={makeAuthorizationProvider()}
    />
  );
};
