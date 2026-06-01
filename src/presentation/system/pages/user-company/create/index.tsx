import { Card } from '@presentation/base/components/card';
import { Input } from '@presentation/base/components/input';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';
import { Page } from '@presentation/base/shell/components/page';

import { CancelButton } from '@presentation/base/components/action-buttons/cancel-button';
import { SaveButton } from '@presentation/base/components/action-buttons/save-button';
import { DataGridActions } from '@presentation/base/components/data-grid/actions';

import { IUserCompanyService } from '@application/system/contracts/user-company-service';

import * as styles from './styles.module.scss';
import { useUserCompanyCreateForm } from '../hooks/use-user-company-create.form';

type Props = {
  userCompanyService: IUserCompanyService;
};

export function SystemUserCompanyCreatePage({ userCompanyService }: Props) {
  const { t } = useTranslation();

  const {
    request,
    errors,
    hasError,
    isPristine,
    loading,
    handleEmailChange,
    handleSubmit,
  } = useUserCompanyCreateForm({
    userCompanyService,
  });

  return (
    <Page title={t('system.user_company.create.title')}>
      <Card description={t('system.user_company.create.description')}>
        <div className={styles.container}>
          <div className={styles.form}>
            <Input
              label={t('system.user_company.fields.email')}
              value={request.email}
              error={errors.email}
              onChange={handleEmailChange}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <DataGridActions>
            <CancelButton
              title={t('common.button.cancel')}
              onClick={() => history.back()}
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
