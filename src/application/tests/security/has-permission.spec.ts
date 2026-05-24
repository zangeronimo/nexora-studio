import { hasPermission } from '@application/security/has-permission';

describe('hasPermission', () => {
  const payload = {
    companyId: 'company-1',
    permissions: ['core.user.view', 'core.user.create'],
  };

  it('should return true when permission exists', () => {
    const result = hasPermission(payload, 'core.user.view');

    expect(result).toBe(true);
  });

  it('should return false when permission does not exist', () => {
    const result = hasPermission(payload, 'core.user.delete');

    expect(result).toBe(false);
  });

  it('should return false when payload is null', () => {
    const result = hasPermission(null, 'core.user.view');

    expect(result).toBe(false);
  });
});
