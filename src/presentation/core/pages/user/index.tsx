import { Card } from '@presentation/base/components/card';
import { CreateButton } from '@presentation/base/components/action-buttons/create-button';
import { ConfirmModal } from '@presentation/base/components/confirm-modal';
import { DataGrid } from '@presentation/base/components/data-grid';
import { ListFilter } from '@presentation/base/components/list-filter';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';
import { Page } from '@presentation/base/shell/components/page';
import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { IUserService } from '@application/core/contracts/user-service';
import { useUserList } from './hooks/use-user-list';

import * as styles from './styles.module.scss';

type Props = {
  userService: IUserService;
  authorizationProvider: AuthorizationProvider;
};

export const CoreUserPage = ({ userService, authorizationProvider }: Props) => {
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

    selectedUser,

    setPage,
    setPageSize,
    setSorting,

    setFilters,
    clearFilters,

    handleCreate,
    handleCloseDelete,
    handleConfirmDelete,

    toolbar,
  } = useUserList({
    userService,
    authorizationProvider,
  });

  return (
    <>
      <ConfirmModal
        open={!!selectedUser}
        title={t('core.user.delete.title')}
        description={t('core.user.delete.description')}
        confirmLabel={t('common.button.delete')}
        cancelLabel={t('common.button.cancel')}
        loading={loading}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />

      <Page title={t('core.user.title')}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <p className={styles.description}>{t('core.user.description')}</p>
            </div>

            <CreateButton
              title={t('core.user.create.title')}
              visible={authorizationProvider.hasPermission('core.user.create')}
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
