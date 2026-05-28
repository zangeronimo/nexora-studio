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
import { Company } from '@domain/core/entities/company';
import { PaginatedResponse } from '@application/base/response/paginated-response';
import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { ICompanyService } from '@application/core/contracts/company-service';
import { GetCompaniesRequest } from '@application/core/requests/company-request';

import * as styles from '../styles.module.scss';

type Props = {
  companyService: ICompanyService;
  authorizationProvider: AuthorizationProvider;
};

type CompanyFilter = {
  name?: string;
  status?: string;
};

export function useCompanyList({
  companyService,
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
  } = useListSearchParams<CompanyFilter>();

  const [response, setResponse] = useState<PaginatedResponse<Company> | null>(
    null,
  );

  const [loading, setLoading] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const request = useMemo(() => {
    return new GetCompaniesRequest(
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

      const result = await companyService.getAll(request);

      setResponse(result);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [request]);

  const handleCreate = () => {
    navigate('/core/companies/create');
  };

  const handleEdit = (company: Company) => {
    navigate(`/core/companies/edit/${company.id}`);
  };

  const handleOpenDelete = (company: Company) => {
    setSelectedCompany(company);
  };

  const handleCloseDelete = () => {
    setSelectedCompany(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCompany) {
      return;
    }

    try {
      setLoading(true);

      await companyService.delete(selectedCompany.id);

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

  const columns: TableColumn<Company>[] = useMemo(
    () => [
      {
        key: 'name',
        header: t('core.company.name'),
        orderBy: 'Name',
      },
      {
        key: 'status',
        header: t('core.company.status'),
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
        header: t('core.company.created_at'),
        width: '180px',
        render: (c) => new Date(c.createdAt).toLocaleDateString(),
      },
      {
        key: 'actions',
        header: '',
        width: '120px',
        align: 'right',
        render: (company) => (
          <DataGridActions>
            <DataGridAction
              type="edit"
              label={t('common.button.edit')}
              visible={authorizationProvider.hasPermission(
                'core.company.update',
              )}
              onClick={() => handleEdit(company)}
            />

            <DataGridAction
              type="delete"
              label={t('common.button.delete')}
              visible={authorizationProvider.hasPermission(
                'core.company.delete',
              )}
              onClick={() => handleOpenDelete(company)}
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

    selectedCompany,

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
