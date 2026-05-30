import { JSX } from 'react';
import { makeModuleService } from '../services/make-module-service';
import { makeAuthorizationProvider } from '@infra/base/provider/make-authorization-provider';
import { CoreModulePage } from '@presentation/core/pages/module';

export const ModulePageFactory = (): JSX.Element => {
  return (
    <CoreModulePage
      moduleService={makeModuleService()}
      authorizationProvider={makeAuthorizationProvider()}
    />
  );
};
