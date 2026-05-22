import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { routes as appRoutes } from './app-route';
import { publicRoutes } from './public-routes';

import { AuthorizationService } from '@application/contracts/security/authorizaton-service';

import { ProtectedRoute } from '../components/protected-route';

import { AppRoute } from '../types/app-route';

import { AppShell } from '@presentation/layouts/app-shell';
import { AuthenticatedRoute } from '../components/authenticated-route';

function renderProtectedRoutes(routes: AppRoute[], auth: AuthorizationService) {
  return routes.map((route) => {
    const hasChildren = !!route.children?.length;

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.element ? (
            <ProtectedRoute route={route} auth={auth} />
          ) : undefined
        }
      >
        {hasChildren && renderProtectedRoutes(route.children!, auth)}
      </Route>
    );
  });
}

function renderPublicRoutes() {
  return publicRoutes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  ));
}

export function AppRoutes({
  authorization,
}: {
  authorization: AuthorizationService;
}) {
  return (
    <BrowserRouter>
      <Routes>
        {renderPublicRoutes()}

        <Route element={<AuthenticatedRoute />}>
          <Route path="/" element={<AppShell auth={authorization} />}>
            {renderProtectedRoutes(appRoutes, authorization)}
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
