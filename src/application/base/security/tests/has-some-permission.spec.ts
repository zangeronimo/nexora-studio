import { hasSomePermission } from '@application/base/security/has-some-permission';

describe('hasSomePermission', () => {
  const payload = {
    companyId: 'company-1',
    permissions: ['culinary.recipe.view'],
  };

  it('should return true when user has at least one permission', () => {
    const result = hasSomePermission(payload, [
      'culinary.recipe.view',
      'culinary.category.view',
    ]);

    expect(result).toBe(true);
  });

  it('should return false when user has none of the permissions', () => {
    const result = hasSomePermission(payload, [
      'culinary.category.view',
      'culinary.rating.view',
    ]);

    expect(result).toBe(false);
  });

  it('should return false when payload is null', () => {
    const result = hasSomePermission(null, ['culinary.recipe.view']);

    expect(result).toBe(false);
  });
});
