export class PaginationRequest {
  constructor(
    readonly page,
    readonly pageSize,
    readonly orderBy?: string,
    readonly desc?: boolean,
  ) {}
}
