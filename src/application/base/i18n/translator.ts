import { Dictionary } from './contracts/dictionary';

function resolvePath(dictionary: Dictionary, path: string): unknown {
  return path
    .split('.')
    .reduce(
      (current, key) =>
        current && typeof current === 'object' ? current[key] : undefined,
      dictionary as unknown,
    );
}

export const createTranslator = (dictionary: Dictionary) => {
  return (key: string) => {
    const value = resolvePath(dictionary, key);

    return typeof value === 'string' ? value : key;
  };
};
