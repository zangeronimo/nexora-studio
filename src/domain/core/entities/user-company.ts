import { Entity } from '@domain/base/entities/entity';

export class UserCompany extends Entity {
  constructor(
    id: string,
    readonly userId: string,
    readonly companyId: string,
    createdAt: Date,
    updatedAt: Date,
    readonly lastAccessedAt?: Date,
    readonly nickname?: string,
    readonly avatarUrl?: string,
  ) {
    super(id, createdAt, updatedAt);
  }
}
