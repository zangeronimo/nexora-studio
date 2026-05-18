import { renderHook } from '@testing-library/react';
import { AuthProvider } from '@presentation/auth/auth-provider';
import { useAuth } from '@presentation/auth/use-auth';

describe('AuthProvider', () => {
  const makeStorage = (accessToken: string | null = null) => ({
    get: jest.fn((key: string) => {
      if (key === 'accessToken') return accessToken;
      return null;
    }),
    set: jest.fn(),
    remove: jest.fn(),
  });

  const makeWrapper = ({ storage = makeStorage() } = {}) => {
    return ({ children }: any) => (
      <AuthProvider storage={storage as any}>{children}</AuthProvider>
    );
  };

  it('should start authenticated when accessToken exists', () => {
    const wrapper = makeWrapper({
      storage: makeStorage('token-123'),
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper,
    });

    expect(result.current.authenticated).toBe(true);
  });

  it('should start unauthenticated when accessToken does not exist', () => {
    const wrapper = makeWrapper({
      storage: makeStorage(null),
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper,
    });

    expect(result.current.authenticated).toBe(false);
  });
});
