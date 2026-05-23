import { useEffect, useState } from 'react';

import { useTranslation } from '@core/i18n/presentation/use-translation';

import { Input } from '@presentation/shared/components/input';
import { Select } from '@presentation/shared/components/select';

import * as styles from './styles.module.scss';
import { ClearFilterButton } from '@presentation/shared/components/action-buttons/clear-filter-button';
import { FilterButton } from '@presentation/shared/components/action-buttons/filter-button';

export type CompanyFilterValues = {
  name?: string;
  status?: string;
};

type Props = {
  loading?: boolean;

  values: CompanyFilterValues;

  onSearch?: (values: CompanyFilterValues) => void;

  onClear?: () => void;
};

export function CompanyFilter({
  loading = false,

  values,

  onSearch,
  onClear,
}: Props) {
  const { t } = useTranslation();

  const [name, setName] = useState(values.name ?? '');

  const [status, setStatus] = useState(values.status ?? '');

  /**
   * External sync
   */
  useEffect(() => {
    setName(values.name ?? '');
    setStatus(values.status ?? '');
  }, [values.name, values.status]);

  function handleSearch() {
    onSearch?.({
      name: name.trim(),
      status,
    });
  }

  function handleClear() {
    setName('');
    setStatus('');

    onClear?.();
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
        <ClearFilterButton
          title={t('common_clear')}
          disabled={loading}
          onClick={handleClear}
        />

        <FilterButton
          title={t('common_search')}
          onClick={handleSearch}
          loading={loading}
        />
      </div>
    </div>
  );
}
