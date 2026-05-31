import { JSX } from 'react';
import { makeRoleService } from '../services/make-role-service';
import { SystemRolePermissionPage } from '@presentation/system/pages/role/permissions';
import { makeCompanyService } from '@main/factories/core/services/make-company-service';

export const SystemRolePermissionPageFactory = (): JSX.Element => {
  return (
    <SystemRolePermissionPage
      roleService={makeRoleService()}
      companyService={makeCompanyService()}
    />
  );
};
