import { Link, useLocation } from 'react-router-dom';

import { routes } from '@presentation/router/routes/app-route';

import { AuthorizationService } from '@application/contracts/security/authorizaton-service';
import { AppRoute } from '@presentation/router/types/app-route';

import { canShowItem } from '@presentation/shell/navigation/can-show-item';

import { useTranslation } from '../../../../core/i18n/presentation/use-translation';

import * as styles from './styles.module.scss';

type Props = {
  auth: AuthorizationService;
};

type NodeProps = {
  route: AppRoute;
  auth: AuthorizationService;
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

function Node({ route, auth, parentPath = '', t }: NodeProps) {
  const location = useLocation();

  if (!canShowItem(auth, route)) {
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
              auth={auth}
              parentPath={fullPath}
              t={t}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Sidebar({ auth }: Props) {
  const { t } = useTranslation();
  return (
    <aside className={styles.container}>
      <div className={styles.brand}>
        <h1 className={styles.logo}>NEXORA</h1>

        <span className={styles.subtitle}>{t('nexora_slogan')}</span>
      </div>

      <nav className={styles.navigation}>
        <ul className={styles.list}>
          {routes.map((route) => (
            <Node
              key={route.path ?? route.labelKey}
              route={route}
              auth={auth}
              t={t}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
