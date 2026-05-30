import { Card } from '@presentation/base/components/card';
import { CreateButton } from '@presentation/base/components/action-buttons/create-button';
import { ConfirmModal } from '@presentation/base/components/confirm-modal';
import { DataGrid } from '@presentation/base/components/data-grid';
import { ListFilter } from '@presentation/base/components/list-filter';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';
import { Page } from '@presentation/base/shell/components/page';
import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { IModuleService } from '@application/core/contracts/module-service';

import * as styles from './styles.module.scss';
import { useModuleList } from '../module/hooks/use-module-list';

type Props = {
  moduleService: IModuleService;
  authorizationProvider: AuthorizationProvider;
};

export const CoreModulePage = ({
  moduleService,
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

    selectedModule,

    setPage,
    setPageSize,
    setSorting,

    setFilters,
    clearFilters,

    handleCreate,
    handleCloseDelete,
    handleConfirmDelete,

    toolbar,
  } = useModuleList({
    moduleService,
    authorizationProvider,
  });

  return (
    <>
      <ConfirmModal
        open={!!selectedModule}
        title={t('core.module.delete.title')}
        description={t('core.module.delete.description')}
        confirmLabel={t('common.button.delete')}
        cancelLabel={t('common.button.cancel')}
        loading={loading}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />

      <Page title={t('core.module.title')}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <p className={styles.description}>
                {t('core.module.description')}
              </p>
            </div>

            <CreateButton
              title={t('core.module.create.title')}
              visible={authorizationProvider.hasPermission(
                'core.module.create',
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
