import { JSX } from 'react';
import { makeUserCompanyService } from '../services/make-user-company-service';
import { SystemUserCompanyCreatePage } from '@presentation/system/pages/user-company/create';

export const SystemUserCompanyCreatePageFactory = (): JSX.Element => {
  return (
    <SystemUserCompanyCreatePage
      userCompanyService={makeUserCompanyService()}
    />
  );
};
