import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { routes as appRoutes } from './app-route';
import { publicRoutes } from './public-routes';

import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';

import { ProtectedRoute } from '../components/protected-route';

import { AppRoute } from '../types/app-route';

import { AppShell } from '@presentation/base/layouts/app-shell';
import { AuthenticatedRoute } from '../components/authenticated-route';

function renderProtectedRoutes(
  routes: AppRoute[],
  authorizationProvider: AuthorizationProvider,
) {
  return routes.map((route) => {
    const hasChildren = !!route.children?.length;

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.element ? (
            <ProtectedRoute
              route={route}
              authorizationProvider={authorizationProvider}
            />
          ) : undefined
        }
      >
        {hasChildren &&
          renderProtectedRoutes(route.children!, authorizationProvider)}
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
  authorizationProvider,
}: {
  authorizationProvider: AuthorizationProvider;
}) {
  return (
    <BrowserRouter>
      <Routes>
        {renderPublicRoutes()}

        <Route element={<AuthenticatedRoute />}>
          <Route
            path="/"
            element={<AppShell authorizationProvider={authorizationProvider} />}
          >
            {renderProtectedRoutes(appRoutes, authorizationProvider)}
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
