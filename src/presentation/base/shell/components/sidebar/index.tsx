import { Link, useLocation } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import { routes } from '@presentation/base/router/routes/app-route';
import { AuthorizationProvider } from '@application/base/security/contracts/authorizaton-provider';
import { AppRoute } from '@presentation/base/router/types/app-route';
import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { buildSidebarRoutes } from './build-sidebar-routes';
import * as styles from './styles.module.scss';

type Props = {
  authorizationProvider: AuthorizationProvider;
};

function buildPath(parentPath?: string, currentPath?: string) {
  if (!currentPath) return '/';
  if (currentPath.startsWith('/')) return currentPath;
  return `${parentPath}/${currentPath}`.replace(/\/+/g, '/');
}

function getActiveGroup(routes: AppRoute[], pathname: string) {
  for (const route of routes) {
    if (!route.isGroupRoute || !route.children) continue;

    const match = route.children.some((child) => {
      const fullPath = buildPath(route.path, child.path);
      return pathname === fullPath || pathname.startsWith(`${fullPath}/`);
    });

    if (match) return route.path;
  }
  return null;
}

type ItemProps = {
  route: AppRoute;
  parentPath?: string;
  t: (key: string) => string;
  collapsed: boolean;
  onNavigate?: () => void;
};

function SidebarItem({
  route,
  parentPath = '',
  t,
  collapsed,
  onNavigate,
}: ItemProps) {
  const location = useLocation();

  const fullPath = buildPath(parentPath, route.path);

  const isActive =
    location.pathname === fullPath ||
    location.pathname.startsWith(`${fullPath}/`);

  const label = t(route.labelKey ?? '');

  const icon = route.icon;

  return (
    <Link
      to={fullPath}
      onClick={onNavigate}
      className={`${styles.link} ${isActive ? styles.active : ''}`}
      title={collapsed ? label : undefined}
    >
      {icon && <span className={styles.iconOnly}>{icon}</span>}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

export function Sidebar({ authorizationProvider }: Props) {
  const { t } = useTranslation();
  const location = useLocation();
  const STORAGE_KEY = 'nexora.sidebar.collapsed';

  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });
  const [flyoutGroup, setFlyoutGroup] = useState<string | null>(null);
  const [openedGroup, setOpenedGroup] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(collapsed));
  }, [collapsed]);

  const sidebarRoutes = useMemo(
    () => buildSidebarRoutes(routes, authorizationProvider),
    [authorizationProvider],
  );

  const activeGroup = useMemo(
    () => getActiveGroup(sidebarRoutes, location.pathname),
    [sidebarRoutes, location.pathname],
  );

  useEffect(() => {
    setOpenedGroup(activeGroup);
    setFlyoutGroup(null);
  }, [activeGroup]);

  const toggleGroup = (group: string) => {
    if (collapsed) {
      setFlyoutGroup((current) => (current === group ? null : group));
      return;
    }

    setOpenedGroup((current) => (current === group ? null : group));
  };

  const closeFlyout = () => setFlyoutGroup(null);

  const handleNavigate = () => {
    setFlyoutGroup(null);
  };

  return (
    <aside
      className={`${styles.container} ${collapsed ? styles.collapsed : ''}`}
    >
      <div className={styles.brand}>
        <h1 className={styles.logo}>{collapsed ? 'N' : 'NEXORA'}</h1>

        <button
          type="button"
          className={styles.collapseButton}
          onClick={() => {
            setCollapsed((c) => !c);
            setFlyoutGroup(null);
          }}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className={styles.navigation}>
        <ul className={styles.list}>
          {sidebarRoutes.map((route) => {
            if (!route.isGroupRoute) {
              return (
                <li key={route.path}>
                  <SidebarItem
                    route={route}
                    t={t}
                    collapsed={collapsed}
                    onNavigate={handleNavigate}
                  />
                </li>
              );
            }

            const isOpen = openedGroup === route.path;
            const isFlyoutOpen = collapsed && flyoutGroup === route.path;

            const label = t(route.labelKey ?? '');
            const icon = route.icon ?? label[0];

            return (
              <li key={route.path} className={styles.groupContainer}>
                <button
                  type="button"
                  className={`${styles.groupButton} ${
                    isOpen ? styles.groupButtonActive : ''
                  }`}
                  onClick={() => toggleGroup(route.path)}
                >
                  <span className={styles.groupIcon}>{icon}</span>

                  {!collapsed && (
                    <span className={styles.groupLabel}>{label}</span>
                  )}

                  {!collapsed && (
                    <ChevronRight
                      size={16}
                      className={`${styles.chevron} ${
                        isOpen ? styles.chevronOpen : ''
                      }`}
                    />
                  )}
                </button>

                {isOpen && !collapsed && (
                  <ul className={styles.group}>
                    {route.children?.map((child) => (
                      <li key={child.path}>
                        <SidebarItem
                          route={child}
                          parentPath={route.path}
                          t={t}
                          collapsed={collapsed}
                          onNavigate={handleNavigate}
                        />
                      </li>
                    ))}
                  </ul>
                )}

                {isFlyoutOpen && collapsed && (
                  <>
                    <div
                      className={styles.flyoutOverlay}
                      onClick={closeFlyout}
                    />

                    <div className={styles.flyout}>
                      <div className={styles.flyoutTitle}>{label}</div>

                      {route.children?.map((child) => (
                        <SidebarItem
                          key={child.path}
                          route={child}
                          parentPath={route.path}
                          t={t}
                          collapsed={false}
                          onNavigate={closeFlyout}
                        />
                      ))}
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
