import { useEffect, useState } from 'react';

import { status } from '@domain/base/enums/status';

import { Modal } from '@presentation/base/components/modal';
import { Input } from '@presentation/base/components/input';
import { Select } from '@presentation/base/components/select';
import { SaveButton } from '@presentation/base/components/action-buttons/save-button';
import { CancelButton } from '@presentation/base/components/action-buttons/cancel-button';
import { DataGridActions } from '@presentation/base/components/data-grid/actions';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import * as styles from './styles.module.scss';
import { PermissionForm } from '../../types/permission-form';

type Props = {
  open: boolean;
  permission: PermissionForm | null;
  onClose: () => void;
  onSave: (permission: PermissionForm) => void;
};

export function PermissionFormModal({
  open,
  permission,
  onClose,
  onSave,
}: Props) {
  const { t } = useTranslation();

  const [request, setRequest] = useState<PermissionForm>({
    module: '',
    resource: '',
    permission: '',
    label: '',
    status: status.active,
  });

  useEffect(() => {
    if (!open) return;

    if (!permission) {
      setRequest({
        module: '',
        resource: '',
        permission: '',
        label: '',
        status: status.active,
      });
      return;
    }

    setRequest(permission);
  }, [open, permission]);

  const handleSave = () => {
    onSave(request);
  };

  return (
    <Modal
      open={open}
      title={
        permission
          ? t('core.module.permissions.update.title')
          : t('core.module.permissions.create.title')
      }
      onClose={onClose}
    >
      <div className={styles.form}>
        <Input
          label={t('core.module.permissions.fields.module')}
          value={request.module}
          onChange={(value) => setRequest((old) => ({ ...old, module: value }))}
        />

        <Input
          label={t('core.module.permissions.fields.resource')}
          value={request.resource}
          onChange={(value) =>
            setRequest((old) => ({ ...old, resource: value }))
          }
        />

        <Input
          label={t('core.module.permissions.fields.permission')}
          value={request.permission}
          onChange={(value) =>
            setRequest((old) => ({ ...old, permission: value }))
          }
        />

        <Input
          label={t('core.module.permissions.fields.label')}
          value={request.label}
          onChange={(value) => setRequest((old) => ({ ...old, label: value }))}
        />

        <Select
          label={t('core.module.permissions.fields.status')}
          value={request.status.toString()}
          options={[
            { label: t('common.status.active'), value: '1' },
            { label: t('common.status.inactive'), value: '0' },
          ]}
          onChange={(value) =>
            setRequest((old) => ({
              ...old,
              status: Number(value),
            }))
          }
        />
      </div>

      <div className={styles.actions}>
        <DataGridActions>
          <CancelButton title={t('common.button.cancel')} onClick={onClose} />
          <SaveButton title={t('common.button.save')} onClick={handleSave} />
        </DataGridActions>
      </div>
    </Modal>
  );
}
