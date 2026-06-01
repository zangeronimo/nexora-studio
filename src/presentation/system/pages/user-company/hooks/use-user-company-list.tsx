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
import { UserCompany } from '@domain/system/entities/user-company';
import { PaginatedResponse } from '@application/base/response/paginated-response';

import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { IUserCompanyService } from '@application/system/contracts/user-company-service';
import { GetUserCompaniesRequest } from '@application/system/requests/user-company-request';

import * as styles from '../styles.module.scss';
import { Button } from '@presentation/base/components/button';
import { Blocks } from 'lucide-react';

type Props = {
  userCompanyService: IUserCompanyService;
  authorizationProvider: AuthorizationProvider;
};

type UserCompanyFilter = {
  nickname?: string;
  status?: string;
};

export function useUserCompanyList({
  userCompanyService,
  authorizationProvider,
}: Props) {
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
  } = useListSearchParams<UserCompanyFilter>();

  const [response, setResponse] =
    useState<PaginatedResponse<UserCompany> | null>(null);

  const [loading, setLoading] = useState(false);
  const [selectedUserCompany, setSelectedUserCompany] =
    useState<UserCompany | null>(null);

  const request = useMemo(() => {
    return new GetUserCompaniesRequest(
      page.value(),
      pageSize.value(),
      sortBy.value() ?? 'NickName',
      sortDesc.value(),
      filters.nickname ?? '',
      filters.status ? Number(filters.status) : null,
    );
  }, [page, pageSize, sortBy, sortDesc, filters]);

  const load = async () => {
    try {
      setLoading(true);
      const result = await userCompanyService.getAll(request);
      setResponse(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [request]);

  const handleCreate = () => {
    navigate('/system/usercompanies/create');
  };

  const handleEdit = (userCompany: UserCompany) => {
    navigate(`/system/usercompanies/edit/${userCompany.id}`);
  };

  const handleOpenDelete = (userCompany: UserCompany) => {
    setSelectedUserCompany(userCompany);
  };

  const handleCloseDelete = () => {
    setSelectedUserCompany(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUserCompany) return;

    try {
      setLoading(true);

      await userCompanyService.delete(selectedUserCompany.id);

      toast.success(t('common.toast.success.deleted'));

      const isLastItemOnPage = response?.items.length === 1 && page.value() > 1;

      handleCloseDelete();

      if (isLastItemOnPage) {
        setPage(page.value() - 1);
        return;
      }

      await load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const columns: TableColumn<UserCompany>[] = useMemo(
    () => [
      {
        key: 'user',
        header: t('system.user_company.datagrid.user'),
        render: (c) => (
          <div>
            <div>{c.user?.name}</div>
            <small>{c.user?.email}</small>
          </div>
        ),
      },
      {
        key: 'nickname',
        header: t('system.user_company.datagrid.nickname'),
        orderBy: 'NickName',
      },
      {
        key: 'status',
        header: t('system.user_company.datagrid.status'),
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
        key: 'lastAccessedAt',
        header: t('system.user_company.datagrid.last_access'),
        width: '180px',
        render: (c) =>
          c.lastAccessedAt
            ? new Date(c.lastAccessedAt).toLocaleDateString()
            : '-',
      },
      {
        key: 'actions',
        header: '',
        width: '120px',
        align: 'right',
        render: (userCompany) => (
          <DataGridActions>
            <DataGridAction
              type="edit"
              label={t('common.button.edit')}
              visible={authorizationProvider.hasPermission(
                'system.usercompany.update',
              )}
              onClick={() => handleEdit(userCompany)}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() =>
                navigate(`/system/usercompanies/${userCompany.id}/modules`)
              }
              disabled={
                !authorizationProvider.hasPermission(
                  'system.usercompany.update',
                )
              }
              aria-label={t('system.user_company.buttons.module')}
              title={t('system.user_company.buttons.module')}
            >
              <Blocks size={16} />
            </Button>

            <DataGridAction
              type="delete"
              label={t('common.button.delete')}
              visible={authorizationProvider.hasPermission(
                'system.usercompany.delete',
              )}
              onClick={() => handleOpenDelete(userCompany)}
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

    selectedUserCompany,

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
        textFilter('nickname', t('filter.placeholder.nickname')),
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
