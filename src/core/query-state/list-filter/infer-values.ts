export type InferFilterValues<TFields extends readonly { name: string }[]> = {
  [K in TFields[number]['name']]?: string;
};
