import { DefaultAuthHttpClient } from '../clients/default-auth-http-client';

describe('DefaultAuthHttpClient', () => {
  const makeSut = () => {
    const request = jest.fn();

    const httpClient = {
      request,
    };

    const storage = {
      get: jest.fn().mockReturnValue('token-123'),
    };

    const sut = new DefaultAuthHttpClient(httpClient as any, storage as any);

    return {
      sut,
      request,
      storage,
    };
  };

  describe('GET', () => {
    it('should add authorization header', async () => {
      const { sut, request } = makeSut();

      await sut.get('/users');

      expect(request).toHaveBeenCalledWith(
        '/users',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            Authorization: 'Bearer token-123',
          }),
        }),
      );
    });

    it('should preserve existing headers', async () => {
      const { sut, request } = makeSut();

      await sut.get('/users', {
        headers: {
          'X-Tenant': 'tenant-1',
        },
      });

      expect(request).toHaveBeenCalledWith(
        '/users',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'X-Tenant': 'tenant-1',
            Authorization: 'Bearer token-123',
          }),
        }),
      );
    });
  });

  describe('POST', () => {
    it('should send POST method', async () => {
      const { sut, request } = makeSut();

      await sut.post('/users');

      expect(request).toHaveBeenCalledWith(
        '/users',
        expect.objectContaining({
          method: 'POST',
          body: undefined,
          headers: expect.objectContaining({
            Authorization: 'Bearer token-123',
          }),
        }),
      );
    });

    it('should serialize body', async () => {
      const { sut, request } = makeSut();

      await sut.post('/users', {
        name: 'Luciano',
      });

      expect(request).toHaveBeenCalledWith(
        '/users',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            name: 'Luciano',
          }),
          headers: expect.objectContaining({
            Authorization: 'Bearer token-123',
            'Content-Type': 'application/json',
          }),
        }),
      );
    });

    it('should preserve existing headers', async () => {
      const { sut, request } = makeSut();

      await sut.post(
        '/users',
        {
          name: 'Luciano',
        },
        {
          headers: {
            'X-Tenant': 'tenant-1',
          },
        },
      );

      expect(request).toHaveBeenCalledWith(
        '/users',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            name: 'Luciano',
          }),
          headers: expect.objectContaining({
            'X-Tenant': 'tenant-1',
            Authorization: 'Bearer token-123',
            'Content-Type': 'application/json',
          }),
        }),
      );
    });
  });

  describe('PUT', () => {
    it('should send PUT method', async () => {
      const { sut, request } = makeSut();

      await sut.put('/users/1', {
        name: 'Luciano',
      });

      expect(request).toHaveBeenCalledWith(
        '/users/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({
            name: 'Luciano',
          }),
          headers: expect.objectContaining({
            Authorization: 'Bearer token-123',
            'Content-Type': 'application/json',
          }),
        }),
      );
    });
  });

  describe('PATCH', () => {
    it('should send PATCH method', async () => {
      const { sut, request } = makeSut();

      await sut.patch('/users/1', {
        active: true,
      });

      expect(request).toHaveBeenCalledWith(
        '/users/1',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({
            active: true,
          }),
          headers: expect.objectContaining({
            Authorization: 'Bearer token-123',
            'Content-Type': 'application/json',
          }),
        }),
      );
    });
  });

  describe('DELETE', () => {
    it('should send DELETE method', async () => {
      const { sut, request } = makeSut();

      await sut.delete('/users/1');

      expect(request).toHaveBeenCalledWith(
        '/users/1',
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            Authorization: 'Bearer token-123',
          }),
        }),
      );
    });

    it('should preserve existing headers', async () => {
      const { sut, request } = makeSut();

      await sut.delete('/users/1', {
        headers: {
          'X-Tenant': 'tenant-1',
        },
      });

      expect(request).toHaveBeenCalledWith(
        '/users/1',
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            'X-Tenant': 'tenant-1',
            Authorization: 'Bearer token-123',
          }),
        }),
      );
    });
  });

  it('should get access token from auth storage', async () => {
    const { sut, storage } = makeSut();

    await sut.get('/users');

    expect(storage.get).toHaveBeenCalled();
  });

  it('should add locale header', async () => {
    const request = jest.fn();

    const httpClient = {
      request,
    };

    const storage = {
      get: jest.fn((key: string) => {
        if (key === 'accessToken') return 'token-123';
        if (key === 'locale') return 'pt-BR';
        return null;
      }),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const client = new DefaultAuthHttpClient(httpClient as any, storage as any);

    await client.get('/users');

    expect(request).toHaveBeenCalledWith('/users', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer token-123',
        'Accept-Language': 'pt-BR',
      },
    });
  });

  it('should fallback locale when missing', async () => {
    const request = jest.fn();

    const httpClient = { request };

    const storage = {
      get: jest.fn((key: string) => {
        if (key === 'accessToken') return 'token-123';
        if (key === 'locale') return null;
        return null;
      }),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const client = new DefaultAuthHttpClient(httpClient as any, storage as any);

    await client.get('/users');

    expect(request).toHaveBeenCalledWith('/users', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer token-123',
        'Accept-Language': 'en-US',
      },
    });
  });
});
