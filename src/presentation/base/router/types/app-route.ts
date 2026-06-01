import { ReactElement } from 'react';

export type AppRoute = {
  path: string;
  element?: ReactElement;

  labelKey?: string;
  showInSidebar: boolean;

  icon?: ReactElement;

  permission?: string;
  anyPermissions?: string[];
  allPermissions?: string[];

  children?: AppRoute[];
  isGroupRoute?: boolean;
};
