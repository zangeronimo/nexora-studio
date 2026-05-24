import { Dictionary } from './contracts/dictionary';
import enUS from '@application/base/i18n/dictionaries/en-US';
import ptBR from '@application/base/i18n/dictionaries/pt-BR';
import { DEFAULT_LOCALE, Locale } from './locale';

const dictionaries = {
  'en-US': enUS,
  'pt-BR': ptBR,
};

export const getDictionary = (locale: Locale): Dictionary => {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
};
