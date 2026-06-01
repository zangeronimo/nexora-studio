import { PaginatedResponse } from '@application/base/response/paginated-response';
import { UserCompany } from '@domain/system/entities/user-company';
import {
  CreateUserCompanyRequest,
  GetUserCompaniesRequest,
  UpdateUserCompanyRequest,
} from '../requests/user-company-request';
import { UserCompanyRoles } from '@domain/system/entities/user-company-roles';

export interface IUserCompanyService {
  getAll: (
    request: GetUserCompaniesRequest,
  ) => Promise<PaginatedResponse<UserCompany>>;
  getById: (id: string) => Promise<UserCompany | null>;
  getModules: (id: string) => Promise<UserCompanyRoles[]>;
  create: (request: CreateUserCompanyRequest) => Promise<UserCompany | null>;
  update: (request: UpdateUserCompanyRequest) => Promise<UserCompany | null>;
  updateRoles: (
    id: string,
    roles: { moduleid: string; roleid: string }[],
  ) => Promise<UserCompany | null>;
  delete: (id: string) => Promise<void>;
}
