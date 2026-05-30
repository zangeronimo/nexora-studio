import { makeAuthHttpClient } from '@infra/base/http/make-auth-http-client';
import { UserService } from '@infra/core/services/user-service';

export const makeUserService = () => {
  return new UserService(makeAuthHttpClient());
};
