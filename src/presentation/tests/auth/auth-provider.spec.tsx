import { act, renderHook } from '@testing-library/react';
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

  const makeAuthService = () => ({
    login: jest.fn(),
    refresh: jest.fn(),
  });

  const makeWrapper = ({
    storage = makeStorage(),
    authService = makeAuthService(),
  } = {}) => {
    return ({ children }: any) => (
      <AuthProvider storage={storage as any} authService={authService as any}>
        {children}
      </AuthProvider>
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

  it('should login user and persist token', async () => {
    const storage = makeStorage();

    const authService = {
      login: jest.fn().mockResolvedValue('token-123'),
      refresh: jest.fn(),
    };

    const wrapper = makeWrapper({
      storage,
      authService,
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper,
    });

    await act(async () => {
      await result.current.login({
        email: 'test@test.com',
        password: '123456',
      });
    });

    expect(authService.login).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: '123456',
    });

    expect(storage.set).toHaveBeenCalledWith('accessToken', 'token-123');

    expect(result.current.authenticated).toBe(true);
  });

  it('should logout user', () => {
    const storage = makeStorage('token-123');

    const wrapper = makeWrapper({
      storage,
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper,
    });

    act(() => {
      result.current.logout();
    });

    expect(storage.remove).toHaveBeenCalledWith('accessToken');
    expect(result.current.authenticated).toBe(false);
  });

  it('should logout if login returns no token', async () => {
    const storage = makeStorage();

    const authService = {
      login: jest.fn().mockResolvedValue(null),
      refresh: jest.fn(),
    };

    const wrapper = makeWrapper({
      storage,
      authService,
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper,
    });

    await act(async () => {
      await result.current.login({
        email: 'test@test.com',
        password: '123456',
      });
    });

    expect(storage.remove).toHaveBeenCalledWith('accessToken');
    expect(result.current.authenticated).toBe(false);
  });
});
