import { Storage } from '@application/contracts/core/storage';
import { JwtAuthorizationProvider } from '@infra/providers/jwt-authorization-provider';

describe('JwtAuthorizationProvider', () => {
  const makeStorage = (accessToken: string | null = null) => ({
    get: jest.fn((key: string) => {
      if (key === 'accessToken') return accessToken;
      return null;
    }),
    set: jest.fn(),
    remove: jest.fn(),
  });

  const makeToken = (permissions: string[]) => {
    const payload = {
      companyId: 'company-1',
      permission: permissions,
    };
    const encode = (value: unknown) =>
      btoa(JSON.stringify(value))
        .replaceAll('+', '-')
        .replaceAll('/', '_')
        .replaceAll('=', '');

    return [
      encode({
        alg: 'HS256',
        typ: 'JWT',
      }),
      encode(payload),
      'signature',
    ].join('.');
  };

  it('should return false when token does not exist', () => {
    const storage = makeStorage(null);
    const sut = new JwtAuthorizationProvider(storage as Storage);
    expect(sut.hasPermission('core.user.view')).toBe(false);
  });

  it('should return false when token is invalid', () => {
    const storage = makeStorage('invalid-token');
    const sut = new JwtAuthorizationProvider(storage as Storage);
    expect(sut.hasPermission('core.user.view')).toBe(false);
  });

  it('should return true when user has permission', () => {
    const token = makeToken(['core.user.view', 'core.user.create']);
    const storage = makeStorage(token);
    const sut = new JwtAuthorizationProvider(storage as Storage);

    expect(sut.hasPermission('core.user.view')).toBe(true);
  });

  it('should return false when user does not have permission', () => {
    const token = makeToken(['core.user.create']);
    const storage = makeStorage(token);
    const sut = new JwtAuthorizationProvider(storage as Storage);

    expect(sut.hasPermission('core.user.view')).toBe(false);
  });

  it('should return true when user has some permission', () => {
    const token = makeToken(['culinary.recipe.view']);
    const storage = makeStorage(token);
    const sut = new JwtAuthorizationProvider(storage as Storage);

    expect(
      sut.hasSomePermission(['culinary.recipe.view', 'culinary.category.view']),
    ).toBe(true);
  });

  it('should return false when user has none of permissions', () => {
    const token = makeToken(['core.user.view']);
    const storage = makeStorage(token);
    const sut = new JwtAuthorizationProvider(storage as Storage);

    expect(
      sut.hasSomePermission(['culinary.recipe.view', 'culinary.category.view']),
    ).toBe(false);
  });
});
