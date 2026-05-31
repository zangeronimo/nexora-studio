import { Card } from '@presentation/base/components/card';
import { Checkbox } from '@presentation/base/components/checkbox';
import { Accordion } from '@presentation/base/components/accordion';

import { CancelButton } from '@presentation/base/components/action-buttons/cancel-button';
import { SaveButton } from '@presentation/base/components/action-buttons/save-button';

import { DataGridActions } from '@presentation/base/components/data-grid/actions';

import { Page } from '@presentation/base/shell/components/page';

import { useNavigate } from 'react-router-dom';

import { IRoleService } from '@application/system/contracts/role-service';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { useRolePermission } from '../hooks/use-role-permission';

import * as styles from './styles.module.scss';
import { ICompanyService } from '@application/core/contracts/company-service';

type Props = {
  roleService: IRoleService;
  companyService: ICompanyService;
};

export function SystemRolePermissionPage({
  roleService,
  companyService,
}: Props) {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const {
    loading,
    roleName,
    modules,
    selectedPermissions,
    isDirty,

    handlePermissionChange,
    handleSubmit,
  } = useRolePermission({
    roleService,
    companyService,
  });

  return (
    <Page title={t('system.role.permissions.title')}>
      <Card
        title={roleName}
        description={t('system.role.permissions.description')}
      >
        <div className={styles.container}>
          {modules.map((module) => (
            <Accordion key={module.id} title={module.name} defaultOpen>
              <div className={styles.resources}>
                {module.resources.map((resource) => (
                  <Accordion
                    key={`${module.id}-${resource.name}`}
                    title={resource.name}
                  >
                    <div className={styles.permissions}>
                      {resource.permissions.map((permission) => (
                        <Checkbox
                          key={permission.id}
                          checked={selectedPermissions.includes(permission.id)}
                          label={permission.label}
                          description={permission.code}
                          // eslint-disable-next-line sonarjs/no-nested-functions
                          onChange={(checked) =>
                            handlePermissionChange(permission.id, checked)
                          }
                        />
                      ))}
                    </div>
                  </Accordion>
                ))}
              </div>
            </Accordion>
          ))}
        </div>

        <div className={styles.actions}>
          <DataGridActions>
            <CancelButton
              title={t('common.button.cancel')}
              onClick={() => navigate('/system/roles')}
            />

            <SaveButton
              title={t('common.button.save')}
              disabled={!isDirty || loading}
              onClick={handleSubmit}
            />
          </DataGridActions>
        </div>
      </Card>
    </Page>
  );
}
