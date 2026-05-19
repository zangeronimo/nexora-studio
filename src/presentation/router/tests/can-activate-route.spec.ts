import { canActivateRoute } from '../guards/can-activate-route';

describe('canActivateRoute', () => {
  const auth = {
    hasPermission: jest.fn(),
    hasSomePermission: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should allow route when guard is undefined', () => {
    const result = canActivateRoute(auth as any);

    expect(result).toBe(true);
  });

  it('should allow route when hasPermission returns true', () => {
    auth.hasPermission.mockReturnValue(true);

    const result = canActivateRoute(auth as any, {
      permission: 'core.user.view',
    });

    expect(auth.hasPermission).toHaveBeenCalledWith('core.user.view');

    expect(result).toBe(true);
  });

  it('should deny route when hasPermission returns false', () => {
    auth.hasPermission.mockReturnValue(false);

    const result = canActivateRoute(auth as any, {
      permission: 'core.user.view',
    });

    expect(result).toBe(false);
  });

  it('should allow route when hasSomePermission returns true', () => {
    auth.hasSomePermission.mockReturnValue(true);

    const result = canActivateRoute(auth as any, {
      anyPermissions: ['culinary.recipe.view', 'culinary.category.view'],
    });

    expect(auth.hasSomePermission).toHaveBeenCalledWith([
      'culinary.recipe.view',
      'culinary.category.view',
    ]);

    expect(result).toBe(true);
  });

  it('should deny route when hasSomePermission returns false', () => {
    auth.hasSomePermission.mockReturnValue(false);

    const result = canActivateRoute(auth as any, {
      anyPermissions: ['core.user.delete'],
    });

    expect(result).toBe(false);
  });
});
