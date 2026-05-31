import { JSX } from 'react';
import { SystemRoleUpdatePage } from '@presentation/system/pages/role/update';
import { makeRoleService } from '../services/make-role-service';

export const SystemRoleUpdatePageFactory = (): JSX.Element => {
  return <SystemRoleUpdatePage roleService={makeRoleService()} />;
};
