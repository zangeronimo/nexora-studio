import { Card } from '@presentation/base/components/card';
import { CreateButton } from '@presentation/base/components/action-buttons/create-button';
import { ConfirmModal } from '@presentation/base/components/confirm-modal';
import { DataGrid } from '@presentation/base/components/data-grid';
import { ListFilter } from '@presentation/base/components/list-filter';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';
import { Page } from '@presentation/base/shell/components/page';
import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { ICompanyService } from '@application/core/contracts/company-service';
import { useCompanyList } from './hooks/use-company-list';

import * as styles from './styles.module.scss';

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
    loading,
    response,
    columns,

    filters,

    page,
    pageSize,

    sortBy,
    sortDesc,

    selectedCompany,

    setPage,
    setPageSize,
    setSorting,

    setFilters,
    clearFilters,

    handleCreate,
    handleCloseDelete,
    handleConfirmDelete,

    toolbar,
  } = useCompanyList({
    companyService,
    authorizationProvider,
  });

  return (
    <>
      <ConfirmModal
        open={!!selectedCompany}
        title={t('core.company.delete.title')}
        description={t('core.company.delete.description')}
        confirmLabel={t('common.button.delete')}
        cancelLabel={t('common.button.cancel')}
        loading={loading}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />

      <Page title={t('core.company.title')}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <p className={styles.description}>
                {t('core.company.description')}
              </p>
            </div>

            <CreateButton
              title={t('core.company.create.title')}
              visible={authorizationProvider.hasPermission(
                'core.company.create',
              )}
              onClick={handleCreate}
            />
          </div>

          <Card>
            <DataGrid
              data={response?.items ?? []}
              columns={columns}
              loading={loading}
              emptyMessage={t('common.no_data_found')}
              rowKey={(c) => c.id}
              sorting={{
                sortBy,
                sortDesc,
              }}
              pagination={{
                page,
                pageSize,
                total: response?.total ?? 0,
              }}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              onSortingChange={setSorting}
              toolbar={
                <ListFilter
                  fields={toolbar.fields}
                  values={filters}
                  onSearch={setFilters}
                  onClear={clearFilters}
                />
              }
            />
          </Card>
        </div>
      </Page>
    </>
  );
};
