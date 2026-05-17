import { renderHook } from '@testing-library/react';
import { useTranslation } from '../../presentation/use-translation';
import { I18nProvider } from '../../presentation/i18n-provider';

describe('useTranslation', () => {
  it('should return translated value via t()', () => {
    const storage = {
      get: jest.fn((key: string) => {
        if (key === 'accessToken') return 'token-123';
        if (key === 'locale') return 'pt-BR';
        return null;
      }),
      set: jest.fn(),
      remove: jest.fn(),
    };
    const wrapper = ({ children }: any) => (
      <I18nProvider storage={storage as any}>{children}</I18nProvider>
    );

    const { result } = renderHook(() => useTranslation(), { wrapper });

    expect(typeof result.current.t).toBe('function');
    expect(result.current.t('login_title')).toBeDefined();
  });
});
