import { Locale } from '@application/base/i18n/locale';
import { createContext } from 'react';

export type I18nContextValue = {
  t: (key: string, params?: Record<string, unknown>) => string;
  changeLanguage: (locale: Locale) => void;
  current: Locale;
};

export const I18nContext = createContext<I18nContextValue | null>(null);
