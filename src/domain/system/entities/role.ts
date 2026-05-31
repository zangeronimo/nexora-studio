import { Entity } from '@domain/base/entities/entity';
import { status } from '@domain/base/enums/status';
import { Permission } from '@domain/core/entities/permission';

export class Role extends Entity {
  constructor(
    id: string,
    readonly name: string,
    readonly status: status,
    readonly permissions: Permission[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
  }
}
