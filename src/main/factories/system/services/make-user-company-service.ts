import { makeAuthHttpClient } from '@infra/base/http/make-auth-http-client';
import { UserCompanyService } from '@infra/system/services/user-company-service';

export const makeUserCompanyService = () => {
  return new UserCompanyService(makeAuthHttpClient());
};
