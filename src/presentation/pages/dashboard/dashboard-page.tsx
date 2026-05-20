import { Page } from '@presentation/shell/components/page/page';
import { PageHeader } from '@presentation/shell/components/page/page-header';

export const DashboardPage = () => {
  return (
    <Page>
      <PageHeader title="Dashboard" description="System overview" />

      <div>dashboard content</div>
    </Page>
  );
};
