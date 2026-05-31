import { makeAuthHttpClient } from '@infra/base/http/make-auth-http-client';
import { RoleService } from '@infra/system/services/role-service';

export const makeRoleService = () => {
  return new RoleService(makeAuthHttpClient());
};
