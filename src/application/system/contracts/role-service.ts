import { PaginatedResponse } from '@application/base/response/paginated-response';
import { Role } from '@domain/system/entities/role';
import {
  CreateRoleRequest,
  GetRolesRequest,
  UpdateRolePermissionsRequest,
  UpdateRoleRequest,
} from '../requests/role-request';

export interface IRoleService {
  getAll: (request: GetRolesRequest) => Promise<PaginatedResponse<Role>>;
  getById: (id: string) => Promise<Role | null>;
  create: (request: CreateRoleRequest) => Promise<Role | null>;
  update: (request: UpdateRoleRequest) => Promise<Role | null>;
  updatePermissions: (
    id: string,
    request: UpdateRolePermissionsRequest,
  ) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
