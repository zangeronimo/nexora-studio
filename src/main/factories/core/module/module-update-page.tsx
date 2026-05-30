import { JSX } from 'react';
import { CoreModuleUpdatePage } from '@presentation/core/pages/module/update';
import { makeModuleService } from '../services/make-module-service';

export const CoreModuleUpdatePageFactory = (): JSX.Element => {
  return <CoreModuleUpdatePage moduleService={makeModuleService()} />;
};
