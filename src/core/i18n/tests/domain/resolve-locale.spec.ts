import { Storage } from '@application/contracts/storage';
import { resolveLocale } from '../../domain/resolve-locale';

describe('resolveLocale', () => {
  it('should return stored locale when exists', () => {
    const storage: Storage = {
      get: jest.fn().mockReturnValue('pt-BR'),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const result = resolveLocale(storage);

    expect(result).toBe('pt-BR');
  });

  it('should fallback to en-US when no locale is stored', () => {
    const storage: Storage = {
      get: jest.fn().mockReturnValue(null),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const result = resolveLocale(storage);

    expect(result).toBe('en-US');
  });

  it('should fallback to default when storage returns invalid locale', () => {
    const storage = {
      get: jest.fn().mockReturnValue('fr-FR'),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const result = resolveLocale(storage as any);

    expect(result).toBe('en-US');
  });
});
