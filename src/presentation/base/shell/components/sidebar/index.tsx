import { Link, useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';

import { routes } from '@presentation/base/router/routes/app-route';

import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { AppRoute } from '@presentation/base/router/types/app-route';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import * as styles from './styles.module.scss';
import { buildSidebarRoutes } from './build-sidebar-routes';
import { ChevronRight } from 'lucide-react';

type Props = {
  authorizationProvider: AuthorizationProvider;
};

function buildPath(parentPath?: string, currentPath?: string) {
  if (!currentPath) {
    return '/';
  }

  if (currentPath.startsWith('/')) {
    return currentPath;
  }

  return `${parentPath}/${currentPath}`.replace(/\/+/g, '/');
}

type ItemProps = {
  route: AppRoute;
  parentPath?: string;
  t: (key: string) => string;
};

function SidebarItem({ route, parentPath = '', t }: ItemProps) {
  const location = useLocation();

  const fullPath = buildPath(parentPath, route.path);

  const isActive =
    location.pathname === fullPath ||
    location.pathname.startsWith(`${fullPath}/`);

  return (
    <Link
      to={fullPath}
      className={`${styles.link} ${isActive ? styles.active : ''}`}
    >
      {t(route.labelKey ?? '')}
    </Link>
  );
}

export function Sidebar({ authorizationProvider }: Props) {
  const { t } = useTranslation();
  const location = useLocation();

  const sidebarRoutes = useMemo(
    () => buildSidebarRoutes(routes, authorizationProvider),
    [authorizationProvider],
  );

  const activeGroup = useMemo(() => {
    const group = sidebarRoutes.find(
      (route) =>
        route.isGroupRoute &&
        route.children?.some((child) => {
          const fullPath = buildPath(route.path, child.path);

          return (
            location.pathname === fullPath ||
            location.pathname.startsWith(`${fullPath}/`)
          );
        }),
    );

    return group?.path ?? null;
  }, [sidebarRoutes, location.pathname]);

  const [openedGroup, setOpenedGroup] = useState<string | null>(activeGroup);

  const handleToggleGroup = (groupPath: string) => {
    setOpenedGroup((current) => (current === groupPath ? null : groupPath));
  };

  return (
    <aside className={styles.container}>
      <div className={styles.brand}>
        <h1 className={styles.logo}>NEXORA</h1>

        <span className={styles.subtitle}>{t('common.nexora.slogan')}</span>
      </div>

      <nav className={styles.navigation}>
        <ul className={styles.list}>
          {sidebarRoutes.map((route) => {
            if (!route.isGroupRoute) {
              return (
                <li key={route.path}>
                  <SidebarItem route={route} t={t} />
                </li>
              );
            }

            const isOpen =
              openedGroup === route.path || activeGroup === route.path;

            return (
              <li key={route.path} className={styles.groupContainer}>
                <button
                  type="button"
                  className={styles.groupButton}
                  onClick={() => handleToggleGroup(route.path)}
                >
                  <span>{t(route.labelKey ?? '')}</span>

                  <ChevronRight
                    size={16}
                    className={`${styles.chevron} ${
                      isOpen ? styles.chevronOpen : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <ul className={styles.group}>
                    {route.children?.map((child) => (
                      <li key={child.path}>
                        <SidebarItem
                          route={child}
                          parentPath={route.path}
                          t={t}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
