import { AuthHttpClient } from '@application/base/security/contracts/auth-http-client';
import { ICompanyService } from '@application/core/contracts/company-service';
import {
  CreateCompanyRequest,
  GetCompaniesRequest,
  UpdateCompanyRequest,
} from '@application/core/requests/company-request';
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

  getById(id: string): Promise<Company | null> {
    return this.http.get(`/core/companies/${id}`);
  }

  create(request: CreateCompanyRequest): Promise<Company | null> {
    return this.http.post('/core/companies', request);
  }

  update(request: UpdateCompanyRequest): Promise<Company | null> {
    return this.http.put(`/core/companies/${request.id}`, request);
  }

  delete(id: string): Promise<void> {
    return this.http.delete(`/core/companies/${id}`);
  }
}
