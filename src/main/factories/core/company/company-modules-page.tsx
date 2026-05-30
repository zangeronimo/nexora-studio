import { JSX } from 'react';
import { makeCompanyService } from '../services/make-company-service';
import { CoreCompanyModulesPage } from '@presentation/core/pages/company/modules';
import { makeModuleService } from '../services/make-module-service';

export const CoreCompanyModulesPageFactory = (): JSX.Element => {
  return (
    <CoreCompanyModulesPage
      companyService={makeCompanyService()}
      moduleService={makeModuleService()}
    />
  );
};
