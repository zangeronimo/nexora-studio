import React, { useMemo } from 'react';
import { I18nContext } from './i18n-context';
import { getDictionary } from '../../../application/i18n/get-dictionary';
import { createTranslator } from '@application/i18n/translator';
import { LocaleResolver } from '@application/i18n/contracts/locale-resolver';

type Props = {
  children: React.ReactNode;
  localeResolver: LocaleResolver;
};

export function I18nProvider({ children, localeResolver }: Props) {
  const t = useMemo(() => {
    const locale = localeResolver.resolve();
    const dictionary = getDictionary(locale);
    return createTranslator(dictionary);
  }, [localeResolver]);

  return <I18nContext.Provider value={{ t }}>{children}</I18nContext.Provider>;
}
