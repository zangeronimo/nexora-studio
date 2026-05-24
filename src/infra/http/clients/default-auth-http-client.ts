import { AuthHttpClient } from '@application/contracts/auth/auth-http-client';
import { AuthHttpRequestConfig } from '@application/contracts/auth/auth-http-request-config';
import { HttpClient } from '@application/contracts/auth/http-client';
import { Storage } from '@application/contracts/core/storage';
import { AuthService } from '@application/contracts/auth/auth-service';
import { HttpError } from '../errors/http-error';
import { StorageLocaleResolver } from '@infra/i18n/resolve-locale';

export class DefaultAuthHttpClient implements AuthHttpClient {
  private callback?: (authenticated: boolean) => void;
  constructor(
    private readonly httpClient: HttpClient,
    private readonly storage: Storage,
    private readonly baseUrl: string,
    private readonly authService: AuthService,
  ) {}

  get<T>(url: string, config?: AuthHttpRequestConfig): Promise<T> {
    return this.request<T>('GET', url, null, config);
  }

  post<T>(
    url: string,
    body?: unknown,
    config?: AuthHttpRequestConfig,
  ): Promise<T> {
    return this.request<T>('POST', url, body, config);
  }

  put<T>(
    url: string,
    body?: unknown,
    config?: AuthHttpRequestConfig,
  ): Promise<T> {
    return this.request<T>('PUT', url, body, config);
  }

  patch<T>(
    url: string,
    body?: unknown,
    config?: AuthHttpRequestConfig,
  ): Promise<T> {
    return this.request<T>('PATCH', url, body, config);
  }

  delete<T>(url: string, config?: AuthHttpRequestConfig): Promise<T> {
    return this.request<T>('DELETE', url, null, config);
  }

  setUnauthorizedHandler(handler: (authenticated: boolean) => void) {
    this.callback = handler;
  }

  private buildUrl(url: string, params?: Record<string, unknown>): string {
    const separator = url.startsWith('/') ? '' : '/';
    const fullUrl = new URL(`${this.baseUrl}/api${separator}${url}`);

    Object.entries(params ?? {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        fullUrl.searchParams.append(key, String(value));
      }
    });
    return fullUrl.toString();
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    url: string,
    body?: unknown,
    config?: AuthHttpRequestConfig,
  ): Promise<T> {
    const execute = async (): Promise<T> => {
      const token = this.storage.get<string>('accessToken');
      const language = new StorageLocaleResolver(this.storage);
      return this.httpClient.request<T>(this.buildUrl(url, config?.params), {
        ...config,
        method,
        body: body ? JSON.stringify(body) : undefined,
        credentials: 'include',
        headers: {
          ...config?.headers,
          ...(language && {
            'Accept-Language': language.resolve(),
          }),
          ...(body && {
            'Content-Type': 'application/json',
          }),
          Authorization: `Bearer ${token}`,
        },
      });
    };

    try {
      return await execute();
    } catch (error: unknown) {
      if (!(error instanceof HttpError) || error.statusCode !== 401) {
        throw error;
      }

      try {
        const newToken = await this.authService.refresh();
        this.storage.set('accessToken', newToken);
        return await execute();
      } catch (refreshError) {
        this.storage.remove('accessToken');
        this.callback?.(false);
        throw refreshError;
      }
    }
  }
}
