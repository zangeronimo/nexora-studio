import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IModuleService } from '@application/core/contracts/module-service';
import { PermissionDto } from '@application/core/dto/permission-dto';
import { UpdateModuleRequest } from '@application/core/requests/module-request';

import { RequiredValidator } from '@application/base/validation/rules/required';
import { MaxLengthValidator } from '@application/base/validation/rules/max-length';
import { validate } from '@application/base/validation/validate';

import { PermissionCode } from '@domain/core/value-objects/permission-code';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';
import { useToast } from '@presentation/base/toast/hooks/use-toast';
import { PermissionForm } from '../update/types/permission-form';

type Props = {
  moduleService: IModuleService;
};

type Errors = {
  name: string;
  status: string;
};

type Request = {
  id: string;
  name: string;
  status: string;
  permissions: PermissionForm[];
};

export function useModuleUpdateForm({ moduleService }: Props) {
  const { id } = useParams();

  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();

  const [initialState, setInitialState] = useState<Request | null>(null);

  const [request, setRequest] = useState<Request | null>(null);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Errors>({
    name: '',
    status: '',
  });

  const [selectedPermission, setSelectedPermission] =
    useState<PermissionForm | null>(null);

  const [openPermissionModal, setOpenPermissionModal] = useState(false);

  const [openDeletePermissionModal, setOpenDeletePermissionModal] =
    useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    setLoading(true);

    moduleService
      .getById(id)
      .then((module) => {
        if (!module) {
          navigate('/core/modules');
          return;
        }

        const state: Request = {
          id: module.id,
          name: module.name,
          status: module.status.toString(),
          permissions:
            module.permissions?.map((permission) => {
              const code = PermissionCode.parse(permission.code);

              return {
                id: permission.id,
                module: code.module,
                resource: code.resource,
                permission: code.permission,
                label: permission.label,
                status: permission.status,
                createdAt: permission.createdAt,
                updatedAt: permission.updatedAt,
              };
            }) ?? [],
        };

        setRequest(state);
        setInitialState(state);
      })
      .finally(() => setLoading(false));
  }, [id, moduleService, navigate]);

  const handleNameChange = (value: string) => {
    setRequest((old) =>
      old
        ? {
            ...old,
            name: value,
          }
        : old,
    );

    setErrors((old) => ({
      ...old,
      name: '',
    }));
  };

  const handleStatusChange = (value: string) => {
    setRequest((old) =>
      old
        ? {
            ...old,
            status: value,
          }
        : old,
    );

    setErrors((old) => ({
      ...old,
      status: '',
    }));
  };

  const handleCreatePermission = () => {
    if (!request) {
      return;
    }

    setSelectedPermission({
      module: request.name.toLowerCase(),
      resource: '',
      permission: '',
      label: '',
      status: 1,
    });

    setOpenPermissionModal(true);
  };

  const handleEditPermission = (permission: PermissionForm) => {
    setSelectedPermission(permission);
    setOpenPermissionModal(true);
  };

  const handleDeletePermission = (permission: PermissionForm) => {
    setSelectedPermission(permission);
    setOpenDeletePermissionModal(true);
  };

  const handleSavePermission = (permission: PermissionForm) => {
    setRequest((old) => {
      if (!old) {
        return old;
      }

      if (!permission.id) {
        return {
          ...old,
          permissions: [...old.permissions, permission],
        };
      }

      return {
        ...old,
        permissions: old.permissions.map((x) =>
          x.id === permission.id ? permission : x,
        ),
      };
    });

    setSelectedPermission(null);
    setOpenPermissionModal(false);
  };

  const handleConfirmDeletePermission = () => {
    if (!selectedPermission) {
      return;
    }

    setRequest((old) => {
      if (!old) {
        return old;
      }

      return {
        ...old,
        permissions: old.permissions.filter(
          (x) => x.id !== selectedPermission.id,
        ),
      };
    });

    setSelectedPermission(null);
    setOpenDeletePermissionModal(false);
  };

  const handleSubmit = async () => {
    if (!request) {
      return;
    }

    const nameError = validate(request.name, [
      new RequiredValidator(),
      new MaxLengthValidator(200),
    ]);

    const statusError = validate(request.status, [new RequiredValidator()]);

    const nextErrors = {
      name: nameError ? t(nameError.key, nameError.params) : '',
      status: statusError ? t(statusError.key, statusError.params) : '',
    };

    setErrors(nextErrors);

    const hasSomeError = Object.values(nextErrors).some(Boolean);

    if (hasSomeError) {
      return;
    }

    try {
      setLoading(true);

      const permissions: PermissionDto[] = request.permissions.map(
        (permission) => ({
          id: permission.id,
          code: new PermissionCode(
            permission.module,
            permission.resource,
            permission.permission,
          ).toString(),
          label: permission.label,
          status: permission.status,
          createdAt: permission.createdAt,
          updatedAt: permission.updatedAt,
        }),
      );

      await moduleService.update(
        new UpdateModuleRequest(
          request.id,
          request.name,
          Number(request.status),
          permissions,
        ),
      );

      toast.success(t('common.toast.success.updated'));

      navigate('/core/modules');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const isDirty = JSON.stringify(request) !== JSON.stringify(initialState);

  return {
    request,
    errors,
    loading,
    isDirty,

    selectedPermission,

    openPermissionModal,
    openDeletePermissionModal,

    handleSubmit,

    handleNameChange,
    handleStatusChange,

    handleCreatePermission,
    handleEditPermission,
    handleDeletePermission,

    handleSavePermission,
    handleConfirmDeletePermission,

    setOpenPermissionModal,
    setOpenDeletePermissionModal,
    setSelectedPermission,
  };
}
