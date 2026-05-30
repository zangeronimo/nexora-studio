import { PaginationRequest } from '@application/base/requests/pagination-request';
import { status } from '@domain/base/enums/status';

export class GetUsersRequest extends PaginationRequest {
  constructor(
    readonly page = 1,
    readonly pageSize = 10,
    readonly orderBy = 'name',
    readonly desc = false,
    readonly name?: string,
    readonly email?: string,
    readonly status?: status,
  ) {
    super(page, pageSize, orderBy, desc);
  }
}

export class CreateUserRequest {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly status: status,
  ) {}
}
export class UpdateUserRequest {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly password: string | null,
    readonly status: status,
  ) {}
}
