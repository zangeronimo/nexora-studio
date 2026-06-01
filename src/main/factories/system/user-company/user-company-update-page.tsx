import { JSX } from 'react';
import { SystemUserCompanyUpdatePage } from '@presentation/system/pages/user-company/update';
import { makeUserCompanyService } from '../services/make-user-company-service';

export const SystemUserCompanyUpdatePageFactory = (): JSX.Element => {
  return (
    <SystemUserCompanyUpdatePage
      userCompanyService={makeUserCompanyService()}
    />
  );
};
