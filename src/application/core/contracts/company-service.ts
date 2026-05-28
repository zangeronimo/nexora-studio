import { PaginatedResponse } from '@application/base/response/paginated-response';
import {
  CreateCompanyRequest,
  GetCompaniesRequest,
  UpdateCompanyRequest,
} from '../requests/company-request';
import { Company } from '@domain/core/entities/company';

export interface ICompanyService {
  getAll: (request: GetCompaniesRequest) => Promise<PaginatedResponse<Company>>;
  getById: (id: string) => Promise<Company | null>;
  create: (request: CreateCompanyRequest) => Promise<Company | null>;
  update: (request: UpdateCompanyRequest) => Promise<Company | null>;
  delete: (id: string) => Promise<void>;
}
