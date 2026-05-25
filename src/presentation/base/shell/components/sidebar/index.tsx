import { Link, useLocation } from 'react-router-dom';

import { routes } from '@presentation/base/router/routes/app-route';

import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { AppRoute } from '@presentation/base/router/types/app-route';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import * as styles from './styles.module.scss';
import { canShowItem } from '../../navigation/can-show-item';

type Props = {
  authorizationProvider: AuthorizationProvider;
};

type NodeProps = {
  route: AppRoute;
  authorizationProvider: AuthorizationProvider;
  parentPath?: string;
  t: (key: string) => string;
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

function Node({ route, authorizationProvider, parentPath = '', t }: NodeProps) {
  const location = useLocation();

  if (!canShowItem(authorizationProvider, route)) {
    return null;
  }

  const hasChildren = !!route.children?.length;

  const fullPath = buildPath(parentPath, route.path);

  const isActive =
    !route.isGroupRoute &&
    (location.pathname === fullPath ||
      location.pathname.startsWith(`${fullPath}/`));

  return (
    <li className={styles.item}>
      {route.isGroupRoute ? (
        <div className={styles.groupLabel}>{t(route.labelKey ?? '')}</div>
      ) : (
        <Link
          to={fullPath}
          className={`${styles.link} ${isActive ? styles.active : ''}`}
        >
          {t(route.labelKey ?? '')}
        </Link>
      )}

      {hasChildren && (
        <ul className={styles.group}>
          {route.children!.map((child) => (
            <Node
              key={child.path ?? child.labelKey}
              route={child}
              authorizationProvider={authorizationProvider}
              parentPath={fullPath}
              t={t}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Sidebar({ authorizationProvider }: Props) {
  const { t } = useTranslation();
  return (
    <aside className={styles.container}>
      <div className={styles.brand}>
        <h1 className={styles.logo}>NEXORA</h1>

        <span className={styles.subtitle}>{t('common.nexora.slogan')}</span>
      </div>

      <nav className={styles.navigation}>
        <ul className={styles.list}>
          {routes.map((route) => (
            <Node
              key={route.path ?? route.labelKey}
              route={route}
              authorizationProvider={authorizationProvider}
              t={t}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
