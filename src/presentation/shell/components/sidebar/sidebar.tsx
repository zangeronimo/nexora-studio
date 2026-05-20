import { Link } from 'react-router-dom';

import { routes } from '@presentation/router/routes/app-route';

import { AuthorizationService } from '@application/contracts/security/authorizaton-service';
import { AppRoute } from '@presentation/router/types/app-route';

import { canShowItem } from '@presentation/shell/navigation/can-show-item';
import { useTranslation } from '../../../../core/i18n/presentation/use-translation';

type Props = {
  auth: AuthorizationService;
};

type NodeProps = {
  route: AppRoute;
  auth: AuthorizationService;
  parentPath?: string;
};

function buildPath(parentPath?: string, currentPath?: string) {
  if (!currentPath) {
    return '/';
  }

  /**
   * absolute route
   */
  if (currentPath.startsWith('/')) {
    return currentPath;
  }

  return `${parentPath}/${currentPath}`.replace(/\/+/g, '/');
}

function Node({ route, auth, parentPath = '' }: NodeProps) {
  const { t } = useTranslation();

  if (!canShowItem(auth, route)) {
    return null;
  }

  const hasChildren = !!route.children?.length;

  const fullPath = buildPath(parentPath, route.path);

  return (
    <li>
      {route.isGroupRoute ? (
        <span>{t(route.labelKey ?? '')}</span>
      ) : (
        <Link to={fullPath}>{t(route.labelKey ?? '')}</Link>
      )}

      {hasChildren && (
        <ul>
          {route.children!.map((child) => (
            <Node
              key={child.path ?? child.labelKey}
              route={child}
              auth={auth}
              parentPath={fullPath}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Sidebar({ auth }: Props) {
  return (
    <aside>
      <h2>NEXORA</h2>

      <nav>
        <ul>
          {routes.map((route) => (
            <Node
              key={route.path ?? route.labelKey}
              route={route}
              auth={auth}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
