import { useEffect, useState } from 'react';

import { ListFilterField } from '@core/query-state/list-filter/types';

import { InferFilterValues } from '@core/query-state/list-filter/infer-values';

import { FilterButton } from '../action-buttons/filter-button';
import { ClearFilterButton } from '../action-buttons/clear-filter-button';

import { FieldRenderer } from './field-renderer';

import * as styles from './styles.module.scss';

type Props<TFields extends readonly ListFilterField[]> = {
  fields: TFields;

  values: InferFilterValues<TFields>;

  loading?: boolean;

  onSearch(values: InferFilterValues<TFields>): void;

  onClear(): void;
};

export function ListFilter<TFields extends readonly ListFilterField[]>({
  fields,
  values,
  loading = false,
  onSearch,
  onClear,
}: Props<TFields>) {
  const [state, setState] = useState<InferFilterValues<TFields>>(values);

  /**
   * external sync (URL state)
   */
  useEffect(() => {
    setState(values);
  }, [values]);

  function updateField(name: keyof InferFilterValues<TFields>, value: string) {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSearch() {
    onSearch(
      Object.fromEntries(
        Object.entries(state).map(([key, value]) => [
          key,
          typeof value === 'string' ? value.trim() : '',
        ]),
      ) as InferFilterValues<TFields>,
    );
  }

  function handleClear() {
    setState({} as InferFilterValues<TFields>);

    onClear();
  }

  return (
    <div className={styles.container}>
      <div className={styles.fields}>
        {fields.map((field) => (
          <div key={field.name} className={field.className}>
            <FieldRenderer
              field={field}
              value={state[field.name]}
              onChange={(value) => updateField(field.name, value)}
            />
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <ClearFilterButton onClick={handleClear} disabled={loading} />

        <FilterButton onClick={handleSearch} loading={loading} />
      </div>
    </div>
  );
}
