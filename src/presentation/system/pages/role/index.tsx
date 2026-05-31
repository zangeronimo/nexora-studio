import { Card } from '@presentation/base/components/card';
import { CreateButton } from '@presentation/base/components/action-buttons/create-button';
import { ConfirmModal } from '@presentation/base/components/confirm-modal';
import { DataGrid } from '@presentation/base/components/data-grid';
import { ListFilter } from '@presentation/base/components/list-filter';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';
import { Page } from '@presentation/base/shell/components/page';
import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { IRoleService } from '@application/system/contracts/role-service';
import { useRoleList } from './hooks/use-role-list';

import * as styles from './styles.module.scss';

type Props = {
  roleService: IRoleService;
  authorizationProvider: AuthorizationProvider;
};

export const SystemRolePage = ({
  roleService,
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

    selectedRole,

    setPage,
    setPageSize,
    setSorting,

    setFilters,
    clearFilters,

    handleCreate,
    handleCloseDelete,
    handleConfirmDelete,

    toolbar,
  } = useRoleList({
    roleService,
    authorizationProvider,
  });

  return (
    <>
      <ConfirmModal
        open={!!selectedRole}
        title={t('system.role.delete.title')}
        description={t('system.role.delete.description')}
        confirmLabel={t('common.button.delete')}
        cancelLabel={t('common.button.cancel')}
        loading={loading}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />

      <Page title={t('system.role.title')}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <p className={styles.description}>
                {t('system.role.description')}
              </p>
            </div>

            <CreateButton
              title={t('system.role.create.title')}
              visible={authorizationProvider.hasPermission(
                'system.role.create',
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
