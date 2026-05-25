import { render } from '@testing-library/react';

import { I18nProvider } from '../hooks/i18n-provider';
import { useTranslation } from '../hooks/use-translation';
import { Locale } from '@application/base/i18n/locale';

describe('I18n React integration', () => {
  const makeLocaleResolver = (locale: Locale = null) => {
    return {
      resolve: jest.fn(() => locale),
    };
  };

  function FakeApp() {
    const { t } = useTranslation();

    return <div>{t('login.title')}</div>;
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
