import { Card } from '@presentation/base/components/card';
import { DataGridActions } from '@presentation/base/components/data-grid/actions';
import { Input } from '@presentation/base/components/input';
import { Select } from '@presentation/base/components/select';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';
import { Page } from '@presentation/base/shell/components/page';
import { useNavigate } from 'react-router-dom';

import * as styles from './styles.module.scss';
import { CancelButton } from '@presentation/base/components/action-buttons/cancel-button';
import { SaveButton } from '@presentation/base/components/action-buttons/save-button';
import { IUserService } from '@application/core/contracts/user-service';
import { status } from '@domain/base/enums/status';
import { useUserCreateForm } from '../hooks/use-user-create.form';

type Props = {
  userService: IUserService;
};

export function CoreUserCreatePage({ userService }: Props) {
  const {
    errors,
    hasError,
    isPristine,
    loading,
    request,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleStatusChange,
    handleSubmit,
  } = useUserCreateForm({
    userService,
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Page title={t('core.user.create.title')}>
      <Card description={t('core.user.create.description')}>
        <div className={styles.container}>
          <div className={styles.form}>
            <Input
              label={t('core.user.fields.name')}
              maxLength={200}
              value={request.name}
              error={errors.name}
              onChange={handleNameChange}
            />
            <Input
              label={t('core.user.fields.email')}
              maxLength={200}
              value={request.email}
              error={errors.email}
              onChange={handleEmailChange}
            />
            <Input
              type="password"
              label={t('core.user.fields.password')}
              maxLength={50}
              value={request.password}
              error={errors.password}
              onChange={handlePasswordChange}
            />

            <Select
              label={t('core.user.fields.status')}
              placeholder={t('common.select.empty')}
              value={request.status}
              error={errors.status}
              onChange={handleStatusChange}
              options={[
                {
                  label: t('common.status.active'),
                  value: status.active.toString(),
                },
                {
                  label: t('common.status.inactive'),
                  value: status.inactive.toString(),
                },
              ]}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <DataGridActions>
            <CancelButton
              title={t('common.button.cancel')}
              onClick={() => navigate('/core/users')}
            />

            <SaveButton
              title={t('common.button.save')}
              disabled={hasError || isPristine || loading}
              onClick={handleSubmit}
            />
          </DataGridActions>
        </div>
      </Card>
    </Page>
  );
}
