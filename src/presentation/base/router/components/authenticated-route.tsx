import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@presentation/base/auth/use-auth';

export function AuthenticatedRoute() {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/logout" replace />;
  }

  return <Outlet />;
}
