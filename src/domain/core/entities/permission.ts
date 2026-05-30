import { Entity } from '@domain/base/entities/entity';
import { status } from '@domain/base/enums/status';

export class Permission extends Entity {
  constructor(
    id: string,
    readonly code: string,
    readonly label: string,
    readonly status: status,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
  }
}
