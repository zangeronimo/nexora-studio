import { User } from '@domain/core/entities/user';
import {
  CreateUserRequest,
  GetUsersRequest,
  UpdateUserRequest,
} from '../requests/user-request';
import { PaginatedResponse } from '@application/base/response/paginated-response';

export interface IUserService {
  getAll: (request: GetUsersRequest) => Promise<PaginatedResponse<User>>;
  getById: (id: string) => Promise<User | null>;
  create: (request: CreateUserRequest) => Promise<User | null>;
  update: (request: UpdateUserRequest) => Promise<User | null>;
  delete: (id: string) => Promise<void>;
}
