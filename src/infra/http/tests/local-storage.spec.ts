import { LocalStorage } from '../clients/local-storage';

describe('LocalStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should save value in localStorage', () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');

    const storage = new LocalStorage();

    storage.set('accessToken', {
      token: '123',
    });

    expect(setItem).toHaveBeenCalledWith(
      'accessToken',
      JSON.stringify({
        token: '123',
      }),
    );
  });

  it('should return parsed value from localStorage', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(
      JSON.stringify({
        token: '123',
      }),
    );

    const storage = new LocalStorage();

    const result = storage.get<{ token: string }>('accessToken');

    expect(result).toEqual({
      token: '123',
    });
  });

  it('should return null if localStorage key does not exist', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    const storage = new LocalStorage();

    const result = storage.get('accessToken');

    expect(result).toBeNull();
  });

  it('should remove value from localStorage', () => {
    const removeItem = jest.spyOn(Storage.prototype, 'removeItem');

    const storage = new LocalStorage();

    storage.remove('accessToken');

    expect(removeItem).toHaveBeenCalledWith('accessToken');
  });

  it('should store primitive values', () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');

    const storage = new LocalStorage();

    storage.set('theme', 'dark');

    expect(setItem).toHaveBeenCalledWith('theme', JSON.stringify('dark'));
  });

  it('should return primitive values', () => {
    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue(JSON.stringify('dark'));

    const storage = new LocalStorage();

    const result = storage.get<string>('theme');

    expect(result).toBe('dark');
  });

  it('should save falsy values in localStorage', () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');

    const storage = new LocalStorage();

    storage.set('bool', false);
    storage.set('zero', 0);
    storage.set('empty', '');
    storage.set('null', null);

    expect(setItem).toHaveBeenCalledWith('bool', 'false');
    expect(setItem).toHaveBeenCalledWith('zero', '0');
    expect(setItem).toHaveBeenCalledWith('empty', '""');
    expect(setItem).toHaveBeenCalledWith('null', 'null');
  });
});
