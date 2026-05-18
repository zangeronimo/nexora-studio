import { Storage } from '@application/contracts/core/storage';
import { DEFAULT_LOCALE, isLocale, Locale } from './locale';

export const resolveLocale = (storage: Storage): Locale => {
  const locale = storage.get<Locale>('locale');
  return isLocale(locale) ? locale : DEFAULT_LOCALE;
};
