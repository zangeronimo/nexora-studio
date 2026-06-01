import { Entity } from '@domain/base/entities/entity';
import { status } from '@domain/base/enums/status';
import { Company } from '@domain/core/entities/company';
import { User } from '@domain/core/entities/user';

export class UserCompany extends Entity {
  constructor(
    id: string,
    readonly userId: string,
    readonly user: User,
    readonly companyId: string,
    readonly company: Company,
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
