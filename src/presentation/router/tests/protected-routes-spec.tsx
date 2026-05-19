import { render, screen } from '@testing-library/react';
import { ProtectedRoute } from '../components/protected-route';

describe('ProtectedRoute', () => {
  const auth = {
    hasPermission: jest.fn(),
    hasSomePermission: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render route element when authorized', () => {
    auth.hasPermission.mockReturnValue(true);

    render(
      <ProtectedRoute
        auth={auth as any}
        route={{
          path: '/dashboard',
          permission: 'core.user.view',
          element: <div>Dashboard</div>,
        }}
      />,
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should render forbidden when unauthorized', () => {
    auth.hasPermission.mockReturnValue(false);

    render(
      <ProtectedRoute
        auth={auth as any}
        route={{
          path: '/dashboard',
          permission: 'core.user.view',
          element: <div>Dashboard</div>,
        }}
      />,
    );

    expect(screen.getByText('Forbidden')).toBeInTheDocument();

    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('should allow route when user has one of anyPermissions', () => {
    auth.hasSomePermission.mockReturnValue(true);

    render(
      <ProtectedRoute
        auth={auth as any}
        route={{
          path: '/recipes',
          anyPermissions: ['culinary.recipe.view', 'culinary.category.view'],
          element: <div>Recipes</div>,
        }}
      />,
    );

    expect(screen.getByText('Recipes')).toBeInTheDocument();
  });
});
