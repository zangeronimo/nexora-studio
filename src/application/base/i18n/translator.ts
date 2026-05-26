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

function interpolate(text: string, params?: Record<string, unknown>): string {
  if (!params) {
    return text;
  }

  return Object.entries(params).reduce(
    (current, [key, value]) => current.replaceAll(`{${key}}`, String(value)),
    text,
  );
}

export const createTranslator = (dictionary: Dictionary) => {
  return (key: string, params?: Record<string, unknown>) => {
    const value = resolvePath(dictionary, key);

    if (typeof value !== 'string') {
      return key;
    }

    return interpolate(value, params);
  };
};
