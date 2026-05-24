import { AuthHttpRequestConfig } from './auth-http-request-config';

export interface AuthHttpClient {
  get<T>(url: string, config?: AuthHttpRequestConfig): Promise<T>;

  post<T>(
    url: string,
    body?: unknown,
    config?: AuthHttpRequestConfig,
  ): Promise<T>;

  put<T>(
    url: string,
    body?: unknown,
    config?: AuthHttpRequestConfig,
  ): Promise<T>;

  patch<T>(
    url: string,
    body?: unknown,
    config?: AuthHttpRequestConfig,
  ): Promise<T>;

  delete<T>(url: string, config?: AuthHttpRequestConfig): Promise<T>;
}
