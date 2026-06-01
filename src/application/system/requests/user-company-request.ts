import { PaginationRequest } from '@application/base/requests/pagination-request';
import { status } from '@domain/base/enums/status';

export class GetUserCompaniesRequest extends PaginationRequest {
  constructor(
    readonly page = 1,
    readonly pageSize = 10,
    readonly orderBy = 'NickName',
    readonly desc = false,
    readonly nickname?: string,
    readonly status?: status,
  ) {
    super(page, pageSize, orderBy, desc);
  }
}

export class CreateUserCompanyRequest {
  constructor(readonly email: string) {}
}

export class UpdateUserCompanyRequest {
  constructor(
    readonly id: string,
    readonly nickname: string,
    readonly status: status,
  ) {}
}
