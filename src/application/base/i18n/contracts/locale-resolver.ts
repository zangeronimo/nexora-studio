import { Locale } from '@application/base/i18n/locale';

export interface LocaleResolver {
  resolve(): Locale;
}
