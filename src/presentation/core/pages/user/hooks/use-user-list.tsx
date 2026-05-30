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
import { User } from '@domain/core/entities/user';
import { PaginatedResponse } from '@application/base/response/paginated-response';
import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { IUserService } from '@application/core/contracts/user-service';
import { GetUsersRequest } from '@application/core/requests/user-request';

import * as styles from '../styles.module.scss';

type Props = {
  userService: IUserService;
  authorizationProvider: AuthorizationProvider;
};

type UserFilter = {
  name?: string;
  email?: string;
  status?: string;
};

export function useUserList({ userService, authorizationProvider }: Props) {
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
  } = useListSearchParams<UserFilter>();

  const [response, setResponse] = useState<PaginatedResponse<User> | null>(
    null,
  );

  const [loading, setLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const request = useMemo(() => {
    return new GetUsersRequest(
      page.value(),
      pageSize.value(),
      sortBy.value() ?? 'Name',
      sortDesc.value(),
      filters.name ?? '',
      filters.email ?? '',
      filters.status ? Number(filters.status) : null,
    );
  }, [page, pageSize, sortBy, sortDesc, filters]);

  const load = async () => {
    try {
      setLoading(true);

      const result = await userService.getAll(request);

      setResponse(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [request]);

  const handleCreate = () => {
    navigate('/core/users/create');
  };

  const handleEdit = (user: User) => {
    navigate(`/core/users/edit/${user.id}`);
  };

  const handleOpenDelete = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseDelete = () => {
    setSelectedUser(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) {
      return;
    }

    try {
      setLoading(true);

      await userService.delete(selectedUser.id);

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

  const columns: TableColumn<User>[] = useMemo(
    () => [
      {
        key: 'name',
        header: t('core.user.datagrid.name'),
        orderBy: 'Name',
      },
      {
        key: 'email',
        header: t('core.user.datagrid.email'),
        orderBy: 'Email',
      },
      {
        key: 'status',
        header: t('core.user.datagrid.status'),
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
        header: t('core.user.datagrid.created_at'),
        width: '180px',
        render: (c) => new Date(c.createdAt).toLocaleDateString(),
      },
      {
        key: 'actions',
        header: '',
        width: '120px',
        align: 'right',
        render: (user) => (
          <DataGridActions>
            <DataGridAction
              type="edit"
              label={t('common.button.edit')}
              visible={authorizationProvider.hasPermission('core.user.update')}
              onClick={() => handleEdit(user)}
            />

            <DataGridAction
              type="delete"
              label={t('common.button.delete')}
              visible={authorizationProvider.hasPermission('core.user.delete')}
              onClick={() => handleOpenDelete(user)}
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

    selectedUser,

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
        textFilter('email', t('filter.placeholder.email')),
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
