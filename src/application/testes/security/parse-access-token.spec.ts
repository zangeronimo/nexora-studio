import { parseAccessToken } from '@application/security/parse-access-token';

describe('parseAccessToken', () => {
  const makeToken = (payload: object) => {
    const encoded = btoa(JSON.stringify(payload));

    return `header.${encoded}.signature`;
  };

  it('should parse token payload', () => {
    const token = makeToken({
      companyId: 'company-1',
      permission: ['core.user.view'],
    });

    const result = parseAccessToken(token);

    expect(result).toEqual({
      companyId: 'company-1',
      permissions: ['core.user.view'],
    });
  });

  it('should return null when token is invalid', () => {
    const result = parseAccessToken('invalid-token');

    expect(result).toBeNull();
  });

  it('should return null when token is malformed', () => {
    const result = parseAccessToken('a.b');

    expect(result).toBeNull();
  });

  it('should return empty permissions when permission claim does not exist', () => {
    const token = makeToken({
      companyId: 'company-1',
    });

    const result = parseAccessToken(token);

    expect(result).toEqual({
      companyId: 'company-1',
      permissions: [],
    });
  });

  it('should return empty permissions when permission claim is invalid', () => {
    const token = makeToken({
      companyId: 'company-1',
      permission: 'invalid',
    });

    const result = parseAccessToken(token);

    expect(result).toEqual({
      companyId: 'company-1',
      permissions: [],
    });
  });

  it('should return null when token is null', () => {
    const result = parseAccessToken(null);

    expect(result).toBeNull();
  });
});
