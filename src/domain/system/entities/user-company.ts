import { Entity } from '@domain/base/entities/entity';
import { Company } from '@domain/core/entities/company';
import { User } from '@domain/core/entities/user';

export class UserCompany extends Entity {
  constructor(
    id: string,
    readonly userId: string,
    readonly user: User,
    readonly companyId: string,
    readonly company: Company,
    createdAt: Date,
    updatedAt: Date,
    readonly lastAccessedAt?: Date,
    readonly nickname?: string,
    readonly avatarUrl?: string,
  ) {
    super(id, createdAt, updatedAt);
  }
}
