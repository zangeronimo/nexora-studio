import { HttpClient } from '@application/contracts/http-client';
import { Storage } from '@application/contracts/storage';
import { LoginRequest } from '@application/requests/use-cases/login-request';

export class AuthService {
  private readonly _baseUrl: string;
  constructor(
    private readonly http: HttpClient,
    private readonly storage: Storage,
  ) {
    this._baseUrl = process.env.API_URL!;
  }

  async login(request: LoginRequest) {
    const body = {
      email: request.email,
      password: request.password,
      grant_type: 'password',
    };
    const response = await this.http.request<{ token: string }>(
      `${this._baseUrl}/auth`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
      },
    );
    this.storage.set('accessToken', response.token);

    setTimeout(() => {
      this.refresh();
    }, 5000);
  }

  async refresh() {
    const response = await this.http.request<{ token: string }>(
      `${this._baseUrl}/auth`,
      {
        method: 'POST',
        body: JSON.stringify({ grant_type: 'refresh_token' }),
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
      },
    );
    this.storage.set('accessToken', response.token);
  }
}
