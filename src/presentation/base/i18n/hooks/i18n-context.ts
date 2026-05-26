import { createContext } from 'react';

export type I18nContextValue = {
  t: (key: string, params?: Record<string, unknown>) => string;
};

export const I18nContext = createContext<I18nContextValue | null>(null);
