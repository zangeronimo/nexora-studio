import { Logout } from '@application/use-cases/logout';

it('should remove token even when logout request fails', async () => {
  const storage = {
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  };

  const authService = {
    logout: jest.fn().mockRejectedValue(new Error('network')),
  };

  const sut = new Logout(storage as any, authService as any);

  await expect(sut.execute()).rejects.toThrow('network');

  expect(storage.remove).toHaveBeenCalledWith('accessToken');
});
