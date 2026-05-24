import { AuthHttpClient } from '@application/base/security/contracts/auth-http-client';
import { ICompanyService } from '@application/core/contracts/company-service';
import { GetCompaniesRequest } from '@application/core/requests/company-request';
import { PaginatedResponse } from '@application/base/response/paginated-response';
import { Company } from '@domain/core/entities/company';

export class CompanyService implements ICompanyService {
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
