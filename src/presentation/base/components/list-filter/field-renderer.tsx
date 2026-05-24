import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { ListFilterField } from '@presentation/base/query-state/list-filter/types';

import { Input } from '@presentation/base/components/input';
import { Select } from '@presentation/base/components/select';

type Props = {
  field: ListFilterField;

  value?: string;

  onChange(value: string): void;
};

export function FieldRenderer({ field, value, onChange }: Props) {
  const { t } = useTranslation();

  if (field.type === 'text') {
    return (
      <Input
        id={field.name}
        value={value ?? ''}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
        disabled={field.disabled}
        fullWidth
      />
    );
  }

  if (field.type === 'select') {
    return (
      <Select
        id={field.name}
        value={value ?? ''}
        placeholder={field.placeholder ?? t('select_empty')}
        options={field.options}
        onChange={onChange}
        disabled={field.disabled}
        fullWidth
      />
    );
  }

  return null;
}
