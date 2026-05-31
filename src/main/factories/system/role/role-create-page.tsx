import { JSX } from 'react';
import { SystemRoleCreatePage } from '@presentation/system/pages/role/create';
import { makeRoleService } from '../services/make-role-service';

export const SystemRoleCreatePageFactory = (): JSX.Element => {
  return <SystemRoleCreatePage roleService={makeRoleService()} />;
};
