import { Dictionary } from './contracts/dictionary';

export const createTranslator = (dictionary: Dictionary) => {
  return (key: string) => dictionary[key] ?? key;
};
