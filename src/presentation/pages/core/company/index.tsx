import { useEffect, useMemo, useState } from 'react';

import { CompanyService } from '@application/contracts/core/company-service';
import { GetCompaniesRequest } from '@application/requests/core/company-request';
import { PaginatedResponse } from '@application/response/paginated-response';
import { Company } from '@domain/entities/core/company';

import { useTranslation } from '@core/i18n/presentation/use-translation';

import { Page } from '@presentation/shell/components/page';
import { Card } from '@presentation/shared/components/card';
import { Button } from '@presentation/shared/components/button';

import { DataGrid } from '@presentation/shared/components/data-grid';
import { CompanyFilter, CompanyFilterValues } from './filter';

import * as styles from './styles.module.scss';
import { TableColumn } from '@presentation/shared/components/table';
import { useListSearchParams } from '@core/query-state/hooks/use-list-search-params';

type Props = {
  companyService: CompanyService;
};

export const CoreCompanyPage = ({ companyService }: Props) => {
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
  } = useListSearchParams<CompanyFilterValues>();

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
        header: t('company_name'),
        orderBy: 'Name',
      },
      {
        key: 'status',
        header: t('company_status'),
        orderBy: 'Status',
        width: '160px',
        render: (c) => (
          <span
            className={
              c.status === 1 ? styles.activeStatus : styles.disabledStatus
            }
          >
            {c.status === 1 ? t('common_active') : t('common_disabled')}
          </span>
        ),
      },
      {
        key: 'createdAt',
        header: t('company_created_at'),
        width: '180px',
        render: (c) => new Date(c.createdAt).toLocaleDateString(),
      },
      {
        key: 'actions',
        header: '',
        width: '120px',
        align: 'right',
        render: () => <Button size="sm">{t('common_edit')}</Button>,
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

          <Button>{t('core_company_create')}</Button>
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
              <CompanyFilter
                loading={state.loading}
                values={{
                  name: filters.name,
                  status: filters.status,
                }}
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
