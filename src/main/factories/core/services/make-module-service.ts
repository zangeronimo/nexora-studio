import { makeAuthHttpClient } from '@infra/base/http/make-auth-http-client';
import { ModuleService } from '@infra/core/services/module-service';

export const makeModuleService = () => {
  return new ModuleService(makeAuthHttpClient());
};
