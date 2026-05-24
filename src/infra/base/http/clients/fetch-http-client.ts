import { HttpClient } from '@application/base/security/contracts/http-client';
import { HttpRequestConfig } from '@application/base/security/contracts/http-request-config';
import { HttpError } from '../errors/http-error';

export class FetchHttpClient implements HttpClient {
  async request<T>(url: string, config?: HttpRequestConfig): Promise<T> {
    const result = await fetch(url, config);
    if (!result.ok) {
      throw new HttpError(result.status, result.statusText);
    }
    if (result.status === 204) return null;
    const text = await result.text();
    return text ? JSON.parse(text) : null;
  }
}
