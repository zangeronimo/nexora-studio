import { useEffect, useMemo, useState } from 'react';

import { ICompanyService } from '@application/core/contracts/company-service';
import { GetCompaniesRequest } from '@application/core/requests/company-request';
import { PaginatedResponse } from '@application/base/response/paginated-response';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { Card } from '@presentation/base/components/card';

import { DataGrid } from '@presentation/base/components/data-grid';
import { CompanyFilter } from './filter';

import * as styles from './styles.module.scss';
import { TableColumn } from '@presentation/base/components/table';
import { DataGridActions } from '@presentation/base/components/data-grid/actions';
import { DataGridAction } from '@presentation/base/components/data-grid/actions/action';
import { CreateButton } from '@presentation/base/components/action-buttons/create-button';
import { ListFilter } from '@presentation/base/components/list-filter';
import { status } from '@domain/base/enums/status';
import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { useListSearchParams } from '@presentation/base/query-state/hooks/use-list-search-params';
import {
  selectFilter,
  textFilter,
} from '@presentation/base/query-state/list-filter/factories';
import { Company } from '@domain/core/entities/company';
import { Page } from '@presentation/base/shell/components/page';

type Props = {
  companyService: ICompanyService;
  authorizationProvider: AuthorizationProvider;
};

export const CoreCompanyPage = ({
  companyService,
  authorizationProvider,
}: Props) => {
  const { t } = useTranslation();
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

  const [state, setState] = useState<{
    response: PaginatedResponse<Company> | null;
    loading: boolean;
  }>({
    response: null,
    loading: false,
  });

  /**
   * URL → Request mapping
   */
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

  const handleEdit = (company: Company) => {
    console.log(company);
  };
  const handleDelete = (company: Company) => {
    console.log(company);
  };

  /**
   * Fetch whenever URL changes
   */
  useEffect(() => {
    setState((old) => ({ ...old, loading: true }));

    companyService
      .getAll(request)
      .then((result) => {
        setState((old) => ({
          ...old,
          response: result,
        }));
      })
      .finally(() => {
        setState((old) => ({
          ...old,
          loading: false,
        }));
      });
  }, [request, companyService]);

  const columns: TableColumn<Company>[] = useMemo(
    () => [
      {
        key: 'name',
        header: t('core_company_name'),
        orderBy: 'Name',
      },
      {
        key: 'status',
        header: t('core_company_status'),
        orderBy: 'Status',
        width: '160px',
        render: (c) => (
          <span
            className={
              c.status === 1 ? styles.activeStatus : styles.disabledStatus
            }
          >
            {c.status === 1 ? t('common_active') : t('common_inactive')}
          </span>
        ),
      },
      {
        key: 'createdAt',
        header: t('core_company_created_at'),
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
              label={t('common_edit')}
              visible={authorizationProvider.hasPermission(
                'core.company.update',
              )}
              onClick={() => handleEdit(company)}
            />

            <DataGridAction
              type="delete"
              label={t('common_delete')}
              visible={authorizationProvider.hasPermission(
                'core.company.delete',
              )}
              onClick={() => handleDelete(company)}
            />
          </DataGridActions>
        ),
      },
    ],
    [t],
  );

  return (
    <Page title={t('core_company_title')}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{t('core_company_title')}</h2>
            <p className={styles.description}>
              {t('core_company_description')}
            </p>
          </div>

          <CreateButton
            title={t('core_company_create')}
            onClick={() => {}}
            visible={authorizationProvider.hasPermission('core.company.create')}
          />
        </div>

        <Card>
          <DataGrid
            data={state.response?.items ?? []}
            columns={columns}
            sorting={{
              sortBy: sortBy.value(),
              sortDesc: sortDesc.value(),
            }}
            pagination={{
              page: page.value(),
              pageSize: pageSize.value(),
              total: state.response?.total ?? 0,
            }}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            onSortingChange={setSorting}
            loading={state.loading}
            emptyMessage={t('common_no_data_found')}
            rowKey={(c) => c.id}
            toolbar={
              <ListFilter
                fields={[
                  textFilter('name', t('filter_placeholder_name')),
                  selectFilter('status', [
                    {
                      value: status.inactive.toString(),
                      label: t('common_inactive'),
                    },
                    {
                      value: status.active.toString(),
                      label: t('common_active'),
                    },
                  ]),
                ]}
                values={filters}
                onSearch={setFilters}
                onClear={clearFilters}
              />
            }
          />
        </Card>
      </div>
    </Page>
  );
};
