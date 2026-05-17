import { LoginRequest } from '@application/requests/use-cases/login-request';
import { LoginUser } from '@application/use-cases/login-user';

describe('LoginUser', () => {
  it('should delegate login to AuthService', async () => {
    const login = jest.fn();

    const authService = {
      login,
    };

    const sut = new LoginUser(authService as any);

    const input: LoginRequest = {
      email: 'test@test.com',
      password: '123456',
    };

    await sut.execute(input);

    expect(login).toHaveBeenCalledWith(input);
  });

  it('should call AuthService only once', async () => {
    const login = jest.fn();

    const authService = {
      login,
    };

    const sut = new LoginUser(authService as any);

    await sut.execute({
      email: 'a@a.com',
      password: '123',
    });

    expect(login).toHaveBeenCalledTimes(1);
  });
});
