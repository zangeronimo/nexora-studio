import { AuthHttpClient } from '@application/contracts/auth-http-client';
import { AuthHttpRequestConfig } from '@application/contracts/auth-http-request-config';
import { HttpClient } from '@application/contracts/http-client';
import { Storage } from '@application/contracts/storage';
import { resolveLocale } from '../../../core/i18n/domain/resolve-locale';

export class DefaultAuthHttpClient implements AuthHttpClient {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly storage: Storage,
    private readonly baseUrl: string,
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

  private buildUrl(url: string): string {
    const separator = url.startsWith('/') ? '' : '/';
    return `${this.baseUrl}${separator}${url}`;
  }

  private request<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    url: string,
    body?: unknown,
    config?: AuthHttpRequestConfig,
  ): Promise<T> {
    const token = this.storage.get<string>('accessToken');
    const language = resolveLocale(this.storage);
    return this.httpClient.request(this.buildUrl(url), {
      ...config,
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        ...config?.headers,
        ...(language && {
          'Accept-Language': language,
        }),
        ...(body && {
          'Content-Type': 'application/json',
        }),
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
