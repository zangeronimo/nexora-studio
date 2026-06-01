import { AuthHttpClient } from '@application/base/security/contracts/auth-http-client';
import { IUserCompanyService } from '@application/system/contracts/user-company-service';
import {
  CreateUserCompanyRequest,
  GetUserCompaniesRequest,
  UpdateUserCompanyRequest,
} from '@application/system/requests/user-company-request';
import { PaginatedResponse } from '@application/base/response/paginated-response';
import { UserCompany } from '@domain/system/entities/user-company';
import { UserCompanyRoles } from '@domain/system/entities/user-company-roles';

export class UserCompanyService implements IUserCompanyService {
  constructor(private readonly http: AuthHttpClient) {}

  async getAll(
    request: GetUserCompaniesRequest,
  ): Promise<PaginatedResponse<UserCompany>> {
    const result = await this.http.get<PaginatedResponse<any>>(
      '/system/usercompanies',
      {
        params: {
          page: request.page,
          pageSize: request.pageSize,
          orderBy: request.orderBy,
          desc: request.desc,
          nickname: request.nickname,
          status: request.status,
        },
      },
    );

    const items = result.items.map(
      (item) =>
        new UserCompany(
          item.id,
          item.userId,
          item.user,
          item.companyId,
          item.company,
          item.status,
          item.createdAt,
          item.updatedAt,
          item.lastAccessedAt,
          item.nickName,
          item.avatarUrl,
        ),
    );

    return {
      items,
      total: result.total,
    } as PaginatedResponse<UserCompany>;
  }

  async getById(id: string): Promise<UserCompany | null> {
    const result = await this.http.get<any>(`/system/usercompanies/${id}`);

    return result
      ? new UserCompany(
          result.id,
          result.userId,
          result.user,
          result.companyId,
          result.company,
          result.status,
          result.createdAt,
          result.updatedAt,
          result.lastAccessedAt,
          result.nickName,
          result.avatarUrl,
        )
      : null;
  }

  getModules(id: string): Promise<UserCompanyRoles[]> {
    return this.http.get(`/system/usercompanies/${id}/modules`);
  }

  async create(request: CreateUserCompanyRequest): Promise<UserCompany | null> {
    const result = await this.http.post<any>('/system/usercompanies', request);

    return result
      ? new UserCompany(
          result.id,
          result.userId,
          result.user,
          result.companyId,
          result.company,
          result.status,
          result.createdAt,
          result.updatedAt,
          result.lastAccessedAt,
          result.nickName,
          result.avatarUrl,
        )
      : null;
  }

  async update(request: UpdateUserCompanyRequest): Promise<UserCompany | null> {
    const result = await this.http.put<any>(
      `/system/usercompanies/${request.id}`,
      request,
    );

    return result
      ? new UserCompany(
          result.id,
          result.userId,
          result.user,
          result.companyId,
          result.company,
          result.status,
          result.createdAt,
          result.updatedAt,
          result.lastAccessedAt,
          result.nickName,
          result.avatarUrl,
        )
      : null;
  }

  updateRoles(
    id: string,
    roles: { moduleid: string; roleid: string }[],
  ): Promise<UserCompany | null> {
    return this.http.put(`/system/usercompanies/${id}/modules`, { roles });
  }

  delete(id: string): Promise<void> {
    return this.http.delete(`/system/usercompanies/${id}`);
  }
}
