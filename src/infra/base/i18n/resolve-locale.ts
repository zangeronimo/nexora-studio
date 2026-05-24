import { Storage } from '@application/base/contracts/storage';
import { LocaleResolver } from '@application/base/i18n/contracts/locale-resolver';
import {
  DEFAULT_LOCALE,
  isLocale,
  Locale,
} from '@application/base/i18n/locale';

export class StorageLocaleResolver implements LocaleResolver {
  constructor(private readonly storage: Storage) {}

  resolve(): Locale {
    const locale = this.storage.get<Locale>('locale');
    return isLocale(locale) ? locale : DEFAULT_LOCALE;
  }
}
