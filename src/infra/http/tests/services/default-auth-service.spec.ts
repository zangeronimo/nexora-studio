import { DefaultAuthService } from '@infra/services/default-auth-service';
import { LoginRequest } from '@application/requests/use-cases/login-request';

describe('DefaultAuthService', () => {
  beforeEach(() => {
    process.env.API_URL = 'http://localhost:4000';
  });

  it('should perform login request', async () => {
    const request = jest.fn().mockResolvedValue({
      token: 'token-123',
    });

    const http = {
      request,
    };

    const sut = new DefaultAuthService(http as any);

    const input: LoginRequest = {
      email: 'test@test.com',
      password: '123456',
    };

    const result = await sut.login(input);

    expect(request).toHaveBeenCalledWith('http://localhost:4000/auth', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@test.com',
        password: '123456',
        grant_type: 'password',
      }),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
    });

    expect(result).toBe('token-123');
  });

  it('should call http client only once on login', async () => {
    const request = jest.fn().mockResolvedValue({
      token: 'token-123',
    });

    const http = {
      request,
    };

    const sut = new DefaultAuthService(http as any);

    await sut.login({
      email: 'a@a.com',
      password: '123',
    });

    expect(request).toHaveBeenCalledTimes(1);
  });

  it('should perform refresh request', async () => {
    const request = jest.fn().mockResolvedValue({
      token: 'new-token',
    });

    const http = {
      request,
    };

    const sut = new DefaultAuthService(http as any);

    const result = await sut.refresh();

    expect(request).toHaveBeenCalledWith('http://localhost:4000/auth', {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'refresh_token',
      }),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
    });

    expect(result).toBe('new-token');
  });
});
