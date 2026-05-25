import { Page } from '@presentation/base/shell/components/page';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

export const DashboardPage = () => {
  const { t } = useTranslation();
  return (
    <Page title={t('dashboard.title')}>
      <div>{t('dashboard.description')}</div>
    </Page>
  );
};
