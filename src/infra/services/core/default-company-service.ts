import { AuthHttpClient } from '@application/contracts/auth/auth-http-client';
import { CompanyService } from '@application/contracts/core/company-service';
import { GetCompaniesRequest } from '@application/requests/core/company-request';
import { PaginatedResponse } from '@application/response/paginated-response';
import { Company } from '@domain/entities/core/company';

export class DefaultCompanyService implements CompanyService {
  constructor(private readonly http: AuthHttpClient) {}
  getAll(request: GetCompaniesRequest): Promise<PaginatedResponse<Company>> {
    return this.http.get('/core/companies', {
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
