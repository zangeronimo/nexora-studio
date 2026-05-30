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
import { Module } from '@domain/core/entities/module';
import { PaginatedResponse } from '@application/base/response/paginated-response';
import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { IModuleService } from '@application/core/contracts/module-service';
import { GetModulesRequest } from '@application/core/requests/module-request';

import * as styles from '../styles.module.scss';

type Props = {
  moduleService: IModuleService;
  authorizationProvider: AuthorizationProvider;
};

type ModuleFilter = {
  name?: string;
  status?: string;
};

export function useModuleList({ moduleService, authorizationProvider }: Props) {
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
  } = useListSearchParams<ModuleFilter>();

  const [response, setResponse] = useState<PaginatedResponse<Module> | null>(
    null,
  );

  const [loading, setLoading] = useState(false);

  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const request = useMemo(() => {
    return new GetModulesRequest(
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

      const result = await moduleService.getAll(request);

      setResponse(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [request]);

  const handleCreate = () => {
    navigate('/core/modules/create');
  };

  const handleEdit = (module: Module) => {
    navigate(`/core/modules/edit/${module.id}`);
  };

  const handleOpenDelete = (module: Module) => {
    setSelectedModule(module);
  };

  const handleCloseDelete = () => {
    setSelectedModule(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedModule) {
      return;
    }

    try {
      setLoading(true);
      await moduleService.delete(selectedModule.id);
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

  const columns: TableColumn<Module>[] = useMemo(
    () => [
      {
        key: 'name',
        header: t('core.module.datagrid.name'),
        orderBy: 'Name',
      },
      {
        key: 'status',
        header: t('core.module.datagrid.status'),
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
        header: t('core.module.datagrid.created_at'),
        width: '180px',
        render: (c) => new Date(c.createdAt).toLocaleDateString(),
      },
      {
        key: 'actions',
        header: '',
        width: '120px',
        align: 'right',
        render: (module) => (
          <DataGridActions>
            <DataGridAction
              type="edit"
              label={t('common.button.edit')}
              visible={authorizationProvider.hasPermission(
                'core.module.update',
              )}
              onClick={() => handleEdit(module)}
            />

            <DataGridAction
              type="delete"
              label={t('common.button.delete')}
              visible={authorizationProvider.hasPermission(
                'core.module.delete',
              )}
              onClick={() => handleOpenDelete(module)}
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

    selectedModule,

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
