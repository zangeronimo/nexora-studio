import { render } from '@testing-library/react';

import { Locale } from '../../../application/i18n/locale';

import { I18nProvider } from '../../i18n/hooks/i18n-provider';
import { useTranslation } from '../../i18n/hooks/use-translation';

describe('I18n React integration', () => {
  const makeLocaleResolver = (locale: Locale = null) => {
    return {
      resolve: jest.fn(() => locale),
    };
  };

  function FakeApp() {
    const { t } = useTranslation();

    return <div>{t('login_title')}</div>;
  }

  it('should translate to portuguese', () => {
    const { getByText } = render(
      <I18nProvider localeResolver={makeLocaleResolver('pt-BR')}>
        <FakeApp />
      </I18nProvider>,
    );

    expect(getByText('Entrar')).toBeInTheDocument();
  });

  it('should translate to english', () => {
    const { getByText } = render(
      <I18nProvider localeResolver={makeLocaleResolver('en-US')}>
        <FakeApp />
      </I18nProvider>,
    );

    expect(getByText('Sign in')).toBeInTheDocument();
  });
});
