import { Card } from '@presentation/base/components/card';

import { CheckedCard } from '@presentation/base/components/checked-card';

import { CancelButton } from '@presentation/base/components/action-buttons/cancel-button';

import { SaveButton } from '@presentation/base/components/action-buttons/save-button';

import { DataGridActions } from '@presentation/base/components/data-grid/actions';

import { Page } from '@presentation/base/shell/components/page';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { ICompanyService } from '@application/core/contracts/company-service';

import { useCompanyModules } from '../hooks/use-company-modules';

import * as styles from './styles.module.scss';
import { IModuleService } from '@application/core/contracts/module-service';

type Props = {
  companyService: ICompanyService;
  moduleService: IModuleService;
};

export function CoreCompanyModulesPage({
  companyService,
  moduleService,
}: Props) {
  const { t } = useTranslation();

  const {
    modules,
    loading,
    isDirty,
    selectedModules,

    handleBack,
    handleSubmit,
    handleToggleModule,
  } = useCompanyModules({
    companyService,
    moduleService,
  });

  return (
    <Page title={t('core.company.modules.title')}>
      <Card description={t('core.company.modules.description')}>
        <div className={styles.grid}>
          {modules.map((module) => {
            const checked = selectedModules.includes(module.id);

            return (
              <CheckedCard
                key={module.id}
                checked={checked}
                disabled={loading}
                onClick={() => handleToggleModule(module.id)}
              >
                <div className={styles.moduleContent}>
                  <h3>{module.name}</h3>

                  <span>
                    {module.status === 1
                      ? t('common.status.active')
                      : t('common.status.inactive')}
                  </span>
                </div>
              </CheckedCard>
            );
          })}
        </div>

        <div className={styles.actions}>
          <DataGridActions>
            <CancelButton
              title={t('common.button.cancel')}
              onClick={handleBack}
            />

            <SaveButton
              title={t('common.button.save')}
              loading={loading}
              disabled={!isDirty}
              onClick={handleSubmit}
            />
          </DataGridActions>
        </div>
      </Card>
    </Page>
  );
}
