import { SystemRolePage } from '@presentation/system/pages/role';
import { JSX } from 'react';
import { makeRoleService } from '../services/make-role-service';
import { makeAuthorizationProvider } from '@infra/base/provider/make-authorization-provider';

export const SystemRolePageFactory = (): JSX.Element => {
  return (
    <SystemRolePage
      roleService={makeRoleService()}
      authorizationProvider={makeAuthorizationProvider()}
    />
  );
};
