import { HttpClient } from '@application/base/security/contracts/http-client';
import { HttpRequestConfig } from '@application/base/security/contracts/http-request-config';
import { HttpError } from '../errors/http-error';

export class FetchHttpClient implements HttpClient {
  async request<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    const result = await fetch(url, config);
    if (result.status === 204) return null as T;
    const text = await result.text();
    const body = text ? JSON.parse(text) : null;

    if (!result.ok) {
      console.error(body);
      throw new HttpError(result.status, body?.message ?? result.statusText);
    }
    return body;
  }
}
