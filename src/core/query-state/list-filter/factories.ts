import { TextFilterField, SelectFilterField } from './types';

export function textFilter<TName extends string>(
  name: TName,
  placeholder?: string,
): TextFilterField & { name: TName } {
  return {
    type: 'text',
    name,
    placeholder,
  };
}

export function selectFilter<TName extends string>(
  name: TName,
  options: SelectFilterField['options'],
  placeholder?: string,
): SelectFilterField & { name: TName } {
  return {
    type: 'select',
    name,
    options,
    placeholder,
  };
}
