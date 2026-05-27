import { JSX } from 'react';
import { CoreCompanyCreatePage } from '@presentation/core/pages/company/create';
import { makeCompanyService } from './services/make-company-service';

export const CoreCompanyCreatePageFactory = (): JSX.Element => {
  return <CoreCompanyCreatePage companyService={makeCompanyService()} />;
};
