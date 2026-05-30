import { status } from '@domain/base/enums/status';

export type PermissionForm = {
  id?: string;

  module: string;
  resource: string;
  permission: string;

  label: string;
  status: status;

  createdAt?: Date;
  updatedAt?: Date;
};
