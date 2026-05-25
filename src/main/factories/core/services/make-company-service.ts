import { makeAuthHttpClient } from '@infra/base/http/make-auth-http-client';
import { CompanyService } from '@infra/core/services/company-service';

export const makeCompanyService = () => {
  return new CompanyService(makeAuthHttpClient());
};
