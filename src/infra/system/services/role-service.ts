import { AuthHttpClient } from '@application/base/security/contracts/auth-http-client';
import { IRoleService } from '@application/system/contracts/role-service';
import {
  CreateRoleRequest,
  GetRolesRequest,
  UpdateRolePermissionsRequest,
  UpdateRoleRequest,
} from '@application/system/requests/role-request';
import { PaginatedResponse } from '@application/base/response/paginated-response';
import { Role } from '@domain/system/entities/role';

export class RoleService implements IRoleService {
  constructor(private readonly http: AuthHttpClient) {}

  getAll(request: GetRolesRequest): Promise<PaginatedResponse<Role>> {
    return this.http.get('/system/roles', {
      params: {
        page: request.page,
        pageSize: request.pageSize,
        orderBy: request.orderBy,
        desc: request.desc,
        name: request.name,
        status: request.status,
      },
    });
  }

  getById(id: string): Promise<Role | null> {
    return this.http.get(`/system/roles/${id}`);
  }

  create(request: CreateRoleRequest): Promise<Role | null> {
    return this.http.post('/system/roles', request);
  }

  update(request: UpdateRoleRequest): Promise<Role | null> {
    return this.http.put(`/system/roles/${request.id}`, request);
  }

  updatePermissions(
    id: string,
    request: UpdateRolePermissionsRequest,
  ): Promise<void> {
    return this.http.put(`/system/roles/${id}/permissions`, request);
  }

  delete(id: string): Promise<void> {
    return this.http.delete(`/system/roles/${id}`);
  }
}
