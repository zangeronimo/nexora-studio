import { status } from '@domain/enums/status';
import { PaginationRequest } from '../pagination-request';

export class GetCompaniesRequest extends PaginationRequest {
  constructor(
    readonly page = 1,
    readonly pageSize: 10,
    readonly orderBy = 'name',
    readonly desc = false,
    readonly name?: string,
    readonly status?: status,
  ) {
    super(page, pageSize, orderBy, desc);
  }
}
