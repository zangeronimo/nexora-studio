export interface HttpClient {
  request<T>(url: string, config: RequestInit): Promise<T>;
}
