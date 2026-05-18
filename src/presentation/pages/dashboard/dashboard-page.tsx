import { useTranslation } from '../../../core/i18n/presentation/use-translation';

export const DashboardPage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <h1>Dashboard</h1>
      <small>{t('dashboard_small')}</small>
    </main>
  );
};
