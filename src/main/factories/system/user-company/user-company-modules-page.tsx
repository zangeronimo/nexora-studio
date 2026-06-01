import { JSX } from 'react';
import { makeUserCompanyService } from '../services/make-user-company-service';
import { SystemUserCompanyModulesPage } from '@presentation/system/pages/user-company/modules';

export const SystemUserCompanyModulesPageFactory = (): JSX.Element => {
  return (
    <SystemUserCompanyModulesPage
      userCompanyService={makeUserCompanyService()}
    />
  );
};
