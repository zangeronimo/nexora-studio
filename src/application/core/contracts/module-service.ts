import { PaginatedResponse } from '@application/base/response/paginated-response';
import { Module } from '@domain/core/entities/module';
import { GetModulesRequest } from '../requests/module-request';

export class IModuleService {
  getAll: (request: GetModulesRequest) => Promise<PaginatedResponse<Module>>;
}
