import { useParams, useNavigate } from 'react-router-dom';

import { Page } from '@presentation/base/shell/components/page';
import { Card } from '@presentation/base/components/card';
import { Input } from '@presentation/base/components/input';
import { Select } from '@presentation/base/components/select';

import { DataGridActions } from '@presentation/base/components/data-grid/actions';
import { CancelButton } from '@presentation/base/components/action-buttons/cancel-button';
import { SaveButton } from '@presentation/base/components/action-buttons/save-button';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { IUserCompanyService } from '@application/system/contracts/user-company-service';
import { status } from '@domain/base/enums/status';

import { useUserCompanyUpdateForm } from '../hooks/use-user-company-update.form';

import * as styles from './styles.module.scss';
import { Avatar } from '@presentation/base/components/avatar';

type Props = {
  userCompanyService: IUserCompanyService;
};

export function SystemUserCompanyUpdatePage({ userCompanyService }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    request,
    view,
    errors,
    hasError,
    isPristine,
    loading,
    handleNicknameChange,
    handleStatusChange,
    handleSubmit,
  } = useUserCompanyUpdateForm({
    id: id!,
    userCompanyService,
  });

  return (
    <Page title={t('system.user_company.update.title')}>
      <Card description={t('system.user_company.update.description')}>
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

          <div className={styles.form}>
            <Input
              label={t('system.user_company.fields.nickname')}
              value={request.nickname}
              error={errors.nickname}
              onChange={handleNicknameChange}
            />

            <Select
              label={t('system.user_company.fields.status')}
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
              onClick={() => navigate('/system/usercompanies')}
            />

            <SaveButton
              title={t('common.button.save')}
              disabled={loading || hasError || isPristine}
              onClick={handleSubmit}
            />
          </DataGridActions>
        </div>
      </Card>
    </Page>
  );
}
