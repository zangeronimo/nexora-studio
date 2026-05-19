export type AppRoute = {
  path: string;
  element: React.ReactNode;

  permission?: string;
  anyPermissions?: string[];

  title?: string;
};
