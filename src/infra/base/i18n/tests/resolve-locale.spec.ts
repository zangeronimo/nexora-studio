import { Storage } from '@application/base/contracts/storage';
import { StorageLocaleResolver } from '@infra/base/i18n/resolve-locale';

describe('StorageLocaleResolve', () => {
  it('should return stored locale when exists', () => {
    const storage: Storage = {
      get: jest.fn().mockReturnValue('pt-BR'),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const result = new StorageLocaleResolver(storage);

    expect(result.resolve()).toBe('pt-BR');
  });

  it('should fallback to en-US when no locale is stored', () => {
    const storage: Storage = {
      get: jest.fn().mockReturnValue(null),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const result = new StorageLocaleResolver(storage);

    expect(result.resolve()).toBe('en-US');
  });

  it('should fallback to default when storage returns invalid locale', () => {
    const storage = {
      get: jest.fn().mockReturnValue('fr-FR'),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const result = new StorageLocaleResolver(storage as any);

    expect(result.resolve()).toBe('en-US');
  });
});
