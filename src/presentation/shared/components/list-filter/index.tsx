import { useEffect, useState } from 'react';

import { useTranslation } from '@core/i18n/presentation/use-translation';

import { Input } from '@presentation/shared/components/input';
import { Select } from '@presentation/shared/components/select';

import * as styles from './styles.module.scss';

import { FilterButton } from '../action-buttons/filter-button';
import { ClearFilterButton } from '../action-buttons/clear-filter-button';

import { ListFilterField, ListFilterValues } from './types';

type Props = {
  fields: ListFilterField[];
  values: ListFilterValues;
  loading?: boolean;
  onSearch: (values: ListFilterValues) => void;
  onClear: () => void;
};

export function ListFilter({
  fields,
  values,
  loading = false,
  onSearch,
  onClear,
}: Props) {
  const { t } = useTranslation();

  const [state, setState] = useState<ListFilterValues>(values);

  /**
   * sync external (URL / page state)
   */
  useEffect(() => {
    setState(values);
  }, [values]);

  function updateField(name: string, value: string) {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSearch() {
    onSearch(
      Object.fromEntries(
        Object.entries(state).map(([k, v]) => [k, v?.trim() ?? '']),
      ),
    );
  }

  function handleClear() {
    setState({});
    onClear();
  }

  return (
    <div className={styles.container}>
      <div className={styles.fields}>
        {fields.map((field) => {
          if (field.type === 'text') {
            return (
              <Input
                key={field.name}
                id={field.name}
                value={state[field.name] ?? ''}
                placeholder={field.placeholder}
                onChange={(e) => updateField(field.name, e.target.value)}
                fullWidth
              />
            );
          }

          if (field.type === 'select') {
            return (
              <Select
                key={field.name}
                value={state[field.name] ?? ''}
                placeholder={field.placeholder}
                options={field.options}
                onChange={(value) => updateField(field.name, value)}
                fullWidth
              />
            );
          }

          return null;
        })}
      </div>

      <div className={styles.actions}>
        <ClearFilterButton
          onClick={handleClear}
          disabled={loading}
          title={t('common_clear')}
        />

        <FilterButton
          onClick={handleSearch}
          loading={loading}
          title={t('common_search')}
        />
      </div>
    </div>
  );
}
