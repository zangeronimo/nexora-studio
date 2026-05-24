import { Locale } from '@application/i18n/locale';

export interface LocaleResolver {
  resolve(): Locale;
}
