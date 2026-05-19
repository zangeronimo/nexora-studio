import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './public-routes';
import { routes } from './app-route';
import { ProtectedRoute } from '../components/protected-route';
import { AuthorizationService } from '@application/contracts/security/authorizaton-service';

type Props = {
  authorization: AuthorizationService;
};

export function AppRoutes({ authorization }: Props) {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute route={route} auth={authorization} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
