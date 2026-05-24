export type BaseFilterField<TType extends string = string> = {
  type: TType;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export type TextFilterField = BaseFilterField<'text'>;

export type SelectFilterField = BaseFilterField<'select'> & {
  options: {
    label: string;
    value: string;
  }[];
};

export type ListFilterField = TextFilterField | SelectFilterField;
