import { renderHook } from '@testing-library/react';
import { useTranslation } from '../hooks/use-translation';
import { I18nProvider } from '../hooks/i18n-provider';

describe('useTranslation', () => {
  it('should return translated value via t()', () => {
    const localeResolver = {
      resolve: jest.fn(() => 'en-US'),
    };
    const wrapper = ({ children }: any) => (
      <I18nProvider localeResolver={localeResolver as any}>
        {children}
      </I18nProvider>
    );

    const { result } = renderHook(() => useTranslation(), { wrapper });

    expect(typeof result.current.t).toBe('function');
    expect(result.current.t('login_title')).toBeDefined();
  });
});
