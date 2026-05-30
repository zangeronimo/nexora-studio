import { PaginatedResponse } from '@application/base/response/paginated-response';
import { AuthHttpClient } from '@application/base/security/contracts/auth-http-client';
import { IUserService } from '@application/core/contracts/user-service';
import {
  CreateUserRequest,
  GetUsersRequest,
  UpdateUserRequest,
} from '@application/core/requests/user-request';
import { User } from '@domain/core/entities/user';

export class UserService implements IUserService {
  constructor(private readonly http: AuthHttpClient) {}
  getAll(request: GetUsersRequest): Promise<PaginatedResponse<User>> {
    return this.http.get('/core/users', {
      params: {
        page: request.page,
        pageSize: request.pageSize,
        orderBy: request.orderBy,
        desc: request.desc,
        name: request.name,
        email: request.email,
        status: request.status,
      },
    });
  }

  getById(id: string): Promise<User | null> {
    return this.http.get(`/core/users/${id}`);
  }

  create(request: CreateUserRequest): Promise<User | null> {
    return this.http.post('/core/users', request);
  }

  update(request: UpdateUserRequest): Promise<User | null> {
    return this.http.put(`/core/users/${request.id}`, request);
  }

  delete(id: string): Promise<void> {
    return this.http.delete(`/core/users/${id}`);
  }
}
