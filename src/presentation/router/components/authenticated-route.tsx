import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@presentation/auth/use-auth';

export function AuthenticatedRoute() {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/logout" replace />;
  }

  return <Outlet />;
}
