import { Card } from '@presentation/base/components/card';
import { DataGridActions } from '@presentation/base/components/data-grid/actions';
import { Input } from '@presentation/base/components/input';
import { Select } from '@presentation/base/components/select';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';
import { Page } from '@presentation/base/shell/components/page';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as styles from './styles.module.scss';
import { CancelButton } from '@presentation/base/components/action-buttons/cancel-button';
import { SaveButton } from '@presentation/base/components/action-buttons/save-button';
import { ICompanyService } from '@application/core/contracts/company-service';
import { CreateCompanyRequest } from '@application/core/requests/company-request';
import { status } from '@domain/base/enums/status';

type Props = {
  companyService: ICompanyService;
};

type StateProps = {
  request: CreateCompanyRequest;
};

export function CoreCompanyCreatePage({ companyService }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [state, setState] = useState<StateProps>({
    request: {
      name: '',
      status: status.inactive,
    },
  });

  const handleSubmit = async () => {
    await companyService.create(state.request);

    navigate('/core/companies');
  };

  return (
    <Page title={t('core.company.create.title')}>
      <Card description={t('core.company.create.description')}>
        <div className={styles.container}>
          <div className={styles.form}>
            <Input
              label={t('core.company.fields.name')}
              maxLength={200}
              value={state.request.name}
              onChange={(e) =>
                setState((old) => ({
                  ...old,
                  request: { ...old.request, name: e.target.value },
                }))
              }
            />

            <Select
              label={t('core.company.fields.status')}
              placeholder={t('common.select.empty')}
              value={state.request.status}
              onChange={(e) =>
                setState((old) => ({
                  ...old,
                  request: {
                    ...old.request,
                    status:
                      e === status.active.toString()
                        ? status.active
                        : status.inactive,
                  },
                }))
              }
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
              onClick={() => navigate('/core/companies')}
            />

            <SaveButton
              title={t('common.button.save')}
              onClick={handleSubmit}
            />
          </DataGridActions>
        </div>
      </Card>
    </Page>
  );
}
