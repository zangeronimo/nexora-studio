import { UserProfileService } from '@application/contracts/core/user-profile-service';
import { AuthContext } from '@presentation/auth/auth-context';
import { AuthSessionProvider } from '@presentation/session/auth-session-provider';
import { useAuthSession } from '@presentation/session/use-auth-session';
import { renderHook, waitFor } from '@testing-library/react';

describe('AuthSessionProvider', () => {
  it('should load session when authenticated', async () => {
    const get = jest.fn().mockResolvedValue({
      user: {
        id: '1',
        name: 'Luciano',
        email: 'luciano@test.com',
        createdAt: '',
        updatedAt: '',
      },
      userCompany: {
        id: '10',
        userId: '1',
        companyId: '99',
        nickName: 'Luciano',
        avatarUrl: null,
        status: 1,
        lastAccessedAt: '',
        createdAt: '',
        updatedAt: '',
      },
    });

    const service = {
      get,
    };

    const wrapper = ({ children }: any) => (
      <AuthContext.Provider
        value={{
          authenticated: true,
          setAuthenticated: jest.fn(),
        }}
      >
        <AuthSessionProvider service={service as UserProfileService}>
          {children}
        </AuthSessionProvider>
      </AuthContext.Provider>
    );

    renderHook(() => useAuthSession(), {
      wrapper,
    });

    await waitFor(() => {
      expect(get).toHaveBeenCalled();
    });
  });

  it('should expose session', async () => {
    const session = {
      user: {
        id: '1',
        name: 'Luciano',
        email: 'luciano@test.com',
        createdAt: '',
        updatedAt: '',
      },
      userCompany: {
        id: '10',
        userId: '1',
        companyId: '99',
        nickName: 'Luciano',
        avatarUrl: null,
        status: 1,
        lastAccessedAt: '',
        createdAt: '',
        updatedAt: '',
      },
    };

    const service = {
      get: jest.fn().mockResolvedValue(session),
    };

    const wrapper = ({ children }: any) => (
      <AuthContext.Provider
        value={{
          authenticated: true,
          setAuthenticated: jest.fn(),
        }}
      >
        <AuthSessionProvider service={service as any}>
          {children}
        </AuthSessionProvider>
      </AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuthSession(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.session).toEqual(session);
    });
  });

  it('should not load session when unauthenticated', async () => {
    const service = {
      get: jest.fn(),
    };

    const wrapper = ({ children }: any) => (
      <AuthContext.Provider
        value={{
          authenticated: false,
          setAuthenticated: jest.fn(),
        }}
      >
        <AuthSessionProvider service={service as any}>
          {children}
        </AuthSessionProvider>
      </AuthContext.Provider>
    );

    renderHook(() => useAuthSession(), {
      wrapper,
    });

    await waitFor(() => {
      expect(service.get).not.toHaveBeenCalled();
    });
  });
});
