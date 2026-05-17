import { HttpClient } from '@application/contracts/http-client';
import { Storage } from '@application/contracts/storage';
import { UseCase } from '@application/contracts/use-cases/use-case';
import { LoginRequest } from '@application/requests/use-cases/login-request';

export class LoginUser implements UseCase<LoginRequest, void> {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly storage: Storage,
  ) {}

  async execute(input: LoginRequest) {
    const response = await this.httpClient.request<{ token: string }>(
      '/login',
      {
        method: 'POST',
        body: JSON.stringify(input),
      },
    );

    const token = response.token;
    if (!token) {
      throw new Error('Login API contract violation: missing token');
    }

    this.storage.set('accessToken', token);
  }
}
