import { PaginatedResponse } from '@application/base/response/paginated-response';
import { Module } from '@domain/core/entities/module';
import {
  CreateModuleRequest,
  GetModulesRequest,
  UpdateModuleRequest,
} from '../requests/module-request';

export class IModuleService {
  getAll: (request: GetModulesRequest) => Promise<PaginatedResponse<Module>>;
  getById: (id: string) => Promise<Module | null>;
  create: (request: CreateModuleRequest) => Promise<Module | null>;
  update: (request: UpdateModuleRequest) => Promise<Module | null>;
  delete: (id: string) => Promise<void>;
}
