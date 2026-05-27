import { FetchHttpClient } from '../clients/fetch-http-client';

describe('FetchHttpClient', () => {
  it('should perform GET request', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () =>
        JSON.stringify({
          name: 'Luciano',
        }),
    });

    const client = new FetchHttpClient();

    const response = await client.request('/users', { method: 'GET' });

    expect(response).toEqual({
      name: 'Luciano',
    });
  });

  it('should throw if response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      text: jest.fn(),
      status: 500,
      statusText: 'Internal Server Error',
    });

    const client = new FetchHttpClient();

    await expect(
      client.request('/users', { method: 'POST' }),
    ).rejects.toMatchObject({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  });

  it('should call fetch with provided config', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify({}),
    });

    const client = new FetchHttpClient();

    await client.request('/users', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer token',
      },
      body: JSON.stringify({
        name: 'Luciano',
      }),
    });

    expect(fetch).toHaveBeenCalledWith('/users', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer token',
      },
      body: JSON.stringify({
        name: 'Luciano',
      }),
    });
  });

  it('should return null when response has no content', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 204,
      text: async () => '',
    });

    const client = new FetchHttpClient();

    const response = await client.request('/users', {
      method: 'DELETE',
    });

    expect(response).toBeNull();
  });

  it('should throw if fetch fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network Error'));

    const client = new FetchHttpClient();

    await expect(
      client.request('/users', {
        method: 'GET',
      }),
    ).rejects.toThrow('Network Error');
  });

  it('should return null if response body is empty', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => '',
    });

    const client = new FetchHttpClient();

    const response = await client.request('/users', {
      method: 'GET',
    });

    expect(response).toBeNull();
  });
});
