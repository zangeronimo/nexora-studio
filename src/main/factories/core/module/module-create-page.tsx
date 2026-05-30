import { JSX } from 'react';
import { CoreModuleCreatePage } from '@presentation/core/pages/module/create';
import { makeModuleService } from '../services/make-module-service';

export const CoreModuleCreatePageFactory = (): JSX.Element => {
  return <CoreModuleCreatePage moduleService={makeModuleService()} />;
};
