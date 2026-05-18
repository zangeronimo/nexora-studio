import { AuthService } from '@application/contracts/auth/auth-service';
import { HttpClient } from '@application/contracts/auth/http-client';

export class DefaultAuthService implements AuthService {
  private readonly _baseUrl: string;
  constructor(private readonly http: HttpClient) {
    this._baseUrl = process.env.API_URL!;
  }

  async login(request: { email: string; password: string }) {
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
    return response.token;
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
    return response.token;
  }
}
