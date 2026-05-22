import { useEffect, useMemo, useState } from 'react';

import { CompanyService } from '@application/contracts/core/company-service';

import { GetCompaniesRequest } from '@application/requests/core/company-request';

import { PaginatedResponse } from '@application/response/paginated-response';

import { Company } from '@domain/entities/core/company';

import { useTranslation } from '../../../../core/i18n/presentation/use-translation';

import { Page } from '@presentation/shell/components/page';

import { Card } from '@presentation/shared/components/card';

import { Button } from '@presentation/shared/components/button';

import { Table, TableColumn } from '@presentation/shared/components/table';

import * as styles from './styles.module.scss';

type Props = {
  companyService: CompanyService;
};

export const CoreCompanyPage = ({ companyService }: Props) => {
  const { t } = useTranslation();

  const [companies, setCompanies] = useState<PaginatedResponse<Company> | null>(
    null,
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = new GetCompaniesRequest(1, 10, 'Name', false);

    setLoading(true);

    companyService
      .getAll(request)
      .then((result: PaginatedResponse<Company>) => {
        setCompanies(result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [companyService]);

  const columns = useMemo<TableColumn<Company>[]>(
    () => [
      {
        key: 'name',
        header: t('company_name'),
      },
      {
        key: 'status',
        header: t('company_status'),

        width: '160px',

        render: (company) => (
          <span
            className={
              company.status === 1 ? styles.activeStatus : styles.disabledStatus
            }
          >
            {company.status === 1 ? t('common_active') : t('common_disabled')}
          </span>
        ),
      },
      {
        key: 'createdAt',
        header: t('company_created_at'),

        width: '180px',

        render: (company) => new Date(company.createdAt).toLocaleDateString(),
      },
      {
        key: 'actions',
        header: '',

        width: '120px',

        align: 'right',

        render: () => <Button size="sm">{t('common_edit')}</Button>,
      },
    ],
    [t],
  );

  return (
    <Page title={t('core_company_title')}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{t('core_company_title')}</h2>

            <p className={styles.description}>
              {t('core_company_description')}
            </p>
          </div>

          <Button>{t('core_company_create')}</Button>
        </div>

        <Card>
          <Table
            columns={columns}
            rows={companies?.items ?? []}
            loading={loading}
            emptyMessage={t('common_no_data_found')}
            rowKey={(company) => company.id}
          />
        </Card>
      </div>
    </Page>
  );
};
