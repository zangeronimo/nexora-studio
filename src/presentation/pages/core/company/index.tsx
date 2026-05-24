import { useEffect, useMemo, useState } from 'react';

import { CompanyService } from '@application/contracts/core/company-service';
import { GetCompaniesRequest } from '@application/requests/core/company-request';
import { PaginatedResponse } from '@application/response/paginated-response';
import { Company } from '@domain/entities/core/company';

import { useTranslation } from '@core/i18n/presentation/use-translation';

import { Page } from '@presentation/shell/components/page';
import { Card } from '@presentation/shared/components/card';

import { DataGrid } from '@presentation/shared/components/data-grid';
import { CompanyFilter } from './filter';

import * as styles from './styles.module.scss';
import { TableColumn } from '@presentation/shared/components/table';
import { useListSearchParams } from '@core/query-state/hooks/use-list-search-params';
import { DataGridActions } from '@presentation/shared/components/data-grid/actions';
import { DataGridAction } from '@presentation/shared/components/data-grid/actions/action';
import { AuthorizationService } from '@application/contracts/security/authorizaton-service';
import { CreateButton } from '@presentation/shared/components/action-buttons/create-button';
import { ListFilter } from '@presentation/shared/components/list-filter';
import { status } from '@domain/enums/status';
import {
  selectFilter,
  textFilter,
} from '@core/query-state/list-filter/factories';

type Props = {
  companyService: CompanyService;
  authorizationService: AuthorizationService;
};

export const CoreCompanyPage = ({
  companyService,
  authorizationService,
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
              visible={authorizationService.hasPermission(
                'core.company.update',
              )}
              onClick={() => handleEdit(company)}
            />

            <DataGridAction
              type="delete"
              label={t('common_delete')}
              visible={authorizationService.hasPermission(
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
            visible={authorizationService.hasPermission('core.company.create')}
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
