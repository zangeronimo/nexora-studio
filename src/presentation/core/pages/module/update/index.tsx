import { Card } from '@presentation/base/components/card';
import { Input } from '@presentation/base/components/input';
import { Select } from '@presentation/base/components/select';
import { Page } from '@presentation/base/shell/components/page';
import { DataGridActions } from '@presentation/base/components/data-grid/actions';
import { DataGridAction } from '@presentation/base/components/data-grid/actions/action';
import { CreateButton } from '@presentation/base/components/action-buttons/create-button';
import { CancelButton } from '@presentation/base/components/action-buttons/cancel-button';
import { SaveButton } from '@presentation/base/components/action-buttons/save-button';
import { ConfirmModal } from '@presentation/base/components/confirm-modal';

import { useNavigate } from 'react-router-dom';

import { IModuleService } from '@application/core/contracts/module-service';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { PermissionFormModal } from './components/permission-form-modal';
import { useModuleUpdateForm } from '../hooks/use-module-update.form';

import * as styles from './styles.module.scss';

type Props = {
  moduleService: IModuleService;
};

export function CoreModuleUpdatePage({ moduleService }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    request,
    errors,
    loading,
    isDirty,

    selectedPermission,
    openPermissionModal,
    openDeletePermissionModal,

    handleSubmit,
    handleNameChange,
    handleStatusChange,

    handleCreatePermission,
    handleEditPermission,
    handleDeletePermission,

    handleSavePermission,
    handleConfirmDeletePermission,

    setOpenPermissionModal,
    setOpenDeletePermissionModal,
    setSelectedPermission,
  } = useModuleUpdateForm({ moduleService });

  if (!request) return null;

  const grouped = request.permissions.reduce<Record<string, any[]>>(
    (acc, permission) => {
      const key = permission.resource;

      if (!acc[key]) acc[key] = [];

      acc[key].push(permission);

      return acc;
    },
    {},
  );

  return (
    <>
      <PermissionFormModal
        open={openPermissionModal}
        permission={selectedPermission}
        onClose={() => {
          setSelectedPermission(null);
          setOpenPermissionModal(false);
        }}
        onSave={handleSavePermission}
      />

      <ConfirmModal
        open={openDeletePermissionModal}
        title={t('core.permission.delete.title')}
        description={t('core.permission.delete.description')}
        confirmLabel={t('common.button.delete')}
        cancelLabel={t('common.button.cancel')}
        onClose={() => {
          setSelectedPermission(null);
          setOpenDeletePermissionModal(false);
        }}
        onConfirm={handleConfirmDeletePermission}
      />

      <Page title={t('core.module.update.title')}>
        <Card>
          <div className={styles.container}>
            <div className={styles.form}>
              <Input
                label={t('core.module.fields.name')}
                value={request.name}
                error={errors.name}
                onChange={handleNameChange}
              />

              <Select
                label={t('core.module.fields.status')}
                value={request.status}
                error={errors.status}
                onChange={handleStatusChange}
                options={[
                  { label: t('common.status.active'), value: '1' },
                  { label: t('common.status.inactive'), value: '0' },
                ]}
              />
            </div>

            <div className={styles.permissionsHeader}>
              <h3>{t('core.module.permissions.title')}</h3>

              <CreateButton
                title={t('core.module.permissions.create.title')}
                onClick={handleCreatePermission}
              />
            </div>

            <div className={styles.permissions}>
              {Object.entries(grouped).map(([resource, permissions]) => (
                <div key={resource} className={styles.resourceGroup}>
                  <h4 className={styles.resourceTitle}>{resource}</h4>

                  <div className={styles.permissionGrid}>
                    {permissions.map((p) => (
                      <div
                        key={
                          p.id ?? `${p.module}.${p.resource}.${p.permission}`
                        }
                        className={styles.permissionCard}
                      >
                        <div className={styles.permissionHeader}>
                          <span>{p.permission}</span>
                          <span
                            className={
                              p.status === 1 ? styles.active : styles.inactive
                            }
                          >
                            {p.status === 1 ? 'Active' : 'Inactive'}
                          </span>
                        </div>

                        <div className={styles.permissionBody}>
                          <small>{p.label}</small>
                          <small className={styles.code}>
                            {p.module}.{p.resource}.{p.permission}
                          </small>
                        </div>

                        <div className={styles.permissionFooter}>
                          <DataGridActions>
                            <DataGridAction
                              type="edit"
                              label={t('common.button.edit')}
                              onClick={() => handleEditPermission(p)}
                            />
                            <DataGridAction
                              type="delete"
                              label={t('common.button.delete')}
                              onClick={() => handleDeletePermission(p)}
                            />
                          </DataGridActions>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              <DataGridActions>
                <CancelButton
                  title={t('common.button.cancel')}
                  onClick={() => navigate('/core/modules')}
                />

                <SaveButton
                  title={t('common.button.save')}
                  disabled={!isDirty || loading}
                  onClick={handleSubmit}
                />
              </DataGridActions>
            </div>
          </div>
        </Card>
      </Page>
    </>
  );
}
