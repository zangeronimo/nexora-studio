import { status } from '@domain/enums/status';
import { Entity } from '../entity';

export class UserCompany extends Entity {
  constructor(
    id: string,
    readonly userId: string,
    readonly companyId: string,
    readonly status: status,
    createdAt: Date,
    updatedAt: Date,
    readonly lastAccessedAt?: Date,
    readonly nickname?: string,
    readonly avatarUrl?: string,
  ) {
    super(id, createdAt, updatedAt);
  }
}
