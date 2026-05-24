import { Page } from '@presentation/shell/components/page';
import { useTranslation } from '@presentation/i18n/hooks/use-translation';

export const DashboardPage = () => {
  const { t } = useTranslation();
  return (
    <Page title={t('dashboard_title')}>
      <div>{t('dashboard_description')}</div>
    </Page>
  );
};
