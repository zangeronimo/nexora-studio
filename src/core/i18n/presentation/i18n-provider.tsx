import React, { useMemo } from 'react';
import { I18nContext } from './i18n-context';
import { Storage } from '@application/contracts/storage';

import { getDictionary } from '../domain/get-dictionary';
import { createTranslator } from '../domain/translator';
import { resolveLocale } from '../domain/resolve-locale';

type Props = {
  children: React.ReactNode;
  storage: Storage;
};

export function I18nProvider({ children, storage }: Props) {
  const t = useMemo(() => {
    const locale = resolveLocale(storage);
    const dictionary = getDictionary(locale);

    return createTranslator(dictionary);
  }, [storage]);

  return <I18nContext.Provider value={{ t }}>{children}</I18nContext.Provider>;
}
