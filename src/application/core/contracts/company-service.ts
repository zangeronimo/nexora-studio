import { PaginatedResponse } from '@application/base/response/paginated-response';
import { GetCompaniesRequest } from '../requests/company-request';
import { Company } from '@domain/core/entities/company';

export interface ICompanyService {
  getAll: (request: GetCompaniesRequest) => Promise<PaginatedResponse<Company>>;
}
