import { DefaultAuthHttpClient } from '../clients/default-auth-http-client';
import { LocalStorage } from '../clients/local-storage';
import { HttpError } from '../errors/http-error';

describe('DefaultAuthHttpClient', () => {
  const baseURL = 'http://localhost:4000';

  const makeStorage = (locale: string | null = 'en-US') => ({
    get: jest.fn((key: string) => {
      if (key === 'accessToken') return 'token-123';
      if (key === 'locale') return locale;
      return null;
    }),
    set: jest.fn(),
    remove: jest.fn(),
  });

  const makeSut = (locale?: string | null) => {
    const request = jest.fn();

    const httpClient = {
      request,
    };

    const authService = {
      login: jest.fn(),
      refresh: jest.fn(),
      logout: jest.fn(),
    };

    const storage = makeStorage(locale);

    const sut = new DefaultAuthHttpClient(
      httpClient as any,
      storage as any,
      baseURL,
      authService,
    );

    return {
      sut,
      request,
      storage,
    };
  };

  const expectRequest = (request: jest.Mock, url: string, config: object) => {
    expect(request).toHaveBeenCalledWith(
      `${baseURL}/api${url}`,
      expect.objectContaining(config),
    );
  };

  describe('GET', () => {
    it('should add authorization header', async () => {
      const { sut, request } = makeSut();

      await sut.get('/users');

      expectRequest(request, '/users', {
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer token-123',
        }),
      });
    });

    it('should preserve existing headers', async () => {
      const { sut, request } = makeSut();

      await sut.get('/users', {
        headers: {
          'X-Tenant': 'tenant-1',
        },
      });

      expectRequest(request, '/users', {
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer token-123',
          'X-Tenant': 'tenant-1',
        }),
      });
    });
  });

  describe('POST', () => {
    it('should serialize body', async () => {
      const { sut, request } = makeSut();

      await sut.post('/users', {
        name: 'Luciano',
      });

      expectRequest(request, '/users', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Luciano',
        }),
        headers: expect.objectContaining({
          Authorization: 'Bearer token-123',
          'Content-Type': 'application/json',
        }),
      });
    });
  });

  describe('Locale', () => {
    it('should add locale header', async () => {
      const { sut, request } = makeSut('pt-BR');

      await sut.get('/users');

      expectRequest(request, '/users', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer token-123',
          'Accept-Language': 'pt-BR',
        },
      });
    });

    it('should fallback locale when missing', async () => {
      const { sut, request } = makeSut(null);

      await sut.get('/users');

      expectRequest(request, '/users', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer token-123',
          'Accept-Language': 'en-US',
        },
      });
    });
  });

  describe('RefreshTokenTests', () => {
    it('should retry request after 401 when refresh succeeds', async () => {
      const request = jest
        .fn()
        .mockRejectedValueOnce(new HttpError(401, 'Unauthorized'))
        .mockResolvedValueOnce({ data: 'ok' });

      const refresh = jest.fn().mockResolvedValue('new-token');

      const authService = {
        login: jest.fn(),
        refresh,
      } as any;

      const storage = makeStorage('pt-BR');

      const httpClient = new DefaultAuthHttpClient(
        { request } as any,
        storage as LocalStorage,
        baseURL,
        authService,
      );

      const result = await httpClient.get('/test', {});

      expect(refresh).toHaveBeenCalled();
      expect(request).toHaveBeenCalledTimes(2);
      expect(result).toEqual({ data: 'ok' });
    });

    it('should logout when refresh fails after 401', async () => {
      const request = jest
        .fn()
        .mockRejectedValueOnce(new HttpError(401, 'Unauthorized'));

      const refresh = jest.fn().mockRejectedValue(new Error('refresh failed'));

      const authService = {
        login: jest.fn(),
        refresh,
      } as any;

      const logout = jest.fn();

      const storage = makeStorage('pt-BR');

      const httpClient = new DefaultAuthHttpClient(
        { request } as any,
        storage as LocalStorage,
        baseURL,
        authService,
      );
      httpClient.setUnauthorizedHandler(logout);
      await expect(httpClient.get('/test', {})).rejects.toThrow();

      expect(logout).toHaveBeenCalled();
    });

    it('should not retry on non-401 errors', async () => {
      const request = jest
        .fn()
        .mockRejectedValue(new HttpError(500, 'Server error'));

      const refresh = jest.fn();

      const authService = {
        login: jest.fn(),
        refresh,
      } as any;

      const storage = makeStorage('pt-BR');

      const httpClient = new DefaultAuthHttpClient(
        { request } as any,
        storage as LocalStorage,
        baseURL,
        authService,
      );

      await expect(httpClient.get('/test', {})).rejects.toThrow();

      expect(refresh).not.toHaveBeenCalled();
    });
  });
});
