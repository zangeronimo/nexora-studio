import { DefaultAuthHttpClient } from '../clients/default-auth-http-client';

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

    const storage = makeStorage(locale);

    const sut = new DefaultAuthHttpClient(
      httpClient as any,
      storage as any,
      baseURL,
    );

    return {
      sut,
      request,
      storage,
    };
  };

  const expectRequest = (request: jest.Mock, url: string, config: object) => {
    expect(request).toHaveBeenCalledWith(
      `${baseURL}${url}`,
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
});
