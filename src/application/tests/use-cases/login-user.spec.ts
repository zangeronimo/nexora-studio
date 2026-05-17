import { LoginUser } from '@application/use-cases/login-user';

describe('LoginUser', () => {
  it('should authenticate and store access token', async () => {
    const httpClient = {
      request: jest.fn().mockResolvedValue({
        token: 'token-123',
      }),
    };

    const storage = {
      set: jest.fn(),
      get: jest.fn(),
      remove: jest.fn(),
    };

    const sut = new LoginUser(httpClient as any, storage as any);

    await sut.execute({
      email: 'test@test.com',
      password: '123456',
    });

    expect(httpClient.request).toHaveBeenCalledWith('/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@test.com',
        password: '123456',
      }),
    });

    expect(storage.set).toHaveBeenCalledWith('accessToken', 'token-123');
  });

  it('should throw if response does not contain token', async () => {
    const httpClient = {
      request: jest.fn().mockResolvedValue({}),
    };

    const storage = {
      set: jest.fn(),
      get: jest.fn(),
      remove: jest.fn(),
    };

    const sut = new LoginUser(httpClient as any, storage as any);

    await expect(
      sut.execute({
        email: 'test@test.com',
        password: '123456',
      }),
    ).rejects.toThrow('Login API contract violation: missing token');

    expect(storage.set).not.toHaveBeenCalled();
  });

  it('should propagate http client errors', async () => {
    const httpClient = {
      request: jest.fn().mockRejectedValue(new Error('Network error')),
    };

    const storage = {
      set: jest.fn(),
      get: jest.fn(),
      remove: jest.fn(),
    };

    const sut = new LoginUser(httpClient as any, storage as any);

    await expect(
      sut.execute({
        email: 'test@test.com',
        password: '123456',
      }),
    ).rejects.toThrow('Network error');

    expect(storage.set).not.toHaveBeenCalled();
  });

  it('should fail if storage throws', async () => {
    const httpClient = {
      request: jest.fn().mockResolvedValue({
        token: 'token-123',
      }),
    };

    const storage = {
      set: jest.fn().mockImplementation(() => {
        throw new Error('Storage failed');
      }),
      get: jest.fn(),
      remove: jest.fn(),
    };

    const sut = new LoginUser(httpClient as any, storage as any);

    await expect(
      sut.execute({
        email: 'test@test.com',
        password: '123456',
      }),
    ).rejects.toThrow('Storage failed');
  });
});
