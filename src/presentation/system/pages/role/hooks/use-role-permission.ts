import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IRoleService } from '@application/system/contracts/role-service';
import { ICompanyService } from '@application/core/contracts/company-service';

import { UpdateRolePermissionsRequest } from '@application/system/requests/role-request';

import { PermissionCode } from '@domain/core/value-objects/permission-code';
import { Module } from '@domain/core/entities/module';
import { Permission } from '@domain/core/entities/permission';

import { useToast } from '@presentation/base/toast/hooks/use-toast';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

type Props = {
  roleService: IRoleService;
  companyService: ICompanyService;
};

type ResourceGroup = {
  name: string;
  permissions: Permission[];
};

type ModuleGroup = {
  id: string;
  name: string;
  resources: ResourceGroup[];
};

const buildResources = (module: Module): ResourceGroup[] => {
  const resources = new Map<string, Permission[]>();

  for (const permission of module.permissions ?? []) {
    const code = PermissionCode.parse(permission.code);

    const current = resources.get(code.resource) ?? [];

    resources.set(code.resource, [...current, permission]);
  }

  return Array.from(resources.entries())
    .map(([name, permissions]) => ({
      name,
      permissions: [...permissions].sort((a, b) =>
        a.label.localeCompare(b.label),
      ),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

const buildModuleGroups = (modules: Module[]): ModuleGroup[] => {
  return modules
    .map((module) => ({
      id: module.id,
      name: module.name,
      resources: buildResources(module),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export function useRolePermission({ roleService, companyService }: Props) {
  const { id } = useParams();

  const navigate = useNavigate();

  const toast = useToast();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [roleName, setRoleName] = useState('');

  const [modules, setModules] = useState<ModuleGroup[]>([]);

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [initialPermissions, setInitialPermissions] = useState<string[]>([]);

  const load = async (roleId: string) => {
    setLoading(true);

    try {
      const [role, company] = await Promise.all([
        roleService.getById(roleId),
        companyService.getModules(),
      ]);

      if (!role || !company) {
        navigate('/system/roles');
        return;
      }

      const permissions = role.permissions.map((permission) => permission.id);

      setRoleName(role.name);

      setSelectedPermissions(permissions);
      setInitialPermissions(permissions);

      setModules(buildModuleGroups(company.modules));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    load(id);
  }, [id]);

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setSelectedPermissions((old) => {
      if (checked) {
        return [...old, permissionId];
      }

      return old.filter((id) => id !== permissionId);
    });
  };

  const handleSubmit = async () => {
    if (!id) {
      return;
    }

    try {
      setLoading(true);

      await roleService.updatePermissions(
        id,
        new UpdateRolePermissionsRequest(selectedPermissions),
      );

      setInitialPermissions(selectedPermissions);
      toast.success(t('common.toast.success.updated'));
      navigate('/system/roles');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const isDirty = useMemo(() => {
    const current = [...selectedPermissions].sort();
    const initial = [...initialPermissions].sort();

    return JSON.stringify(current) !== JSON.stringify(initial);
  }, [selectedPermissions, initialPermissions]);

  return {
    loading,

    roleName,
    modules,

    selectedPermissions,

    isDirty,

    handlePermissionChange,
    handleSubmit,
  };
}
