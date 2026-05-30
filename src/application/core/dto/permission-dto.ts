import { status } from '@domain/base/enums/status';

export type PermissionDto = {
  id?: string;
  code: string;
  label: string;
  status: status;
  createdAt?: Date;
  updatedAt?: Date;
};
