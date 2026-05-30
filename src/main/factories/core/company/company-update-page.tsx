import { JSX } from 'react';
import { CoreCompanyUpdatePage } from '@presentation/core/pages/company/update';
import { makeCompanyService } from '../services/make-company-service';

export const CoreCompanyUpdatePageFactory = (): JSX.Element => {
  return <CoreCompanyUpdatePage companyService={makeCompanyService()} />;
};
