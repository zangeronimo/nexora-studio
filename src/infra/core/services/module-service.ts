import { PaginatedResponse } from '@application/base/response/paginated-response';
import { AuthHttpClient } from '@application/base/security/contracts/auth-http-client';
import { IModuleService } from '@application/core/contracts/module-service';
import { GetModulesRequest } from '@application/core/requests/module-request';
import { Module } from '@domain/core/entities/module';

export class ModuleService implements IModuleService {
  constructor(private readonly http: AuthHttpClient) {}
  getAll(request: GetModulesRequest): Promise<PaginatedResponse<Module>> {
    return this.http.get('/core/modules', {
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
}
