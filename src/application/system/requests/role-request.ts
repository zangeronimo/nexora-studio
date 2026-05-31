import { PaginationRequest } from '@application/base/requests/pagination-request';
import { status } from '@domain/base/enums/status';

export class GetRolesRequest extends PaginationRequest {
  constructor(
    readonly page = 1,
    readonly pageSize = 10,
    readonly orderBy = 'name',
    readonly desc = false,
    readonly name?: string,
    readonly status?: status,
  ) {
    super(page, pageSize, orderBy, desc);
  }
}

export class CreateRoleRequest {
  constructor(
    readonly name: string,
    readonly status: status,
  ) {}
}

export class UpdateRoleRequest {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly status: status,
  ) {}
}

export class UpdateRolePermissionsRequest {
  constructor(readonly permissions: string[]) {}
}
