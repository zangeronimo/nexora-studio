import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { useTranslation } from '../../../../../core/i18n/presentation/use-translation';

import { Input } from '@presentation/shared/components/input';
import { Select } from '@presentation/shared/components/select';
import { Button } from '@presentation/shared/components/button';

import * as styles from './styles.module.scss';

type Props = {
  loading?: boolean;

  values: {
    name?: string;
    status?: string;
  };

  onChange: (params: URLSearchParams) => URLSearchParams;
};

export function CompanyFilter({ loading = false, values, onChange }: Props) {
  const { t } = useTranslation();
  const [, setSearchParams] = useSearchParams();

  const [name, setName] = useState(values.name ?? '');
  const [status, setStatus] = useState(values.status ?? '');

  // sync externo vindo da página/state
  useEffect(() => {
    setName(values.name ?? '');
    setStatus(values.status ?? '');
  }, [values.name, values.status]);

  function handleSearch() {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (name) {
        params.set('name', name);
      } else {
        params.delete('name');
      }

      if (status) {
        params.set('status', status);
      } else {
        params.delete('status');
      }

      onChange(params);
      return params;
    });
  }

  function handleClear() {
    setName('');
    setStatus('');

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.delete('name');
      params.delete('status');

      // reset natural
      params.delete('page');
      params.delete('orderBy');
      params.delete('desc');

      onChange(params);
      return params;
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Input
          id="company_filter_name"
          placeholder={t('company_filter_name_placeholder')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <Select
          id="company_filter_status"
          value={status}
          onChange={setStatus}
          placeholder={t('select.empty')}
          options={[
            {
              label: t('common_active'),
              value: '1',
            },
            {
              label: t('common_inactive'),
              value: '0',
            },
          ]}
          fullWidth
        />
      </div>

      <div className={styles.actions}>
        <Button
          variant="secondary"
          type="button"
          onClick={handleClear}
          disabled={loading}
        >
          {t('common_clear')}
        </Button>

        <Button type="button" onClick={handleSearch} loading={loading}>
          {t('common_search')}
        </Button>
      </div>
    </div>
  );
}
