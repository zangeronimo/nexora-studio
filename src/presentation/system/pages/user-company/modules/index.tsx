import { useParams, useNavigate } from 'react-router-dom';

import { Page } from '@presentation/base/shell/components/page';
import { Card } from '@presentation/base/components/card';
import { Select } from '@presentation/base/components/select';
import { DataGridActions } from '@presentation/base/components/data-grid/actions';
import { CancelButton } from '@presentation/base/components/action-buttons/cancel-button';
import { SaveButton } from '@presentation/base/components/action-buttons/save-button';

import { useUserCompanyModules } from '../hooks/use-user-company-modules';

import { IUserCompanyService } from '@application/system/contracts/user-company-service';

import * as styles from './styles.module.scss';
import { Avatar } from '@presentation/base/components/avatar';

type Props = {
  userCompanyService: IUserCompanyService;
};

export function SystemUserCompanyModulesPage({ userCompanyService }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, view, modules, handleRoleChange, handleSubmit } =
    useUserCompanyModules({
      id: id!,
      userCompanyService,
    });

  return (
    <Page title="User Modules">
      <Card>
        <div className={styles.container}>
          {view && (
            <div className={styles.userInfo}>
              <Avatar name={view.userName} avatarUrl={view.avatarUrl} />
              <div className={styles.userMain}>
                <strong>{view.userName}</strong>
                <small>{view.userEmail}</small>
              </div>

              <div className={styles.companyInfo}>{view.companyName}</div>
            </div>
          )}

          <div className={styles.modules}>
            {modules.map((m) => (
              <div key={m.module.id} className={styles.moduleRow}>
                <div className={styles.moduleName}>{m.module.name}</div>

                <Select
                  value={m.selectedRoleId ?? ''}
                  onChange={(value) => handleRoleChange(m.module.id, value)}
                  options={m.roles.map((r) => ({
                    label: r.name,
                    value: r.id,
                  }))}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <DataGridActions>
            <CancelButton
              title="Cancel"
              onClick={() => navigate('/system/usercompanies')}
            />

            <SaveButton title="Save" loading={loading} onClick={handleSubmit} />
          </DataGridActions>
        </div>
      </Card>
    </Page>
  );
}
