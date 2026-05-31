import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableColumn } from '@presentation/base/components/table';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';
import { useToast } from '@presentation/base/toast/hooks/use-toast';
import { useListSearchParams } from '@presentation/base/query-state/hooks/use-list-search-params';
import {
  selectFilter,
  textFilter,
} from '@presentation/base/query-state/list-filter/factories';
import { DataGridAction } from '@presentation/base/components/data-grid/actions/action';
import { DataGridActions } from '@presentation/base/components/data-grid/actions';
import { status } from '@domain/base/enums/status';
import { Role } from '@domain/system/entities/role';
import { PaginatedResponse } from '@application/base/response/paginated-response';
import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { IRoleService } from '@application/system/contracts/role-service';
import { GetRolesRequest } from '@application/system/requests/role-request';

import * as styles from '../styles.module.scss';
import { Button } from '@presentation/base/components/button';
import { ShieldCheck } from 'lucide-react';

type Props = {
  roleService: IRoleService;
  authorizationProvider: AuthorizationProvider;
};

type RoleFilter = {
  name?: string;
  status?: string;
};

export function useRoleList({ roleService, authorizationProvider }: Props) {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const toast = useToast();

  const {
    page,
    pageSize,
    sortBy,
    sortDesc,
    filters,
    setPage,
    setPageSize,
    setSorting,
    setFilters,
    clearFilters,
  } = useListSearchParams<RoleFilter>();

  const [response, setResponse] = useState<PaginatedResponse<Role> | null>(
    null,
  );

  const [loading, setLoading] = useState(false);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const request = useMemo(() => {
    return new GetRolesRequest(
      page.value(),
      pageSize.value(),
      sortBy.value() ?? 'Name',
      sortDesc.value(),
      filters.name ?? '',
      filters.status ? Number(filters.status) : null,
    );
  }, [page, pageSize, sortBy, sortDesc, filters]);

  const load = async () => {
    try {
      setLoading(true);

      const result = await roleService.getAll(request);

      setResponse(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [request]);

  const handleCreate = () => {
    navigate('/system/roles/create');
  };

  const handleEdit = (role: Role) => {
    navigate(`/system/roles/edit/${role.id}`);
  };

  const handleOpenDelete = (role: Role) => {
    setSelectedRole(role);
  };

  const handleCloseDelete = () => {
    setSelectedRole(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRole) {
      return;
    }

    try {
      setLoading(true);

      await roleService.delete(selectedRole.id);

      toast.success(t('common.toast.success.deleted'));

      const isLastItemOnPage = response?.items.length === 1 && page.value() > 1;

      handleCloseDelete();

      if (isLastItemOnPage) {
        setPage(page.value() - 1);
        return;
      }

      await load();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const columns: TableColumn<Role>[] = useMemo(
    () => [
      {
        key: 'name',
        header: t('system.role.datagrid.name'),
        orderBy: 'Name',
      },
      {
        key: 'status',
        header: t('system.role.datagrid.status'),
        orderBy: 'Status',
        width: '160px',
        render: (c) => (
          <span
            className={
              c.status === 1 ? styles.activeStatus : styles.disabledStatus
            }
          >
            {c.status === 1
              ? t('common.status.active')
              : t('common.status.inactive')}
          </span>
        ),
      },
      {
        key: 'createdAt',
        header: t('system.role.datagrid.created_at'),
        width: '180px',
        render: (c) => new Date(c.createdAt).toLocaleDateString(),
      },
      {
        key: 'actions',
        header: '',
        width: '120px',
        align: 'right',
        render: (role) => (
          <DataGridActions>
            <DataGridAction
              type="edit"
              label={t('common.button.edit')}
              visible={authorizationProvider.hasPermission(
                'system.role.update',
              )}
              onClick={() => handleEdit(role)}
            />

            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => navigate(`/system/roles/${role.id}/permissions`)}
              disabled={
                !authorizationProvider.hasPermission('system.role.update')
              }
              aria-label={t('system.role.buttons.permission')}
              title={t('system.role.buttons.permission')}
            >
              <ShieldCheck size={16} />
            </Button>

            <DataGridAction
              type="delete"
              label={t('common.button.delete')}
              visible={authorizationProvider.hasPermission(
                'system.role.delete',
              )}
              onClick={() => handleOpenDelete(role)}
            />
          </DataGridActions>
        ),
      },
    ],
    [t],
  );

  return {
    loading,
    response,
    columns,

    filters,

    page: page.value(),
    pageSize: pageSize.value(),

    sortBy: sortBy.value(),
    sortDesc: sortDesc.value(),

    selectedRole,

    setPage,
    setPageSize,
    setSorting,

    setFilters,
    clearFilters,

    handleCreate,
    handleCloseDelete,
    handleConfirmDelete,

    toolbar: {
      fields: [
        textFilter('name', t('filter.placeholder.name')),
        selectFilter('status', [
          {
            value: status.inactive.toString(),
            label: t('common.status.inactive'),
          },
          {
            value: status.active.toString(),
            label: t('common.status.active'),
          },
        ]),
      ],
    },
  };
}
