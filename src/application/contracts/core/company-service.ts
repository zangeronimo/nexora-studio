import { GetCompaniesRequest } from '@application/requests/core/company-request';
import { PaginatedResponse } from '@application/response/paginated-response';
import { Company } from '@domain/entities/core/company';

export interface CompanyService {
  getAll: (request: GetCompaniesRequest) => Promise<PaginatedResponse<Company>>;
}
