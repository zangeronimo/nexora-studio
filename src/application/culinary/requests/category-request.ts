import { PaginationRequest } from '@application/base/requests/pagination-request';
import { status } from '@domain/base/enums/status';

export class GetCategoriesRequest extends PaginationRequest {
  constructor(
    readonly page = 1,
    readonly pageSize = 10,
    readonly orderBy = 'name',
    readonly desc = false,
    readonly name?: string,
    readonly status?: status,
    readonly parent?: string,
  ) {
    super(page, pageSize, orderBy, desc);
  }
}

export class CreateCategoryRequest {
  constructor(
    readonly name: string,
    readonly description: string,
    readonly parentId: string | null,
    readonly displayOrder: number,
    readonly metaTitle: string,
    readonly metaDescription: string,
    readonly status: status,
  ) {}
}

export class UpdateCategoryRequest {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly parentId: string | null,
    readonly displayOrder: number,
    readonly metaTitle: string,
    readonly metaDescription: string,
    readonly status: status,
  ) {}
}
