import { Card } from '@presentation/base/components/card';
import { CreateButton } from '@presentation/base/components/action-buttons/create-button';
import { ConfirmModal } from '@presentation/base/components/confirm-modal';
import { DataGrid } from '@presentation/base/components/data-grid';
import { ListFilter } from '@presentation/base/components/list-filter';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';
import { Page } from '@presentation/base/shell/components/page';

import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { IUserCompanyService } from '@application/system/contracts/user-company-service';

import { useUserCompanyList } from './hooks/use-user-company-list';

import * as styles from './styles.module.scss';

type Props = {
  userCompanyService: IUserCompanyService;
  authorizationProvider: AuthorizationProvider;
};

export const SystemUserCompanyPage = ({
  userCompanyService,
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

    selectedUserCompany,

    setPage,
    setPageSize,
    setSorting,
    setFilters,
    clearFilters,

    handleCreate,
    handleCloseDelete,
    handleConfirmDelete,

    toolbar,
  } = useUserCompanyList({
    userCompanyService,
    authorizationProvider,
  });

  return (
    <>
      <ConfirmModal
        open={!!selectedUserCompany}
        title={t('system.user_company.delete.title')}
        description={t('system.user_company.delete.description')}
        confirmLabel={t('common.button.delete')}
        cancelLabel={t('common.button.cancel')}
        loading={loading}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />

      <Page title={t('system.user_company.title')}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.description}>
              {t('system.user_company.description')}
            </p>

            <CreateButton
              title={t('system.user_company.create.title')}
              visible={authorizationProvider.hasPermission(
                'system.usercompany.create',
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
              sorting={{ sortBy, sortDesc }}
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
