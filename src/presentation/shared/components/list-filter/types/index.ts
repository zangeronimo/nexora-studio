type TextFilterField = {
  type: 'text';
  name: string;
  placeholder?: string;
};

type SelectFilterField = {
  type: 'select';
  name: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
};

export type ListFilterField = TextFilterField | SelectFilterField;

export type ListFilterValues = Record<string, string | undefined>;
